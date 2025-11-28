import React, { useState } from "react";
import { Copy, QrCode, Crown, Users, Play, Sparkles, Zap, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state/appContext";
import type { Quiz } from "../types";

const sampleQuizzes: Quiz[] = [
    { id: 1, title: "Pop Culture", color: "#d946ef", questions: 10, players: 247 },
    { id: 2, title: "Science Lab", color: "#06b6d4", questions: 15, players: 182 },
    { id: 3, title: "History", color: "#7c3aed", questions: 12, players: 156 },
];

const Room: React.FC = () => {
    const { room, players, user, setRoom, setGameState } = useAppState();
    const [showQR, setShowQR] = useState(false);
    const [copied, setCopied] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
    const navigate = useNavigate();

    if (!room) {
        return (
            <div className="min-h-screen p-8 flex items-center justify-center">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="text-6xl mb-6" style={{ animation: 'float 3s ease-in-out infinite' }}>🎯</div>
                    <p className="text-2xl font-bold mb-4">No room found</p>
                    <p className="text-white/60 mb-8">Create or join a room first</p>
                    <button onClick={() => navigate("/")} className="btn btn-primary">Back to Home</button>
                </div>
            </div>
        );
    }

    const startQuiz = (quiz: Quiz) => {
        setGameState({
            quiz,
            currentQuestion: 0,
            score: 0,
            timeLeft: 15,
            answered: false,
        } as any);
        setRoom({ ...room, quiz });
        navigate("/game");
    };

    const copyCode = () => {
        navigator.clipboard.writeText(room.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen p-8 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{
                    background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
                    animation: 'float 8s ease-in-out infinite'
                }} />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{
                    background: 'radial-gradient(circle, #d946ef 0%, transparent 70%)',
                    animation: 'float 6s ease-in-out infinite',
                    animationDelay: '1s'
                }} />
            </div>

            <div className="container relative z-10">
                <header className="mb-10 animate-slide-up">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                                <Sparkles size={16} className="text-purple-400" />
                                <span className="text-sm font-bold text-purple-300">Room Lobby</span>
                            </div>
                            <h3 className="text-5xl font-black mb-4 gradient-text">Ready to Play?</h3>
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="relative group">
                                    <div className="absolute inset-0 rounded-2xl blur-xl opacity-50" style={{
                                        background: 'linear-gradient(135deg, #7c3aed, #d946ef)',
                                        animation: 'pulse 2s ease-in-out infinite'
                                    }} />
                                    <div className="font-mono px-8 py-4 rounded-2xl text-4xl font-black tracking-wider relative overflow-hidden" style={{
                                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(217, 70, 239, 0.3))',
                                        border: '2px solid rgba(139, 92, 246, 0.5)',
                                        boxShadow: '0 0 40px rgba(124, 58, 237, 0.4)'
                                    }}>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        <span className="relative z-10 gradient-text">{room.code}</span>
                                    </div>
                                </div>
                                <button onClick={copyCode} className="btn btn-secondary relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/30 to-green-500/0 translate-x-[-100%] transition-transform duration-500"
                                        style={copied ? { transform: 'translateX(100%)' } : {}} />
                                    {copied ? (
                                        <>
                                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                                                <span className="text-sm">✓</span>
                                            </div>
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={20} className="group-hover:scale-110 transition-transform" />
                                            <span className="ml-2">Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        <button onClick={() => setShowQR(v => !v)} className="btn btn-secondary flex items-center gap-3 group">
                            <QrCode size={24} className="group-hover:rotate-12 transition-transform" />
                            <span className="font-bold">{showQR ? 'Hide QR' : 'Show QR'}</span>
                        </button>
                    </div>
                </header>

                {showQR && (
                    <div className="card mb-10 text-center relative overflow-hidden" style={{
                        animation: 'scaleIn 0.4s ease-out',
                        background: 'rgba(20, 10, 40, 0.8)',
                        border: '2px solid rgba(139, 92, 246, 0.3)',
                        boxShadow: '0 0 60px rgba(124, 58, 237, 0.3)'
                    }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
                        <div className="relative z-10">
                            <div className="text-2xl font-black gradient-text mb-6">Scan to Join</div>
                            <div className="inline-block p-8 rounded-2xl relative" style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '2px solid rgba(139, 92, 246, 0.3)'
                            }}>
                                <div className="w-48 h-48 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                                    <div className="text-6xl" style={{ animation: 'float 3s ease-in-out infinite' }}>📱</div>
                                </div>
                                <div className="font-mono text-3xl font-black gradient-text">{room.code}</div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <h4 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                                <Users size={20} />
                            </div>
                            <span className="gradient-text">Players</span>
                            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-sm font-bold">{players.length}</span>
                        </h4>
                        <div className="space-y-4">
                            {players.map((p, i) => (
                                <div key={i} className="card group relative overflow-hidden" style={{
                                    background: i === 0 ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(217, 70, 239, 0.2))' : 'rgba(20, 10, 40, 0.6)'
                                }}>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <div className="relative z-10 flex items-center gap-4">
                                        <div className="text-4xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                                            {p.avatar || p.name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-black text-xl mb-1">{p.name}</div>
                                            <div className="flex items-center gap-2 text-sm text-white/60">
                                                <Zap size={14} className="text-purple-400" />
                                                <span>Level {p.level}</span>
                                            </div>
                                        </div>
                                        {i === 0 && (
                                            <div className="flex items-center gap-3">
                                                <Crown size={24} className="text-yellow-400" style={{ animation: 'float 3s ease-in-out infinite' }} />
                                                <span className="px-4 py-2 rounded-full font-black text-sm" style={{
                                                    background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                                                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
                                                }}>HOST</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <h4 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
                                <Play size={20} />
                            </div>
                            <span className="gradient-text">Select Quiz</span>
                        </h4>
                        <div className="grid grid-cols-1 gap-5">
                            {sampleQuizzes.map((q, i) => (
                                <button
                                    key={q.id}
                                    onClick={() => {
                                        setSelectedQuiz(q.id);
                                        setTimeout(() => startQuiz(q), 300);
                                    }}
                                    className="card-dark card card-interactive text-left group relative overflow-hidden"
                                    style={{
                                        background: selectedQuiz === q.id ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(217, 70, 239, 0.3))' : 'rgba(20, 10, 40, 0.6)',
                                        transform: selectedQuiz === q.id ? 'scale(0.95)' : 'scale(1)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                                        background: `radial-gradient(circle at 50% 50%, ${q.color}20 0%, transparent 70%)`
                                    }} />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                                    <div className="relative z-10 flex items-center justify-between p-2">
                                        <div className="flex items-center gap-5 flex-1">
                                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" style={{
                                                background: `linear-gradient(135deg, ${q.color}, ${q.color}aa)`,
                                                boxShadow: `0 8px 30px ${q.color}40`
                                            }}>
                                                <span className="text-3xl">
                                                    {q.title === "Pop Culture" ? "🎬" : q.title === "Science Lab" ? "🔬" : "🏛️"}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="font-black text-2xl mb-2">{q.title}</div>
                                                <div className="flex items-center gap-4 text-sm text-white/60">
                                                    <span className="flex items-center gap-2">
                                                        <Target size={16} />
                                                        {q.questions} questions
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-2">
                                                        <Users size={16} />
                                                        {q.players} playing
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full" style={{
                                                background: '#10b981',
                                                boxShadow: '0 0 15px #10b981',
                                                animation: 'pulse 2s ease-in-out infinite'
                                            }} />
                                            <Play size={28} className="text-white/60 group-hover:text-white group-hover:scale-125 transition-all" />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;