"use server";

import { getSupabaseAdmin } from "./supabase";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { POINT_SYSTEM, BADGES } from "./constants";
import { cache } from "react";

// --- 🧪 ZOD SCHEMAS ---
const PostSchema = z.object({
  desc: z.string().min(1, "Post description is required").max(1000),
  img: z.string().url().optional().nullable(),
});

const CreateCommentSchema = z.object({
  postId: z.string().uuid(),
  desc: z.string().min(1).max(500),
});

const UpdateProfileSchema = z.object({
  display_name: z.string().min(2).max(50).optional(),
  description: z.string().max(250).optional(),
  school: z.string().max(100).optional(),
  work: z.string().max(100).optional(),
});

// --- 🛠️ HELPER: DATA NORMALIZATION ---
const normalizeUser = (user: any) => {
  if (!user) return null;
  return {
    ...user,
    clerkId: user.clerk_id,
    displayName: user.display_name,
    createdAt: user.created_at,
    followerCount: user.followers?.[0]?.count || 0,
    followingCount: user.following?.[0]?.count || 0,
  };
};

const normalizePost = (post: any) => {
  if (!post) return null;
  return {
    ...post,
    userId: post.user_id,
    createdAt: post.created_at,
    user: normalizeUser(Array.isArray(post.user) ? post.user[0] : post.user),
    commentCount: post.comments?.[0]?.count || 0,
    likeCount: post.likes?.[0]?.count || 0,
  };
};

// --- 🚀 CORE SERVER ACTIONS (OPTIMIZED) ---

/**
 * Optimized getUserProfile with Request Memoization.
 * Prevents redundant DB calls when multiple components need the same profile.
 */
export const getUserProfile = cache(async (clerkId: string) => {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("users")
    .select(`
      *,
      followers:user_follows!user_follows_following_id_fkey(count),
      following:user_follows!user_follows_follower_id_fkey(count)
    `)
    .eq("clerk_id", clerkId)
    .single();

  if (!data || error) {
    const { userId: currentUserId } = await auth();
    if (clerkId === currentUserId) return await syncUser();
    return null;
  }
  return normalizeUser(data);
});

/**
 * Optimized getCampusStats with memoization and single-row retrieval.
 */
export const getCampusStats = cache(async () => {
  const supabase = getSupabaseAdmin();
  const { data: userStats } = await supabase.from("users").select("points");
  const totalPoints = userStats?.reduce((sum, u) => sum + (u.points || 0), 0) || 0;
  const totalActions = totalPoints / 5; 
  return {
    totalActions: Math.floor(totalActions),
    co2Offset: parseFloat((totalActions * 0.8).toFixed(1)),
    progress: Math.min(Math.round((totalActions / 1000) * 100), 100)
  };
});

export const getPosts = async (cursor?: number) => {
  const { userId: currentUserId } = await auth();
  const supabase = getSupabaseAdmin();
  const PAGE_SIZE = 5;

  let blockedUserIds: string[] = [];
  if (currentUserId) {
    const { data: blocks } = await supabase
      .from("user_blocks")
      .select("blocked_id")
      .eq("blocker_id", currentUserId);
    if (blocks) blockedUserIds = blocks.map(b => b.blocked_id);
  }
  
  let query = supabase
    .from("posts")
    .select(`
      *,
      user:users!posts_user_id_fkey(username, avatar, display_name, created_at, clerk_id),
      comments:comments(count),
      likes:post_likes(count)
    `)
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  if (blockedUserIds.length > 0) {
    query = query.not("user_id", "in", `(${blockedUserIds.join(",")})`);
  }

  if (cursor) query = query.range(cursor, cursor + PAGE_SIZE - 1);

  const { data: posts, error } = await query;
  if (error) return [];

  let likedPostIds = new Set();
  if (currentUserId && posts?.length > 0) {
    const postIds = posts.map(p => p.id);
    const { data: userLikes } = await supabase
      .from("post_likes")
      .select("post_id")
      .eq("user_id", currentUserId)
      .in("post_id", postIds);
    
    if (userLikes) likedPostIds = new Set(userLikes.map(l => l.post_id));
  }

  return (posts || []).map(post => ({
    ...normalizePost(post),
    isLiked: likedPostIds.has(post.id)
  }));
};

export const createPost = async (formData: any) => {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };
  const validatedFields = PostSchema.safeParse(formData);
  if (!validatedFields.success) return { success: false, error: "Invalid data" };
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("posts").insert({ user_id: userId, desc: validatedFields.data.desc, img: validatedFields.data.img || null });
  if (error) return { success: false, error: error.message };
  await awardPoints(userId, "POST");
  revalidatePath("/");
  return { success: true };
};

