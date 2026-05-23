#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { chromium } from 'playwright';
import sharp from 'sharp';

const TMP = '.screenshots-tmp';
const OUT = 'docs/screenshots';

// --- Device profiles ---------------------------------------------------------

const MACBOOK_14 = {
  viewport: { width: 1512, height: 982 },
  deviceScaleFactor: 2,
};

const IPHONE_17_PRO_MAX = {
  viewport: { width: 440, height: 956 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) ' +
    'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
};

// --- Routes ------------------------------------------------------------------

const expandFirstAccordion = async (page) => {
  // exclude buttons that carry an aria-label (e.g. the mobile search lupa)
  const btns = page.locator('button[aria-expanded="false"]:not([aria-label])');
  const n = await btns.count();
  for (let i = 0; i < n; i++) {
    const b = btns.nth(i);
    if (await b.isVisible()) {
      await b.scrollIntoViewIfNeeded();
      await b.click();
      await page.waitForTimeout(600);
      return;
    }
  }
};

const ROUTES = [
  { path: '/',                          file: '00-landing' },
  { path: '/becario/onboarding',        file: '01-becario-onboarding' },
  { path: '/becario',                   file: '02-becario-inicio' },
  { path: '/becario/progreso',          file: '03-becario-progreso',
    action: { desktop: expandFirstAccordion, mobile: expandFirstAccordion } },
  { path: '/becario/sesiones',          file: '04-becario-sesiones' },
  { path: '/becario/mentor',            file: '05-becario-mentor' },
  { path: '/becario/boleta-salida',     file: '06-becario-boleta' },
  { path: '/becario/certificado',       file: '07-becario-certificado' },
  { path: '/becario/certificado/preview', file: '07b-becario-certificado-preview' },
  { path: '/becario/alumni',            file: '08-becario-alumni' },
  { path: '/equipo',                    file: '09-equipo-cohorte' },
  { path: '/equipo/becario/diego',      file: '10-equipo-perfil' },
  { path: '/equipo/alertas',            file: '11-equipo-alertas' },
  { path: '/equipo/reportes',           file: '12-equipo-reportes' },
  { path: '/equipo/certificados',       file: '13-equipo-certificados' },
  { path: '/equipo/alumni',             file: '14-equipo-alumni' },
];

// --- Dev server --------------------------------------------------------------

function startDevServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn('npm', ['run', 'dev'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, FORCE_COLOR: '0', NO_COLOR: '1' },
    });

    let resolved = false;
    let buf = '';
    const onChunk = (chunk) => {
      const text = chunk.toString();
      buf += text;
      process.stdout.write(`[dev] ${text}`);
      if (resolved) return;
      const m = buf.match(/https?:\/\/(?:localhost|127\.0\.0\.1):(\d+)/i);
      if (m) {
        resolved = true;
        const url = `http://localhost:${m[1]}`;
        setTimeout(() => resolve({ url, proc }), 1500);
      }
    };
    proc.stdout.on('data', onChunk);
    proc.stderr.on('data', onChunk);

    proc.on('exit', (code) => {
      if (!resolved) reject(new Error(`dev server exited early (code ${code})`));
    });

    setTimeout(() => {
      if (!resolved) reject(new Error('timeout waiting for dev server URL'));
    }, 60000);
  });
}

async function waitForServer(url, timeoutMs = 60000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.ok || res.status === 304) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`server at ${url} did not become ready`);
}

// --- Capture -----------------------------------------------------------------

async function capture(context, url, outFile, action) {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  } catch (e) {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  }
  await page.waitForTimeout(900);
  if (action) {
    try { await action(page); } catch (e) { console.warn(`  action warn: ${e.message}`); }
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.screenshot({ path: outFile }); // viewport-only, no fullPage
  await page.close();
}

// --- Compose -----------------------------------------------------------------

