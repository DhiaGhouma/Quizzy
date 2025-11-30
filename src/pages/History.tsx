import React, { useState } from "react";
import { useAppState } from "../state/appContext";
import Navigation from "../components/Navigation";
import { History as HistoryIcon, TrendingUp, Trophy, Target, Clock, Zap, Calendar } from "lucide-react";

const History: React.FC = () => {
    const { gameHistory, userStats } = useAppState();
    const [sortBy, setSortBy] = useState<"date" | "score">("date");

    const sortedHistory = [...gameHistory].sort((a, b) => {
        if (sortBy === "date") {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
            return b.score - a.score;
        }
    });

    const winRate = userStats.totalGames > 0
        ? ((userStats.totalWins / userStats.totalGames) * 100).toFixed(1)
        : 0;

    return (
        <div className="min-h-screen pb-24 md:pb-8 md:pt-24">
            <Navigation />

            <div className="container max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12 animate-slide-up">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                            <HistoryIcon size={32} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">Game History</h1>
                    <p className="text-xl text-white/60">
                        Track your performance and progress
                    </p>
                </div>

                {/* Stats Dashboard */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    <div className="card-dark card text-center">
                        <div className="flex justify-center mb-2">
                            <Target className="text-purple-400" size={24} />
                        </div>
                        <div className="text-3xl font-black gradient-text mb-1">
                            {userStats.totalGames}
                        </div>
                        <div className="text-xs text-white/60 font-semibold">Total Games</div>
                    </div>

                    <div className="card-dark card text-center">
                        <div className="flex justify-center mb-2">
                            <Trophy className="text-yellow-400" size={24} />
                        </div>
                        <div className="text-3xl font-black gradient-text mb-1">
                            {winRate}%
                        </div>
                        <div className="text-xs text-white/60 font-semibold">Win Rate</div>
                    </div>

                    <div className="card-dark card text-center">
                        <div className="flex justify-center mb-2">
                            <TrendingUp className="text-green-400" size={24} />
                        </div>
                        <div className="text-3xl font-black gradient-text mb-1">
                            {userStats.averageScore.toFixed(0)}%
                        </div>
                        <div className="text-xs text-white/60 font-semibold">Avg Score</div>
                    </div>

                    <div className="card-dark card text-center">
                        <div className="flex justify-center mb-2">
                            <Zap className="text-orange-400" size={24} />
                        </div>
                        <div className="text-3xl font-black gradient-text mb-1">
                            {userStats.currentStreak}
                        </div>
                        <div className="text-xs text-white/60 font-semibold">Current Streak</div>
                    </div>
                </div>

                {/* Sort Controls */}
                {gameHistory.length > 0 && (
                    <div className="flex items-center justify-between mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                        <h2 className="text-2xl font-black">Match History</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSortBy("date")}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${sortBy === "date"
                                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                                        : "bg-white/5 text-white/60 hover:bg-white/10"
                                    }`}
                            >
                                <Calendar size={16} className="inline mr-2" />
                                Date
                            </button>
                            <button
                                onClick={() => setSortBy("score")}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${sortBy === "score"
                                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                                        : "bg-white/5 text-white/60 hover:bg-white/10"
                                    }`}
                            >
                                <Trophy size={16} className="inline mr-2" />
                                Score
                            </button>
                        </div>
                    </div>
                )}

                {/* Game History List */}
                {sortedHistory.length > 0 ? (
                    <div className="space-y-4">
                        {sortedHistory.map((game, index) => {
                            const scorePercent = (game.score / game.totalQuestions) * 100;
                            const medal = game.rank === 1 ? "🥇" : game.rank === 2 ? "🥈" : game.rank === 3 ? "🥉" : null;
                            const performanceBadge =
                                scorePercent >= 90 ? { label: "Excellent", color: "#10b981" } :
                                    scorePercent >= 70 ? { label: "Good", color: "#06b6d4" } :
                                        scorePercent >= 50 ? { label: "Average", color: "#f59e0b" } :
                                            { label: "Needs Work", color: "#ef4444" };

                            return (
                                <div
                                    key={game.id}
                                    className="card card-interactive"
                                    style={{
                                        animationDelay: `${0.3 + index * 0.05}s`,
                                        animation: "slideUp 0.5s ease-out both"
                                    }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        {/* Quiz Icon & Info */}
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="text-5xl">{game.quiz.emoji || "🎯"}</div>
                                            <div className="flex-1">
                                                <h3 className="font-black text-xl mb-1">{game.quiz.title}</h3>
                                                <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        {new Date(game.date).toLocaleDateString()}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={14} />
                                                        {Math.floor(game.timeSpent / 60)}m {game.timeSpent % 60}s
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center gap-6">
                                            {/* Rank */}
                                            <div className="text-center">
                                                <div className="text-3xl mb-1">{medal || "🎯"}</div>
                                                <div className="text-xs text-white/60 font-semibold">
                                                    Rank #{game.rank}
                                                </div>
                                            </div>

                                            {/* Score */}
                                            <div className="text-center">
                                                <div className="text-3xl font-black gradient-text mb-1">
                                                    {scorePercent.toFixed(0)}%
                                                </div>
                                                <div className="text-xs text-white/60 font-semibold">
                                                    {game.score}/{game.totalQuestions}
                                                </div>
                                            </div>

                                            {/* XP */}
                                            <div className="text-center">
                                                <div className="text-2xl font-black text-green-400 mb-1">
                                                    +{game.xpEarned}
                                                </div>
                                                <div className="text-xs text-white/60 font-semibold">XP</div>
                                            </div>

                                            {/* Performance Badge */}
                                            <div
                                                className="px-3 py-1 rounded-full text-xs font-bold"
                                                style={{
                                                    background: `${performanceBadge.color}30`,
                                                    color: performanceBadge.color
                                                }}
                                            >
                                                {performanceBadge.label}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4">
                                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${scorePercent}%`,
                                                    background: `linear-gradient(90deg, ${performanceBadge.color}, ${performanceBadge.color}dd)`
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="card text-center py-16 animate-scale-in">
                        <div className="text-7xl mb-6">📊</div>
                        <h3 className="text-3xl font-black mb-3">No Games Played Yet</h3>
                        <p className="text-xl text-white/60 mb-6">
                            Start playing to build your game history!
                        </p>
                        <button
                            onClick={() => window.location.href = "/"}
                            className="btn btn-primary btn-lg"
                        >
                            Play Your First Game
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
