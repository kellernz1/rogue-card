// src/components/Background.jsx
import { useGameStore } from '../store/useGameStore';
import { BG_IMAGES } from '../utils/constants';

export default function Background() {
  const screen = useGameStore((state) => state.screen);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-black">
      
      {/* 
        Renderiza todas as imagens simultaneamente para pré-carregá-las no navegador.
        A transição de opacidade via CSS puro é extremamente leve e nunca falha.
      */}
      {Object.entries(BG_IMAGES).map(([key, url]) => (
        <div
          key={key}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: screen === key ? 0.4 : 0,
          }}
        />
      ))}
      
      {/* Overlay Escuro constante para garantir que as cartas e textos fiquem legíveis */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}

