// src/store/useGameStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateMap } from '../logic/mapGenerator';
import { CARDS } from '../data/cards';
import { ENEMIES } from '../data/enemies';

const checkCombatEnd = (state) => {
  if (state.combat.enemy.hp <= 0) {
    if (state.map.currentFloor >= 15) {
      return { ...state, screen: 'victory' };
    }
    const cardsArray = Object.values(CARDS);
    return {
      ...state,
      screen: 'reward',
      reward: {
        gold: Math.floor(Math.random() * 20) + 15,
        cards: [
          { ...cardsArray[Math.floor(Math.random() * 8)], upgraded: false }, 
          { ...cardsArray[Math.floor(Math.random() * 7) + 8], upgraded: false }, 
          { ...cardsArray[Math.floor(Math.random() * cardsArray.length)], upgraded: false } 
        ]
      }
    };
  }
  return state;
};

export const useGameStore = create(
  persist(
    (set) => ({
      screen: 'menu',
      player: { hp: 80, maxHp: 80, gold: 0, block: 0, energy: 3, maxEnergy: 3, status: {}, relics: [] },
      deck: [], hand: [], drawPile: [], discardPile: [], exhaustPile: [],
      map: { nodes: [], currentFloor: 0 },
      combat: { enemy: null, turn: 'player', log: [], turnCount: 1 },
      reward: { gold: 0, cards: [] },

      actions: {
        startGame: () => set((state) => ({
          screen: 'map',
          deck: [
            { ...CARDS.STRIKE, upgraded: false }, { ...CARDS.STRIKE, upgraded: false }, 
            { ...CARDS.STRIKE, upgraded: false }, { ...CARDS.STRIKE, upgraded: false }, 
            { ...CARDS.STRIKE, upgraded: false },
            { ...CARDS.DEFEND, upgraded: false }, { ...CARDS.DEFEND, upgraded: false }, 
            { ...CARDS.DEFEND, upgraded: false }, { ...CARDS.DEFEND, upgraded: false },
            { ...CARDS.DOUBLE_STRIKE, upgraded: false }
          ],
          map: { nodes: generateMap(), currentFloor: 0 },
          player: { ...state.player, hp: state.player.maxHp, gold: 99, status: { poison: 0, weak: 0, vulnerable: 0, strength: 0, thorns: 0 }, relics: [] }
        })),

        navigateToNode: (node) => set((state) => {
          const mapState = { ...state.map, currentFloor: node.floor };
          if (['combat', 'elite', 'boss'].includes(node.type)) {
            const enemyTemplates = Object.values(ENEMIES);
            const enemy = { ...enemyTemplates[Math.floor(Math.random() * enemyTemplates.length)] }; 
            const shuffled = [...state.deck].sort(() => Math.random() - 0.5);
            const initialHand = shuffled.splice(0, 5);
            return {
              screen: 'combat', map: mapState, drawPile: shuffled, hand: initialHand, discardPile: [], exhaustPile: [],
              player: { ...state.player, energy: state.player.maxEnergy, block: 0 },
              combat: { enemy, turn: 'player', log: [`Batalha contra ${enemy.name}!`], turnCount: 1 }
            };
          } 
          return { screen: node.type, map: mapState };
        }),

        completeNode: () => set((state) => {
          const newNodes = state.map.nodes.map(n => {
            if (n.floor === state.map.currentFloor) return { ...n, status: 'completed' };
            if (n.floor === state.map.currentFloor + 1) return { ...n, status: 'available' };
            return n;
          });
          return { screen: 'map', map: { ...state.map, nodes: newNodes } };
        }),

        upgradeCard: (cardIndex) => set((state) => {
          const newDeck = [...state.deck];
          newDeck[cardIndex] = { ...newDeck[cardIndex], upgraded: true };
          return { deck: newDeck };
        }),

        playCard: (cardIndex) => set((state) => {
          if (state.combat.turn !== 'player') return state;
          const cardObj = state.hand[cardIndex];
          
          // Re-hidrata para garantir que as funções da carta existem após load do LocalStorage
          const baseCard = Object.values(CARDS).find(c => c.id === cardObj.id);
          const isUp = cardObj.upgraded || false;
          
          let actualCost = typeof baseCard.cost === 'function' ? baseCard.cost(isUp) : baseCard.cost;
          if (state.player.energy < actualCost) return state;
          
          const newHand = [...state.hand];
          newHand.splice(cardIndex, 1);
          
          let newState = {
            ...state, hand: newHand,
            discardPile: baseCard.exhaust ? state.discardPile : [...state.discardPile, cardObj],
            exhaustPile: baseCard.exhaust ? [...state.exhaustPile, cardObj] : state.exhaustPile,
            player: { ...state.player, energy: state.player.energy - actualCost }
          };

          newState = baseCard.effect(newState, isUp);
          newState.combat.log = [`Você usou ${baseCard.name}${isUp ? '+' : ''}`, ...newState.combat.log].slice(0, 5);

          return checkCombatEnd(newState);
        }),

        endTurn: () => set((state) => {
          let newState = { ...state };
          
          const newDiscard = [...newState.discardPile, ...newState.hand];
          newState.hand = [];
          newState.discardPile = newDiscard;

          const enemy = newState.combat.enemy;
          
          if (enemy.status?.poison > 0) {
            enemy.hp -= enemy.status.poison;
            enemy.status.poison -= 1;
            newState.combat.log = [`Veneno causou ${enemy.status.poison + 1} de dano!`, ...newState.combat.log].slice(0, 5);
          }

          if (enemy.hp <= 0) return checkCombatEnd(newState);

          const intent = enemy.intents[enemy.intentIndex];
          let newPlayerHp = newState.player.hp;
          let newPlayerBlock = newState.player.block;

          if (intent.type === 'attack') {
            const damage = Math.max(0, intent.value - newPlayerBlock);
            newPlayerHp -= damage;
            
            if (newState.player.status.thorns > 0) {
               enemy.hp -= newState.player.status.thorns;
               newState.combat.log = [`Espinhos causaram ${newState.player.status.thorns} de dano!`, ...newState.combat.log].slice(0, 5);
            }
          } else if (intent.type === 'buff') {
            enemy.status = { ...enemy.status, strength: (enemy.status?.strength || 0) + intent.value };
          }

          // Regen Vampirismo (Novo Status)
          if (newState.player.status.regen > 0) {
             newPlayerHp = Math.min(newState.player.maxHp, newPlayerHp + newState.player.status.regen);
          }

          if (newPlayerHp <= 0) {
            return { ...newState, player: { ...newState.player, hp: 0 }, screen: 'gameover' };
          }
          if (enemy.hp <= 0) return checkCombatEnd(newState);

          const nextIntentIndex = (enemy.intentIndex + 1) % enemy.intents.length;
          enemy.intentIndex = nextIntentIndex;

          let newDrawPile = [...newState.drawPile];
          if (newDrawPile.length < 5) {
            newDrawPile = [...newDrawPile, ...newState.discardPile].sort(() => Math.random() - 0.5);
            newState.discardPile = [];
          }
          const newHand = newDrawPile.splice(0, Math.min(5, newDrawPile.length));

          newState.hand = newHand;
          newState.drawPile = newDrawPile;
          newState.player.hp = newPlayerHp;
          newState.player.energy = newState.player.maxEnergy;
          newState.player.block = newState.player.status.barricade ? newPlayerBlock : 0; 
          
          newState.combat.enemy = enemy;
          newState.combat.log = [`${enemy.name} usou ${intent.label}!`, ...newState.combat.log].slice(0, 5);
          newState.combat.turnCount += 1;

          return newState;
        }),

        collectReward: (cardChosen) => set((state) => {
          const newDeck = [...state.deck];
          if (cardChosen) newDeck.push(cardChosen);

          const newNodes = state.map.nodes.map(n => {
            if (n.floor === state.map.currentFloor) return { ...n, status: 'completed' };
            if (n.floor === state.map.currentFloor + 1) return { ...n, status: 'available' };
            return n;
          });

          return {
            ...state, screen: 'map', deck: newDeck,
            player: { ...state.player, gold: state.player.gold + state.reward.gold },
            map: { ...state.map, nodes: newNodes }
          };
        }),

        buyCard: (card, cost) => set((state) => ({
          player: { ...state.player, gold: state.player.gold - cost },
          deck: [...state.deck, { ...card, upgraded: false }]
        })),

        buyRelic: (relic, cost) => set((state) => {
          let newState = {
            ...state,
            player: { ...state.player, gold: state.player.gold - cost, relics: [...state.player.relics, relic] }
          };
          if (relic.trigger === 'on_pickup' && relic.effect) newState = relic.effect(newState);
          return newState;
        }),

        removeCardFromDeck: (cardIndex, cost) => set((state) => {
          const newDeck = [...state.deck];
          newDeck.splice(cardIndex, 1);
          return { ...state, player: { ...state.player, gold: state.player.gold - cost }, deck: newDeck };
        })
      }
    }),
    {
      name: 'spire-clone-save',
      partialize: (state) => Object.fromEntries(
        Object.entries(state).filter(([key]) => !['actions'].includes(key))
      ),
    }
  )
);

