import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function QuotationDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[95vh] overflow-y-scroll gap-0">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold ">
            Quotation
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-base font-semibold">Quotation Details</h3>
            <p className="text-sm text-gray-700 mt-2">
              This quotation reflects the current estimated scope and pricing.
              It can be downloaded as a PDF or shared with the customer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <h4 className="text-sm font-medium text-gray-900">
                AI Qualification
              </h4>
              <div className="text-sm text-gray-700 mt-2">
                Qualified – Budget OK, Timeline Realistic
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <h4 className="text-sm font-medium text-gray-900">
                Quotation Status
              </h4>
              <div className="text-sm text-gray-700 mt-2">
                Created by AI - sent
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <h4 className="text-sm font-medium text-gray-900">
              Included Materials
            </h4>
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "Frame",
                "Roof",
                "Panels",
                "Trim",
                "Fasteners",
                "Drawings",
                "Engineer Plans",
              ].map((t) => (
                <div
                  key={t}
                  className="px-3 py-1 rounded-full bg-green-50 text-green-800 text-xs"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <h4 className="text-sm font-medium text-gray-900">Activity Log</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>Lead created — 2024-01-15</li>
              <li>AI qualification completed — 2024-01-15</li>
              <li>Quotation sent — 2024-01-16</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="mt-6 flex items-center sm:justify-center gap-4">
          <DialogClose asChild>
            <Button variant="outline" className="rounded w-44">
              Close
            </Button>
          </DialogClose>
          <Button className="rounded">Download PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
