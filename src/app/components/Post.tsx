"use client";

import Comments from "./Comments";
import Image from "next/image";
import PostInteraction from "./PostInteraction";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { toggleFollow } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";

const Post = ({ post }: { post: any }) => {
  const { userId: currentUserId } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showMenu]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/profile/${post.userId}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setShowMenu(false);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleFollow = async () => {
    setIsFollowed(!isFollowed);
    setShowMenu(false);
    await toggleFollow(post.userId);
  };

  const handleReport = () => {
    setShowMenu(false);
    setShowReport(true);
  };

  const submitReport = () => {
    setIsReported(true);
    setTimeout(() => {
      setShowReport(false);
      setIsReported(false);
      setReportReason("");
    }, 2000);
  };

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
    return `${Math.floor(seconds / 604800)}w`;
  };

  return (
    <div
      className="flex flex-col rounded-2xl mb-2 relative overflow-hidden"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <Link href={`/profile/${post.userId}`} className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={post.user?.avatar || "/noAvatar.png"}
              width={36}
              height={36}
              alt=""
              className="w-9 h-9 rounded-full object-cover ring-2 ring-offset-1"
              style={{ ringColor: "var(--green-primary)", ringOffsetColor: "var(--bg-secondary)" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
              {post.user?.displayName || post.user?.username || "Unknown User"}
            </span>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              • {post.createdAt ? timeAgo(post.createdAt) : ""}
            </span>
          </div>
        </Link>

        {/* Three dot menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg transition hover:bg-[var(--bg-tertiary)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text-tertiary)" }}>
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-10 shadow-2xl rounded-xl overflow-hidden w-52 z-50"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
              }}
            >
              {currentUserId !== post.userId && (
                <button
                  onClick={handleFollow}
                  className="w-full text-left p-3 text-sm font-medium transition flex items-center gap-3 hover:bg-[var(--bg-tertiary)]"
                  style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-subtle)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                  {isFollowed ? "Unfollow" : "Follow"}
                </button>
              )}
              <button
                onClick={handleCopyLink}
                className="w-full text-left p-3 text-sm font-medium transition flex items-center gap-3 hover:bg-[var(--bg-tertiary)]"
                style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-subtle)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                {isCopied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={handleReport}
                className="w-full text-left p-3 text-sm font-medium transition flex items-center gap-3 hover:bg-[var(--bg-tertiary)]"
                style={{ color: "#ef4444" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
                </svg>
                Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image */}
      {post.img && (
        <div className="w-full aspect-square relative bg-black">
          <Image
            src={post.img}
            fill
            className="object-cover"
            alt=""
          />
        </div>
      )}

      {/* Interaction Bar */}
      <div className="px-4 pt-3">
        <PostInteraction
          postId={post.id}
          initialLikeCount={post.likeCount || 0}
          initialIsLiked={post.isLiked || false}
          commentCount={post.commentCount || 0}
        />
      </div>

      {/* Caption */}
      <div className="px-4 pt-2 pb-1">
        <p className="text-sm leading-relaxed">
          <span className="font-bold mr-1.5" style={{ color: "var(--text-primary)" }}>
            {post.user?.username || "user"}
          </span>
          <span style={{ color: "var(--text-secondary)" }}>{post.desc}</span>
        </p>
      </div>

      {/* Comments */}
      <div className="px-4 pb-4">
        <Comments postId={post.id} />
      </div>

      {/* Report Modal */}
      {showReport && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowReport(false)}>
          <div
            className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {isReported ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <p className="font-bold" style={{ color: "var(--text-primary)" }}>Thanks for reporting</p>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>We&apos;ll review this post shortly.</p>
              </div>
            ) : (
              <>
                <div className="p-4 text-center font-bold" style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
                  Report Post
                </div>
                <div className="p-2">
                  {["Spam or misleading", "Not sustainability related", "Inappropriate content", "Harassment or hate speech", "Other"].map((reason) => (
                    <button
                      key={reason}
                      onClick={() => {
                        setReportReason(reason);
                        submitReport();
                      }}
                      className="w-full text-left p-3 text-sm font-medium rounded-xl transition hover:bg-[var(--bg-tertiary)]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowReport(false)}
                  className="w-full p-3 text-sm font-bold transition hover:bg-[var(--bg-tertiary)]"
                  style={{ borderTop: "1px solid var(--border-color)", color: "var(--text-tertiary)" }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
