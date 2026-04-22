import Leaderboard from "../components/Leaderboard";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard — CleanQuest",
  description: "See the top sustainability contributors on campus.",
};

const LeaderboardPage = () => {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div
          className="p-4 rounded-2xl min-h-[500px]"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <Leaderboard />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default LeaderboardPage;
