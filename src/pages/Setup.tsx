import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppState } from "../state/appContext";
import { Users, Sparkles, Zap } from "lucide-react";
import type { Player } from "../types";

const Setup: React.FC = () => {
    const { user, setUser, setRoom, setPlayers, setRoomCode } = useAppState();
    const [name, setName] = useState(user.name || "");
    const [avatarIndex, setAvatarIndex] = useState<number>(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const joinCode = sessionStorage.getItem("joinRoomCode") || undefined;

    const avatars = ["🚀", "⚡", "🎯", "🔥", "💎", "🌟", "👑", "🎨"];

    const generateRoomCode = () =>
        Math.random().toString(36).substring(2, 8).toUpperCase();

    const handleCreate = () => {
        if (!name.trim()) {
            alert("Please enter a name");
            return;
        }

        const code = generateRoomCode();
        setRoomCode(code);

        const hostPlayer: Player = { name, xp: 0, level: 1, badges: [], avatar: avatars[avatarIndex], score: 0 };

        setUser({ name, xp: 0, level: 1, badges: [], avatar: avatars[avatarIndex] });
        setRoom({ code, host: name, players: [hostPlayer], quiz: null });
        setPlayers([hostPlayer]);

        navigate("/room");
    };

    const handleJoin = () => {
        if (!name.trim()) {
            alert("Please enter a name");
            return;
        }

        const code = joinCode || prompt("Enter room code") || "";
        if (!code) {
            alert("No room code provided");
            return;
        }

        setRoomCode(code.toUpperCase());
        const guestPlayer: Player = { name, xp: 0, level: 1, badges: [], avatar: avatars[avatarIndex], score: 0 };
        setUser({ name, xp: 0, level: 1, badges: [], avatar: avatars[avatarIndex] });
        setRoom({ code: code.toUpperCase(), host: "Host", players: [guestPlayer], quiz: null });
        setPlayers([guestPlayer, { name: "Player 2", xp: 0, level: 1, badges: [], avatar: "🎮", score: 0 }]);

        navigate("/room");
    };

    return (
        <div className="min-h-screen p-8 flex items-center justify-center relative overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{
                background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
                animation: 'float 6s ease-in-out infinite'
            }} />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl" style={{
                background: 'radial-gradient(circle, #d946ef 0%, transparent 70%)',
                animation: 'float 8s ease-in-out infinite',
                animationDelay: '1s'
            }} />
            <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{
                background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
                animation: 'float 7s ease-in-out infinite',
                animationDelay: '2s'
            }} />

            <div className="max-w-3xl w-full relative z-10">
                {/* Header */}
                <div className="text-center mb-12 animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6" style={{ animation: 'scaleIn 0.6s ease-out 0.2s both' }}>
                        <Sparkles size={16} className="text-purple-400" />
                        <span className="text-sm font-bold text-purple-300">Create Your Profile</span>
                    </div>

                    <h2 className="text-7xl font-black mb-4 leading-tight" style={{ animation: 'scaleIn 0.6s ease-out 0.3s both' }}>
                        <span className="gradient-text">Welcome to</span>
                        <br />
                        <span className="gradient-text">Quizzy</span>
                    </h2>

                    <p className="text-xl text-white/70 max-w-md mx-auto" style={{ animation: 'fadeIn 0.8s ease-out 0.5s both' }}>
                        Set up your profile and join the ultimate trivia experience
                    </p>
                </div>

                {/* Main Card */}
                <div
                    className="card-dark card relative"
                    style={{
                        animation: 'scaleIn 0.6s ease-out 0.6s both',
                        background: 'rgba(20, 10, 40, 0.8)',
                        boxShadow: '0 0 80px rgba(124, 58, 237, 0.4)',
                        border: '2px solid rgba(139, 92, 246, 0.3)'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Animated border effect */}
                    <div
                        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none"
                        style={{
                            opacity: isHovered ? 0.5 : 0,
                            background: 'linear-gradient(45deg, #7c3aed, #d946ef, #06b6d4, #7c3aed)',
                            backgroundSize: '300% 300%',
                            animation: 'gradientRotate 3s ease infinite',
                            filter: 'blur(20px)'
                        }}
                    />

                    <div className="relative z-10">
                        {/* Name Input */}
                        <div className="mb-10">
                            <label className="block mb-4 text-sm font-bold text-white/80 flex items-center gap-2">
                                <Users size={18} className="text-purple-400" />
                                YOUR NAME
                            </label>
                            <div className="relative">
                                <input
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="input text-xl py-4"
                                    placeholder="Enter your display name"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '2px solid rgba(139, 92, 246, 0.2)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                        e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                                        e.target.style.boxShadow = '0 0 30px rgba(124, 58, 237, 0.3)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                        e.target.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl" style={{ animation: 'float 3s ease-in-out infinite' }}>
                                    {avatars[avatarIndex]}
                                </div>
                            </div>
                        </div>

                        {/* Avatar Selection */}
                        <div className="mb-10">
                            <label className="block mb-6 text-sm font-bold text-white/80 flex items-center gap-2">
                                <Zap size={18} className="text-purple-400" />
                                CHOOSE YOUR AVATAR
                            </label>
                            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                                {avatars.map((a, i) => (
                                    <button
                                        key={a}
                                        className="relative group"
                                        onClick={() => setAvatarIndex(i)}
                                        style={{
                                            animation: `scaleIn 0.4s ease-out ${0.1 * i}s both`
                                        }}
                                    >
                                        <div
                                            className={`
                                                w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                                                transition-all duration-300 relative overflow-hidden
                                                ${i === avatarIndex
                                                    ? "ring-4 ring-purple-500 ring-offset-4 ring-offset-[#140a28] scale-110"
                                                    : "opacity-60 hover:opacity-100 hover:scale-105 bg-white/5"
                                                }
                                            `}
                                            style={i === avatarIndex ? {
                                                background: 'linear-gradient(135deg, #7c3aed, #d946ef)',
                                                boxShadow: '0 8px 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(217, 70, 239, 0.4)'
                                            } : {}}
                                        >
                                            {i === avatarIndex && (
                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                                                        animation: 'shimmer 2s infinite'
                                                    }}
                                                />
                                            )}
                                            <span className="relative z-10" style={i === avatarIndex ? { animation: 'float 2s ease-in-out infinite' } : {}}>
                                                {a}
                                            </span>
                                        </div>
                                        {i === avatarIndex && (
                                            <div className="absolute -top-2 -right-2">
                                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>
                                                    <span className="text-xs">✓</span>
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <button
                                onClick={handleCreate}
                                className="btn btn-primary group relative overflow-hidden py-5"
                                style={{ animation: 'scaleIn 0.5s ease-out 0.8s both' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                                        <Sparkles size={20} />
                                    </div>
                                    <span className="text-lg font-black">Create Room</span>
                                </div>
                            </button>

                            <button
                                onClick={handleJoin}
                                className="btn btn-secondary group relative overflow-hidden py-5"
                                style={{ animation: 'scaleIn 0.5s ease-out 0.9s both' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Zap size={20} />
                                    </div>
                                    <span className="text-lg font-black">Join Room</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer stats */}
                <div className="flex justify-center gap-12 mt-10" style={{ animation: 'fadeIn 1s ease-out 1s both' }}>
                    <div className="text-center">
                        <div className="text-2xl font-black gradient-text mb-1">10K+</div>
                        <div className="text-xs text-white/50">Players Online</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black gradient-text mb-1">500+</div>
                        <div className="text-xs text-white/50">Active Rooms</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black gradient-text mb-1">50K+</div>
                        <div className="text-xs text-white/50">Questions</div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes gradientRotate {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
};

export default Setup;