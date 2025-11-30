import React, { useState } from "react";
import { useAppState } from "../state/appContext";
import Navigation from "../components/Navigation";
import { Trophy, Lock, CheckCircle, Filter } from "lucide-react";

const Achievements: React.FC = () => {
    const { achievements } = useAppState();
    const [filter, setFilter] = useState<string>("all");

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;
    const progressPercent = (unlockedCount / totalCount) * 100;

    const categories = ["all", "beginner", "expert", "social", "speed", "master"];

    const filteredAchievements = filter === "all"
        ? achievements
        : achievements.filter(a => a.category === filter);

    return (
        <div className="min-h-screen pb-24 md:pb-8 md:pt-24">
            <Navigation />

            <div className="container max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12 animate-slide-up">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                            <Trophy size={32} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black gradient-text mb-4">Achievements</h1>
                    <p className="text-xl text-white/60">
                        Unlock badges by completing challenges
                    </p>
                </div>

                {/* Progress Overview */}
                <div className="card mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Circular Progress */}
                        <div className="relative w-40 h-40">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="12"
                                    fill="none"
                                />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    stroke="url(#gradient)"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 70}`}
                                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - progressPercent / 100)}`}
                                    strokeLinecap="round"
                                    style={{ transition: "stroke-dashoffset 1s ease-out" }}
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#7c3aed" />
                                        <stop offset="100%" stopColor="#d946ef" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-3xl font-black gradient-text">{unlockedCount}</div>
                                    <div className="text-xs text-white/60">of {totalCount}</div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-black mb-2">
                                {progressPercent.toFixed(0)}% Complete
                            </h2>
                            <p className="text-white/60 mb-4">
                                You've unlocked {unlockedCount} out of {totalCount} achievements
                            </p>
                            <div className="progress-bar">
                                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <Filter size={20} className="text-white/60 flex-shrink-0" />
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all duration-300 ${filter === cat
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Achievement Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredAchievements.map((achievement, index) => {
                        const hasProgress = achievement.maxProgress !== undefined;
                        const progress = hasProgress
                            ? ((achievement.progress || 0) / (achievement.maxProgress || 1)) * 100
                            : achievement.unlocked ? 100 : 0;

                        return (
                            <div
                                key={achievement.id}
                                className={`card relative overflow-hidden ${achievement.unlocked ? "card-interactive" : ""
                                    }`}
                                style={{
                                    animationDelay: `${0.3 + index * 0.05}s`,
                                    animation: "scaleIn 0.5s ease-out both"
                                }}
                            >
                                {/* Background glow for unlocked */}
                                {achievement.unlocked && (
                                    <div
                                        className="absolute inset-0 opacity-20"
                                        style={{
                                            background: `radial-gradient(circle at 50% 50%, ${achievement.color} 0%, transparent 70%)`
                                        }}
                                    />
                                )}

                                {/* Shimmer effect for locked */}
                                {!achievement.unlocked && (
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                                        style={{ animation: "shimmer 3s infinite" }}
                                    />
                                )}

                                <div className="relative flex items-start gap-4">
                                    {/* Icon */}
                                    <div
                                        className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 transition-all duration-300 ${achievement.unlocked
                                                ? "shadow-lg"
                                                : "grayscale opacity-50"
                                            }`}
                                        style={{
                                            background: achievement.unlocked
                                                ? `${achievement.color}40`
                                                : "rgba(255,255,255,0.05)"
                                        }}
                                    >
                                        {achievement.unlocked ? achievement.icon : <Lock size={24} className="text-white/30" />}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className={`font-black text-lg ${achievement.unlocked ? "" : "text-white/50"
                                                }`}>
                                                {achievement.title}
                                            </h3>
                                            {achievement.unlocked && (
                                                <CheckCircle
                                                    size={20}
                                                    className="flex-shrink-0"
                                                    style={{ color: achievement.color }}
                                                />
                                            )}
                                        </div>

                                        <p className={`text-sm mb-3 ${achievement.unlocked ? "text-white/70" : "text-white/40"
                                            }`}>
                                            {achievement.description}
                                        </p>

                                        {/* Progress bar for progressive achievements */}
                                        {hasProgress && (
                                            <div>
                                                <div className="flex items-center justify-between text-xs mb-1">
                                                    <span className="text-white/50">Progress</span>
                                                    <span className="text-white/50">
                                                        {achievement.progress || 0}/{achievement.maxProgress}
                                                    </span>
                                                </div>
                                                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-500"
                                                        style={{
                                                            width: `${progress}%`,
                                                            background: achievement.unlocked
                                                                ? `linear-gradient(90deg, ${achievement.color}, ${achievement.color}dd)`
                                                                : "rgba(255,255,255,0.2)"
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Unlock date */}
                                        {achievement.unlocked && achievement.unlockedAt && (
                                            <p className="text-xs text-white/40 mt-2">
                                                Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty state */}
                {filteredAchievements.length === 0 && (
                    <div className="card text-center py-12">
                        <div className="text-6xl mb-4">🏆</div>
                        <h3 className="text-xl font-black mb-2">No Achievements Found</h3>
                        <p className="text-white/60">Try a different filter</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Achievements;
