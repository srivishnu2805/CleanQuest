import Link from "next/link";
import Ad from "./Ad";
import Birthday from "./Birthday";
import FriendRequest from "./FriendRequest";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import Leaderboard from "./Leaderboard";

const RightMenu = ({ userId }: { userId?: String }) => {
  return (
    <div className="flex flex-col gap-6">
      {userId ? (
        <>
          <UserInfoCard userId={userId} />
          <UserMediaCard userId={userId} />
        </>
      ) : null}
      <FriendRequest />
      <Birthday />
      <Ad size={"sm"} />
      <Link
        href="/"
        className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
      >
        <Leaderboard />
      </Link>
    </div>
  );
};

export default RightMenu;
