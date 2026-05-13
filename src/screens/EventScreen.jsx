// src/screens/EventScreen.jsx
import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { EVENTS } from '../data/events';

export default function EventScreen() {
  const { actions } = useGameStore();
  
  const [event] = useState(() => EVENTS[Math.floor(Math.random() * EVENTS.length)]);

  const handleOptionClick = (effectFunction) => {
    // Aplica os efeitos da escolha
    useGameStore.setState((state) => effectFunction(state));
    // Conclui o nó e volta para o mapa
    actions.completeNode();
  };

  // Trava de segurança extra
  if (!event) return null;

  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 max-w-3xl mx-auto">
      <div className="text-6xl mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">❓</div>
      <h1 className="text-4xl font-bold text-purple-400 mb-8 tracking-widest uppercase text-center">{event.title}</h1>
      
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl w-full shadow-2xl text-center space-y-8">
        
        <p className="text-lg text-gray-300 leading-relaxed italic border-b border-white/10 pb-8">
          "{event.description}"
        </p>

        <div className="flex flex-col gap-4 mt-4">
          {event.options.map((option, idx) => (
            <button 
              key={idx}
              onClick={() => handleOptionClick(option.effect)}
              className="p-4 bg-black/40 border border-purple-500/30 rounded-xl hover:border-purple-400 hover:bg-purple-900/20 hover:scale-[1.02] transition-all text-left group"
            >
              <div className="font-bold text-purple-300 group-hover:text-white transition-colors">
                {idx + 1}. {option.label}
              </div>
            </button>
          ))}
        </div>
        
      </div>
    </div>
  );
}

