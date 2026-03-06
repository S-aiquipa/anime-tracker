# 🎌 Anime Tracker — Frontend

The frontend of Anime Tracker, a web app to track the anime you've watched, are watching, or want to watch — inspired by the Spotify playlist UI.

> 🔗 Backend repository: [anime-tracker-backend](https://github.com/your-username/anime-tracker-backend)

## ✨ Features

- 🔐 Login & Register UI with JWT authentication
- 🔍 Search anime by name with debounced input
- ➕ Add anime to your personal list
- 📋 Change status: Want to watch / Watching / Completed
- ⭐ Rate anime from 1 to 5 stars
- 🗑️ Delete anime from your list
- 🎨 Spotify-inspired dark playlist design

## 🛠️ Tech Stack

- React (Vite)
- CSS (custom design, no UI library)

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- Backend server running ([see backend repo](https://github.com/your-username/anime-tracker-backend))

### 1. Clone the repository

```bash
git clone https://github.com/your-username/anime-tracker-frontend.git
cd anime-tracker-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> ⚠️ Make sure the backend is running on `http://localhost:5000` before starting the frontend.

## 📁 Project Structure

```
src/
├── components/
│   ├── AddAnimeForm.jsx   # Search bar + anime suggestions dropdown
│   ├── AddAnimeForm.css
│   ├── AnimeList.jsx      # Playlist-style anime table
│   ├── AnimeList.css
│   ├── Auth.jsx           # Login & Register forms
│   └── Auth.css
└── App.jsx                # Main app, routing, state management
```

## 📸 Screenshots

_Coming soon_

## 🌐 Live Demo

https://anime-tracker-wheat-sigma.vercel.app

## 👨‍💻 Author

Made with ❤️ from Lima, Peru 🇵🇪  
First full stack project — Software Engineering student.
