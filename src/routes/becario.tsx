import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BecarioSidebar } from "@/components/BecarioSidebar";
import { BecarioBottomNav } from "@/components/BecarioBottomNav";

export const Route = createFileRoute("/becario")({
  component: BecarioLayout,
});

function BecarioLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      <BecarioSidebar />
      <main className="flex-1 min-w-0 pb-20 lg:pb-0">
        <Outlet />
      </main>
      <BecarioBottomNav />
    </div>
  );
}
