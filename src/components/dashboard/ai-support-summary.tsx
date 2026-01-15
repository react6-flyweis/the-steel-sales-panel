import { CheckCircle, Clock, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router";

export default function AiSupportSummary() {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            AI Support Summary
          </h3>
          <p className="text-sm text-gray-500 mt-1">Overview of escalations</p>
        </div>
        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
          <Zap className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div
          className="flex items-center justify-between rounded-xl p-3 bg-blue-50"
          role="button"
          tabIndex={0}
          onClick={() => navigate("/leads/escalated-queries")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/leads/escalated-queries");
            }
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/70 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">
                Total Escalations
              </div>
              <div className="text-xs text-gray-500">This month</div>
            </div>
          </div>
          <div className="text-blue-600 font-semibold text-lg">15</div>
        </div>

        <div
          className="flex items-center justify-between rounded-xl p-3 bg-green-50"
          role="button"
          tabIndex={0}
          onClick={() => navigate("/leads/escalated-queries")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/leads/escalated-queries");
            }
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/70 text-green-600">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Resolved</div>
              <div className="text-xs text-gray-500">Successfully closed</div>
            </div>
          </div>
          <div className="text-green-600 font-semibold text-lg">10</div>
        </div>

        <div
          className="flex items-center justify-between rounded-xl p-3 bg-yellow-50"
          role="button"
          tabIndex={0}
          onClick={() => navigate("/leads/escalated-queries")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/leads/escalated-queries");
            }
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/70 text-yellow-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Pending</div>
              <div className="text-xs text-gray-500">Awaiting action</div>
            </div>
          </div>
          <div className="text-yellow-600 font-semibold text-lg">5</div>
        </div>
      </div>

      <div className="mt-6 border-t pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4 text-gray-500" />
          <span>Avg Resolution Time</span>
        </div>
        <div className="text-gray-900 font-semibold">2.5 hrs</div>
      </div>
    </div>
  );
}
