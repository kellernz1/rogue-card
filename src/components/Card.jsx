// src/components/Card.jsx
import { motion } from 'framer-motion';
import { CARDS } from '../data/cards';

export default function Card({ card, onClick, disabled }) {
  // Resgata a carta original do dicionário para recuperar funções perdidas no LocalStorage
  const baseCard = Object.values(CARDS).find(c => c.id === card.id) || card;
  const isUpgraded = card.upgraded || false;
  
  const colors = {
    attack: 'border-red-500 hover:shadow-red-500/50',
    skill: 'border-green-500 hover:shadow-green-500/50',
    power: 'border-blue-500 hover:shadow-blue-500/50',
    curse: 'border-gray-500 hover:shadow-gray-500/50'
  };

  // Executa as funções recarregadas
  const cost = typeof baseCard.cost === 'function' ? baseCard.cost(isUpgraded) : baseCard.cost;
  const desc = typeof baseCard.description === 'function' ? baseCard.description(isUpgraded) : baseCard.description;

  return (
    <motion.div 
      whileHover={{ y: -20, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={disabled ? null : onClick}
      className={`relative w-40 h-56 rounded-2xl border backdrop-blur-md bg-white/5 p-3 flex flex-col transition-shadow ${colors[baseCard.type]} ${disabled ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="absolute top-2 left-2 bg-slate-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm border border-white/20 shadow-md">
        {cost}
      </div>
      <h3 className="text-center font-bold mt-1 text-sm flex justify-center items-center gap-1">
        {baseCard.name} {isUpgraded && <span className="text-green-400 font-extrabold text-base drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]">+</span>}
      </h3>
      <div className="flex-1 mt-2 text-xs text-center text-gray-300 bg-black/40 rounded-lg p-2 border border-white/5 flex items-center justify-center">
        {desc}
      </div>
    </motion.div>
  );
}

