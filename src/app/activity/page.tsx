import Feed from "../components/Feed";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";

export default function Activity() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
             <h1 className="text-xl font-bold text-gray-800">Recent Global Activity</h1>
             <p className="text-sm text-gray-500">See how others are making an impact today.</p>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
