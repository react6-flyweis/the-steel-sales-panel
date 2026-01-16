import StatCard from "@/components/ui/stat-card";
import SalesFunnel from "@/components/dashboard/sales-funnel";
import AiSupportSummary from "@/components/dashboard/ai-support-summary";
import FilterTabs, { type Period } from "@/components/FilterTabs";
import PerformanceTrends from "@/components/dashboard/performance-trends";
import TodaysTask from "@/components/dashboard/todays-task";

import LeadsIcon from "@/assets/icons/dashboard/leads.svg";
import ConfirmedIcon from "@/assets/icons/dashboard/confirmed.svg";
import ValueIcon from "@/assets/icons/dashboard/value.svg";
import RevenueIcon from "@/assets/icons/dashboard/revenue.svg";
import { useEffect, useState } from "react";
import { getDashboardMetrics, type DashboardMetrics } from "@/lib/metrics";

export default function Dashboard() {
  const [period, setPeriod] = useState<Period>("today");
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getDashboardMetrics(period)
      .then((m) => {
        if (mounted) setMetrics(m);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [period]);

  return (
    <div className="">
      {/* Tabs */}
      <FilterTabs onPeriodChange={setPeriod} initialPeriod={period} />

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
            value={loading ? "..." : metrics ? metrics.totalLeads : "-"}
            icon={<img src={LeadsIcon} alt="leads" className="size-7" />}
            color="bg-blue-500"
            navigateTo="/leads"
          />

          <StatCard
            title="Leads Closed"
            value={loading ? "..." : metrics ? metrics.leadsClosed : "-"}
            icon={
              <img src={ConfirmedIcon} alt="confirmed" className="size-7" />
            }
            color="bg-green-500"
            navigateTo="/leads"
          />

          <StatCard
            title="Follow-ups Pending"
            value={loading ? "..." : metrics ? metrics.followUpsPending : "-"}
            icon={<img src={ValueIcon} alt="value" className="size-7" />}
            color="bg-yellow-500"
            navigateTo="/leads/follow-up"
          />

          <StatCard
            title="AI Escalations"
            value={loading ? "..." : metrics ? metrics.aiEscalations : "-"}
            icon={<img src={RevenueIcon} alt="revenue" className="size-7" />}
            color="bg-red-500"
            navigateTo="/leads/escalated-queries"
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
