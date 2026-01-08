import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MessageSquare, FileText, Phone } from "lucide-react";

interface Activity {
  id: string;
  type: "email" | "chat" | "note" | "call";
  contactPerson: string;
  message: string;
  timestamp: string;
}

export default function SingleLeadTimeline() {
  const navigate = useNavigate();
  const { leadId } = useParams();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Mock data - replace with actual data from API
  const leadName = "Sarah Johnson";
  const activities: Activity[] = [
    {
      id: "1",
      type: "email",
      contactPerson: "John Smith",
      message: "Sent project proposal and timeline for Q1 initiatives...",
      timestamp: "2024-01-15 at 3:45 PM",
    },
    {
      id: "2",
      type: "chat",
      contactPerson: "John Smith",
      message: "Sent project proposal and timeline for Q1 initiatives...",
      timestamp: "2024-01-15 at 3:45 PM",
    },
    {
      id: "3",
      type: "note",
      contactPerson: "John Smith",
      message: "Sent project proposal and timeline for Q1 initiatives...",
      timestamp: "2024-01-15 at 3:45 PM",
    },
    {
      id: "4",
      type: "call",
      contactPerson: "John Smith",
      message: "Sent project proposal and timeline for Q1 initiatives...",
      timestamp: "2024-01-15 at 3:45 PM",
    },
    {
      id: "5",
      type: "email",
      contactPerson: "John Smith",
      message: "Sent project proposal and timeline for Q1 initiatives...",
      timestamp: "2024-01-15 at 3:45 PM",
    },
  ];

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "email":
        return <Mail className="h-5 w-5 text-white" />;
      case "chat":
        return <MessageSquare className="h-5 w-5 text-white" />;
      case "note":
        return <FileText className="h-5 w-5 text-white" />;
      case "call":
        return <Phone className="h-5 w-5 text-white" />;
    }
  };

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "email":
        return "bg-blue-500";
      case "chat":
        return "bg-purple-500";
      case "note":
        return "bg-yellow-500";
      case "call":
        return "bg-green-500";
    }
  };

  const getActivityLabel = (type: Activity["type"]) => {
    switch (type) {
      case "email":
        return "Email";
      case "chat":
        return "Chat";
      case "note":
        return "Note";
      case "call":
        return "Call";
    }
  };

  const handleActivityClick = (type: Activity["type"]) => {
    switch (type) {
      case "email":
        navigate(`/leads/${leadId}/emails`);
        break;
      case "chat":
        navigate(`/leads/${leadId}/chats`);
        break;
      case "note":
        navigate(`/leads/${leadId}/notes`);
        break;
      case "call":
        navigate(`/leads/${leadId}/calls`);
        break;
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-[#4ECDC4] text-white px-6 py-3 flex items-center gap-3">
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-lg font-semibold">Lead Communication Timeline</h2>
      </div>

      <div className="p-6">
        {/* Date Filters */}
        <Card className="mb-6 py-0 rounded-md">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date From
                </label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date To
                </label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Section */}
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>
              Follow Up Timeline ({activities.length} activities)
            </CardTitle>
            <CardDescription>
              Chronological view of lead interactions
            </CardDescription>
          </CardHeader>

          {/* Timeline Items */}
          <CardContent className="relative">
            {/* Vertical Line */}
            <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gray-200" />

            {/* Timeline Activities */}
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="relative flex gap-4">
                  {/* Icon */}
                  <div
                    onClick={() => handleActivityClick(activity.type)}
                    className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full ${getActivityColor(
                      activity.type
                    )} flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                    title={`View all ${getActivityLabel(
                      activity.type
                    ).toLowerCase()}s`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Content */}
                  <Card className="flex-1 py-0">
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">
                            {leadName}
                          </h4>
                          <span className="text-xs text-gray-400">
                            {activity.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {getActivityLabel(activity.type)} by{" "}
                          {activity.contactPerson}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">
                        {activity.message}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
