import { createFileRoute } from "@tanstack/react-router";
import { Download, Package } from "lucide-react";
import { BECARIOS } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { StatusChip } from "@/components/StatusChip";

export const Route = createFileRoute("/equipo/certificados")({
  component: Certificados,
});

function Certificados() {
  // mock: pretend all listed becarios meet criteria
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8 fade-in">
      <PageHeader
        title="Generación de certificados"
        description="Antes lo hacíamos uno por uno. Ahora en lote."
        actions={
          <button className="touch-target gap-2 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 press focusable">
            <Package className="size-4" /> Generar {BECARIOS.length} certificados (.zip)
          </button>
        }
      />

      <div className="card-soft overflow-hidden">
        <div className="p-4 bg-muted/40 text-eyebrow flex">
          <span className="flex-1">Becarios listos para graduar</span>
          <span className="hidden sm:inline">Acción</span>
        </div>
        {BECARIOS.map((b) => (
          <div key={b.id} className="p-4 border-t border-border flex flex-wrap items-center gap-x-4 gap-y-3">
            <img src={b.avatar} className="size-10 rounded-full shrink-0" alt={b.nombre} />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{b.nombre}</p>
              <p className="text-meta truncate">{b.region} · Edición {b.edicion}</p>
            </div>
            <StatusChip variant="criterios" className="hidden sm:inline-flex bg-gold/10 text-gold border-gold/30" />
            <button className="touch-target gap-1.5 px-3 rounded-md border border-border text-sm hover:border-primary press focusable w-full sm:w-auto"><Download className="size-4" /> Vista previa</button>
          </div>
        ))}
      </div>
    </div>
  );
}
