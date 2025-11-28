
![unnamed](https://github.com/user-attachments/assets/26850343-1e39-4082-b134-0f496458932c)

**Quizzy** is a fun, modern, and gamified real-time quiz platform built with **React**, **TypeScript**, **Tailwind CSS**, **Node.js**, and **MongoDB**. Battle friends, explore quizzes, earn XP, collect badges, and level up in a playful interactive environment. The platform also leverages **AI and Machine Learning** for personalized quiz recommendations and matchmaking.

---

## Features

- **Landing Page:** Hero section with playful illustration, multilingual support (EN, FR, AR), and animated CTAs.  
- **User Setup:** Pick a name and avatar before joining or creating a quiz room.  
- **Rooms & Multiplayer:** Create or join quiz rooms, share QR codes or room codes.  
- **Real-Time Game:** Timed questions, animated XP/progress bars, score tracking.  
- **Gamified UI:** Rounded cards, gradient buttons, hover animations, badges, confetti effects on quiz completion.  
- **AI/ML Recommendations:** Personalized quizzes and mentor/peer matchmaking based on skills, interests, and past performance.  
- **Responsive & RTL Support:** Works on desktop, tablet, and mobile; supports right-to-left languages (Arabic).  

---

## Tech Stack

- **Frontend:** React 18 + TypeScript, Tailwind CSS, React Router, Lucide Icons  
- **Backend:** Node.js + Express  
- **Database:** MongoDB  
- **AI / ML:** Python or Node.js ML libraries for personalized quiz recommendations and scoring analytics  

---

## Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/quizzy.git
cd quizzy

# Install frontend dependencies
npm install

# Run frontend
npm start

# Backend setup
cd server
npm install
npm run dev
Open http://localhost:5173
 
 - to view the frontend in your browser. The backend runs on http://localhost:5000 by default.

#Folder Structure

frontend/
├─ src/
│  ├─ components/    # UI components (Cards, Buttons, Avatar, Badges)
│  ├─ pages/         # Landing, Setup, Room, Game
│  ├─ routes/        # React Router configuration
│  ├─ assets/        # Illustrations, icons
│  └─ App.tsx

backend/
├─ server/
│  ├─ models/        # MongoDB schemas for User, Quiz, Scores
│  ├─ routes/        # API endpoints
│  ├─ controllers/   # Request logic
│  ├─ ai/            # ML scripts for recommendations
│  └─ server.js

UI / UX Highlights

Colors & Gradients: Blue → Purple for energy, Orange for highlights

Typography: Primary: Poppins, Secondary: Roboto

Animations: Hover glow, badge bounce, confetti on level-up

Cards: Quizzes, rooms, and badges with soft shadows and playful micro-interactions

Progress Bars: Animated XP bars with smooth gradient fill

Multilingual Support

Languages supported:

English (EN)

French (FR)

Arabic (AR, RTL)

Switch via buttons on the landing page.

To-Do / Future Enhancements

Full real-time multiplayer using WebSockets

Persistent leaderboards and user authentication

Advanced AI/ML features for recommendations and scoring analytics

Sound effects, confetti, and playful animations for engagement
