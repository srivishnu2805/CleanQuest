"use client";

import { useState } from "react";
import { toggleFollow } from "@/lib/actions";

const FollowButton = ({ targetUserId, initialFollowing = false, size = "sm" }: { targetUserId: string; initialFollowing?: boolean; size?: "sm" | "md" }) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setIsFollowing(!isFollowing);
    try {
      await toggleFollow(targetUserId);
    } catch {
      setIsFollowing(isFollowing); // revert
    } finally {
      setIsLoading(false);
    }
  };

  if (size === "md") {
    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`px-6 py-2 rounded-xl text-sm font-bold transition disabled:opacity-50 ${
          isFollowing
            ? ""
            : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20"
        }`}
        style={isFollowing ? { backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" } : undefined}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="text-xs font-bold transition hover:opacity-70 disabled:opacity-50 flex-shrink-0"
      style={{ color: isFollowing ? "var(--text-tertiary)" : "var(--green-primary)" }}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
