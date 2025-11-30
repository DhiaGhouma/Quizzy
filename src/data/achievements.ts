import type { Achievement } from "../types";

export const defaultAchievements: Achievement[] = [
    {
        id: "first_steps",
        title: "First Steps",
        description: "Play your first game",
        icon: "🎮",
        color: "#10b981",
        unlocked: false,
        progress: 0,
        maxProgress: 1,
        category: "beginner"
    },
    {
        id: "quick_learner",
        title: "Quick Learner",
        description: "Score 80%+ on your first game",
        icon: "🧠",
        color: "#06b6d4",
        unlocked: false,
        category: "beginner"
    },
    {
        id: "social_butterfly",
        title: "Social Butterfly",
        description: "Play with 5 different people",
        icon: "🦋",
        color: "#d946ef",
        unlocked: false,
        progress: 0,
        maxProgress: 5,
        category: "social"
    },
    {
        id: "speed_demon",
        title: "Speed Demon",
        description: "Answer all questions in under 30 seconds",
        icon: "⚡",
        color: "#f59e0b",
        unlocked: false,
        category: "speed"
    },
    {
        id: "perfect_score",
        title: "Perfect Score",
        description: "Get 100% on any quiz",
        icon: "💯",
        color: "#8b5cf6",
        unlocked: false,
        category: "expert"
    },
    {
        id: "dedicated",
        title: "Dedicated Player",
        description: "Play 10 games",
        icon: "🎯",
        color: "#6366f1",
        unlocked: false,
        progress: 0,
        maxProgress: 10,
        category: "expert"
    },
    {
        id: "expert",
        title: "Expert",
        description: "Play 50 games",
        icon: "🏆",
        color: "#7c3aed",
        unlocked: false,
        progress: 0,
        maxProgress: 50,
        category: "expert"
    },
    {
        id: "master",
        title: "Master",
        description: "Reach level 10",
        icon: "👑",
        color: "#fbbf24",
        unlocked: false,
        progress: 0,
        maxProgress: 10,
        category: "master"
    },
    {
        id: "streak_master",
        title: "Streak Master",
        description: "Win 5 games in a row",
        icon: "🔥",
        color: "#ef4444",
        unlocked: false,
        progress: 0,
        maxProgress: 5,
        category: "master"
    },
    {
        id: "category_king",
        title: "Category King",
        description: "Win in all quiz categories",
        icon: "🌟",
        color: "#a78bfa",
        unlocked: false,
        progress: 0,
        maxProgress: 3,
        category: "master"
    }
];
