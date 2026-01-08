import { useState } from "react";
import { Link } from "react-router";
import {
  UserPlus,
  Download,
  MessageSquare,
  Eye,
  Edit,
  Users,
  UserCheck,
  UserX,
  Mail,
} from "lucide-react";
import ImportLeadsDialog from "@/components/leads/import-leads-dialog";
import AssignSalesDialog from "@/components/leads/assign-sales-dialog";
import CreateQuotationDialog from "@/components/leads/create-quotation-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/ui/stat-card";
import LeadDetailDialog from "@/components/leads/lead-detail-dialog";
import ChatDialog from "@/components/leads/chat-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import FilterTabs from "@/components/FilterTabs";

// Mock data - replace with actual API calls
const initialLeads = [
  {
    id: "ID-2025-1047",
    name: "John Doe",
    workshop: "Workshop",
    category: "Texas",
    assignedTo: null,
    assignedToName: "",
    assignmentStatus: "Assign",
    progress: 3,
    progressStep: "Step 4/7",
    status: "Proposal sent",
    statusColor: "purple",
    quoteValue: "$12,500",
    chatCount: 2,
  },
  {
    id: "ID-2025-1047",
    name: "John Doe",
    workshop: "Workshop",
    category: "Texas",
    assignedTo: "Sarah Lee",
    assignedToName: "Sarah Lee",
    assignmentStatus: "1 person assigned",
    progress: 3,
    progressStep: "Step 4/7",
    status: "Quotation Sent",
    statusColor: "orange",
    quoteValue: "$12,500",
    chatCount: 4,
  },
  {
    id: "ID-2025-1047",
    name: "John Doe",
    workshop: "Workshop",
    category: "Texas",
    assignedTo: "Sarah Lee",
    assignedToName: "Sarah Lee",
    assignmentStatus: "1 person assigned",
    progress: 3,
    progressStep: "Step 4/7",
    status: "Proposal sent",
    statusColor: "purple",
    quoteValue: "$12,500",
    chatCount: 2,
  },
  {
    id: "ID-2025-1047",
    name: "John Doe",
    workshop: "Workshop",
    category: "Texas",
    assignedTo: "Sarah Lee",
    assignedToName: "Sarah Lee",
    assignmentStatus: "1 person assigned",
    progress: 3,
    progressStep: "Step 4/7",
    status: "Proposal sent",
    statusColor: "purple",
    quoteValue: "$12,500",
    chatCount: 2,
  },
];

