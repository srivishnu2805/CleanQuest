-- ============================================
-- Saved Posts Table + RLS
-- Run this in Supabase SQL Editor
-- ============================================

CREATE TABLE saved_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id text REFERENCES users(clerk_id),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(post_id, user_id)
);

CREATE INDEX idx_saved_posts_post_id ON saved_posts (post_id);
CREATE INDEX idx_saved_posts_user_id ON saved_posts (user_id);

ALTER TABLE saved_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saved_posts_select_own" ON saved_posts
  FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "saved_posts_insert_own" ON saved_posts
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "saved_posts_delete_own" ON saved_posts
  FOR DELETE USING (user_id = auth.uid()::text);

CREATE POLICY "saved_posts_service_role" ON saved_posts
  FOR ALL USING (auth.role() = 'service_role');
