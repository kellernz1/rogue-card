// src/data/cards.js

// Helper para calcular dano com bônus de força do jogador
const calcDamage = (state, baseDano) => baseDano + (state.player.status.strength || 0);

export const CARDS = {
  // --- ATAQUES (8) ---
  STRIKE: {
    id: 'strike', name: 'Hit', type: 'attack', exhaust: false,
    cost: (up) => 1,
    description: (up) => `Causes ${up ? 9 : 6} damage.`,
    effect: (state, up) => ({ ...state, combat: { ...state.combat, enemy: { ...state.combat.enemy, hp: state.combat.enemy.hp - calcDamage(state, up ? 9 : 6) } } })
  },
  DOUBLE_STRIKE: {
    id: 'double_strike', name: 'Double Hit', type: 'attack', exhaust: false,
    cost: (up) => 2,
    description: (up) => `Causes ${up ? 6 : 4} damage, twice.`,
    effect: (state, up) => ({ ...state, combat: { ...state.combat, enemy: { ...state.combat.enemy, hp: state.combat.enemy.hp - (calcDamage(state, up ? 6 : 4) * 2) } } })
  },
  HEAVY_CUT: {
    id: 'heavy_cut', name: 'Heavy Cut', type: 'attack', exhaust: false,
    cost: (up) => 2,
    description: (up) => `Causes ${up ? 20 : 14} damage.`,
    effect: (state, up) => ({ ...state, combat: { ...state.combat, enemy: { ...state.combat.enemy, hp: state.combat.enemy.hp - calcDamage(state, up ? 20 : 14) } } })
  },
  PRECISE_CUT: {
    id: 'precise_cut', name: 'Precise Cut', type: 'attack', exhaust: true,
    cost: (up) => 1,
    description: (up) => `Causes ${up ? 13 : 9} damage. Exhaust.`,
    effect: (state, up) => ({ ...state, combat: { ...state.combat, enemy: { ...state.combat.enemy, hp: state.combat.enemy.hp - calcDamage(state, up ? 13 : 9) } } })
  },
  HURRICANE: {
    id: 'hurricane', name: 'Hurricane', type: 'attack', exhaust: false,
    cost: (up) => 3,
    description: (up) => `Causes ${up ? 8 : 5} damage. Applies ${up ? 3 : 2} Vulnerable.`,
    effect: (state, up) => {
      const e = state.combat.enemy;
      return { ...state, combat: { ...state.combat, enemy: { ...e, hp: e.hp - calcDamage(state, up ? 8 : 5), status: { ...e.status, vulnerable: (e.status?.vulnerable || 0) + (up ? 3 : 2) } } } };
    }
  },
  POISON_BLADE: {
    id: 'poison_blade', name: 'Poison Blade', type: 'attack', exhaust: false,
    cost: (up) => 1,
    description: (up) => `Causes ${up ? 7 : 5} damage and applies ${up ? 5 : 3} Poison.`,
    effect: (state, up) => {
      const e = state.combat.enemy;
      return { ...state, combat: { ...state.combat, enemy: { ...e, hp: e.hp - calcDamage(state, up ? 7 : 5), status: { ...e.status, poison: (e.status?.poison || 0) + (up ? 5 : 3) } } } };
    }
  },
  FRENZY: {
    id: 'frenzy', name: 'Frenzy', type: 'attack', exhaust: false,
    cost: (up) => 2,
    description: (up) => `Causes ${up ? 6 : 4} damage X current Strength.`,
    effect: (state, up) => {
      const hits = Math.max(1, state.player.status.strength || 1);
      return { ...state, combat: { ...state.combat, enemy: { ...state.combat.enemy, hp: state.combat.enemy.hp - (calcDamage(state, up ? 6 : 4) * hits) } } };
    }
  },
  MORTAL_BLOW: {
    id: 'mortal_blow', name: 'Mortal Blow', type: 'attack', exhaust: true,
    cost: (up) => 3,
    description: (up) => `Causes ${up ? 30 : 20} damage. Exhaust.`,
    effect: (state, up) => ({ ...state, combat: { ...state.combat, enemy: { ...state.combat.enemy, hp: state.combat.enemy.hp - calcDamage(state, up ? 30 : 20) } } })
  },

  // --- HABILIDADES (8) ---
  DEFEND: {
    id: 'defend', name: 'Defend', type: 'skill', exhaust: false,
    cost: (up) => 1,
    description: (up) => `Gains ${up ? 8 : 5} Block.`,
    effect: (state, up) => ({ ...state, player: { ...state.player, block: state.player.block + (up ? 8 : 5) } })
  },
  DODGE: {
    id: 'dodge', name: 'Dodge', type: 'skill', exhaust: false,
    cost: (up) => 1,
    description: (up) => `Gains ${up ? 11 : 8} Block.`,
    effect: (state, up) => ({ ...state, player: { ...state.player, block: state.player.block + (up ? 11 : 8) } })
  },
  IRON_SHIELD: {
    id: 'iron_shield', name: 'Iron Shield', type: 'skill', exhaust: false,
    cost: (up) => 2,
    description: (up) => `Gains ${up ? 16 : 12} Block.`,
    effect: (state, up) => ({ ...state, player: { ...state.player, block: state.player.block + (up ? 16 : 12) } })
  },
  ADRENALINE: {
    id: 'adrenaline', name: 'Adrenaline', type: 'skill', exhaust: true,
    cost: (up) => 0,
    description: (up) => `Draws ${up ? 3 : 2} cards. Exhaust.`,
    effect: (state, up) => {
      const drawAmt = up ? 3 : 2;
      const toDraw = state.drawPile.slice(0, drawAmt);
      return { ...state, hand: [...state.hand, ...toDraw], drawPile: state.drawPile.slice(drawAmt) };
    }
  },
  STEEL_PILL: {
    id: 'steel_pill', name: 'Steel Pill', type: 'skill', exhaust: true,
    cost: (up) => 0,
    description: (up) => `Gains ${up ? 7 : 4} Block. Exhaust.`,
    effect: (state, up) => ({ ...state, player: { ...state.player, block: state.player.block + (up ? 7 : 4) } })
  },
  POISON_MIST: {
    id: 'poison_mist', name: 'Poison Mist', type: 'skill', exhaust: false,
    cost: (up) => (up ? 1 : 2),
    description: (up) => `Applies 6 Poison.`,
    effect: (state, up) => {
      const e = state.combat.enemy;
      return { ...state, combat: { ...state.combat, enemy: { ...e, status: { ...e.status, poison: (e.status?.poison || 0) + 6 } } } };
    }
  },
  RETREAT: {
    id: 'retreat', name: 'Retreat', type: 'skill', exhaust: false,
    cost: (up) => 1,
    description: (up) => `Discards 1, Draws ${up ? 3 : 2} cards.`,
    effect: (state, up) => {
      const drawAmt = up ? 3 : 2;
      const toDraw = state.drawPile.slice(0, drawAmt);
      return { ...state, hand: [...state.hand, ...toDraw], drawPile: state.drawPile.slice(drawAmt) };
    }
  },
  STRENGTHEN: {
    id: 'strengthen', name: 'Strengthen', type: 'skill', exhaust: false,
    cost: (up) => (up ? 1 : 2),
    description: (up) => `Gains 2 Strength.`,
    effect: (state, up) => ({ ...state, player: { ...state.player, status: { ...state.player.status, strength: (state.player.status.strength || 0) + 2 } } })
  },

  // --- PODERES (4) ---
  BRUTE_FORCE: {
    id: 'brute_force', name: 'Brute Force', type: 'power', exhaust: true,
    cost: (up) => (up ? 1 : 2),
    description: (up) => `Gains 3 Strength permanently.`,
    effect: (state, up) => ({ ...state, player: { ...state.player, status: { ...state.player.status, strength: (state.player.status.strength || 0) + 3 } } })
  },
  MAGIC_BARRIER: {
    id: 'magic_barrier', name: 'Magic Barrier', type: 'power', exhaust: true,
    cost: (up) => (up ? 2 : 3),
    description: (up) => `Block doesn't expire at the end of the turn.`,
    effect: (state, up) => ({ ...state, player: { ...state.player, status: { ...state.player.status, barricade: true } } })
  },
  VAMPIRISM: {
    id: 'vampirism', name: 'Vampirism', type: 'power', exhaust: true,
    cost: (up) => 1,
    description: (up) => `Heals ${up ? 3 : 2} HP at the end of the turn.`,
    effect: (state, up) => ({ ...state, player: { ...state.player, status: { ...state.player.status, regen: (state.player.status.regen || 0) + (up ? 3 : 2) } } })
  },
  THORNS: {
    id: 'thorns', name: 'Thorns', type: 'power', exhaust: true,
    cost: (up) => (up ? 1 : 2),
    description: (up) => `Enemies take 3 damage when attacking you.`,
    effect: (state, up) => ({ ...state, player: { ...state.player, status: { ...state.player.status, thorns: (state.player.status.thorns || 0) + 3 } } })
  },

  // --- MALDIÇÕES (4) ---
  WOUND: {
    id: 'wound', name: 'Wound', type: 'curse', exhaust: false, cost: () => 0,
    description: () => `Unplayable. It takes up space in your hand.`,
    effect: (state) => state 
  },
  WEIGHT: {
    id: 'weight', name: 'Weight', type: 'curse', exhaust: true, cost: () => 0,
    description: () => `Exhaust.`,
    effect: (state) => state 
  },
  DREAD: {
    id: 'dread', name: 'Dread', type: 'curse', exhaust: true, cost: () => 0,
    description: () => `Exhaust.`,
    effect: (state) => state 
  },
  NECROSIS: {
    id: 'necrosis', name: 'Necrosis', type: 'curse', exhaust: true, cost: () => 0,
    description: () => `Loses 1 HP when played. Exhaust.`,
    effect: (state) => ({ ...state, player: { ...state.player, hp: state.player.hp - 1 } })
  }
};

