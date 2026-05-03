export const POSE_BY_SECTION = [
  "/character/pose-1-hero.png",
  "/character/pose-2-about.png",
  "/character/pose-3-projects.png",
  "/character/pose-4-skills.png",
  "/character/pose-5-education.png",
  "/character/pose-6-blog.png",
  "/character/pose-7-contact.png",
] as const;

export const WALK_FRAMES = [
  "/character/walk-a.png",
  "/character/walk-b.png",
] as const;

export const CHARACTER_CONFIG = {
  walkSwapMs: 200,
  poseFadeMs: 150,
  bounceAmplitudePx: 6,
  bouncePeriodMs: 2400,
  width: 1024,
  height: 1536,
  displayHeightVh: 56,
} as const;
