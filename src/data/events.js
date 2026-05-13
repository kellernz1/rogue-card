// src/data/events.js
import { CARDS } from './cards';

export const EVENTS = [
  {
    id: 'altar_almas',
    title: 'Altar of Souls',
    description: 'You find a profane altar covered in dried blood. A voice in your head whispers promises of power in exchange for vitality.',
    options: [
      {
        label: 'Sacrifice (Loses 8 HP, Gains 50 Gold)',
        effect: (state) => ({
          ...state,
          player: { ...state.player, hp: Math.max(1, state.player.hp - 8), gold: state.player.gold + 50 }
        })
      },
      {
        label: 'Ignore',
        effect: (state) => state
      }
    ]
  },
  {
    id: 'mercador_misterioso',
    title: 'Mysterious Merchant',
    description: 'A mysterious figure in a hooded cloak offers you a suspicious deal in the middle of the darkness.',
    options: [
      {
        label: 'Buy Knowledge (Pays 50 Gold, Gains Heavy Cut)',
        effect: (state) => {
          if (state.player.gold < 50) return state; // Não tem ouro
          return {
            ...state,
            player: { ...state.player, gold: state.player.gold - 50 },
            deck: [...state.deck, CARDS.HEAVY_CUT]
          };
        }
      },
      {
        label: 'Refuse politely',
        effect: (state) => state
      }
    ]
  },
  {
    id: 'fonte_eras',
    title: 'Fountain of Ages',
    description: 'Crystal-clear water gushes from an ancient statue. It smells of pure magic, but seems unstable.',
    options: [
      {
        label: 'Drink (Heals 30 HP)',
        effect: (state) => ({
          ...state,
          player: { ...state.player, hp: Math.min(state.player.maxHp, state.player.hp + 30) }
        })
      },
      {
        label: 'Leave (Go Away)',
        effect: (state) => state
      }
    ]
  }
];

