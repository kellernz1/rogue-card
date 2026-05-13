// src/screens/ShopScreen.jsx
import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { CARDS } from '../data/cards';
import { RELICS } from '../data/relics';
import Card from '../components/Card';

export default function ShopScreen() {
  const { player, deck, actions } = useGameStore();
  
  // Sorteia os itens da loja 1 única vez quando a tela abre
  const [shopItems] = useState(() => {
    const allCards = Object.values(CARDS);
    const allRelics = Object.values(RELICS);
    
    return {
      cards: Array(4).fill(null).map(() => ({
        item: allCards[Math.floor(Math.random() * allCards.length)],
        cost: Math.floor(Math.random() * 40) + 50, // 50 a 90 de ouro
        sold: false
      })),
      relics: Array(2).fill(null).map(() => ({
        item: allRelics[Math.floor(Math.random() * allRelics.length)],
        cost: Math.floor(Math.random() * 50) + 130, // 130 a 180 de ouro
        sold: false
      }))
    };
  });

  const [items, setItems] = useState(shopItems);
  const [removingCard, setRemovingCard] = useState(false);
  const removeCost = 75;

  const handleBuyCard = (idx) => {
    const shopCard = items.cards[idx];
    if (player.gold >= shopCard.cost && !shopCard.sold) {
      actions.buyCard(shopCard.item, shopCard.cost);
      const newItems = { ...items };
      newItems.cards[idx].sold = true;
      setItems(newItems);
    }
  };

  const handleBuyRelic = (idx) => {
    const shopRelic = items.relics[idx];
    if (player.gold >= shopRelic.cost && !shopRelic.sold) {
      actions.buyRelic(shopRelic.item, shopRelic.cost);
      const newItems = { ...items };
      newItems.relics[idx].sold = true;
      setItems(newItems);
    }
  };

  const handleRemoveCard = (deckIdx) => {
    if (player.gold >= removeCost) {
      actions.removeCardFromDeck(deckIdx, removeCost);
      setRemovingCard(false);
    }
  };

  return (
    <div className="h-screen flex flex-col p-8 max-w-6xl mx-auto overflow-hidden">
      {/* HEADER DA LOJA */}
      <div className="flex justify-between items-center bg-black/60 backdrop-blur border border-white/10 p-6 rounded-3xl mb-8">
        <div>
          <h1 className="text-4xl font-bold text-amber-500 tracking-widest uppercase">Merchant</h1>
          <p className="text-gray-400 mt-2 italic">"I have goods if you have the coins..."</p>
        </div>
        <div className="flex gap-6 items-center">
          <div className="text-2xl font-bold text-yellow-400 bg-yellow-900/30 px-6 py-3 rounded-xl border border-yellow-500/50">
            💰 {player.gold} Gold
          </div>
          <button 
            onClick={actions.completeNode}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20"
          >
            Exit Shop
          </button>
        </div>
      </div>

      {/* ÁREA DE REMOÇÃO DE CARTA (MODAL SOBREPOSTO) */}
      {removingCard ? (
        <div className="bg-black/80 backdrop-blur-md absolute inset-0 z-50 flex flex-col items-center p-10 overflow-y-auto">
          <h2 className="text-3xl font-bold text-red-400 mb-2">Choose a card to remove</h2>
          <p className="text-gray-400 mb-8">Cost: {removeCost} Gold</p>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
            {deck.map((card, idx) => (
              <div key={idx} className="relative group cursor-pointer" onClick={() => handleRemoveCard(idx)}>
                <Card card={card} disabled={false} />
                <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/40 rounded-2xl transition-all flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 font-bold text-xl drop-shadow-md">Excluir</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setRemovingCard(false)} className="mt-10 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl">Cancelar</button>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {/* PRATELEIRA DE CARTAS E SERVIÇOS */}
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              {items.cards.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3">
                  <div className={item.sold ? 'opacity-30 pointer-events-none grayscale' : ''}>
                    <Card card={item.item} disabled={player.gold < item.cost} onClick={() => handleBuyCard(idx)} />
                  </div>
                  <button 
                    disabled={item.sold || player.gold < item.cost}
                    onClick={() => handleBuyCard(idx)}
                    className={`px-4 py-1 rounded-lg font-bold border ${item.sold ? 'bg-black text-gray-600 border-gray-800' : player.gold >= item.cost ? 'bg-yellow-900/50 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500 hover:text-black' : 'bg-red-900/30 text-red-500 border-red-900/50'}`}
                  >
                    {item.sold ? 'Vendido' : `${item.cost} Gold`}
                  </button>
                </div>
              ))}
            </div>

            {/* SERVIÇO DE REMOÇÃO */}
            <div className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl w-48">
              <div className="text-5xl mb-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">🔥</div>
              <h3 className="font-bold text-center">Remove Card</h3>
              <button 
                disabled={player.gold < removeCost}
                onClick={() => setRemovingCard(true)}
                className={`w-full py-2 rounded-lg font-bold border mt-4 ${player.gold >= removeCost ? 'bg-yellow-900/50 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500 hover:text-black' : 'bg-red-900/30 text-red-500 border-red-900/50'}`}
              >
                {removeCost} Ouro
              </button>
            </div>
          </div>

          {/* PRATELEIRA DE RELÍQUIAS */}
          <div>
            <h3 className="text-gray-500 font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Magic Relics</h3>
            <div className="flex gap-6">
              {items.relics.map((item, idx) => (
                <div key={idx} className={`flex items-center gap-4 p-4 rounded-2xl border ${item.sold ? 'bg-black/50 border-gray-800 opacity-50 grayscale' : 'bg-spire-purple/20 border-spire-purple/50'}`}>
                  <div className="text-5xl">{item.item.icon}</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-purple-300">{item.item.name}</span>
                    <span className="text-xs text-gray-400 mb-2 max-w-[200px]">{item.item.description}</span>
                    <button 
                      disabled={item.sold || player.gold < item.cost}
                      onClick={() => handleBuyRelic(idx)}
                      className={`px-3 py-1 text-sm rounded border w-fit ${item.sold ? 'bg-black text-gray-600 border-gray-800' : player.gold >= item.cost ? 'bg-yellow-900/50 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500 hover:text-black' : 'bg-red-900/30 text-red-500 border-red-900/50'}`}
                    >
                      {item.sold ? 'Vendido' : `${item.cost} Ouro`}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

