import Link from "next/link";
import Image from "next/image";
import { getUserProfile, toggleFollow } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";

const UserInfoCard = async ({ userId }: { userId: string }) => {
  const user = await getUserProfile(userId);
  const { userId: currentUserId } = await auth();

  if (!user) return (
    <div className="p-4 rounded-2xl" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
      User not found.
    </div>
  );

  return (
    <div
      className="p-4 rounded-2xl text-sm flex flex-col gap-4"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/*TOP*/}
      <div className="flex justify-between items-center font-medium">
        <span style={{ color: "var(--text-secondary)" }}>User Information</span>
        {currentUserId === userId && (
          <Link href="/settings" className="text-xs" style={{ color: "var(--green-primary)" }}>
            Edit Profile
          </Link>
        )}
      </div>
      {/*BOTTOM*/}
      <div className="flex flex-col gap-4" style={{ color: "var(--text-secondary)" }}>
        <div className="flex items-center gap-2">
          <span className="text-xl" style={{ color: "var(--text-primary)" }}>{user.displayName || user.username}</span>
          <span className="text-sm">@{user.username}</span>
        </div>
        <p>
          {user.description || "Passionate advocate for campus sustainability."}
        </p>
        {user.school && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="" width={16} height={16} />
            <span>
              Studied at <b style={{ color: "var(--text-primary)" }}>{user.school}</b>
            </span>
          </div>
        )}
        {user.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="" width={16} height={16} />
            <span>
              Works at <b style={{ color: "var(--text-primary)" }}>{user.work}</b>
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
             <span className="font-bold" style={{ color: "var(--green-primary)" }}>{user.points || 0}</span>
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
            <button className="w-full py-2.5 rounded-xl text-white font-semibold transition bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/20">
              Follow
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
