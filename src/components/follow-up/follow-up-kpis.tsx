import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";

export default function FollowUpKpis() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between border-b">
        <div>
          <CardTitle>📊 Follow-Up KPIs</CardTitle>
          <CardDescription>Performance metrics</CardDescription>
        </div>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          This Week
        </span>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-700">Weekly Follow-ups</div>
            <div className="text-2xl font-bold text-blue-900">156</div>
            <div className="text-sm text-blue-600 mt-1">+8% vs last week</div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-green-700">Response Rate</div>
            <div className="text-2xl font-bold text-green-900">25%</div>
            <div className="text-sm text-green-600 mt-1">+5% vs last week</div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-purple-700">Conversion Rate</div>
            <div className="text-2xl font-bold text-purple-900">24%</div>
            <div className="text-sm text-purple-600 mt-1">+3% this month</div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm text-orange-700">Avg Response Time</div>
            <div className="text-2xl font-bold text-orange-900">2.3d</div>
            <div className="text-sm text-orange-600 mt-1">
              -0.5d improvement
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-center">
        <a className="text-blue-600 hover:underline">
          View Detailed Analytics →
        </a>
      </CardFooter>
    </Card>
  );
}
