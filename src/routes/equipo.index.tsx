import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutGrid, Map, MessageSquare, Eye, AlertTriangle } from "lucide-react";
import { BECARIOS, REGIONES } from "@/lib/mock-data";

export const Route = createFileRoute("/equipo/")({
  component: Cohorte,
});

function Cohorte() {
  const [view, setView] = useState<"tabla" | "mapa">("tabla");
  const [estado, setEstado] = useState("Todos");
  const [region, setRegion] = useState("Todas");

  const filtered = BECARIOS.filter((b) =>
    (estado === "Todos" || (estado === "En riesgo" ? b.estado === "riesgo" : estado === "Activos" ? b.estado === "activo" : true)) &&
    (region === "Todas" || b.region === region)
  );

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 fade-in">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Cohorte 2026</h1>
          <p className="mt-1 text-muted-foreground">Edición 4 · 600 becarios · 25 regiones</p>
        </div>
        <div className="flex gap-1 p-1 rounded-lg bg-muted">
          <button onClick={() => setView("tabla")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${view === "tabla" ? "bg-surface shadow-sm font-medium" : "text-muted-foreground"}`}><LayoutGrid className="size-4" /> Tabla</button>
          <button onClick={() => setView("mapa")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${view === "mapa" ? "bg-surface shadow-sm font-medium" : "text-muted-foreground"}`}><Map className="size-4" /> Mapa</button>
        </div>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Kpi label="Becarios activos" value="587" trend="+12 vs. mes anterior" trendColor="text-success" />
        <Kpi label="Avance promedio" value="64%" trend="Semana 12 de 26" />
        <Kpi label="En riesgo" value="23" trend="↑ 4 esta semana" trendColor="text-warning" />
        <Kpi label="Boletas por revisar" value="41" trend="Asignadas a 3 mentores" />
      </section>

      <div className="card-soft p-4 mb-4 flex flex-wrap items-center gap-3">
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

      {view === "tabla" ? (
        <div className="card-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Becario</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Región</th>
                <th className="px-4 py-3 font-medium">Progreso</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Última actividad</th>
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
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{b.region}</td>
                  <td className="px-4 py-3 w-48">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                        <div className={`h-full ${b.estado === "riesgo" ? "bg-warning" : "bg-success"}`} style={{ width: `${b.progreso}%` }} />
                      </div>
                      <span className="text-xs font-medium tabular-nums w-9">{b.progreso}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{b.ultimaActividad}</td>
                  <td className="px-4 py-3">
                    <EstadoChip estado={b.estado} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Link to="/equipo/becario/$id" params={{ id: b.id }} className="p-1.5 rounded hover:bg-muted" title="Ver perfil"><Eye className="size-4" /></Link>
                      <button className="p-1.5 rounded hover:bg-muted" title="Dejar comentario"><MessageSquare className="size-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Mapa />
      )}
    </div>
  );
}

function Kpi({ label, value, trend, trendColor = "text-muted-foreground" }: { label: string; value: string; trend?: string; trendColor?: string }) {
  return (
    <div className="card-soft p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
      {trend && <p className={`mt-1 text-[11px] ${trendColor}`}>{trend}</p>}
    </div>
  );
}

function EstadoChip({ estado }: { estado: string }) {
  if (estado === "riesgo") return <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-warning/15 text-warning border border-warning/30"><AlertTriangle className="size-3" /> Riesgo</span>;
  if (estado === "graduado") return <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gold/15 border border-gold/30">Graduado</span>;
  return <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/30">Activo</span>;
}

function Mapa() {
  // Simple stylized map: list regions with counts as cards
  const regionStats: Record<string, { count: number; risk: number }> = {};
  BECARIOS.forEach((b) => {
    regionStats[b.region] = regionStats[b.region] || { count: 0, risk: 0 };
    regionStats[b.region].count += 1;
    if (b.estado === "riesgo") regionStats[b.region].risk += 1;
  });
  return (
    <div className="card-soft p-6">
      <p className="text-sm text-muted-foreground mb-4">Distribución de becarios por región. El color indica el estado promedio.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Object.entries(regionStats).map(([region, s]) => {
          const color = s.risk / s.count > 0.4 ? "border-warning bg-warning/5" : "border-success/30 bg-success/5";
          return (
            <div key={region} className={`p-4 rounded-lg border ${color}`}>
              <p className="text-xs text-muted-foreground">{region}</p>
              <p className="mt-1 text-2xl font-semibold">{s.count}</p>
              <p className="text-[11px] text-muted-foreground">{s.risk} en riesgo</p>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Vista simplificada — el mapa interactivo del Perú estará en producción.</p>
    </div>
  );
}
