import {
  MessageSquare,
  FileText,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

const stats = [
  {
    title: "Total Queries Handled",
    value: "1,850",
    icon: <MessageSquare className="h-6 w-6 text-white" />,
    color: "bg-blue-500",
    aiPercent: 68,
    humanPercent: 32,
  },
  {
    title: "Quotation Sent",
    value: "635",
    icon: <FileText className="h-6 w-6 text-white" />,
    color: "bg-green-500",
    aiPercent: 66,
    humanPercent: 34,
  },
  {
    title: "Payments Processed",
    value: "270",
    icon: <CreditCard className="h-6 w-6 text-white" />,
    color: "bg-orange-500",
    aiPercent: 68,
    humanPercent: 32,
  },
  {
    title: "Resolution Rate",
    value: "88%",
    icon: <CheckCircle2 className="h-6 w-6 text-white" />,
    color: "bg-purple-500",
    aiPercent: 68,
    humanPercent: 32,
  },
];

export function AIStatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-2xl shadow-md p-6 relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${stat.color}`}
            >
              {stat.icon}
            </div>

            <div className="text-right">
              <div className="text-2xl md:text-3xl font-semibold text-slate-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.title}</div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-2">AI vs Human</p>

            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full ${stat.color}`}
                style={{ width: `${stat.aiPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>AI: {stat.aiPercent}%</span>
              <span>Human: {stat.humanPercent}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
