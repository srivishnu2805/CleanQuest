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
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-sm flex flex-col gap-6 hover-scale">
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
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-4 ring-white z-10"
        />
      </div>
      <div className="h-24 flex flex-col gap-2 items-center mt-2">
        <span className="font-bold text-gray-800">{user.display_name || user.username}</span>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-1">
             <span className="text-xs text-green-600 font-bold">{user.points || 0} Points</span>
          </div>
          <span className="text-xs text-gray-400">{user.followers?.length || 0} Followers</span>
        </div>
        <Link href={`/profile/${userId}`}>
          <button className="bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-4 rounded-xl transition font-semibold">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
