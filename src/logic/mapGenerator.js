// src/logic/mapGenerator.js
export function generateMap() {
  const map = [];
  const floors = 15;

  for (let i = 0; i < floors; i++) {
    let type = 'combat'; // Padrão
    
    if (i === floors - 1) type = 'boss';
    else if (i === 0) type = 'combat'; // Primeiro andar sempre combate
    else if (i === 7 || i === 13) type = 'rest';
    else {
      // Distribuição aleatória baseada no seu prompt
      const rand = Math.random();
      if (rand < 0.2) type = 'event';
      else if (rand < 0.35) type = 'shop';
      else if (rand < 0.5) type = 'elite';
    }

    map.push({
      id: `floor-${i}`,
      floor: i + 1,
      type: type,
      status: i === 0 ? 'available' : 'locked' // available, locked, completed
    });
  }
  return map;
}
