// src/data/relics.js

export const RELICS = {
  STARTING_AMULET: {
    id: 'starting_amulet',
    name: 'Starting Amulet',
    description: 'Starts each combat with 1 Strength.',
    icon: '🧿',
    trigger: 'on_combat_start',
    effect: (state) => {
      return {
        ...state,
        player: { 
          ...state.player, 
          status: { ...state.player.status, strength: (state.player.status.strength || 0) + 1 } 
        }
      };
    }
  },
  BLOOD_STONE: {
    id: 'blood_stone',
    name: 'Blood Stone',
    description: 'Heals 2 HP when killing an enemy.',
    icon: '🩸',
    trigger: 'on_kill',
    effect: (state) => {
      return {
        ...state,
        player: {
          ...state.player,
          hp: Math.min(state.player.maxHp, state.player.hp + 2)
        }
      };
    }
  },
  BONE_IDOL: {
    id: 'bone_idol',
    name: 'Bone Idol',
    description: '+10 HP maximum.',
    icon: '🦴',
    trigger: 'on_pickup', // Ativa apenas quando coletada
    effect: (state) => {
      return {
        ...state,
        player: {
          ...state.player,
          maxHp: state.player.maxHp + 10,
          hp: state.player.hp + 10
        }
      };
    }
  }
};

