export type Lang = "en" | "fr" | "ar";

export interface User {
    name: string;
    xp: number;
    level: number;
    badges: string[];
    avatar?: string;
}

export interface Player extends User {
    score: number;
}

export interface Quiz {
    id: number;
    title: string;
    emoji?: string;
    color: string;
    questions: number;
    players: number;
}

export interface Question {
    q: string;
    options: string[];
    correct: number;
}

export interface Room {
    code: string;
    host: string;
    players: Player[];
    quiz?: Quiz | null;
}

export interface GameState {
    quiz: Quiz;
    currentQuestion: number;
    score: number;
    timeLeft: number;
    answered: boolean;
    selectedAnswer?: number | null;
    finished?: boolean;
}

// Achievement system
export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    unlocked: boolean;
    unlockedAt?: Date;
    progress?: number;
    maxProgress?: number;
    category: "beginner" | "expert" | "social" | "speed" | "master";
}

// Game history
export interface GameHistory {
    id: string;
    date: Date;
    quiz: Quiz;
    score: number;
    totalQuestions: number;
    timeSpent: number;
    rank: number;
    totalPlayers: number;
    xpEarned: number;
}

// Enhanced user stats
export interface UserStats {
    totalGames: number;
    totalWins: number;
    totalXP: number;
    averageScore: number;
    bestScore: number;
    totalTimeSpent: number;
    favoriteCategory?: string;
    winStreak: number;
    currentStreak: number;
}
