import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "react-router";

interface FollowUpReminder {
  id: string;
  contactName: string;
  score: number;
  bestTime: string;
  reason: string;
}

export default function SmartReminders() {
  const [reminders] = useState<FollowUpReminder[]>([
    {
      id: "1",
      contactName: "Sarah Johnson",
      score: 92,
      bestTime: "3 PM today",
      reason: "based on previous response patterns",
    },
    {
      id: "2",
      contactName: "Sarah Johnson",
      score: 92,
      bestTime: "3 PM today",
      reason: "based on previous response patterns",
    },
    {
      id: "3",
      contactName: "Sarah Johnson",
      score: 92,
      bestTime: "3 PM today",
      reason: "based on previous response patterns",
    },
    {
      id: "4",
      contactName: "Sarah Johnson",
      score: 92,
      bestTime: "3 PM today",
      reason: "based on previous response patterns",
    },
    {
      id: "5",
      contactName: "Sarah Johnson",
      score: 92,
      bestTime: "3 PM today",
      reason: "based on previous response patterns",
    },
    {
      id: "6",
      contactName: "Sarah Johnson",
      score: 92,
      bestTime: "3 PM today",
      reason: "based on previous response patterns",
    },
  ]);

  const handleApply = (id: string) => {
    console.log("Apply reminder:", id);
    // Implement apply logic
  };

  const handleSnooze = (id: string) => {
    console.log("Snooze reminder:", id);
    // Implement snooze logic
  };

  const handleLoadMore = () => {
    console.log("Load more reminders");
    // Implement load more logic
  };

  return (
    <div className="w-full">
      <div className="bg-[#89D5DC] text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b">
        <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
          Smart Follow-Up Reminders
        </h2>
      </div>
      <div className="p-4 sm:p-6">
        <Card className="rounded-lg shadow-md">
          <CardHeader className="border-b">
            <div className="flex items-start justify-between gap-4 w-full">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  🤖 Smart Follow-Up Reminders
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  AI-powered suggestions
                </p>
              </div>

              <div className="">
                <span className="whitespace-nowrap inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                  3 active
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="w-full bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex-1 pr-0 sm:pr-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900 text-base">
                        <Link
                          to={`/leads/follow-up/smart-reminders/${reminder.id}`}
                          className="hover:underline"
                        >
                          {reminder.contactName}
                        </Link>
                      </h3>
                      <Badge className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-sm">
                        <span className="font-semibold">{reminder.score}%</span>
                        <Check className="h-4 w-4 text-green-700" />
                      </Badge>
                    </div>
                    <p className="text-sm text-wrap text-gray-600 mt-1 truncate">
                      Best time to follow up is{" "}
                      <span className="font-medium">{reminder.bestTime}</span>{" "}
                      {reminder.reason}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-3 sm:mt-0 sm:justify-end">
                    <Button
                      onClick={() => handleApply(reminder.id)}
                      className="flex-1 px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow"
                    >
                      Apply
                    </Button>
                    <Button
                      onClick={() => handleSnooze(reminder.id)}
                      variant="outline"
                      className="flex-1 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      Snooze
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="link" onClick={handleLoadMore}>
                Load More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