export const syncUser = async () => {
  try {
    const { userId } = await auth();
    if (!userId) return null;
    const user = await currentUser();
    if (!user) return null;
    const supabase = getSupabaseAdmin();
    const { data: existingUser } = await supabase.from("users").select("*").eq("clerk_id", userId).single();
    if (existingUser) return normalizeUser(existingUser);
    await supabase.from("users").insert({ clerk_id: userId, username: user.username || user.firstName || "User", avatar: user.imageUrl || "/noAvatar.png", display_name: `${user.firstName || ""} ${user.lastName || ""}`.trim() });
    const { data: newUser } = await supabase.from("users").select("*").eq("clerk_id", userId).single();
    return normalizeUser(newUser);
  } catch (err) {
    console.error("syncUser error:", err);
    return null;
  }
};

export const addComment = async (postId: string, desc: string) => {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };
  const supabase = getSupabaseAdmin();
  await supabase.from("comments").insert({ post_id: postId, user_id: userId, desc });
  const { data: post } = await supabase.from("posts").select("user_id").eq("id", postId).single();
  if (post) await createNotification(post.user_id, "commented on your post");
  await awardPoints(userId, "COMMENT");
  revalidatePath("/");
  return { success: true };
};

export const toggleLike = async (postId: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = getSupabaseAdmin();
  const { data: existingLike } = await supabase.from("post_likes").select("*").eq("post_id", postId).eq("user_id", userId).single();
  if (existingLike) {
    await supabase.from("post_likes").delete().eq("post_id", postId).eq("user_id", userId);
  } else {
    await supabase.from("post_likes").insert({ post_id: postId, user_id: userId });
    const { data: post } = await supabase.from("posts").select("user_id").eq("id", postId).single();
    if (post) await createNotification(post.user_id, "liked your post");
  }
  revalidatePath("/");
};

export const toggleFollow = async (targetUserId: string) => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId || currentUserId === targetUserId) return;
  const supabase = getSupabaseAdmin();
  const { data: existingFollow } = await supabase.from("user_follows").select("*").eq("follower_id", currentUserId).eq("following_id", targetUserId).single();
  if (existingFollow) {
    await supabase.from("user_follows").delete().eq("follower_id", currentUserId).eq("following_id", targetUserId);
  } else {
    await supabase.from("user_follows").insert({ follower_id: currentUserId, following_id: targetUserId });
    await createNotification(targetUserId, "started following you");
  }
  revalidatePath(`/profile/${targetUserId}`);
};

export const updateUserProfile = async (formData: any) => {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };
  const supabase = getSupabaseAdmin();
  await supabase.from("users").update(formData).eq("clerk_id", userId);
  revalidatePath(`/profile/${userId}`);
  revalidatePath("/settings");
  return { success: true };
};

