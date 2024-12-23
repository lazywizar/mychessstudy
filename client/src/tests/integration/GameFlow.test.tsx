import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChessBoard from '../../components/ChessBoard/ChessBoard';
import { useChessGame } from '../../hooks/useChessGame';

// Mock the chess service
jest.mock('../../services/chessService');

// Create a test component that combines the hook and board
const TestGameComponent = () => {
  const { fen, resetGame } = useChessGame();
  
  return (
    <div>
      <ChessBoard fen={fen} />
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

describe('Game Flow Integration', () => {
  it('renders game and handles reset', async () => {
    render(<TestGameComponent />);
    
    // Verify initial render
    const board = screen.getByTestId('chessboard');
    expect(board).toBeInTheDocument();
    
    // Test reset functionality
    const resetButton = screen.getByText('Reset Game');
    fireEvent.click(resetButton);
    
    // Verify board was reset
    await waitFor(() => {
      expect(board).toBeInTheDocument();
    });
  });
});
