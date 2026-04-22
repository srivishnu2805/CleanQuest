import Image from "next/image";
import Link from "next/link";
import { getSuggestedUsers } from "@/lib/actions";
import FollowButton from "./FollowButton";

const FriendRequest = async () => {
  const suggestedUsers = await getSuggestedUsers();

  if (suggestedUsers.length === 0) return null;

  return (
    <div
      className="p-4 rounded-2xl text-sm flex flex-col gap-4"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold text-xs uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
          Suggested for you
        </span>
        <Link href="/friends" className="text-xs font-bold hover:opacity-70 transition" style={{ color: "var(--green-primary)" }}>
          See All
        </Link>
      </div>

      {suggestedUsers.slice(0, 4).map((user: any) => (
        <div key={user.clerkId} className="flex items-center justify-between">
          <Link href={`/profile/${user.clerkId}`} className="flex items-center gap-3 flex-1 min-w-0">
            <Image
              src={user.avatar || "/noAvatar.png"}
              alt=""
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs truncate" style={{ color: "var(--text-primary)" }}>
                {user.displayName || user.username}
              </span>
              <span className="text-[10px] truncate" style={{ color: "var(--text-tertiary)" }}>
                {user.points || 0} points
              </span>
            </div>
          </Link>
          <FollowButton targetUserId={user.clerkId} />
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;
