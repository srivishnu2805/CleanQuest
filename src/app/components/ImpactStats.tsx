import { getCampusStats } from "@/lib/actions";

const ImpactStats = async () => {
  // Use the optimized aggregate action
  const { totalActions, co2Offset, progress } = await getCampusStats();

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-4">Campus Impact Dashboard</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-green-600">{totalActions}</span>
            <span className="text-[10px] text-gray-400 font-medium">TOTAL ACTIONS</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-2xl font-bold text-blue-500">{co2Offset}kg</span>
            <span className="text-[10px] text-gray-400 font-medium">CO₂ OFFSET</span>
          </div>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-green-500 h-full transition-all duration-1000" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-[10px] text-gray-500 italic">
          {progress}% towards this month's campus goal of 1000 actions.
        </p>
      </div>
    </div>
  );
};

export default ImpactStats;
