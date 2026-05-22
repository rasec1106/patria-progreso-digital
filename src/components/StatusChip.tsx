import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircle2, Video, MapPin, Check, Award, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 whitespace-nowrap",
  {
    variants: {
      variant: {
        riesgo: "bg-warning/15 text-warning border-warning/30",
        activo: "bg-success/10 text-success border-success/30",
        graduado: "bg-gold/15 text-foreground border-gold/30",
        presencial: "bg-primary/10 text-primary border-primary/20",
        virtual: "bg-muted text-muted-foreground border-border",
        completada: "bg-success/10 text-success border-success/30",
        pendiente: "bg-transparent text-muted-foreground border-border",
        criterios: "bg-success/10 text-success border-success/30",
      },
    },
    defaultVariants: { variant: "activo" },
  },
);

// Etiqueta e icono por defecto de cada estado del dominio.
const defaults: Record<
  NonNullable<VariantProps<typeof chipVariants>["variant"]>,
  { label: string; icon?: React.ComponentType<{ className?: string }> }
> = {
  riesgo: { label: "Riesgo", icon: AlertTriangle },
  activo: { label: "Activo" },
  graduado: { label: "Graduado", icon: Award },
  presencial: { label: "Presencial", icon: MapPin },
  virtual: { label: "Virtual", icon: Video },
  completada: { label: "Completada", icon: CheckCircle2 },
  pendiente: { label: "Pendiente", icon: Clock },
  criterios: { label: "Cumple criterios", icon: Check },
};

export interface StatusChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {
  /** Sobrescribe la etiqueta por defecto del estado. */
  label?: string;
  /** Oculta el icono por defecto. */
  hideIcon?: boolean;
}

export function StatusChip({ variant = "activo", label, hideIcon, className, ...props }: StatusChipProps) {
  const def = defaults[variant ?? "activo"];
  const Icon = def.icon;
  return (
    <span className={cn(chipVariants({ variant }), className)} {...props}>
      {!hideIcon && Icon && <Icon className="size-3" />}
      {label ?? def.label}
    </span>
  );
}
