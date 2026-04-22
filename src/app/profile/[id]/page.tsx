import Feed from "@/app/components/Feed";
import LeftMenu from "@/app/components/LeftMenu";
import RightMenu from "@/app/components/RightMenu";
import Image from "next/image";
import { getUserProfile } from "@/lib/actions";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import FeedSkeleton from "@/app/components/FeedSkeleton";

const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUserProfile(id);

  if (!user) return notFound();

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg"
                alt=""
                fill
                className="rounded-md object-cover"
              />
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt=""
                width={128}
                height={128}
                className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover"
              />
            </div>
            <div className="flex flex-col items-center mt-20 mb-4">
              <h1 className="text-2xl font-medium">{user.displayName || user.username}</h1>
              <div className="flex items-center gap-8 mt-4">
                <div className="flex flex-col items-center">
                  <span className="font-medium">{user.points || 0}</span>
                  <span className="text-sm">Impact</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">{user.following?.length || 0}</span>
                  <span className="text-sm">Following</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">{user.followers?.length || 0}</span>
                  <span className="text-sm">Followers</span>
                </div>
              </div>
            </div>
          </div>
          <Suspense fallback={<FeedSkeleton />}>
            <Feed />
          </Suspense>
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu userId={id} />
      </div>
    </div>
  );
};

export default ProfilePage;
