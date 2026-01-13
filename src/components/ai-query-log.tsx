import { Search, MessageSquare, Mic, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Query = {
  id: string;
  customer: string;
  type: "Text" | "Voice";
  by: string;
  res: "Resolved" | "Escalated";
  ts: string;
};

const SAMPLE: Query[] = [
  {
    id: "Q001",
    customer: "Sarah Johnson",
    type: "Text",
    by: "AI",
    res: "Resolved",
    ts: "2024-01-15 14:30",
  },
  {
    id: "Q002",
    customer: "Mike Chen",
    type: "Voice",
    by: "Employee",
    res: "Escalated",
    ts: "2024-01-15 13:45",
  },
  {
    id: "Q003",
    customer: "Emily Davis",
    type: "Text",
    by: "AI",
    res: "Resolved",
    ts: "2024-01-15 12:20",
  },
  {
    id: "Q004",
    customer: "James Wilson",
    type: "Voice",
    by: "AI",
    res: "Resolved",
    ts: "2024-01-15 11:15",
  },
  {
    id: "Q005",
    customer: "Lisa Brown",
    type: "Text",
    by: "Employee",
    res: "Escalated",
    ts: "2024-01-15 10:30",
  },
];

export default function AiQueryLog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [resolutionFilter, setResolutionFilter] = useState("all");

  const filteredData = useMemo(() => {
    return SAMPLE.filter((query) => {
      // Resolution filter
      if (
        resolutionFilter !== "all" &&
        query.res.toLowerCase() !== resolutionFilter
      ) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          query.id.toLowerCase().includes(q) ||
          query.customer.toLowerCase().includes(q) ||
          query.type.toLowerCase().includes(q) ||
          query.by.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [searchQuery, resolutionFilter]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Ai query log</h2>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3 w-full max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                className="w-full pl-10 pr-4 py-2 text-sm"
                placeholder="Search by customer or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="ml-auto">
            <Select
              value={resolutionFilter}
              onValueChange={setResolutionFilter}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Queries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Queries</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-slate-600 text-sm border-b">
            <tr>
              <th className="py-4 pl-4">Query ID</th>
              <th className="py-4">Customer Name</th>
              <th className="py-4">Type</th>
              <th className="py-4">Handled By</th>
              <th className="py-4">Resolution</th>
              <th className="py-4">Timestamp</th>
              <th className="py-4 pr-4"> </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredData.length > 0 ? (
              filteredData.map((q) => {
                const escalated = q.res === "Escalated";
                return (
                  <tr key={q.id} className={escalated ? "bg-rose-50" : ""}>
                    <td className="py-5 pl-4 font-medium text-slate-800">
                      {q.id}
                    </td>
                    <td className="py-5">{q.customer}</td>
                    <td className="py-5 flex items-center gap-2 text-slate-600">
                      {q.type === "Text" ? (
                        <MessageSquare className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Mic className="w-4 h-4 text-slate-400" />
                      )}
                      <span>{q.type}</span>
                    </td>
                    <td className="py-5">
                      <span className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs text-slate-700">
                        <User className="w-3 h-3 text-slate-500" />
                        {q.by}
                      </span>
                    </td>
                    <td className="py-5">
                      {q.res === "Resolved" ? (
                        <Badge variant="secondary">Resolved</Badge>
                      ) : (
                        <Badge className="bg-rose-100 text-rose-700">
                          Escalated
                        </Badge>
                      )}
                    </td>
                    <td className="py-5 text-slate-600">{q.ts}</td>
                    <td className="py-5 pr-4 text-right">
                      {escalated ? (
                        <Button className="bg-blue-600 text-white">
                          Take over
                        </Button>
                      ) : (
                        <Button className="bg-gray-100 hover:bg-gray-200 text-gray-800">
                          Marked as Resolved
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center">
                    <Search className="h-12 w-12 text-slate-300 mb-3" />
                    <p className="text-lg font-medium">No queries found</p>
                    <p className="text-sm">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-slate-500 text-sm">
        Showing {filteredData.length} of {SAMPLE.length} results
      </div>
    </div>
  );
}
