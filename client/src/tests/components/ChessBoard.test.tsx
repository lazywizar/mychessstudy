import React from 'react';
import { render, screen } from '@testing-library/react';
import ChessBoard from '../../components/ChessBoard/ChessBoard';

describe('ChessBoard Component', () => {
  it('renders without crashing', () => {
    render(<ChessBoard />);
    const boardElement = screen.getByTestId('chessboard');
    expect(boardElement).toBeInTheDocument();
  });

  it('accepts a FEN string prop', () => {
    const testFen = '8/8/8/8/8/8/8/8 w - - 0 1';
    render(<ChessBoard fen={testFen} />);
    const boardElement = screen.getByTestId('chessboard');
    expect(boardElement).toBeInTheDocument();
  });
});
