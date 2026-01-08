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

export default function QuoteSummaryDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[95vh] overflow-y-scroll gap-0">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold ">
            ✅ Quote Summary Quote Summary
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Quote Header */}
          <div>
            <h3 className="text-lg font-semibold ">
              Your Custom Steel Building Quote
            </h3>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-sm text-gray-700">
              <li>Building Type: Workshop</li>
              <li>Dimensions: 30' × 40' × 12'</li>
              <li>Roof Style: Gable Roof</li>
              <li>
                Location: Dallas, TX (designed for 120 mph wind load, 20 psf
                snow load)
              </li>
              <li>Estimated Delivery: 4-6 weeks</li>
            </ul>
          </div>

          {/* Estimated Price Range */}
          <div className="">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-base font-semibold text-gray-900">
                💰 Estimated Price Range
              </h4>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              $24,500 – $28,000
            </p>
            <p className="text-sm text-gray-600 mt-2">
              (This is an instant estimate based on your inputs. Final pricing
              will be confirmed after engineering review and foundation
              requirements.)
            </p>
          </div>

          {/* What's Included */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-base font-semibold text-gray-900">
                📦 What's Included
              </h4>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
              <li>Pre-engineered steel frame</li>
              <li>Roof & wall panels (26-gauge, 30-year warranty)</li>
              <li>Trim & fasteners</li>
              <li>Detailed installation drawings</li>
              <li>Engineer-stamped plans (where required)</li>
            </ul>
          </div>

          {/* Optional Add-Ons */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-base font-semibold text-gray-900">
                🛠 Optional Add-Ons
              </h4>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
              <li>Roll-up doors</li>
              <li>Walk-in doors & windows</li>
              <li>Skylights</li>
              <li>Insulation package</li>
              <li>Color customization</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="mt-6 flex items-center sm:justify-center gap-4">
          <DialogClose asChild>
            <Button variant="outline" className="rounded w-44 border-primary">
              Back
            </Button>
          </DialogClose>
          <Button className="rounded">Downloadable PDF Quote</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
