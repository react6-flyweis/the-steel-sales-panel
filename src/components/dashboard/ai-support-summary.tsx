export default function AiSupportSummary() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900">
        AI Support Summary
      </h3>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-white/60">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 11v6a4 4 0 004 4h6a4 4 0 004-4v-6"
                />
              </svg>
            </div>
            <div>
              <div className="text-gray-800 font-medium">Total Escalations</div>
              <div className="text-sm text-gray-500">This month</div>
            </div>
          </div>
          <div className="text-blue-600 font-semibold text-xl">15</div>
        </div>

        <div className="flex items-center justify-between bg-green-50 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-white/60">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <div className="text-gray-800 font-medium">Resolved</div>
              <div className="text-sm text-gray-500">Successfully closed</div>
            </div>
          </div>
          <div className="text-green-600 font-semibold text-xl">10</div>
        </div>

        <div className="flex items-center justify-between bg-yellow-50 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-white/60">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
            </div>
            <div>
              <div className="text-gray-800 font-medium">Pending</div>
              <div className="text-sm text-gray-500">Awaiting action</div>
            </div>
          </div>
          <div className="text-yellow-600 font-semibold text-xl">5</div>
        </div>
      </div>

      <div className="mt-6 border-t pt-4 flex items-center justify-between">
        <div className="text-gray-600">Avg Resolution Time</div>
        <div className="text-gray-900 font-semibold">2.5 hours</div>
      </div>
    </div>
  );
}
