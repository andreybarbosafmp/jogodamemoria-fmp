
import React from 'react';

interface GenderSelectorProps {
  selectedGender: 'feminine' | 'masculine';
  onGenderChange: (gender: 'feminine' | 'masculine') => void;
  selectedTheme: 'games' | 'kids';
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({ 
  selectedGender, 
  onGenderChange,
  selectedTheme 
}) => {
  if (selectedTheme !== 'kids') return null;

  return (
    <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-2 gap-2 mt-4">
      <button
        onClick={() => onGenderChange('feminine')}
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
          selectedGender === 'feminine'
            ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg transform scale-105'
            : 'text-white/80 hover:bg-white/10'
        }`}
      >
        👸 Feminino
        <div className="text-xs opacity-80">Princesas & Personagens</div>
      </button>
      
      <button
        onClick={() => onGenderChange('masculine')}
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
          selectedGender === 'masculine'
            ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg transform scale-105'
            : 'text-white/80 hover:bg-white/10'
        }`}
      >
        🦸 Masculino
        <div className="text-xs opacity-80">Heróis & Aventuras</div>
      </button>
    </div>
  );
};
