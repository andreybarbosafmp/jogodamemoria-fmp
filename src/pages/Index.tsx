import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../components/GameCard';
import { ScoreBoard } from '../components/ScoreBoard';
import { GameHeader } from '../components/GameHeader';
import { PlayerNameDialog } from '../components/PlayerNameDialog';
import { RankingDialog } from '../components/RankingDialog';
import { ThemeSelector } from '../components/ThemeSelector';
import { GenderSelector } from '../components/GenderSelector';

// Dados das cartas com personagens dos jogos - usando as imagens originais
const gameThemeCards = [
  { 
    id: 1, 
    name: 'Fortnite - Beef Boss', 
    image: '/lovable-uploads/fedc81d9-f4ee-4815-ae9e-a18ad7f9850d.png', 
    theme: 'fortnite' 
  },
  { 
    id: 2, 
    name: 'Free Fire - Kelly', 
    image: '/lovable-uploads/ecb904c2-1bdc-404a-b7c2-a34dc6446527.png', 
    theme: 'freefire' 
  },
  { 
    id: 3, 
    name: 'PUBG - Soldier', 
    image: '/lovable-uploads/1722388b-732d-44b7-869e-bd6636af154e.png', 
    theme: 'pubg' 
  },
  { 
    id: 4, 
    name: 'Valorant - Jett', 
    image: '/lovable-uploads/ef5dc821-236a-4021-8d95-4f9397e17f6c.png', 
    theme: 'valorant' 
  },
  { 
    id: 5, 
    name: 'Naruto - Naruto', 
    image: '/lovable-uploads/ebbf342d-b5c3-4bd1-921c-a39d915ed903.png', 
    theme: 'naruto' 
  },
];

// Dados das cartas femininas - usando as novas imagens
const feminineThemeCards = [
  { 
    id: 6, 
    name: 'Chapeuzinho Vermelho', 
    image: '/lovable-uploads/91a53b40-b78e-4ced-b76b-f2109e0698d8.png', 
    theme: 'fairytale' 
  },
  { 
    id: 7, 
    name: 'Peppa Pig', 
    image: '/lovable-uploads/29a093f2-c269-41ff-ae20-7ac45d45c72d.png', 
    theme: 'peppa' 
  },
  { 
    id: 8, 
    name: 'Fadinha', 
    image: '/lovable-uploads/165abf4b-042e-4e03-af49-cf712d28236b.png', 
    theme: 'fairy' 
  },
  { 
    id: 9, 
    name: 'As Meninas Superpoderosas', 
    image: '/lovable-uploads/9bff270c-bab7-4cff-af1c-aef8e8478caa.png', 
    theme: 'powerpuff' 
  },
  { 
    id: 10, 
    name: 'Minnie Mouse', 
    image: '/lovable-uploads/77232230-d261-4dec-8560-b6c2d6c4fe8e.png', 
    theme: 'minnie' 
  },
  { 
    id: 11, 
    name: 'Bela e a Fera - Bela', 
    image: '/lovable-uploads/fd88df92-63bf-4792-a4d1-76d1c067c7a9.png', 
    theme: 'princess' 
  },
];

