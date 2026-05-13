// src/screens/GameOverScreen.jsx
import { useGameStore } from '../store/useGameStore';

export default function GameOverScreen() {
  const { map, actions } = useGameStore();

  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 text-center bg-black/80">
      <h1 className="text-7xl font-bold text-red-600 mb-6 uppercase tracking-widest drop-shadow-[0_0_25px_rgba(220,38,38,0.8)]">
        End Game
      </h1>
      <p className="text-2xl text-gray-400 mb-12">
        The tower consumed your soul at <span className="text-red-400 font-bold">Floor {map.currentFloor}</span>.
      </p>
      
      <button 
        onClick={actions.startGame}
        className="px-10 py-5 bg-red-950/80 hover:bg-red-800/90 border border-red-600 text-white uppercase tracking-widest font-bold rounded-2xl transition-all hover:scale-110 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
      >
        Try Again
      </button>
    </div>
  );
}
