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
  selectedTheme: 'games' | 'kids';
  selectedGender?: 'feminine' | 'masculine';
}

const gameThemeColors = {
  fortnite: 'from-blue-400 to-purple-500',
  freefire: 'from-orange-400 to-red-500',
  pubg: 'from-yellow-400 to-orange-500',
  valorant: 'from-red-400 to-pink-500',
  naruto: 'from-orange-300 to-yellow-400',
  fifa: 'from-green-400 to-blue-500',
  gta: 'from-gray-500 to-black',
  minecraft: 'from-green-400 to-brown-500',
  reddead: 'from-red-600 to-orange-700',
  roblox: 'from-red-500 to-blue-500',
  legostarwars: 'from-blue-600 to-purple-700',
};

const kidsThemeColors = {
  princess: 'from-yellow-300 to-orange-400',
  spongebob: 'from-yellow-400 to-yellow-500',
  fairytale: 'from-red-400 to-red-500',
  peppa: 'from-pink-400 to-pink-500',
  dora: 'from-purple-400 to-indigo-500',
  galinha: 'from-blue-400 to-cyan-500',
  mickey: 'from-red-400 to-pink-500',
  minnie: 'from-pink-400 to-purple-500',
  fairy: 'from-green-300 to-emerald-400',
  powerpuff: 'from-blue-400 to-purple-500',
  mundobita: 'from-cyan-400 to-blue-500',
  sandy: 'from-purple-400 to-pink-500',
  patrick: 'from-pink-400 to-red-500',
  patrulha: 'from-blue-500 to-indigo-600',
  superman: 'from-blue-600 to-red-500',
  monica: 'from-yellow-400 to-orange-500',
  babyshark: 'from-cyan-400 to-blue-500',
  batman: 'from-gray-600 to-black',
  ben10: 'from-green-500 to-emerald-600',
  monsters: 'from-green-400 to-teal-500',
  captain: 'from-blue-500 to-red-500',
  car: 'from-red-400 to-orange-500',
  spiderman: 'from-red-500 to-blue-600',
  ironman: 'from-red-500 to-yellow-500',
  hulk: 'from-green-500 to-green-700',
};

export const Card: React.FC<CardProps> = ({ 
  card, 
  isFlipped, 
  isMatched, 
  onClick, 
  disabled,
  selectedTheme,
  selectedGender 
}) => {
  const themeColors = selectedTheme === 'games' ? gameThemeColors : kidsThemeColors;
  const themeGradient = themeColors[card.theme as keyof typeof themeColors] || 'from-gray-400 to-gray-600';

  const getBackCardGradient = () => {
    if (selectedTheme === 'games') {
      return 'from-indigo-500 via-purple-500 to-pink-500';
    } else {
      if (selectedGender === 'masculine') {
        return 'from-blue-800 via-blue-900 to-indigo-900';
      } else {
        return 'from-pink-400 via-purple-400 to-indigo-400';
      }
    }
  };

  const backCardGradient = getBackCardGradient();

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
            bg-gradient-to-br ${backCardGradient}
            border-2 border-white/20 flex items-center justify-center
            ${!disabled && !isFlipped ? 'hover:scale-105 hover:shadow-xl' : ''}
            transition-all duration-200
          `}
        >
          <div className={`font-bold text-2xl md:text-3xl ${
            selectedTheme === 'games' ? 'text-white' : 'text-white'
          }`}>
            {selectedTheme === 'games' ? '?' : '🌟'}
          </div>
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
