import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LineChart, CalendarDays, UserRound, Users2, Award, LogOut } from "lucide-react";
import { DIEGO } from "@/lib/mock-data";

const items = [
  { to: "/becario", label: "Inicio", icon: Home, exact: true },
  { to: "/becario/progreso", label: "Mi progreso", icon: LineChart },
  { to: "/becario/sesiones", label: "Mis sesiones", icon: CalendarDays },
  { to: "/becario/mentor", label: "Mi mentor", icon: UserRound },
  { to: "/becario/alumni", label: "Red Alumni", icon: Users2 },
  { to: "/becario/certificado", label: "Mi certificado", icon: Award },
];

export function BecarioSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar h-[calc(100vh-57px)] sticky top-[57px]">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={DIEGO.avatar} alt={DIEGO.nombre} className="size-12 rounded-full ring-2 ring-primary/20" />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight truncate">{DIEGO.nombre.split(" ").slice(0,2).join(" ")}</p>
            <p className="text-xs text-muted-foreground truncate">{DIEGO.region}</p>
            <p className="text-xs text-primary font-medium mt-0.5">Edición 4 — 2026</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
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
