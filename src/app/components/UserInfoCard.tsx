import Link from "next/link";
import Image from "next/image";
import { getUserProfile, toggleFollow } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";

const UserInfoCard = async ({ userId }: { userId: string }) => {
  const user = await getUserProfile(userId);
  const { userId: currentUserId } = await auth();

  if (!user) return <div className="p-4 bg-white rounded-lg shadow-md">User not found.</div>;

  const isFollowing = user.followers?.includes(currentUserId) || false;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/*TOP*/}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        {currentUserId === userId && (
          <Link href="/settings" className="text-blue-500 text-xs">
            Edit Profile
          </Link>
        )}
      </div>
      {/*BOTTOM*/}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">{user.displayName || user.username}</span>
          <span className="text-sm">@{user.username}</span>
        </div>
        <p>
          {user.description || "Passionate advocate for campus sustainability."}
        </p>
        {user.school && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="" width={16} height={16} />
            <span>
              Studied at <b>{user.school}</b>
            </span>
          </div>
        )}
        {user.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="" width={16} height={16} />
            <span>
              Works at <b>{user.work}</b>
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
             <span className="font-bold text-green-600">{user.points || 0}</span>
             <span>Impact Points</span>
          </div>
          <div className="flex gap-1 items-center">
            <Image src="/date.png" alt="" width={16} height={16} />
            <span> Joined {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        {currentUserId !== userId && (
          <form action={async () => {
            "use server"
            await toggleFollow(userId)
          }}>
            <button className={`w-full py-2 rounded-md text-white font-semibold transition ${isFollowing ? "bg-gray-300 hover:bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}>
              {isFollowing ? "Following" : "Follow"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
