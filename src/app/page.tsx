import Feed from "./components/Feed";
import LeftMenu from "./components/LeftMenu";
import RightMenu from "./components/RightMenu";
import Stories from "./components/Stories";
import AddPostTrigger from "./components/AddPostTrigger";
import { Suspense } from "react";
import FeedSkeleton from "./components/FeedSkeleton";
import LandingPage from "./components/LandingPage";
import { auth } from "@clerk/nextjs/server";
import { getCampusStats } from "@/lib/actions";

export default async function Homepage() {
  const { userId } = await auth();

  // Show landing page for unauthenticated visitors
  if (!userId) {
    let stats = { totalActions: 120, co2Offset: 96, progress: 12 };
    try {
      stats = await getCampusStats();
    } catch {
      // Use defaults if DB isn't ready
    }
    return (
      <LandingPage
        stats={{
          totalUsers: stats.totalActions > 0 ? Math.max(Math.floor(stats.totalActions / 3), 50) : 50,
          totalPosts: stats.totalActions || 120,
          co2Offset: stats.co2Offset || 96,
        }}
      />
    );
  }

  return (
    <div className="flex gap-6 pt-6 justify-center">
      <div className="hidden xl:block w-[18%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] max-w-[600px]">
        <div className="flex flex-col gap-6">
          <AddPostTrigger />
          <Suspense fallback={<div className="h-24 themed-card rounded-2xl animate-pulse" />}>
            <Stories />
          </Suspense>
          <Suspense fallback={<FeedSkeleton />}>
            <Feed />
          </Suspense>
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
