import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function LeadScoring() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between border-b">
        <div>
          <CardTitle>🎯 Lead Scoring</CardTitle>
          <CardDescription>Top performing leads</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium">
            4 total leads
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between bg-gray-50 rounded-md p-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-sm px-2 py-1 rounded bg-red-50 text-red-600">
                hot
              </span>
              <div className="font-medium text-gray-900">Sarah Johnson</div>
            </div>
            <div className="text-sm text-gray-500">Tech Solutions Inc</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">95</div>
            <div className="w-24 h-2 bg-gray-200 rounded mt-2">
              <div
                className="h-2 bg-blue-600 rounded"
                style={{ width: "95%" }}
              />
            </div>
            <div className="text-sm text-blue-600 mt-1">Follow Up</div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-50 rounded-md p-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-sm px-2 py-1 rounded bg-yellow-50 text-yellow-700">
                warm
              </span>
              <div className="font-medium text-gray-900">Michael Chen</div>
            </div>
            <div className="text-sm text-gray-500">StartupXYZ</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">78</div>
            <div className="w-24 h-2 bg-gray-200 rounded mt-2">
              <div
                className="h-2 bg-blue-600 rounded"
                style={{ width: "78%" }}
              />
            </div>
            <div className="text-sm text-blue-600 mt-1">Follow Up</div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-50 rounded-md p-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-sm px-2 py-1 rounded bg-red-50 text-red-600">
                hot
              </span>
              <div className="font-medium text-gray-900">Emily Davis</div>
            </div>
            <div className="text-sm text-gray-500">Enterprise Corp</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">88</div>
            <div className="w-24 h-2 bg-gray-200 rounded mt-2">
              <div
                className="h-2 bg-blue-600 rounded"
                style={{ width: "88%" }}
              />
            </div>
            <div className="text-sm text-blue-600 mt-1">Follow Up</div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-50 rounded-md p-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-sm px-2 py-1 rounded bg-blue-50 text-blue-600">
                cold
              </span>
              <div className="font-medium text-gray-900">Robert Wilson</div>
            </div>
            <div className="text-sm text-gray-500">Global Industries</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">45</div>
            <div className="w-24 h-2 bg-gray-200 rounded mt-2">
              <div
                className="h-2 bg-blue-600 rounded"
                style={{ width: "45%" }}
              />
            </div>
            <div className="text-sm text-blue-600 mt-1">Follow Up</div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-center">
        <Link to="/leads/follow-up/scoring">
          <Button variant="link">
            View All Lead Scores
            <ArrowRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
