import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutGrid, Map, MessageSquare, Eye, SlidersHorizontal, X, SearchX } from "lucide-react";
import { BECARIOS, REGIONES } from "@/lib/mock-data";
import { StatusChip } from "@/components/StatusChip";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/equipo/")({
  component: Cohorte,
});

function Cohorte() {
  const [view, setView] = useState<"tabla" | "mapa">("tabla");
  const [estado, setEstado] = useState("Todos");
  const [region, setRegion] = useState("Todas");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = BECARIOS.filter((b) =>
    (estado === "Todos" || (estado === "En riesgo" ? b.estado === "riesgo" : estado === "Activos" ? b.estado === "activo" : true)) &&
    (region === "Todas" || b.region === region)
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8 fade-in">
      <PageHeader
        title="Cohorte 2026"
        description="Edición 4 · 600 becarios · 25 regiones"
        actions={
          <div className="flex gap-1 p-1 rounded-lg bg-muted">
            <button onClick={() => setView("tabla")} aria-pressed={view === "tabla"} className={`flex items-center gap-1.5 px-3 min-h-[44px] rounded-md text-sm focusable ${view === "tabla" ? "bg-surface shadow-sm font-medium" : "text-muted-foreground"}`}><LayoutGrid className="size-4" /> <span className="hidden sm:inline">Lista</span></button>
            <button onClick={() => setView("mapa")} aria-pressed={view === "mapa"} className={`flex items-center gap-1.5 px-3 min-h-[44px] rounded-md text-sm focusable ${view === "mapa" ? "bg-surface shadow-sm font-medium" : "text-muted-foreground"}`}><Map className="size-4" /> <span className="hidden sm:inline">Mapa</span></button>
          </div>
        }
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <Kpi label="Becarios activos" value="587" trend="+12 vs. mes ant." trendColor="text-success" />
        <Kpi label="Avance promedio" value="64%" trend="Semana 12 de 26" />
        <Kpi label="En riesgo" value="23" trend="↑ 4 esta semana" trendColor="text-warning" />
        <Kpi label="Boletas por revisar" value="41" trend="Asignadas a 3 mentores" />
      </section>

      {/* Mobile filter trigger */}
      <div className="lg:hidden mb-3 flex items-center justify-between gap-3">
        <button
          onClick={() => setFiltersOpen(true)}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-lg border border-border bg-surface text-sm font-medium"
        >
          <SlidersHorizontal className="size-4" /> Filtros
          {(region !== "Todas" || estado !== "Todos") && (
            <span className="size-2 rounded-full bg-primary" />
          )}
        </button>
        <span className="text-xs text-muted-foreground">{filtered.length} resultados</span>
      </div>

      {/* Desktop filters */}
      <div className="card-soft p-4 mb-4 hidden lg:flex flex-wrap items-center gap-3">
        <span className="text-xs text-muted-foreground">Filtrar:</span>
        <select value={region} onChange={(e) => setRegion(e.target.value)} className="text-sm px-3 py-1.5 rounded-md border border-border bg-surface">
          <option>Todas</option>
          {REGIONES.map((r) => <option key={r}>{r}</option>)}
        </select>
        <select value={estado} onChange={(e) => setEstado(e.target.value)} className="text-sm px-3 py-1.5 rounded-md border border-border bg-surface">
          <option>Todos</option><option>Activos</option><option>En riesgo</option>
        </select>
        <select className="text-sm px-3 py-1.5 rounded-md border border-border bg-surface">
          <option>Edición 4</option><option>Edición 3</option><option>Edición 2</option><option>Edición 1</option>
        </select>
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} resultados</span>
      </div>

      {view === "tabla" && filtered.length === 0 ? (
        <div className="card-soft">
          <EmptyState
            icon={SearchX}
            title="Sin resultados"
            description="Ningún becario coincide con los filtros seleccionados. Prueba ampliar la región o el estado."
            action={
              <button
                onClick={() => { setRegion("Todas"); setEstado("Todos"); }}
                className="touch-target press focusable px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
              >
                Limpiar filtros
              </button>
            }
          />
        </div>
      ) : view === "tabla" ? (
        <>
          {/* Mobile: stacked cards */}
          <ul className="lg:hidden space-y-3 stagger">
            {filtered.map((b) => (
              <li key={b.id} className="card-soft p-4">
                <div className="flex items-start gap-3">
                  <img src={b.avatar} alt={b.nombre} className="size-12 rounded-full shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium leading-tight truncate">{b.nombre}</p>
                        <p className="text-xs text-muted-foreground truncate">{b.region} · Edición {b.edicion}</p>
                      </div>
                      <StatusChip variant={b.estado as "riesgo" | "activo" | "graduado"} />
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                        <div className={`h-full ${b.estado === "riesgo" ? "bg-warning" : "bg-success"}`} style={{ width: `${b.progreso}%` }} />
                      </div>
                      <span className="text-xs font-medium tabular-nums w-9 text-right">{b.progreso}%</span>
                    </div>
                    <p className="mt-2 text-meta">Última actividad: {b.ultimaActividad}</p>
                    <div className="mt-3 flex gap-2">
                      <Link
                        to="/equipo/becario/$id"
                        params={{ id: b.id }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-lg border border-border text-sm font-medium hover:border-primary press focusable"
                      >
                        <Eye className="size-4" /> Ver perfil
                      </Link>
                      <button
                        className="size-11 grid place-items-center rounded-lg border border-border hover:border-primary press focusable"
                        aria-label={`Dejar comentario a ${b.nombre}`}
                      >
                        <MessageSquare className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop: table */}
          <div className="card-soft overflow-hidden hidden lg:block">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Becario</th>
                  <th className="px-4 py-3 font-medium">Región</th>
                  <th className="px-4 py-3 font-medium">Progreso</th>
                  <th className="px-4 py-3 font-medium">Última actividad</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-t border-border hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={b.avatar} className="size-8 rounded-full" alt={b.nombre} />
                        <div>
                          <p className="font-medium leading-tight">{b.nombre}</p>
                          <p className="text-xs text-muted-foreground">Edición {b.edicion}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{b.region}</td>
                    <td className="px-4 py-3 w-48">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                          <div className={`h-full ${b.estado === "riesgo" ? "bg-warning" : "bg-success"}`} style={{ width: `${b.progreso}%` }} />
                        </div>
                        <span className="text-xs font-medium tabular-nums w-9">{b.progreso}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{b.ultimaActividad}</td>
                    <td className="px-4 py-3">
                      <StatusChip variant={b.estado as "riesgo" | "activo" | "graduado"} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Link to="/equipo/becario/$id" params={{ id: b.id }} className="p-1.5 rounded hover:bg-muted focusable" title="Ver perfil" aria-label={`Ver perfil de ${b.nombre}`}><Eye className="size-4" /></Link>
                        <button className="p-1.5 rounded hover:bg-muted focusable" title="Dejar comentario" aria-label={`Dejar comentario a ${b.nombre}`}><MessageSquare className="size-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Mapa />
      )}

      {/* Filters sheet (mobile) */}
      {filtersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 fade-in">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div
            className="absolute bottom-0 inset-x-0 bg-surface rounded-t-2xl border-t border-border p-5"
            style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold">Filtros</p>
              <button
                onClick={() => setFiltersOpen(false)}
                className="size-11 grid place-items-center rounded-full hover:bg-muted"
                aria-label="Cerrar"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="text-xs text-muted-foreground">Región</span>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="mt-1 w-full min-h-[44px] px-3 rounded-md border border-border bg-surface text-sm"
                >
                  <option>Todas</option>
                  {REGIONES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground">Estado</span>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="mt-1 w-full min-h-[44px] px-3 rounded-md border border-border bg-surface text-sm"
                >
                  <option>Todos</option><option>Activos</option><option>En riesgo</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground">Edición</span>
                <select className="mt-1 w-full min-h-[44px] px-3 rounded-md border border-border bg-surface text-sm">
                  <option>Edición 4</option><option>Edición 3</option><option>Edición 2</option><option>Edición 1</option>
                </select>
              </label>
            </div>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => { setRegion("Todas"); setEstado("Todos"); }}
                className="flex-1 min-h-[48px] rounded-lg border border-border text-sm font-medium"
              >
                Limpiar
              </button>
              <button
                onClick={() => setFiltersOpen(false)}
                className="flex-1 min-h-[48px] rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
              >
                Ver {filtered.length} resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Kpi({ label, value, trend, trendColor = "text-muted-foreground" }: { label: string; value: string; trend?: string; trendColor?: string }) {
  return (
    <div className="card-soft p-4 sm:p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
      {trend && <p className={`mt-1 text-xs ${trendColor}`}>{trend}</p>}
    </div>
  );
}

function Mapa() {
  const regionStats: Record<string, { count: number; risk: number }> = {};
  BECARIOS.forEach((b) => {
    regionStats[b.region] = regionStats[b.region] || { count: 0, risk: 0 };
    regionStats[b.region].count += 1;
    if (b.estado === "riesgo") regionStats[b.region].risk += 1;
  });
  return (
    <div className="card-soft p-5 sm:p-6">
      <p className="text-sm text-muted-foreground mb-4">Distribución de becarios por región. El color indica el estado promedio.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Object.entries(regionStats).map(([region, s]) => {
          const color = s.risk / s.count > 0.4 ? "border-warning bg-warning/5" : "border-success/30 bg-success/5";
          return (
            <div key={region} className={`p-4 rounded-lg border ${color}`}>
              <p className="text-xs text-muted-foreground">{region}</p>
              <p className="mt-1 text-2xl font-semibold">{s.count}</p>
              <p className="text-meta">{s.risk} en riesgo</p>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Vista simplificada — el mapa interactivo del Perú estará en producción.</p>
    </div>
  );
}
