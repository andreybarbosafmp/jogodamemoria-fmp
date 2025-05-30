
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';

interface PlayerNameDialogProps {
  open: boolean;
  onSave: (name: string) => void;
  onClose: () => void;
}

export const PlayerNameDialog: React.FC<PlayerNameDialogProps> = ({
  open,
  onSave,
  onClose
}) => {
  const [name, setName] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
      setName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-900 to-blue-900 border-purple-500">
        <DialogHeader>
          <DialogTitle className="text-center text-white text-xl">
            🎉 Parabéns! Você ganhou!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 p-4">
          <div className="text-center text-white/80">
            <p>Digite seu nome para entrar no ranking:</p>
          </div>
          
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Seu nome aqui..."
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
            autoFocus
          />
          
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={!name.trim()}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              💾 Salvar
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-white/30 text-white hover:bg-white/10"
            >
              ❌ Pular
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
