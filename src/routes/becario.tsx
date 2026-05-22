import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BecarioHeader } from "@/components/BecarioHeader";
import { BecarioSidebar } from "@/components/BecarioSidebar";
import { BecarioBottomNav } from "@/components/BecarioBottomNav";

export const Route = createFileRoute("/becario")({
  component: BecarioLayout,
});

function BecarioLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BecarioHeader />
      <div className="flex flex-1 min-h-0">
        <BecarioSidebar />
        <main className="flex-1 min-w-0 pb-24 lg:pb-0">
          <Outlet />
        </main>
      </div>
      <BecarioBottomNav />
    </div>
  );
}
