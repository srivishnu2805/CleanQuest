"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { addComment, getComments } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";

const Comments = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  const [desc, setDesc] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments(postId);
      setComments(data);
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !user) return;
    setIsSubmitting(true);
    try {
      await addComment(postId, desc);
      setDesc("");
      // Refresh comments
      const data = await getComments(postId);
      setComments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      {/* WRITE */}
      <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-4">
        <Image
          src={user?.imageUrl || "/noAvatar.png"}
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1 flex items-center justify-between bg-slate-50 border border-gray-100 rounded-2xl text-sm px-4 py-2 w-full focus-within:ring-1 focus-within:ring-green-500 transition">
          <input
            type="text"
            placeholder="Write a comment..."
            className="bg-transparent outline-none flex-1 py-1"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></input>
          <Image
            src="/emoji.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer opacity-60 hover:opacity-100"
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting || !desc}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition disabled:opacity-50"
        >
          {isSubmitting ? "..." : "Post"}
        </button>
      </form>
      
      {/* Comments List */}
      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 text-sm">
            <div className="relative w-8 h-8 flex-shrink-0">
               <Image src={comment.user?.avatar || "/noAvatar.png"} fill className="rounded-full object-cover" alt=""/>
            </div>
            <div className="flex flex-col gap-1 bg-slate-50 p-3 rounded-2xl flex-1 border border-gray-100">
               <span className="font-bold text-gray-800">{comment.user?.username || "User"}</span>
               <p className="text-gray-600">{comment.desc}</p>
               <div className="flex items-center gap-4 mt-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <button className="hover:text-green-600">Like</button>
                  <button className="hover:text-green-600">Reply</button>
                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
