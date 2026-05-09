import { createFileRoute } from "@tanstack/react-router";
import { Award, Download, Package } from "lucide-react";
import { BECARIOS } from "@/lib/mock-data";

export const Route = createFileRoute("/equipo/certificados")({
  component: Certificados,
});

function Certificados() {
  // mock: pretend all listed becarios meet criteria
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-8 fade-in">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Generación de certificados</h1>
          <p className="mt-1 text-muted-foreground">Antes lo hacíamos uno por uno. Ahora en lote.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
          <Package className="size-4" /> Generar 12 certificados (.zip)
        </button>
      </header>

      <div className="card-soft overflow-hidden">
        <div className="p-4 bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground flex">
          <span className="flex-1">Becarios listos para graduar</span>
          <span>Acción</span>
        </div>
        {BECARIOS.map((b) => (
          <div key={b.id} className="p-4 border-t border-border flex items-center gap-4">
            <img src={b.avatar} className="size-10 rounded-full" alt={b.nombre} />
            <div className="flex-1 min-w-0">
              <p className="font-medium">{b.nombre}</p>
              <p className="text-xs text-muted-foreground">{b.region} · Edición {b.edicion}</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-gold font-medium px-2 py-0.5 rounded-full bg-gold/10 border border-gold/30"><Award className="size-3" /> Cumple criterios</span>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-sm hover:border-primary"><Download className="size-4" /> Vista previa</button>
          </div>
        ))}
      </div>
    </div>
  );
}
