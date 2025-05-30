
import React from 'react';

export const GameHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          🎮 Memory Game
        </span>
      </h1>
      <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
        Teste sua memória com personagens dos seus jogos favoritos!
      </p>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {[
          { name: 'Fortnite', emoji: '🎮', color: 'from-blue-400 to-purple-500' },
          { name: 'Free Fire', emoji: '🔥', color: 'from-orange-400 to-red-500' },
          { name: 'PUBG', emoji: '🪖', color: 'from-yellow-400 to-orange-500' },
          { name: 'Valorant', emoji: '⚡', color: 'from-red-400 to-pink-500' },
          { name: 'Naruto', emoji: '🍥', color: 'from-orange-300 to-yellow-400' },
        ].map((theme) => (
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
