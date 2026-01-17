import { cn } from "@/lib/utils";
import { Phone, Mail, Calendar } from "lucide-react";

type Priority = "low" | "medium" | "high";

type Task = {
  id: string;
  title: string;
  company?: string;
  time: string;
  priority: Priority;
  icon?: "phone" | "mail" | "calendar";
  updated?: boolean;
};

export default function TodaysTask({ items }: { items?: Task[] }) {
  const defaultItems: Task[] = [
    {
      id: "1",
      title: "Follow up with Alice Johnson",
      company: "Tech Solutions Inc",
      time: "2:00 PM",
      priority: "high",
      icon: "phone",
      updated: true,
    },
    {
      id: "2",
      title: "Send proposal to Marketing Pro",
      company: "Marketing Pro",
      time: "4:30 PM",
      priority: "medium",
      icon: "mail",
    },
    {
      id: "3",
      title: "Meeting with Design Studio",
      company: "Design Studio",
      time: "Tomorrow 2:00 PM",
      priority: "high",
      icon: "calendar",
    },
  ];

  const tasks = items && items.length > 0 ? items : defaultItems;

  // Prefer the first item that is marked `updated`, otherwise default to first
  const firstUpdated = tasks.find((t) => t.updated) ?? tasks[0];
  const ordered = [
    firstUpdated,
    ...tasks.filter((t) => t.id !== firstUpdated.id),
  ];

  const iconFor = (type?: Task["icon"]) => {
    switch (type) {
      case "phone":
        return <Phone className="w-5 h-5 text-blue-600" />;
      case "mail":
        return <Mail className="w-5 h-5 text-green-600" />;
      case "calendar":
        return <Calendar className="w-5 h-5 text-purple-600" />;
      default:
        return <Phone className="w-5 h-5 text-gray-600" />;
    }
  };

  const pillMap: Record<Priority, string> = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-2xl font-semibold text-gray-900">Today's Task</h3>

      <div className="mt-6 space-y-6">
        {ordered.map((task) => (
          <div key={task.id} className="flex items-start gap-4">
            <div
              className={`p-3 rounded-lg ${
                task.icon === "phone"
                  ? "bg-blue-50"
                  : task.icon === "mail"
                    ? "bg-green-50"
                    : "bg-purple-50"
              }`}
            >
              {iconFor(task.icon)}
            </div>

            <div className="flex-1">
              <div
                className={`font-medium ${task.updated ? "text-sm text-gray-900" : "text-sm text-gray-900"}`}
              >
                {task.title}
              </div>
              {task.company ? (
                <div className="text-sm text-gray-500">{task.company}</div>
              ) : null}
              <div className="mt-1 flex items-center gap-3 text-sm">
                <div className="text-gray-500">{task.time}</div>
                <div
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    pillMap[task.priority],
                  )}
                >
                  {task.priority} Priority
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
