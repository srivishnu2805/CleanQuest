import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserDashboardStats, getUserBadges, getCampusStats } from "@/lib/actions";
import LeftMenu from "../components/LeftMenu";
import BadgeGrid from "../components/BadgeGrid";
import WeeklyChart from "../components/WeeklyChart";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — CleanQuest Analytics",
  description: "Track your sustainability impact, view weekly activity, and earn achievement badges.",
};

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  const [stats, badges, campusStats] = await Promise.all([
    getUserDashboardStats(userId),
    getUserBadges(userId),
    getCampusStats(),
  ]);

  const unlockedBadges = badges.filter((b) => b.unlocked).length;

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full xl:w-[80%]">
        <div className="flex flex-col gap-6">
          {/* Page Header */}
          <div className="themed-card rounded-2xl p-6">
            <h1 className="text-2xl font-black flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
              <span className="text-3xl">📊</span>
              Impact Dashboard
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              Your personal sustainability analytics and achievements
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon="📝"
              label="Total Posts"
              value={stats.totalPosts}
              gradient="from-emerald-500 to-teal-600"
              glowClass="stat-glow-green"
            />
            <StatCard
              icon="💬"
              label="Comments"
              value={stats.totalComments}
              gradient="from-cyan-500 to-blue-600"
              glowClass="stat-glow-blue"
            />
            <StatCard
              icon="⚡"
              label="Impact Points"
              value={stats.points}
              gradient="from-amber-500 to-orange-600"
              glowClass=""
            />
            <StatCard
              icon="🔥"
              label="Day Streak"
              value={stats.streak}
              gradient="from-rose-500 to-pink-600"
              glowClass=""
            />
          </div>

          {/* Rank + CO₂ Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="themed-card rounded-2xl p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl font-black text-white shadow-lg">
                {stats.rank ? `#${stats.rank}` : "—"}
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: "var(--text-tertiary)" }}>
                  LEADERBOARD RANK
                </div>
                <div className="text-xl font-black" style={{ color: "var(--text-primary)" }}>
                  {stats.rank ? `Top ${stats.rank}` : "Not ranked yet"}
                </div>
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  Keep posting to climb!
                </div>
              </div>
            </div>

            <div className="themed-card rounded-2xl p-6 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-2xl text-white shadow-lg">
                🌍
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: "var(--text-tertiary)" }}>
                  YOUR CO₂ OFFSET
                </div>
                <div className="text-xl font-black" style={{ color: "var(--text-primary)" }}>
                  {stats.co2Impact}kg
                </div>
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  Campus total: {campusStats.co2Offset}kg
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <WeeklyChart data={stats.weeklyActivity} />

          {/* Achievement Badges */}
          <BadgeGrid badges={badges} />

          {/* Your Impact Summary */}
          <div className="themed-card rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <span className="text-2xl">🌿</span>
              Your Impact Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SummaryItem
                label="Badges Earned"
                value={`${unlockedBadges} / ${badges.length}`}
                progress={(unlockedBadges / badges.length) * 100}
                color="from-amber-400 to-yellow-500"
              />
              <SummaryItem
                label="Campus Goal Progress"
                value={`${campusStats.progress}%`}
                progress={campusStats.progress}
                color="from-emerald-400 to-teal-500"
              />
              <SummaryItem
                label="Total Contributions"
                value={`${stats.totalPosts + stats.totalComments + stats.totalLikes}`}
                progress={Math.min(((stats.totalPosts + stats.totalComments) / 50) * 100, 100)}
                color="from-violet-400 to-purple-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  gradient,
  glowClass,
}: {
  icon: string;
  label: string;
  value: number;
  gradient: string;
  glowClass: string;
}) {
  return (
    <div className={`themed-card rounded-2xl p-5 ${glowClass}`}>
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-lg shadow-md`}
        >
          {icon}
        </div>
      </div>
      <div className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
        {value}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
        {label}
      </div>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  progress,
  color,
}: {
  label: string;
  value: string;
  progress: number;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl" style={{ backgroundColor: "var(--bg-tertiary)" }}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
          {label}
        </span>
        <span className="text-sm font-black" style={{ color: "var(--text-primary)" }}>
          {value}
        </span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border-color)" }}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} progress-bar-animated`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
