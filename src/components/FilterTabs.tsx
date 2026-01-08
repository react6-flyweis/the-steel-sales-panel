export default function FilterTabs() {
  return (
    <div className="relative flex h-10 bg-[#89D5DC] overflow-hidden">
      <button
        className="relative w-64  px-8 text-white font-medium  z-30"
        style={{
          clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 100%, 0 100%)",
        }}
      >
        Today
      </button>
      <button
        className="relative w-64  px-8 text-white font-medium -ml-6 z-20 bg-[#6B93CE]"
        style={{
          clipPath: "polygon(30px 0, calc(100% - 30px) 0, 100% 100%, 0 100%)",
        }}
      >
        Week
      </button>
      <button
        className="relative w-64 px-8 text-white font-medium -ml-6 z-10 bg-[#4A72B7]"
        style={{
          clipPath: "polygon(30px 0, calc(100% - 30px) 0, 100% 100%, 0 100%)",
        }}
      >
        Month
      </button>
    </div>
  );
}
