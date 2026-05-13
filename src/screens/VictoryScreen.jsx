// src/screens/VictoryScreen.jsx
import { useGameStore } from '../store/useGameStore';

export default function VictoryScreen() {
  const { actions, player, deck } = useGameStore();

  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">
      {/* Confetes em CSS via Tailwind (Simulados com emojis flutuantes estáticos para o protótipo) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex flex-wrap justify-around items-center text-5xl">
        ✨ 🎉 🏆 ✨ 🎊 🥇 ✨ 🎉
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg border border-yellow-500/30 p-12 rounded-3xl z-10 shadow-[0_0_50px_rgba(234,179,8,0.2)]">
        <h1 className="text-7xl font-bold text-yellow-500 mb-4 uppercase tracking-widest drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]">
          Victory!
        </h1>
        <p className="text-xl text-gray-300 mb-8 italic">
          The heart of the tower stopped beating. You survived.
        </p>

        <div className="grid grid-cols-2 gap-6 mb-12 text-left">
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="text-sm text-gray-500 uppercase tracking-widest">Gold Accumulated</div>
            <div className="text-2xl font-bold text-yellow-400">💰 {player.gold}</div>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="text-sm text-gray-500 uppercase tracking-widest">Deck Size</div>
            <div className="text-2xl font-bold text-blue-400">🃏 {deck.length} Cards</div>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="text-sm text-gray-500 uppercase tracking-widest">HP Remaining</div>
            <div className="text-2xl font-bold text-green-400">❤️ {player.hp} / {player.maxHp}</div>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="text-sm text-gray-500 uppercase tracking-widest">Relics</div>
            <div className="text-2xl font-bold text-purple-400">🔮 {player.relics.length}</div>
          </div>
        </div>
        
        <button 
          onClick={actions.startGame}
          className="px-10 py-5 bg-yellow-600 hover:bg-yellow-500 text-black uppercase tracking-widest font-extrabold rounded-2xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.4)]"
        >
          Start New Run
        </button>
      </div>
    </div>
  );
}

