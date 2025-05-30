
import React from 'react';

interface ScoreBoardProps {
  attempts: number;
  matchedPairs: number;
  totalPairs: number;
  gameCompleted: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ 
  attempts, 
  matchedPairs, 
  totalPairs, 
  gameCompleted 
}) => {
  const progress = (matchedPairs / totalPairs) * 100;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-3">📊 Estatísticas</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between text-white">
            <span>Tentativas:</span>
            <span className="font-bold text-red-300">{attempts}</span>
          </div>
          
          <div className="flex justify-between text-white">
            <span>Pares encontrados:</span>
            <span className="font-bold text-green-300">{matchedPairs}/{totalPairs}</span>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="mt-4">
          <div className="text-white/70 text-sm mb-2">Progresso</div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-white/70 text-xs mt-1">{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  );
};
