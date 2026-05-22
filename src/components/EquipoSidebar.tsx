import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutGrid, AlertTriangle, FileBarChart, Award, Users2, LogOut } from "lucide-react";

const items = [
  { to: "/equipo", label: "Cohorte", icon: LayoutGrid, exact: true },
  { to: "/equipo/alertas", label: "Alertas", icon: AlertTriangle },
  { to: "/equipo/reportes", label: "Reportes", icon: FileBarChart },
  { to: "/equipo/certificados", label: "Certificados", icon: Award },
  { to: "/equipo/alumni", label: "Red Alumni", icon: Users2 },
];

export function EquipoSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar h-[calc(100vh-57px)] sticky top-[57px]">
      <nav className="flex-1 p-3 space-y-1 mt-2">
        {items.map((it) => {
          const active = it.exact ? path === it.to : path.startsWith(it.to);
          const Icon = it.icon;
          return (
            <Link key={it.to} to={it.to} aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors focusable ${active ? "bg-primary/10 text-primary font-medium" : "text-foreground/80 hover:bg-muted"}`}>
              <Icon className="size-4" /> {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <Link to="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground focusable rounded-md">
          <LogOut className="size-3.5" /> Cerrar sesión
        </Link>
        <p className="mt-3 text-eyebrow tracking-widest">Patria C · #PerúTeQuiero</p>
      </div>
    </aside>
  );
}
