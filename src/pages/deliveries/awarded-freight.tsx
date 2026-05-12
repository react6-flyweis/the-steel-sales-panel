import { useMemo, useState } from "react";
import {
  AlertCircle,
  TrendingUp,
  DollarSign,
  Truck,
  Award,
  FileText,
  Building2,
  Search,
  MapPin,
  CalendarDays,
  Package,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AwardedFreightDetailDialog from "./awarded-freight-detail-dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type FreightStatus = "in-progress" | "completed";

type Freight = {
  id: string;
  freightNumber: string;
  status: FreightStatus;
  bidsReceived: number;
  customer: string;
  project: string;
  awardedAmount: string;
  awardedTo: string;
  awardedDate: string;
  material: string;
  tons: string;
  pickup: string;
  delivery: string;
  deliveryDate: string;
};

const freights: Freight[] = [
  {
    id: "1",
    freightNumber: "FRQ-2024-5041",
    status: "in-progress",
    bidsReceived: 7,
    customer: "Acme Construction Corp",
    project: "Downtown Office Tower - Phase 2",
    awardedAmount: "$2,850",
    awardedTo: "FastFreight Logistics",
    awardedDate: "2024-03-20",
    material: "Steel & Metal",
    tons: "12 tons",
    pickup: "San Francisco, CA",
    delivery: "450 Market St, San Francisco, CA 94102",
    deliveryDate: "2024-03-25",
  },
  {
    id: "2",
    freightNumber: "FRQ-2024-5042",
    status: "in-progress",
    bidsReceived: 5,
    customer: "BuildRight LLC",
    project: "Harbor View Residential Complex",
    awardedAmount: "$1,920",
    awardedTo: "West Coast Haul",
    awardedDate: "2024-03-21",
    material: "Rebar",
    tons: "8 tons",
    pickup: "Oakland, CA",
    delivery: "1200 Port Ave, Oakland, CA 94607",
    deliveryDate: "2024-03-26",
  },
];

const statusConfig: Record<
  FreightStatus,
  { label: string; className: string; icon: React.ReactNode }
> = {
  "in-progress": {
    label: "In Progress",
    className: "bg-orange-50 text-orange-700 border-none",
    icon: <Award className="size-3.5" />,
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700 border-none",
    icon: <Award className="size-3.5" />,
  },
};

const stats = [
  {
    title: "Total Awarded Freight",
    value: "5",
    icon: Award,
    iconClassName: "text-orange-600",
    pillClassName: "bg-orange-100 text-orange-600",
  },
  {
    title: "Total Contract Value",
    value: "$10.5k",
    icon: DollarSign,
    iconClassName: "text-emerald-600",
    pillClassName: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "In Progress",
    value: "2",
    icon: Truck,
    iconClassName: "text-blue-600",
    pillClassName: "bg-blue-100 text-blue-600",
  },
  {
    title: "Avg Bids per Request",
    value: "6",
    icon: TrendingUp,
    iconClassName: "text-violet-600",
    pillClassName: "bg-violet-100 text-violet-600",
  },
];

export default function AwardedFreightRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [customerFilter, setCustomerFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [selectedFreight, setSelectedFreight] = useState<Freight | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const customerOptions = useMemo(
    () => ["all", ...new Set(freights.map((f) => f.customer))],
    [],
  );

  const filteredFreights = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return freights.filter((freight) => {
      if (customerFilter !== "all" && freight.customer !== customerFilter) {
        return false;
      }

      if (!query) {
        return true;
      }

      return [
        freight.freightNumber,
        freight.customer,
        freight.project,
        freight.material,
        freight.awardedTo,
      ].some((value) => value.toLowerCase().includes(query));
    });
  }, [customerFilter, searchQuery]);

  return (
    <div className="min-h-full bg-[#E8EFF9] px-2 py-3 md:px-5 md:py-5">
      <div className="space-y-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Awarded Freight Requests
          </h1>
          <p className="text-sm text-slate-600 md:text-base">
            View awarded freight bids for your customers and projects
          </p>
        </div>

        <Card className="border-[#b7d1ff] bg-[#f5f8ff] py-0 shadow-sm">
          <CardContent className="flex gap-3 px-4 py-4 md:px-6 md:py-5">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600">
              <AlertCircle className="size-4" />
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-blue-700">
                Read-Only Access
              </div>
              <p className="text-sm text-blue-700/90">
                This screen shows awarded freight requests only. To create
                freight requests or manage bidding, please contact the
                Construction or Admin teams.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="py-0 shadow-md">
                <CardContent className="flex items-center justify-between px-5 py-5">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>
                    <div className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                      {stat.value}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "rounded-full p-4 lg:p-5",
                      stat.pillClassName,
                    )}
                  >
                    <Icon className={cn("size-6", stat.iconClassName)} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="py-0 shadow-md">
          <CardContent className="grid gap-3 px-4 py-4 md:grid-cols-[2fr_1fr_1fr] md:px-5">
            <InputGroup className="bg-white">
              <InputGroupAddon>
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by freight number, project, material, or carrier..."
              />
            </InputGroup>

            <Select value={customerFilter} onValueChange={setCustomerFilter}>
              <SelectTrigger className="h-11 w-full bg-white text-slate-700">
                <SelectValue placeholder="All Customers" />
              </SelectTrigger>
              <SelectContent>
                {customerOptions.map((customer) => (
                  <SelectItem key={customer} value={customer}>
                    {customer === "all" ? "All Customers" : customer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="h-11 w-full bg-white text-slate-700">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {filteredFreights.map((item) => (
          <Card key={item.id} className="overflow-hidden py-0 shadow">
            <CardHeader className="px-4 pt-4 md:px-5 md:pt-5 border-b pb-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-xl font-bold tracking-tight text-slate-800">
                      {item.freightNumber}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={cn(
                        "flex items-center gap-1.5 rounded-full text-xs font-medium px-2.5 py-0.5",
                        statusConfig[item.status].className,
                      )}
                    >
                      {statusConfig[item.status].icon}
                      {statusConfig[item.status].label}
                    </Badge>

                    <div className="text-sm flex items-center bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md font-medium">
                      <FileText className="size-3 text-slate-400 mr-1.5 opacity-60" />
                      {item.bidsReceived} bids received
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-sm leading-5 text-slate-500">
                    <div className="flex items-center gap-1.5 font-medium text-slate-600">
                      <Building2 className="text-slate-400 size-4" />
                      <span>{item.customer}</span>
                    </div>
                    <span className="text-slate-400">&bull;</span>
                    <span className="text-slate-500">{item.project}</span>
                  </div>
                </div>

                <div className="flex flex-col lg:items-end">
                  <div className="text-sm text-slate-500 mb-0.5">
                    Awarded Amount
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">
                    {item.awardedAmount}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-4 py-4 md:px-5 md:py-5">
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5 lg:gap-5 items-start">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <Truck className="size-4" />
                    AWARDED TO
                  </div>
                  <div className="font-semibold text-slate-900">
                    {item.awardedTo}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Awarded: {item.awardedDate}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <Package className="size-4" />
                    MATERIAL
                  </div>
                  <div className="font-semibold text-slate-900">
                    {item.material}
                  </div>
                  <div className="text-sm text-slate-500">{item.tons}</div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <MapPin className="size-4" />
                    PICKUP
                  </div>
                  <div className="font-semibold text-slate-900">
                    {item.pickup}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <MapPin className="size-4" />
                    DELIVERY
                  </div>
                  <div className="font-semibold leading-relaxed text-slate-900 max-w-[180px]">
                    {item.delivery}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <CalendarDays className="size-4" />
                    DELIVERY DATE
                  </div>
                  <div className="font-semibold text-slate-900">
                    {item.deliveryDate}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-600 hover:bg-blue-50/50"
                  onClick={() => {
                    setSelectedFreight(item);
                    setIsDialogOpen(true);
                  }}
                >
                  <Search className="mr-2 size-4" />
                  View Full Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <AwardedFreightDetailDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          freight={selectedFreight}
        />

        <div className="text-center text-sm text-slate-500 pb-5">
          Showing {filteredFreights.length} of {freights.length} awarded freight
          requests
        </div>
      </div>
    </div>
  );
}
