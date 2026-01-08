import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";

interface LeadScore {
  id: string;
  name: string;
  leadId: string;
  location: string;
  progress: number;
  status: "Proposal sent" | "Quotation Sent";
  quoteValue: number;
  score: "Hot" | "Warm" | "Cold";
  lastActivity: string;
}

const initialLeads: LeadScore[] = [
  {
    id: "1",
    name: "John Doe",
    leadId: "O-2025-1047",
    location: "Workshop - Texas",
    progress: 4,
    status: "Proposal sent",
    quoteValue: 12500,
    score: "Hot",
    lastActivity: "2 Days Ago",
  },
  {
    id: "2",
    name: "John Doe",
    leadId: "O-2025-1047",
    location: "Workshop - Texas",
    progress: 3,
    status: "Quotation Sent",
    quoteValue: 12500,
    score: "Warm",
    lastActivity: "2 Days Ago",
  },
  {
    id: "3",
    name: "John Doe",
    leadId: "O-2025-1047",
    location: "Workshop - Texas",
    progress: 3,
    status: "Proposal sent",
    quoteValue: 12500,
    score: "Cold",
    lastActivity: "2 Days Ago",
  },
  {
    id: "4",
    name: "John Doe",
    leadId: "O-2025-1047",
    location: "Workshop - Texas",
    progress: 3,
    status: "Proposal sent",
    quoteValue: 12500,
    score: "Hot",
    lastActivity: "2 Days Ago",
  },
];

export default function LeadScoring() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [status, setStatus] = useState("completed");
  const [client, setClient] = useState("");

  const [leads, setLeads] = useState<LeadScore[]>(initialLeads);

  const updateLeadScore = (id: string, newScore: LeadScore["score"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, score: newScore } : l))
    );
  };

  const getScoreBadgeClass = (score: string) => {
    switch (score) {
      case "Hot":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "Warm":
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      case "Cold":
        return "bg-green-500 hover:bg-green-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Proposal sent":
        return "bg-purple-100 text-purple-700 hover:bg-purple-200";
      case "Quotation Sent":
        return "bg-orange-100 text-orange-700 hover:bg-orange-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const renderProgressDots = (progress: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < progress ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="">
      {/* Header */}
      <div className="bg-teal-400  px-6 py-4 text-white">
        <h1 className="text-xl font-semibold">Lead Scoring</h1>
      </div>

      <div className="p-6 space-y-6">
        <h2 className="text-lg font-semibold mb-4">Lead Scoring</h2>
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg space-y-4 ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Date From
              </label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                placeholder="dd-mm-yyyy"
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Date To
              </label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                placeholder="dd-mm-yyyy"
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Client
              </label>
              <Input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Search client..."
                className="bg-white"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold text-gray-600 uppercase text-xs">
                  Lead Info
                </TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase text-xs">
                  Progress
                </TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase text-xs">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase text-xs">
                  Quote Value
                </TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase text-xs">
                  Score
                </TableHead>
                <TableHead className="font-semibold text-gray-600 uppercase text-xs">
                  Last Activity
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">
                        {lead.name}
                      </div>
                      <div className="text-sm text-gray-500">{lead.leadId}</div>
                      <div className="text-sm text-gray-400">
                        {lead.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {renderProgressDots(lead.progress)}
                      <span className="text-sm text-gray-600">
                        Step {lead.progress}/7
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(lead.status)}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${lead.quoteValue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={lead.score}
                      onValueChange={(val) =>
                        updateLeadScore(lead.id, val as LeadScore["score"])
                      }
                    >
                      <SelectTrigger
                        className={`${getScoreBadgeClass(
                          lead.score
                        )} rounded-full px-4`}
                      >
                        <SelectValue />
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hot">Hot</SelectItem>
                        <SelectItem value="Warm">Warm</SelectItem>
                        <SelectItem value="Cold">Cold</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {lead.lastActivity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
