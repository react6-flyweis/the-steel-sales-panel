import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  UserPlus,
  ArrowRight,
  Phone,
  FileText,
} from "lucide-react";

interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function RecentSalesActivity() {
  const items: ActivityItem[] = [
    {
      id: "1",
      title: "Deal closed with Global Industries - $300,000",
      subtitle: "1 hour ago • Assigned to Sarah Miller",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    {
      id: "2",
      title: "New qualified lead: TechCorp Manufacturing",
      subtitle: "3 hours ago • Auto-assigned to John Davis",
      icon: <UserPlus className="w-5 h-5 text-blue-500" />,
    },
    {
      id: "3",
      title: "Lead moved to Proposal: ABC Steel Works",
      subtitle: "4 hours ago • Updated by Lisa Wang",
      icon: <ArrowRight className="w-5 h-5 text-yellow-500" />,
    },
    {
      id: "4",
      title: "Follow-up call completed: Industrial Solutions",
      subtitle: "5 hours ago • Completed by John Davis",
      icon: <Phone className="w-5 h-5 text-purple-500" />,
    },
    {
      id: "5",
      title: "Proposal sent to BuildTech Corp",
      subtitle: "6 hours ago • Sent by Sarah Miller",
      icon: <FileText className="w-5 h-5 text-orange-400" />,
    },
  ];

  return (
    <Card>
      <CardHeader className="border-b flex justify-between items-center">
        <CardTitle>Recent Sales Activity</CardTitle>
        <a className="text-blue-600 hover:text-blue-700">View All</a>
      </CardHeader>

      <CardContent className="space-y-3">
        {items.map((it) => (
          <div
            key={it.id}
            className="flex items-start gap-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              {it.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 font-medium">{it.title}</div>
              <div className="text-sm text-gray-500 mt-1">{it.subtitle}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
