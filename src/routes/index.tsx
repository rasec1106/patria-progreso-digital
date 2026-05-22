import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, ShieldCheck } from "lucide-react";
import { ALIADOS } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Patria C — Tu camino ciudadano empieza aquí" },
      { name: "description", content: "Academia ciudadana de #PerúTeQuiero. Becas integrales 100% cubiertas para jóvenes líderes peruanos." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="size-9 rounded-lg patria-gradient grid place-items-center text-primary-foreground font-bold">P</span>
          <div className="leading-tight">
            <p className="font-semibold tracking-tight">Patria C</p>
            <p className="text-meta">#PerúTeQuiero</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground hidden sm:block">Edición 4 · 2026</p>
      </header>

      <main className="flex-1 grid lg:grid-cols-2 gap-10 lg:gap-16 px-4 sm:px-6 lg:px-16 py-8 lg:py-14 max-w-[1400px] mx-auto w-full items-center">
        <section>
          <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
            <span className="size-1.5 rounded-full bg-primary" /> Plataforma de evaluación
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            Tu camino <span className="text-primary">ciudadano</span><br/>empieza aquí.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-lg font-serif italic">
            "Acá nadie se queda atrás." — Academia ciudadana de #PerúTeQuiero que forma jóvenes peruanos en liderazgo y democracia.
          </p>

          <div className="mt-10">
            <div className="grid sm:grid-cols-2 gap-4 stagger">
              <Link to="/becario" className="group card-soft p-5 flex flex-col hover:border-primary transition-all press focusable">
                <div className="size-10 rounded-lg bg-primary/10 text-primary grid place-items-center mb-3">
                  <GraduationCap className="size-5" />
                </div>
                <p className="font-semibold">Soy becario</p>
                <p className="text-xs text-muted-foreground mt-1">Veo mi progreso, recibo feedback y descargo mi certificado.</p>
                <span className="mt-auto pt-3 inline-flex items-center text-sm text-primary font-medium gap-1 group-hover:gap-2 transition-all">
                  Entrar como Diego <ArrowRight className="size-4" />
                </span>
              </Link>
              <Link to="/equipo" className="group card-soft p-5 flex flex-col hover:border-primary transition-all press focusable">
                <div className="size-10 rounded-lg bg-primary/10 text-primary grid place-items-center mb-3">
                  <ShieldCheck className="size-5" />
                </div>
                <p className="font-semibold">Soy del equipo Patria C</p>
                <p className="text-xs text-muted-foreground mt-1">Gestiono cohortes, identifico riesgo y genero reportes.</p>
                <span className="mt-auto pt-3 inline-flex items-center text-sm text-primary font-medium gap-1 group-hover:gap-2 transition-all">
                  Entrar como Madison <ArrowRight className="size-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="rounded-3xl overflow-hidden patria-gradient relative shadow-xl sm:aspect-[4/3] lg:aspect-[4/5]">
            <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
            <div className="relative p-6 sm:p-8 flex flex-col justify-end text-primary-foreground sm:absolute sm:inset-0">
              <p className="font-serif text-2xl leading-tight">
                "Quiero que mi región tenga voz en Lima."
              </p>
              <p className="mt-3 text-sm opacity-90">— Diego Quispe, becario edición 4, Tarapoto.</p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <Stat n="600" l="becarios 2026" />
                <Stat n="25" l="regiones" />
                <Stat n="100%" l="becas cubiertas" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 sm:px-6 lg:px-10 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Patria C · Academia ciudadana de #PerúTeQuiero</p>
          <div className="flex items-center flex-wrap gap-x-5 gap-y-2">
            <p className="text-eyebrow tracking-widest">Aliados</p>
            {ALIADOS.map((a) => (
              <span key={a} className="text-sm font-medium text-foreground/70">{a}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-xl bg-white/15 backdrop-blur-sm py-3 px-2">
      <p className="text-xl sm:text-2xl font-semibold">{n}</p>
      <p className="text-[11px] uppercase tracking-wider opacity-80">{l}</p>
    </div>
  );
}
