import { SalesRevenueChart } from "@/components/invoices/sales-revenue-chart";
import { SalesDistributionChart } from "@/components/invoices/sales-distribution-chart";
import RecentSalesActivity from "@/components/dashboard/recent-sales-activity";
import TopSalesPerformers from "@/components/dashboard/top-sales-performers";

export default function SalesGrowth() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Sales Growth</h1>

      {/* Top Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesRevenueChart />
        <SalesDistributionChart />
      </div>

      {/* Bottom Row: Activity and Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentSalesActivity />
        <TopSalesPerformers />
      </div>
    </div>
  );
}
