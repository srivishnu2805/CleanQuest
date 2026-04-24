-- ============================================
-- Comment Likes Table + RLS
-- Run this in Supabase SQL Editor
-- ============================================

CREATE TABLE comment_likes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  user_id text REFERENCES users(clerk_id),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(comment_id, user_id)
);

-- Performance indexes
CREATE INDEX idx_comment_likes_comment_id ON comment_likes (comment_id);
CREATE INDEX idx_comment_likes_user_id ON comment_likes (user_id);

-- RLS
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "comment_likes_select_public" ON comment_likes
  FOR SELECT USING (true);

CREATE POLICY "comment_likes_insert_own" ON comment_likes
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "comment_likes_delete_own" ON comment_likes
  FOR DELETE USING (user_id = auth.uid()::text);

CREATE POLICY "comment_likes_service_role" ON comment_likes
  FOR ALL USING (auth.role() = 'service_role');
