import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageSquarePlus, Mail } from "lucide-react";
import { BECARIOS, DIMENSIONS, FEEDBACK_DIEGO, MENTORS } from "@/lib/mock-data";
import { RadarCompare } from "@/components/RadarCompare";

export const Route = createFileRoute("/equipo/becario/$id")({
  component: BecarioDetalle,
});

function BecarioDetalle() {
  const { id } = Route.useParams();
  const b = BECARIOS.find((x) => x.id === id);
  if (!b) throw notFound();

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8 fade-in">
      <Link to="/equipo" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="size-4" /> Volver a cohorte
      </Link>

      <header className="card-soft p-6 mb-6 flex flex-col sm:flex-row items-start gap-5">
        <img src={b.avatar} alt={b.nombre} className="size-20 rounded-2xl" />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">{b.nombre}</h1>
          <p className="text-sm text-muted-foreground">{b.edad} años · {b.region} · {b.ocupacion}</p>
          <p className="mt-1 text-xs text-primary font-medium">Edición {b.edicion} · Semana {b.semana} de 26</p>
          <p className="mt-3 text-sm font-serif italic max-w-xl">"{b.motivacion}"</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none touch-target gap-1.5 px-3 rounded-lg border border-border text-sm hover:border-primary press focusable"><Mail className="size-4" /> Contactar</button>
          <button className="flex-1 sm:flex-none touch-target gap-1.5 px-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium press focusable"><MessageSquarePlus className="size-4" /> Dejar comentario</button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
        <section className="card-soft p-5 sm:p-6">
          <h2 className="font-semibold mb-3">Boletas comparadas</h2>
          <div className="-mx-2 sm:mx-0">
            <RadarCompare entrada={b.entrada} actual={b.actual} height={300} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {DIMENSIONS.map((d) => (
              <div key={d.key} className="flex items-center justify-between text-sm border-b border-border py-2">
                <span className="text-muted-foreground">{d.short}</span>
                <span><span className="text-muted-foreground">{b.entrada[d.key]}</span> → <span className="font-semibold">{b.actual[d.key]}</span></span>
              </div>
            ))}
          </div>
        </section>

        <section className="card-soft p-6">
          <h2 className="font-semibold mb-3">Historial de feedback</h2>
          <ul className="space-y-4">
            {FEEDBACK_DIEGO.map((f) => {
              const m = MENTORS.find((x) => x.id === f.mentorId)!;
              return (
                <li key={f.id} className="border-l-2 border-primary/40 pl-3">
                  <p className="text-xs text-muted-foreground">{m.nombre} · {f.fecha} · {DIMENSIONS.find((d) => d.key === f.dimension)?.short}</p>
                  <p className="text-sm font-serif italic mt-1">"{f.texto}"</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 border-t border-border pt-4">
            <p className="text-eyebrow mb-2">Dejar comentario</p>
            <label htmlFor="fb-dim" className="sr-only">Dimensión</label>
            <select id="fb-dim" className="w-full text-sm min-h-[44px] px-3 rounded-md border border-border bg-surface mb-2 focusable">
              <option>Selecciona dimensión</option>
              {DIMENSIONS.map((d) => <option key={d.key}>{d.label}</option>)}
            </select>
            <label htmlFor="fb-text" className="sr-only">Observación</label>
            <textarea id="fb-text" rows={3} className="w-full text-sm p-2 rounded-md border border-border bg-surface focusable" placeholder="Escribe tu observación..." />
            <button className="mt-2 touch-target px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium press focusable">Guardar</button>
          </div>
        </section>
      </div>
    </div>
  );
}
