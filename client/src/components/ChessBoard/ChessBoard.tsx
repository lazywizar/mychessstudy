import React from 'react';

interface ChessBoardProps {
  fen?: string;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({ fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' }) => {
  return (
    <div className="w-full max-w-2xl aspect-square bg-gray-100 border border-gray-300 rounded-lg" data-testid="chessboard">
      <div className="p-4 text-center text-gray-600">
        Chess board will be implemented here using Chessground
      </div>
    </div>
  );
};

export default ChessBoard;
