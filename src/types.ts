export type Lang = "en" | "fr" | "ar";

export interface User {
    name: string;
    xp: number;
    level: number;
    badges: string[];
    avatar?: string;
}

export interface Player extends User {
    score: number;
}

export interface Quiz {
    id: number;
    title: string;
    emoji?: string;
    color: string;
    questions: number;
    players: number;
}

export interface Question {
    q: string;
    options: string[];
    correct: number;
}

export interface Room {
    code: string;
    host: string;
    players: Player[];
    quiz?: Quiz | null;
}

export interface GameState {
    quiz: Quiz;
    currentQuestion: number;
    score: number;
    timeLeft: number;
    answered: boolean;
    selectedAnswer?: number | null;
    finished?: boolean;
}
