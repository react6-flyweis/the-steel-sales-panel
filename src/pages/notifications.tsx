import { useState } from "react";
import StatCard from "@/components/ui/stat-card";
import {
  UserPlus,
  RefreshCw,
  Clock,
  AlertTriangle,
  Calendar,
  Bell,
  BellRing,
  BellOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "update" | "reminder" | "alert" | "schedule" | "new";
  title: string;
  description: string;
  time: string;
  category: "Equipment" | "Finance" | "Meetings" | "General";
  isUnread: boolean;
}

const equipmentStats = [
  {
    title: "Total",
    value: "12",
    icon: <Bell className="w-5 h-5 text-[#1D51A4]" />,
    color: "bg-[#1D51A4]",
  },
  {
    title: "Unread",
    value: "42",
    icon: <BellRing className="w-5 h-5 text-[#3AB449]" />,
    color: "bg-[#3AB449]",
  },
  {
    title: "High Priority",
    value: "74",
    icon: <BellOff className="w-5 h-5 text-[#F59E0B]" />,
    color: "bg-[#F59E0B]",
  },
  {
    title: "Today",
    value: "12",
    icon: <Bell className="w-5 h-5 text-[#FD8D5B]" />,
    color: "bg-[#FD8D5B]",
  },
];

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "new",
    title: "New Equipment Updated",
    description:
      "Alice Johnson from The Steel Company has been Updated a Equipment.",
    time: "2 minutes ago",
    category: "Equipment",
    isUnread: true,
  },
  {
    id: "2",
    type: "reminder",
    title: "Task Reminder",
    description: "Follow up with Bob Smith is due in 30 minutes",
    time: "30 minutes ago",
    category: "General",
    isUnread: true,
  },
  {
    id: "3",
    type: "alert",
    title: "AI Equipment Service Overdue",
    description: "Service Overdue, Pay before 17 April",
    time: "1 hour ago",
    category: "Equipment",
    isUnread: true,
  },
  {
    id: "4",
    type: "schedule",
    title: "Meeting scheduled",
    description: "Meeting with Design studio confirmed for tomorrow at 2 pm",
    time: "2 hours ago",
    category: "Meetings",
    isUnread: false,
  },
  {
    id: "5",
    type: "update",
    title: "Invoice Approved",
    description: "Finance team approved the invoice #INV-2024-001",
    time: "5 hours ago",
    category: "Finance",
    isUnread: false,
  },
  {
    id: "6",
    type: "schedule",
    title: "Project Review",
    description: "Weekly project review meeting starting in 15 minutes",
    time: "Yesterday",
    category: "Meetings",
    isUnread: false,
  },
  {
    id: "7",
    type: "new",
    title: "New User Added",
    description: "John Doe has been added to the team.",
    time: "2 days ago",
    category: "General",
    isUnread: false,
  },
];

const iconMap = {
  new: UserPlus,
  update: RefreshCw,
  reminder: Clock,
  alert: AlertTriangle,
  schedule: Calendar,
};

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    { label: "All", value: "All" },
    { label: "Unread(3)", value: "Unread" },
    { label: "Leads(2)", value: "Leads" },
    { label: "Tasks(2)", value: "Tasks" },
    { label: "Meetings(2)", value: "Meetings" },
    { label: "Excalation", value: "Excalation" },
  ];

  const getFilteredNotifications = () => {
    if (activeFilter === "All") return mockNotifications;
    if (activeFilter === "Unread")
      return mockNotifications.filter((n) => n.isUnread);
    const categoryMap: { [key: string]: string } = {
      "Meetings(2)": "Meetings",
    };
    const category = categoryMap[activeFilter] || activeFilter;
    return mockNotifications.filter((n) => n.category === category);
  };

  const filteredData = getFilteredNotifications();

  const getIconStyles = (type: string) => {
    switch (type) {
      case "update":
        return { bg: "bg-blue-100", text: "text-blue-600" };
      case "reminder":
        return { bg: "bg-yellow-100", text: "text-yellow-600" };
      case "alert":
        return { bg: "bg-red-100", text: "text-red-600" };
      case "schedule":
        return { bg: "bg-cyan-100", text: "text-cyan-600" };
      case "new":
        return { bg: "bg-[#DBEAFE]", text: "text-[#1D51A4]" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-600" };
    }
  };

  const renderIcon = (type: string) => {
    const styles = getIconStyles(type);
    const IconComponent = iconMap[type as keyof typeof iconMap];

    return (
      <div
        className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${styles.bg} ${styles.text}`}
      >
        {IconComponent ? (
          <IconComponent className="w-5 h-5" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          />
        )}
      </div>
    );
  };

  return (
    <div className="xl:px-5 px-2 md:pt-5 pb-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 mt-2">
        <div className="flex items-start gap-1 flex-col">
          <h1
            className={`xl:text-3xl text-xl font-bold text-gray-800 md:mb-2 mb-1 `}
          >
            Notifications
          </h1>
          <p className={`text-[#4B5563]) md:text-base font-normal text-sm `}>
            Stay updated with project changes, approvals, drawings, dispatches,
            billings, and communication.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {equipmentStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
      {/* Filters Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <span className="text-gray-700 font-medium md:text-lg text-xs mr-2">
          Filter by:
        </span>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "px-6 py-2 rounded-lg md:text-sm text-xs font-medium transition-colors",
                {
                  "bg-gray-100 text-gray-600": filter.value !== activeFilter,
                }
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredData.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredData.map((notification) => (
              <div
                key={notification.id}
                className="p-6 flex flex-col md:flex-row gap-4 hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                {/* Icon */}
                {renderIcon(notification.type)}

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-gray-900 font-semibold text-base mb-1 group-hover:text-blue-600 transition-colors">
                    {notification.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-2">
                    {notification.description}
                  </p>
                  <span className="text-gray-400 text-xs font-medium">
                    {notification.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            No notifications found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
