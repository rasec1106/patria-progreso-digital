import { createFileRoute, Outlet } from "@tanstack/react-router";
import { EquipoHeader } from "@/components/EquipoHeader";
import { EquipoSidebar } from "@/components/EquipoSidebar";
import { EquipoBottomNav } from "@/components/EquipoBottomNav";

export const Route = createFileRoute("/equipo")({
  component: EquipoLayout,
});

function EquipoLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EquipoHeader />
      <div className="flex flex-1 min-h-0">
        <EquipoSidebar />
        <main className="flex-1 min-w-0 pb-24 lg:pb-0">
          <Outlet />
        </main>
      </div>
      <EquipoBottomNav />
    </div>
  );
}
