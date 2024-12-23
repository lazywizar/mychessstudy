import { useState, useCallback } from 'react';

interface ChessGameState {
  fen: string;
  history: string[];
}

export const useChessGame = (initialFen: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') => {
  const [gameState, setGameState] = useState<ChessGameState>({
    fen: initialFen,
    history: [initialFen],
  });

  const resetGame = useCallback(() => {
    setGameState({
      fen: initialFen,
      history: [initialFen],
    });
  }, [initialFen]);

  return {
    fen: gameState.fen,
    history: gameState.history,
    resetGame,
  };
};

export default useChessGame;
