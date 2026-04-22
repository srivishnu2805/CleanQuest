# CleanQuest: Full-Stack Architecture Plan

Transforming the CleanQuest frontend prototype into a functional full-stack application using **Next.js 15**, **Clerk**, **Firebase (Firestore)**, and **UploadThing**.

## 1. Core Tech Stack
- **Framework:** Next.js 15 (App Router, Server Actions)
- **Auth:** Clerk (Authentication & User Management)
- **Database:** Firebase Firestore (NoSQL for posts, users, comments)
- **File Storage:** UploadThing (Image/Video uploads)
- **Styling:** Tailwind CSS (Vanilla)

## 2. Database Schema (Firestore Collections)

### `users`
- `clerkId` (string, document ID)
- `username` (string)
- `avatar` (string)
- `displayName` (string)
- `description` (string)
- `work` (string)
- `school` (string)
- `points` (number)
- `createdAt` (timestamp)

### `posts`
- `userId` (string, Clerk ID)
- `desc` (string)
- `img` (string, UploadThing URL)
- `likes` (array of userId)
- `createdAt` (timestamp)

### `comments`
- `postId` (string)
- `userId` (string)
- `desc` (string)
- `createdAt` (timestamp)

### `stories`
- `userId` (string)
- `img` (string)
- `createdAt` (timestamp) (Expires after 24h)

## 3. Implementation Roadmap

### Phase 1: User Synchronization
- Create a `syncUser` server action to ensure every Clerk user has a corresponding Firestore `user` document.
- Trigger this sync in the root layout or homepage.

### Phase 2: Data Operations (Server Actions)
- `createPost`: Upload image to UploadThing, then save post to Firestore.
- `fetchFeed`: Retrieve latest posts from Firestore, ordered by `createdAt`.
- `addComment`: Save comment linked to a specific `postId`.
- `toggleLike`: Add/remove `userId` from a post's `likes` array.
- `updateUserPoints`: Increment points on the user document for leaderboard calculation.

### Phase 3: Dynamic Components
- **AddPost:** Connect textarea and UploadThing to `createPost` action.
- **Feed/Post:** Replace static data with Firestore streams or server-side fetches.
- **Comments:** Fetch and display real comments for each post.
- **Leaderboard:** Query `users` collection, ordered by `points` descending.

### Phase 4: Media Uploads
- Configure UploadThing in `src/app/api/uploadthing/route.ts`.
- Integrate `UploadButton` in `AddPost`.

## 4. Security & Safety
- Use Firebase Server-Side SDK for secure operations.
- Protect all server actions with Clerk's `auth()` to ensure only logged-in users can interact.
- Implement Firestore Security Rules (if using client SDK) or maintain strict server-side control.
