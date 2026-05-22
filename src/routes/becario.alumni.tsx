import { createFileRoute } from "@tanstack/react-router";
import { AlumniNetwork } from "@/components/AlumniNetwork";

export const Route = createFileRoute("/becario/alumni")({
  component: () => <AlumniNetwork role="becario" />,
});
