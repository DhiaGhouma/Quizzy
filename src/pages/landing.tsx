import React from "react";
import { Plus, QrCode, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state/appContext";

const Landing: React.FC = () => {
    const navigate = useNavigate();
    const { lang, setLang } = useAppState();

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
        <div className="min-h-screen p-8 animate-fade-in">
            <div className="container">
                <header className="flex justify-between items-center mb-16 animate-slide-up">
                    <div className="flex items-center gap-3">
                        <div className="text-4xl">🎯</div>
                        <h1 className="text-3xl font-bold">{t.title}</h1>
                    </div>
                    <div className="flex gap-2">
                        {(["en", "fr", "ar"] as const).map(l => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`px-4 py-2 rounded-lg transition-all font-semibold ${lang === l ? "btn-accent" : "btn-secondary"}`}
                            >
                                {l.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </header>

                <main className="grid lg:grid-cols-2 gap-12 items-center">
                    <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <h2 className="text-6xl font-extrabold mb-6 leading-tight">
                            <span className="gradient-text">Battle friends in<br />real-time trivia</span>
                        </h2>
                        <p className="text-lg mb-10" style={{ color: 'var(--color-muted)' }}>Create rooms, share codes, compete live with friends around the world.</p>

                        <div className="flex flex-col gap-4 max-w-md">
                            <button
                                onClick={() => navigate("/setup")}
                                className="btn btn-primary btn-lg flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <Plus size={24} />
                                    <span>{t.createRoom}</span>
                                </div>
                                <ChevronRight size={24} />
                            </button>

                            <button
                                onClick={() => {
                                    const code = prompt("Enter room code");
                                    if (code) {
                                        sessionStorage.setItem("joinRoomCode", code.toUpperCase());
                                        navigate("/setup?join=true");
                                    }
                                }}
                                className="btn btn-secondary btn-lg flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <QrCode size={24} />
                                    <span>{t.joinRoom}</span>
                                </div>
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </section>

                    <aside className="card-dark card animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Live Now</h3>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="card-interactive card-dark p-4 flex items-center gap-4">
                                <div className="text-3xl">🎬</div>
                                <div className="flex-1">
                                    <div className="font-semibold text-lg">Pop Culture</div>
                                    <div className="text-sm" style={{ color: 'var(--color-muted)' }}>247 players • 10 questions</div>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                            <div className="card-interactive card-dark p-4 flex items-center gap-4">
                                <div className="text-3xl">🔬</div>
                                <div className="flex-1">
                                    <div className="font-semibold text-lg">Science Lab</div>
                                    <div className="text-sm" style={{ color: 'var(--color-muted)' }}>182 players • 15 questions</div>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                            <div className="card-interactive card-dark p-4 flex items-center gap-4">
                                <div className="text-3xl">🏛️</div>
                                <div className="flex-1">
                                    <div className="font-semibold text-lg">History</div>
                                    <div className="text-sm" style={{ color: 'var(--color-muted)' }}>156 players • 12 questions</div>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default Landing;
