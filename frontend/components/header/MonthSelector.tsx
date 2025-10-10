export const MonthSelector = () => {
  return (
    <div className="flex items-center gap-3 px-5 py-5">
      {/* Left */}
      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-gray-300">
        &lt;
      </button>

      {/* Month */}
      <span className="font-semibold text-gray-800 whitespace-nowrap">
        OCT 2025
      </span>

      {/* Right */}
      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-gray-300">
        &gt;
      </button>
    </div>
  );
};
