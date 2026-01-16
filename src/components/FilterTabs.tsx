import { useState } from "react";

export type Period = "today" | "week" | "month";

type Props = {
  initialPeriod?: Period;
  onPeriodChange?: (period: Period) => void;
};

export default function FilterTabs({
  initialPeriod = "today",
  onPeriodChange,
}: Props) {
  const [period, setPeriod] = useState<Period>(initialPeriod);

  const handleChange = (p: Period) => {
    setPeriod(p);
    if (onPeriodChange) onPeriodChange(p);
  };

  const button = (p: Period, bg: string, z: string) => (
    <button
      onClick={() => handleChange(p)}
      className={`relative w-64 px-8 font-medium -ml-6 ${z} ${bg} ${
        period === p
          ? "ring-2 ring-white/40 text-black"
          : "text-white opacity-60"
      }`}
      style={{
        clipPath: "polygon(30px 0, calc(100% - 30px) 0, 100% 100%, 0 100%)",
      }}
    >
      {p}
    </button>
  );

  return (
    <div className="relative flex h-10 bg-[#89D5DC] overflow-hidden">
      <button
        onClick={() => handleChange("today")}
        className={`relative w-64 px-8 font-medium z-30 bg-[#89D5DC] ${
          period === "today"
            ? "ring-2 ring-white/40 text-black"
            : "text-white opacity-60"
        }`}
        style={{
          clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 100%, 0 100%)",
        }}
      >
        Today
      </button>

      {button("week", "bg-[#6B93CE]", "z-20")}

      {button("month", "bg-[#4A72B7]", "z-10")}
    </div>
  );
}
