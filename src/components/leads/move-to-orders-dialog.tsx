import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MoveToOrdersDialogProps {
  trigger: React.ReactNode;
}

export default function MoveToOrdersDialog({
  trigger,
}: MoveToOrdersDialogProps) {
  const [open, setOpen] = useState(false);
  const [poNumber, setPoNumber] = useState("2145654332");

  const handleMove = () => {
    // TODO: wire this to real move-to-orders logic
    console.log("Move to orders, PO:", poNumber);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-mmd p-0 gap-0">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-lg">Move to orders</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <div className="space-y-3">
            <Label className="text-sm">Enter PO number</Label>
            <Input
              value={poNumber}
              onChange={(e) =>
                setPoNumber((e.target as HTMLInputElement).value)
              }
              className="text-lg h-12 rounded-lg"
              placeholder="Enter PO number"
            />
          </div>
        </div>

        <DialogFooter className="p-6 border-t flex justify-end gap-4 bg-white">
          <DialogClose asChild>
            <Button
              size="lg"
              className="bg-gray-100 text-gray-700 mr-2 rounded-lg px-8 py-3"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            size="lg"
            onClick={handleMove}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-3"
          >
            Move
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
