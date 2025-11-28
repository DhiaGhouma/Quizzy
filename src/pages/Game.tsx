import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state/appContext";
import type { Question } from "../types";

const sampleQuestions: Question[] = [
    { q: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
    { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
    { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Monet"], correct: 1 },
];

const Game: React.FC = () => {
    const { gameState, setGameState, user, setUser } = useAppState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!gameState) {
            navigate("/room");
        }
    }, [gameState, navigate]);

    if (!gameState) return null;

    if (gameState.finished) {
        return (
            <div className="min-h-screen p-8 flex items-center justify-center animate-fade-in">
                <div className="max-w-xl text-center">
                    <div className="card animate-scale-in">
                        <h2 className="text-4xl font-bold mb-6 gradient-text">🎉 Quiz Complete!</h2>
                        <div className="text-7xl font-extrabold mb-4 gradient-text animate-pulse-slow">{gameState.score}</div>
                        <div className="text-xl mb-8" style={{ color: 'var(--color-muted)' }}>You earned {gameState.score} XP</div>
                        <button onClick={() => navigate("/room")} className="btn btn-primary btn-lg">
                            Back to Room
                        </button>
                    </div>
                </div>
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
        }, 1200);
    };

    // countdown effect
    useEffect(() => {
        if (!gameState || gameState.answered || gameState.finished) return;
        if (gameState.timeLeft <= 0) {
            // mark answered false and move on with zero points
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
        <div className="min-h-screen p-8 animate-fade-in">
            <div className="container max-w-3xl">
                <div className="flex justify-between items-center mb-6 animate-slide-up">
                    <span className="badge badge-outline">Question {gameState.currentQuestion + 1}/{sampleQuestions.length}</span>
                    <span className={`badge ${gameState.timeLeft <= 5 ? 'badge-danger' : 'badge-success'}`}>⏱️ {gameState.timeLeft}s</span>
                    <span className="badge" style={{ background: 'var(--color-accent)', color: 'var(--color-bg)' }}>🏆 {gameState.score}</span>
                </div>

                <div className="card animate-scale-in mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold mb-8">{question.q}</h3>

                    <div className="grid grid-cols-1 gap-4">
                        {question.options.map((opt, i) => {
                            let classes = "btn text-left p-5 justify-start glass";
                            if (gameState.answered) {
                                if (i === question.correct) {
                                    classes = "btn text-left p-5 justify-start";
                                    classes += " bg-green-600/40 border-2 border-green-400";
                                } else if (i === gameState.selectedAnswer) {
                                    classes = "btn text-left p-5 justify-start";
                                    classes += " bg-red-600/40 border-2 border-red-400";
                                }
                            }
                            return (
                                <button
                                    key={i}
                                    disabled={gameState.answered}
                                    className={classes}
                                    onClick={() => answer(i)}
                                >
                                    <span className="font-semibold">{opt}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );
};

export default Game;
