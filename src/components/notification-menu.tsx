import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import notificationIcon from "@/assets/icons/notification.svg";
import { Link } from "react-router";

export type NotificationItem = {
  id: string;
  title: string;
  timeAgo: string;
  status: "lead" | "reminder" | "success";
};

const statusDotStyles: Record<NotificationItem["status"], string> = {
  lead: "bg-blue-500",
  reminder: "bg-amber-400",
  success: "bg-emerald-500",
};

const headerNotifications: NotificationItem[] = [
  {
    id: "lead-1",
    title: "New lead from website contract form",
    timeAgo: "2 minutes ago",
    status: "lead",
  },
  {
    id: "reminder-1",
    title: "Follow-up reminder: Johnson Construction",
    timeAgo: "2 minutes ago",
    status: "reminder",
  },
  {
    id: "deal-1",
    title: "Deal closed: $45,000 warehouse project",
    timeAgo: "2 minutes ago",
    status: "success",
  },
];

export function NotificationMenu() {
  const items = headerNotifications;
  const total = items.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open notifications"
          className="relative flex size-8 items-center justify-center rounded-full border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
        >
          <img
            src={notificationIcon}
            alt="Notifications"
            className="max-h-5 max-w-5"
          />
          {total > 0 ? (
            <Badge className="absolute -right-1 -top-1 size-4 items-center justify-center rounded-full bg-red-600 p-0 text-xs font-semibold text-white">
              {total}
            </Badge>
          ) : null}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-xs rounded-2xl border border-gray-100 bg-white p-0 shadow-[0_20px_45px_rgba(15,23,42,0.15)]"
      >
        <div className="px-5 py-2 border-b">
          <p className="text-base font-semibold text-gray-900">Notifications</p>
          {/* <p className="text-sm text-gray-500">
            {total > 0
              ? `${total} new update${total > 1 ? "s" : ""}`
              : "You're all caught up"}
          </p> */}
        </div>

        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <button
              type="button"
              key={item.id}
              className="flex w-full items-start gap-3 px-5 py-2 text-left transition hover:bg-gray-50"
            >
              <span
                className={cn(
                  "mt-1 h-2.5 w-2.5 rounded-full",
                  statusDotStyles[item.status]
                )}
              />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-900">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">{item.timeAgo}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="border-t border-gray-100">
          <Link
            to="/notifications"
            className="w-full block rounded-b-2xl px-5 py-3 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            View all notifications
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
