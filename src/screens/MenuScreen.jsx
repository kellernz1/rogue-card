// src/screens/MenuScreen.jsx
import { useGameStore } from '../store/useGameStore';

export default function MenuScreen() {
  const { actions } = useGameStore();

  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Elementos visuais de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="text-center mb-16 z-10 animate-pulse">
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-amber-600 tracking-widest uppercase drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] mb-4">
          Rogue Card
        </h1>
        <p className="text-gray-400 tracking-widest uppercase text-sm border-t border-white/10 pt-4 w-fit mx-auto">
          React + Tailwind Roguelike
        </p>
      </div>

      <div className="flex flex-col gap-6 w-72 z-10">
        <button 
          onClick={actions.startGame}
          className="px-8 py-5 bg-purple-900/40 hover:bg-purple-600 border border-purple-500 text-white uppercase tracking-widest font-bold rounded-2xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        >
          New Run
        </button>
        <button 
          disabled
          className="px-8 py-5 bg-black/40 border border-white/10 text-gray-600 uppercase tracking-widest font-bold rounded-2xl cursor-not-allowed"
        >
          Continue
        </button>
      </div>
      
      <div className="absolute bottom-6 text-xs text-gray-600 tracking-widest uppercase font-bold">
        By Keller Nz
      </div>
    </div>
  );
}

