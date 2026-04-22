import Link from "next/link";
import Ad from "./Ad";
import Birthday from "./Birthday";
import FriendRequest from "./FriendRequest";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import ImpactStats from "./ImpactStats";
import { Suspense } from "react";

const RightMenu = ({ userId }: { userId?: string }) => {
  return (
    <div className="flex flex-col gap-6 sticky top-20">
      {userId ? (
        <div className="flex flex-col gap-6">
          <UserInfoCard userId={userId} />
          <UserMediaCard userId={userId} />
        </div>
      ) : null}
      
      {!userId && (
        <div className="flex flex-col gap-6">
          <Suspense fallback={<div className="h-32 bg-white rounded-2xl animate-pulse"></div>}>
             <ImpactStats />
          </Suspense>
          <FriendRequest />
          <Birthday />
          <Ad size={"md"} />
          
          <div className="p-4 flex flex-wrap gap-2 text-gray-300 text-[10px] uppercase font-bold">
            <Link href="/" className="hover:underline">About</Link>
            <span>•</span>
            <Link href="/" className="hover:underline">Help</Link>
            <span>•</span>
            <Link href="/" className="hover:underline">Press</Link>
            <span>•</span>
            <Link href="/" className="hover:underline">API</Link>
            <span>•</span>
            <Link href="/" className="hover:underline">Jobs</Link>
            <span>•</span>
            <Link href="/" className="hover:underline">Privacy</Link>
            <span>•</span>
            <Link href="/" className="hover:underline">Terms</Link>
          </div>
          <div className="px-4 text-gray-300 text-[10px] uppercase font-bold">
            © 2024 CLEANQUEST FROM UNIVERSITY
          </div>
        </div>
      )}
    </div>
  );
};

export default RightMenu;
