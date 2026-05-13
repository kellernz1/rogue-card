// src/screens/RewardScreen.jsx
import { useGameStore } from '../store/useGameStore';
import Card from '../components/Card';

export default function RewardScreen() {
  const { reward, actions } = useGameStore();

  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 max-w-5xl mx-auto">
      <h1 className="text-6xl font-bold text-amber-500 mb-8 tracking-widest uppercase drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
        Victory!
      </h1>
      
      <div className="bg-white/10 backdrop-blur-md border border-white/10 p-10 rounded-3xl w-full text-center shadow-2xl">
        <div className="text-2xl mb-8">
          You found <span className="text-yellow-400 font-bold bg-yellow-900/40 px-4 py-2 rounded-xl border border-yellow-500/40 shadow-inner ml-2">💰 {reward.gold} Gold</span>
        </div>

        <div className="h-px w-full bg-white/10 my-8"></div>

        <h3 className="text-xl text-gray-300 font-bold uppercase tracking-widest mb-8">
          Choose a card to add to your deck:
        </h3>
        
        {/* Renderiza as Cartas Físicas para escolha */}
        <div className="flex justify-center gap-8 mt-4">
          {reward.cards.map((card, idx) => (
            <div 
              key={idx} 
              className="relative group cursor-pointer hover:-translate-y-4 transition-transform duration-300" 
              onClick={() => actions.collectReward(card)}
            >
              <Card card={card} disabled={false} />
              
              {/* Overlay verde brilhante ao passar o mouse */}
              <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/20 rounded-2xl transition-all flex items-center justify-center pointer-events-none border border-transparent group-hover:border-green-400">
                <span className="opacity-0 group-hover:opacity-100 font-bold text-2xl drop-shadow-[0_0_5px_black] text-green-400 uppercase tracking-widest">
                  Collect
                </span>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => actions.collectReward(null)}
          className="mt-14 px-10 py-4 border border-white/20 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all uppercase tracking-widest font-bold hover:scale-105"
        >
          Skip Reward
        </button>
      </div>
    </div>
  );
}

