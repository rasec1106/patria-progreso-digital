import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/becario/certificado")({
  component: () => <Outlet />,
});
