import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const data = [
  { day: "Mon", ai: 160, human: 20, total: "180" },
  { day: "Tue", ai: 190, human: 30, total: "220" },
  { day: "Wed", ai: 155, human: 40, total: "195" },
  { day: "Thu", ai: 190, human: 50, total: "240" },
  { day: "Fri", ai: 230, human: 50, total: "280" },
  { day: "Sat", ai: 110, human: 50, total: "160" },
  { day: "Sun", ai: 120, human: 20, total: "140" },
];

const chartConfig = {
  ai: { label: "AI", color: "#2563eb" },
  human: { label: "Human", color: "#22c55e" },
} satisfies ChartConfig;

function CustomXAxisTick(props: any) {
  const { x, y, payload } = props;
  const day = payload?.value as string;
  const item = data.find((d) => d.day === day);
  const total = item ? item.total : null;

  return (
    <g transform={`translate(${x}, ${y + 5})`}>
      <text
        x={0}
        y={0}
        textAnchor="middle"
        fill="#64748b"
        style={{ fontSize: 14 }}
      >
        {day}
      </text>
      {total !== null && (
        <text
          x={0}
          y={18}
          textAnchor="middle"
          fill="#94a3b8"
          style={{ fontSize: 12 }}
        >
          {total}
        </text>
      )}
    </g>
  );
}

export default function QuotationDailyChart() {
  return (
    <Card className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-semibold text-slate-900 mb-8">
        Quotation Generation breakdown
      </h3>
      <div className="h-80">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full border-0 bg-transparent p-0 shadow-none"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={12} barSize={64}>
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={<CustomXAxisTick />}
              />
              <Tooltip
                content={<ChartTooltipContent indicator="dot" />}
                cursor={false}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={12}
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (
                  <span className="text-sm text-slate-600 ml-2">{value}</span>
                )}
              />
              <Bar
                dataKey="human"
                name="Human"
                stackId="stack"
                width={48}
                fill="var(--color-human)"
                stroke="#ffffff"
                strokeWidth={5}
                strokeLinejoin="round"
              />
              <Bar
                dataKey="ai"
                name="AI"
                stackId="stack"
                width={48}
                radius={[8, 8, 0, 0]}
                fill="var(--color-ai)"
                stroke="#ffffff"
                strokeWidth={5}
                strokeLinejoin="round"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
}
