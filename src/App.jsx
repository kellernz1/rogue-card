// src/App.jsx
import { useGameStore } from './store/useGameStore';
import Background from './components/Background';

import MenuScreen from './screens/MenuScreen';
import CombatScreen from './screens/CombatScreen';
import MapScreen from './screens/MapScreen';
import RewardScreen from './screens/RewardScreen';
import EventScreen from './screens/EventScreen';
import RestScreen from './screens/RestScreen';
import GameOverScreen from './screens/GameOverScreen';
import ShopScreen from './screens/ShopScreen';
import VictoryScreen from './screens/VictoryScreen';

export default function App() {
  // Usar o seletor previne que a tela pisque quando tomamos dano
  const screen = useGameStore((state) => state.screen);

  return (
    <div className="relative min-h-screen text-white bg-black overflow-hidden selection:bg-purple-500/30">
      
      {/* Nossa nova camada de fundo otimizada */}
      <Background />

      {/* Camada de Conteúdo do Jogo */}
      <main className="relative z-10 w-full h-full">
        {screen === 'menu' && <MenuScreen />}
        {screen === 'map' && <MapScreen />}
        {screen === 'combat' && <CombatScreen />}
        {screen === 'reward' && <RewardScreen />}
        {screen === 'event' && <EventScreen />}
        {screen === 'rest' && <RestScreen />}
        {screen === 'shop' && <ShopScreen />}
        {screen === 'gameover' && <GameOverScreen />}
        {screen === 'victory' && <VictoryScreen />}
      </main>
    </div>
  );
}

