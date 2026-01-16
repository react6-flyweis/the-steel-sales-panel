import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
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
import { useNavigate } from "react-router";

type Client = { id: string; name: string; avatar?: string };

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** When true shows a client/lead selector above the follow-up type */
  children?: React.ReactNode;
  showClientSelector?: boolean;
  /** Optional initial selected client id */
  initialClientId?: string | null;
  /** Callback invoked when the follow up is created */
  onFollowUp?: (opts: { clientId: string | null; type: string }) => void;
};

const clients: Client[] = [
  { id: "1", name: "Sarah Johnson" },
  { id: "2", name: "Michael Chen" },
  { id: "3", name: "Emily Davis" },
];

export default function FollowUpDialog({
  open,
  onOpenChange,
  children,
  showClientSelector = false,
  initialClientId = null,
  onFollowUp,
}: Props) {
  const [type, setType] = useState("chat");
  const [clientId, setClientId] = useState<string | null>(
    initialClientId ?? (clients.length ? clients[0].id : null)
  );
  const navigate = useNavigate();

  useEffect(() => {
    const next = initialClientId ?? (clients.length ? clients[0].id : null);
    if (next !== clientId) {
      setClientId(next);
    }
  }, [initialClientId, clientId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { clientId: clientId ?? null, type };
    console.log("Create follow up", payload);
    // navigate(`/leads/${clientId}/${type}`);
    navigate("/leads/1/chats");
    onFollowUp?.(payload);
    // TODO: wire actual creation logic
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="p-0 max-w-md">
        <DialogHeader className="border-b p-5">
          <DialogTitle className="text-lg">Follow Up</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {showClientSelector && (
              <div className="space-y-1">
                <Label>Select Lead</Label>
                <Select
                  value={clientId ?? undefined}
                  onValueChange={(v) => setClientId(v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(clients.length
                      ? clients
                      : [
                          { id: "1", name: "Sarah Johnson" },
                          { id: "2", name: "Michael Chen" },
                          { id: "3", name: "Emily Davis" },
                        ]
                    ).map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

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
              onClick={() => onOpenChange?.(false)}
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
