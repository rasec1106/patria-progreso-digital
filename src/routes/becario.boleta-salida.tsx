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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-32 sm:pb-10 fade-in">
        <header className="mb-6">
          <p className="text-eyebrow text-primary">Boleta de salida · Edición 4</p>
          <h1 className="mt-1.5 text-xl sm:text-2xl font-semibold tracking-tight font-serif">
            Mírate ahora, mira al Diego que llegó. Lo que escribas hoy es tu testimonio.
          </h1>
          <div className="mt-5 h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${((step+1)/DIMENSIONS.length)*100}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Dimensión {step+1} de {DIMENSIONS.length}: {dim.label}</p>
        </header>

        <div className="card-soft p-5 sm:p-8 fade-in" key={step}>
          <h2 className="text-lg sm:text-xl font-semibold">{dim.label}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{dim.description}</p>

          {/* Entrada (compact card on top in mobile, left column on desktop) */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-dashed border-border p-3 bg-muted/30 flex sm:block items-center justify-between gap-3">
              <p className="text-eyebrow">Tu boleta de entrada</p>
              <p className="sm:mt-1 text-2xl sm:text-3xl font-semibold text-muted-foreground">
                {DIEGO.entrada[dim.key]}<span className="text-xs text-muted-foreground font-normal"> /5</span>
              </p>
            </div>
            <div className="rounded-lg border border-primary/30 p-3 bg-primary/5">
              <p className="text-eyebrow text-primary">Hoy te das</p>
              <div className="mt-2 flex gap-1.5">
                {[1,2,3,4,5].map((n) => (
                  <button key={n} className={`flex-1 min-h-[44px] rounded border text-sm font-medium press focusable ${n === Math.round(DIEGO.actual[dim.key]) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="cambio" className="text-sm font-medium">¿Qué cambió en ti?</label>
            <textarea id="cambio" rows={4} className="mt-2 w-full p-3 rounded-lg border border-border bg-surface text-sm focus:border-primary outline-none focusable" placeholder="Una historia, una sesión, una conversación que te marcó..." />
          </div>

          {/* Desktop inline actions */}
          <div className="mt-7 hidden sm:flex items-center justify-between">
            <button onClick={() => setStep((s) => Math.max(0, s-1))} disabled={step === 0} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 min-h-[44px] px-2">
              <ArrowLeft className="size-4" /> Anterior
            </button>
            {step < DIMENSIONS.length - 1 ? (
              <button onClick={() => setStep((s) => s+1)} className="inline-flex items-center gap-2 px-5 min-h-[44px] rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
                Siguiente <ArrowRight className="size-4" />
              </button>
            ) : (
              <button onClick={() => setDone(true)} className="inline-flex items-center gap-2 px-5 min-h-[44px] rounded-lg bg-success text-success-foreground text-sm font-medium hover:opacity-90">
                Cerrar mi camino <Sparkles className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div
        className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur border-t border-border px-4 py-3 flex items-center gap-3"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <button
          onClick={() => setStep((s) => Math.max(0, s-1))}
          disabled={step === 0}
          className="min-h-[48px] px-4 rounded-lg border border-border text-sm font-medium disabled:opacity-30 inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="size-4" /> Atrás
        </button>
        {step < DIMENSIONS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s+1)}
            className="flex-1 min-h-[48px] rounded-lg bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center justify-center gap-2"
          >
            Siguiente <ArrowRight className="size-4" />
          </button>
        ) : (
          <button
            onClick={() => setDone(true)}
            className="flex-1 min-h-[48px] rounded-lg bg-success text-success-foreground text-sm font-semibold inline-flex items-center justify-center gap-2"
          >
            Cerrar mi camino <Sparkles className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function Celebracion() {
  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 py-10 sm:py-12 fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-gold/15 text-foreground border border-gold/40">
          <Sparkles className="size-3" /> Edición 4 · Graduación
        </span>
        <h1 className="mt-5 text-4xl lg:text-5xl font-semibold tracking-tight">Esto fue tu camino, Diego.</h1>
        <p className="mt-4 text-muted-foreground font-serif text-lg">"Acá nadie se queda atrás."</p>

        <div className="mt-10 card-soft p-4 sm:p-6">
          <RadarCompare entrada={DIEGO.entrada} actual={DIEGO.actual} height={380} labelEntrada="Cuando llegaste" labelActual="Cuando te gradúas" />
        </div>

        <div className="mt-8 card-soft p-5 sm:p-6 text-left">
          <p className="text-eyebrow">Recordemos por qué empezaste</p>
          <p className="mt-2 font-serif text-xl italic">"{DIEGO.motivacion}"</p>
          <p className="mt-2 text-sm text-muted-foreground">— Tú, hace 26 semanas.</p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3">
          <Link to="/becario/certificado" className="touch-target gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 press focusable">
            <Download className="size-4" /> Descargar mi certificado
          </Link>
          <Link to="/becario/alumni" className="touch-target gap-2 px-5 py-3 rounded-lg border border-border hover:border-primary text-sm font-medium press focusable">
            <Users2 className="size-4" /> Entrar a la Red Alumni
          </Link>
        </div>
      </div>
    </div>
  );
}
