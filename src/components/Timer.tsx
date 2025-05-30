
import React, { useState, useEffect } from 'react';

interface TimerProps {
  isActive: boolean;
  startTime: number | null;
}

export const Timer: React.FC<TimerProps> = ({ isActive, startTime }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && startTime) {
      interval = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else if (!isActive) {
      setTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
      <div className="text-center">
        <div className="text-2xl font-bold text-white mb-1">
          ⏱️ {formatTime(time)}
        </div>
        <div className="text-white/70 text-sm">Tempo de Jogo</div>
      </div>
    </div>
  );
};
