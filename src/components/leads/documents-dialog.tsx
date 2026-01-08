import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText } from "lucide-react";

type LeadSmall = { id: string; name: string; progress?: number };

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  lead?: LeadSmall;
};

export default function DocumentsDialog({ open, onOpenChange, lead }: Props) {
  const docs = [
    {
      id: "doc1",
      name: "Architectural Plans.pdf",
      size: "15.2 MB",
      status: "Pending Review",
    },
    {
      id: "doc2",
      name: "Structural Drawings.dwg",
      size: "15.2 MB",
      status: "Approved",
    },
    {
      id: "doc3",
      name: "Specifications.docx",
      size: "15.2 MB",
      status: "Revision Required",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-lg">
                Documents - {lead?.name ?? "Lead"}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {docs.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div>
                <div className="text-sm font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-600" />
                  {d.name}
                </div>
                <div className="text-xs text-gray-500">
                  {d.size} • {d.status}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="p-1">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline" className="bg-white">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
