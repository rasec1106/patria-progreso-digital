import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Search, X } from "lucide-react";
import { DIEGO } from "@/lib/mock-data";

export function BecarioHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <header className="border-b border-border bg-surface sticky top-0 z-30">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-4 sm:gap-6">
        <Link to="/" className="flex items-center gap-2 focusable rounded-md">
          <span className="size-8 rounded-md patria-gradient grid place-items-center text-primary-foreground font-bold">P</span>
          <span className="font-semibold tracking-tight">Patria C <span className="text-muted-foreground font-normal hidden sm:inline">· Becario</span></span>
        </Link>
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input placeholder="Buscar sesión, recurso, mentor..." className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-muted/60 border border-transparent focus:border-border focus:bg-surface outline-none focusable" />
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
            <img src={DIEGO.avatar} className="size-8 rounded-full" alt={DIEGO.nombre} />
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-tight">{DIEGO.nombre.split(" ").slice(0, 2).join(" ")}</p>
              <p className="text-meta">{DIEGO.region}</p>
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
              placeholder="Buscar sesión, recurso, mentor..."
              className="w-full pl-9 pr-3 min-h-[44px] text-sm rounded-lg bg-muted/60 border border-transparent focus:border-border focus:bg-surface outline-none focusable"
            />
          </div>
        </div>
      )}
    </header>
  );
}
