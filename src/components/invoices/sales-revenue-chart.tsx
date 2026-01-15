import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const overviewChartConfig = {
  customers: {
    label: "Customers",
    color: "#2563EB",
  },
  revenue: {
    label: "Revenue",
    color: "#F97316",
  },
  income: {
    label: "Income",
    color: "#10B981",
  },
  expense: {
    label: "Expense",
    color: "#EF4444",
  },
} satisfies ChartConfig;

const monthlyData = [
  { month: "Jan", customers: 12, revenue: 18, income: 15, expense: 7 },
  { month: "Feb", customers: 18, revenue: 24, income: 17, expense: 9 },
  { month: "Mar", customers: 28, revenue: 32, income: 23, expense: 14 },
  { month: "Apr", customers: 34, revenue: 38, income: 27, expense: 18 },
  { month: "May", customers: 29, revenue: 30, income: 22, expense: 16 },
  { month: "Jun", customers: 33, revenue: 34, income: 26, expense: 20 },
  { month: "Jul", customers: 26, revenue: 28, income: 21, expense: 15 },
];

export function SalesRevenueChart() {
  const summaryStats = [
    {
      label: "Total Sales this Month",
      value: "240k",
      key: "month",
      accentClass: "text-blue-600",
      accentBorder: "bg-gradient-to-r from-blue-500 to-sky-400",
      highlight: true,
    },
    {
      label: "Total Sales this Year",
      value: "1900k",
      key: "year",
      accentClass: "text-emerald-600",
      accentBorder: "bg-emerald-200/80",
      highlight: true,
    },
  ];

  return (
    <Card className="p-6 gap-0">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-slate-900">
          Sales & Revenue
        </h3>
        <p className="text-sm text-slate-400">6 Months</p>
      </div>

      <div className="mt-3 grid gap-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat) => {
          return (
            <div
              key={stat.label}
              className={cn(
                "bg-white/80 p-2 shadow-[0_10px_40px_rgba(15,23,42,0.05)] transition-all",
                "border-slate-100",
                "opacity-100"
              )}
            >
              <div className="mt-1 flex flex-col gap-1">
                <span
                  className={cn(
                    "text-2xl font-semibold leading-none",
                    stat.accentClass
                  )}
                >
                  {stat.value}
                </span>
                <span className={cn("text-sm font-semibold", stat.accentClass)}>
                  {stat.label}
                </span>
              </div>
              <div className={cn("mt-2 h-1 rounded-full", stat.accentBorder)} />
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <ChartContainer
          config={overviewChartConfig}
          className="h-64 w-full border-0 bg-transparent p-0 shadow-none"
        >
          <LineChart
            data={monthlyData}
            margin={{ left: 12, right: 12, top: 12 }}
          >
            <CartesianGrid
              strokeDasharray="6 8"
              stroke="#E2E8F0"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: "#A0AEC0", fontSize: 13, fontWeight: 600 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
              tickFormatter={(value) => `${value}k`}
              tickMargin={12}
              tick={{ fill: "#A0AEC0", fontSize: 12, fontWeight: 600 }}
              width={48}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  className="rounded-2xl border border-slate-200 bg-white/95"
                />
              }
              cursor={{ stroke: "#BFDBFE", strokeDasharray: "4 6" }}
            />

            <Line
              dataKey="customers"
              stroke="#2563EB"
              strokeWidth={4}
              strokeOpacity={1}
              dot={false}
            />
            <Line
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={4}
              strokeOpacity={1}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </Card>
  );
}
