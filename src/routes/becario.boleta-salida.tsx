import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles, Download, Users2 } from "lucide-react";
import { DIEGO, DIMENSIONS } from "@/lib/mock-data";
import { RadarCompare } from "@/components/RadarCompare";

export const Route = createFileRoute("/becario/boleta-salida")({
  component: Salida,
});

function Salida() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const dim = DIMENSIONS[step];

  if (done) return <Celebracion />;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-10 fade-in">
        <header className="mb-6">
          <p className="text-sm text-primary font-medium">Boleta de salida · Edición 4</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight font-serif">
            Mírate ahora, mira al Diego que llegó. Lo que escribas hoy es tu testimonio.
          </h1>
          <div className="mt-5 h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${((step+1)/DIMENSIONS.length)*100}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Dimensión {step+1} de {DIMENSIONS.length}: {dim.label}</p>
        </header>

        <div className="card-soft p-6 lg:p-8 fade-in" key={step}>
          <h2 className="text-xl font-semibold">{dim.label}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{dim.description}</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-dashed border-border p-3 bg-muted/30">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Tu boleta de entrada</p>
              <p className="mt-1 text-3xl font-semibold text-muted-foreground">{DIEGO.entrada[dim.key]}</p>
              <p className="text-[11px] text-muted-foreground">de 5</p>
            </div>
            <div className="rounded-lg border border-primary/30 p-3 bg-primary/5">
              <p className="text-[11px] uppercase tracking-wider text-primary">Hoy te das</p>
              <div className="mt-2 flex gap-1">
                {[1,2,3,4,5].map((n) => (
                  <button key={n} className={`flex-1 h-10 rounded border text-sm font-medium ${n === Math.round(DIEGO.actual[dim.key]) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label className="text-sm font-medium">¿Qué cambió en ti?</label>
            <textarea rows={4} className="mt-2 w-full p-3 rounded-lg border border-border bg-surface text-sm focus:border-primary outline-none" placeholder="Una historia, una sesión, una conversación que te marcó..." />
          </div>

          <div className="mt-7 flex items-center justify-between">
            <button onClick={() => setStep((s) => Math.max(0, s-1))} disabled={step === 0} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30">
              <ArrowLeft className="size-4" /> Anterior
            </button>
            {step < DIMENSIONS.length - 1 ? (
              <button onClick={() => setStep((s) => s+1)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
                Siguiente <ArrowRight className="size-4" />
              </button>
            ) : (
              <button onClick={() => setDone(true)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-success text-success-foreground text-sm font-medium hover:opacity-90">
                Cerrar mi camino <Sparkles className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Celebracion() {
  return (
    <div className="min-h-screen bg-background px-6 py-12 fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-gold/15 text-foreground border border-gold/40">
          <Sparkles className="size-3" /> Edición 4 · Graduación
        </span>
        <h1 className="mt-5 text-4xl lg:text-5xl font-semibold tracking-tight">Esto fue tu camino, Diego.</h1>
        <p className="mt-4 text-muted-foreground font-serif text-lg">"Acá nadie se queda atrás."</p>

        <div className="mt-10 card-soft p-6">
          <RadarCompare entrada={DIEGO.entrada} actual={DIEGO.actual} height={380} labelEntrada="Cuando llegaste" labelActual="Cuando te gradúas" />
        </div>

        <div className="mt-8 card-soft p-6 text-left">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Recordemos por qué empezaste</p>
          <p className="mt-2 font-serif text-xl italic">"{DIEGO.motivacion}"</p>
          <p className="mt-2 text-sm text-muted-foreground">— Tú, hace 26 semanas.</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/becario/certificado" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
            <Download className="size-4" /> Descargar mi certificado
          </Link>
          <Link to="/alumni" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border hover:border-primary text-sm font-medium">
            <Users2 className="size-4" /> Entrar a la Red Alumni
          </Link>
        </div>
      </div>
    </div>
  );
}
