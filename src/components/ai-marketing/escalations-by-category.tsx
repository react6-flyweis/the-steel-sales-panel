const data = [
  { label: "Product", value: 45, color: "bg-blue-500" },
  { label: "Billing", value: 32, color: "bg-green-500" },
  { label: "Technical", value: 28, color: "bg-orange-500" },
  { label: "Order Status", value: 18, color: "bg-violet-500" },
];

export default function EscalationsByCategory() {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">
        Escalations by Category
      </h2>

      <div className="space-y-4">
        {data.map((item) => {
          const pct = Math.round((item.value / max) * 100);
          return (
            <div key={item.label} className="flex items-center">
              <div className="w-36 text-slate-700">{item.label}</div>
              <div className="flex-1 px-4">
                <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-6 rounded-full flex items-center justify-end pr-4 text-white`}
                    style={{ width: `${pct}%` }}
                  >
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
