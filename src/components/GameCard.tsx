
import React from 'react';

interface CardProps {
  card: {
    id: number;
    name: string;
    image: string;
    theme: string;
    uniqueId: number;
  };
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

const themeColors = {
  fortnite: 'from-blue-400 to-purple-500',
  freefire: 'from-orange-400 to-red-500',
  pubg: 'from-yellow-400 to-orange-500',
  valorant: 'from-red-400 to-pink-500',
  naruto: 'from-orange-300 to-yellow-400',
};

export const Card: React.FC<CardProps> = ({ 
  card, 
  isFlipped, 
  isMatched, 
  onClick, 
  disabled 
}) => {
  const themeGradient = themeColors[card.theme as keyof typeof themeColors] || 'from-gray-400 to-gray-600';

  return (
    <div 
      className="relative w-full aspect-square cursor-pointer"
      onClick={disabled ? undefined : onClick}
    >
      <div 
        className={`
          absolute inset-0 w-full h-full transition-transform duration-500 transform-gpu preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Verso da carta */}
        <div 
          className={`
            absolute inset-0 w-full h-full rounded-xl shadow-lg backface-hidden
            bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
            border-2 border-white/20 flex items-center justify-center
            ${!disabled && !isFlipped ? 'hover:scale-105 hover:shadow-xl' : ''}
            transition-all duration-200
          `}
        >
          <div className="text-white text-2xl md:text-3xl font-bold">?</div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
        </div>

        {/* Frente da carta */}
        <div 
          className={`
            absolute inset-0 w-full h-full rounded-xl shadow-lg backface-hidden rotate-y-180
            bg-gradient-to-br ${themeGradient}
            border-2 border-white/30 flex flex-col items-center justify-center p-2
            ${isMatched ? 'ring-4 ring-green-400 ring-opacity-70' : ''}
            transition-all duration-200 overflow-hidden
          `}
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full h-full rounded-lg overflow-hidden border-2 border-white/30 bg-white/10">
              <img 
                src={card.image} 
                alt={card.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Erro ao carregar imagem:', card.image);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
          
          {isMatched && (
            <div className="absolute top-2 right-2 text-green-400 text-xl">
              ✓
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
