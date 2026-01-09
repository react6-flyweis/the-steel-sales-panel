import StatCard from "@/components/ui/stat-card";
import SalesFunnel from "@/components/dashboard/sales-funnel";
import AiSupportSummary from "@/components/dashboard/ai-support-summary";
import FilterTabs from "@/components/FilterTabs";
import PerformanceTrends from "@/components/dashboard/performance-trends";
import TodaysTask from "@/components/dashboard/todays-task";

import LeadsIcon from "@/assets/icons/dashboard/leads.svg";
import ConfirmedIcon from "@/assets/icons/dashboard/confirmed.svg";
import ValueIcon from "@/assets/icons/dashboard/value.svg";
import RevenueIcon from "@/assets/icons/dashboard/revenue.svg";

export default function Dashboard() {
  return (
    <div className="">
      {/* Tabs */}
      <FilterTabs />

      <div className="lg:pr-5 lg:pt-5 p-5 lg:p-0 space-y-5">
        {/* Header */}
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Complete overview of your leads, sales pipeline, and revenue
            performance
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Leads"
            value={"24"}
            icon={<img src={LeadsIcon} alt="leads" className="size-7" />}
            color="bg-blue-500"
          />

          <StatCard
            title="Leads Closed"
            value={"8"}
            icon={
              <img src={ConfirmedIcon} alt="confirmed" className="size-7" />
            }
            color="bg-green-500"
          />

          <StatCard
            title="Follow-ups Pending"
            value={"12"}
            icon={<img src={ValueIcon} alt="value" className="size-7" />}
            color="bg-yellow-500"
          />

          <StatCard
            title="AI Escalations"
            value={"5"}
            icon={<img src={RevenueIcon} alt="revenue" className="size-7" />}
            color="bg-red-500"
          />
        </div>

        {/* Chart Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesFunnel />
          </div>
          <AiSupportSummary />
        </div>

        {/* chart row 2 2:1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceTrends />
          </div>
          <TodaysTask />
        </div>
      </div>
    </div>
  );
}
