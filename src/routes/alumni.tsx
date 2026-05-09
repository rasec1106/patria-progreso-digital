import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MapPin, Briefcase } from "lucide-react";
import { ALUMNI } from "@/lib/mock-data";

export const Route = createFileRoute("/alumni")({
  component: Alumni,
});

function Alumni() {
  const [region, setRegion] = useState("Todas");
  const [edicion, setEdicion] = useState("Todas");
  const [ods, setOds] = useState("Todos");

  const filtered = ALUMNI.filter((a) =>
    (region === "Todas" || a.region === region) &&
    (edicion === "Todas" || a.edicion === Number(edicion)) &&
    (ods === "Todos" || a.ods.includes(ods))
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"><ArrowLeft className="size-4" /></Link>
            <span className="size-8 rounded-md patria-gradient grid place-items-center text-primary-foreground font-bold">P</span>
            <p className="font-semibold tracking-tight">Red Alumni Patria C</p>
          </div>
          <p className="text-xs text-muted-foreground hidden sm:block">Solo para egresados de Patria C</p>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-8 fade-in">
        <h1 className="text-3xl font-semibold tracking-tight">Encuentra a tu próxima alianza.</h1>
        <p className="mt-1 text-muted-foreground">Egresados de las 4 ediciones. Filtra y conecta.</p>

        <div className="mt-6 card-soft p-4 flex flex-wrap gap-3">
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="text-sm px-3 py-1.5 rounded-md border border-border bg-surface">
            <option>Todas</option>{Array.from(new Set(ALUMNI.map(a => a.region))).map(r => <option key={r}>{r}</option>)}
          </select>
          <select value={edicion} onChange={(e) => setEdicion(e.target.value)} className="text-sm px-3 py-1.5 rounded-md border border-border bg-surface">
            <option>Todas</option>{[1,2,3].map(e => <option key={e}>{e}</option>)}
          </select>
          <select value={ods} onChange={(e) => setOds(e.target.value)} className="text-sm px-3 py-1.5 rounded-md border border-border bg-surface">
            <option>Todos</option>{Array.from(new Set(ALUMNI.flatMap(a => a.ods))).map(o => <option key={o}>{o}</option>)}
          </select>
          <span className="ml-auto text-xs text-muted-foreground self-center">{filtered.length} egresados</span>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((a) => (
            <article key={a.id} className="card-soft p-5">
              <div className="flex items-center gap-3">
                <img src={a.avatar} className="size-12 rounded-full" alt={a.nombre} />
                <div>
                  <p className="font-medium leading-tight">{a.nombre}</p>
                  <p className="text-[11px] text-muted-foreground inline-flex items-center gap-1"><MapPin className="size-3" /> {a.region} · Edición {a.edicion}</p>
                </div>
              </div>
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1"><Briefcase className="size-3" /> {a.area}</p>
              <p className="mt-1 text-sm font-serif italic">"{a.proyecto}"</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {a.ods.map((o) => <span key={o} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{o}</span>)}
              </div>
              <button className="mt-4 w-full px-3 py-2 rounded-md border border-border text-sm hover:border-primary">Conectar</button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
