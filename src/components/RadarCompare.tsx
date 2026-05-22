import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { DIMENSIONS } from "@/lib/mock-data";

type Props = {
  entrada: Record<string, number>;
  actual: Record<string, number>;
  height?: number;
  showEntrada?: boolean;
  labelEntrada?: string;
  labelActual?: string;
};

export function RadarCompare({ entrada, actual, height = 320, showEntrada = true, labelEntrada = "Boleta de entrada", labelActual = "Hoy" }: Props) {
  const data = DIMENSIONS.map((d) => ({
    dimension: d.short,
    entrada: entrada[d.key] ?? 0,
    actual: actual[d.key] ?? 0,
  }));
  return (
    <ResponsiveContainer width="100%" height={height} minHeight={260}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="var(--color-border)" />
        <PolarAngleAxis dataKey="dimension" tick={{ fill: "var(--color-foreground)", fontSize: 11 }} />
        <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} />
        {showEntrada && (
          <Radar name={labelEntrada} dataKey="entrada" stroke="var(--color-muted-foreground)" fill="var(--color-muted-foreground)" fillOpacity={0.08} strokeDasharray="4 4" />
        )}
        <Radar name={labelActual} dataKey="actual" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.25} strokeWidth={2} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
