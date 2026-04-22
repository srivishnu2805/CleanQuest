import React from 'react';
import { getLeaderboard } from "@/lib/actions";
import Image from "next/image";

const Leaderboard = async () => {
  const leaderboardData = await getLeaderboard() as any[];

  return (
    <div className="p-2">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
        <span className="p-2 bg-yellow-100 rounded-lg text-lg">🏆</span>
        Top Contributors
      </h2>
      <div
        className="overflow-hidden rounded-2xl"
        style={{
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <table className="w-full text-left border-collapse" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <thead style={{ backgroundColor: "var(--bg-tertiary)" }}>
            <tr className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--text-tertiary)" }}>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3 text-right">Impact Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user: any, index: number) => (
              <tr
                key={user.id}
                className="group transition"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <td className="px-4 py-4">
                   <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-black ${
                     index === 0 ? "bg-yellow-400 text-white shadow-md shadow-yellow-200" : 
                     index === 1 ? "bg-slate-300 text-white" : 
                     index === 2 ? "bg-orange-300 text-white" : ""
                   }`} style={index > 2 ? { color: "var(--text-tertiary)" } : undefined}>
                     {index + 1}
                   </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9">
                       <Image src={user.avatar || "/noAvatar.png"} fill className="rounded-full object-cover" alt=""/>
                    </div>
                    <span className="font-bold group-hover:text-emerald-500 transition" style={{ color: "var(--text-secondary)" }}>{user.username}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <span
                    className="font-black px-3 py-1.5 rounded-lg text-sm"
                    style={{
                      backgroundColor: "var(--green-bg)",
                      color: "var(--green-primary)",
                    }}
                  >
                    {user.points}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
