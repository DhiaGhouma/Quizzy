import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state/appContext";
import { Question } from "../types";

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
            <div className="min-h-screen p-8 flex items-center justify-center">
                <div className="max-w-xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Quiz Complete</h2>
                    <div className="text-6xl font-extrabold mb-4">{gameState.score}</div>
                    <div className="mb-6">Earned {gameState.score} XP</div>
                    <button onClick={() => navigate("/room")} className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500">Back to room</button>
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
        <div className="min-h-screen p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>Question {gameState.currentQuestion + 1}/{sampleQuestions.length}</div>
                    <div>Time: {gameState.timeLeft}s</div>
                    <div>Score: {gameState.score}</div>
                </div>

                <div className="bg-white/5 p-8 rounded-2xl mb-6">
                    <h3 className="text-2xl font-bold mb-6">{question.q}</h3>

                    <div className="grid grid-cols-1 gap-4">
                        {question.options.map((opt, i) => {
                            let classes = "p-4 rounded-lg text-left bg-white/3";
                            if (gameState.answered) {
                                if (i === question.correct) classes = "p-4 rounded-lg text-left bg-green-600/30";
                                else if (i === gameState.selectedAnswer) classes = "p-4 rounded-lg text-left bg-red-600/30";
                            }
                            return (
                                <button key={i} disabled={gameState.answered} className={classes} onClick={() => answer(i)}>
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="w-full h-2 bg-white/5 rounded-full">
                    <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-500" style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );
};

export default Game;
