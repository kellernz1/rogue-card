// src/data/enemies.js
export const ENEMIES = {
  // COMBATES NORMAIS
  CULTIST: {
    id: 'cultist', name: 'Cultist', hp: 48, maxHp: 48, sprite: '🐦‍⬛', status: {},
    intents: [
      { type: 'buff', value: 2, label: 'Black Ritual (+2 Strength)', icon: '✨' },
      { type: 'attack', value: 12, label: 'Tearing Attack (12)', icon: '⚔️' }
    ],
    intentIndex: 0
  },
  SERVANT: {
    id: 'servant', name: 'Servant', hp: 40, maxHp: 40, sprite: '🧟', status: {},
    intents: [
      { type: 'attack', value: 6, label: 'Punch (6)', icon: '⚔️' },
      { type: 'buff', value: 8, label: 'Defend', icon: '🛡️' },
      { type: 'attack', value: 6, label: 'Punch (6)', icon: '⚔️' }
    ],
    intentIndex: 0
  },
  LANCER: {
    id: 'lancer', name: 'Lancer', hp: 55, maxHp: 55, sprite: '🤺', status: {},
    intents: [
      { type: 'attack', value: 14, label: 'Lunge (14)', icon: '⚔️' }
    ],
    intentIndex: 0
  },
  GOBLIN: {
    id: 'goblin', name: 'Double Goblin', hp: 28, maxHp: 28, sprite: '👺', status: {},
    intents: [
      { type: 'attack', value: 5, label: 'Double Stab (5x2)', icon: '⚔️' }
    ],
    intentIndex: 0
  },

  // BOSS
  GUARDIAN: {
    id: 'boss_guardian', name: 'The Guardian', hp: 240, maxHp: 240, sprite: '🗿', status: {},
    intents: [
      { type: 'buff', value: 15, label: 'Endure', icon: '🛡️' },
      { type: 'attack', value: 9, label: 'Laser Beam (9)', icon: '⚔️' },
      { type: 'attack', value: 18, label: 'Smash (18)', icon: '⚔️' }
    ],
    intentIndex: 0
  }
};

