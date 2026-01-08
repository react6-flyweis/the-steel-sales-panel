import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function FollowUpDialog({ open, onOpenChange }: Props) {
  const [type, setType] = useState("chat");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create follow up", { type });
    // TODO: wire actual creation logic
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-md">
        <DialogHeader className="border-b p-5">
          <DialogTitle className="text-lg">Follow Up</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <Label>Select Follow Up Type</Label>
              <Select value={type} onValueChange={(v) => setType(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chat">Chat</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="p-4 border-t">
            <Button
              type="button"
              size="lg"
              className="bg-gray-100 text-gray-700 mr-4 w-40"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" size="lg" className="w-40 bg-blue-600">
              Follow up
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
