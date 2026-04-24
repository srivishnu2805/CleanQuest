import { getSupabaseAdmin } from "@/lib/supabase";
import type { Metadata } from "next";
import Post from "@/app/components/Post";
import LeftMenu from "@/app/components/LeftMenu";
import RightMenu from "@/app/components/RightMenu";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  
  const { data } = await supabase
    .from("posts")
    .select(`
      *,
      user:users!posts_user_id_fkey(username, avatar, display_name)
    `)
    .eq("id", id)
    .single();

  if (!data) {
    return { title: "Post Not Found | CleanQuest" };
  }

  const user = Array.isArray(data.user) ? data.user[0] : data.user;
  const authorName = user?.display_name || user?.username || "A user";
  const desc = data.desc || "Check out this sustainability action on CleanQuest!";

  return {
    title: `Post by ${authorName} | CleanQuest`,
    description: desc,
    openGraph: {
      title: `Post by ${authorName} | CleanQuest`,
      description: desc,
      images: [
        {
          url: data.img || user?.avatar || "/noAvatar.png",
          width: 1200,
          height: 630,
          alt: "CleanQuest Post Image",
        },
      ],
      type: "article",
    },
  };
}

export default async function SinglePostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { userId: currentUserId } = await auth();
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("posts")
    .select(`
      *,
      user:users!posts_user_id_fkey(username, avatar, display_name, created_at, clerk_id),
      comments:comments(count),
      likes:post_likes(count)
    `)
    .eq("id", id)
    .single();

  const { data: post, error } = await query;

  if (error || !post) return notFound();

  // Check if liked
  let isLiked = false;
  if (currentUserId) {
    const { data: userLike } = await supabase
      .from("post_likes")
      .select("post_id")
      .eq("user_id", currentUserId)
      .eq("post_id", id)
      .single();
    if (userLike) isLiked = true;
  }

  // Need normalizePost from actions but it's not exported. Let's do a basic normalization.
  const normalizedPost = {
    ...post,
    userId: post.user_id,
    createdAt: post.created_at,
    user: Array.isArray(post.user) ? post.user[0] : post.user,
    commentCount: post.comments?.[0]?.count || 0,
    likeCount: post.likes?.[0]?.count || 0,
    isLiked
  };
  
  if (normalizedPost.user) {
      normalizedPost.user.clerkId = normalizedPost.user.clerk_id;
      normalizedPost.user.displayName = normalizedPost.user.display_name;
  }

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="bg-[var(--bg-secondary)] p-4 rounded-2xl shadow-sm border border-[var(--border-color)]">
             <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Post</h1>
          </div>
          <Post post={normalizedPost} />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
