import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Calendar,
  Package,
  MapPin,
  FileText,
  Target,
  User,
} from "lucide-react";

interface DeliveryDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  delivery: any | null;
}

export function DeliveryDetailsDialog({
  open,
  onOpenChange,
  delivery,
}: DeliveryDetailsDialogProps) {
  if (!delivery) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] p-0 overflow-y-auto ">
        <DialogHeader className="px-6 py-4 bg-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-slate-800">
                Delivery Details - {delivery.deliveryNumber}
              </DialogTitle>
              <p className="text-[15px] text-slate-500 mt-1">
                Complete information about this delivery
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm font-medium text-slate-700">Status:</span>
            <Badge
              className={`rounded-full px-3 py-0.5 text-xs font-medium border-0 ${
                delivery.status === "confirmed"
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : delivery.status === "delivered"
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              variant="outline"
            >
              {delivery.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="">
          <div className="p-6 space-y-4">
            {/* Customer & Project */}
            <div className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-4">
                Customer & Project
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">Customer</div>
                    <div className="font-medium text-slate-900">
                      {delivery.customer}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">Project</div>
                    <div className="font-medium text-slate-900">
                      {delivery.project}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-4">
                Schedule
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">Delivery Date</div>
                    <div className="font-medium text-slate-900">
                      {delivery.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">Time Window</div>
                    <div className="font-medium text-slate-900">
                      {delivery.time}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Material & Logistics */}
            <div className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-4">
                Material & Logistics
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">Material</div>
                    <div className="font-medium text-slate-900">
                      {delivery.material}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">Vendor</div>
                    <div className="font-medium text-slate-900">
                      Metro Steel Supply
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">
                      Delivery Company
                    </div>
                    <div className="font-medium text-slate-900">
                      Express Logistics
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">
                      Freight Carrier
                    </div>
                    <div className="font-medium text-slate-900">
                      Titan Freight
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Location & Contact */}
            <div className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-4">
                Delivery Location & Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">Site Address</div>
                    <div className="font-medium text-slate-900">
                      123 Main St, Downtown, CA 90001
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-500">
                      Receiving Contact
                    </div>
                    <div className="font-medium text-slate-900">
                      John Smith (555-0123)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Site Instructions */}
            <div className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-4">
                Site Instructions
              </h3>
              <p className="text-slate-700">
                Use east entrance. Crane available on site.
              </p>
            </div>

            {/* Required Equipment */}
            <div className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-4">
                Required Equipment
              </h3>
              <div className="flex gap-2">
                <Badge
                  variant="secondary"
                  className="font-normal bg-slate-100 text-slate-800"
                >
                  Crane
                </Badge>
                <Badge
                  variant="secondary"
                  className="font-normal bg-slate-100 text-slate-800"
                >
                  Forklift
                </Badge>
              </div>
            </div>

            {/* Cost Information */}
            <div className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-4">
                Cost Information
              </h3>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-sm text-slate-500">Delivery Cost</div>
                  <div className="font-medium text-slate-900">$2,500</div>
                </div>
              </div>
            </div>

            {/* Related Information */}
            <div className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-sm">
              <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-4">
                Related Information
              </h3>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-sm text-slate-500">
                    Freight Request ID
                  </div>
                  <div className="font-medium text-slate-900">FR-001</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="p-4 bg-white border-t border-slate-100 flex justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className=""
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
