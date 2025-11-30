import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./state/appContext";
import Landing from "./pages/landing";
import Setup from "./pages/Setup";
import Room from "./pages/Room";
import Game from "./pages/Game";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/room" element={<Room />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
