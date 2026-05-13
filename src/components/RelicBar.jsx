// src/components/RelicBar.jsx
import { useGameStore } from '../store/useGameStore';

export default function RelicBar() {
  const { player } = useGameStore();

  if (!player.relics || player.relics.length === 0) return null;

  return (
    <div className="flex gap-2 p-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 w-fit shadow-lg">
      {player.relics.map((relic, idx) => (
        <div key={idx} className="relative group cursor-help flex items-center justify-center w-10 h-10 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5">
          <div className="text-2xl drop-shadow-md">{relic.icon}</div>
          
          {/* Tooltip que aparece no hover */}
          <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-48 bg-black/95 text-white text-xs p-3 rounded-xl border border-purple-500/50 opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <div className="font-bold text-purple-300 text-sm mb-1">{relic.name}</div>
            <div className="text-gray-300 leading-relaxed">{relic.description}</div>
            {/* Triângulo do Tooltip */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-purple-500/50"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

