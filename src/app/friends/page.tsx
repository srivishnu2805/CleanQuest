import { getAllUsers } from "@/lib/actions";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
import Image from "next/image";
import Link from "next/link";

const FriendsPage = async () => {
  const users = await getAllUsers();

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Discover People</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user.clerk_id} className="flex flex-col items-center p-4 border rounded-xl hover:bg-gray-50 transition">
                <div className="relative w-20 h-20 mb-2">
                  <Image
                    src={user.avatar || "/noAvatar.png"}
                    fill
                    className="rounded-full object-cover"
                    alt=""
                  />
                </div>
                <span className="font-bold text-center text-sm">{user.display_name || user.username}</span>
                <span className="text-gray-500 text-xs mb-4">@{user.username}</span>
                <Link 
                  href={`/profile/${user.clerk_id}`}
                  className="bg-green-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default FriendsPage;
