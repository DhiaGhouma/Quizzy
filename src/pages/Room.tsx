import React, { useState } from "react";
import { Copy, QrCode, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state/appContext";
import { Quiz } from "../types";

const sampleQuizzes: Quiz[] = [
    { id: 1, title: "Pop Culture", color: "#FF6B9D", questions: 10, players: 247 },
    { id: 2, title: "Science Lab", color: "#4ECDC4", questions: 15, players: 182 },
    { id: 3, title: "History", color: "#C77DFF", questions: 12, players: 156 },
];

const Room: React.FC = () => {
    const { room, players, user, setRoom, setPlayers, setRoomCode, roomCode, setGameState } = useAppState();
    const [showQR, setShowQR] = useState(false);
    const navigate = useNavigate();

    if (!room) {
        return (
            <div className="min-h-screen p-8">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="mb-4">No room found. Create or join a room first.</p>
                </div>
            </div>
        );
    }

    const startQuiz = (quiz: Quiz) => {
        // create a lightweight GameState and navigate
        setGameState({
            quiz,
            currentQuestion: 0,
            score: 0,
            timeLeft: 15,
            answered: false,
        } as any);
        // attach quiz to room
        setRoom({ ...room, quiz });
        navigate("/game");
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-2xl font-bold">Room Code</h3>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="font-mono bg-white/5 px-4 py-2 rounded-lg">{room.code}</div>
                            <button onClick={() => navigator.clipboard.writeText(room.code)} className="p-2 bg-white/5 rounded-md">
                                <Copy />
                            </button>
                        </div>
                    </div>

                    <div>
                        <button onClick={() => setShowQR(v => !v)} className="px-4 py-2 bg-white/5 rounded-lg flex items-center gap-2">
                            <QrCode /> QR
                        </button>
                    </div>
                </header>

                {showQR && (
                    <div className="mb-6 p-6 bg-white/5 rounded-lg">
                        <div className="mb-2">QR placeholder</div>
                        <div className="font-mono py-2">{room.code}</div>
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Players ({players.length})</h4>
                        <div className="space-y-3">
                            {players.map((p, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                                    <div className="w-12 h-12 bg-white/6 rounded-lg flex items-center justify-center font-bold">{p.avatar || p.name.charAt(0)}</div>
                                    <div className="flex-1">
                                        <div className="font-semibold">{p.name}</div>
                                        <div className="text-sm text-gray-300">Level {p.level}</div>
                                    </div>
                                    {i === 0 && <Crown />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Categories</h4>
                        <div className="grid grid-cols-1 gap-3">
                            {sampleQuizzes.map(q => (
                                <button key={q.id} onClick={() => startQuiz(q)} className="p-4 text-left rounded-lg bg-white/5">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-bold">{q.title}</div>
                                            <div className="text-sm text-gray-300">{q.questions} questions</div>
                                        </div>
                                        <div className="text-sm text-gray-300">{q.players} players</div>
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
