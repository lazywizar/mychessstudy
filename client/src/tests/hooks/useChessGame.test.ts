import { renderHook, act } from '@testing-library/react';
import { useChessGame } from '../../hooks/useChessGame';

describe('useChessGame Hook', () => {
  it('initializes with default FEN', () => {
    const { result } = renderHook(() => useChessGame());
    expect(result.current.fen).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    expect(result.current.history).toHaveLength(1);
  });

  it('initializes with custom FEN', () => {
    const customFen = '8/8/8/8/8/8/8/8 w - - 0 1';
    const { result } = renderHook(() => useChessGame(customFen));
    expect(result.current.fen).toBe(customFen);
    expect(result.current.history).toHaveLength(1);
  });

  it('resets game state', () => {
    const { result } = renderHook(() => useChessGame());
    act(() => {
      result.current.resetGame();
    });
    expect(result.current.fen).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    expect(result.current.history).toHaveLength(1);
  });
});
