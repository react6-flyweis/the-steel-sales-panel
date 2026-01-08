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

type Client = { id: string; name: string; avatar?: string };

type Props = {
  children?: React.ReactNode;
  clients?: Client[];
  initialSelected?: string | null;
  onDone: (client: Client | null) => void;
};

export default function AddClientDialog({
  children,
  clients,
  initialSelected = null,
  onDone,
}: Props) {
  const defaultClients: Client[] = clients ?? [
    {
      id: "1",
      name: "Randy Dorwart",
      avatar: "https://i.pravatar.cc/40?img=12",
    },
    {
      id: "2",
      name: "Abram Vaccaro",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    {
      id: "3",
      name: "Kaiya Ekstrom Bothman",
      avatar: "https://i.pravatar.cc/40?img=14",
    },
    {
      id: "4",
      name: "Hanne Workman",
      avatar: "https://i.pravatar.cc/40?img=8",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<Client[]>(defaultClients);
  const [selectedId, setSelectedId] = React.useState<string | null>(
    initialSelected
  );

  React.useEffect(() => {
    setItems(clients ?? defaultClients);
  }, [clients]);

  React.useEffect(() => {
    setSelectedId(initialSelected ?? null);
  }, [initialSelected]);

  const handleDone = () => {
    const client = items.find((c) => c.id === selectedId) ?? null;
    onDone(client);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md p-0">
        <div className="p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="text-lg font-semibold">
              Add Client
            </DialogTitle>
            <DialogDescription className="sr-only">
              Select a client
            </DialogDescription>
          </DialogHeader>

          <div className="p-6">
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {items.map((c) => (
                <label
                  key={c.id}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="radio"
                    name="client"
                    checked={selectedId === c.id}
                    onChange={() => setSelectedId(c.id)}
                    className="w-4 h-4"
                  />

                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="text-sm text-gray-700">{c.name}</div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t flex items-center justify-between">
          <DialogClose asChild>
            <Button
              size="lg"
              className="rounded-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            size="lg"
            onClick={handleDone}
            className="rounded-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
