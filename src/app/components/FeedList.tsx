"use client";

import { useState, useEffect, useRef } from "react";
import Post from "./Post";
import { getPosts } from "@/lib/actions";

const FeedList = ({ initialPosts }: { initialPosts: any[] }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [cursor, setCursor] = useState(initialPosts.length);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef(null);

  const fetchMorePosts = async () => {
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
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [cursor, hasMore, isLoading]);

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      
      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <div className="text-center text-gray-500 py-8">You've reached the end of the quest! 🌿</div>
      )}
      
      {posts.length === 0 && !isLoading && (
        <div className="text-gray-500 text-center py-8">No posts yet. Be the first to post!</div>
      )}
    </div>
  );
};

export default FeedList;
