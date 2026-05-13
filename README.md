# 🃏 Rogue Card

A browser-based roguelike deckbuilder inspired by *Slay the Spire*, built with a modern **React** stack and a sleek **dark glassmorphism** aesthetic.

![Version](https://img.shields.io/badge/version-1.0.0-purple)
![React](https://img.shields.io/badge/React-18-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8)
![Zustand](https://img.shields.io/badge/State-Zustand-orange)

---

## 🎮 Overview

**Rogue Card** is a tactical card game where you climb 15 floors of a procedural tower.

Battle dangerous enemies, manage your energy, build synergistic decks, discover relics, and survive random events to defeat the final boss.

The project was designed to recreate the addictive strategy loop of modern roguelike deckbuilders while showcasing scalable frontend architecture using React.

---

## ✨ Key Features

### 🗺️ Procedural Map Generation

Every run is unique.

The game dynamically generates a tower containing:
- ⚔️ Combat Rooms
- 💀 Elite Encounters
- 👑 Boss Battles
- 🛒 Shops
- ❓ Random Events
- 🔥 Rest Sites

---

### ⚔️ Dynamic Combat Engine

A complete turn-based combat system featuring:
- Energy management
- Status effects
- Enemy intent indicators
- Buffs & debuffs
- Combo interactions

#### 🧪 Status Effects
- Poison
- Strength
- Weak
- Vulnerable
- Shield
- Regeneration

---

### 🃏 Deckbuilding & Card Upgrades

Start with a simple deck and evolve your strategy throughout the run.

Players can:
- Add new cards
- Remove weak cards
- Upgrade existing cards
- Create powerful synergies

At **Rest Sites**, choose between:
- ❤️ Healing
- 🔨 Forging cards

---

### ✨ Glassmorphism UI

Modern visual design inspired by:
- Glassmorphism interfaces
- Dark fantasy aesthetics
- Minimalist RPG menus

Visual effects include:
- Backdrop blur
- Glow borders
- Smooth hover transitions
- Animated combat feedback

Powered by **Framer Motion**.

---

### 💾 Persistent Save System

The game automatically saves progress after every action using:
- Browser `localStorage`

Runs can be resumed instantly after refreshing or closing the browser.

---

### 📱 Responsive Design

Optimized for:
- Desktop gameplay
- 1280px+ layouts
- Ultrawide displays

Includes:
- Grain-texture backgrounds
- Dynamic scaling
- Responsive panels

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Zustand | Global State Management |
| Framer Motion | Animations |
| Lucide React | Icons |
| localStorage | Save Persistence |

---

## 🧠 Concepts Practiced

This project was built to explore and demonstrate:

- Component-driven architecture
- State management with Zustand
- Procedural content generation
- Turn-based combat systems
- Save persistence logic
- Scalable frontend folder structures
- UI/UX polish and animation systems

---

## 📂 File Structure

The project follows a modular architecture for scalability and maintainability.

```text
src/
├── components/     # Reusable UI components
│   ├── Card.jsx
│   ├── HPBar.jsx
│   └── RelicBar.jsx
│
├── data/           # Static game definitions
│   ├── cards.js
│   ├── enemies.js
│   ├── relics.js
│   └── events.js
│
├── logic/          # Pure gameplay functions
│   ├── combat.js
│   ├── mapGenerator.js
│   └── rewards.js
│
├── screens/        # Main game views
│   ├── CombatScreen.jsx
│   ├── MapScreen.jsx
│   ├── ShopScreen.jsx
│   ├── VictoryScreen.jsx
│   └── GameOverScreen.jsx
│
├── store/          # Zustand global state
│   └── useGameStore.js
│
├── utils/          # Utilities and constants
│   └── random.js
│
└── App.jsx         # Main router/controller
```

---

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/kellernz1/rogue-card
cd spire-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open your browser at:

```text
http://localhost:5173
```

---

## 📦 Deployment

This project is configured for **GitHub Pages** deployment.

### Steps

#### 1. Update `vite.config.js`

Set the `base` property to match your repository name.

Example:

```js
base: "/spire-clone/"
```

#### 2. Deploy the project

```bash
npm run deploy
```

---

## 🎨 Visual Inspiration

Inspired by:
- *Slay the Spire*
- Modern glassmorphism UI trends
- Dark fantasy interfaces
- Tactical roguelike games

---

## 🔮 Future Improvements

- [ ] 🎵 Dynamic soundtrack & SFX
- [ ] 🧬 More card archetypes
- [ ] 👹 Additional enemy factions
- [ ] 🧩 Relic synergy system
- [ ] ☁️ Cloud save support
- [ ] 🎮 Controller support
- [ ] 🌎 Procedural events expansion
- [ ] 🏆 Unlockable characters

---

## 📜 License

This project is open-source and available under the **MIT License**.

Feel free to fork, study, and expand upon it.

---

## 🤝 Acknowledgments

- Inspired by Mega Crit’s *Slay the Spire*
- UI aesthetic inspired by modern glassmorphism trends
- Built as a portfolio and learning project

---

## 👨‍💻 Author

Developed by **Keller Nz**

---

## ⭐ Support

If you enjoyed this project, consider giving it a ⭐ on GitHub!
