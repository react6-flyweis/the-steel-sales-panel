import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Sample data for the pie chart (values/colors updated to match design)
const salesDistributionData = [
  { name: "Option A", value: 60, color: "#3b82f6" }, // Blue
  { name: "Option B", value: 20, color: "#fda4af" }, // Pink
  { name: "Option C", value: 20, color: "#f97316" }, // Orange
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const value = `${Math.round(percent * 100)}%`;

  return (
    <g key={`label-${index}`}>
      <circle cx={x} cy={y} r={20} fill="#fff" stroke="#eef2f7" />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#111"
        fontSize={12}
        fontWeight={600}
      >
        {value}
      </text>
    </g>
  );
};

export function SalesDistributionChart() {
  const now = new Date();
  const monthName = now.toLocaleString(undefined, { month: "long" });
  const year = now.getFullYear();

  return (
    <Card className="p-6">
      {/* Header: left month selector, centered title, right year selector */}
      <div className="grid grid-cols-3 items-center gap-4 mb-6">
        <div className="flex items-center gap-2 justify-start bg-gray-50 px-3 py-1.5 rounded-lg">
          <button className="hover:bg-gray-200 rounded p-0.5">
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-700">{monthName}</span>
          <button className="hover:bg-gray-200 rounded p-0.5">
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <h3 className="text-lg font-semibold text-center">Sales</h3>

        <div className="flex items-center gap-2 justify-end bg-gray-50 px-3 py-1.5 rounded-lg">
          <button className="hover:bg-gray-200 rounded p-0.5">
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-700">{year}</span>
          <button className="hover:bg-gray-200 rounded p-0.5">
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Donut Chart with custom percentage bubbles */}
      <div className="h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={salesDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {salesDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-3 mt-6">
        {salesDistributionData.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
