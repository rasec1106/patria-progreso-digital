import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, X } from "lucide-react";
import { CertificadoArt } from "@/components/CertificadoArt";

export const Route = createFileRoute("/becario/certificado/preview")({
  component: CertificadoPreview,
});

function CertificadoPreview() {
  return (
    <div className="min-h-screen flex flex-col bg-background fade-in">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-border bg-background/95 backdrop-blur">
        <p className="text-h3">Vista previa del certificado</p>
        <Link
          to="/becario/certificado"
          className="size-11 grid place-items-center rounded-full hover:bg-muted shrink-0"
          aria-label="Cerrar previsualización"
        >
          <X className="size-5" />
        </Link>
      </div>

      <div className="flex-1 px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-2xl mx-auto">
          <CertificadoArt />

          <div className="mt-6 flex justify-center">
            <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
              <Download className="size-4" /> Descargar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
