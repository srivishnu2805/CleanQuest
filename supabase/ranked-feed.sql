-- ============================================
-- Algorithmic Feed Ranking Function
-- Run this in Supabase SQL Editor
-- ============================================

-- This function calculates a "hotness" score for each post based on:
-- 1. Base points for just existing (time decay based)
-- 2. Number of likes (high weight)
-- 3. Number of comments (medium weight)

CREATE OR REPLACE FUNCTION get_ranked_posts()
RETURNS TABLE (
  id uuid,
  user_id text,
  "desc" text,
  img text,
  created_at timestamp with time zone,
  like_count bigint,
  comment_count bigint,
  hotness_score float
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.user_id,
    p."desc",
    p.img,
    p.created_at,
    COALESCE(l.like_count, 0) AS like_count,
    COALESCE(c.comment_count, 0) AS comment_count,
    -- Hotness formula: 
    -- (Likes * 2) + (Comments * 3) - (Hours since creation * 0.5)
    (
      (COALESCE(l.like_count, 0) * 2.0) + 
      (COALESCE(c.comment_count, 0) * 3.0) - 
      (EXTRACT(EPOCH FROM (now() - p.created_at))/3600.0 * 0.5)
    ) AS hotness_score
  FROM posts p
  LEFT JOIN (
    SELECT post_id, count(*) as like_count FROM post_likes GROUP BY post_id
  ) l ON l.post_id = p.id
  LEFT JOIN (
    SELECT post_id, count(*) as comment_count FROM comments GROUP BY post_id
  ) c ON c.post_id = p.id
  ORDER BY hotness_score DESC;
END;
$$ LANGUAGE plpgsql;
