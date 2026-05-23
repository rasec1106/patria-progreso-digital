# Patria C — Progreso Digital

> **🌐 Demo desplegada:** https://patria-progreso-digital.lovable.app
> **🎨 Diseño en Figma:** https://www.figma.com/design/ZpnP5ga0l8ygfDjxSadtqw/Patria-C?node-id=0-1&p=f&t=QPEGWYAhppVm0CCz-0

Prototipo de plataforma de evaluación y seguimiento para **Patria C**, la academia ciudadana de **#PerúTeQuiero**. La app cubre dos experiencias paralelas:

- **Becario** — onboarding, progreso por dimensiones, sesiones, mentoría, boleta de salida y certificado.
- **Equipo Patria C** — vista de cohorte, perfil del becario, alertas de riesgo, reportes, certificados y red de alumni.

> Prototipo navegable con datos mock. No hay backend ni persistencia: los datos viven en [src/lib/mock-data.ts](src/lib/mock-data.ts).

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19, SSR sobre Vite)
- [TanStack Router](https://tanstack.com/router) — file-based routing en [src/routes/](src/routes/)
- [Tailwind CSS v4](https://tailwindcss.com) + componentes estilo shadcn sobre [Radix UI](https://www.radix-ui.com)
- [Lucide](https://lucide.dev) para iconos, [Recharts](https://recharts.org) para gráficos
- Despliegue en [Cloudflare Workers](https://developers.cloudflare.com/workers/) vía `@cloudflare/vite-plugin` ([wrangler.jsonc](wrangler.jsonc))

## Arranque

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y elige una de las dos entradas desde la landing.

### Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | ESLint sobre todo el repo |
| `npm run format` | Prettier en modo escritura |

## Rutas principales

| Ruta | Vista |
|---|---|
| `/` | Landing — elige rol (becario / equipo) |
| `/becario` | Inicio del becario (Diego) |
| `/becario/onboarding` · `/progreso` · `/sesiones` · `/mentor` · `/boleta-salida` · `/certificado` · `/alumni` | Flujo del becario |
| `/equipo` | Cohorte (Madison) |
| `/equipo/becario/$id` · `/alertas` · `/reportes` · `/certificados` · `/alumni` | Flujo del equipo |

## Modo wireframe

El layout puede renderizarse en modo lo-fi añadiendo `?wf=...` a cualquier URL. Útil para revisión de arquitectura visual sin distracción de marca:

- `?wf=grayscale` — todo en escala de grises
- `?wf=sketchy` — bordes a mano alzada
- `?wf=blueprint` — estilo plano técnico
- `?wf=skeleton` — máxima abstracción (cajas vacías)

Las hojas viven en [src/styles/](src/styles/) y se montan desde [src/routes/__root.tsx](src/routes/__root.tsx).

## Capturas

Las capturas responsive (MacBook 14" + iPhone 17 Pro Max) están en [docs/screenshots/](docs/screenshots/). Para regenerarlas:

```bash
node scripts/capture-screenshots.mjs
```

El script ([scripts/capture-screenshots.mjs](scripts/capture-screenshots.mjs)) usa Playwright y `sharp` para componer los pares móvil/desktop.

## Estructura

```
src/
├── routes/         # Rutas file-based (TanStack Router)
├── components/     # Componentes de la app + ui/ (shadcn)
├── lib/            # mock-data y utilidades
├── hooks/          # Hooks compartidos
├── styles/         # Hojas de modo wireframe
├── styles.css      # Tailwind v4 + tokens de marca
├── router.tsx      # Configuración del router
└── server.ts       # Entry del Worker
```
