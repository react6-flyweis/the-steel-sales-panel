import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
} from "recharts";

const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

// three series values per week
const series = {
  blue: [4.1, 4.5, 4.4, 4.3],
  orange: [4.3, 4.0, 3.9, 4.6],
  green: [4.2, 4.1, 4.4, 4.4],
};

// We'll space groups on the x-axis at 0,3,6,... and offset points per series
const GROUP_SPACING = 3;
const offsets = { blue: -0.6, orange: 0, green: 0.6 };

const blueData = weeks.map((_, i) => ({
  x: i * GROUP_SPACING + offsets.blue,
  y: series.blue[i],
  weekIndex: i,
}));
const orangeData = weeks.map((_, i) => ({
  x: i * GROUP_SPACING + offsets.orange,
  y: series.orange[i],
  weekIndex: i,
}));
const greenData = weeks.map((_, i) => ({
  x: i * GROUP_SPACING + offsets.green,
  y: series.green[i],
  weekIndex: i,
}));

export default function CSATTrendChart() {
  const xTicks = weeks.map((_, i) => i * GROUP_SPACING);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-2xl font-semibold text-slate-900 mb-6">
        Customer Satisfied (CSAT) Trend
      </h3>

      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 40, left: 20 }}>
            <XAxis
              type="number"
              dataKey="x"
              domain={[-1, (weeks.length - 1) * GROUP_SPACING + 1]}
              ticks={xTicks}
              axisLine={false}
              tickLine={false}
              //   tick={renderTick}
            />

            <YAxis
              type="number"
              dataKey="y"
              domain={[3.5, 5]}
              axisLine={false}
              tickLine={false}
              tick={false}
            />

            <Scatter data={blueData} fill="#3b82f6" line={{}} shape="circle" />
            <Scatter data={orangeData} fill="#fb8c00" />
            <Scatter data={greenData} fill="#10b981" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
