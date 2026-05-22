import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutGrid, AlertTriangle, FileBarChart, Award, Bell, Search, X } from "lucide-react";

const tabs = [
  { to: "/equipo", label: "Cohorte", icon: LayoutGrid, exact: true },
  { to: "/equipo/alertas", label: "Alertas", icon: AlertTriangle },
  { to: "/equipo/reportes", label: "Reportes", icon: FileBarChart },
  { to: "/equipo/certificados", label: "Certificados", icon: Award },
];

export function EquipoHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <header className="border-b border-border bg-surface sticky top-0 z-30">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-4 sm:gap-6">
        <Link to="/" className="flex items-center gap-2 focusable rounded-md">
          <span className="size-8 rounded-md patria-gradient grid place-items-center text-primary-foreground font-bold">P</span>
          <span className="font-semibold tracking-tight">Patria C <span className="text-muted-foreground font-normal hidden sm:inline">· Equipo</span></span>
        </Link>
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input placeholder="Buscar becario, región, sesión..." className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-muted/60 border border-transparent focus:border-border focus:bg-surface outline-none focusable" />
        </div>
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="md:hidden icon-btn focusable"
            aria-label="Buscar"
            aria-expanded={searchOpen}
          >
            {searchOpen ? <X className="size-4" /> : <Search className="size-4" />}
          </button>
          <button className="relative icon-btn focusable" aria-label="Notificaciones">
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
          </button>
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-border">
            <img src="https://api.dicebear.com/9.x/initials/svg?seed=Madison%20Montenegro&backgroundColor=C8102E&textColor=ffffff" className="size-8 rounded-full" alt="Madison Montenegro" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-tight">Madison M.</p>
              <p className="text-meta">Project Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Búsqueda móvil expandible */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 fade-in">
          <div className="relative">
            <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              autoFocus
              placeholder="Buscar becario, región, sesión..."
              className="w-full pl-9 pr-3 min-h-[44px] text-sm rounded-lg bg-muted/60 border border-transparent focus:border-border focus:bg-surface outline-none focusable"
            />
          </div>
        </div>
      )}

      <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
        {tabs.map((t) => {
          const active = t.exact ? path === t.to : path.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link key={t.to} to={t.to} className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors whitespace-nowrap focusable ${active ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              <Icon className="size-4" /> {t.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
