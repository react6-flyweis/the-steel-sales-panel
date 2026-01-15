import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SuccessDialog from "@/components/success-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  trigger?: React.ReactNode;
};

export default function AssignSalesDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [salesPerson, setSalesPerson] = useState("James Lee");
  const [priority, setPriority] = useState("Low");
  const [panel, setPanel] = useState("Plant");
  const [notes, setNotes] = useState("James Lee");

  const onAssign = () => {
    // TODO: wire API call to assign lead
    console.log("Assigning", { salesPerson, priority, panel, notes });
    setOpen(false);
    setShowSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="bg-blue-600 hover:bg-blue-700">Assign</Button>
        )}
      </DialogTrigger>

      <DialogContent className=" p-0 gap-0">
        <DialogHeader className="border-b p-5">
          <DialogTitle className="text-lg">Assign Sales person</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div>
            <Label>Assign Sales</Label>
            <Select value={salesPerson} onValueChange={setSalesPerson}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="James Lee">James Lee</SelectItem>
                <SelectItem value="Sarah Lee">Sarah Lee</SelectItem>
                <SelectItem value="John Doe">John Doe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Select Panel</Label>
              <Select value={panel} onValueChange={setPanel}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Plant">Plant</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Plant 2">Plant 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button size="lg" className="bg-gray-300 text-gray-700 mr-2 w-40">
              Cancel
            </Button>
          </DialogClose>

          <Button
            size="lg"
            onClick={onAssign}
            className="w-40 bg-blue-600 hover:bg-blue-700"
          >
            Assign Lead
          </Button>
        </DialogFooter>
      </DialogContent>
      <SuccessDialog
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Lead Assigned Successfully!"
      />
    </Dialog>
  );
}
