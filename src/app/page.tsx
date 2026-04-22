import Feed from "./components/Feed";
import LeftMenu from "./components/LeftMenu";
import RightMenu from "./components/RightMenu";
import Stories from "./components/Stories";
import { Suspense } from "react";
import FeedSkeleton from "./components/FeedSkeleton";

const Homepage = () => {
  return (
    <div className="flex gap-6 pt-6 justify-center">
      <div className="hidden xl:block w-[18%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] max-w-[600px]">
        <div className="flex flex-col gap-6">
          <Suspense fallback={<div className="h-24 bg-white rounded-2xl animate-pulse"></div>}>
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
};

export default Homepage;
