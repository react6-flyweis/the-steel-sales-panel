import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, User } from "lucide-react";

interface CommunicationItem {
  id: string;
  clientName: string;
  message: string;
  contactPerson: string;
  timestamp: string;
  status: string;
}

export default function LeadCommunicationTimeline() {
  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [status, setStatus] = useState("completed");
  const [searchClient, setSearchClient] = useState("");

  const communicationItems: CommunicationItem[] = [
    {
      id: "1",
      clientName: "Sarah Johnson",
      message:
        "Hi Sarah, Following up on our discussion about the implementation timeline...",
      contactPerson: "John Smith",
      timestamp: "2024-01-15 at 3:45 PM",
      status: "completed",
    },
    {
      id: "2",
      clientName: "Sarah Johnson",
      message:
        "Hi Sarah, Following up on our discussion about the implementation timeline...",
      contactPerson: "John Smith",
      timestamp: "2024-01-15 at 3:45 PM",
      status: "completed",
    },
    {
      id: "3",
      clientName: "Sarah Johnson",
      message:
        "Hi Sarah, Following up on our discussion about the implementation timeline...",
      contactPerson: "John Smith",
      timestamp: "2024-01-16 at 3:45 PM",
      status: "completed",
    },
    {
      id: "4",
      clientName: "Sarah Johnson",
      message:
        "Hi Sarah, Following up on our discussion about the implementation timeline...",
      contactPerson: "John Smith",
      timestamp: "2024-01-15 at 3:45 PM",
      status: "completed",
    },
    {
      id: "5",
      clientName: "Sarah Johnson",
      message:
        "Hi Sarah, Following up on our discussion about the implementation timeline...",
      contactPerson: "John Smith",
      timestamp: "2024-01-15 at 3:45 PM",
      status: "completed",
    },
    {
      id: "6",
      clientName: "Sarah Johnson",
      message:
        "Hi Sarah, Following up on our discussion about the implementation timeline...",
      contactPerson: "John Smith",
      timestamp: "2024-01-15 at 3:45 PM",
      status: "completed",
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-[#4ECDC4] text-white px-6 py-3">
        <h2 className="text-lg font-semibold">Lead Communication Timeline</h2>
      </div>

      <div className="p-5">
        {/* Filters */}

        <div className="bg-white p-4 rounded-md grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
          {/* Date From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date From
            </label>
            <Input
              type="text"
              placeholder="dd-mm-yyyy"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date To
            </label>
            <Input
              type="text"
              placeholder="dd-mm-yyyy"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Client Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client
            </label>
            <Input
              type="text"
              placeholder="Search client..."
              value={searchClient}
              onChange={(e) => setSearchClient(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Timeline Grid - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communicationItems.map((item) => (
            <Card
              key={item.id}
              className="py-0 rounded-md ring-0 border-none cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/leads/${item.id}/timeline`)}
            >
              <CardContent className="p-4">
                {/* Client Name */}
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.clientName}
                </h3>

                {/* Message with Icon */}
                <div className="flex items-start gap-2 mb-3">
                  <Mail className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.message}
                  </p>
                </div>

                {/* Contact Person and Timestamp */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{item.contactPerson}</span>
                  </div>
                  <span>{item.timestamp}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
