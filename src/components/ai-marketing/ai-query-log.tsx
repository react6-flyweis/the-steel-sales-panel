import { MessageSquare, Mic, Search } from "lucide-react";

const rows = [
  {
    id: "Q001",
    name: "Sarah Johnson",
    type: "Text",
    handledBy: "AI",
    resolution: "Resolved",
    rating: 5,
    timestamp: "2024-01-15 14:30",
  },
  {
    id: "Q002",
    name: "Mike Chen",
    type: "Voice",
    handledBy: "Employee",
    resolution: "Escalated",
    rating: 3,
    timestamp: "2024-01-15 13:45",
  },
  {
    id: "Q003",
    name: "Emily Davis",
    type: "Text",
    handledBy: "AI",
    resolution: "Resolved",
    rating: 4,
    timestamp: "2024-01-15 12:20",
  },
  {
    id: "Q004",
    name: "James Wilson",
    type: "Voice",
    handledBy: "AI",
    resolution: "Resolved",
    rating: 5,
    timestamp: "2024-01-15 11:15",
  },
  {
    id: "Q005",
    name: "Lisa Brown",
    type: "Text",
    handledBy: "Employee",
    resolution: "Escalated",
    rating: 2,
    timestamp: "2024-01-15 10:30",
  },
];

function Badge({
  children,
  color = "bg-gray-100 text-gray-800",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
      {children}
    </span>
  );
}

function Stars({ n }: { n: number }) {
  const stars = Array.from({ length: 5 }).map((_, i) => (
    <svg
      key={i}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={i < n ? "#F6C042" : "none"}
      stroke="#F6C042"
      strokeWidth="1"
      className="inline-block mr-0.5"
    >
      <path d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.603L19.335 24 12 19.897 4.665 24l1.585-8.647L.5 9.75l7.832-1.732L12 .587z" />
    </svg>
  ));
  return <span className="flex items-center">{stars}</span>;
}

export default function AIQueryLog() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
          AI Query Log
        </h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 gap-2 w-full sm:w-auto">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              placeholder="Search by customer or type..."
              className="bg-transparent outline-none text-sm text-slate-600 w-full"
            />
          </div>
          <div className="hidden sm:inline-flex bg-gray-100 rounded-lg px-3 py-2 text-sm text-slate-700">
            All Queries
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-500 text-sm border-b">
              <th className="py-3 pl-2 sm:py-4">Query ID</th>
              <th className="py-3 sm:py-4">Customer Name</th>
              <th className="py-3 sm:py-4 hidden sm:table-cell">Type</th>
              <th className="py-3 sm:py-4 hidden sm:table-cell">Handled By</th>
              <th className="py-3 sm:py-4 hidden sm:table-cell">Resolution</th>
              <th className="py-3 sm:py-4">Satisfaction</th>
              <th className="py-3 pr-2 sm:py-4 hidden sm:table-cell">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className={`${r.resolution === "Escalated" ? "bg-red-50" : ""}`}
              >
                <td className="py-3 pl-2 sm:py-6 font-medium text-slate-800">
                  {r.id}
                </td>
                <td className="py-3 sm:py-6 text-slate-700 min-w-0">
                  <div className="flex flex-col">
                    <span className="font-medium truncate">{r.name}</span>
                    <span className="text-xs text-slate-500 sm:hidden mt-1">
                      {r.timestamp}
                    </span>
                  </div>
                </td>
                <td className="py-3 hidden sm:table-cell text-slate-600 flex items-center gap-2">
                  {r.type === "Text" ? (
                    <MessageSquare className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Mic className="w-4 h-4 text-slate-400" />
                  )}
                  <span>{r.type}</span>
                </td>
                <td className="py-3 hidden sm:table-cell">
                  <Badge
                    color={
                      r.handledBy === "AI"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }
                  >
                    {r.handledBy}
                  </Badge>
                </td>
                <td className="py-3 hidden sm:table-cell">
                  {r.resolution === "Resolved" ? (
                    <Badge color="bg-emerald-100 text-emerald-800">
                      Resolved
                    </Badge>
                  ) : (
                    <Badge color="bg-rose-100 text-rose-800">Escalated</Badge>
                  )}
                </td>
                <td className="py-3 sm:py-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Stars n={r.rating} />
                    <span className="text-slate-500">({r.rating})</span>
                  </div>
                </td>
                <td className="py-3 pr-2 sm:py-6 text-slate-500 hidden sm:table-cell">
                  {r.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 text-sm text-slate-600 gap-3">
        <div>Showing 1 to 5 of 6 results</div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-3 py-2 rounded-md bg-white border text-slate-600">
            Previous
          </button>
          <button className="w-full sm:w-auto px-3 py-2 rounded-md bg-blue-600 text-white">
            1
          </button>
          <button className="w-full sm:w-auto px-3 py-2 rounded-md bg-white border text-slate-600">
            2
          </button>
          <button className="w-full sm:w-auto px-3 py-2 rounded-md bg-white border text-slate-600">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
