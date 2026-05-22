import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, MessageSquare, ShieldCheck } from "lucide-react";
import { BECARIOS } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { StatusChip } from "@/components/StatusChip";
import { EmptyState } from "@/components/EmptyState";

export const Route = createFileRoute("/equipo/alertas")({
  component: Alertas,
});

function Alertas() {
  const enRiesgo = BECARIOS.filter((b) => b.estado === "riesgo");
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8 fade-in">
      <PageHeader
        eyebrow={`${enRiesgo.length} becarios en seguimiento`}
        title="Alertas tempranas"
        description="Becarios que necesitan una conversación esta semana."
      />

      {enRiesgo.length === 0 ? (
        <div className="card-soft">
          <EmptyState
            icon={ShieldCheck}
            title="Sin alertas esta semana"
            description="Todo el equipo está al día. No hay becarios en riesgo por ahora."
          />
        </div>
      ) : (
        <div className="card-soft divide-y divide-border stagger">
          {enRiesgo.map((b) => (
            <div key={b.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="size-10 rounded-lg bg-warning/15 text-warning grid place-items-center shrink-0">
                <AlertTriangle className="size-5" />
              </div>
              <img src={b.avatar} className="size-12 rounded-full shrink-0" alt={b.nombre} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium">{b.nombre}</p>
                  <StatusChip variant="riesgo" />
                </div>
                <p className="text-meta">{b.region} · Edición {b.edicion} · {b.ultimaActividad}</p>
                <p className="mt-1 text-sm text-warning">{b.alertaRazon}</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Link to="/equipo/becario/$id" params={{ id: b.id }} className="flex-1 sm:flex-none touch-target px-3 rounded-md border border-border text-sm press focusable">Ver perfil</Link>
                <button className="flex-1 sm:flex-none touch-target gap-1.5 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium press focusable"><MessageSquare className="size-4" /> Contactar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
