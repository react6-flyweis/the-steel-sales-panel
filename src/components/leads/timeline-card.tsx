import { CheckCircle } from "lucide-react";
import { Card } from "../ui/card";

type Lead = {
  id: string;
  name: string;
  progress?: number;
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

export default function TimelineCard({ lead }: { lead: Lead }) {
  return (
    <Card className="flex flex-col gap-6 p-6">
      <div>
        <div className="text-sm text-gray-500">
          Lead ID-<span className="font-semibold">{lead.id}</span>
        </div>
      </div>

      <h4 className="text-sm font-medium text-gray-900">Progress Steps</h4>
      <div className="">
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
        <div className="mt-2 pt-2 text-xs text-gray-500 border-t">
          Progress: Step {(lead.progress ?? 0) + 1} of {progressSteps.length}
        </div>
      </div>
    </Card>
  );
}
