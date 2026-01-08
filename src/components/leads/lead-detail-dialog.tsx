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
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, User } from "lucide-react";
import ChatDialog from "./chat-dialog";
import QuoteSummaryDialog from "./quote-summary-dialog";
import TrackOrderLifecycleDialog from "./track-order-lifecycle-dialog";
import QuotationDialog from "./quotation-dialog";
import DocumentsDialog from "./documents-dialog";
import DetailedLeadDialog from "./detailed-lead-dialog";

type Lead = {
  id: string;
  name: string;
  workshop?: string;
  category?: string;
  assignedTo?: string | null;
  assignedToName?: string;
  assignmentStatus?: string;
  progress?: number;
  progressStep?: string;
  status?: string;
  statusColor?: string;
  quoteValue?: string;
  chatCount?: number;
};

type Props = {
  lead: Lead;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function LeadDetailDialog({
  lead,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [isQuotationOpen, setIsQuotationOpen] = useState(false);
  const [isTrackDialogOpen, setIsTrackDialogOpen] = useState(false);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);
  const [isDetailedLeadOpen, setIsDetailedLeadOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getStatusBadgeColor = (color: string | undefined) => {
    const colors: Record<string, string> = {
      purple: "bg-purple-100 text-purple-700",
      orange: "bg-orange-100 text-orange-700",
      green: "bg-green-100 text-green-700",
      blue: "bg-blue-100 text-blue-700",
    };
    return colors[color || ""] || "bg-gray-100 text-gray-700";
  };

  const progressSteps = [
    "Initial Contact",
    "Requirements Gathered",
    "Proposal Sent",
    "Negotiation",
    "Deal Closed",
    "Payment Done",
    "Delivered",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
            <CheckCircle className="h-4 w-4 text-gray-600" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-scroll">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl">
                Leads Details - {lead.name}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-gray-500">
                {lead.id}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="bg-white"
              onClick={() => setIsQuoteDialogOpen(true)}
            >
              RFQ
            </Button>
            <Button
              variant="outline"
              className="bg-white"
              onClick={() => setIsDetailedLeadOpen(true)}
            >
              See Quotation
            </Button>
            <Button variant="outline" className="bg-white">
              Assign a person
            </Button>
            <Button
              variant="outline"
              className="bg-white"
              onClick={() => setIsChatOpen(true)}
            >
              Open Chat
            </Button>
            <Button
              variant="outline"
              className="bg-white"
              onClick={() => setIsTrackDialogOpen(true)}
            >
              Track Order Lifecycle
            </Button>
            <Button
              variant="outline"
              className="bg-white"
              onClick={() => setIsDocumentsOpen(true)}
            >
              Documents
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Contact Information
              </h3>
              <div className="mt-3 text-sm text-gray-700 space-y-3">
                <div>
                  <div className="text-xs text-gray-500">Full Name</div>
                  <div className="text-sm text-gray-900">{lead.name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="text-sm text-gray-900">
                    john.doe@gmail.com
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="text-sm text-gray-900">(555) 123-4567</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="text-sm text-gray-900">{lead.category}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Project Details
              </h3>
              <div className="mt-3 text-sm text-gray-700 space-y-3">
                <div>
                  <div className="text-xs text-gray-500">Building Type</div>
                  <div className="text-sm text-gray-900">{lead.workshop}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Quote Value</div>
                  <div className="text-sm text-gray-900">{lead.quoteValue}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Status</div>
                  <div className="mt-1">
                    <Badge
                      variant="secondary"
                      className={getStatusBadgeColor(lead.statusColor || "")}
                    >
                      {lead.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Created On</div>
                  <div className="text-sm text-gray-900">2024-10-10</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-50 flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-50">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium">
                  Assigned to: {lead.assignedToName ?? "-"}
                </div>
                <div className="text-xs text-gray-500">
                  {lead.assignmentStatus ?? "No one assigned"}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-50">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium">
                  Signed contact/Agreement
                </div>
                <div className="text-xs text-gray-500">
                  Signed on: 12 April 2025
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Progress Steps
            </h4>
            <div className="space-y-3">
              {progressSteps.map((step, i) => {
                const idx = i + 1;
                const completed = idx <= (lead.progress ?? 0);
                const isCurrent = idx === (lead.progress ?? 0) + 1;
                return (
                  <div key={step} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          completed
                            ? "bg-green-600 text-white"
                            : isCurrent
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-sm">{idx}</span>
                        )}
                      </div>
                      <div>
                        <div
                          className={`text-sm ${
                            completed
                              ? "text-green-800"
                              : isCurrent
                              ? "text-blue-700 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          {step}
                        </div>
                        {isCurrent && (
                          <div className="text-xs text-gray-500">
                            Current Step
                          </div>
                        )}
                      </div>
                    </div>
                    {completed && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Progress: Step {(lead.progress ?? 0) + 1} of{" "}
              {progressSteps.length}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Recent Activity
            </h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="h-2 w-2 mt-1 rounded-full bg-blue-500" /> Last
                activity: 2024-10-18
              </li>
              <li className="flex items-start gap-2">
                <span className="h-2 w-2 mt-1 rounded-full bg-blue-300" /> Lead
                created: 2024-10-10
              </li>
              <li className="flex items-start gap-2">
                <span className="h-2 w-2 mt-1 rounded-full bg-red-500" /> 2
                unread messages
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Photos</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden h-32 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
                >
                  <div className="text-gray-500 text-sm">Photo {index}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline" className="bg-white">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>

      <QuoteSummaryDialog
        open={isQuoteDialogOpen}
        onOpenChange={setIsQuoteDialogOpen}
      />

      <ChatDialog
        open={isChatOpen}
        onOpenChange={setIsChatOpen}
        lead={{ id: lead.id, name: lead.name, chatCount: lead.chatCount }}
      />

      <QuotationDialog
        open={isQuotationOpen}
        onOpenChange={setIsQuotationOpen}
      />

      <TrackOrderLifecycleDialog
        open={isTrackDialogOpen}
        onOpenChange={setIsTrackDialogOpen}
        lead={{ id: lead.id, name: lead.name, progress: lead.progress }}
      />

      <DocumentsDialog
        open={isDocumentsOpen}
        onOpenChange={setIsDocumentsOpen}
        lead={{ id: lead.id, name: lead.name }}
      />

      <DetailedLeadDialog
        open={isDetailedLeadOpen}
        onOpenChange={setIsDetailedLeadOpen}
        lead={lead}
      />
    </Dialog>
  );
}
