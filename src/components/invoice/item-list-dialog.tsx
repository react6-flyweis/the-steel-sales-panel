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
import { Plus } from "lucide-react";
import AddItemDialog from "./add-item-dialog";

type Props = {
  children?: React.ReactNode;
  initialItems?: string[];
  onChange: (items: string[]) => void;
};

export default function ItemListDialog({
  children,
  initialItems = [],
  onChange,
}: Props) {
  const defaultList = [
    "Roll-up doors & windows",
    "Trim & fasteners",
    "Doors",
    "Frames",
    "Hardware",
  ];

  const merged = Array.from(new Set([...defaultList, ...initialItems]));

  const [items, setItems] = React.useState(
    merged.map((name) => ({ name, checked: initialItems.includes(name) }))
  );

  React.useEffect(() => {
    // Update items if initialItems changes
    setItems(() => {
      const names = Array.from(new Set([...merged]));
      return names.map((n) => ({ name: n, checked: initialItems.includes(n) }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialItems.join("|")]);

  const toggle = (index: number) => {
    setItems((s) =>
      s.map((it, i) => (i === index ? { ...it, checked: !it.checked } : it))
    );
  };

  const handleDone = () => {
    const selected = items.filter((i) => i.checked).map((i) => i.name);
    onChange(selected);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md p-0">
        <div className="p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="text-lg font-semibold">
              Item list
            </DialogTitle>
            <DialogDescription className="sr-only">
              Select from the list or add a new item
            </DialogDescription>
          </DialogHeader>

          <div className="p-6">
            <div className="space-y-3">
              {items.map((it, i) => (
                <label
                  key={i}
                  className="flex items-center gap-3 cursor-pointer text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={!!it.checked}
                    onChange={() => toggle(i)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{it.name}</span>
                </label>
              ))}

              <AddItemDialog
                onAdd={(name) =>
                  setItems((s) => [
                    { name, checked: true },
                    ...s.filter((i) => i.name !== name),
                  ])
                }
              >
                <button
                  type="button"
                  className="flex items-center gap-3 text-blue-600 hover:underline mt-3"
                >
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </span>
                  <span className="text-sm">Add Item</span>
                </button>
              </AddItemDialog>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t flex items-center justify-between">
          <DialogClose asChild>
            <Button
              size="lg"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg w-32"
            >
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button size="lg" onClick={handleDone} className="rounded-lg w-32">
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
