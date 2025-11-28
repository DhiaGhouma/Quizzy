import React, { useState } from "react";
import { Copy, QrCode, Crown, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state/appContext";
import type { Quiz } from "../types";

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

    return (
        <div className="min-h-screen p-8 animate-fade-in">
            <div className="container">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-slide-up">
                    <div>
                        <h3 className="text-3xl font-bold mb-2">Room Lobby</h3>
                        <div className="flex items-center gap-3">
                            <div className="glass font-mono px-5 py-3 rounded-xl text-2xl font-bold tracking-wider">{room.code}</div>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(room.code);
                                    alert('Room code copied!');
                                }}
                                className="btn btn-sm glass"
                                title="Copy room code"
                            >
                                <Copy size={18} />
                            </button>
                        </div>
                    </div>

                    <div>
                        <button onClick={() => setShowQR(v => !v)} className="btn btn-secondary flex items-center gap-2">
                            <QrCode size={20} /> {showQR ? 'Hide QR' : 'Show QR'}
                        </button>
                    </div>
                </header>

                {showQR && (
                    <div className="card mb-8 text-center animate-scale-in">
                        <div className="mb-3 text-lg font-semibold">Scan to Join</div>
                        <div className="inline-block p-6 glass rounded-xl">
                            <div className="text-sm mb-2" style={{ color: 'var(--color-muted)' }}>QR Code Placeholder</div>
                            <div className="font-mono text-xl font-bold">{room.code}</div>
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Users size={24} />
                            Players ({players.length})
                        </h4>
                        <div className="space-y-3">
                            {players.map((p, i) => (
                                <div key={i} className="card flex items-center gap-4">
                                    <div className="avatar">{p.avatar || p.name.charAt(0)}</div>
                                    <div className="flex-1">
                                        <div className="font-bold text-lg">{p.name}</div>
                                        <div className="text-sm" style={{ color: 'var(--color-muted)' }}>Level {p.level}</div>
                                    </div>
                                    {i === 0 && (
                                        <div className="flex items-center gap-2">
                                            <Crown size={20} style={{ color: 'var(--color-accent)' }} />
                                            <span className="badge badge-warning">Host</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <h4 className="text-xl font-bold mb-4">Select Quiz Category</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {sampleQuizzes.map(q => (
                                <button
                                    key={q.id}
                                    onClick={() => startQuiz(q)}
                                    className="card-dark card card-interactive text-left"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-bold text-lg mb-1">{q.title}</div>
                                            <div className="text-sm" style={{ color: 'var(--color-muted)' }}>{q.questions} questions</div>
                                        </div>
                                        <span className="badge">{q.players} playing</span>
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
