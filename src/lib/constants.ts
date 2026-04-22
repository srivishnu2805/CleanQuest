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
