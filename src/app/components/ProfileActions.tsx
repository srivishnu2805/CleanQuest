"use client";

import { useState } from "react";
import { toggleFollow, blockUser } from "@/lib/actions";

const ProfileActions = ({
  targetUserId,
  initialFollowing,
  initialBlocked,
}: {
  targetUserId: string;
  initialFollowing: boolean;
  initialBlocked: boolean;
}) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isBlocked, setIsBlocked] = useState(initialBlocked);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleFollow = async () => {
    if (isBlocked) return;
    setIsLoading(true);
    setIsFollowing(!isFollowing);
    try {
      await toggleFollow(targetUserId);
    } catch {
      setIsFollowing(isFollowing);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlock = async () => {
    setShowMenu(false);
    setIsLoading(true);
    const wasBlocked = isBlocked;
    setIsBlocked(!isBlocked);
    if (!wasBlocked) setIsFollowing(false);
    try {
      const result = await blockUser(targetUserId);
      showToast(result.action === "blocked" ? "User blocked" : "User unblocked");
    } catch {
      setIsBlocked(wasBlocked);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2 w-full relative">
      {/* Follow / Unfollow / Blocked */}
      <button
        onClick={handleFollow}
        disabled={isLoading || isBlocked}
        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition disabled:opacity-50 ${
          isBlocked
            ? ""
            : isFollowing
            ? ""
            : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20"
        }`}
        style={
          isBlocked
            ? { backgroundColor: "var(--bg-tertiary)", color: "var(--text-tertiary)", border: "1px solid var(--border-color)" }
            : isFollowing
            ? { backgroundColor: "var(--bg-tertiary)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }
            : undefined
        }
      >
        {isBlocked ? "Blocked" : isFollowing ? "Following" : "Follow"}
      </button>

      {/* More menu */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="px-3 py-2.5 rounded-xl transition"
        style={{ backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-color)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text-secondary)" }}>
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {showMenu && (
        <div
          className="absolute right-0 top-12 shadow-2xl rounded-xl overflow-hidden w-48 z-50"
          style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
        >
          <button
            onClick={handleBlock}
            className="w-full text-left p-3 text-sm font-medium transition flex items-center gap-3 hover:bg-[var(--bg-tertiary)]"
            style={{ color: isBlocked ? "var(--text-secondary)" : "#ef4444" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
            {isBlocked ? "Unblock User" : "Block User"}
          </button>
          <button
            onClick={() => { setShowMenu(false); showToast("User reported"); }}
            className="w-full text-left p-3 text-sm font-medium transition flex items-center gap-3 hover:bg-[var(--bg-tertiary)]"
            style={{ color: "#ef4444", borderTop: "1px solid var(--border-subtle)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
            Report User
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl z-[200] text-sm font-medium animate-fade-in-up"
          style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
        >
          {toast}
        </div>
      )}
    </div>
  );
};

export default ProfileActions;
