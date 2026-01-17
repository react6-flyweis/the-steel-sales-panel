import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const base = [
  { name: "Mon", value: 6000 },
  { name: "Tue", value: 16000 },
  { name: "Wed", value: 26000 },
  { name: "Thu", value: 29000 },
  { name: "Fri", value: 38000 },
  { name: "Sat", value: 33000 },
  { name: "Sun", value: 30000 },
];

type Period = "7" | "30" | "90";
type Tab = "customers" | "revenue" | "team";

export default function PerformanceTrends() {
  const [period] = useState<Period>("7");
  const [tab, setTab] = useState<Tab>("customers");

  const data = useMemo(() => {
    // scale the base values depending on period and tab
    const periodMultiplier = period === "7" ? 1 : period === "30" ? 1.15 : 1.4;
    const tabMultiplier =
      tab === "customers" ? 1 : tab === "revenue" ? 2.2 : 0.9;

    return base.map((d) => ({
      name: d.name,
      value: Math.round(d.value * periodMultiplier * tabMultiplier),
    }));
  }, [period, tab]);

  const tabs = [
    { key: "customers", label: "Customers" },
    { key: "revenue", label: "Revenue" },
    { key: "team", label: "Team performance" },
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Performance Trends
          </h3>
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-3">
            Last 7 days
            <ChevronDown className="size-4" />
          </div>
        </div>
        <div className="text-sm text-gray-400">+15% increase this month</div>
      </div>

      <div className="mt-4">
        <div className="flex gap-3 items-center text-sm">
          {tabs.map((t) => {
            const active = t.key === tab;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key as Tab)}
                className={`px-3 py-1 rounded-full text-sm ${
                  active
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-500 bg-transparent"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} horizontal={false} />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                stroke="#9CA3AF"
                tick={{ fontSize: 13 }}
                padding={{ left: 10, right: 10 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
                width={40}
                stroke="#9CA3AF"
                tick={{ fontSize: 13 }}
              />

              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat().format(value)
                }
                contentStyle={{ borderRadius: 8 }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fill="url(#g)"
                dot={false}
              />
              <Line
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={4}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
