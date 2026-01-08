import * as React from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  children?: React.ReactNode;
  initialValue?: string;
  onAdd: (name: string) => void;
};

export default function AddItemDialog({
  children,
  initialValue = "",
  onAdd,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => setValue(initialValue), [initialValue]);

  const handleAdd = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md p-0">
        <div className="p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="text-lg font-semibold">
              Add Item
            </DialogTitle>
            <DialogDescription className="sr-only">
              Add a new item name
            </DialogDescription>
          </DialogHeader>

          <div className="p-6">
            <div className="space-y-2">
              <Label>Item Name</Label>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Trim & fasteners"
                className="mt-2"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t flex items-center justify-end">
          <DialogClose asChild>
            <Button
              size="lg"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg w-32"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            size="lg"
            onClick={handleAdd}
            className="rounded-lg w-32 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
