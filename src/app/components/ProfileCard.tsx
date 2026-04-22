import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getUserProfile } from "@/lib/actions";

const ProfileCard = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await getUserProfile(userId);
  if (!user) return null;

  return (
    <div
      className="p-4 rounded-2xl text-sm flex flex-col gap-6 hover-scale"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="h-20 relative">
        <Image
          src="https://images.pexels.com/photos/2860705/pexels-photo-2860705.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          fill
          className="rounded-xl object-cover"
        />
        <Image
          src={user.avatar || "/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-4 z-10"
          style={{ ringColor: "var(--bg-secondary)" }}
        />
      </div>
      <div className="h-24 flex flex-col gap-2 items-center mt-2">
        <span className="font-bold" style={{ color: "var(--text-primary)" }}>
          {user.display_name || user.username}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold" style={{ color: "var(--green-primary)" }}>
            {user.points || 0} Points
          </span>
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            {user.followerCount || 0} Followers
          </span>
        </div>
        <Link href={`/profile/${userId}`}>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs py-2 px-5 rounded-xl transition font-semibold shadow-md shadow-emerald-500/20">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
