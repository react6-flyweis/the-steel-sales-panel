const ai = 180;
const human = 90;
const pending = 25;
const size = 220;

export default function QuotationBreakdownPie() {
  const total = ai + human + pending || 1;
  const aiPct = (ai / total) * 100;
  const humanPct = (human / total) * 100;
  //   const pendingPct = (pending / total) * 100;

  const aiDeg = (aiPct / 100) * 360;
  const humanDeg = (humanPct / 100) * 360;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-2xl font-semibold text-slate-900 mb-6">
        Quotation Generation breakdown
      </h3>

      <div className="flex flex-col gap-6 items-center">
        <div style={{ width: size }} className="shrink-0">
          <div
            className="rounded-full mx-auto relative"
            style={{
              width: size,
              height: size,
              background: `conic-gradient(#3b82f6 0deg ${aiDeg}deg, #10b981 ${aiDeg}deg ${
                aiDeg + humanDeg
              }deg, #fb8c00 ${aiDeg + humanDeg}deg 360deg)`,
            }}
          >
            <div
              className="absolute inset-0 m-auto rounded-full bg-white"
              style={{ width: size * 0.65, height: size * 0.65 }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900">{total}</div>
                <div className="text-sm text-slate-500">Total</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#3b82f6" }}
                />
                <span className="text-slate-700">AI Processed</span>
              </div>
              <div className="text-slate-900 font-medium">{ai}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#10b981" }}
                />
                <span className="text-slate-700">Human Processed</span>
              </div>
              <div className="text-slate-900 font-medium">{human}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#fb8c00" }}
                />
                <span className="text-slate-700">Pending</span>
              </div>
              <div className="text-slate-900 font-medium">{pending}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
