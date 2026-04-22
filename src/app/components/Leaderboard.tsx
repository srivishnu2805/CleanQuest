import React from 'react';
import { getLeaderboard } from "@/lib/actions";
import Image from "next/image";

interface LeaderboardEntry {
  id: string;
  username: string;
  points: number;
}

const Leaderboard = async () => {
  const leaderboardData = await getLeaderboard() as any[];

  return (
    <div className="p-2">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span className="p-2 bg-yellow-100 rounded-lg text-lg">🏆</span>
        Top Contributors
      </h2>
      <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-slate-50 text-gray-400 uppercase text-[10px] font-bold tracking-widest">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3 text-right">Impact Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leaderboardData.map((user, index) => (
              <tr key={user.id} className="hover:bg-slate-50 transition group">
                <td className="px-4 py-4">
                   <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                     index === 0 ? "bg-yellow-400 text-white" : 
                     index === 1 ? "bg-slate-300 text-white" : 
                     index === 2 ? "bg-orange-300 text-white" : "text-gray-400"
                   }`}>
                     {index + 1}
                   </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8">
                       <Image src={user.avatar || "/noAvatar.png"} fill className="rounded-full object-cover" alt=""/>
                    </div>
                    <span className="font-bold text-gray-700 group-hover:text-green-600 transition">{user.username}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg text-sm">
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
