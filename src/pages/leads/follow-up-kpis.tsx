import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  //   Legend,
} from "recharts";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

const followUpData = [
  { day: "Mon", count: 10 },
  { day: "Tue", count: 15 },
  { day: "Wed", count: 30 },
  { day: "Thu", count: 35 },
  { day: "Fri", count: 45 },
  { day: "Sat", count: 30 },
  { day: "Sun", count: 35 },
];

const responseData = [
  { name: "Email", value: 456, color: "#8B5CF6" },
  { name: "Chat", value: 296, color: "#10B981" },
  { name: "Call", value: 234, color: "#3B82F6" },
];

export default function FollowUpKpis() {
  const totalResponses = responseData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const kpiCards = [
    {
      id: "weekly",
      title: "Weekly Follow-ups",
      value: "156",
      valueClass: "text-blue-700",
      delta: "+8% vs last week",
      deltaColor: "text-blue-600",
      bg: "#EEF2FF",
      headerIcon: "calendar",
      trend: "up",
      iconColor: "text-blue-600",
    },
    {
      id: "response",
      title: "Response Rate",
      value: "25%",
      valueClass: "text-green-700",
      delta: "+5% vs last week",
      deltaColor: "text-green-600",
      bg: "#ECFDF5",
      headerIcon: "trendUp",
      trend: "up",
      iconColor: "text-green-600",
    },
    {
      id: "conversion",
      title: "Conversion Rate",
      value: "24%",
      valueClass: "text-purple-700",
      delta: "+3% this month",
      deltaColor: "text-purple-600",
      bg: "#F5F3FF",
      headerIcon: "trendUp",
      trend: "up",
      iconColor: "text-purple-600",
    },
    {
      id: "auto",
      title: "Auto-Snooze & Auto-Reactivation",
      value: "40%",
      valueClass: "text-orange-700",
      delta: "5.5d improvement",
      deltaColor: "text-orange-600",
      bg: "#FFF7ED",
      headerIcon: "trendDown",
      trend: "down",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col sm:flex-row bg-teal-400 p-4 sm:px-6 items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl text-white font-semibold">
            Lead Scoring
          </h1>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* KPI Cards Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Follow-Up KPIs
          </h2>
          <p className=" text-gray-500 mb-4">Performance metrics</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map((card) => (
              <Card
                key={card.id}
                className="rounded-lg gap-2"
                style={{ backgroundColor: card.bg }}
              >
                <CardHeader className="">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-gray-600 font-medium">
                      {card.title}
                    </CardDescription>
                    {card.headerIcon === "calendar" ? (
                      <Calendar className={`h-4 w-4 ${card.iconColor}`} />
                    ) : card.trend === "up" ? (
                      <TrendingUp className={`h-4 w-4 ${card.iconColor}`} />
                    ) : (
                      <TrendingDown className={`h-4 w-4 ${card.iconColor}`} />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div
                      className={`text-xl md:text-3xl font-bold ${card.valueClass}`}
                    >
                      {card.value}
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm ${card.deltaColor}`}
                    >
                      {card.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>{card.delta}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Follow Ups Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Follow Ups</CardTitle>
                  <CardDescription>Last 7 Days</CardDescription>
                </div>
                <Select defaultValue="this-week">
                  <SelectTrigger className="w-35">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="last-week">Last Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={followUpData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: "#3B82F6", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Response Rate Trend */}
          <Card className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Response Rate Trend</CardTitle>
                </div>
                <Select defaultValue="this-week">
                  <SelectTrigger className="w-35">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="last-week">Last Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={responseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {responseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Total Responses in Center */}
              <div className="absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <div className="text-3xl font-bold text-gray-900">
                  {totalResponses.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Total Responses</div>
              </div>
              {/* Legend */}
              <div className="mt-6 space-y-2">
                {responseData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {item.value}{" "}
                      <span className="text-gray-500">
                        ({((item.value / totalResponses) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
