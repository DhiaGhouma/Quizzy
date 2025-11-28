import React, { createContext, useContext, useState } from "react";
import type { User, Player, Quiz, Room, GameState, Lang } from "../types";

interface AppState {
    lang: Lang;
    setLang: (l: Lang) => void;
    user: User;
    setUser: (u: User) => void;
    room: Room | null;
    setRoom: (r: Room | null) => void;
    players: Player[];
    setPlayers: (p: Player[]) => void;
    roomCode: string;
    setRoomCode: (c: string) => void;
    gameState: GameState | null;
    setGameState: (g: GameState | null) => void;
}

const defaultUser: User = { name: "", xp: 0, level: 1, badges: [], avatar: undefined };

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<Lang>("en");
    const [user, setUser] = useState<User>(defaultUser);
    const [room, setRoom] = useState<Room | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const [roomCode, setRoomCode] = useState<string>("");
    const [gameState, setGameState] = useState<GameState | null>(null);

    return (
        <AppContext.Provider value={{
            lang, setLang, user, setUser, room, setRoom, players, setPlayers, roomCode, setRoomCode, gameState, setGameState
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppState = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppState must be used inside AppProvider");
    return ctx;
};
