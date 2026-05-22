import { useState } from "react";
import { MapPin, Briefcase, UserSearch } from "lucide-react";
import { ALUMNI } from "@/lib/mock-data";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";

type Props = {
  role: "becario" | "equipo";
};

export function AlumniNetwork({ role }: Props) {
  const [region, setRegion] = useState("Todas");
  const [edicion, setEdicion] = useState("Todas");
  const [ods, setOds] = useState("Todos");

  const filtered = ALUMNI.filter((a) =>
    (region === "Todas" || a.region === region) &&
    (edicion === "Todas" || a.edicion === Number(edicion)) &&
    (ods === "Todos" || a.ods.includes(ods))
  );

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-[1100px] mx-auto fade-in">
      <PageHeader
        title="Red Alumni Patria C"
        description="Egresados de las 4 ediciones. Filtra y conecta."
      />

      <div className="card-soft p-4 flex flex-wrap gap-3">
        <label className="flex-1 sm:flex-none min-w-[7rem]">
          <span className="sr-only">Filtrar por región</span>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full text-sm min-h-[44px] px-3 rounded-md border border-border bg-surface focusable">
            <option>Todas</option>{Array.from(new Set(ALUMNI.map(a => a.region))).map(r => <option key={r}>{r}</option>)}
          </select>
        </label>
        <label className="flex-1 sm:flex-none min-w-[7rem]">
          <span className="sr-only">Filtrar por edición</span>
          <select value={edicion} onChange={(e) => setEdicion(e.target.value)} className="w-full text-sm min-h-[44px] px-3 rounded-md border border-border bg-surface focusable">
            <option>Todas</option>{[1,2,3].map(e => <option key={e}>{e}</option>)}
          </select>
        </label>
        <label className="flex-1 sm:flex-none min-w-[7rem]">
          <span className="sr-only">Filtrar por ODS</span>
          <select value={ods} onChange={(e) => setOds(e.target.value)} className="w-full text-sm min-h-[44px] px-3 rounded-md border border-border bg-surface focusable">
            <option>Todos</option>{Array.from(new Set(ALUMNI.flatMap(a => a.ods))).map(o => <option key={o}>{o}</option>)}
          </select>
        </label>
        <span className="w-full sm:w-auto sm:ml-auto text-xs text-muted-foreground self-center">{filtered.length} egresados</span>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 card-soft">
          <EmptyState
            icon={UserSearch}
            title="No encontramos egresados"
            description="Ninguna alianza coincide con estos filtros. Prueba ampliar la región, la edición o el ODS."
            action={
              <button
                onClick={() => { setRegion("Todas"); setEdicion("Todas"); setOds("Todos"); }}
                className="touch-target press focusable px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
              >
                Limpiar filtros
              </button>
            }
          />
        </div>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
          {filtered.map((a) => (
            <article key={a.id} className="card-soft p-5 flex flex-col">
              <div className="flex items-center gap-3">
                <img src={a.avatar} className="size-12 rounded-full shrink-0" alt={a.nombre} />
                <div className="min-w-0">
                  <p className="font-medium leading-tight truncate">{a.nombre}</p>
                  <p className="text-meta inline-flex items-center gap-1"><MapPin className="size-3 shrink-0" /> {a.region} · Edición {a.edicion}</p>
                </div>
              </div>
              <p className="mt-3 text-eyebrow inline-flex items-center gap-1"><Briefcase className="size-3" /> {a.area}</p>
              <p className="mt-1 text-sm font-serif italic">"{a.proyecto}"</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {a.ods.map((o) => <span key={o} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{o}</span>)}
              </div>
              <button className="mt-4 touch-target w-full px-3 rounded-md border border-border text-sm hover:border-primary press focusable">
                {role === "becario" ? "Conectar" : "Ver perfil"}
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
