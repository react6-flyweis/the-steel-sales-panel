import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface Reminder {
  id: number;
  customer: string;
  suggestion: string;
  confidence: string;
}

const mockReminders: Reminder[] = [
  {
    id: 1,
    customer: "Sarah Johnson",
    suggestion:
      "Send follow-up call - is 3 PM today based on previous response patterns",
    confidence: "92%",
  },
  {
    id: 2,
    customer: "Michael Chen",
    suggestion:
      "Send pricing information - lead showed interest in premium features",
    confidence: "87%",
  },
  {
    id: 3,
    customer: "Emily Davis",
    suggestion: "Schedule demo call - lead has been researching competitors",
    confidence: "94%",
  },
];

export default function SmartReminders() {
  return (
    <Card className="p-6 gap-0">
      <div className="flex flex-col md:flex-row  md:items-center gap-2">
        <div className="">
          <span className="text-xl">🧠</span>
          <h2 className="text-lg font-semibold">Smart Follow-Up Reminders</h2>
        </div>
        <span className="ml-auto bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
          3 active
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-5">AI-powered suggestions</p>

      <div className="space-y-4">
        {mockReminders.map((reminder) => (
          <div key={reminder.id} className="bg-[#F9FAFB] rounded-md p-2">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {reminder.customer}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {reminder.suggestion}
                </p>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <span className="text-sm font-medium text-green-600">
                  {reminder.confidence}
                </span>
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Apply
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-gray-300"
              >
                Snooze
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Button variant="link" className="text-blue-600 text-sm">
          View All Smart Reminders →
        </Button>
      </div>
    </Card>
  );
}
