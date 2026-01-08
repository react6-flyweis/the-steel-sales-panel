import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Legend,
  LabelList,
} from "recharts";

const data = [
  { week: "Week 1", ai: 180, human: 220 },
  { week: "Week 2", ai: 195, human: 240 },
  { week: "Week 3", ai: 280, human: 160 },
  { week: "Week 4", ai: 160, human: 140 },
];

const chartConfig = {
  ai: { label: "AI", color: "#2563eb" },
  human: { label: "Human", color: "#fb7f1a" },
} satisfies ChartConfig;

export default function QuotationWeeklyChart() {
  return (
    <Card className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-semibold text-slate-900 mb-8">
        Quotation Generation breakdown
      </h3>
      <div className="h-72">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full border-0 bg-transparent p-0 shadow-none"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={24} barSize={64}>
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 14 }}
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
                dataKey="ai"
                name="AI"
                width={40}
                radius={[8, 8, 8, 8]}
                fill="var(--color-ai)"
              >
                <LabelList
                  dataKey="ai"
                  position="top"
                  formatter={(val: any) => val}
                />
              </Bar>
              <Bar
                dataKey="human"
                name="Human"
                width={40}
                radius={[8, 8, 8, 8]}
                fill="var(--color-human)"
              >
                <LabelList
                  dataKey="human"
                  position="top"
                  formatter={(val: any) => val}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
}
