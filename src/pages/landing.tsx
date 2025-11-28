import React, { useEffect, useState } from "react";
import { Plus, QrCode, ChevronRight, Sparkles, Zap, Users, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state/appContext";

const Landing: React.FC = () => {
    const navigate = useNavigate();
    const { lang, setLang } = useAppState();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number }>>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const newParticles = [...Array(50)].map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1
        }));
        setParticles(newParticles);
    }, []);

    const translations: Record<string, any> = {
        en: {
            title: "Quizzy",
            tagline: "Battle friends in real-time trivia",
            createRoom: "Create Room",
            joinRoom: "Join Room",
        },
        fr: {
            title: "Quizzy",
            tagline: "Affrontez vos amis en temps réel",
            createRoom: "Créer Salle",
            joinRoom: "Rejoindre",
        },
        ar: {
            title: "كويزي",
            tagline: "تحدى أصدقائك في الوقت الفعلي",
            createRoom: "إنشاء غرفة",
            joinRoom: "انضم",
        },
    };

    const t = translations[lang];

    return (
        <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map(p => (
                    <div
                        key={p.id}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 3}s`,
                            opacity: 0.1
                        }}
                    />
                ))}
            </div>

            {/* Mouse-following orbs */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
                    left: `${mousePos.x / 10}px`,
                    top: `${mousePos.y / 10}px`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 0.3s ease-out'
                }}
            />

            <div className="container relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-16 md:mb-24 animate-slide-up">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="relative">
                            <div className="text-4xl md:text-6xl" style={{ animation: 'float 3s ease-in-out infinite' }}>
                                🎯
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black gradient-text">Quizzy</h1>
                    </div>
                    <div className="flex gap-2 md:gap-3">
                        {(["en", "fr", "ar"] as const).map((l, i) => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`px-3 md:px-6 py-2 md:py-3 rounded-xl transition-all duration-300 font-black text-sm md:text-base relative overflow-hidden ${lang === l
                                        ? "text-white"
                                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white hover:scale-105"
                                    }`}
                                style={{
                                    animationDelay: `${i * 0.1}s`,
                                    animation: 'slideUp 0.5s ease-out',
                                    ...(lang === l ? {
                                        background: 'linear-gradient(135deg, #7c3aed, #d946ef)',
                                        boxShadow: '0 8px 25px rgba(124, 58, 237, 0.5)'
                                    } : {})
                                }}
                            >
                                {lang === l && (
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                                        style={{ animation: 'shimmer 2s infinite' }}
                                    />
                                )}
                                <span className="relative z-10">{l.toUpperCase()}</span>
                            </button>
                        ))}
                    </div>
                </header>

                {/* Main Content */}
                <main className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                    {/* Left Section */}
                    <section className="space-y-6 md:space-y-10" style={{ animation: 'slideUp 0.8s ease-out 0.2s both' }}>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-3 rounded-full bg-purple-500/10 border-2 border-purple-500/30 relative overflow-hidden"
                            style={{ animation: 'scaleIn 0.6s ease-out 0.4s both' }}>
                            <Sparkles size={16} className="text-purple-400 relative z-10" />
                            <span className="text-sm md:text-base font-black text-purple-300 relative z-10">Real-time Multiplayer</span>
                        </div>

                        {/* Main Heading */}
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight" style={{ animation: 'slideUp 0.8s ease-out 0.5s both' }}>
                            <span className="gradient-text">Battle Friends in Real-Time</span>
                        </h2>

                        {/* Description */}
                        <p className="text-lg md:text-2xl text-white/70 leading-relaxed" style={{ animation: 'fadeIn 0.8s ease-out 0.7s both' }}>
                            Create rooms, share codes, and compete live with friends around the world.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 md:gap-5 pt-4 md:pt-6">
                            <button
                                onClick={() => navigate("/setup")}
                                className="btn btn-primary btn-lg flex items-center justify-between group relative overflow-hidden"
                                style={{ animation: 'scaleIn 0.6s ease-out 0.9s both' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <div className="flex items-center gap-3 md:gap-4 relative z-10">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center">
                                        <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                                    </div>
                                    <span className="text-lg md:text-xl font-black">{t.createRoom}</span>
                                </div>
                                <ChevronRight size={28} className="group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                            </button>

                            <button
                                onClick={() => {
                                    const code = prompt("Enter room code");
                                    if (code) {
                                        sessionStorage.setItem("joinRoomCode", code.toUpperCase());
                                        navigate("/setup?join=true");
                                    }
                                }}
                                className="btn btn-secondary btn-lg flex items-center justify-between group relative overflow-hidden"
                                style={{ animation: 'scaleIn 0.6s ease-out 1s both' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <div className="flex items-center gap-3 md:gap-4 relative z-10">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center">
                                        <QrCode size={24} className="group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <span className="text-lg md:text-xl font-black">{t.joinRoom}</span>
                                </div>
                                <ChevronRight size={28} className="group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 md:gap-12 pt-6 md:pt-8" style={{ animation: 'fadeIn 1s ease-out 1.2s both' }}>
                            <div className="relative group">
                                <div className="text-3xl md:text-5xl font-black gradient-text mb-1 md:mb-2">10K+</div>
                                <div className="text-xs md:text-sm text-white/60 font-semibold">Active Players</div>
                            </div>
                            <div className="relative group">
                                <div className="text-3xl md:text-5xl font-black gradient-text mb-1 md:mb-2">500+</div>
                                <div className="text-xs md:text-sm text-white/60 font-semibold">Live Rooms</div>
                            </div>
                            <div className="relative group">
                                <div className="text-3xl md:text-5xl font-black gradient-text mb-1 md:mb-2">50K+</div>
                                <div className="text-xs md:text-sm text-white/60 font-semibold">Questions</div>
                            </div>
                        </div>
                    </section>

                    {/* Right Section - Featured Rooms */}
                    <aside className="space-y-4 md:space-y-6" style={{ animation: 'slideUp 0.8s ease-out 0.4s both' }}>
                        <div className="flex items-center justify-between mb-6 md:mb-8">
                            <h3 className="text-2xl md:text-3xl font-black gradient-text flex items-center gap-2 md:gap-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                                    <Zap size={20} className="text-white" />
                                </div>
                                Trending Now
                            </h3>
                            <div className="flex gap-2">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                                        style={{
                                            background: `linear-gradient(135deg, ${['#7c3aed', '#d946ef', '#06b6d4'][i]} 0%, transparent 100%)`,
                                            animation: 'pulse 1.5s ease-in-out infinite',
                                            animationDelay: `${i * 0.3}s`,
                                            boxShadow: `0 0 20px ${['#7c3aed', '#d946ef', '#06b6d4'][i]}80`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {[
                            { emoji: "🎬", title: "Pop Culture", players: 247, questions: 10, color: "#d946ef", delay: 0.6 },
                            { emoji: "🔬", title: "Science Lab", players: 182, questions: 15, color: "#06b6d4", delay: 0.8 },
                            { emoji: "🏛️", title: "History", players: 156, questions: 12, color: "#7c3aed", delay: 1.0 },
                        ].map((room) => (
                            <div
                                key={room.title}
                                className="card-dark card card-interactive group relative overflow-hidden"
                                style={{ animation: `scaleIn 0.6s ease-out ${room.delay}s both` }}
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle at 50% 50%, ${room.color}30 0%, transparent 70%)`
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                <div className="relative flex items-center gap-4 md:gap-6 p-2 md:p-3">
                                    <div
                                        className="text-4xl md:text-6xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500"
                                        style={{
                                            filter: `drop-shadow(0 8px 20px ${room.color}80)`,
                                            animation: 'float 4s ease-in-out infinite',
                                            animationDelay: `${room.delay}s`
                                        }}
                                    >
                                        {room.emoji}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-black text-xl md:text-2xl mb-1 md:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                                            {room.title}
                                        </div>
                                        <div className="flex items-center gap-3 md:gap-6 text-sm md:text-base text-white/60">
                                            <span className="flex items-center gap-1 md:gap-2">
                                                <Target size={14} className="text-purple-400" />
                                                <span className="font-semibold">{room.questions} questions</span>
                                            </span>
                                            <span className="flex items-center gap-1 md:gap-2">
                                                <Users size={14} className="text-pink-400" />
                                                <span className="font-semibold">{room.players} playing</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                                        style={{
                                            background: '#10b981',
                                            boxShadow: '0 0 20px #10b981',
                                            animation: 'pulse 2s ease-in-out infinite'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default Landing;