import {
  Upload,
  RefreshCw,
  Code,
  Database,
  BookOpen,
  User as UserIcon,
  Check,
} from "lucide-react";

const history = [
  {
    icon: Upload,
    title: "Uploaded FAQ Document",
    subtitle: "Product support FAQ v2.1 - 45 new questions added",
    actor: "Sarah Admin",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    status: "completed",
    datetime: "2024-01-15 • 14:30",
  },
  {
    icon: RefreshCw,
    title: "Model Retrained",
    subtitle: "AI model updated with latest customer interaction data",
    actor: "System",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    status: "completed",
    datetime: "2024-01-14 • 09:15",
  },
  {
    icon: Code,
    title: "New Script Added",
    subtitle: "Billing inquiry response templates updated",
    actor: "Mike Manager",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    status: "completed",
    datetime: "2024-01-12 • 16:45",
  },
  {
    icon: Database,
    title: "Training Data Import",
    subtitle: "Historical chat logs from Q4 2023 processed",
    actor: "Data Team",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    status: "completed",
    datetime: "2024-01-10 • 11:20",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base Update",
    subtitle: "Technical documentation v3.2 integrated",
    actor: "Tech Team",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    status: "completed",
    datetime: "2024-01-08 • 13:30",
  },
];

function HistoryItem({ item }: { item: (typeof history)[0] }) {
  const Icon = item.icon;
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 bg-gray-50 rounded-lg p-3 sm:p-4 shadow-sm">
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${
          item.iconBg || "bg-sky-50"
        } ${item.iconColor || "text-sky-600"}`}
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      <div className="w-full flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-900 truncate">
              {item.title}
            </div>
            <div className="text-sm text-slate-500 mt-1 line-clamp-2">
              {item.subtitle}
            </div>

            <div className="text-xs text-slate-400 mt-2 flex items-center gap-3">
              <UserIcon className="w-3.5 h-3.5 text-slate-400" />
              <span className="inline-block">{item.actor}</span>
            </div>
          </div>

          <div className="w-full flex gap-5 justify-between  md:flex-col items-center sm:items-end mt-2 sm:mt-0">
            <div className="text-sm text-slate-400">{item.datetime}</div>
            <div className="mt-2">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                <Check className="w-3 h-3" />
                {item.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AILearningHistory() {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 mt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
          AI Learning History
        </h2>
        <a className="hidden sm:inline-flex text-sm text-sky-600">View All</a>
      </div>

      <div className="space-y-4">
        {history.map((h, idx) => (
          <HistoryItem key={idx} item={h} />
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="text-sky-600 text-sm">Load More History</button>
      </div>
    </div>
  );
}
