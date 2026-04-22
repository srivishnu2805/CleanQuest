"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { addComment, getComments } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";

const Comments = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  const [desc, setDesc] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [reportedId, setReportedId] = useState<string | null>(null);
  const [showReportToast, setShowReportToast] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      const data = await getComments(postId);
      setComments(data || []);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim() || !user) return;
    setIsSubmitting(true);
    try {
      const result = await addComment(postId, desc.trim());
      if (result?.success !== false) {
        setDesc("");
        await fetchComments();
        setShowAll(true); // Show all comments after posting
      }
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = (commentId: string) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  };

  const handleReport = (commentId: string) => {
    setReportedId(commentId);
    setShowReportToast(true);
    setTimeout(() => setShowReportToast(false), 3000);
  };

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
    return `${Math.floor(seconds / 604800)}w`;
  };

  const visibleComments = showAll ? comments : comments.slice(0, 2);
  const hiddenCount = comments.length - 2;

  return (
    <div className="mt-3">
      {/* View all comments link (Instagram-style) */}
      {comments.length > 2 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="text-sm font-medium mb-3 transition hover:opacity-70"
          style={{ color: "var(--text-tertiary)" }}
        >
          View all {comments.length} comments
        </button>
      )}

      {/* Comments List */}
      <div className="flex flex-col gap-3">
        {visibleComments.map((comment: any) => (
          <div key={comment.id} className="flex gap-3 group">
            <div className="relative w-8 h-8 flex-shrink-0 mt-0.5">
              <Image
                src={comment.user?.avatar || "/noAvatar.png"}
                fill
                className="rounded-full object-cover"
                alt=""
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed">
                    <span className="font-bold mr-1.5" style={{ color: "var(--text-primary)" }}>
                      {comment.user?.username || "User"}
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>{comment.desc}</span>
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[11px] font-medium" style={{ color: "var(--text-tertiary)" }}>
                      {comment.createdAt ? timeAgo(comment.createdAt) : ""}
                    </span>
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="text-[11px] font-bold transition hover:opacity-70"
                      style={{
                        color: likedComments.has(comment.id) ? "var(--green-primary)" : "var(--text-tertiary)",
                      }}
                    >
                      {likedComments.has(comment.id) ? "Liked" : "Like"}
                    </button>
                    <button
                      className="text-[11px] font-bold transition hover:opacity-70"
                      style={{ color: "var(--text-tertiary)" }}
                      onClick={() => {
                        // Focus the input to reply
                        const input = document.getElementById(`comment-input-${postId}`);
                        if (input) {
                          (input as HTMLInputElement).focus();
                          setDesc(`@${comment.user?.username || "user"} `);
                        }
                      }}
                    >
                      Reply
                    </button>
                    <button
                      className="text-[11px] font-bold transition hover:opacity-70 opacity-0 group-hover:opacity-100"
                      style={{ color: "var(--text-tertiary)" }}
                      onClick={() => handleReport(comment.id)}
                    >
                      Report
                    </button>
                  </div>
                </div>
                {/* Like heart icon */}
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className="flex-shrink-0 mt-1 transition hover:scale-125 active:scale-150"
                >
                  {likedComments.has(comment.id) ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444" stroke="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-tertiary)" }}>
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Collapse button */}
      {showAll && comments.length > 2 && (
        <button
          onClick={() => setShowAll(false)}
          className="text-[11px] font-bold mt-2 transition hover:opacity-70"
          style={{ color: "var(--text-tertiary)" }}
        >
          Show less
        </button>
      )}

      {/* Add comment input (Instagram-style) */}
      {user && (
        <form onSubmit={handleSubmit} className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <Image
            src={user?.imageUrl || "/noAvatar.png"}
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 rounded-full object-cover flex-shrink-0"
          />
          <input
            id={`comment-input-${postId}`}
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent outline-none text-sm py-1"
            style={{ color: "var(--text-primary)" }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          {desc.trim() && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-sm font-bold transition hover:opacity-70 disabled:opacity-30 flex-shrink-0"
              style={{ color: "var(--green-primary)" }}
            >
              {isSubmitting ? "..." : "Post"}
            </button>
          )}
        </form>
      )}

      {/* Report Toast */}
      {showReportToast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl z-[200] text-sm font-medium flex items-center gap-2 animate-fade-in-up"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
          }}
        >
          <span>🚩</span> Comment reported. We&apos;ll review it shortly.
        </div>
      )}
    </div>
  );
};

export default Comments;
