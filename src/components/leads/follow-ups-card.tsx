import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar, Clock } from "lucide-react";

type FollowUp = {
  id: number;
  name: string;
  note: string;
  timeAgo: string;
  icon: "camera" | "mail" | "phone" | "doc";
};

type Meeting = {
  id: number;
  time: string;
  title: string;
  company?: string;
  duration?: string;
  action: "call" | "email";
};

const followUps: FollowUp[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    note: "Discussed pricing options and implementation timeline",
    timeAgo: "2 hours ago",
    icon: "camera",
  },
  {
    id: 2,
    name: "Michael Chen",
    note: "Sent product demo video and case studies",
    timeAgo: "4 hours ago",
    icon: "mail",
  },
  {
    id: 3,
    name: "Emily Davis",
    note: "30-min discovery call completed - high interest level",
    timeAgo: "6 hours ago",
    icon: "phone",
  },
  {
    id: 4,
    name: "Robert Wilson",
    note: "Lead requested technical specifications document",
    timeAgo: "1 day ago",
    icon: "doc",
  },
];

const meetings: Meeting[] = [
  {
    id: 1,
    time: "09:00",
    title: "Follow up with Alice Johnson",
    company: "Tech Solutions Inc",
    duration: "30 min",
    action: "call",
  },
  {
    id: 2,
    time: "14:30",
    title: "Send Proposal to marketing Pro",
    company: "Marketing Pro",
    duration: "15 min",
    action: "email",
  },
];

export default function FollowUpsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="">
        <CardHeader className="flex items-start justify-between border-b">
          <div>
            <h3 className="text-lg font-semibold">Follow Up</h3>
            <div className="text-sm text-gray-500">Recent activities</div>
          </div>
          <Button className="h-9">Add Follow Up</Button>
        </CardHeader>

        <CardContent className="space-y-3">
          {followUps.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-700">
                {f.icon === "camera" && <Calendar className="h-4 w-4" />}
                {f.icon === "mail" && <Mail className="h-4 w-4" />}
                {f.icon === "phone" && <Phone className="h-4 w-4" />}
                {f.icon === "doc" && <Clock className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-900">
                  {f.name}
                </div>
                <div className="text-xs text-gray-500">{f.note}</div>
              </div>
              <div className="text-xs text-gray-400">{f.timeAgo}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold">Meetings</h3>
        <div className="mt-2 space-y-4">
          {meetings.map((m) => (
            <div
              key={m.id}
              className="rounded-lg p-4 bg-rose-50 border-l-4 border-rose-200 flex items-start justify-between"
            >
              <div>
                <div className="text-xs text-gray-500">{m.time}</div>
                <div className="font-semibold mt-1">{m.title}</div>
                {m.company && (
                  <div className="text-sm text-gray-500">{m.company}</div>
                )}
                <div className="text-sm text-gray-400 mt-1">{m.duration}</div>
              </div>
              <div>
                {m.action === "call" ? (
                  <Button
                    variant="ghost"
                    className="bg-green-50 text-green-700"
                  >
                    <Phone className="h-4 w-4 mr-2" /> Call
                  </Button>
                ) : (
                  <Button variant="ghost" className="bg-blue-50 text-blue-700">
                    <Mail className="h-4 w-4 mr-2" /> Email
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
