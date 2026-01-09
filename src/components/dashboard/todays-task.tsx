export default function TodaysTask() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900">Today's Task</h3>

      <div className="mt-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-50">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m6 6l4-4m0 0l-4-4m4 4H9"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900">
              Follow up with Alice Johnson
            </div>
            <div className="text-sm text-gray-500">Tech Solutions Inc</div>
            <div className="mt-1 flex items-center gap-3 text-sm">
              <div className="text-gray-500">2:00 PM</div>
              <div className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                High priority
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-green-50">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7h18M9 3v4m6 0v4"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900">
              Send proposal to Marketing Pro
            </div>
            <div className="text-sm text-gray-500">Marketing Pro</div>
            <div className="mt-1 flex items-center gap-3 text-sm">
              <div className="text-gray-500">4:30 PM</div>
              <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                medium priority
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-purple-50">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V8H3v11a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900">
              Meeting with Design Studio
            </div>
            <div className="text-sm text-gray-500">Design Studio</div>
            <div className="mt-1 flex items-center gap-3 text-sm">
              <div className="text-gray-500">Tomorrow 2:00 PM</div>
              <div className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                High priority
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
