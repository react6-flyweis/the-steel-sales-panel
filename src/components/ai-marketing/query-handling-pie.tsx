const ai = 300;
const human = 200;
const size = 180;

export default function QueryHandlingPie() {
  const total = ai + human || 1;
  const aiPct = (ai / total) * 100;
  const humanPct = (human / total) * 100;
  const aiDeg = (aiPct / 100) * 360;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-2xl font-semibold text-slate-900 mb-6">
        Query Handling Distribution
      </h3>

      <div className="flex flex-col items-center justify-between gap-6">
        <div style={{ width: size }} className="shrink-0">
          <div
            className="rounded-full mx-auto relative"
            style={{
              width: size,
              height: size,
              background: `conic-gradient(#3b82f6 0deg ${aiDeg}deg, #10b981 ${aiDeg}deg 360deg)`,
            }}
          >
            <div
              className="absolute inset-0 m-auto rounded-full bg-white"
              style={{ width: size * 0.62, height: size * 0.62 }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900">
                  {Math.round(((ai + human) / (ai + human)) * 100)}%
                </div>
                <div className="text-sm text-slate-500">Total</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "#3b82f6" }}
              />
              <span className="text-slate-700">AI Handled</span>
            </div>
            <div className="text-slate-900 font-medium">
              {Math.round(aiPct)}%
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "#10b981" }}
              />
              <span className="text-slate-700">Employee Handled</span>
            </div>
            <div className="text-slate-900 font-medium">
              {Math.round(humanPct)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
