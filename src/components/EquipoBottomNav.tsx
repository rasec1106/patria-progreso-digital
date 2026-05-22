import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutGrid, AlertTriangle, FileBarChart, Award, MoreHorizontal, Users2, LogOut, X } from "lucide-react";

const main = [
  { to: "/equipo", label: "Cohorte", icon: LayoutGrid, exact: true },
  { to: "/equipo/alertas", label: "Alertas", icon: AlertTriangle },
  { to: "/equipo/reportes", label: "Reportes", icon: FileBarChart },
  { to: "/equipo/certificados", label: "Certificados", icon: Award },
];

const more = [
  { to: "/equipo/alumni", label: "Red Alumni", icon: Users2 },
  { to: "/", label: "Cerrar sesión", icon: LogOut },
];

export function EquipoBottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [openMore, setOpenMore] = useState(false);
  const isMoreActive = more.some((m) => path === m.to);

  return (
    <>
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur border-t border-border"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5">
          {main.map((it) => {
            const active = it.exact ? path === it.to : path.startsWith(it.to);
            const Icon = it.icon;
            return (
              <li key={it.to}>
                <Link
                  to={it.to}
                  className={`flex flex-col items-center justify-center gap-1 min-h-[56px] py-2 text-[10px] font-medium ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="size-5" />
                  {it.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => setOpenMore(true)}
              className={`w-full flex flex-col items-center justify-center gap-1 min-h-[56px] py-2 text-[10px] font-medium ${
                isMoreActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <MoreHorizontal className="size-5" />
              Más
            </button>
          </li>
        </ul>
      </nav>

      {openMore && (
        <div className="lg:hidden fixed inset-0 z-50 fade-in">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenMore(false)} />
          <div
            className="absolute bottom-0 inset-x-0 bg-surface rounded-t-2xl border-t border-border p-4"
            style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Más opciones</p>
              <button
                onClick={() => setOpenMore(false)}
                className="size-11 grid place-items-center rounded-full hover:bg-muted"
                aria-label="Cerrar"
              >
                <X className="size-5" />
              </button>
            </div>
            <ul className="space-y-1">
              {more.map((it) => {
                const Icon = it.icon;
                return (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      onClick={() => setOpenMore(false)}
                      className="flex items-center gap-3 min-h-[48px] px-3 rounded-lg hover:bg-muted text-sm"
                    >
                      <Icon className="size-4 text-primary" /> {it.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
