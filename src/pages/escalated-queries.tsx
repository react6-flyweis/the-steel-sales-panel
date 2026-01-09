import TitleSubtitle from "@/components/TitleSubtitle";

import { Lock, Inbox } from "lucide-react";
import AiQueryLog from "@/components/ai-query-log";

export default function EscalatedQueriesPage() {
  return (
    <div className="p-5">
      <div className="mb-6 flex items-center justify-between">
        <TitleSubtitle
          title="Escalated Queries"
          subtitle="Customer queries that require human intervention"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-slate-900">20</div>
              <div className="text-sm text-slate-500">Pending</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-rose-50 text-rose-600 p-3 rounded-lg">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-slate-900">10</div>
              <div className="text-sm text-slate-500">In Progress</div>
            </div>
          </div>
        </div>
      </div>

      <AiQueryLog />
    </div>
  );
}
