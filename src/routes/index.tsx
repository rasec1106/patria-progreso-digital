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
      <header className="px-6 lg:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="size-9 rounded-lg patria-gradient grid place-items-center text-primary-foreground font-bold">P</span>
          <div className="leading-tight">
            <p className="font-semibold tracking-tight">Patria C</p>
            <p className="text-[11px] text-muted-foreground">#PerúTeQuiero</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground hidden sm:block">Edición 4 · 2026</p>
      </header>

      <main className="flex-1 grid lg:grid-cols-2 gap-10 lg:gap-16 px-6 lg:px-16 py-8 lg:py-14 max-w-[1400px] mx-auto w-full items-center">
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
            <p className="text-sm font-medium mb-3">Para el prototipo, ingresa con:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/becario" className="group card-soft p-5 hover:border-primary transition-all">
                <div className="size-10 rounded-lg bg-primary/10 text-primary grid place-items-center mb-3">
                  <GraduationCap className="size-5" />
                </div>
                <p className="font-semibold">Soy becario</p>
                <p className="text-xs text-muted-foreground mt-1">Veo mi progreso, recibo feedback y descargo mi certificado.</p>
                <span className="mt-3 inline-flex items-center text-sm text-primary font-medium gap-1 group-hover:gap-2 transition-all">
                  Entrar como Diego <ArrowRight className="size-4" />
                </span>
              </Link>
              <Link to="/equipo" className="group card-soft p-5 hover:border-primary transition-all">
                <div className="size-10 rounded-lg bg-primary/10 text-primary grid place-items-center mb-3">
                  <ShieldCheck className="size-5" />
                </div>
                <p className="font-semibold">Soy del equipo Patria C</p>
                <p className="text-xs text-muted-foreground mt-1">Gestiono cohortes, identifico riesgo y genero reportes.</p>
                <span className="mt-3 inline-flex items-center text-sm text-primary font-medium gap-1 group-hover:gap-2 transition-all">
                  Entrar como Madison <ArrowRight className="size-4" />
                </span>
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Selector visual sin login real, solo para esta validación.</p>
          </div>
        </section>

        <section className="relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden patria-gradient relative shadow-xl">
            <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-primary-foreground">
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
          <div className="absolute -bottom-6 -left-6 hidden md:block card-soft p-4 max-w-[220px]">
            <p className="text-xs text-muted-foreground">Crecimiento promedio</p>
            <p className="text-2xl font-semibold text-success">+1.4 pts</p>
            <p className="text-[11px] text-muted-foreground">en las 6 dimensiones ciudadanas</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 lg:px-10 py-6">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Patria C · Academia ciudadana de #PerúTeQuiero</p>
          <div className="flex items-center gap-5">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Aliados</p>
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
      <p className="text-2xl font-semibold">{n}</p>
      <p className="text-[10px] uppercase tracking-wider opacity-80">{l}</p>
    </div>
  );
}
