import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Calendar, CalendarClock, ChevronDown } from "lucide-react";
import { SESIONES, PROXIMAS_SESIONES, dimensionObjetivo, type Sesion } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { StatusChip } from "@/components/StatusChip";
import { EmptyState } from "@/components/EmptyState";

export const Route = createFileRoute("/becario/sesiones")({
  component: Sesiones,
});

// Agrupa las sesiones por dimensión conservando el orden en que aparecen.
function agruparPorDimension(sesiones: Sesion[]) {
  return sesiones.reduce<{ nombre: string; sesiones: Sesion[] }[]>((acc, s) => {
    const grupo = acc.find((g) => g.nombre === s.dimension);
    if (grupo) grupo.sesiones.push(s);
    else acc.push({ nombre: s.dimension, sesiones: [s] });
    return acc;
  }, []);
}

function Sesiones() {
  const proximas = PROXIMAS_SESIONES.slice(0, 5);
  const dimensiones = agruparPorDimension(SESIONES);
  // Abre por defecto la dimensión de la próxima sesión (donde está parado el becario).
  const [open, setOpen] = useState<string | null>(proximas[0]?.dimension ?? dimensiones[0]?.nombre ?? null);

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
        <div className="space-y-8">
          {/* Próximas sesiones — vista de seguimiento */}
          {proximas.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <CalendarClock className="size-4 text-primary" />
                <h2 className="font-semibold">Próximas sesiones</h2>
                <span className="text-meta">Las {proximas.length} que vienen</span>
              </div>
              <ul className="space-y-2">
                {proximas.map((s) => (
                  <li key={s.numero} className="card-soft flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:border-primary/40 transition-colors">
                    <div className="size-11 sm:size-12 rounded-lg bg-muted grid place-items-center text-center shrink-0">
                      <Calendar className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Sesión {s.numero}: {s.titulo}</p>
                      <p className="text-meta mt-0.5">{s.fecha} · {s.hora} · Dimensión {s.dimension}</p>
                    </div>
                    <StatusChip variant={s.modalidad === "Presencial" ? "presencial" : "virtual"} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Todas las sesiones agrupadas por dimensión (dropdown) */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays className="size-4 text-primary" />
              <h2 className="font-semibold">Sesiones por dimensión</h2>
            </div>
            <div className="space-y-3">
              {dimensiones.map((b) => {
                const isOpen = open === b.nombre;
                const completadas = b.sesiones.filter((s) => s.estado === "completada").length;
                const objetivo = dimensionObjetivo(b.nombre);
                return (
                  <div key={b.nombre} className="card-soft overflow-hidden">
                    <button
                      onClick={() => setOpen(isOpen ? null : b.nombre)}
                      aria-expanded={isOpen}
                      className="w-full p-4 sm:p-5 flex items-center gap-3 sm:gap-4 text-left hover:bg-muted/30 transition-colors focusable"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">Dimensión {b.nombre}</p>
                        {objetivo && <p className="text-meta mt-0.5">{objetivo}</p>}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-primary">{completadas}/{b.sesiones.length}</p>
                        <p className="text-xs text-muted-foreground">completadas</p>
                      </div>
                      <ChevronDown className={`size-5 text-muted-foreground transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="border-t border-border p-2 fade-in">
                        {b.sesiones.map((s, i) => (
                          <div key={s.numero} className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 ${i !== b.sesiones.length - 1 ? "border-b border-border" : ""}`}>
                            <div className={`size-10 rounded-lg grid place-items-center text-sm font-semibold shrink-0 ${s.estado === "completada" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{s.numero}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{s.titulo}</p>
                              <p className="text-meta">{s.fecha} · {s.hora}</p>
                            </div>
                            <StatusChip variant={s.modalidad === "Presencial" ? "presencial" : "virtual"} className="hidden sm:inline-flex" />
                            <StatusChip variant={s.estado === "completada" ? "completada" : "pendiente"} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
