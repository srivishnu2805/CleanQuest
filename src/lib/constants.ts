// --- 🎮 GAMIFICATION CONSTANTS ---
export const POINT_SYSTEM = {
  POST: { points: 10, cap: 3 },    // Max 30 pts/day from posts
  STORY: { points: 5, cap: 2 },    // Max 10 pts/day from stories
  COMMENT: { points: 2, cap: 5 },  // Max 10 pts/day from comments
  FOLLOW: { points: 1, cap: 3 },   // Max 3 pts/day from follows
};

// --- 📊 CO2 IMPACT WEIGHTS (kg per action) ---
export const CO2_WEIGHTS = {
  POST: 1.2,    // Physical sustainability action reported
  EVENT: 2.5,   // Participation in campus drives
  STORY: 0.2,   // Quick awareness update
  COMMENT: 0,   // Digital engagement only
  FOLLOW: 0,
};

// --- 🏅 ACHIEVEMENT BADGES ---
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: { type: string; value: number };
  tier: "bronze" | "silver" | "gold" | "platinum";
}

export const BADGES: Badge[] = [
  {
    id: "first_post",
    name: "First Step",
    description: "Create your very first sustainability post",
    icon: "🌱",
    requirement: { type: "posts", value: 1 },
    tier: "bronze",
  },
  {
    id: "ten_posts",
    name: "Consistent Contributor",
    description: "Create 10 sustainability posts",
    icon: "🌿",
    requirement: { type: "posts", value: 10 },
    tier: "silver",
  },
  {
    id: "fifty_posts",
    name: "Eco Champion",
    description: "Create 50 sustainability posts",
    icon: "🌳",
    requirement: { type: "posts", value: 50 },
    tier: "gold",
  },
  {
    id: "hundred_points",
    name: "Century Mark",
    description: "Accumulate 100 impact points",
    icon: "💯",
    requirement: { type: "points", value: 100 },
    tier: "bronze",
  },
  {
    id: "five_hundred_points",
    name: "Impact Leader",
    description: "Accumulate 500 impact points",
    icon: "⚡",
    requirement: { type: "points", value: 500 },
    tier: "silver",
  },
  {
    id: "thousand_points",
    name: "Sustainability Legend",
    description: "Accumulate 1000 impact points",
    icon: "🏆",
    requirement: { type: "points", value: 1000 },
    tier: "gold",
  },
  {
    id: "social_butterfly",
    name: "Social Butterfly",
    description: "Leave 25 comments on posts",
    icon: "🦋",
    requirement: { type: "comments", value: 25 },
    tier: "silver",
  },
  {
    id: "top_three",
    name: "Podium Finish",
    description: "Reach the top 3 on the leaderboard",
    icon: "🥇",
    requirement: { type: "leaderboard", value: 3 },
    tier: "platinum",
  },
];

export const BADGE_TIER_COLORS = {
  bronze: { bg: "bg-amber-100", border: "border-amber-300", text: "text-amber-700", glow: "shadow-amber-200" },
  silver: { bg: "bg-slate-100", border: "border-slate-300", text: "text-slate-600", glow: "shadow-slate-200" },
  gold: { bg: "bg-yellow-100", border: "border-yellow-400", text: "text-yellow-700", glow: "shadow-yellow-200" },
  platinum: { bg: "bg-violet-100", border: "border-violet-400", text: "text-violet-700", glow: "shadow-violet-200" },
};
