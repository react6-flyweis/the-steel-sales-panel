import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Building2,
  Clock,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
  Mail,
  Award,
  FileText,
  ArrowRight,
  TrendingDown,
  Info,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FreightStatus = "in-progress" | "completed";

// This should match the type from awarded-freight.tsx
// To keep things simple, we'll redefine or import it. For now, redefining.
type FreightDetail = {
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

interface AwardedFreightDetailDialogProps {
  open: boolean;
  onClose: () => void;
  freight: FreightDetail | null;
}

const statusConfig: Record<
  FreightStatus,
  { label: string; className: string; icon: React.ReactNode }
> = {
  "in-progress": {
    label: "In Progress",
    className: "bg-orange-50 text-orange-700 hover:bg-orange-100",
    icon: <Clock className="size-3.5 mr-1" />,
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    icon: <CheckCircle2 className="size-3.5 mr-1" />,
  },
};

export default function AwardedFreightDetailDialog({
  open,
  onClose,
  freight,
}: AwardedFreightDetailDialogProps) {
  if (!freight) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0 gap-0 overflow-y-auto bg-white max-h-[90vh] ">
        {/* Header Section */}
        <DialogHeader className="border-b border-slate-200 px-6 py-5 shrink-0">
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight">
                  {freight.freightNumber}
                </DialogTitle>
                <Badge
                  variant="secondary"
                  className={cn(
                    "border-0 rounded-full px-3",
                    statusConfig[freight.status].className,
                  )}
                >
                  {statusConfig[freight.status].icon}
                  {statusConfig[freight.status].label}
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full bg-slate-100 text-slate-700 border-0 flex items-center px-3"
                >
                  <User className="size-3 mr-1" />
                  {freight.bidsReceived} bids received
                </Badge>
              </div>
              <DialogDescription className="flex items-center text-base text-slate-600">
                <Building2 className="size-4.5 mr-2 text-slate-400" />
                <span className="font-semibold text-slate-700 mr-1.5">
                  {freight.customer}
                </span>
                <span className="text-slate-400 mx-1">•</span>
                <span>{freight.project}</span>
              </DialogDescription>
            </div>
            {/* Using Dialog provided close button mostly, but keeping custom style from dialog component standard */}
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 px-6 py-6 space-y-6 bg-slate-50">
          {/* Info Alert */}
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <Info className="size-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 text-sm">
                View-Only Information
              </h4>
              <p className="text-sm text-blue-700 mt-0.5">
                You are viewing awarded freight details in read-only mode.
                Contact Construction or Admin team for bid management or
                changes.
              </p>
            </div>
          </div>

          {/* Awarded Carrier Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 shadow-sm text-white">
                <Award className="size-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-1">
                  Awarded Carrier
                </div>
                <div className="text-xl font-bold text-slate-900">
                  {freight.awardedTo}
                </div>
                <div className="text-sm text-slate-500 mt-1">
                  Awarded on {freight.awardedDate}
                </div>
              </div>
            </div>
            <div className="sm:text-right">
              <div className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-1">
                Contract Amount
              </div>
              <div className="text-3xl font-bold text-emerald-700">
                {freight.awardedAmount}
              </div>
              <div className="text-sm text-emerald-600 font-medium flex items-center sm:justify-end mt-1">
                <TrendingDown className="size-4 mr-1" />
                ~23% below average bid
              </div>
            </div>
          </div>

          {/* Grid Layout: Route & Material */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Route Information */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
              <div className="flex items-center gap-2 text-orange-900 font-bold mb-4 bg-orange-100/50 w-fit px-3 py-1.5 rounded-lg text-sm">
                <MapPin className="size-4 text-orange-600" />
                Route Information
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-1 opacity-70">
                    Pickup Location
                  </div>
                  <div className="font-semibold text-slate-900 mb-0.5">
                    {freight.pickup}
                  </div>
                  <div className="text-sm text-slate-600">
                    Pickup Date: 2024-03-25 (1 day before)
                  </div>
                </div>

                <div className="flex justify-center text-orange-400 py-1">
                  <ArrowRight className="size-5" />
                </div>

                <div>
                  <div className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-1 opacity-70">
                    Delivery Location
                  </div>
                  <div className="font-semibold text-slate-900 mb-0.5">
                    {freight.delivery}
                  </div>
                  <div className="text-sm text-slate-600">
                    Delivery Date: {freight.deliveryDate}
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-orange-200/50">
                  <div className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-1 opacity-70">
                    Estimated Distance
                  </div>
                  <div className="font-semibold text-slate-800 text-sm">
                    ~45 miles • 1 hr 15 min drive
                  </div>
                </div>
              </div>
            </div>

            {/* Material Details */}
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
              <div className="flex items-center gap-2 text-purple-900 font-bold mb-4 bg-purple-100/50 w-fit px-3 py-1.5 rounded-lg text-sm">
                <Package className="size-4 text-purple-600" />
                Material Details
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-1 opacity-70">
                    Material Type
                  </div>
                  <div className="font-semibold text-slate-900">
                    {freight.material}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-1 opacity-70">
                    Weight/Quantity
                  </div>
                  <div className="font-semibold text-slate-900">
                    {freight.tons}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-1 opacity-70">
                    Handling Requirements
                  </div>
                  <ul className="text-sm text-slate-700 list-disc list-inside space-y-1 ml-1 mt-1">
                    <li>Standard loading procedures</li>
                    <li>Flatbed truck required</li>
                    <li>Forklift available at both sites</li>
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-1 opacity-70">
                    Special Instructions
                  </div>
                  <div className="text-sm text-slate-700">
                    Temperature controlled not required
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carrier Contact Info */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <div className="flex items-center gap-2 text-blue-900 font-bold mb-5 bg-blue-100/60 w-fit px-3 py-1.5 rounded-lg text-sm">
              <Truck className="size-4 text-blue-600" />
              Carrier Contact Information
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 opacity-70">
                  Company Name
                </div>
                <div className="font-semibold text-slate-900 mb-2">
                  {freight.awardedTo}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                  <span className="text-slate-400 font-mono">#</span> Carrier
                  ID:{" "}
                  <span className="font-medium text-slate-900">CAR-15892</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                  <span className="text-amber-400 leading-none">★</span> Rating:{" "}
                  <span className="font-medium text-slate-900">4.8 / 5.0</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 opacity-70">
                  Primary Contact
                </div>
                <div className="font-semibold text-slate-900 mb-2">
                  Operations Manager
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-1.5">
                  <Phone className="size-3.5 text-slate-400" />{" "}
                  <span className="font-medium text-slate-900">
                    (555) 789-0123
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="size-3.5 text-slate-400" />{" "}
                  <span className="font-medium text-slate-900">
                    ops@fastfreightlogistics.com
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 opacity-70">
                  Fleet Details
                </div>
                <div className="text-sm text-slate-600 space-y-1.5">
                  <div>
                    Vehicle Type:{" "}
                    <span className="font-medium text-slate-900">
                      Flatbed Truck
                    </span>
                  </div>
                  <div>
                    License Plate:{" "}
                    <span className="font-medium text-slate-900">
                      CA-7892-FRT
                    </span>
                  </div>
                  <div>
                    Insurance:{" "}
                    <span className="font-medium text-emerald-600 inline-flex items-center gap-1">
                      <CheckCircle2 className="size-3" /> Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bidding Summary */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-slate-800 font-bold mb-5">
              <FileText className="text-slate-500 size-5" />
              Bidding Summary
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="border border-slate-100 rounded-lg p-4 text-center">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Total Bids
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {freight.bidsReceived}
                </div>
              </div>
              <div className="border border-slate-100 rounded-lg p-4 text-center">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Lowest Bid
                </div>
                <div className="text-2xl font-bold text-emerald-600">
                  {freight.awardedAmount}
                </div>
              </div>
              <div className="border border-slate-100 rounded-lg p-4 text-center">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Highest Bid
                </div>
                <div className="text-2xl font-bold text-red-600">$4,132.5</div>
              </div>
              <div className="border border-slate-100 rounded-lg p-4 text-center">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Average Bid
                </div>
                <div className="text-2xl font-bold text-blue-600">$3,506</div>
              </div>
            </div>
            <div className="bg-yellow-50/50 border border-yellow-200 rounded-lg p-3 flex gap-3 text-sm">
              <AlertCircle className="size-5 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-yellow-800">Cost Savings</div>
                <div className="text-yellow-700 mt-0.5">
                  By selecting the awarded carrier, this freight request saved
                  approximately <span className="font-bold"></span> compared to
                  the average bid.
                </div>
              </div>
            </div>
          </div>

          {/* Request Timeline */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-slate-800 font-bold mb-5">
              <Clock className="size-4 text-slate-500" />
              Request Timeline
            </div>

            <div className="space-y-5 px-2">
              <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-[-20px] before:w-[2px] before:bg-blue-200 last:before:hidden">
                <div className="absolute left-[-4px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                <div className="font-semibold text-slate-900 text-sm">
                  Freight Request Created
                </div>
                <div className="text-sm text-slate-500">2024-03-13</div>
              </div>
              <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-[-20px] before:w-[2px] before:bg-purple-200 last:before:hidden">
                <div className="absolute left-[-4px] top-1.5 h-2.5 w-2.5 rounded-full bg-purple-500 ring-4 ring-purple-50"></div>
                <div className="font-semibold text-slate-900 text-sm">
                  Bidding Period Open
                </div>
                <div className="text-sm text-slate-500">
                  7 carriers submitted bids over 5 days
                </div>
              </div>
              <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-[-20px] before:w-[2px] before:bg-emerald-200 last:before:hidden">
                <div className="absolute left-[-4px] top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                <div className="font-semibold text-slate-900 text-sm">
                  Bid Awarded to {freight.awardedTo}
                </div>
                <div className="text-sm text-slate-500">
                  {freight.awardedDate}
                </div>
              </div>
              <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-[-20px] before:w-[2px] before:bg-orange-200 last:before:hidden">
                <div className="absolute left-[-4px] top-1.5 h-2.5 w-2.5 rounded-full bg-orange-500 ring-4 ring-orange-50"></div>
                <div className="font-semibold text-slate-900 text-sm">
                  Scheduled Delivery
                </div>
                <div className="text-sm text-slate-500">
                  {freight.deliveryDate}
                </div>
              </div>
            </div>
          </div>

          {/* Request Notes */}
          <div className="bg-[#FFFFF0] border border-[#F3E5AB] rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-slate-800 font-bold mb-3">
              <MessageSquare className="size-4 text-amber-600" />
              Request Notes & Requirements
            </div>
            <ul className="text-sm text-slate-700 space-y-1.5 list-disc list-inside ml-1">
              <li>Carrier must provide proof of insurance before pickup</li>
              <li>
                Material must be covered during transport to prevent weather
                damage
              </li>
              <li>Contact site manager 24 hours before delivery</li>
              <li>Unloading assistance will be provided by site crew</li>
              <li>
                Carrier is responsible for securing load according to DOT
                regulations
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="border-t border-slate-200 px-6 py-4 bg-white grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          <Button
            variant="secondary"
            onClick={onClose}
            className="w-full  bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            Close
          </Button>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="w-full  border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            >
              <Phone className="size-4 mr-2" />
              Contact Carrier
            </Button>
            <Button
              variant="outline"
              className="w-full  border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
            >
              <Mail className="size-4 mr-2" />
              Email Operations
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
