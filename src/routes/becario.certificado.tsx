import { createFileRoute } from "@tanstack/react-router";
import { Award, Download, Lock } from "lucide-react";
import { DIEGO, DIMENSIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/becario/certificado")({
  component: Certificado,
});

function Certificado() {
  const graduado = false; // toggle in real app

  return (
    <div className="px-6 lg:px-10 py-10 max-w-3xl mx-auto fade-in">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Mi certificado</h1>
        <p className="mt-1 text-muted-foreground">Tu reconocimiento al completar las 26 semanas de Patria C.</p>
      </header>

      <div className="relative">
        <div className={`card-soft p-10 lg:p-12 ${!graduado ? "blur-[3px] select-none pointer-events-none" : ""}`}>
          <div className="border-2 border-gold/40 rounded-xl p-8 lg:p-12 text-center bg-gradient-to-br from-background to-muted/30">
            <Award className="size-14 mx-auto text-gold" />
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Academia ciudadana de #PerúTeQuiero</p>
            <h2 className="mt-3 text-2xl font-semibold">Certificado de culminación</h2>
            <p className="mt-6 text-sm text-muted-foreground">Se otorga el presente a</p>
            <p className="mt-2 font-serif text-4xl">{DIEGO.nombre}</p>
            <p className="mt-4 text-sm max-w-md mx-auto text-muted-foreground">
              por completar satisfactoriamente la Edición 4 de Patria C, desarrollando capacidades en:
            </p>
            <p className="mt-3 text-sm font-medium">
              {DIMENSIONS.map((d) => d.short).join(" · ")}
            </p>
            <div className="mt-10 flex items-end justify-between">
              <div className="text-left">
                <div className="w-44 h-px bg-foreground/40" />
                <p className="mt-1 text-xs text-muted-foreground">Director Ejecutivo</p>
                <p className="text-sm font-medium">#PerúTeQuiero</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-muted-foreground">Lima, julio 2026</p>
                <p className="text-[11px] text-muted-foreground">N° PC4-{DIEGO.id.toUpperCase()}-026</p>
              </div>
            </div>
          </div>
        </div>

        {!graduado && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="card-soft p-6 text-center max-w-sm">
              <Lock className="size-6 mx-auto text-muted-foreground" />
              <p className="mt-3 font-medium">Disponible al completar tu boleta de salida</p>
              <p className="mt-1 text-xs text-muted-foreground">Te faltan 14 semanas. Vamos juntos.</p>
            </div>
          </div>
        )}
      </div>

      {graduado && (
        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
            <Download className="size-4" /> Descargar PDF
          </button>
        </div>
      )}
    </div>
  );
}
