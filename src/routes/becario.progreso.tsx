import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, BookOpen, PlayCircle } from "lucide-react";
import { LineChart as RLine, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { DIEGO, DIMENSIONS, FEEDBACK_DIEGO, MENTORS } from "@/lib/mock-data";
import { RadarCompare } from "@/components/RadarCompare";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/becario/progreso")({
  component: Progreso,
});

function Progreso() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-[1100px] mx-auto fade-in">
      <PageHeader
        title="Mi progreso"
        description="Tu evolución en las 6 dimensiones ciudadanas."
      />

      <section className="card-soft p-4 sm:p-6 mb-8">
        <RadarCompare entrada={DIEGO.entrada} actual={DIEGO.actual} height={360} />
      </section>

      <section className="space-y-3">
        {DIMENSIONS.map((d) => {
          const isOpen = open === d.key;
          const entrada = DIEGO.entrada[d.key];
          const actual = DIEGO.actual[d.key];
          const delta = (actual - entrada).toFixed(1);
          const trend = Array.from({ length: 12 }, (_, i) => ({
            sesion: i + 1,
            valor: +(entrada + ((actual - entrada) * (i + 1)) / 12 + (Math.sin(i) * 0.12)).toFixed(2),
          }));
          const fb = FEEDBACK_DIEGO.find((f) => f.dimension === d.key);
          return (
            <div key={d.key} className="card-soft overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : d.key)} aria-expanded={isOpen} className="w-full p-4 sm:p-5 flex items-center gap-3 sm:gap-4 text-left hover:bg-muted/30 transition-colors focusable">
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{d.label}</p>
                  <p className="text-meta mt-0.5">{d.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm"><span className="text-muted-foreground">{entrada}</span> → <span className="font-semibold text-primary">{actual}</span></p>
                  <p className="text-xs text-success font-medium">+{delta} pts</p>
                </div>
                <ChevronDown className={`size-5 text-muted-foreground transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="border-t border-border p-4 sm:p-5 grid lg:grid-cols-[1.4fr_1fr] gap-6 fade-in">
                  <div>
                    <p className="text-eyebrow mb-2">Evolución por sesión</p>
                    <ResponsiveContainer width="100%" height={180}>
                      <RLine data={trend} margin={{ left: -10, right: 5, top: 5, bottom: 0 }}>
                        <XAxis dataKey="sesion" tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                        <YAxis domain={[0, 5]} tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                        <Line type="monotone" dataKey="valor" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 3 }} />
                      </RLine>
                    </ResponsiveContainer>
                    {fb && (
                      <div className="mt-3 p-3 rounded-lg bg-muted/40">
                        <p className="text-xs text-muted-foreground mb-1">Comentario de {MENTORS.find((m) => m.id === fb.mentorId)?.nombre}</p>
                        <p className="text-sm font-serif italic">"{fb.texto}"</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-eyebrow mb-2">Recursos sugeridos</p>
                    <ul className="space-y-2">
                      {[
                        { icon: PlayCircle, t: `Charla TED: ${d.short} en el Perú`, sub: "12 min" },
                        { icon: BookOpen, t: `Lectura: ${d.label}`, sub: "8 min · IEP" },
                        { icon: PlayCircle, t: `Clase Patria C: ${d.short} aplicado`, sub: "Bloque 3" },
                      ].map((r, i) => {
                        const Icon = r.icon;
                        return (
                          <li key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-border hover:border-primary/40 transition-colors">
                            <Icon className="size-4 text-primary shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm truncate">{r.t}</p>
                              <p className="text-meta">{r.sub}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
