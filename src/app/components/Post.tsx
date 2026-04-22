"use client";

import Comments from "./Comments";
import Image from "next/image";
import PostInteraction from "./PostInteraction";
import Link from "next/link";
import { useState } from "react";
import { toggleFollow, blockUser } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";

const Post = ({ post }: { post: any }) => {
  const { userId: currentUserId } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/profile/${post.userId}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    setShowMenu(false);
  };

  const handleFollow = async () => {
    await toggleFollow(post.userId);
    setShowMenu(false);
  };

  const handleBlock = async () => {
    if (confirm("Are you sure you want to block this user?")) {
      await blockUser(post.userId);
      setShowMenu(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover-scale mb-8 relative">
      {/*USER*/}
      <div className="flex items-center justify-between ">
        <Link href={`/profile/${post.userId}`} className="flex items-center gap-4 ">
          <Image
            src={post.user?.avatar || "/noAvatar.png"}
            width={44}
            height={44}
            alt=""
            className="w-11 h-11 rounded-full object-cover border-2 border-green-500 p-0.5"
          />
          <div className="flex flex-col">
            <span className="font-bold text-gray-800">{post.user?.displayName || post.user?.username || "Unknown User"}</span>
            <span className="text-xs text-gray-400">Campus Sustainability Advocate</span>
          </div>
        </Link>
        <div className="relative">
          <Image 
            src="/more.png" 
            width={16} 
            height={16} 
            alt="" 
            className="cursor-pointer opacity-50 hover:opacity-100" 
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute right-0 top-6 bg-white shadow-xl border border-gray-100 rounded-xl p-2 w-40 z-50 flex flex-col gap-1">
              {currentUserId !== post.userId && (
                <>
                  <button onClick={handleFollow} className="text-left p-2 hover:bg-slate-50 rounded-lg text-sm font-medium text-gray-700">Follow User</button>
                  <button onClick={handleBlock} className="text-left p-2 hover:bg-red-50 rounded-lg text-sm font-medium text-red-500">Block User</button>
                </>
              )}
              <button onClick={handleCopyLink} className="text-left p-2 hover:bg-slate-50 rounded-lg text-sm font-medium text-gray-700">Copy Link</button>
              <button className="text-left p-2 hover:bg-slate-50 rounded-lg text-sm font-medium text-gray-700">Report</button>
            </div>
          )}
        </div>
      </div>
      {/*DESC*/}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative group overflow-hidden rounded-xl">
            <Image
              src={post.img}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              alt=""
            />
          </div>
        )}
        <p className="text-gray-700 leading-relaxed">{post.desc}</p>
      </div>
      {/*INTERACTION*/}
      <div className="flex items-center justify-between text-sm mt-2 border-t pt-4">
        <PostInteraction 
          postId={post.id} 
          initialLikeCount={post.likeCount || 0} 
          initialIsLiked={post.isLiked || false}
          commentCount={post.commentCount || 0} 
        />
        <div className="">
          <button 
            onClick={handleCopyLink}
            className={`flex items-center gap-4 ${isCopied ? "bg-green-100 text-green-700" : "bg-slate-100 text-gray-500"} p-2 px-4 rounded-xl transition duration-300`}
          >
            <Image
              src="/share.png"
              width={16}
              height={16}
              alt=""
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="font-bold">
              {isCopied ? "Link Copied!" : "Share"}
            </span>
          </button>
        </div>
      </div>
      <Comments postId={post.id} />
    </div>
  );
};

export default Post;
