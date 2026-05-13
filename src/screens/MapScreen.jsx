// src/screens/MapScreen.jsx
import { useGameStore } from '../store/useGameStore';
import RelicBar from '../components/RelicBar';

const ICONS = {
  combat: '⚔️ Combat',
  elite: '💀 Elite',
  boss: '🔥 Boss',
  shop: '🏪 Shop',
  event: '❓ Event',
  rest: '🏕️ Rest'
};

export default function MapScreen() {
  const { map, player, actions } = useGameStore();

  return (
    <div className="h-screen flex flex-col items-center overflow-y-auto hide-scrollbar pb-20">
      
      {/* ================= HUD FIXO SUPERIOR ================= */}
      <div className="fixed top-0 w-full max-w-4xl flex flex-col items-center bg-black/60 backdrop-blur-xl p-4 rounded-b-[2rem] border-b border-white/10 z-50 shadow-2xl">
        <div className="w-full flex justify-between items-center mb-4 px-6">
          <div className="flex items-center gap-3">
            <span className="text-red-400 font-bold bg-red-950/40 px-4 py-2 rounded-xl border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              ❤️ {player.hp} / {player.maxHp}
            </span>
            <span className="text-yellow-400 font-bold bg-yellow-900/40 px-4 py-2 rounded-xl border border-yellow-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              💰 {player.gold}
            </span>
          </div>
          
          <div className="text-gray-300 font-bold bg-white/5 px-6 py-2 rounded-xl border border-white/10 uppercase tracking-[0.2em] text-xs">
            Current Floor: <span className="text-white text-base">{map.currentFloor}</span>
          </div>
        </div>

        {/* Barra de Relíquias Integrada */}
        <RelicBar />
      </div>

      {/* ================= MAPA PROCEDURAL ================= */}
      <div className="mt-48 flex flex-col-reverse gap-8 w-full items-center max-w-md px-4">
        {map.nodes.map((node) => {
          const isAvailable = node.status === 'available';
          const isCompleted = node.status === 'completed';
          const isCurrent = map.currentFloor === node.floor;
          
          return (
            <div key={node.id} className="flex flex-col items-center w-full relative">
              
              {/* Botão do Nó do Mapa */}
              <button
                disabled={!isAvailable}
                onClick={() => actions.navigateToNode(node)}
                className={`
                  w-full p-5 rounded-2xl font-bold border transition-all duration-500 relative z-10
                  ${isAvailable 
                    ? 'bg-purple-600/20 border-purple-500 text-white hover:scale-105 hover:bg-purple-600/40 shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer' 
                    : isCompleted 
                    ? 'bg-green-900/10 border-green-500/20 text-green-500/40 opacity-60 grayscale' 
                    : 'bg-black/40 border-white/5 text-gray-600 opacity-40 cursor-not-allowed'
                  }
                  ${isCurrent ? 'ring-2 ring-amber-500 ring-offset-4 ring-offset-black animate-pulse' : ''}
                `}
              >
                <div className="flex justify-between items-center px-2">
                  <span className="text-xs uppercase tracking-widest opacity-50">Floor {node.floor}</span>
                  <span className="text-lg">{ICONS[node.type]}</span>
                </div>
              </button>

              {/* Conector Visual (Linha entre nós) */}
              {node.floor !== 1 && (
                <div className={`
                  absolute -bottom-8 w-1 h-8 transition-colors duration-500
                  ${isCompleted ? 'bg-green-500/30' : 'bg-white/10'}
                `}></div>
              )}

              {/* Indicador de "Você está aqui" */}
              {isCurrent && (
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-amber-500 animate-bounce">
                  ▶
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FIM DA TORRE */}
      <div className="mt-20 mb-10 text-gray-700 font-bold uppercase tracking-[0.5em] text-sm">
        Card Tower
      </div>
    </div>
  );
}

