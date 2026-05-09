import { createFileRoute } from "@tanstack/react-router";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DIMENSIONS, BECARIOS } from "@/lib/mock-data";

export const Route = createFileRoute("/equipo/reportes")({
  component: Reportes,
});

function Reportes() {
  const data = DIMENSIONS.map((d) => {
    const ent = BECARIOS.reduce((a, b) => a + b.entrada[d.key], 0) / BECARIOS.length;
    const act = BECARIOS.reduce((a, b) => a + b.actual[d.key], 0) / BECARIOS.length;
    return { dim: d.short, entrada: +ent.toFixed(2), actual: +act.toFixed(2), delta: +(act-ent).toFixed(2) };
  });

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 fade-in">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Reportes para donantes</h1>
        <p className="mt-1 text-muted-foreground">Genera el informe semestral con un par de clics.</p>
      </header>

      <div className="card-soft p-5 mb-6 flex flex-wrap items-end gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Plantilla</label>
          <select className="block mt-1 text-sm px-3 py-2 rounded-md border border-border bg-surface">
            <option>Delosi</option><option>BCP</option><option>Scotiabank</option><option>Personalizado</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Cohorte</label>
          <select className="block mt-1 text-sm px-3 py-2 rounded-md border border-border bg-surface">
            <option>Edición 4 (2026)</option><option>Edición 3 (2025)</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Rango</label>
          <select className="block mt-1 text-sm px-3 py-2 rounded-md border border-border bg-surface">
            <option>Ene 2026 — Jul 2026</option>
          </select>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium"><FileText className="size-4" /> PDF</button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm font-medium"><FileSpreadsheet className="size-4" /> Excel</button>
        </div>
      </div>

      <section className="card-soft p-6 mb-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Plantilla Delosi · Vista previa</p>
        <h2 className="mt-1 text-2xl font-semibold">Crecimiento promedio por dimensión</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="dim" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Bar dataKey="entrada" fill="var(--color-muted-foreground)" radius={[4,4,0,0]} name="Entrada" />
            <Bar dataKey="actual" fill="var(--color-primary)" radius={[4,4,0,0]} name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Stat label="Becarios alcanzados" v="600" sub="Edición 4" />
        <Stat label="Crecimiento promedio" v="+1.4 pts" sub="en las 6 dimensiones" />
        <Stat label="Regiones impactadas" v="25" sub="cobertura nacional" />
      </div>

      <section className="card-soft p-6 mb-6">
        <h2 className="font-semibold mb-3">Casos destacados</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { n: "Diego Quispe — San Martín", t: "De observador a articulador en su comunidad amazónica." },
            { n: "Milagros Huamán — Cusco", t: "Llevó la sesión sobre presupuesto a su escuela rural." },
            { n: "Luis Saavedra — Cajamarca", t: "Lanzó un pódcast cívico con 4 mil oyentes mensuales." },
          ].map((c) => (
            <div key={c.n} className="p-4 rounded-lg border border-border bg-muted/20">
              <p className="text-xs text-primary font-medium">{c.n}</p>
              <p className="mt-1 text-sm font-serif italic">"{c.t}"</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card-soft p-6">
        <h2 className="font-semibold mb-3">Alineación con ODS</h2>
        <div className="flex flex-wrap gap-2">
          {["ODS 4 · Educación", "ODS 5 · Igualdad de género", "ODS 10 · Reducción desigualdades", "ODS 16 · Paz e instituciones", "ODS 17 · Alianzas"].map((o) => (
            <span key={o} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">{o}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, v, sub }: { label: string; v: string; sub: string }) {
  return (
    <div className="card-soft p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight">{v}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}
