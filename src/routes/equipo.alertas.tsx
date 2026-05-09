import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, MessageSquare } from "lucide-react";
import { BECARIOS } from "@/lib/mock-data";

export const Route = createFileRoute("/equipo/alertas")({
  component: Alertas,
});

function Alertas() {
  const enRiesgo = BECARIOS.filter((b) => b.estado === "riesgo");
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-8 fade-in">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Alertas tempranas</h1>
        <p className="mt-1 text-muted-foreground">Becarios que necesitan una conversación esta semana.</p>
      </header>

      <div className="card-soft divide-y divide-border">
        {enRiesgo.map((b) => (
          <div key={b.id} className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="size-10 rounded-lg bg-warning/15 text-warning grid place-items-center shrink-0">
              <AlertTriangle className="size-5" />
            </div>
            <img src={b.avatar} className="size-12 rounded-full" alt={b.nombre} />
            <div className="flex-1 min-w-0">
              <p className="font-medium">{b.nombre}</p>
              <p className="text-xs text-muted-foreground">{b.region} · Edición {b.edicion} · {b.ultimaActividad}</p>
              <p className="mt-1 text-sm text-warning">{b.alertaRazon}</p>
            </div>
            <div className="flex gap-2">
              <Link to="/equipo/becario/$id" params={{ id: b.id }} className="px-3 py-1.5 rounded-md border border-border text-sm">Ver perfil</Link>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium"><MessageSquare className="size-4" /> Contactar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
