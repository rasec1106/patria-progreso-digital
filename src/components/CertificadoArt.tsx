import { Award } from "lucide-react";
import { DIEGO, DIMENSIONS } from "@/lib/mock-data";

export function CertificadoArt() {
  return (
    <div className="border-2 border-gold/40 rounded-xl p-6 sm:p-8 lg:p-12 text-center bg-gradient-to-br from-background to-muted/30">
      <Award className="size-14 mx-auto text-gold" />
      <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Academia ciudadana de #PerúTeQuiero</p>
      <h2 className="mt-3 text-2xl font-semibold">Certificado de culminación</h2>
      <p className="mt-6 text-sm text-muted-foreground">Se otorga el presente a</p>
      <p className="mt-2 font-serif text-3xl sm:text-4xl break-words">{DIEGO.nombre}</p>
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
          <p className="text-meta">Lima, julio 2026</p>
          <p className="text-meta">N° PC4-{DIEGO.id.toUpperCase()}-026</p>
        </div>
      </div>
    </div>
  );
}
