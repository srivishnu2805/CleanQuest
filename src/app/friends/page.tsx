import { getAllUsers } from "@/lib/actions";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover People — CleanQuest",
  description: "Connect with fellow sustainability advocates on campus.",
};

const FriendsPage = async () => {
  const users = await getAllUsers();

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div
          className="p-6 rounded-2xl"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Discover People</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((user: any) => (
              <div
                key={user.clerk_id}
                className="flex flex-col items-center p-4 rounded-xl transition hover:shadow-md"
                style={{
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-secondary)",
                }}
              >
                <div className="relative w-20 h-20 mb-2">
                  <Image
                    src={user.avatar || "/noAvatar.png"}
                    fill
                    className="rounded-full object-cover"
                    alt=""
                  />
                </div>
                <span className="font-bold text-center text-sm" style={{ color: "var(--text-primary)" }}>
                  {user.display_name || user.username}
                </span>
                <span className="text-xs mb-4" style={{ color: "var(--text-tertiary)" }}>@{user.username}</span>
                <Link 
                  href={`/profile/${user.clerk_id}`}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition font-bold"
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
