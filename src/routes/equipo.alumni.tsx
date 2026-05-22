import { createFileRoute } from "@tanstack/react-router";
import { AlumniNetwork } from "@/components/AlumniNetwork";

export const Route = createFileRoute("/equipo/alumni")({
  component: () => <AlumniNetwork role="equipo" />,
});
