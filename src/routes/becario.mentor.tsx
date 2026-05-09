import { createFileRoute } from "@tanstack/react-router";
import { MENTORS, FEEDBACK_DIEGO } from "@/lib/mock-data";
import { CalendarPlus } from "lucide-react";

export const Route = createFileRoute("/becario/mentor")({
  component: Mentor,
});

function Mentor() {
  const madison = MENTORS[0];
  return (
    <div className="px-6 lg:px-10 py-8 max-w-3xl mx-auto fade-in">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Mi mentora</h1>
      </header>
      <section className="card-soft p-6 flex flex-col sm:flex-row gap-6 items-start">
        <img src={madison.avatar} className="size-24 rounded-2xl" alt={madison.nombre} />
        <div className="flex-1">
          <p className="text-xs text-primary font-medium uppercase tracking-wider">{madison.rol}</p>
          <h2 className="text-2xl font-semibold">{madison.nombre}</h2>
          <p className="mt-2 text-sm text-muted-foreground font-serif">{madison.bio}</p>
          <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
            <CalendarPlus className="size-4" /> Agendar 15 min
          </button>
        </div>
      </section>

      <h3 className="mt-8 mb-3 font-semibold">Comentarios que te ha dejado</h3>
      <div className="space-y-3">
        {FEEDBACK_DIEGO.filter((f) => f.mentorId === "madison").map((f) => (
          <div key={f.id} className="card-soft p-4">
            <p className="text-xs text-muted-foreground">{f.fecha}</p>
            <p className="mt-1 font-serif italic">"{f.texto}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
