import { NavLink, useLocation, useNavigate } from "react-router";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

// icons
import dashboardIcon from "@/assets/icons/sidebar/dashboard.svg";
import callIcon from "@/assets/icons/sidebar/call.svg";
import invoices from "@/assets/icons/sidebar/invoices.svg";
import leadsIcon from "@/assets/icons/sidebar/leads.svg";
import notificationIcon from "@/assets/icons/sidebar/notifications.svg";
import activeBgImage from "@/assets/images/active-bg.png";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavGroup =
  | "dashboard"
  | "users"
  | "messages"
  | "teams"
  | "gallery"
  | "analytics"
  | "documents"
  | "settings"
  | "links"
  | "accounts"
  | "reports"
  | "construction"
  | "ai-marketing";

interface NavigationItem {
  path: string;
  label: string;
  collapsible?: boolean;
  subItems?: { path: string; label: string; badge?: number }[];
}

interface NavigationGroup {
  id: NavGroup;
  icon: string;
  label: string;
  color: string;
  link: string;
  items: NavigationItem[];
}

const navigationGroups: NavigationGroup[] = [
  {
    id: "dashboard" as NavGroup,
    icon: dashboardIcon,
    label: "Dashboard",
    color: "bg-[#1e3a8a]",
    link: "/",
    items: [{ path: "/", label: "Dashboard" }],
  },

  {
    id: "links" as NavGroup,
    icon: leadsIcon,
    label: "Leads",
    color: "bg-[#a855f7]",
    link: "/leads",
    items: [
      {
        path: "/leads",
        label: "Leads",
      },
      {
        path: "/leads/follow-up",
        label: "Follow ups",
        collapsible: true,
        subItems: [
          { path: "/leads/follow-up", label: "Overview" },
          {
            path: "/leads/follow-up/communication-timeline",
            label: "Lead Communication Timeline",
          },
          {
            path: "/leads/follow-up/smart-reminders",
            label: "Smart Follow up Reminders",
          },
          {
            path: "/leads/follow-up/script-generator",
            label: "AI Follow-Up Script Generator",
          },
          { path: "/leads/follow-up/scoring", label: "Lead Scoring" },
          { path: "/leads/follow-up/kpis", label: "Follow-Up KPIs" },
        ],
      },
      { path: "/leads/ai-marketing", label: "AI Support" },
      { path: "/leads/escalated-queries", label: "Escalated Queries" },
      // escalated queries

      // payment follow-up
      {
        path: "/leads/payment-follow-up",
        label: "Payment Follow-Up",
      },
    ],
  },

  {
    id: "messages" as NavGroup,
    icon: callIcon,
    label: "Communication",
    color: "bg-[#3AB449]",
    link: "/communication",
    items: [{ path: "/communication", label: "Communication" }],
  },

  // notification
  {
    id: "notifications" as NavGroup,
    icon: notificationIcon,
    label: "Notifications",
    color: "bg-black",
    link: "/notifications",
    items: [{ path: "/notifications", label: "Notifications" }],
  },

  {
    id: "documents" as NavGroup,
    icon: invoices,
    label: "Invoices",
    color: "bg-[#a855f7]",
    link: "/invoice",
    items: [
      { path: "/invoice", label: "Invoice" },
      // invite list
      // { path: "/invoice/list", label: "Invoice List" },
      // sales growth
      // {
      //   path: "/invoice/sales-growth",
      //   label: "Sales Growth",
      // },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    () => {
      const defaults = new Set<string>();
      navigationGroups.forEach((group) =>
        group.items.forEach((item) => {
          if (item.collapsible) defaults.add(item.path);
        })
      );
      return defaults;
    }
  );

  // Determine active group based on current path
  const activeGroup =
    navigationGroups.find((group) =>
      group.items.some((item) => {
        if (item.path === "/") {
          return location.pathname === "/";
        }
        if (item.collapsible && item.subItems) {
          return item.subItems.some((subItem) =>
            location.pathname.startsWith(subItem.path)
          );
        }
        return location.pathname.startsWith(item.path);
      })
    ) || navigationGroups[0];

  // Auto-expand collapsible section if any of its child routes is active
  useEffect(() => {
    activeGroup?.items.forEach((item) => {
      if (item.collapsible && item.subItems) {
        const isAnySubItemActive = item.subItems.some((subItem) =>
          location.pathname.startsWith(subItem.path)
        );
        if (isAnySubItemActive) {
          setCollapsedSections((prev) => {
            const newSet = new Set(prev);
            newSet.delete(item.path);
            return newSet;
          });
        }
      }
    });
  }, [location.pathname, activeGroup]);

  const toggleSection = (path: string) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  // Get the index of the active group
  const activeGroupIndex = navigationGroups.findIndex(
    (group) => group.id === activeGroup.id
  );

  // Calculate padding based on active group index
  // Each icon with gap is approximately 48px (36px icon + 12px gap)
  const calculatedPadding = 10 + activeGroupIndex * 48;

  // Calculate the height needed for active group items
  const activeGroupItemsHeight = activeGroup.items.reduce((total, item) => {
    let height = 40; // Base item height (py-2 + content)
    if (
      item.collapsible &&
      item.subItems &&
      !collapsedSections.has(item.path)
    ) {
      height += item.subItems.length * 36; // Sub-items are slightly smaller
    }
    return total + height;
  }, 0);

  // Top section height (header with UserMenu, buttons, border, padding)
  const topSectionHeight = 120;

  // Determine final padding: use calculated padding if content fits, otherwise use 5
  const menuPaddingTop =
    activeGroupItemsHeight + calculatedPadding + topSectionHeight <
    window.innerHeight
      ? calculatedPadding
      : 10;

  const handleGroupChange = (group: (typeof navigationGroups)[0]) => {
    navigate(group.link);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleNavClick = () => {
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`flex fixed inset-y-0 left-0 lg:left-0 lg:top-0 z-50 transition-transform duration-300 lg:translate-x-0 h-screen ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Icon Sidebar */}
        <aside className="w-14 pt-28 bg-[#2563eb] h-screen flex flex-col items-center gap-4 z-20">
          <nav className="flex flex-col gap-3">
            {navigationGroups.map((group) => {
              const iconSrc = group.icon as string;
              const isActive = activeGroup.id === group.id;

              return (
                <button
                  key={group.id}
                  onClick={() => handleGroupChange(group)}
                  className={`relative flex items-center justify-center transition-all `}
                  title={group.label}
                >
                  {isActive && (
                    <img
                      src={activeBgImage}
                      alt="Active background"
                      className="absolute -right-3 max-w-13 object-contain"
                    />
                  )}
                  <div
                    className={`z-10 w-9 h-9 flex items-center justify-center rounded-full ${
                      group.color
                    } ${isActive ? "" : ""}`}
                  >
                    <img
                      src={iconSrc}
                      alt={group.label}
                      className="max-w-5 max-h-5 object-contain"
                    />
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Sidebar */}
        <aside className="w-56 bg-[#E8EFF9] h-full flex flex-col overflow-y-auto thin-scrollbar z-30">
          {/* Header */}
          <div className="p-2 border-b relative">
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 lg:hidden p-1 hover:bg-gray-200 rounded"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Admin Panel</h2>
                <p className="text-xs text-gray-500">admin@steelpro.com</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1 text-xs text-gray-400">
              <Button
                className="rounded bg-gray-300 px-4 text-foreground hover:bg-gray-400"
                size="sm"
              >
                <span>Today</span>
              </Button>
              <div className="flex gap-1">
                <button className="hover:text-gray-600">
                  <ChevronLeft className="size-4" />
                </button>
                <button className="hover:text-gray-600">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav
            className="flex-1 p-3 px-3"
            style={{ paddingTop: `${menuPaddingTop}px` }}
          >
            <div className="space-y-2">
              {activeGroup?.items.map((item, i) => {
                const isFirst = i === 0;

                if (item.collapsible && item.subItems) {
                  const isExpanded = !collapsedSections.has(item.path);
                  const isAnySubItemActive = item.subItems.some((subItem) =>
                    location.pathname.startsWith(subItem.path)
                  );

                  return (
                    <div key={item.path}>
                      <button
                        onClick={() => toggleSection(item.path)}
                        className={cn(
                          "w-full flex items-center justify-between text-sm px-4 py-2 rounded-lg transition-colors bg-white",
                          {
                            "ring shadow-lg": isAnySubItemActive,
                          }
                        )}
                      >
                        <span>{item.label}</span>
                        {isExpanded ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="mt-2 mb-1 space-y-2">
                          {item.subItems.map((subItem) => (
                            <NavLink
                              key={subItem.path}
                              to={subItem.path}
                              onClick={handleNavClick}
                              className={({ isActive }) =>
                                cn(
                                  "block px-4 py-2 rounded-lg transition-colors text-sm",
                                  {
                                    [`text-white ${activeGroup.color}`]:
                                      isActive,
                                    "bg-white shadow": !isActive,
                                  }
                                )
                              }
                            >
                              <div className="flex items-center justify-between">
                                <span>{subItem.label}</span>
                                {/* {subItem.badge != null && (
                                <span className="ml-3 inline-flex items-center justify-center text-xs font-medium text-white bg-[#fb923c] rounded-full px-2 py-0.5">
                                  {subItem.badge}
                                </span>
                              )} */}
                              </div>
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      cn(
                        "block px-4 py-2 rounded-lg transition-colors text-sm",
                        {
                          [`text-white ${activeGroup.color}`]:
                            isFirst || isActive,
                        },
                        {
                          "bg-white shadow-lg": !isFirst && !isActive,
                        },
                        { "w-[95%] mb-5": isFirst }
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
