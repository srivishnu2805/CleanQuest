# CleanQuest

<div align="center">

![CI Pipeline](https://github.com/srivishnu2805/CleanQuest/actions/workflows/ci.yml/badge.svg)
![CodeQL](https://github.com/srivishnu2805/CleanQuest/actions/workflows/codeql.yml/badge.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)

**A full-stack social platform that turns sustainability actions into measurable campus impact through gamification, real-time feeds, and analytics.**

[Live Demo](#) · [Tech Stack](#tech-stack) · [Architecture](#architecture) · [Setup](#local-setup)

</div>

## Recruiter Snapshot

CleanQuest is a production-style web application built to demonstrate senior-level full-stack engineering patterns in a real product scenario.

### What this project demonstrates
- End-to-end ownership across frontend, backend, database, auth, testing, and CI/CD.
- Product thinking: engagement loops (stories, badges, leaderboard, streaks) tied to measurable impact outcomes.
- Engineering depth: RLS security model, server-side gamification logic, ranked feed algorithm, and real-time updates.
- Delivery rigor: typed APIs, validation, optimistic UI, E2E testing, and GitHub Actions quality gates.

### Scope and complexity
- 30+ React components
- 20+ server actions
- 12+ database tables with Supabase RLS policies
- Real-time feed updates using Supabase channels

## Product Overview

CleanQuest is a campus-first sustainability social network where users post actions, earn points, unlock badges, and compete on impact leaderboards.

Core value loop:
1. Users share actions (posts, stories, comments).
2. The gamification engine awards points with anti-abuse daily caps.
3. Leaderboards and badges increase retention and social motivation.
4. Dashboard visualizes personal and collective environmental impact.

## Feature Highlights

### Social feed and engagement
- Real-time post updates via Supabase Realtime.
- Infinite scrolling feed using IntersectionObserver.
- Story system with 24-hour lifecycle.
- Optimistic UI for likes, follows, and social interactions.
- Comment likes and saved posts persistence.

### Social graph and safety
- Follow and unfollow with real database state.
- Block and unblock flow with feed filtering.
- Suggested users ranked by impact signals.

### Gamification and analytics
- Server-side points engine with daily caps.
- 8-badge achievement system across Bronze to Platinum tiers.
- Streak tracking and activity analytics.
- Live leaderboard for top contributors.

## Tech Stack

- Frontend: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS
- Backend: Next.js Server Actions, Zod validation
- Data: Supabase PostgreSQL, SQL functions, RLS policies
- Auth: Clerk
- File upload: UploadThing
- Testing: Playwright E2E
- CI/CD: GitHub Actions (CI Pipeline + CodeQL)

## Architecture

```text
Client (Next.js + React)
	-> Server Actions (validation, orchestration, caching)
		-> Supabase (PostgreSQL + RLS + SQL ranking functions)
		-> Clerk (authentication and user sync)
		-> UploadThing (media storage)
```

### Notable backend patterns
- `get_ranked_posts` SQL function for engagement + recency ranking.
- Request memoization for expensive profile/dashboard reads.
- Explicit normalization layer for API response shaping.
- Security-first data access through RLS and server-side auth checks.

## Key Engineering Decisions

- Server-side gamification rules prevent easy client-side abuse.
- RLS-first schema design keeps authorization close to data.
- Optimistic UI keeps UX fast while preserving data integrity.
- Fallback stories keep the product experience alive for new/low-activity cohorts.

## Local Setup

### 1. Configure environment
Create `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
UPLOADTHING_TOKEN=...
```

### 2. Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000

### 3. Validate quality

```bash
npm run lint
npm run build
npx playwright test
```

## Database and SQL

The `supabase/` directory includes:
- RLS policies
- ranked feed SQL function
- comment likes and saved posts schema scripts

## Selected Server Actions

| Action | Purpose |
| :--- | :--- |
| `getPosts` | Ranked feed fetch with block filtering and interaction metadata |
| `getUserDashboardStats` | Aggregates analytics and leaderboard metrics |
| `toggleFollow` | Follows/unfollows with social notification behavior |
| `toggleCommentLike` | Persists comment reaction state |
| `addStory` | Creates a 24-hour story and awards points |

## Experienced Engineer Pitch

Designed and shipped a production-style social platform with a server-driven gamification engine, secure RLS data model, ranked feed algorithm, and real-time engagement system. Owned architecture across frontend, backend, SQL, auth, and CI/CD, with quality gates enforced through automated lint/build/test pipelines and code scanning.


---

<div align="center">

Built for impact, shipped with production discipline.

</div>
