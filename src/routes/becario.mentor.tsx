import { createFileRoute } from "@tanstack/react-router";
import { MENTORS, FEEDBACK_DIEGO } from "@/lib/mock-data";
import { CalendarPlus, MessageSquareDashed } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";

export const Route = createFileRoute("/becario/mentor")({
  component: Mentor,
});

function Mentor() {
  const madison = MENTORS[0];
  const comentarios = FEEDBACK_DIEGO.filter((f) => f.mentorId === "madison");
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-3xl mx-auto fade-in">
      <PageHeader title="Mi mentora" />
      <section className="card-soft p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
        <img src={madison.avatar} className="size-20 sm:size-24 rounded-2xl shrink-0" alt={madison.nombre} />
        <div className="flex-1 min-w-0">
          <p className="text-eyebrow text-primary">{madison.rol}</p>
          <h2 className="text-h2">{madison.nombre}</h2>
          <p className="mt-2 text-sm text-muted-foreground font-serif">{madison.bio}</p>
          <button className="mt-4 touch-target gap-2 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 press focusable">
            <CalendarPlus className="size-4" /> Agendar 15 min
          </button>
        </div>
      </section>

      <h3 className="mt-8 mb-3 font-semibold">Comentarios que te ha dejado</h3>
      {comentarios.length === 0 ? (
        <div className="card-soft">
          <EmptyState
            icon={MessageSquareDashed}
            title="Aún no hay comentarios"
            description="Tu mentora dejará aquí sus observaciones tras las próximas sesiones."
          />
        </div>
      ) : (
        <div className="space-y-3 stagger">
          {comentarios.map((f) => (
            <div key={f.id} className="card-soft p-4">
              <p className="text-meta">{f.fecha}</p>
              <p className="mt-1 font-serif italic">"{f.texto}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
