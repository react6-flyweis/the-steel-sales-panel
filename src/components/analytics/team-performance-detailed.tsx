import { Download } from "lucide-react";
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Member {
  name: string;
  role: string;
  score: string;
  deals: string;
  revenue: string;
}

interface Props {
  setActiveReport: (v: string | null) => void;
}

const TeamPerformanceDetailed = forwardRef<HTMLDivElement, Props>(
  ({ setActiveReport }, ref) => {
    const members: Member[] = [
      {
        name: "Alice Johnson",
        role: "Sales Manager",
        score: "9.2/10",
        deals: "18",
        revenue: "$125,000",
      },
      {
        name: "Bob Smith",
        role: "Sales Rep",
        score: "8.1/10",
        deals: "15",
        revenue: "$89,000",
      },
      {
        name: "Carol Davis",
        role: "Customer Success",
        score: "8.8/10",
        deals: "16",
        revenue: "$98,000",
      },
    ];

    return (
      <div ref={ref} className="bg-white rounded-lg shadow p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Team Performance - Detailed View
          </h2>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button onClick={() => setActiveReport(null)}>Close</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {members.map((m) => (
            <Card key={m.name} className="p-4">
              <CardContent className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="text-lg font-semibold">{m.name}</div>
                  <div className="text-sm text-muted-foreground">{m.role}</div>

                  <div className="mt-4 text-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Performance Score
                      </span>
                      <span className="font-semibold">{m.score}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Deals Closed
                      </span>
                      <span className="font-semibold">{m.deals}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Revenue Generated
                      </span>
                      <span className="font-semibold">{m.revenue}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
);

export default TeamPerformanceDetailed;
