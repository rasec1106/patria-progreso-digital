import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  /** Título en negrita del popover. */
  title: string;
  /** Cuerpo del popover (texto u objetivo a explicar). */
  children: ReactNode;
  /** Texto accesible del botón disparador. */
  label?: string;
  /** Lado por el que se ancla el popover respecto al icono. */
  align?: "left" | "right";
  className?: string;
};

/**
 * Botón de ayuda (?) con popover. Se abre al hacer clic y se cierra al clicar
 * fuera o presionar Escape. Patrón compartido por el filtro ODS de la Red Alumni
 * y las dimensiones de "Mis sesiones".
 */
export function HelpTip({ title, children, label = "Más información", align = "left", className }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <span ref={ref} className={cn("relative inline-flex", className)}>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen((v) => !v); }}
        aria-label={label}
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        className="inline-grid place-items-center size-4 rounded-full text-muted-foreground hover:text-foreground focusable"
      >
        <HelpCircle className="size-3.5" />
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className={cn(
            "absolute top-full mt-1 z-50 w-60 max-w-[min(15rem,calc(100vw-2rem))] rounded-lg border border-border bg-surface shadow-md p-3 text-xs font-normal normal-case tracking-normal text-foreground fade-in",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          <strong className="font-semibold">{title}</strong>
          <span className="block mt-1 text-muted-foreground">{children}</span>
        </span>
      )}
    </span>
  );
}
