"use client";

import { useState } from "react";
import { toggleLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";

const PostInteraction = ({ postId, initialLikeCount, initialIsLiked, commentCount }: { postId: string, initialLikeCount: number, initialIsLiked: boolean, commentCount: number }) => {
  const { userId } = useAuth();
  const [likeState, setLikeState] = useState({
    count: initialLikeCount,
    isLiked: initialIsLiked
  });

  const handleLike = async () => {
    if (!userId) return;
    setLikeState(prev => ({
      count: prev.isLiked ? prev.count - 1 : prev.count + 1,
      isLiked: !prev.isLiked
    }));
    try {
      await toggleLike(postId);
    } catch {
      setLikeState({ count: initialLikeCount, isLiked: initialIsLiked });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Like */}
        <button onClick={handleLike} className="transition hover:scale-110 active:scale-125">
          {likeState.isLiked ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ef4444" stroke="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-primary)" }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          )}
        </button>
        {/* Comment */}
        <button className="transition hover:scale-110">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-primary)" }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
        {/* Share */}
        <button className="transition hover:scale-110">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-primary)" }}>
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
      {/* Bookmark */}
      <button className="transition hover:scale-110">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-primary)" }}>
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
};

// Like count display is separate, below the icons
export const LikeCount = ({ count }: { count: number }) => {
  if (count === 0) return null;
  return (
    <p className="text-sm font-bold mt-2" style={{ color: "var(--text-primary)" }}>
      {count.toLocaleString()} {count === 1 ? "like" : "likes"}
    </p>
  );
};

export default PostInteraction;
