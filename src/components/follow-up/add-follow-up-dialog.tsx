import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  //   DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SuccessDialog from "@/components/success-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ClientSelector from "@/components/customers/client-selector";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddFollowUpDialog({ open, onOpenChange }: Props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customer: "",
    type: "call",
    date: "",
    time: "",
    notes: "",
    priority: "medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding follow-up:", formData);
    // TODO: Wire API call
    onOpenChange(false);
    // Reset form
    setFormData({
      customer: "",
      type: "call",
      date: "",
      time: "",
      notes: "",
      priority: "medium",
    });
    setShowSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-md">
        <DialogHeader className="border-b p-5">
          <DialogTitle className="text-lg">Add Follow-up</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <div className="space-y-1">
              <Label>Client Name *</Label>
              <ClientSelector
                value={formData.customer}
                onValueChange={(v) => setFormData({ ...formData, customer: v })}
              />
            </div>

            <div className="space-y-1">
              <Label>Assigned Employee *</Label>
              <Select
                value={formData.type /* reuse type temporarily for selection */}
                onValueChange={(v) => setFormData({ ...formData, type: v })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="James Lee">James Lee</SelectItem>
                  <SelectItem value="Sarah Lee">Sarah Lee</SelectItem>
                  <SelectItem value="John Doe">John Doe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Follow-up Date *</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-1">
              <Label>Follow-up Time *</Label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-1">
              <Label>Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(v) => setFormData({ ...formData, priority: v })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Notes</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={4}
                maxLength={500}
                placeholder="Add any additional notes or context..."
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.notes.length}/500 characters
              </div>
            </div>
          </div>

          <DialogFooter className="p-4 flex-row">
            <Button
              type="button"
              size="lg"
              className="bg-gray-300 text-gray-700 mr-2 w-40"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              size="lg"
              className="w-40 bg-blue-600 hover:bg-blue-700"
            >
              Add Follow up
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <SuccessDialog
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Follow-up Added Successfully!"
      />
    </Dialog>
  );
}
