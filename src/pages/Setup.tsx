import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppState } from "../state/appContext";
import { Users } from "lucide-react";
import { Player } from "../types";

const Setup: React.FC = () => {
    const { user, setUser, setRoom, setPlayers, setRoomCode } = useAppState();
    const [name, setName] = useState(user.name || "");
    const [avatarIndex, setAvatarIndex] = useState<number>(0);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const joinCode = sessionStorage.getItem("joinRoomCode") || undefined;

    const avatars = ["A", "B", "C", "D", "E", "F", "G", "H"];

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
        setPlayers([guestPlayer, { name: "Player 2", xp: 0, level: 1, badges: [], avatar: "B", score: 0 }]);

        navigate("/room");
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Welcome</h2>

                <div className="bg-white/5 p-6 rounded-2xl">
                    <label className="block mb-2 text-sm">Your name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full p-3 rounded-lg bg-transparent border border-white/10 mb-4"
                        placeholder="Enter your display name"
                    />

                    <label className="block mb-2 text-sm">Avatar</label>
                    <div className="flex gap-3 mb-6">
                        {avatars.map((a, i) => (
                            <button
                                key={a}
                                className={`w-12 h-12 rounded-lg flex items-center justify-center ${i === avatarIndex ? "bg-gradient-to-r from-purple-600 to-cyan-500" : "bg-white/5"}`}
                                onClick={() => setAvatarIndex(i)}
                            >
                                <span className="font-semibold">{a}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button onClick={handleCreate} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500">
                            Create room
                        </button>
                        <button onClick={handleJoin} className="flex-1 py-3 rounded-lg border border-white/10">
                            Join room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setup;
