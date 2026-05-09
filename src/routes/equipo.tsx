import { createFileRoute, Outlet } from "@tanstack/react-router";
import { EquipoHeader } from "@/components/EquipoHeader";

export const Route = createFileRoute("/equipo")({
  component: EquipoLayout,
});

function EquipoLayout() {
  return (
    <div className="min-h-screen bg-background">
      <EquipoHeader />
      <main><Outlet /></main>
    </div>
  );
}
