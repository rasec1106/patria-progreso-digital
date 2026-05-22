import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ icon: Icon, title, description, action, className }: Props) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12 px-6", className)}>
      {Icon && (
        <div className="size-12 rounded-full bg-muted grid place-items-center text-muted-foreground mb-4">
          <Icon className="size-6" />
        </div>
      )}
      <p className="text-h3">{title}</p>
      {description && <p className="mt-1.5 text-meta max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
