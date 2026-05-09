import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutGrid, AlertTriangle, FileBarChart, Award, Bell, Search } from "lucide-react";

const tabs = [
  { to: "/equipo", label: "Cohorte", icon: LayoutGrid, exact: true },
  { to: "/equipo/alertas", label: "Alertas", icon: AlertTriangle },
  { to: "/equipo/reportes", label: "Reportes", icon: FileBarChart },
  { to: "/equipo/certificados", label: "Certificados", icon: Award },
];

export function EquipoHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="border-b border-border bg-surface sticky top-0 z-30">
      <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="size-8 rounded-md patria-gradient grid place-items-center text-primary-foreground font-bold">P</span>
          <span className="font-semibold tracking-tight">Patria C <span className="text-muted-foreground font-normal">· Equipo</span></span>
        </Link>
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input placeholder="Buscar becario, región, sesión..." className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-muted/60 border border-transparent focus:border-border focus:bg-surface outline-none" />
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <button className="relative p-2 rounded-lg hover:bg-muted">
            <Bell className="size-4" />
            <span className="absolute top-1 right-1 size-2 rounded-full bg-primary" />
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <img src="https://api.dicebear.com/9.x/initials/svg?seed=Madison%20Montenegro&backgroundColor=C8102E&textColor=ffffff" className="size-8 rounded-full" alt="Madison" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-tight">Madison M.</p>
              <p className="text-[11px] text-muted-foreground">Project Manager</p>
            </div>
          </div>
        </div>
      </div>
      <nav className="max-w-[1400px] mx-auto px-6 flex gap-1 overflow-x-auto">
        {tabs.map((t) => {
          const active = t.exact ? path === t.to : path.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link key={t.to} to={t.to} className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors whitespace-nowrap ${active ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              <Icon className="size-4" /> {t.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
