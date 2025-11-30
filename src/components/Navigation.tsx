import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, Trophy, History } from "lucide-react";

const Navigation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { path: "/", icon: Home, label: "Home" },
        { path: "/profile", icon: User, label: "Profile" },
        { path: "/achievements", icon: Trophy, label: "Achievements" },
        { path: "/history", icon: History, label: "History" },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:bottom-auto md:top-0">
            <div className="container max-w-7xl mx-auto px-4 py-3">
                <div className="card flex items-center justify-around md:justify-center md:gap-8 py-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${active
                                        ? "text-white"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                    }`}
                                style={
                                    active
                                        ? {
                                            background: "linear-gradient(135deg, #7c3aed, #d946ef)",
                                            boxShadow: "0 8px 25px rgba(124, 58, 237, 0.5)",
                                        }
                                        : {}
                                }
                            >
                                {active && (
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                                        style={{ animation: "shimmer 2s infinite" }}
                                    />
                                )}
                                <Icon size={20} className="relative z-10" />
                                <span className="text-xs md:text-sm font-bold relative z-10">
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
