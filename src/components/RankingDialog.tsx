
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';

interface RankingDialogProps {
  open: boolean;
  onClose: () => void;
}

interface RankingEntry {
  name: string;
  attempts: number;
  pairs: number;
  date: string;
}

export const RankingDialog: React.FC<RankingDialogProps> = ({
  open,
  onClose
}) => {
  const ranking: RankingEntry[] = JSON.parse(localStorage.getItem('gameRanking') || '[]');

  const clearRanking = () => {
    localStorage.removeItem('gameRanking');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-purple-900 to-blue-900 border-purple-500 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-white text-xl">
            🏆 Ranking dos Campeões
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 p-4">
          {ranking.length === 0 ? (
            <div className="text-center text-white/70 py-8">
              <p>🎮 Nenhum jogo concluído ainda!</p>
              <p className="text-sm mt-2">Complete um jogo para aparecer no ranking!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {ranking.slice(0, 10).map((entry, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center justify-between p-3 rounded-lg border
                    ${index === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400' : 
                      index === 1 ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-300' :
                      index === 2 ? 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-500' :
                      'bg-white/5 border-white/20'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}º`}
                    </div>
                    <div>
                      <div className="text-white font-bold">{entry.name}</div>
                      <div className="text-white/70 text-sm">{entry.date}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-bold">{entry.attempts} tentativas</div>
                    <div className="text-white/70 text-sm">{entry.pairs} pares</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex gap-2 pt-4">
            <Button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
            >
              ✅ Fechar
            </Button>
            {ranking.length > 0 && (
              <Button
                onClick={clearRanking}
                variant="outline"
                className="flex-1 border-red-400/50 text-red-300 hover:bg-red-500/10"
              >
                🗑️ Limpar Ranking
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
