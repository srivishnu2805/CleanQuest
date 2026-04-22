"use client";

import { BADGE_TIER_COLORS } from "@/lib/constants";

interface BadgeDisplayProps {
  badges: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    tier: "bronze" | "silver" | "gold" | "platinum";
    unlocked: boolean;
    progress: number;
  }>;
}

const BadgeGrid = ({ badges }: BadgeDisplayProps) => {
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="themed-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <span className="text-2xl">🏅</span>
          Achievement Badges
        </h3>
        <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ backgroundColor: "var(--green-bg)", color: "var(--green-text)" }}>
          {unlockedCount}/{badges.length}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {badges.map((badge) => {
          const colors = BADGE_TIER_COLORS[badge.tier];
          return (
            <div
              key={badge.id}
              className={`badge-card relative flex flex-col items-center p-4 rounded-2xl border-2 ${
                badge.unlocked
                  ? `${colors.bg} ${colors.border} ${colors.glow} shadow-md`
                  : "badge-locked border-gray-200"
              }`}
              style={!badge.unlocked ? { backgroundColor: "var(--bg-tertiary)", borderColor: "var(--border-color)" } : undefined}
            >
              <div className={`text-3xl mb-2 ${badge.unlocked ? "animate-badge-unlock" : ""}`}>
                {badge.icon}
              </div>
              <span className={`text-xs font-bold text-center leading-tight ${badge.unlocked ? colors.text : ""}`} style={!badge.unlocked ? { color: "var(--text-tertiary)" } : undefined}>
                {badge.name}
              </span>
              <span className="text-[10px] mt-1 text-center leading-tight" style={{ color: "var(--text-tertiary)" }}>
                {badge.description}
              </span>

              {/* Progress bar for locked badges */}
              {!badge.unlocked && (
                <div className="w-full mt-3">
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border-color)" }}>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 progress-bar-animated"
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-bold mt-1 block text-center" style={{ color: "var(--text-tertiary)" }}>
                    {badge.progress}%
                  </span>
                </div>
              )}

              {/* Tier indicator */}
              <div className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black ${
                badge.unlocked ? `${colors.bg} ${colors.border} border` : "hidden"
              }`}>
                {badge.tier === "platinum" ? "P" : badge.tier === "gold" ? "G" : badge.tier === "silver" ? "S" : "B"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeGrid;
