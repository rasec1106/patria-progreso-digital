import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Eye, Lock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CertificadoArt } from "@/components/CertificadoArt";

export const Route = createFileRoute("/becario/certificado/")({
  component: Certificado,
});

function Certificado() {
  const graduado = false; // toggle in real app

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-8 sm:py-10 max-w-3xl mx-auto fade-in">
      <PageHeader
        title="Mi certificado"
        description="Tu reconocimiento al completar las 26 semanas de Patria C."
      />

      <div className="relative">
        <div className={`card-soft p-5 sm:p-10 lg:p-12 ${!graduado ? "blur-[3px] select-none pointer-events-none" : ""}`} aria-hidden={!graduado}>
          <CertificadoArt />
        </div>

        {!graduado && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="card-soft p-6 text-center max-w-sm mx-4">
              <div className="size-12 rounded-full bg-muted grid place-items-center mx-auto text-muted-foreground">
                <Lock className="size-5" />
              </div>
              <p className="mt-3 text-h3">Disponible al completar tu boleta de salida</p>
              <p className="mt-1 text-meta">Te faltan 14 semanas. Vamos juntos.</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/becario/certificado/preview"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border font-medium hover:border-primary"
        >
          <Eye className="size-4" /> Previsualizar
        </Link>

        {graduado && (
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
            <Download className="size-4" /> Descargar PDF
          </button>
        )}
      </div>
    </div>
  );
}
