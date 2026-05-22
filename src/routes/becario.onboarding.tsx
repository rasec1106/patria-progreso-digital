import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Compass, Landmark, Building2, TrendingUp, MessagesSquare, ShieldCheck, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { DIMENSIONS, REGIONES, SOFT_SKILLS } from "@/lib/mock-data";

export const Route = createFileRoute("/becario/onboarding")({
  component: Onboarding,
});

const ICONS: Record<string, any> = { Compass, Landmark, Building2, TrendingUp, MessagesSquare, ShieldCheck };

const steps = ["Quién eres", "Tu motivación", "Autoevaluación ciudadana", "Habilidades blandas", "Compromisos"];

function Onboarding() {
  const [step, setStep] = useState(0);
  const [motivacion, setMotivacion] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [soft, setSoft] = useState<Record<string, number>>({});
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const finish = () => setDone(true);

  if (done) {
    return (
      <div className="min-h-screen grid place-items-center px-4 sm:px-6 fade-in">
        <div className="text-center max-w-md">
          <div className="size-20 mx-auto rounded-full bg-success/10 grid place-items-center text-success">
            <Check className="size-10" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight">Listo, Diego.</h1>
          <p className="mt-3 text-muted-foreground font-serif">"Esto no es un examen. Es la foto de dónde estás hoy para que en 6 meses veamos juntos cuánto creciste."</p>
          <button onClick={() => navigate({ to: "/becario" })} className="mt-8 touch-target gap-2 px-5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 press focusable">
            Ir a mi dashboard <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <header className="mb-8">
          <p className="text-eyebrow text-primary">Boleta de entrada</p>
          <h1 className="mt-1.5 text-xl sm:text-2xl font-semibold tracking-tight font-serif">
            Esto no es un examen. Es la foto de dónde estás hoy para que en 6 meses veamos juntos cuánto creciste.
          </h1>
          <div className="mt-6 flex items-center gap-1.5 sm:gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex-1">
                <div className={`h-1.5 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`} />
                <p className={`mt-2 text-[11px] hidden sm:block ${i === step ? "text-primary font-medium" : "text-muted-foreground"}`}>{i+1}. {s}</p>
              </div>
            ))}
          </div>
          {/* En móvil, un solo indicador textual en lugar de 5 etiquetas amontonadas */}
          <p className="mt-2 text-meta sm:hidden">Paso {step+1} de {steps.length}: {steps[step]}</p>
        </header>

        <div className="card-soft p-5 sm:p-6 lg:p-8 fade-in" key={step}>
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Cuéntanos quién eres</h2>
              <Field label="Nombre completo" defaultValue="Diego Quispe Tuanama" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Edad" type="number" defaultValue="22" />
                <Select label="Región" options={REGIONES} defaultValue="San Martín" />
              </div>
              <Field label="Universidad / ocupación" defaultValue="Ciencia Política — USAT" />
              <div>
                <label className="text-sm font-medium">Foto de perfil (opcional)</label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center text-sm text-muted-foreground">
                  Arrastra una foto o haz clic para subir
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold">¿Por qué quieres ser parte de Patria C?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Sin filtros. Lo escribirás de nuevo en 6 meses.</p>
              <textarea
                value={motivacion}
                onChange={(e) => setMotivacion(e.target.value.slice(0, 500))}
                rows={7}
                className="mt-4 w-full p-3 rounded-lg border border-border bg-surface text-sm focus:border-primary outline-none focusable"
                placeholder="Escribe lo que sientes, no lo que crees que queremos leer."
              />
              <p className="text-right text-xs text-muted-foreground mt-1">{motivacion.length}/500</p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold">Autoevaluación ciudadana</h2>
              <p className="mt-1 text-sm text-muted-foreground">Del 1 (recién explorando) al 5 (lo manejo y lo enseño).</p>
              <div className="mt-5 space-y-5">
                {DIMENSIONS.map((d) => {
                  const Icon = ICONS[d.icon];
                  return (
                    <div key={d.key}>
                      <div className="flex items-start gap-3">
                        <div className="size-9 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0"><Icon className="size-4" /></div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{d.label}</p>
                          <p className="text-xs text-muted-foreground">{d.description}</p>
                        </div>
                      </div>
                      <div className="mt-3 ml-12 flex gap-1.5 sm:gap-2">
                        {[1,2,3,4,5].map((n) => (
                          <button key={n} onClick={() => setScores((s) => ({ ...s, [d.key]: n }))}
                            className={`flex-1 min-h-[44px] rounded-lg border text-sm font-medium transition-colors press focusable ${scores[d.key] === n ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}>
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold">Habilidades blandas</h2>
              <p className="mt-1 text-sm text-muted-foreground">Honestidad antes que humildad falsa.</p>
              <div className="mt-5 space-y-4">
                {SOFT_SKILLS.map((s) => (
                  <div key={s}>
                    <p className="text-sm font-medium">{s}</p>
                    <div className="mt-2 flex gap-1.5 sm:gap-2">
                      {[1,2,3,4,5].map((n) => (
                        <button key={n} onClick={() => setSoft((x) => ({ ...x, [s]: n }))}
                          className={`flex-1 min-h-[44px] rounded-lg border text-sm font-medium press focusable ${soft[s] === n ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40"}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold">Mis compromisos</h2>
              <div className="mt-5 space-y-3">
                {[
                  "Me comprometo a participar activamente en las 26 sesiones del programa.",
                  "Me comprometo a desarrollar un proyecto de impacto en mi región.",
                  "Me comprometo a tratar con respeto a compañeros, mentores y aliados.",
                  "Acepto recibir feedback honesto de mi mentor.",
                ].map((t, i) => (
                  <label key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 accent-[var(--color-primary)]" />
                    <span className="text-sm">{t}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6">
                <label htmlFor="firma" className="text-sm font-medium">Firma digital (escribe tu nombre completo)</label>
                <input id="firma" className="mt-2 w-full min-h-[44px] px-3 rounded-lg border border-border bg-surface text-sm font-serif italic focus:border-primary outline-none focusable" defaultValue="Diego Quispe Tuanama" />
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button onClick={back} disabled={step === 0} className="touch-target gap-1.5 px-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 press focusable">
              <ArrowLeft className="size-4" /> Atrás
            </button>
            {step < steps.length - 1 ? (
              <button onClick={next} className="touch-target gap-2 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 press focusable">
                Siguiente <ArrowRight className="size-4" />
              </button>
            ) : (
              <button onClick={finish} className="touch-target gap-2 px-5 rounded-lg bg-success text-success-foreground text-sm font-medium hover:opacity-90 press focusable">
                Enviar boleta <Check className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...rest }: any) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input {...rest} className="mt-1.5 w-full min-h-[44px] px-3 rounded-lg border border-border bg-surface text-sm focus:border-primary outline-none focusable" />
    </label>
  );
}
function Select({ label, options, defaultValue }: { label: string; options: string[]; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <select defaultValue={defaultValue} className="mt-1.5 w-full min-h-[44px] px-3 rounded-lg border border-border bg-surface text-sm focus:border-primary outline-none focusable">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
