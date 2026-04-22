"use client";

import Image from "next/image";
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
    
    // Optimistic update
    setLikeState(prev => ({
      count: prev.isLiked ? prev.count - 1 : prev.count + 1,
      isLiked: !prev.isLiked
    }));

    try {
      await toggleLike(postId);
    } catch (err) {
      // Revert if error
      setLikeState({ count: initialLikeCount, isLiked: initialIsLiked });
      console.error(err);
    }
  };

  return (
    <div className="flex gap-8">
      <div className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 p-2 px-4 rounded-full transition cursor-pointer border border-gray-100" onClick={handleLike}>
        <Image
          src={likeState.isLiked ? "/liked.png" : "/like.png"}
          width={18}
          height={18}
          alt=""
          className="transition active:scale-125"
        />
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-medium">Positive</span>
          <span className="w-px h-3 bg-gray-200"></span>
          <span className="text-gray-600 font-bold">
            {likeState.count}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 p-2 px-4 rounded-full transition cursor-pointer border border-gray-100">
        <Image
          src="/comment.png"
          width={18}
          height={18}
          alt=""
        />
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-medium">Comment</span>
          <span className="w-px h-3 bg-gray-200"></span>
          <span className="text-gray-600 font-bold">
            {commentCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
