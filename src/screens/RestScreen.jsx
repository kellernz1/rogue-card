// src/screens/RestScreen.jsx
import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import Card from '../components/Card';

export default function RestScreen() {
  const { player, deck, actions } = useGameStore();
  const [isForging, setIsForging] = useState(false);

  const handleRest = () => {
    const healAmount = Math.floor(player.maxHp * 0.3);
    useGameStore.setState((state) => ({
      player: { ...state.player, hp: Math.min(state.player.maxHp, state.player.hp + healAmount) }
    }));
    actions.completeNode();
  };

  const handleUpgrade = (idx) => {
    actions.upgradeCard(idx);
    actions.completeNode();
  };

  if (isForging) {
    return (
      <div className="h-screen flex flex-col items-center p-10 bg-black/90 overflow-y-auto">
        <h2 className="text-4xl font-bold text-amber-500 mb-8 uppercase tracking-widest">Escolha uma carta para Forjar</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl">
          {deck.map((card, idx) => (
            <div key={idx} className="relative group cursor-pointer" onClick={() => !card.upgraded && card.type !== 'curse' && handleUpgrade(idx)}>
              <Card card={card} disabled={card.upgraded || card.type === 'curse'} />
              {!card.upgraded && card.type !== 'curse' && (
                <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/30 rounded-2xl transition-all flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 font-bold text-2xl drop-shadow-[0_0_5px_black] text-amber-300">⬆ Forjar</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <button onClick={() => setIsForging(false)} className="mt-10 px-8 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors uppercase tracking-widest font-bold">Voltar</button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
      <div className="text-7xl mb-6 drop-shadow-[0_0_20px_rgba(249,115,22,0.6)] animate-pulse">🏕️</div>
      <h1 className="text-4xl font-bold text-amber-500 mb-2 tracking-widest uppercase">Rest</h1>
      <p className="text-gray-400 mb-10">The fire crackles. What will you do?</p>
      
      <div className="flex gap-8 w-full justify-center">
        <button onClick={handleRest} className="w-64 h-64 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-green-500 hover:bg-green-900/20 hover:-translate-y-4 transition-all group shadow-lg">
          <div className="text-5xl group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">❤️</div>
          <h2 className="text-2xl font-bold text-gray-200 group-hover:text-white uppercase tracking-wider">Rest</h2>
          <p className="text-sm text-green-400 text-center px-4">Heals 30% of Max HP.</p>
        </button>

        <button onClick={() => setIsForging(true)} className="w-64 h-64 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-amber-500 hover:bg-amber-900/20 hover:-translate-y-4 transition-all group shadow-lg">
          <div className="text-5xl group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">🔨</div>
          <h2 className="text-2xl font-bold text-gray-200 group-hover:text-white uppercase tracking-wider">Forge</h2>
          <p className="text-sm text-amber-400 text-center px-4">Upgrade 1 card in your deck permanently.</p>
        </button>
      </div>
    </div>
  );
}

