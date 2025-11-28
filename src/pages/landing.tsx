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
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold">{t.title}</h1>
                        <p className="text-sm text-gray-300">{t.tagline}</p>
                    </div>
                    <div className="flex gap-2">
                        {(["en", "fr", "ar"] as const).map(l => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`px-3 py-2 rounded-lg ${lang === l ? "bg-white text-black" : "bg-white/5"}`}
                            >
                                {l.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </header>

                <main className="grid lg:grid-cols-2 gap-12 items-center">
                    <section>
                        <h2 className="text-4xl font-extrabold mb-6">{t.tagline}</h2>
                        <p className="text-gray-300 mb-8">Create rooms, share codes, compete live.</p>

                        <div className="flex flex-col gap-4 max-w-md">
                            <button
                                onClick={() => navigate("/setup")}
                                className="flex items-center justify-between px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500"
                            >
                                <div className="flex items-center gap-3">
                                    <Plus />
                                    <span className="font-semibold">{t.createRoom}</span>
                                </div>
                                <ChevronRight />
                            </button>

                            <button
                                onClick={() => {
                                    const code = prompt("Enter room code");
                                    if (code) {
                                        // pass code via session storage or context; simplest: set in sessionStorage and navigate
                                        sessionStorage.setItem("joinRoomCode", code.toUpperCase());
                                        navigate("/setup?join=true");
                                    } else {
                                        // nothing
                                    }
                                }}
                                className="flex items-center justify-between px-6 py-4 rounded-2xl border border-white/10"
                            >
                                <div className="flex items-center gap-3">
                                    <QrCode />
                                    <span className="font-semibold">{t.joinRoom}</span>
                                </div>
                                <ChevronRight />
                            </button>
                        </div>
                    </section>

                    <aside className="bg-white/5 p-6 rounded-2xl">
                        <h3 className="font-bold mb-4">Trending quizzes</h3>
                        <div className="space-y-3">
                            <div className="p-4 rounded-xl bg-white/3">Pop Culture • 10 questions • live</div>
                            <div className="p-4 rounded-xl bg-white/3">Science Lab • 15 questions • live</div>
                            <div className="p-4 rounded-xl bg-white/3">History • 12 questions • live</div>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default Landing;
