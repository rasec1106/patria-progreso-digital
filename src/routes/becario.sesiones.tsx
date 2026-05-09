import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { SESIONES } from "@/lib/mock-data";

export const Route = createFileRoute("/becario/sesiones")({
  component: Sesiones,
});

function Sesiones() {
  return (
    <div className="px-6 lg:px-10 py-8 max-w-[1100px] mx-auto fade-in">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Mis sesiones</h1>
        <p className="mt-1 text-muted-foreground">26 sesiones del programa. Vas en la 12.</p>
      </header>
      <div className="card-soft p-2">
        {SESIONES.map((s, i) => (
          <div key={s.numero} className={`flex items-center gap-4 p-4 ${i !== SESIONES.length-1 ? "border-b border-border" : ""}`}>
            <div className="size-10 rounded-lg bg-primary/10 text-primary grid place-items-center text-sm font-semibold shrink-0">{s.numero}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{s.titulo}</p>
              <p className="text-xs text-muted-foreground">{s.fecha} · Bloque {s.bloque}</p>
            </div>
            <span className={`text-[11px] px-2 py-1 rounded-full font-medium ${s.modalidad === "Presencial" ? "bg-gold/15 border border-gold/30" : "bg-muted text-muted-foreground"}`}>{s.modalidad}</span>
            <span className="text-[11px] text-success font-medium">Completada</span>
          </div>
        ))}
      </div>
    </div>
  );
}
