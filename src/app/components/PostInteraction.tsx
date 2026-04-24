"use client";

import { useState } from "react";
import { toggleLike, toggleSavePost } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";

const PostInteraction = ({ postId, initialLikeCount, initialIsLiked, initialIsSaved, commentCount }: { postId: string, initialLikeCount: number, initialIsLiked: boolean, initialIsSaved?: boolean, commentCount: number }) => {
  const { userId } = useAuth();
  const [likeState, setLikeState] = useState({
    count: initialLikeCount,
    isLiked: initialIsLiked
  });
  const [isSaved, setIsSaved] = useState(initialIsSaved || false);

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

  const handleSave = async () => {
    if (!userId) return;
    setIsSaved(!isSaved);
    try {
      await toggleSavePost(postId);
    } catch {
      setIsSaved(initialIsSaved || false);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/posts/${postId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "CleanQuest Post",
          url: url,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Like */}
          <div className="flex items-center gap-1.5">
            <button 
              onClick={handleLike} 
              className="transition hover:scale-110 active:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-primary)] rounded-full p-1 -ml-1 flex items-center"
              aria-label={likeState.isLiked ? "Unlike post" : "Like post"}
            >
              {likeState.isLiked ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#ef4444" stroke="none" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-primary)" }} aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              )}
            </button>
            {likeState.count > 0 && (
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {likeState.count}
              </span>
            )}
          </div>
          {/* Comment */}
          <div className="flex items-center gap-1.5">
            <button 
              className="transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-primary)] rounded-full p-1"
              aria-label="Comment on post"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-primary)" }} aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            {commentCount > 0 && (
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {commentCount}
              </span>
            )}
          </div>
          {/* Share */}
          <button 
            onClick={handleShare}
            className="transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-primary)] rounded-full p-1"
            aria-label="Share post"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-primary)" }} aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      {/* Bookmark */}
      <button 
        onClick={handleSave}
        className="transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-primary)] rounded-full p-1 -mr-1"
        aria-label={isSaved ? "Unsave post" : "Save post"}
      >
        {isSaved ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ color: "var(--text-primary)" }} aria-hidden="true">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-primary)" }} aria-hidden="true">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
      </div>
    </div>
  );
};

export default PostInteraction;
