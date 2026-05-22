import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { SESIONES } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { StatusChip } from "@/components/StatusChip";
import { EmptyState } from "@/components/EmptyState";

export const Route = createFileRoute("/becario/sesiones")({
  component: Sesiones,
});

function Sesiones() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-[1100px] mx-auto fade-in">
      <PageHeader
        title="Mis sesiones"
        description="26 sesiones del programa. Vas en la 12."
      />
      {SESIONES.length === 0 ? (
        <div className="card-soft">
          <EmptyState
            icon={CalendarDays}
            title="Todavía no hay sesiones registradas"
            description="Cuando el programa publique tu calendario, lo verás aquí."
          />
        </div>
      ) : (
        <div className="card-soft p-2">
          {SESIONES.map((s, i) => (
            <div key={s.numero} className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 ${i !== SESIONES.length-1 ? "border-b border-border" : ""}`}>
              <div className="size-10 rounded-lg bg-primary/10 text-primary grid place-items-center text-sm font-semibold shrink-0">{s.numero}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{s.titulo}</p>
                <p className="text-meta">{s.fecha} · Bloque {s.bloque}</p>
              </div>
              <StatusChip variant={s.modalidad === "Presencial" ? "presencial" : "virtual"} className="hidden sm:inline-flex" />
              <StatusChip variant="completada" label="Completada" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
