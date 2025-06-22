
import React from 'react';

interface GameHeaderProps {
  selectedTheme: 'games' | 'kids';
}

export const GameHeader: React.FC<GameHeaderProps> = ({ selectedTheme }) => {
  const gameThemes = [
    { name: 'Fortnite', emoji: '🎮', color: 'from-blue-400 to-purple-500' },
    { name: 'Free Fire', emoji: '🔥', color: 'from-orange-400 to-red-500' },
    { name: 'PUBG', emoji: '🪖', color: 'from-yellow-400 to-orange-500' },
    { name: 'Valorant', emoji: '⚡', color: 'from-red-400 to-pink-500' },
    { name: 'Naruto', emoji: '🍥', color: 'from-orange-300 to-yellow-400' },
  ];

  const kidsThemes = [
    { name: 'Bela', emoji: '👸', color: 'from-yellow-300 to-orange-400' },
    { name: 'Bob Esponja', emoji: '🧽', color: 'from-yellow-400 to-yellow-500' },
    { name: 'Chapeuzinho', emoji: '🔴', color: 'from-red-400 to-red-500' },
    { name: 'Peppa Pig', emoji: '🐷', color: 'from-pink-400 to-pink-500' },
    { name: 'Mickey & Minnie', emoji: '🐭', color: 'from-red-400 to-pink-500' },
  ];

  const currentThemes = selectedTheme === 'games' ? gameThemes : kidsThemes;
  const titleColor = selectedTheme === 'games' 
    ? 'from-pink-400 via-purple-400 to-indigo-400' 
    : 'from-pink-400 via-yellow-400 to-orange-400';

  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        <span className={`bg-gradient-to-r ${titleColor} bg-clip-text text-transparent`}>
          {selectedTheme === 'games' ? '🎮 Game da Memória' : '🧸 Jogo da Memória'}
        </span>
      </h1>
      <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-4 ${
        selectedTheme === 'games' ? 'text-white/80' : 'text-purple-800'
      }`}>
        {selectedTheme === 'games' 
          ? 'Teste sua memória com personagens dos seus jogos favoritos!'
          : 'Divirta-se com seus personagens de desenho favoritos!'
        }
      </p>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {currentThemes.map((theme) => (
          <div 
            key={theme.name}
            className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${theme.color} text-white font-semibold`}
          >
            {theme.emoji} {theme.name}
          </div>
        ))}
      </div>
    </div>
  );
};
