-- ============================================
-- CleanQuest — Row Level Security Policies
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_daily_actions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USERS
-- ============================================
-- Anyone can read user profiles
CREATE POLICY "users_select_public" ON users
  FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (clerk_id = auth.uid()::text);

-- Users can insert their own record (sync from Clerk)
CREATE POLICY "users_insert_own" ON users
  FOR INSERT WITH CHECK (clerk_id = auth.uid()::text);

-- Service role bypass for server actions
CREATE POLICY "users_service_role" ON users
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- POSTS
-- ============================================
-- Anyone can read posts (feed is public)
CREATE POLICY "posts_select_public" ON posts
  FOR SELECT USING (true);

-- Users can only create their own posts
CREATE POLICY "posts_insert_own" ON posts
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- Users can only update/delete their own posts
CREATE POLICY "posts_update_own" ON posts
  FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY "posts_delete_own" ON posts
  FOR DELETE USING (user_id = auth.uid()::text);

CREATE POLICY "posts_service_role" ON posts
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- COMMENTS
-- ============================================
CREATE POLICY "comments_select_public" ON comments
  FOR SELECT USING (true);

CREATE POLICY "comments_insert_own" ON comments
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "comments_update_own" ON comments
  FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY "comments_delete_own" ON comments
  FOR DELETE USING (user_id = auth.uid()::text);

CREATE POLICY "comments_service_role" ON comments
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- POST_LIKES
-- ============================================
CREATE POLICY "post_likes_select_public" ON post_likes
  FOR SELECT USING (true);

CREATE POLICY "post_likes_insert_own" ON post_likes
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "post_likes_delete_own" ON post_likes
  FOR DELETE USING (user_id = auth.uid()::text);

CREATE POLICY "post_likes_service_role" ON post_likes
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- USER_FOLLOWS
-- ============================================
CREATE POLICY "user_follows_select_public" ON user_follows
  FOR SELECT USING (true);

-- Users can only manage their own follows
CREATE POLICY "user_follows_insert_own" ON user_follows
  FOR INSERT WITH CHECK (follower_id = auth.uid()::text);

CREATE POLICY "user_follows_delete_own" ON user_follows
  FOR DELETE USING (follower_id = auth.uid()::text);

CREATE POLICY "user_follows_service_role" ON user_follows
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- USER_BLOCKS
-- ============================================
-- Only the blocker can see their own blocks
CREATE POLICY "user_blocks_select_own" ON user_blocks
  FOR SELECT USING (blocker_id = auth.uid()::text);

CREATE POLICY "user_blocks_insert_own" ON user_blocks
  FOR INSERT WITH CHECK (blocker_id = auth.uid()::text);

CREATE POLICY "user_blocks_delete_own" ON user_blocks
  FOR DELETE USING (blocker_id = auth.uid()::text);

CREATE POLICY "user_blocks_service_role" ON user_blocks
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- STORIES
-- ============================================
CREATE POLICY "stories_select_public" ON stories
  FOR SELECT USING (true);

CREATE POLICY "stories_insert_own" ON stories
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "stories_delete_own" ON stories
  FOR DELETE USING (user_id = auth.uid()::text);

CREATE POLICY "stories_service_role" ON stories
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- NOTIFICATIONS
-- ============================================
-- Users can only read their own notifications
CREATE POLICY "notifications_select_own" ON notifications
  FOR SELECT USING (receiver_id = auth.uid()::text);

-- Any authenticated user can send notifications
CREATE POLICY "notifications_insert_auth" ON notifications
  FOR INSERT WITH CHECK (sender_id = auth.uid()::text);

-- Users can update (mark as read) their own notifications
CREATE POLICY "notifications_update_own" ON notifications
  FOR UPDATE USING (receiver_id = auth.uid()::text);

CREATE POLICY "notifications_service_role" ON notifications
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- EVENTS
-- ============================================
CREATE POLICY "events_select_public" ON events
  FOR SELECT USING (true);

CREATE POLICY "events_insert_own" ON events
  FOR INSERT WITH CHECK (organizer_id = auth.uid()::text);

CREATE POLICY "events_update_own" ON events
  FOR UPDATE USING (organizer_id = auth.uid()::text);

CREATE POLICY "events_delete_own" ON events
  FOR DELETE USING (organizer_id = auth.uid()::text);

CREATE POLICY "events_service_role" ON events
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- EVENT_ATTENDEES
-- ============================================
CREATE POLICY "event_attendees_select_public" ON event_attendees
  FOR SELECT USING (true);

CREATE POLICY "event_attendees_insert_own" ON event_attendees
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "event_attendees_delete_own" ON event_attendees
  FOR DELETE USING (user_id = auth.uid()::text);

CREATE POLICY "event_attendees_service_role" ON event_attendees
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- USER_DAILY_ACTIONS
-- ============================================
-- Users can only see their own daily actions
CREATE POLICY "user_daily_actions_select_own" ON user_daily_actions
  FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "user_daily_actions_insert_own" ON user_daily_actions
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "user_daily_actions_update_own" ON user_daily_actions
  FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY "user_daily_actions_service_role" ON user_daily_actions
  FOR ALL USING (auth.role() = 'service_role');