export default function LeadsPage() {
  const [buildingType, setBuildingType] = useState("all");
  const [projectValue, setProjectValue] = useState("all");
  const [assignments, setAssignments] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [leads] = useState(initialLeads);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(leads.map((lead) => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedLeads([...selectedLeads, id]);
    } else {
      setSelectedLeads(selectedLeads.filter((leadId) => leadId !== id));
    }
  };

  const getProgressDots = (progress: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(7)].map((_, i) => (
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

  const getStatusBadgeColor = (color: string) => {
    const colors: Record<string, string> = {
      purple: "bg-purple-100 text-purple-700",
      orange: "bg-orange-100 text-orange-700",
      green: "bg-green-100 text-green-700",
      blue: "bg-blue-100 text-blue-700",
    };
    return colors[color] || "bg-gray-100 text-gray-700";
  };

  return (
    <>
      <FilterTabs />
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl text-gray-900">Leads</h1>
          <p className="text-gray-500 mt-1">Assign and view leads</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Leads"
            value="7"
            color="bg-blue-600"
            icon={<Users className="h-5 w-5 text-blue-600" />}
          />
          <StatCard
            title="Assigned"
            value="5"
            color="bg-green-600"
            icon={<UserCheck className="h-5 w-5 text-green-600" />}
          />
          <StatCard
            title="Unassigned"
            value="2"
            color="bg-yellow-500"
            icon={<UserX className="h-5 w-5 text-yellow-600" />}
          />
          <StatCard
            title="Unopened Message"
            value="7"
            color="bg-orange-500"
            icon={<Mail className="h-5 w-5 text-orange-600" />}
          />
        </div>

        {/* Action Buttons and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <Link to="/leads/add" className="inline-block">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </Link>

            <ImportLeadsDialog />
            <Button variant="outline" className="bg-white">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <Select value={buildingType} onValueChange={setBuildingType}>
              <SelectTrigger className="w-full sm:w-40 bg-white">
                <SelectValue placeholder="Building types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="garages">Garages</SelectItem>
                <SelectItem value="workshops">Workshops</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="sales-storage">Sales Storage</SelectItem>
                <SelectItem value="arch-buildings">Arch Buildings</SelectItem>
              </SelectContent>
            </Select>

            <Select value={projectValue} onValueChange={setProjectValue}>
              <SelectTrigger className="w-full sm:w-40 bg-white">
                <SelectValue placeholder="Project value" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="small">
                  Small projects (&lt;$50,000)
                </SelectItem>
                <SelectItem value="medium">
                  Medium ($50,000 - $200,000)
                </SelectItem>
                <SelectItem value="large">Large (&gt;$200,000)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={assignments} onValueChange={setAssignments}>
              <SelectTrigger className="w-full sm:w-40 bg-white">
                <SelectValue placeholder="All Assignments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignments</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40 bg-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="proposal">Proposal sent</SelectItem>
                <SelectItem value="quotation">Quotation Sent</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedLeads.length === leads.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lead Info
                    </th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quote Value
                    </th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chat
                    </th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 py-2 sm:px-4 sm:py-4">
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(lead.id)}
                          onChange={(e) =>
                            handleSelectLead(lead.id, e.target.checked)
                          }
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {lead.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {lead.id}
                          </span>
                          <span className="text-sm text-gray-500">
                            {lead.workshop} · {lead.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4">
                        <div className="flex items-center gap-2">
                          {lead.assignedTo ? (
                            <>
                              <Avatar className="h-6 w-6 bg-green-100">
                                <AvatarFallback className="text-xs text-green-700">
                                  {lead.assignedToName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900">
                                  {lead.assignedToName}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {lead.assignmentStatus}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <Avatar className="h-6 w-6 bg-gray-100">
                                <AvatarFallback className="text-xs text-gray-500">
                                  <UserPlus className="h-3 w-3" />
                                </AvatarFallback>
                              </Avatar>
                              <AssignSalesDialog
                                trigger={
                                  <span className="text-sm text-green-600 font-medium cursor-pointer">
                                    {lead.assignmentStatus}
                                  </span>
                                }
                              />
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4">
                        <div className="flex flex-col gap-1">
                          {getProgressDots(lead.progress)}
                          <span className="text-xs text-gray-500">
                            {lead.progressStep}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4">
                        <Badge
                          className={getStatusBadgeColor(lead.statusColor)}
                          variant="secondary"
                        >
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4">
                        <span className="font-medium text-gray-900">
                          {lead.quoteValue}
                        </span>
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4">
                        <ChatDialog
                          lead={lead}
                          trigger={
                            <Button
                              variant="ghost"
                              size="sm"
                              className="relative p-2 h-8 w-8"
                            >
                              <MessageSquare className="h-4 w-4 text-blue-600" />
                              {lead.chatCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                  {lead.chatCount}
                                </span>
                              )}
                            </Button>
                          }
                        />
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4">
                        <div className="flex items-center gap-2">
                          <LeadDetailDialog
                            lead={lead}
                            trigger={
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 h-8 w-8"
                              >
                                <Eye className="h-4 w-4 text-gray-600" />
                              </Button>
                            }
                          />
                          <AssignSalesDialog
                            trigger={
                              <Button variant="ghost" size="icon">
                                <UserPlus />
                              </Button>
                            }
                          />
                          <CreateQuotationDialog
                            leadData={{ name: lead.name, id: lead.id }}
                            trigger={
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 h-8 w-8"
                              >
                                <Edit className="h-4 w-4 text-gray-600" />
                              </Button>
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
