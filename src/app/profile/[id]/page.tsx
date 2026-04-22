import Feed from "@/app/components/Feed";
import LeftMenu from "@/app/components/LeftMenu";
import RightMenu from "@/app/components/RightMenu";
import Image from "next/image";
import { getUserProfile, getUserBadges, getFollowStatus } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import FeedSkeleton from "@/app/components/FeedSkeleton";
import BadgeGrid from "@/app/components/BadgeGrid";
import ProfileActions from "@/app/components/ProfileActions";

const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { userId: currentUserId } = await auth();

  const [user, badges, followStatus] = await Promise.all([
    getUserProfile(id),
    getUserBadges(id),
    currentUserId ? getFollowStatus(id) : Promise.resolve({ isFollowing: false, isBlocked: false, isFollowedBy: false }),
  ]);

  if (!user) return notFound();

  const unlockedBadges = badges.filter((b) => b.unlocked).length;
  const isOwnProfile = currentUserId === id;

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg"
                alt=""
                fill
                className="rounded-2xl object-cover"
              />
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt=""
                width={128}
                height={128}
                className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 object-cover shadow-lg"
                style={{ ringColor: "var(--bg-secondary)" }}
              />
            </div>
            <div className="flex flex-col items-center mt-20 mb-4 w-full">
              <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                {user.displayName || user.username}
              </h1>
              <span className="text-sm mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                @{user.username}
              </span>

              {/* Stats Row */}
              <div className="flex items-center gap-10 mt-5">
                <div className="flex flex-col items-center">
                  <span className="font-black text-lg" style={{ color: "var(--text-primary)" }}>{user.points || 0}</span>
                  <span className="text-[11px] font-medium" style={{ color: "var(--text-tertiary)" }}>Impact</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-black text-lg" style={{ color: "var(--text-primary)" }}>{user.followingCount || 0}</span>
                  <span className="text-[11px] font-medium" style={{ color: "var(--text-tertiary)" }}>Following</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-black text-lg" style={{ color: "var(--text-primary)" }}>{user.followerCount || 0}</span>
                  <span className="text-[11px] font-medium" style={{ color: "var(--text-tertiary)" }}>Followers</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 w-full max-w-xs">
                {isOwnProfile ? (
                  <a
                    href="/settings"
                    className="block w-full text-center py-2.5 rounded-xl text-sm font-bold transition"
                    style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }}
                  >
                    Edit Profile
                  </a>
                ) : (
                  <ProfileActions
                    targetUserId={id}
                    initialFollowing={followStatus.isFollowing}
                    initialBlocked={followStatus.isBlocked}
                  />
                )}
              </div>

              {/* Badge chip */}
              {unlockedBadges > 0 && (
                <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full" style={{ backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-color)" }}>
                  <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
                    🏅 {unlockedBadges} badge{unlockedBadges !== 1 ? "s" : ""} earned
                  </span>
                </div>
              )}
            </div>
          </div>

          <BadgeGrid badges={badges} />

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
