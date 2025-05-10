export interface User {
  id: string;
  email: string;
  username: string;
  coins: number;
  coinsSpent: number;
  followersGained: number;
  referralCode: string;
  referredBy?: string;
  createdAt: string;
}

export interface SocialProfile {
  id: string;
  userId: string;
  platform: "instagram" | "youtube" | "twitter" | "tiktok" | "linkedin" | "facebook";
  username: string;
  url: string;
  followers: number;
}

export interface Creator {
  id: string;
  username: string;
  coins: number;
  followersGained: number;
  socialProfiles: SocialProfile[];
}

export interface Reel {
  id: string;
  creatorId: string;
  thumbnailUrl: string;
  title: string;
  views: number;
  duration: string;
}

export interface Task {
  id: string;
  creatorId: string;
  platform: SocialProfile["platform"];
  action: "follow" | "like" | "view" | "watch-reel";
  reward: number;
  completionsNeeded: number;
  completionsReceived: number;
  active: boolean;
  createdAt: string;
  bonusReward?: {
    coins: number;
    followers: number;
    requiredCompletions: number;
  };
  reels?: Reel[];
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  followersGained: number;
  position: number;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  referredUsername: string;
  coinsEarned: number;
  createdAt: string;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  icon: string;
  isPremium: boolean;
}