// src/screens/CombatScreen.jsx
import { useEffect, useState, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import Card from '../components/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { CARDS } from '../data/cards'; // IMPORTANTE: Importar CARDS aqui também

const StatusBadge = ({ status, value, icon, color }) => {
  if (!value || value <= 0) return null;
  return (
    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-${color}-500/20 text-${color}-400 border border-${color}-500/30 shadow-sm`}>
      <span>{icon}</span>
      <span>{value}</span>
    </div>
  );
};

const FloatingDamage = ({ damageList }) => (
  <AnimatePresence>
    {damageList.map(dmg => (
      <motion.div
        key={dmg.id}
        initial={{ opacity: 1, y: 0, scale: 0.5 }}
        animate={{ opacity: 0, y: -80, scale: 1.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 text-red-500 font-black text-5xl drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] z-50 pointer-events-none left-1/2 -translate-x-1/2"
      >
        -{dmg.val}
      </motion.div>
    ))}
  </AnimatePresence>
);

export default function CombatScreen() {
  const { player, combat, hand, drawPile, discardPile, exhaustPile, actions } = useGameStore();
  const enemy = combat.enemy;
  
  const [enemyDmg, setEnemyDmg] = useState([]);
  const [playerDmg, setPlayerDmg] = useState([]);
  const prevEnemyHp = useRef(enemy?.hp);
  const prevPlayerHp = useRef(player?.hp);

  useEffect(() => {
    if (enemy && prevEnemyHp.current > enemy.hp) {
      setEnemyDmg(p => [...p, { id: Date.now(), val: prevEnemyHp.current - enemy.hp }]);
    }
    prevEnemyHp.current = enemy?.hp;
  }, [enemy?.hp]);

  useEffect(() => {
    if (player && prevPlayerHp.current > player.hp) {
      setPlayerDmg(p => [...p, { id: Date.now(), val: prevPlayerHp.current - player.hp }]);
    }
    prevPlayerHp.current = player?.hp;
  }, [player?.hp]);

  if (!enemy) return <div className="h-screen flex items-center justify-center text-white">Loading Battle...</div>;

  const currentIntent = enemy.intents[enemy.intentIndex] || enemy.intents[0];
  const screenGlow = player.status?.vulnerable > 0 ? 'shadow-[inset_0_0_80px_rgba(168,85,247,0.2)]' : '';

  return (
    <div className={`h-screen flex flex-col justify-between p-8 max-w-6xl mx-auto overflow-hidden relative transition-shadow duration-500 ${screenGlow}`}>
      
      {/* ================= TOPO: Inimigo ================= */}
      <div className="flex justify-between items-start mt-4 relative z-10">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl flex items-center gap-6 shadow-lg">
           <div className={`text-6xl relative ${enemy.status?.poison > 0 ? 'drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]' : 'drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`}>
             {enemy.sprite}
             <FloatingDamage damageList={enemyDmg} />
           </div>
           <div className="flex flex-col gap-2">
              <h2 className="font-bold text-2xl text-red-400 tracking-wider">{enemy.name}</h2>
              <div className="flex items-center gap-3">
                <span className="text-red-500 font-bold bg-red-950/50 px-3 py-1 rounded-lg border border-red-900/50">❤️ {enemy.hp}/{enemy.maxHp}</span>
                <span className="text-blue-400 font-bold bg-blue-950/50 px-3 py-1 rounded-lg border border-blue-900/50">🛡️ {enemy.block || 0}</span>
              </div>
              <div className="flex gap-2 mt-1">
                <StatusBadge status="poison" value={enemy.status?.poison} icon="🧪" color="green" />
                <StatusBadge status="vulnerable" value={enemy.status?.vulnerable} icon="💔" color="purple" />
                <StatusBadge status="strength" value={enemy.status?.strength} icon="💪" color="amber" />
              </div>
           </div>
           
           <div className="ml-4 p-4 bg-black/60 rounded-2xl text-center border border-white/10 min-w-[100px]">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Intenção</div>
              <div className="font-bold text-xl flex flex-col items-center gap-1 justify-center">
                <span>{currentIntent.icon}</span>
                <span className="text-sm">{currentIntent.type === 'attack' ? currentIntent.value : currentIntent.label}</span>
              </div>
           </div>
        </div>

        {/* LOG de Combate */}
        <div className="w-72 bg-black/40 backdrop-blur-sm border border-white/5 p-4 rounded-xl space-y-2 text-sm text-right">
          <div className="text-xs text-gray-500 uppercase tracking-widest border-b border-white/10 pb-2 mb-2">Combat Record</div>
          {combat.log.map((log, i) => (
            <div key={i} className={`transition-opacity ${i === 0 ? "text-white font-bold opacity-100" : "text-gray-500 opacity-70"}`}>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* ================= MEIO: Jogador ================= */}
      <div className="flex items-end mb-10 relative z-10">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl flex items-center gap-6 shadow-lg">
           <div className="text-6xl drop-shadow-[0_0_15px_rgba(34,197,94,0.5)] relative">
             👤
             <FloatingDamage damageList={playerDmg} />
           </div>
           <div className="flex flex-col gap-2">
              <h2 className="font-bold text-2xl text-green-400 tracking-wider">Player</h2>
              <div className="flex items-center gap-3">
                <span className="text-green-500 font-bold bg-green-950/50 px-3 py-1 rounded-lg border border-green-900/50">❤️ {player.hp}/{player.maxHp}</span>
                <span className="text-blue-400 font-bold bg-blue-950/50 px-3 py-1 rounded-lg border border-blue-900/50">🛡️ {player.block}</span>
                <span className="text-amber-400 font-bold bg-amber-950/50 px-3 py-1 rounded-lg border border-amber-900/50 ml-2">⚡ {player.energy}/{player.maxEnergy}</span>
              </div>
              <div className="flex gap-2 mt-1">
                <StatusBadge status="strength" value={player.status?.strength} icon="💪" color="amber" />
                <StatusBadge status="thorns" value={player.status?.thorns} icon="🌵" color="green" />
                <StatusBadge status="weak" value={player.status?.weak} icon="📉" color="gray" />
              </div>
           </div>
        </div>
      </div>

      {/* ================= BASE: Pilhas, Mão e Controles ================= */}
      <div className="relative flex justify-center items-end h-64 w-full pointer-events-none">
        
        {/* Pilha de Compra */}
        <div className="absolute left-4 bottom-4 flex flex-col items-center pointer-events-auto z-20">
          <div className="w-16 h-24 bg-white/10 border-2 border-white/20 rounded-xl flex items-center justify-center font-bold text-2xl text-gray-300 shadow-lg">
            {drawPile.length}
          </div>
          <span className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest">Deck</span>
        </div>

        {/* Mão de Cartas */}
        <div className="flex justify-center relative z-30 w-full max-w-3xl pointer-events-auto">
          {hand.map((card, idx) => {
            const rotation = (idx - (hand.length - 1) / 2) * 6;
            const yOffset = Math.abs(idx - (hand.length - 1) / 2) * 12;
            
            // Recalcula o custo real para saber se bloqueia a carta
            const baseCard = Object.values(CARDS).find(c => c.id === card.id) || card;
            const actualCost = typeof baseCard.cost === 'function' ? baseCard.cost(card.upgraded) : baseCard.cost;
            
            return (
              <div 
                key={idx} 
                style={{ transform: `rotate(${rotation}deg) translateY(${yOffset}px)`, transformOrigin: 'bottom center' }} 
                className="mx-[-15px] transition-all duration-300 z-30 hover:z-50 hover:-translate-y-12 hover:scale-110 cursor-pointer"
              >
                <Card 
                  card={card} 
                  disabled={player.energy < actualCost}
                  onClick={() => actions.playCard(idx)} 
                />
              </div>
            );
          })}
        </div>

        {/* BOTÃO DE ENCERRAR TURNO */}
        <div className="absolute right-8 top-[-4rem] pointer-events-auto z-50">
          <button 
            onClick={actions.endTurn}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black uppercase tracking-widest font-extrabold rounded-xl transition-transform hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.4)] border-2 border-amber-300"
          >
            End Turn
          </button>
        </div>
        
        {/* Pilhas de Descarte */}
        <div className="absolute right-4 bottom-4 flex gap-4 items-end pointer-events-auto z-20">
          <div className="flex flex-col items-center opacity-70">
            <div className="w-12 h-16 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center justify-center font-bold text-lg text-red-400">
              {exhaustPile.length}
            </div>
            <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Exiles</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-24 bg-white/5 border-2 border-white/20 rounded-xl flex items-center justify-center font-bold text-2xl text-gray-400 shadow-lg">
              {discardPile.length}
            </div>
            <span className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest">Discard</span>
          </div>
        </div>

      </div>
    </div>
  );
}

