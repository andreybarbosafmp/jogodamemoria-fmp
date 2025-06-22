
import React from 'react';

interface ThemeSelectorProps {
  selectedTheme: 'games' | 'kids';
  onThemeChange: (theme: 'games' | 'kids') => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  selectedTheme, 
  onThemeChange 
}) => {
  return (
    <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-2 gap-2">
      <button
        onClick={() => onThemeChange('games')}
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
          selectedTheme === 'games'
            ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg transform scale-105'
            : 'text-white/80 hover:bg-white/10'
        }`}
      >
        🎮 Jogos
        <div className="text-xs opacity-80">Para Adolescentes</div>
      </button>
      
      <button
        onClick={() => onThemeChange('kids')}
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
          selectedTheme === 'kids'
            ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg transform scale-105'
            : 'text-white/80 hover:bg-white/10'
        }`}
      >
        🧸 Desenho Infantil
        <div className="text-xs opacity-80">Para Crianças</div>
      </button>
    </div>
  );
};