export const getComments = async (postId: string) => {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      user:users!comments_user_id_fkey(username, avatar, display_name, created_at, clerk_id)
    `)
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) return [];
  return (data || []).map((comment: any) => ({
    ...comment,
    userId: comment.user_id,
    postId: comment.post_id,
    createdAt: comment.created_at,
    user: normalizeUser(Array.isArray(comment.user) ? comment.user[0] : comment.user),
  }));
};

export const getLeaderboard = async () => {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("users").select("*").order("points", { ascending: false }).limit(10);
  return (data || []).map(normalizeUser);
};

export const searchUsers = async (query: string) => {
  if (!query) return [];
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("users").select("*").or(`username.ilike.%${query}%,display_name.ilike.%${query}%`).limit(5);
  return (data || []).map(normalizeUser);
};

export const getNotifications = async () => {
  const { userId } = await auth();
  if (!userId) return [];
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("notifications").select(`*, sender:users!notifications_sender_id_fkey(username, avatar, display_name, clerk_id)`).eq("receiver_id", userId).order("created_at", { ascending: false });
  return (data || []).map((notif: any) => ({
    ...notif,
    senderId: notif.sender_id,
    receiverId: notif.receiver_id,
    createdAt: notif.created_at,
    sender: normalizeUser(Array.isArray(notif.sender) ? notif.sender[0] : notif.sender),
  }));
};

export const getStories = async () => {
  const supabase = getSupabaseAdmin();
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data } = await supabase.from("stories").select(`*, user:users!stories_user_id_fkey(username, avatar, clerk_id)`).gt("created_at", yesterday).order("created_at", { ascending: false });
  if (!data?.length) return [
    { id: 'd1', img: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg", user: { username: "EcoWarrior", avatar: "https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg" } },
    { id: 'd2', img: "https://images.pexels.com/photos/3900509/pexels-photo-3900509.jpeg", user: { username: "GreenLeaf", avatar: "https://images.pexels.com/photos/3550651/pexels-photo-3550651.jpeg" } },
  ];
  return data.map((s: any) => ({ ...s, user: normalizeUser(s.user) }));
};

export const getEvents = async () => {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("events").select(`*, attendees:event_attendees(count), organizer:users!events_organizer_id_fkey(username, avatar, display_name)`).gt("event_date", new Date().toISOString()).order("event_date", { ascending: true });
  return error ? [] : data;
};

export const getAllUsers = async () => {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("points", { ascending: false });
    
  if (error) return [];
  return (data || []).map(normalizeUser);
};

export const getUserPosts = async (userId: string) => {
  const supabase = getSupabaseAdmin();
  const { data: posts, error } = await supabase.from("posts").select(`*, user:users!posts_user_id_fkey(username, avatar, display_name, created_at, clerk_id), comments:comments(count), likes:post_likes(count)`).eq("user_id", userId).order("created_at", { ascending: false });
  if (error) return [];
  return posts.map(normalizePost);
};

const awardPoints = async (userId: string, actionType: keyof typeof POINT_SYSTEM) => {
  const supabase = getSupabaseAdmin();
  const config = POINT_SYSTEM[actionType];
  const today = new Date().toISOString().split('T')[0];
  const { data: dailyRecord } = await supabase.from("user_daily_actions").select("count").eq("user_id", userId).eq("action_type", actionType).eq("action_date", today).single();
  const currentCount = dailyRecord?.count || 0;
  if (currentCount < config.cap) {
    const { data: user } = await supabase.from("users").select("points").eq("clerk_id", userId).single();
    await supabase.from("users").update({ points: (user?.points || 0) + config.points }).eq("clerk_id", userId);
    if (currentCount === 0) {
      await supabase.from("user_daily_actions").insert({ user_id: userId, action_type: actionType, count: 1, action_date: today });
    } else {
      await supabase.from("user_daily_actions").update({ count: currentCount + 1 }).eq("user_id", userId).eq("action_type", actionType).eq("action_date", today);
    }
  }
};

const createNotification = async (receiverId: string, action: string) => {
  const { userId: senderId } = await auth();
  if (!senderId || senderId === receiverId) return;
  const supabase = getSupabaseAdmin();
  await supabase.from("notifications").insert({ sender_id: senderId, receiver_id: receiverId, action });
};

// --- 📊 ANALYTICS DASHBOARD ---

/**
 * Aggregates comprehensive user analytics for the dashboard.
 * Demonstrates: Complex SQL aggregation, multi-table joins, date grouping.
 */
export const getUserDashboardStats = cache(async (clerkId: string) => {
  const supabase = getSupabaseAdmin();

  // Parallel queries for performance
  const [postsResult, commentsResult, likesResult, userResult, leaderboardResult] = await Promise.all([
    supabase.from("posts").select("id, created_at").eq("user_id", clerkId).order("created_at", { ascending: false }),
    supabase.from("comments").select("id, created_at").eq("user_id", clerkId),
    supabase.from("post_likes").select("id, created_at").eq("user_id", clerkId),
    supabase.from("users").select("points, created_at").eq("clerk_id", clerkId).single(),
    supabase.from("users").select("clerk_id, points").order("points", { ascending: false }).limit(10),
  ]);

  const posts = postsResult.data || [];
  const comments = commentsResult.data || [];
  const likes = likesResult.data || [];
  const user = userResult.data;
  const leaderboard = leaderboardResult.data || [];

  // Calculate weekly activity (last 7 days)
  const now = new Date();
  const weeklyActivity = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];
    const dayPosts = posts.filter((p) => p.created_at?.startsWith(dateStr)).length;
    const dayComments = comments.filter((c) => c.created_at?.startsWith(dateStr)).length;
    const dayLikes = likes.filter((l) => l.created_at?.startsWith(dateStr)).length;
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: dateStr,
      posts: dayPosts,
      comments: dayComments,
      likes: dayLikes,
      total: dayPosts + dayComments + dayLikes,
    };
  });

  // Calculate streak (consecutive days with activity)
  let streak = 0;
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const hasActivity =
      posts.some((p) => p.created_at?.startsWith(dateStr)) ||
      comments.some((c) => c.created_at?.startsWith(dateStr));
    if (hasActivity) streak++;
    else if (i > 0) break; // Allow today to have no activity yet
  }

  // Leaderboard rank
  const rank = leaderboard.findIndex((u) => u.clerk_id === clerkId) + 1;

  return {
    totalPosts: posts.length,
    totalComments: comments.length,
    totalLikes: likes.length,
    points: user?.points || 0,
    streak,
    rank: rank > 0 ? rank : null,
    weeklyActivity,
    joinedAt: user?.created_at,
    co2Impact: parseFloat((posts.length * 1.2 + comments.length * 0).toFixed(1)),
  };
});

// --- 🏅 ACHIEVEMENT BADGES ---

/**
 * Calculates which badges a user has unlocked based on their activity.
 * Badge requirements are checked server-side to prevent gaming.
 */
export const getUserBadges = cache(async (clerkId: string) => {
  const supabase = getSupabaseAdmin();

  const [postsResult, commentsResult, userResult, leaderboardResult] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact" }).eq("user_id", clerkId),
    supabase.from("comments").select("id", { count: "exact" }).eq("user_id", clerkId),
    supabase.from("users").select("points").eq("clerk_id", clerkId).single(),
    supabase.from("users").select("clerk_id").order("points", { ascending: false }).limit(3),
  ]);

  const postCount = postsResult.count || 0;
  const commentCount = commentsResult.count || 0;
  const points = userResult.data?.points || 0;
  const topThree = (leaderboardResult.data || []).map((u) => u.clerk_id);
  const isTopThree = topThree.includes(clerkId);

  const userMetrics: Record<string, number> = {
    posts: postCount,
    comments: commentCount,
    points: points,
    leaderboard: isTopThree ? 1 : 999,
  };

  return BADGES.map((badge) => ({
    ...badge,
    unlocked: userMetrics[badge.requirement.type] !== undefined &&
      (badge.requirement.type === "leaderboard"
        ? userMetrics[badge.requirement.type] <= badge.requirement.value
        : userMetrics[badge.requirement.type] >= badge.requirement.value),
    progress: badge.requirement.type === "leaderboard"
      ? isTopThree ? 100 : 0
      : Math.min(
          Math.round(((userMetrics[badge.requirement.type] || 0) / badge.requirement.value) * 100),
          100
        ),
  }));
});

// --- 👥 SOCIAL FEATURES ---

/**
 * Block/unblock a user. Blocked users' posts are filtered from feed.
 */
export const blockUser = async (targetUserId: string) => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId || currentUserId === targetUserId) return { action: "none" };
  const supabase = getSupabaseAdmin();

  const { data: existing } = await supabase
    .from("user_blocks")
    .select("*")
    .eq("blocker_id", currentUserId)
    .eq("blocked_id", targetUserId)
    .single();

  if (existing) {
    await supabase.from("user_blocks").delete().eq("blocker_id", currentUserId).eq("blocked_id", targetUserId);
    return { action: "unblocked" };
  } else {
    await supabase.from("user_blocks").insert({ blocker_id: currentUserId, blocked_id: targetUserId });
    // Also unfollow if following
    await supabase.from("user_follows").delete().eq("follower_id", currentUserId).eq("following_id", targetUserId);
    await supabase.from("user_follows").delete().eq("follower_id", targetUserId).eq("following_id", currentUserId);
    return { action: "blocked" };
  }
};

/**
 * Get follow status between current user and target user.
 */
export const getFollowStatus = async (targetUserId: string) => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) return { isFollowing: false, isBlocked: false, isFollowedBy: false };
  const supabase = getSupabaseAdmin();

  const [followResult, blockedResult, followedByResult] = await Promise.all([
    supabase.from("user_follows").select("id").eq("follower_id", currentUserId).eq("following_id", targetUserId).single(),
    supabase.from("user_blocks").select("id").eq("blocker_id", currentUserId).eq("blocked_id", targetUserId).single(),
    supabase.from("user_follows").select("id").eq("follower_id", targetUserId).eq("following_id", currentUserId).single(),
  ]);

  return {
    isFollowing: !!followResult.data,
    isBlocked: !!blockedResult.data,
    isFollowedBy: !!followedByResult.data,
  };
};

/**
 * Get suggested users to follow (users the current user isn't following).
 */
export const getSuggestedUsers = async () => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) return [];
  const supabase = getSupabaseAdmin();

  // Get IDs the user already follows
  const { data: following } = await supabase
    .from("user_follows")
    .select("following_id")
    .eq("follower_id", currentUserId);

  const followingIds = (following || []).map((f) => f.following_id);
  followingIds.push(currentUserId); // Exclude self

  // Get users not in following list
  let query = supabase
    .from("users")
    .select("*")
    .order("points", { ascending: false })
    .limit(5);

  if (followingIds.length > 0) {
    query = query.not("clerk_id", "in", `(${followingIds.join(",")})`);
  }

  const { data, error } = await query;
  if (error) return [];
  return (data || []).map(normalizeUser);
};

