import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import QueryHandlingPie from "@/components/ai-marketing/query-handling-pie";
import { AIStatsGrid } from "@/components/ai-marketing/ai-stats-grid";
import { DailyQueryVolumeChart } from "@/components/ai-marketing/daily-query-volume-chart";
import QuotationDailyChart from "@/components/ai-marketing/quotation-daily-chart";
import QuotationWeeklyChart from "@/components/ai-marketing/quotation-weekly-chart";
import QuotationBreakdownPie from "@/components/ai-marketing/quotation-breakdown-pie";
import CSATTrendChart from "@/components/ai-marketing/csat-trend-chart";
import EscalationsByCategory from "@/components/ai-marketing/escalations-by-category";
import AIQueryLog from "@/components/ai-marketing/ai-query-log";
import AILearningHistory from "@/components/ai-marketing/ai-learning-history";

export default function AIMarketing() {
  return (
    <div className="pr-5 pt-5 p-5 lg:p-0 space-y-6  min-h-screen">
      <div className="gap-5 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            AI Support Monitoring
          </h1>
          <p className="text-slate-600 mt-1 text-sm">
            Analyze AI query handling, performance metrics, and training data.
          </p>
        </div>
        <Button className="px-3 rounded-lg" size="lg">
          <Upload />
          Upload Training File
        </Button>
      </div>

      <AIStatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyQueryVolumeChart />
        <QueryHandlingPie />
        <QuotationDailyChart />
        <QuotationWeeklyChart />
        <QuotationBreakdownPie />
        <CSATTrendChart />
      </div>

      <EscalationsByCategory />
      <AIQueryLog />
      <AILearningHistory />
    </div>
  );
}