async function compose(desktopPath, mobilePath, outPath) {
  // Frame anchors: chosen so altura proporcional ≈ 760 sin distorsión.
  // MacBook 14:  1512/982 = 1.539 → 1170 / 1.539 ≈ 760
  // iPhone 17PM:  440/956 = 0.460 →  350 / 0.460 ≈ 761
  const DESKTOP_W  = 1170;
  const MOBILE_W   = 350;
  const TITLEBAR_H = 36;
  const WIN_RADIUS = 12;
  const TRAFFIC_R  = 6;
  const FRAME      = 14;
  const RADIUS     = 48;
  const ISLAND_W   = 90;
  const ISLAND_H   = 26;
  const ISLAND_Y_OFFSET = 12;
  // white gap above the captured content (rendered behind the dynamic island)
  const MOBILE_TOP_PAD = 20;
  const GAP        = 56;
  const PAD        = 40;

  const desktopMeta = await sharp(desktopPath).metadata();
  const mobileMeta  = await sharp(mobilePath).metadata();

  const dH = Math.round(desktopMeta.height * (DESKTOP_W / desktopMeta.width));
  const mH = Math.round(mobileMeta.height  * (MOBILE_W  / mobileMeta.width));

  const desktopBuf = await sharp(desktopPath).resize({ width: DESKTOP_W }).png().toBuffer();
  const mobileBuf  = await sharp(mobilePath ).resize({ width: MOBILE_W  }).png().toBuffer();

  const desktopFrameH = TITLEBAR_H + dH;
  const phoneFrameW   = MOBILE_W + FRAME * 2;
  // mobile inner content = top padding (white, behind dynamic island) + captured screenshot
  const mobileInnerH  = MOBILE_TOP_PAD + mH;
  const phoneFrameH   = mobileInnerH + FRAME * 2;
  const canvasW = PAD * 2 + DESKTOP_W + GAP + phoneFrameW;
  const innerH  = Math.max(desktopFrameH, phoneFrameH);
  const canvasH = PAD * 2 + innerH;

  const desktopX = PAD;
  const mobileX  = PAD + DESKTOP_W + GAP;
  const desktopY = PAD + Math.round((innerH - desktopFrameH) / 2);
  const mobileY  = PAD + Math.round((innerH - phoneFrameH) / 2);

  const innerR = Math.max(RADIUS - FRAME, 0);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${canvasW}" height="${canvasH}">
  <defs>
    <clipPath id="winClip">
      <rect x="${desktopX}" y="${desktopY}" width="${DESKTOP_W}" height="${desktopFrameH}"
            rx="${WIN_RADIUS}" ry="${WIN_RADIUS}"/>
    </clipPath>
    <clipPath id="phoneClip">
      <rect x="${mobileX + FRAME}" y="${mobileY + FRAME}" width="${MOBILE_W}" height="${mobileInnerH}"
            rx="${innerR}" ry="${innerR}"/>
    </clipPath>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="#FFFFFF"/>

  <rect x="${desktopX}" y="${desktopY}" width="${DESKTOP_W}" height="${desktopFrameH}"
        rx="${WIN_RADIUS}" ry="${WIN_RADIUS}" fill="#FFFFFF" filter="url(#shadow)"/>

  <g clip-path="url(#winClip)">
    <rect x="${desktopX}" y="${desktopY}" width="${DESKTOP_W}" height="${TITLEBAR_H}" fill="#E8E8E3"/>
    <image xlink:href="data:image/png;base64,${desktopBuf.toString('base64')}"
           x="${desktopX}" y="${desktopY + TITLEBAR_H}" width="${DESKTOP_W}" height="${dH}"/>
  </g>

  <circle cx="${desktopX + 20}" cy="${desktopY + TITLEBAR_H/2}" r="${TRAFFIC_R}" fill="#FF5F57"/>
  <circle cx="${desktopX + 38}" cy="${desktopY + TITLEBAR_H/2}" r="${TRAFFIC_R}" fill="#FEBC2E"/>
  <circle cx="${desktopX + 56}" cy="${desktopY + TITLEBAR_H/2}" r="${TRAFFIC_R}" fill="#28C840"/>

  <rect x="${desktopX}" y="${desktopY}" width="${DESKTOP_W}" height="${desktopFrameH}"
        rx="${WIN_RADIUS}" ry="${WIN_RADIUS}" fill="none" stroke="#D8D8D3" stroke-width="1"/>

  <rect x="${mobileX}" y="${mobileY}" width="${phoneFrameW}" height="${phoneFrameH}"
        rx="${RADIUS}" ry="${RADIUS}" fill="#1a1a1a" filter="url(#shadow)"/>

  <rect x="${mobileX + FRAME}" y="${mobileY + FRAME}" width="${MOBILE_W}" height="${MOBILE_TOP_PAD}"
        fill="#FFFFFF" clip-path="url(#phoneClip)"/>
  <image xlink:href="data:image/png;base64,${mobileBuf.toString('base64')}"
         x="${mobileX + FRAME}" y="${mobileY + FRAME + MOBILE_TOP_PAD}" width="${MOBILE_W}" height="${mH}"
         clip-path="url(#phoneClip)"/>

  <rect x="${mobileX + FRAME + (MOBILE_W - ISLAND_W)/2}" y="${mobileY + FRAME + ISLAND_Y_OFFSET}"
        width="${ISLAND_W}" height="${ISLAND_H}" rx="${ISLAND_H/2}" ry="${ISLAND_H/2}" fill="#000000"/>
</svg>`;

  await sharp(Buffer.from(svg), { limitInputPixels: false })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
}

// --- Main --------------------------------------------------------------------

async function main() {
  const onlyArg = process.argv.find((a) => a.startsWith('--only='));
  const only = onlyArg ? new Set(onlyArg.slice(7).split(',').map(s => s.trim()).filter(Boolean)) : null;
  const routes = only ? ROUTES.filter((r) => only.has(r.file)) : ROUTES;
  if (only && routes.length === 0) {
    console.error(`No routes matched --only=${onlyArg.slice(7)}`);
    process.exit(2);
  }

  console.log('▶ starting dev server...');
  const { url, proc } = await startDevServer();
  console.log(`▶ dev server URL: ${url}`);
  await waitForServer(url);
  console.log('▶ server responding');

  await mkdir(TMP, { recursive: true });
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const desktop = await browser.newContext(MACBOOK_14);
  const mobile  = await browser.newContext(IPHONE_17_PRO_MAX);

  const failed = [];
  for (const r of routes) {
    const url2 = `${url}${r.path}`;
    const dPath = `${TMP}/${r.file}-desktop.png`;
    const mPath = `${TMP}/${r.file}-mobile.png`;
    const outPath = `${OUT}/${r.file}.png`;
    try {
      console.log(`→ ${r.file}  (${r.path})`);
      await capture(desktop, url2, dPath, r.action?.desktop);
      await capture(mobile,  url2, mPath, r.action?.mobile);
      await compose(dPath, mPath, outPath);
      console.log(`  ✓ ${outPath}`);
    } catch (e) {
      failed.push({ file: r.file, path: r.path, error: e.message });
      console.warn(`  ✗ ${r.file}: ${e.message}`);
    }
  }

  await browser.close();
  proc.kill('SIGTERM');
  await new Promise((r) => setTimeout(r, 1500));
  try { proc.kill('SIGKILL'); } catch {}
  await rm(TMP, { recursive: true, force: true });

  const ok = routes.length - failed.length;
  console.log(`\n=== ${ok}/${routes.length} OK ===`);
  if (failed.length) {
    console.log('Failed:');
    console.table(failed);
  }
  console.log(`→ ${OUT}/`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(2);
});
