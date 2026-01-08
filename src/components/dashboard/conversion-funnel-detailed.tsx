import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const stages = [
  { name: "New Leads", value: 245, pct: "100%", color: "bg-blue-500" },
  { name: "Contacted", value: 198, pct: "81%", color: "bg-sky-400" },
  { name: "Qualified", value: 156, pct: "64%", color: "bg-emerald-500" },
  { name: "Proposal", value: 89, pct: "36%", color: "bg-amber-400" },
  { name: "Negotiation", value: 67, pct: "27%", color: "bg-orange-500" },
  { name: "Closed Won", value: 45, pct: "18%", color: "bg-emerald-600" },
];

export default function ConversionFunnelDetailed() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">
            Conversion Funnel - Detailed View
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md text-muted-foreground hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {stages.map((s) => (
          <div key={s.name} className="flex items-center gap-4">
            <div className="w-36 text-sm font-medium text-gray-700">
              {s.name}
            </div>

            <div className="flex-1">
              <div className="h-8 bg-slate-100 rounded-full relative flex items-center">
                <div
                  className={`${s.color} h-8 rounded-full flex items-center justify-end pr-4 text-white text-sm font-semibold`}
                  style={{ width: `${(s.value / stages[0].value) * 100}%` }}
                >
                  <div className="ml-2 mr-3 bg-transparent">{s.value}</div>
                </div>
              </div>
            </div>

            <div className="w-16 text-right text-sm text-muted-foreground">
              {s.pct}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 mt-6">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
        <Button>Close</Button>
      </div>
    </div>
  );
}
