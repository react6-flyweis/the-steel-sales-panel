import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { Card } from "../ui/card";

type Lead = {
  id: string;
  name: string;
  workshop?: string;
  category?: string;
  assignedToName?: string | null;
  assignmentStatus?: string;
  progress?: number;
  status?: string;
  statusColor?: string;
  quoteValue?: string;
  chatCount?: number;
};

const getStatusBadgeColor = (color: string | undefined) => {
  const colors: Record<string, string> = {
    purple: "bg-purple-100 text-purple-700",
    orange: "bg-orange-100 text-orange-700",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
  };
  return colors[color || ""] || "bg-gray-100 text-gray-700";
};

const progressSteps = [
  "Initial Contact",
  "Requirements Gathered",
  "Proposal Sent",
  "Negotiation",
  "Deal Closed",
  "Payment Done",
  "Delivered",
];

export default function BasicDetails({ lead }: { lead: Lead }) {
  return (
    <Card className="flex flex-col gap-6 p-6">
      <div>
        <div className="text-sm text-gray-500">
          Lead ID-<span className="font-semibold">{lead.id}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            Contact Information
          </h3>
          <div className="mt-3 text-sm text-gray-700 space-y-3">
            <div>
              <div className="text-xs text-gray-500">Full Name</div>
              <div className="text-sm text-gray-900">{lead.name}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Email</div>
              <div className="text-sm text-gray-900">john.doe@gmail.com</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Phone</div>
              <div className="text-sm text-gray-900">(555) 123-4567</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Location</div>
              <div className="text-sm text-gray-900">{lead.category}</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900">Project Details</h3>
          <div className="mt-3 text-sm text-gray-700 space-y-3">
            <div>
              <div className="text-xs text-gray-500">Building Type</div>
              <div className="text-sm text-gray-900">{lead.workshop}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Quote Value</div>
              <div className="text-sm text-gray-900">{lead.quoteValue}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Status</div>
              <div className="mt-1">
                <Badge
                  variant="secondary"
                  className={getStatusBadgeColor(lead.statusColor || "")}
                >
                  {lead.status}
                </Badge>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Created On</div>
              <div className="text-sm text-gray-900">2024-10-10</div>
            </div>
          </div>
        </div>
      </div>

      <h4 className="text-sm font-medium text-gray-900">Progress Steps</h4>
      <div className="p-4 rounded-lg bg-gray-50">
        <div className="space-y-3">
          {progressSteps.map((step, i) => {
            const idx = i + 1;
            const completed = idx <= (lead.progress ?? 0);
            const isCurrent = idx === (lead.progress ?? 0) + 1;
            return (
              <div key={step} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      completed
                        ? "bg-green-600 text-white"
                        : isCurrent
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {completed ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-sm">{idx}</span>
                    )}
                  </div>
                  <div>
                    <div
                      className={`text-sm ${
                        completed
                          ? "text-green-800"
                          : isCurrent
                          ? "text-blue-700 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {step}
                    </div>
                    {isCurrent && (
                      <div className="text-xs text-gray-500">Current Step</div>
                    )}
                  </div>
                </div>
                {completed && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-xs text-gray-500">
          Progress: Step {(lead.progress ?? 0) + 1} of {progressSteps.length}
        </div>
      </div>

      <h4 className="text-sm font-medium text-gray-900">Recent Activity</h4>
      <div className="p-4 rounded-lg bg-gray-50">
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-start gap-2">
            <span className="h-2 w-2 mt-1 rounded-full bg-blue-500" /> Last
            activity: 2024-10-18
          </li>
          <li className="flex items-start gap-2">
            <span className="h-2 w-2 mt-1 rounded-full bg-blue-300" /> Lead
            created: 2024-10-10
          </li>
          <li className="flex items-start gap-2">
            <span className="h-2 w-2 mt-1 rounded-full bg-red-500" /> 2 unread
            messages
          </li>
        </ul>
      </div>
    </Card>
  );
}
