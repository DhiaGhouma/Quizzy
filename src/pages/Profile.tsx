import React, { useState } from "react";
import { useAppState } from "../state/appContext";
import Navigation from "../components/Navigation";
import { Edit2, Trophy, Target, Zap, Award, TrendingUp, Clock } from "lucide-react";

const Profile: React.FC = () => {
    const { user, setUser, achievements, gameHistory, userStats } = useAppState();
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(user.name || "Guest Player");

    const unlockedAchievements = achievements.filter(a => a.unlocked);
    const recentGames = gameHistory.slice(0, 5);
    const xpToNextLevel = ((user.level) * 100) - user.xp;
    const xpProgress = (user.xp % 100);

    const handleSaveName = () => {
        setUser({ ...user, name: tempName });
        setIsEditingName(false);
    };

    const avatarEmojis = ["😎", "🎮", "🚀", "⚡", "🔥", "💎", "🌟", "🎯", "👑", "🦄"];

    return (
        <div className="min-h-screen pb-24 md:pb-8 md:pt-24">
            <Navigation />

            <div className="container max-w-6xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="card mb-8 animate-slide-up">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl border-4 border-white/20 shadow-xl">
                                {user.avatar || "🎮"}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-black text-white border-4 border-[#0f0b1f] shadow-lg">
                                {user.level}
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left">
                            {isEditingName ? (
                                <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                                    <input
                                        type="text"
                                        value={tempName}
                                        onChange={(e) => setTempName(e.target.value)}
                                        className="input max-w-xs"
                                        autoFocus
                                    />
                                    <button onClick={handleSaveName} className="btn btn-primary btn-sm">
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                                    <h1 className="text-4xl font-black gradient-text">
                                        {user.name || "Guest Player"}
                                    </h1>
                                    <button
                                        onClick={() => setIsEditingName(true)}
                                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <Edit2 size={20} className="text-white/60" />
                                    </button>
                                </div>
                            )}

                            {/* XP Progress */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-white/60 font-semibold">Level {user.level}</span>
                                    <span className="text-white/60 font-semibold">
                                        {xpProgress}/100 XP
                                    </span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-bar-fill" style={{ width: `${xpProgress}%` }} />
                                </div>
                                <p className="text-xs text-white/50 mt-1">{xpToNextLevel} XP to next level</p>
                            </div>

                            {/* Quick Stats */}
                            <div className="flex gap-6 justify-center md:justify-start">
                                <div>
                                    <div className="text-2xl font-black gradient-text">{userStats.totalGames}</div>
                                    <div className="text-xs text-white/60 font-semibold">Games</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black gradient-text">{userStats.totalWins}</div>
                                    <div className="text-xs text-white/60 font-semibold">Wins</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black gradient-text">{unlockedAchievements.length}</div>
                                    <div className="text-xs text-white/60 font-semibold">Achievements</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Avatar Selection */}
                <div className="card mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                        <Zap className="text-yellow-400" size={24} />
                        Choose Avatar
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {avatarEmojis.map((emoji) => (
                            <button
                                key={emoji}
                                onClick={() => setUser({ ...user, avatar: emoji })}
                                className={`w-16 h-16 rounded-xl text-3xl flex items-center justify-center transition-all duration-300 ${user.avatar === emoji
                                        ? "bg-gradient-to-br from-purple-500 to-pink-500 scale-110 shadow-lg"
                                        : "bg-white/5 hover:bg-white/10 hover:scale-105"
                                    }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Stats Section */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black gradient-text flex items-center gap-3">
                            <TrendingUp size={28} />
                            Statistics
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="card-dark card">
                                <div className="flex items-center gap-3 mb-2">
                                    <Target className="text-cyan-400" size={20} />
                                    <span className="text-white/60 text-sm font-semibold">Avg Score</span>
                                </div>
                                <div className="text-3xl font-black gradient-text">
                                    {userStats.averageScore.toFixed(1)}%
                                </div>
                            </div>

                            <div className="card-dark card">
                                <div className="flex items-center gap-3 mb-2">
                                    <Trophy className="text-yellow-400" size={20} />
                                    <span className="text-white/60 text-sm font-semibold">Best Score</span>
                                </div>
                                <div className="text-3xl font-black gradient-text">
                                    {userStats.bestScore}%
                                </div>
                            </div>

                            <div className="card-dark card">
                                <div className="flex items-center gap-3 mb-2">
                                    <Zap className="text-orange-400" size={20} />
                                    <span className="text-white/60 text-sm font-semibold">Win Streak</span>
                                </div>
                                <div className="text-3xl font-black gradient-text">
                                    {userStats.winStreak}
                                </div>
                            </div>

                            <div className="card-dark card">
                                <div className="flex items-center gap-3 mb-2">
                                    <Clock className="text-purple-400" size={20} />
                                    <span className="text-white/60 text-sm font-semibold">Time Played</span>
                                </div>
                                <div className="text-3xl font-black gradient-text">
                                    {Math.floor(userStats.totalTimeSpent / 60)}m
                                </div>
                            </div>
                        </div>

                        {/* Recent Achievements */}
                        <div className="card-dark card">
                            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                                <Award className="text-purple-400" size={20} />
                                Recent Achievements
                            </h3>
                            {unlockedAchievements.length > 0 ? (
                                <div className="space-y-3">
                                    {unlockedAchievements.slice(0, 3).map((achievement) => (
                                        <div
                                            key={achievement.id}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                                        >
                                            <div
                                                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                                                style={{ background: achievement.color + "30" }}
                                            >
                                                {achievement.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-sm">{achievement.title}</div>
                                                <div className="text-xs text-white/50">{achievement.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-white/50 text-center py-4">
                                    Play games to unlock achievements!
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Recent Games */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black gradient-text flex items-center gap-3">
                            <Target size={28} />
                            Recent Games
                        </h2>

                        {recentGames.length > 0 ? (
                            <div className="space-y-4">
                                {recentGames.map((game) => {
                                    const scorePercent = (game.score / game.totalQuestions) * 100;
                                    const medal = game.rank === 1 ? "🥇" : game.rank === 2 ? "🥈" : game.rank === 3 ? "🥉" : "🎯";

                                    return (
                                        <div key={game.id} className="card-dark card">
                                            <div className="flex items-center gap-4">
                                                <div className="text-4xl">{game.quiz.emoji || medal}</div>
                                                <div className="flex-1">
                                                    <div className="font-black text-lg mb-1">{game.quiz.title}</div>
                                                    <div className="flex items-center gap-4 text-sm text-white/60">
                                                        <span>Rank #{game.rank}</span>
                                                        <span>•</span>
                                                        <span>{scorePercent.toFixed(0)}% Score</span>
                                                        <span>•</span>
                                                        <span className="text-green-400">+{game.xpEarned} XP</span>
                                                    </div>
                                                </div>
                                                <div className="text-3xl">{medal}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="card-dark card text-center py-12">
                                <div className="text-6xl mb-4">🎮</div>
                                <h3 className="text-xl font-black mb-2">No Games Yet</h3>
                                <p className="text-white/60">Start playing to see your game history!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
