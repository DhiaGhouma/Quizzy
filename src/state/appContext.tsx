import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, Player, Quiz, Room, GameState, Lang, Achievement, GameHistory, UserStats } from "../types";
import { defaultAchievements } from "../data/achievements";

interface AppState {
    lang: Lang;
    setLang: (l: Lang) => void;
    user: User;
    setUser: (u: User) => void;
    room: Room | null;
    setRoom: (r: Room | null) => void;
    players: Player[];
    setPlayers: (p: Player[]) => void;
    roomCode: string;
    setRoomCode: (c: string) => void;
    gameState: GameState | null;
    setGameState: (g: GameState | null) => void;
    achievements: Achievement[];
    setAchievements: (a: Achievement[]) => void;
    gameHistory: GameHistory[];
    setGameHistory: (h: GameHistory[]) => void;
    userStats: UserStats;
    setUserStats: (s: UserStats) => void;
    addGameToHistory: (game: GameHistory) => void;
    unlockAchievement: (achievementId: string) => void;
}

const defaultUser: User = { name: "", xp: 0, level: 1, badges: [], avatar: undefined };
const defaultStats: UserStats = {
    totalGames: 0,
    totalWins: 0,
    totalXP: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0,
    winStreak: 0,
    currentStreak: 0
};

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<Lang>("en");
    const [user, setUser] = useState<User>(defaultUser);
    const [room, setRoom] = useState<Room | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const [roomCode, setRoomCode] = useState<string>("");
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
    const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
    const [userStats, setUserStats] = useState<UserStats>(defaultStats);

    // Load from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("quizzy_user");
        const savedAchievements = localStorage.getItem("quizzy_achievements");
        const savedHistory = localStorage.getItem("quizzy_history");
        const savedStats = localStorage.getItem("quizzy_stats");

        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
        if (savedHistory) setGameHistory(JSON.parse(savedHistory));
        if (savedStats) setUserStats(JSON.parse(savedStats));
    }, []);

    // Save to localStorage on changes
    useEffect(() => {
        localStorage.setItem("quizzy_user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem("quizzy_achievements", JSON.stringify(achievements));
    }, [achievements]);

    useEffect(() => {
        localStorage.setItem("quizzy_history", JSON.stringify(gameHistory));
    }, [gameHistory]);

    useEffect(() => {
        localStorage.setItem("quizzy_stats", JSON.stringify(userStats));
    }, [userStats]);

    const addGameToHistory = (game: GameHistory) => {
        setGameHistory(prev => [game, ...prev]);

        // Update stats
        const newStats = { ...userStats };
        newStats.totalGames += 1;
        if (game.rank === 1) {
            newStats.totalWins += 1;
            newStats.currentStreak += 1;
            newStats.winStreak = Math.max(newStats.winStreak, newStats.currentStreak);
        } else {
            newStats.currentStreak = 0;
        }
        newStats.totalXP += game.xpEarned;
        newStats.totalTimeSpent += game.timeSpent;
        newStats.bestScore = Math.max(newStats.bestScore, game.score);
        newStats.averageScore = ((newStats.averageScore * (newStats.totalGames - 1)) + game.score) / newStats.totalGames;

        setUserStats(newStats);

        // Update user XP and level
        const newXP = user.xp + game.xpEarned;
        const newLevel = Math.floor(newXP / 100) + 1;
        setUser({ ...user, xp: newXP, level: newLevel });
    };

    const unlockAchievement = (achievementId: string) => {
        setAchievements(prev => prev.map(a =>
            a.id === achievementId && !a.unlocked
                ? { ...a, unlocked: true, unlockedAt: new Date() }
                : a
        ));
    };

    return (
        <AppContext.Provider value={{
            lang, setLang, user, setUser, room, setRoom, players, setPlayers,
            roomCode, setRoomCode, gameState, setGameState,
            achievements, setAchievements, gameHistory, setGameHistory,
            userStats, setUserStats, addGameToHistory, unlockAchievement
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppState = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppState must be used inside AppProvider");
    return ctx;
};

