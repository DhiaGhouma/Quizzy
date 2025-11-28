import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state/appContext";
import type { Question } from "../types";
import { Zap, Clock, Trophy, Target, Star, Sparkles } from "lucide-react";

const sampleQuestions: Question[] = [
    { q: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
    { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
    { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Monet"], correct: 1 },
];

const Game: React.FC = () => {
    const { gameState, setGameState, user, setUser } = useAppState();
    const navigate = useNavigate();
    const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, vx: number, vy: number }>>([]);
    const [confetti, setConfetti] = useState<Array<{ id: number, x: number, y: number, color: string, rotation: number }>>([]);

    useEffect(() => {
        if (!gameState) {
            navigate("/room");
        }
    }, [gameState, navigate]);

    useEffect(() => {
        if (gameState?.finished) {
            const newConfetti = [...Array(100)].map((_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: -10,
                color: ['#7c3aed', '#d946ef', '#06b6d4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
                rotation: Math.random() * 360
            }));
            setConfetti(newConfetti);
        }
    }, [gameState?.finished]);

    if (!gameState) return null;

    if (gameState.finished) {
        return (
            <div className="min-h-screen p-8 flex items-center justify-center relative overflow-hidden">
                {/* Confetti animation */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {confetti.map((c) => (
                        <div
                            key={c.id}
                            className="absolute w-3 h-3 rounded-sm"
                            style={{
                                left: `${c.x}%`,
                                top: `${c.y}%`,
                                background: c.color,
                                animation: `confettiFall ${2 + Math.random() * 3}s linear infinite`,
                                animationDelay: `${Math.random() * 2}s`,
                                transform: `rotate(${c.rotation}deg)`,
                                boxShadow: `0 0 10px ${c.color}`
                            }}
                        />
                    ))}
                </div>

                {/* Radial glow background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
                        style={{
                            background: 'radial-gradient(circle, #7c3aed 0%, #d946ef 50%, transparent 70%)',
                            animation: 'pulse 3s ease-in-out infinite'
                        }}
                    />
                </div>

                <div className="max-w-3xl w-full text-center relative z-10">
                    <div className="card relative overflow-hidden" style={{
                        animation: 'scaleIn 0.8s ease-out',
                        background: 'rgba(20, 10, 40, 0.9)',
                        boxShadow: '0 0 100px rgba(124, 58, 237, 0.6), 0 0 200px rgba(217, 70, 239, 0.4)',
                        border: '3px solid rgba(217, 70, 239, 0.6)'
                    }}>
                        {/* Animated border effect */}
                        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{
                            background: 'linear-gradient(45deg, #7c3aed, #d946ef, #06b6d4, #7c3aed)',
                            backgroundSize: '300% 300%',
                            animation: 'gradientRotate 4s ease infinite',
                            filter: 'blur(30px)'
                        }} />

                        <div className="relative z-10">
                            {/* Trophy icon */}
                            <div className="inline-block mb-8" style={{ animation: 'float 2s ease-in-out infinite' }}>
                                <div className="relative">
                                    <div className="text-8xl">🏆</div>
                                    <div className="absolute inset-0 blur-2xl opacity-60 text-8xl" style={{ animation: 'glow 2s ease-in-out infinite' }}>
                                        🏆
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-7xl font-black mb-8 gradient-text" style={{ animation: 'scaleIn 0.6s ease-out 0.2s both' }}>
                                Quiz Complete!
                            </h2>

                            {/* Score display */}
                            <div className="relative inline-block mb-10" style={{ animation: 'scaleIn 0.8s ease-out 0.4s both' }}>
                                <div className="absolute inset-0 blur-3xl opacity-70" style={{
                                    background: 'radial-gradient(circle, #7c3aed 0%, #d946ef 100%)',
                                    animation: 'pulse 2s ease-in-out infinite'
                                }} />
                                <div
                                    className="text-9xl font-black gradient-text relative"
                                    style={{
                                        textShadow: '0 0 60px rgba(124, 58, 237, 0.8)'
                                    }}
                                >
                                    {gameState.score}
                                </div>
                                <div className="absolute -top-8 -right-8">
                                    <Sparkles className="text-yellow-400" size={56} style={{ animation: 'float 3s ease-in-out infinite', filter: 'drop-shadow(0 0 10px #facc15)' }} />
                                </div>
                            </div>

                            <div className="text-3xl mb-12 text-white/80 font-bold" style={{ animation: 'fadeIn 0.8s ease-out 0.6s both' }}>
                                You earned <span className="gradient-text font-black text-4xl">{gameState.score} XP</span>
                            </div>

                            {/* Stats cards */}
                            <div className="flex gap-6 justify-center mb-12" style={{ animation: 'slideUp 0.8s ease-out 0.8s both' }}>
                                <div className="px-8 py-5 rounded-2xl bg-purple-500/20 border-2 border-purple-500/40 backdrop-blur-xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <div className="text-sm text-white/60 mb-2 font-semibold relative z-10">Accuracy</div>
                                    <div className="text-4xl font-black gradient-text relative z-10">
                                        {Math.round((gameState.score / (sampleQuestions.length * 100)) * 100)}%
                                    </div>
                                </div>
                                <div className="px-8 py-5 rounded-2xl bg-pink-500/20 border-2 border-pink-500/40 backdrop-blur-xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <div className="text-sm text-white/60 mb-2 font-semibold relative z-10">Questions</div>
                                    <div className="text-4xl font-black gradient-text relative z-10">{sampleQuestions.length}/{sampleQuestions.length}</div>
                                </div>
                                <div className="px-8 py-5 rounded-2xl bg-cyan-500/20 border-2 border-cyan-500/40 backdrop-blur-xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <div className="text-sm text-white/60 mb-2 font-semibold relative z-10">Avg Time</div>
                                    <div className="text-4xl font-black gradient-text relative z-10">8s</div>
                                </div>
                            </div>

                            {/* Back button */}
                            <button
                                onClick={() => navigate("/room")}
                                className="btn btn-primary btn-lg group relative overflow-hidden"
                                style={{ animation: 'scaleIn 0.6s ease-out 1s both' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <span className="relative z-10 text-xl font-black">Back to Room</span>
                                <Zap size={24} className="group-hover:rotate-12 transition-transform relative z-10" />
                            </button>
                        </div>
                    </div>
                </div>

                <style>{`
                    @keyframes confettiFall {
                        to {
                            transform: translateY(100vh) rotate(720deg);
                            opacity: 0;
                        }
                    }
                    @keyframes gradientRotate {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }
                `}</style>
            </div>
        );
    }

    const question = sampleQuestions[gameState.currentQuestion];
    const progress = ((gameState.currentQuestion + 1) / sampleQuestions.length) * 100;

    const answer = (index: number) => {
        if (gameState.answered) return;
        const isCorrect = index === question.correct;
        const points = isCorrect ? 100 + gameState.timeLeft * 5 : 0;
        const newScore = gameState.score + points;

        if (isCorrect) {
            const newParticles = [...Array(30)].map((_, i) => ({
                id: Date.now() + i,
                x: 50,
                y: 50,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10
            }));
            setParticles(newParticles);
            setTimeout(() => setParticles([]), 1000);
        }

        setGameState({
            ...gameState,
            answered: true,
            selectedAnswer: index,
            score: newScore,
        });

        setTimeout(() => {
            const next = gameState.currentQuestion + 1;
            if (next < sampleQuestions.length) {
                setGameState({
                    ...gameState,
                    currentQuestion: next,
                    selectedAnswer: null,
                    answered: false,
                    timeLeft: 15,
                    score: newScore,
                });
            } else {
                const newXp = user.xp + newScore;
                setUser({ ...user, xp: newXp, level: Math.floor(newXp / 500) + 1 });
                setGameState({ ...gameState, score: newScore, finished: true });
            }
        }, 1500);
    };

    useEffect(() => {
        if (!gameState || gameState.answered || gameState.finished) return;
        if (gameState.timeLeft <= 0) {
            setGameState({ ...gameState, answered: true, selectedAnswer: null });
            setTimeout(() => {
                const next = gameState.currentQuestion + 1;
                if (next < sampleQuestions.length) {
                    setGameState({
                        ...gameState,
                        currentQuestion: next,
                        selectedAnswer: null,
                        answered: false,
                        timeLeft: 15,
                    });
                } else {
                    const newXp = user.xp + gameState.score;
                    setUser({ ...user, xp: newXp, level: Math.floor(newXp / 500) + 1 });
                    setGameState({ ...gameState, finished: true });
                }
            }, 800);
            return;
        }

        const timer = setTimeout(() => {
            setGameState({ ...gameState, timeLeft: gameState.timeLeft - 1 });
        }, 1000);

        return () => clearTimeout(timer);
    }, [gameState, setGameState, user, setUser]);

    return (
        <div className="min-h-screen p-8 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl" style={{
                    background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
                    animation: 'float 8s ease-in-out infinite'
                }} />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl" style={{
                    background: 'radial-gradient(circle, #d946ef 0%, transparent 70%)',
                    animation: 'float 6s ease-in-out infinite',
                    animationDelay: '1s'
                }} />
            </div>

            {/* Success particles */}
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute w-4 h-4 rounded-full pointer-events-none"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                        animation: 'particleExplode 1s ease-out forwards',
                        boxShadow: '0 0 20px #10b981',
                        transform: `translate(${p.vx * 20}px, ${p.vy * 20}px)`
                    }}
                />
            ))}

            <div className="container max-w-5xl relative z-10">
                {/* Stats Header */}
                <div className="flex justify-between items-center mb-10 gap-4 flex-wrap animate-slide-up">
                    <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Target size={24} className="text-purple-400 relative z-10" />
                        <span className="font-black text-xl relative z-10">Question {gameState.currentQuestion + 1}/{sampleQuestions.length}</span>
                    </div>

                    <div
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all duration-300 backdrop-blur-xl relative overflow-hidden ${gameState.timeLeft <= 5
                                ? 'bg-red-500/30 border-3 border-red-500/60 scale-110'
                                : 'bg-green-500/20 border-2 border-green-500/40'
                            }`}
                        style={gameState.timeLeft <= 5 ? {
                            animation: 'pulse 0.5s ease-in-out infinite',
                            boxShadow: '0 0 40px rgba(239, 68, 68, 0.6)'
                        } : {}}
                    >
                        <Clock size={24} className={gameState.timeLeft <= 5 ? 'text-red-300' : 'text-green-400'} />
                        <span className="text-3xl">{gameState.timeLeft}s</span>
                    </div>

                    <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/40 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Trophy size={24} className="text-yellow-400 relative z-10" style={{ filter: 'drop-shadow(0 0 10px #facc15)' }} />
                        <span className="font-black text-2xl gradient-text relative z-10">{gameState.score}</span>
                    </div>
                </div>

                {/* Question Card */}
                <div
                    className="card mb-10"
                    style={{
                        animation: 'scaleIn 0.6s ease-out',
                        background: 'rgba(20, 10, 40, 0.8)',
                        boxShadow: '0 0 80px rgba(124, 58, 237, 0.4)',
                        border: '3px solid rgba(139, 92, 246, 0.4)'
                    }}
                >
                    <div className="flex items-start gap-6 mb-10">
                        <div
                            className="text-5xl font-black gradient-text flex-shrink-0 px-6 py-3 rounded-2xl"
                            style={{
                                animation: 'float 3s ease-in-out infinite',
                                background: 'rgba(124, 58, 237, 0.2)',
                                border: '2px solid rgba(139, 92, 246, 0.3)'
                            }}
                        >
                            Q{gameState.currentQuestion + 1}
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black leading-tight flex-1">{question.q}</h3>
                    </div>

                    {/* Answer Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {question.options.map((opt, i) => {
                            let classes = "btn text-left p-8 justify-start glass group relative overflow-hidden transition-all duration-300 border-2";
                            let style: any = { animationDelay: `${i * 0.1}s` };

                            if (gameState.answered) {
                                if (i === question.correct) {
                                    classes = "btn text-left p-8 justify-start relative overflow-hidden border-4";
                                    classes += " bg-green-500/40 border-green-400 scale-105";
                                    style.animation = 'correctPulse 0.6s ease-out';
                                    style.boxShadow = '0 0 50px rgba(16, 185, 129, 0.8), 0 0 100px rgba(16, 185, 129, 0.4)';
                                } else if (i === gameState.selectedAnswer) {
                                    classes = "btn text-left p-8 justify-start relative overflow-hidden border-4";
                                    classes += " bg-red-500/40 border-red-400";
                                    style.animation = 'shake 0.5s ease-out';
                                    style.boxShadow = '0 0 50px rgba(239, 68, 68, 0.8)';
                                }
                            } else {
                                classes += " hover:scale-105 hover:border-purple-500/50 hover:shadow-2xl";
                                style.animation = 'slideUp 0.5s ease-out';
                            }

                            return (
                                <button
                                    key={i}
                                    disabled={gameState.answered}
                                    className={classes}
                                    onClick={() => answer(i)}
                                    style={style}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                    <div className="flex items-center gap-5 relative z-10">
                                        <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center font-black text-2xl border-2 border-white/20">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                        <span className="font-bold text-xl flex-1">{opt}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-4 rounded-full bg-white/10 overflow-hidden" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <div
                        className="h-full rounded-full relative overflow-hidden transition-all duration-500"
                        style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #7c3aed 0%, #d946ef 50%, #06b6d4 100%)',
                            boxShadow: '0 0 30px rgba(124, 58, 237, 1), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                        }}
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                                animation: 'shimmer 2s infinite'
                            }}
                        />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes correctPulse {
                    0%, 100% { transform: scale(1.05); }
                    50% { transform: scale(1.1); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-15px); }
                    40% { transform: translateX(15px); }
                    60% { transform: translateX(-10px); }
                    80% { transform: translateX(10px); }
                }
                @keyframes particleExplode {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(var(--tx), var(--ty)) scale(0);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default Game;