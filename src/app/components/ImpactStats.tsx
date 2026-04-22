import { getCampusStats } from "@/lib/actions";

const ImpactStats = async () => {
  const { totalActions, co2Offset, progress } = await getCampusStats();

  return (
    <div
      className="p-5 rounded-2xl"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <h2
        className="font-bold uppercase tracking-wider text-[10px] mb-4"
        style={{ color: "var(--text-tertiary)" }}
      >
        Campus Impact Dashboard
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-black" style={{ color: "var(--green-primary)" }}>
              {totalActions}
            </span>
            <span className="text-[10px] font-medium" style={{ color: "var(--text-tertiary)" }}>
              TOTAL ACTIONS
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-2xl font-black text-cyan-500">{co2Offset}kg</span>
            <span className="text-[10px] font-medium" style={{ color: "var(--text-tertiary)" }}>
              CO₂ OFFSET
            </span>
          </div>
        </div>
        <div
          className="w-full h-2.5 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--bg-tertiary)" }}
        >
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-1000 rounded-full progress-bar-animated"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-[10px] italic" style={{ color: "var(--text-secondary)" }}>
          {progress}% towards this month&apos;s campus goal of 1,000 actions.
        </p>
      </div>
    </div>
  );
};

export default ImpactStats;
