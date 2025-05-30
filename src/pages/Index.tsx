import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../components/GameCard';
import { ScoreBoard } from '../components/ScoreBoard';
import { GameHeader } from '../components/GameHeader';

// Dados das cartas com personagens dos jogos/anime - usando imagens com rostos de personagens
const cardData = [
  { 
    id: 1, 
    name: 'Fortnite - Jonesy', 
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face', 
    theme: 'fortnite' 
  },
  { 
    id: 2, 
    name: 'Free Fire - Kelly', 
    image: 'https://images.unsplash.com/photo-1494790108755-2616c5e0c14b?w=100&h=100&fit=crop&crop=face', 
    theme: 'freefire' 
  },
  { 
    id: 3, 
    name: 'PUBG - Player', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', 
    theme: 'pubg' 
  },
  { 
    id: 4, 
    name: 'Valorant - Jett', 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', 
    theme: 'valorant' 
  },
  { 
    id: 5, 
    name: 'Naruto - Naruto', 
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', 
    theme: 'naruto' 
  },
  { 
    id: 6, 
    name: 'Fortnite - Peely', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', 
    theme: 'fortnite' 
  },
  { 
    id: 7, 
    name: 'Free Fire - Chrono', 
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face', 
    theme: 'freefire' 
  },
  { 
    id: 8, 
    name: 'PUBG - Helmet', 
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', 
    theme: 'pubg' 
  },
];

// Algoritmo Fisher-Yates para embaralhar
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Index = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Inicializar o jogo
  const initializeGame = useCallback(() => {
    const duplicatedCards = [...cardData, ...cardData];
    const shuffledCards = shuffleArray(duplicatedCards).map((card, index) => ({
      ...card,
      uniqueId: index,
    }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsGameActive(false);
    setAttempts(0);
    setGameCompleted(false);
    setIsProcessing(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const flipCard = useCallback((cardId: number) => {
    if (
      isProcessing ||
      flippedCards.includes(cardId) ||
      matchedPairs.includes(cardId) ||
      flippedCards.length >= 2
    ) {
      return;
    }

    if (!isGameActive) {
      setIsGameActive(true);
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsProcessing(true);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(card => card.uniqueId === firstCardId);
      const secondCard = cards.find(card => card.uniqueId === secondCardId);

      setTimeout(() => {
        if (firstCard.id === secondCard.id) {
          setMatchedPairs(prev => [...prev, firstCardId, secondCardId]);
          setFlippedCards([]);
          
          if (matchedPairs.length + 2 === cards.length) {
            setGameCompleted(true);
            setIsGameActive(false);
          }
        } else {
          setAttempts(prev => prev + 1);
          setTimeout(() => {
            initializeGame();
          }, 500);
        }
        setIsProcessing(false);
      }, 1000);
    }
  }, [flippedCards, matchedPairs, cards, isGameActive, isProcessing, initializeGame]);

  const restartGame = () => {
    initializeGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background particles effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        <GameHeader />
        
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          {/* Painel lateral com informações */}
          <div className="lg:w-80 space-y-4">
            <ScoreBoard 
              attempts={attempts}
              matchedPairs={matchedPairs.length / 2}
              totalPairs={cardData.length}
              gameCompleted={gameCompleted}
            />
            
            <button
              onClick={restartGame}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
              disabled={isProcessing}
            >
              🔄 Novo Jogo
            </button>

            {gameCompleted && (
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 rounded-xl text-center animate-bounce">
                <h3 className="font-bold text-lg">🎉 Parabéns!</h3>
                <p className="text-sm">Você completou o jogo!</p>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
              {cards.map((card) => (
                <Card
                  key={card.uniqueId}
                  card={card}
                  isFlipped={flippedCards.includes(card.uniqueId) || matchedPairs.includes(card.uniqueId)}
                  isMatched={matchedPairs.includes(card.uniqueId)}
                  onClick={() => flipCard(card.uniqueId)}
                  disabled={isProcessing}
                />
              ))}
            </div>

            <div className="mt-8 text-center text-white/80 max-w-md mx-auto">
              <p className="text-sm md:text-base">
                🎯 Encontre os pares de cartas iguais! <br />
                ⚠️ Cuidado: se errar, o jogo reinicia automaticamente!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
