import { createFileRoute, Outlet } from "@tanstack/react-router";
import { EquipoHeader } from "@/components/EquipoHeader";
import { EquipoBottomNav } from "@/components/EquipoBottomNav";

export const Route = createFileRoute("/equipo")({
  component: EquipoLayout,
});

function EquipoLayout() {
  return (
    <div className="min-h-screen bg-background">
      <EquipoHeader />
      <main className="pb-24 lg:pb-0"><Outlet /></main>
      <EquipoBottomNav />
    </div>
  );
}
