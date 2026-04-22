# CleanQuest 🌿 | Full-Stack University Sustainability Network

**CleanQuest** is a production-ready, gamified social media platform designed for university-scale sustainability. Built with **Next.js 15**, it transforms individual environmental actions into a collective campus movement.

---

### 🚀 Technical Excellence
*   **Next.js 15 (App Router)**: Utilizing Server Actions, Suspense, and PPR for industry-leading speed.
*   **Scale-First Database**: Powered by **Supabase (PostgreSQL)** with optimized indexing for 500+ concurrent users.
*   **Robust Security**: Input validation via **Zod** and secure **Clerk** authentication.
*   **Instagram-Inspired UX**: Modern, responsive UI with centered feed and localized loading skeletons.

---

### 🎮 Gamification & Action Taxonomy
Users earn **Impact Points** based on their contribution type. Points are calculated server-side to prevent gaming the system:

| Action | Points | Impact |
| :--- | :--- | :--- |
| **New Post** | 10 pts | Verified physical cleaning/initiative |
| **New Story** | 5 pts | Quick visual impact update |
| **Comment** | 2 pts | Community engagement & advice |
| **Follow** | 1 pt | Network growth |

---

### 📊 Campus Impact Dashboard
The integrated analytics layer tracks aggregate campus performance:
- **Total Actions**: Real-time count of all sustainability contributions.
- **Estimated CO₂ Offset**: Automated calculation (0.5kg per action) to provide tangible metrics for university administration.
- **Monthly Goals**: Visual progress bars to drive campus-wide participation.

---

### 🛠️ Production-Ready Setup

#### 1. Environment Configuration
Create a `.env.local` file:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
UPLOADTHING_TOKEN=...
```

#### 2. Complete Database Schema
Run this in your **Supabase SQL Editor** to initialize the full system:

```sql
-- 1. Users Table
create table users (
  id uuid default gen_random_uuid() primary key,
  clerk_id text unique not null,
  username text unique,
  avatar text,
  display_name text,
  description text,
  work text,
  school text,
  points int default 0,
  following text[] default '{}',
  followers text[] default '{}',
  blocked text[] default '{}',
  created_at timestamp with time zone default now()
);

-- 2. Posts Table
create table posts (
  id uuid default gen_random_uuid() primary key,
  user_id text references users(clerk_id),
  "desc" text,
  img text,
  likes text[] default '{}',
  created_at timestamp with time zone default now()
);

-- 3. Comments Table
create table comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade,
  user_id text references users(clerk_id),
  "desc" text,
  created_at timestamp with time zone default now()
);

-- 4. Stories Table
create table stories (
  id uuid default gen_random_uuid() primary key,
  user_id text references users(clerk_id),
  img text not null,
  created_at timestamp with time zone default now()
);

-- 5. Notifications Table
create table notifications (
  id uuid default gen_random_uuid() primary key,
  sender_id text references users(clerk_id),
  receiver_id text references users(clerk_id),
  action text not null,
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

-- Performance Indexes
create index idx_posts_created_at on posts (created_at desc);
create index idx_users_clerk_id on users (clerk_id);
create index idx_posts_user_id on posts (user_id);
create index idx_notifications_receiver_id on notifications (receiver_id);
```

---

### 🛣️ Scaling Roadmap
For deployment beyond 1,000 users, the following architectural upgrades are recommended:
1.  **Junction Tables**: Migrate `following/followers` from `text[]` arrays to a dedicated `user_follows` table.
2.  **Supabase Realtime**: Implement `supabase.channel()` for instant notification delivery without polling.
3.  **Admin Verification**: Add an admin flag to users for post approval to ensure point credibility.

---
**CleanQuest: Technology for a Greener Tomorrow.**
