import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import BasicDetails from "@/components/leads/basic-details";
import RFQTab from "@/components/leads/rfq-tab";
import QuotationCard from "@/components/leads/quotation-card";
import ChatCard from "@/components/leads/chat-card";
import TimelineCard from "@/components/leads/timeline-card";
import FollowUpsCard from "@/components/leads/follow-ups-card";
import PaymentsCard from "@/components/leads/payments-card";
import { Button } from "@/components/ui/button";

const TABS = [
  "Basic info",
  "RFQ",
  "Quotation",
  "Open Chat",
  "Timeline",
  "Follow Ups",
  "Payments",
];

export default function LeadDetails() {
  const navigate = useNavigate();
  const [active, setActive] = useState<string>(TABS[0]);

  const lead = {
    id: "LD-2025-001",
    name: "John Doe",
    workshop: "Residential Building",
    category: "Lahore",
    assignedToName: "Aamir",
    assignmentStatus: "Assigned",
    progress: 3,
    status: "Negotiation",
    statusColor: "orange",
    quoteValue: "PKR 120,000",
    chatCount: 2,
  } as const;

  return (
    <div className="p-5">
      <div className=" rounded-b-lg">
        <div className="flex items-start gap-4">
          <Button onClick={() => navigate(-1)} aria-label="Back">
            <ArrowLeft />
            <span>Back</span>
          </Button>

          <div>
            <h1 className="text-2xl font-semibold">Lead Details</h1>
            <p className="text-sm text-gray-600">
              Stay updated with your latest activities and alerts
            </p>
          </div>
        </div>

        <div className="mt-6">
          <nav>
            <ul className="flex items-end overflow-x-auto gap-8 text-sm text-gray-600">
              {TABS.map((tab) => {
                const isActive = tab === active;
                return (
                  <li
                    key={tab}
                    onClick={() => {
                      setActive(tab);
                    }}
                    className={`cursor-pointer pb-3 ${
                      isActive ? "text-blue-600 font-medium" : ""
                    }`}
                  >
                    <div className="relative">
                      {tab}
                      {isActive && (
                        <span className="absolute left-0 -bottom-1 h-1 w-full bg-blue-500 rounded" />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* active tab */}
      <div className="mt-6">
        {active === "Basic info" && <BasicDetails lead={lead} />}
        {active === "RFQ" && <RFQTab />}
        {active === "Quotation" && <QuotationCard />}
        {active === "Open Chat" && <ChatCard lead={lead} />}
        {active === "Timeline" && <TimelineCard lead={lead} />}
        {active === "Follow Ups" && <FollowUpsCard />}
        {active === "Payments" && <PaymentsCard />}
        {/* TODO: render other tabs here when implemented */}
      </div>
    </div>
  );
}