// Dados das cartas masculinas - atualizadas com as novas imagens
const masculineThemeCards = [
  { 
    id: 12, 
    name: 'Mickey Mouse', 
    image: '/lovable-uploads/91befb4f-8b4c-42d3-b1f9-6fed0a353a89.png', 
    theme: 'mickey' 
  },
  { 
    id: 13, 
    name: 'Mundo Bita', 
    image: '/lovable-uploads/91d3592c-d75f-4bc8-94fb-b8808a72c33f.png', 
    theme: 'mundobita' 
  },
  { 
    id: 14, 
    name: 'Patrick Estrela', 
    image: '/lovable-uploads/9e697730-040e-413a-b2c6-db6d27eab4df.png', 
    theme: 'patrick' 
  },
  { 
    id: 15, 
    name: 'Patrulha Canina', 
    image: '/lovable-uploads/7add275f-13c4-4f3e-be94-4fcec215b45c.png', 
    theme: 'patrulha' 
  },
  { 
    id: 16, 
    name: 'Superman', 
    image: '/lovable-uploads/9a43066c-3f95-4220-a5c4-8a1fd18f4304.png', 
    theme: 'superman' 
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

type Theme = 'games' | 'kids';
type Gender = 'feminine' | 'masculine';

const Index = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('games');
  const [selectedGender, setSelectedGender] = useState<Gender>('feminine');
  const [cards, setCards] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPlayerDialog, setShowPlayerDialog] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [playerName, setPlayerName] = useState('');

  // Função para obter o gradiente de fundo baseado no tema e gênero
  const getBackgroundGradient = () => {
    if (selectedTheme === 'games') {
      return 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900';
    } else {
      if (selectedGender === 'masculine') {
        return 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800';
      } else {
        return 'bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300';
      }
    }
  };

  // Inicializar o jogo
  const initializeGame = useCallback(() => {
    let currentThemeCards;
    
    if (selectedTheme === 'games') {
      currentThemeCards = gameThemeCards;
    } else {
      currentThemeCards = selectedGender === 'feminine' 
        ? feminineThemeCards.slice(0, 5)
        : masculineThemeCards.slice(0, 5);
    }
    
    const duplicatedCards = [...currentThemeCards, ...currentThemeCards];
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
    setPlayerName('');
  }, [selectedTheme, selectedGender]);

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

      setAttempts(prev => prev + 1);

      setTimeout(() => {
        if (firstCard.id === secondCard.id) {
          setMatchedPairs(prev => [...prev, firstCardId, secondCardId]);
          setFlippedCards([]);
          
          if (matchedPairs.length + 2 === cards.length) {
            setGameCompleted(true);
            setIsGameActive(false);
            setShowPlayerDialog(true);
          }
        } else {
          setFlippedCards([]);
        }
        setIsProcessing(false);
      }, 1000);
    }
  }, [flippedCards, matchedPairs, cards, isGameActive, isProcessing]);

  const savePlayerScore = (name: string) => {
    const ranking = JSON.parse(localStorage.getItem('gameRanking') || '[]');
    const newScore = {
      name,
      attempts,
      pairs: matchedPairs.length / 2,
      date: new Date().toLocaleDateString(),
      theme: selectedTheme,
      gender: selectedTheme === 'kids' ? selectedGender : undefined
    };
    
    ranking.push(newScore);
    ranking.sort((a: any, b: any) => a.attempts - b.attempts);
    
    localStorage.setItem('gameRanking', JSON.stringify(ranking));
    setPlayerName(name);
    setShowPlayerDialog(false);
  };

  const restartGame = () => {
    initializeGame();
  };

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  const handleGenderChange = (gender: Gender) => {
    setSelectedGender(gender);
  };

  const getCurrentThemeCards = () => {
    if (selectedTheme === 'games') {
      return gameThemeCards;
    } else {
      return selectedGender === 'feminine' 
        ? feminineThemeCards.slice(0, 5)
        : masculineThemeCards.slice(0, 5);
    }
  };

  const currentThemeCards = getCurrentThemeCards();

  return (
    <div className={`min-h-screen relative overflow-hidden ${getBackgroundGradient()}`}>
      {/* Background particles effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-pulse ${
              selectedTheme === 'games' ? 'bg-white' : 
              selectedGender === 'masculine' ? 'bg-blue-200' : 'bg-yellow-300'
            }`}
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
        <GameHeader selectedTheme={selectedTheme} />
        
        <div className="flex flex-col items-center mb-6 space-y-4">
          <ThemeSelector 
            selectedTheme={selectedTheme} 
            onThemeChange={handleThemeChange}
          />
          
          <GenderSelector 
            selectedGender={selectedGender}
            onGenderChange={handleGenderChange}
            selectedTheme={selectedTheme}
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          {/* Painel lateral com informações */}
          <div className="lg:w-80 space-y-4">
            <ScoreBoard 
              attempts={attempts}
              matchedPairs={matchedPairs.length / 2}
              totalPairs={currentThemeCards.length}
              gameCompleted={gameCompleted}
            />
            
            <button
              onClick={restartGame}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
              disabled={isProcessing}
            >
              🔄 Novo Jogo
            </button>

            <button
              onClick={() => setShowRanking(true)}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-yellow-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200"
            >
              🏆 Ver Ranking
            </button>

            {gameCompleted && playerName && (
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 rounded-xl text-center animate-bounce">
                <h3 className="font-bold text-lg">🎉 Parabéns {playerName}!</h3>
                <p className="text-sm">Você completou em {attempts} tentativas!</p>
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
                  selectedTheme={selectedTheme}
                  selectedGender={selectedGender}
                />
              ))}
            </div>

            <div className={`mt-8 text-center max-w-md mx-auto ${
              selectedTheme === 'games' ? 'text-white/80' : 'text-purple-800'
            }`}>
              <p className="text-sm md:text-base">
                🎯 Encontre os pares de cartas iguais! <br />
                💡 As cartas corretas ficam viradas para você continuar jogando!
              </p>
            </div>
          </div>
        </div>
      </div>

      <PlayerNameDialog 
        open={showPlayerDialog}
        onSave={savePlayerScore}
        onClose={() => setShowPlayerDialog(false)}
      />

      <RankingDialog 
        open={showRanking}
        onClose={() => setShowRanking(false)}
      />
    </div>
  );
};

export default Index;
