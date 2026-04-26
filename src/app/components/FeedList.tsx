"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Post from "./Post";
import { getPosts } from "@/lib/actions";

const FeedList = ({ initialPosts }: { initialPosts: any[] }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [cursor, setCursor] = useState(initialPosts.length);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef(null);
  
  useEffect(() => {
    // Import dynamically to avoid SSR issues with supabase client
    import('@/lib/supabase').then(({ supabase }) => {
      if (!supabase) return;
      
      // Use a truly unique channel name to prevent Strict Mode from reusing a channel created in the same millisecond
      const channelName = `posts_feed_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const channel = supabase
        .channel(channelName)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, async (payload: any) => {
          // A new post was created! We could fetch the full post details here and unshift it
          // For a simple UX, we show a "New posts available" toast or just fetch the newest post
          console.log('New post received via realtime!', payload);
          // To keep it simple, we just refetch the newest page and prepend new ones
          const newPosts = await getPosts(0);
          setPosts((prev: any[]) => {
            // Filter out ones we already have
            const existingIds = new Set(prev.map((p: any) => p.id));
            const trulyNew = newPosts.filter((p: any) => !existingIds.has(p.id));
            return [...trulyNew, ...prev];
          });
        })
        .subscribe();
        
      return () => {
        supabase.removeChannel(channel);
      };
    });
  }, []);

  const fetchMorePosts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    
    try {
      const newPosts = await getPosts(cursor);
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
        setCursor((prev) => prev + newPosts.length);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, hasMore, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    const target = observerTarget.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [fetchMorePosts, hasMore]);

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      
      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: "var(--green-primary)" }}></div>
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8" style={{ color: "var(--text-tertiary)" }}>
          You&apos;ve reached the end of the quest! 🌿
        </div>
      )}
      
      {posts.length === 0 && !isLoading && (
        <div
          className="text-center py-16 rounded-2xl"
          style={{
            color: "var(--text-tertiary)",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
          }}
        >
          <p className="text-4xl mb-4">🌱</p>
          <p className="font-medium">No posts yet. Be the first to share your impact!</p>
        </div>
      )}
    </div>
  );
};

export default FeedList;
