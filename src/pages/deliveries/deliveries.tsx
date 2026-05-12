import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Check,
  Clock,
  AlertCircle,
  CheckCircle2,
  Eye,
  Send,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatCard from "@/components/ui/stat-card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type DeliveryStatus =
  | "confirmed"
  | "in-transit"
  | "scheduled"
  | "delayed"
  | "rescheduled";

type Delivery = {
  id: string;
  item: string;
  project: string;
  customer: string;
  deliveryDate: string;
  deliveryTime: string;
  status: DeliveryStatus;
  communication: string[];
};

const mockDeliveries: Delivery[] = [
  {
    id: "D001",
    item: "Steel Beams (Grade A)",
    project: "Downtown Office Complex",
    customer: "Acme Corporation",
    deliveryDate: "Apr 2, 2026",
    deliveryTime: "8:00 AM - 10:00 AM",
    status: "confirmed",
    communication: ["confirmation"],
  },
  {
    id: "D002",
    item: "Concrete Panels (Type B)",
    project: "Riverside Residential Tower",
    customer: "Urban Development LL",
    deliveryDate: "Apr 1, 2026",
    deliveryTime: "7:00 AM - 9:00 AM",
    status: "in-transit",
    communication: ["confirmation", "48hr", "24hr"],
  },
  {
    id: "D003",
    item: "Glass Panels (Storefront)",
    project: "Harbor Shopping Center",
    customer: "Retail Ventures Inc",
    deliveryDate: "Apr 3, 2026",
    deliveryTime: "10:00 AM - 12:00 PM",
    status: "scheduled",
    communication: ["confirmation"],
  },
  {
    id: "D004",
    item: "HVAC Units (Commercial)",
    project: "Downtown Office Complex",
    customer: "Acme Corporation",
    deliveryDate: "Apr 5, 2026",
    deliveryTime: "6:00 AM - 8:00 AM",
    status: "scheduled",
    communication: ["confirmation"],
  },
  {
    id: "D005",
    item: "Electrical Panels",
    project: "Tech Campus Phase 2",
    customer: "Innovation Tech",
    deliveryDate: "Mar 30, 2026",
    deliveryTime: "1:00 PM - 3:00 PM",
    status: "delayed",
    communication: ["confirmation", "48hr", "Reschedule"],
  },
  {
    id: "D006",
    item: "Windows (Double-Glaze)",
    project: "Riverside Residential Tower",
    customer: "Urban Development LL",
    deliveryDate: "Apr 8, 2026",
    deliveryTime: "9:00 AM - 11:00 AM",
    status: "scheduled",
    communication: ["confirmation"],
  },
  {
    id: "D007",
    item: "Aluminum Framing",
    project: "Harbor Shopping Center",
    customer: "Retail Ventures Inc",
    deliveryDate: "Apr 4, 2026",
    deliveryTime: "2:00 PM - 4:00 PM",
    status: "rescheduled",
    communication: ["confirmation", "Reschedule"],
  },
];

const getStatusBadge = (status: DeliveryStatus) => {
  const statusStyles = {
    confirmed: "bg-blue-100 text-blue-600",
    "in-transit": "bg-violet-100 text-violet-600",
    scheduled: "bg-slate-100 text-slate-600",
    delayed: "bg-red-100 text-red-600",
    rescheduled: "bg-orange-100 text-orange-600",
  };

  const statusLabels = {
    confirmed: "Confirmed",
    "in-transit": "In Transit",
    scheduled: "Scheduled",
    delayed: "Delayed",
    rescheduled: "Rescheduled",
  };

  return (
    <Badge
      className={cn(
        "h-8 rounded-full px-3 text-sm font-medium shadow-none",
        statusStyles[status],
      )}
    >
      {statusLabels[status]}
    </Badge>
  );
};

const getCommunicationBadges = (communication: string[]) => {
  return (
    <div className="flex flex-col gap-1.5">
      {communication.map((item) => (
        <div
          key={item}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600"
        >
          <CheckCircle2 className="size-4 shrink-0" />
          <span>
            {item === "confirmation" && "Confirmation"}
            {item === "48hr" && "48hr"}
            {item === "24hr" && "24hr"}
            {item === "Reschedule" && "Reschedule"}
          </span>
        </div>
      ))}
    </div>
  );
};

