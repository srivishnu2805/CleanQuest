import Leaderboard from "../components/Leaderboard";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";

const LeaderboardPage = () => {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="bg-white p-4 rounded-lg shadow-md min-h-[500px]">
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
