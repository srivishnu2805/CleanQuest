# CleanQuest 🌿 | Full-Stack Gamified Campus Sustainability Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)

**A production-ready, modern social platform that transforms individual sustainability actions into a collective campus movement through gamification, real-time analytics, and social engagement.**

[Live Demo](#) · [Architecture](#-system-architecture) · [Features](#-feature-highlights) · [Setup](#%EF%B8%8F-production-ready-setup)

</div>

---

## 🎯 Project Overview

CleanQuest is a **modern, impact-driven social ecosystem** purpose-built for university-scale sustainability initiatives. It combines a modern, responsive social feed with a **server-side gamification engine**, **achievement badge system**, and **real-time analytics dashboard** — all built with cutting-edge web technologies.

### Why This Project Stands Out (Senior-Level Features):
- **Full-Stack Complexity**: 30+ React components, 20+ Server Actions, 12+ database tables
- **Security First**: 100% Supabase Row Level Security (RLS) across all tables, preventing unauthorized mutations.
- **Innovative Story System**: Dynamic story feed featuring high-impact "Community Spotlights" (Impact HQ & Global Quest) as fallback when user activity is low.
- **Real-Time Data**: Implemented Supabase Realtime WebSockets for instant feed updates.
- **Algorithmic Ranking**: Advanced PostgreSQL function `get_ranked_posts` calculating a "Hotness Score" based on engagement and time decay.
- **Testing & CI/CD**: Playwright End-to-End (E2E) testing integrated with a GitHub Actions CI pipeline.
- **Modern Social Graph**: Real follow/unfollow/block with suggested users feed.
- **Production Patterns**: Request memoization, optimistic UI, infinite scroll, Zod validation.
- **Gamification Engine**: Server-side point system with daily caps, 8 achievement badges, streak tracking.

---

## ✨ Feature Highlights

### 🏠 Social Feed & Stories (Real-Time)
- **Disappearing Stories**: 24-hour awareness updates with gradient ring indicators.
- **Community Spotlights**: Professional fallback stories (Impact HQ & Global Quest) ensure the feed always looks active and inspiring.
- **Infinite Scroll**: Seamless feed browsing with `IntersectionObserver` API.
- **Optimistic Interactions**: Instant likes/follows with server-side persistence and rollback handling.
- **Comment Threads**: Real-time comments with dedicated "Comment Likes" support.
- **Image Uploads**: High-performance uploads via UploadThing with drag-and-drop support.

### 👥 Social Graph
- **Follow/Unfollow**: Real database-backed follow system with optimistic UI.
- **Block/Unblock**: Blocks hide posts from feed + mutual unfollow.
- **Suggested Users**: Intelligent suggestions (users you don't follow yet, sorted by impact).
- **Profile Actions**: Follow/Block/Report buttons on every profile.

### 📊 Analytics Dashboard (`/dashboard`)
- **Impact Stats**: Real-time tracking of CO₂ offset, actions taken, and progress toward campus goals.
- **Activity Visualization**: CSS-only animated stacked bar charts showing weekly engagement across posts, likes, and comments.
- **Streak Tracker**: Gamified visualization of consecutive active days.
- **Impact Leaderboard**: Live ranking of top sustainability contributors.

### 🏅 Achievement Badge System
8 badges across 4 tiers (Bronze → Platinum), calculated server-side:

| Badge | Requirement | Tier |
| :--- | :--- | :--- |
| 🌱 First Step | Create 1 post | Bronze |
| 💯 Century Mark | 100 impact points | Bronze |
| 🌿 Consistent Contributor | 10 posts | Silver |
| 🦋 Social Butterfly | 25 comments | Silver |
| ⚡ Impact Leader | 500 points | Silver |
| 🌳 Eco Champion | 50 posts | Gold |
| 🏆 Sustainability Legend | 1,000 points | Gold |
| 🥇 Podium Finish | Top 3 leaderboard | Platinum |

### 🎮 Gamification Engine
Server-side point system with anti-gaming daily caps:

| Action | Points | Daily Cap |
| :--- | :--- | :--- |
| New Post | 10 pts | 3/day (max 30) |
| New Story | 5 pts | 2/day (max 10) |
| Comment | 2 pts | 5/day (max 10) |
| Follow | 1 pt | 3/day (max 3) |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client Layer                      │
│  Next.js 15 App Router + React 19 + Tailwind CSS    │
│  ┌──────────┐ ┌──────────┐ ┌───────────────┐       │
│  │   Feed   │ │Dashboard │ │   Profile +   │       │
│  │(Infinite │ │(Charts + │ │  Follow/Block │       │
│  │ Scroll)  │ │ Badges)  │ │   Actions     │       │
│  └──────────┘ └──────────┘ └───────────────┘       │
├─────────────────────────────────────────────────────┤
│                   Server Layer                       │
│  Next.js Server Actions + Request Memoization        │
│  ┌──────────┐ ┌──────────┐ ┌───────────────┐       │
│  │  Zod     │ │ Gamifi-  │ │  Social Graph │       │
│  │Validation│ │ cation   │ │  (Follow /    │       │
│  │ Schemas  │ │  Engine  │ │  Block / Rec) │       │
│  └──────────┘ └──────────┘ └───────────────┘       │
├─────────────────────────────────────────────────────┤
│                   Data Layer                         │
│  ┌───────────────────┐  ┌──────────────────┐        │
│  │     Supabase      │  │   UploadThing    │        │
│  │   (PostgreSQL)    │  │ (File Storage)   │        │
│  │  - users          │  └──────────────────┘        │
│  │  - posts          │  ┌──────────────────┐        │
│  │  - comments       │  │      Clerk       │        │
│  │  - post_likes     │  │ (Authentication) │        │
│  │  - user_follows   │  │ - OAuth / Email  │        │
│  │  - user_blocks    │  │ - User Sync      │        │
│  │  - stories        │  └──────────────────┘        │
│  └───────────────────┘                              │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Production-Ready Setup

### 1. Environment Configuration
Create a `.env.local` file:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
UPLOADTHING_TOKEN=...
```

### 2. Database Schema
Comprehensive SQL schemas for tables, RLS policies, and ranked feed functions are located in the `supabase/` directory.

### 3. Install & Run
```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 🔑 Key Server Actions

| Action | Description |
| :--- | :--- |
| `getStories` | Fetches active user stories or innovative "Community Spotlights" |
| `addStory` | Creates a new 24h story and awards points |
| `getUserDashboardStats` | Aggregates impact analytics with high-concurrency parallel queries |
| `getPosts` | High-performance feed fetching with block-filtering |
| `toggleCommentLike` | Dedicated database persistence for comment engagement |

---

<div align="center">

**Built with ❤️ for a greener campus.**

</div>
