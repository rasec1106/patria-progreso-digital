import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, MessageSquareQuote, Sparkles, Calendar, ArrowRight, Inbox, CalendarClock } from "lucide-react";
import { RadarCompare } from "@/components/RadarCompare";
import { DIEGO, FEEDBACK_DIEGO, MENTORS, PROXIMAS_SESIONES, DIMENSIONS } from "@/lib/mock-data";
import { StatusChip } from "@/components/StatusChip";
import { EmptyState } from "@/components/EmptyState";

export const Route = createFileRoute("/becario/")({
  component: BecarioHome,
});

function BecarioHome() {
  // pick highest-growth dimension
  const growth = DIMENSIONS.map((d) => ({ d, delta: (DIEGO.actual[d.key] - DIEGO.entrada[d.key]) }))
    .sort((a,b) => b.delta - a.delta)[0];

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-[1100px] mx-auto fade-in">
      <header className="mb-8">
        <p className="text-eyebrow">Edición 4 · Semana {DIEGO.semana} de 26</p>
        <h1 className="mt-1.5 text-3xl lg:text-4xl font-semibold tracking-tight">
          Hola Diego, llevas <span className="text-primary">12 semanas</span> en Patria C 👋
        </h1>
        <p className="mt-2 text-muted-foreground">Vas bien. Esto recién empieza.</p>
      </header>

      <section className="card-soft p-5 sm:p-6 mb-6">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 items-center">
          <div className="-mx-2 sm:mx-0">
            <RadarCompare entrada={DIEGO.entrada} actual={DIEGO.actual} height={280} />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-success/10 text-success">
              <Sparkles className="size-3" /> Crecimiento destacado
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Has crecido más en <span className="text-success">{growth.d.short}</span>
              <span className="text-success"> (+{growth.delta.toFixed(1)} pts)</span>.
            </h2>
            <p className="mt-2 text-muted-foreground">
              Sigue así. Tu mentora Madison notó tu manera de moderar grupos en el bootcamp regional.
            </p>
            <Link to="/becario/progreso" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all">
              Ver mi progreso completo <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <section className="card-soft p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="font-semibold flex items-center gap-2 min-w-0"><MessageSquareQuote className="size-4 text-primary shrink-0" /> Feedback reciente</h3>
            <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">{FEEDBACK_DIEGO.length} comentarios</span>
          </div>
          {FEEDBACK_DIEGO.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="Aún no tienes feedback"
              description="Cuando tu mentora deje un comentario, aparecerá aquí."
              className="py-8"
            />
          ) : (
            <ul className="space-y-4">
              {FEEDBACK_DIEGO.slice(0,3).map((f) => {
                const m = MENTORS.find((x) => x.id === f.mentorId)!;
                return (
                  <li key={f.id} className="flex gap-3">
                    <img src={m.avatar} alt={m.nombre} className="size-9 rounded-full shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <p className="text-sm font-medium">{m.nombre}</p>
                        <p className="text-meta">{m.rol} · {f.fecha}</p>
                      </div>
                      <p className="mt-1 text-sm text-foreground/85 leading-relaxed font-serif">"{f.texto}"</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="card-soft p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><CalendarDays className="size-4 text-primary" /> Próximas sesiones</h3>
          </div>
          {PROXIMAS_SESIONES.length === 0 ? (
            <EmptyState
              icon={CalendarClock}
              title="No hay sesiones programadas"
              description="Tus próximas sesiones aparecerán aquí en cuanto se publiquen."
              className="py-8"
            />
          ) : (
            <ul className="space-y-3">
              {PROXIMAS_SESIONES.map((s) => (
                <li key={s.numero} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 transition-colors">
                  <div className="size-11 sm:size-12 rounded-lg bg-muted grid place-items-center text-center shrink-0">
                    <Calendar className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">Sesión {s.numero}: {s.titulo}</p>
                      <StatusChip variant={s.modalidad === "Presencial" ? "presencial" : "virtual"} className="mt-0.5" />
                    </div>
                    <p className="text-meta mt-0.5">{s.fecha} · {s.hora}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat label="Sesiones asistidas" value="11" total="/12" />
        <Stat label="Proyectos entregados" value="2" />
        <Stat label="Horas de bootcamp" value="34" />
        <Stat label="Mentorías recibidas" value="6" />
      </section>

      <section className="rounded-2xl shadow-lg p-6 lg:p-8 patria-gradient text-primary-foreground">
        <p className="text-sm opacity-90">Tu camino</p>
        <h3 className="mt-1 text-2xl font-semibold">Faltan 14 semanas para tu graduación.</h3>
        <p className="mt-2 max-w-xl opacity-95 font-serif">Tu mentora está acá si necesitas conversar. No tienes que tener todo claro — solo dar el siguiente paso.</p>
        <button className="mt-5 touch-target gap-2 px-4 rounded-lg bg-white text-primary text-sm font-semibold hover:bg-white/90 transition-colors press focusable">
          Agendar 15 min con Madison <ArrowRight className="size-4" />
        </button>
      </section>

      <div className="mt-8 text-center">
        <Link to="/becario/boleta-salida" className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4">
          ¿Llegaste a la semana 26? Completa tu boleta de salida →
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value, total }: { label: string; value: string; total?: string }) {
  return (
    <div className="card-soft p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight">
        {value}{total && <span className="text-base text-muted-foreground font-normal">{total}</span>}
      </p>
    </div>
  );
}
