import { useEffect, useRef, useState } from "react";
import { MapPin, Briefcase, UserSearch, HelpCircle } from "lucide-react";
import { ALUMNI, odsLabel } from "@/lib/mock-data";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";

type Props = {
  role: "becario" | "equipo";
};

export function AlumniNetwork({ role }: Props) {
  const [region, setRegion] = useState("Todas");
  const [edicion, setEdicion] = useState("Todas");
  const [ods, setOds] = useState("Todos");
  const [odsHelp, setOdsHelp] = useState(false);
  const odsHelpRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!odsHelp) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!odsHelpRef.current?.contains(e.target as Node)) setOdsHelp(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOdsHelp(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [odsHelp]);

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
        <label className="flex-1 sm:flex-none sm:w-44">
          <span className="block mb-1 text-eyebrow tracking-wide">Región</span>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full text-sm min-h-[44px] px-3 rounded-md border border-border bg-surface focusable truncate">
            <option>Todas</option>{Array.from(new Set(ALUMNI.map(a => a.region))).map(r => <option key={r}>{r}</option>)}
          </select>
        </label>
        <label className="flex-1 sm:flex-none sm:w-44">
          <span className="block mb-1 text-eyebrow tracking-wide">Edición</span>
          <select value={edicion} onChange={(e) => setEdicion(e.target.value)} className="w-full text-sm min-h-[44px] px-3 rounded-md border border-border bg-surface focusable truncate">
            <option>Todas</option>{[1,2,3].map(e => <option key={e}>{e}</option>)}
          </select>
        </label>
        <label className="flex-1 sm:flex-none sm:w-44">
          <span className="flex items-center gap-1 mb-1 h-4 text-eyebrow tracking-wide leading-none">
            ODS
            <span ref={odsHelpRef} className="relative inline-flex">
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOdsHelp((v) => !v); }}
                aria-label="¿Qué es ODS?"
                aria-expanded={odsHelp}
                className="inline-grid place-items-center size-4 rounded-full text-muted-foreground hover:text-foreground focusable"
              >
                <HelpCircle className="size-3.5" />
              </button>
              {odsHelp && (
                <span className="absolute top-full right-0 mt-1 z-50 w-56 max-w-[min(14rem,calc(100vw-2rem))] rounded-lg border border-border bg-surface shadow-md p-3 text-xs font-normal normal-case tracking-normal text-foreground fade-in">
                  <strong className="font-semibold">Objetivo de Desarrollo Sostenible</strong>
                  <span className="block mt-1 text-muted-foreground">Los 17 objetivos de la ONU (Agenda 2030) en los que trabaja cada egresado.</span>
                </span>
              )}
            </span>
          </span>
          <select value={ods} onChange={(e) => setOds(e.target.value)} className="w-full text-sm min-h-[44px] px-3 rounded-md border border-border bg-surface focusable truncate">
            <option value="Todos">Todos</option>{Array.from(new Set(ALUMNI.flatMap(a => a.ods))).map(o => <option key={o} value={o}>{odsLabel(o)}</option>)}
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
                {a.ods.map((o) => <span key={o} title={odsLabel(o)} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{odsLabel(o)}</span>)}
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