const getActionButtons = (
  deliveryId: string,
  onViewClick: (id: string) => void,
) => {
  return (
    <div className="flex items-center justify-end gap-3">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-full text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        aria-label="View delivery details"
        onClick={() => onViewClick(deliveryId)}
      >
        <Eye className="size-4.5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-full text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
        aria-label="Send delivery update"
      >
        <Send className="size-4.5" />
      </Button>
    </div>
  );
};

export default function DeliversPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveries] = useState(mockDeliveries);

  const handleViewDeliveryDetails = (deliveryId: string) => {
    navigate(`/deliveries/projects/${deliveryId}`);
  };

  // Calculate stats
  const stats = useMemo(() => {
    const total = deliveries.length;
    const confirmed = deliveries.filter((d) => d.status === "confirmed").length;
    const inTransit = deliveries.filter(
      (d) => d.status === "in-transit",
    ).length;
    const delayed = deliveries.filter((d) => d.status === "delayed").length;

    return { total, confirmed, inTransit, delayed };
  }, [deliveries]);

  // Filter deliveries based on criteria
  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((delivery) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          delivery.item.toLowerCase().includes(query) ||
          delivery.project.toLowerCase().includes(query) ||
          delivery.customer.toLowerCase().includes(query) ||
          delivery.id.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== "all") {
        if (delivery.status !== statusFilter) return false;
      }

      return true;
    });
  }, [deliveries, searchQuery, statusFilter]);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Project Deliveries
        </h1>
        <p className="text-gray-600 mt-1">
          Track and manage customer deliveries
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total"
          value={stats.total}
          color="bg-blue-500"
          icon={
            <div className="w-5 h-5 flex items-center justify-center text-blue-600 font-bold">
              6
            </div>
          }
        />
        <StatCard
          title="Confirmed"
          value={stats.confirmed}
          color="bg-green-500"
          icon={<Check className="w-5 h-5 text-green-600" />}
        />
        <StatCard
          title="In Transit"
          value={stats.inTransit}
          color="bg-blue-400"
          icon={<Clock className="w-5 h-5 text-blue-600" />}
        />
        <StatCard
          title="Issues"
          value={stats.delayed}
          color="bg-red-500"
          icon={<AlertCircle className="w-5 h-5 text-red-600" />}
        />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative w-full lg:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by item, project, or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-white">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="in-transit">In Transit</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="delayed">Delayed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="overflow-hidden border border-gray-200 bg-white p-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-360">
              <TableHeader className="bg-[#fafbfd]">
                <TableRow>
                  <TableHead className="px-6 py-5 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                    DELIVERY ID
                  </TableHead>
                  <TableHead className="px-6 py-5 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                    ITEM
                  </TableHead>
                  <TableHead className="px-6 py-5 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                    PROJECT
                  </TableHead>
                  <TableHead className="px-6 py-5 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                    CUSTOMER
                  </TableHead>
                  <TableHead className="px-6 py-5 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                    DELIVERY DATE
                  </TableHead>
                  <TableHead className="px-6 py-5 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                    STATUS
                  </TableHead>
                  <TableHead className="px-6 py-5 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                    COMMUNICATION
                  </TableHead>
                  <TableHead className="px-6 py-5 text-right text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                    ACTIONS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeliveries.length > 0 ? (
                  filteredDeliveries.map((delivery) => (
                    <TableRow
                      key={delivery.id}
                      className="border-gray-200 hover:bg-transparent"
                    >
                      <TableCell className="px-6 py-6 text-base font-medium text-slate-900">
                        <span className="text-[15px] font-semibold tracking-wide">
                          {delivery.id}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-6 text-[15px] text-slate-900">
                        <div className="max-w-67.5 truncate font-medium">
                          {delivery.item}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-6 text-[15px] text-slate-600">
                        <div className="max-w-70 truncate font-medium">
                          {delivery.project}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-6 text-[15px] text-slate-600">
                        <div className="max-w-60 truncate font-medium">
                          {delivery.customer}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-6 text-[15px] text-slate-900">
                        <div className="space-y-1 leading-none">
                          <div className="font-medium">
                            {delivery.deliveryDate}
                          </div>
                          <div className="text-sm text-slate-500">
                            {delivery.deliveryTime}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-6 text-sm">
                        {getStatusBadge(delivery.status)}
                      </TableCell>
                      <TableCell className="px-6 py-6 text-sm">
                        {getCommunicationBadges(delivery.communication)}
                      </TableCell>
                      <TableCell className="px-6 py-6 text-sm">
                        {getActionButtons(
                          delivery.id,
                          handleViewDeliveryDetails,
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No deliveries found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
