import Link from "next/link";
import Image from "next/image";
import Ad from "./Ad";
import ProfileCard from "./ProfileCard";

const LeftMenu = ({ type }: { type: "home" | "profile" | "settings" }) => {
  return (
    <div className="flex flex-col gap-6 sticky top-28">
      {type === "home" && <ProfileCard />}
      <div className="p-2 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-1">
        <Link
          href="/"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group"
        >
          <Image src="/home.png" alt="" width={22} height={22} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-700">Home</span>
        </Link>
        <Link
          href="/friends"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group"
        >
          <Image src="/friends.png" alt="" width={22} height={22} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-700">Friends</span>
        </Link>
        <Link
          href="/activity"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group"
        >
          <Image src="/activity.png" alt="" width={22} height={22} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-700">Explore</span>
        </Link>
        <Link
          href="/notifications"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group"
        >
          <Image src="/notifications.png" alt="" width={22} height={22} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-700">Notifications</span>
        </Link>
        <Link
          href="/leaderboard"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group"
        >
          <Image src="/market.png" alt="" width={22} height={22} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-700">Leaderboard</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group"
        >
          <Image src="/settings.png" alt="" width={22} height={22} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-700">Settings</span>
        </Link>
      </div>
      <Ad size="sm" />
    </div>
  );
};

export default LeftMenu;
