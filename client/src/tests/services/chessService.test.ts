import { chessService } from '../../services/chessService';
import { getStartingFen } from '../../utils/chess';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Chess Service', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('fetches games successfully', async () => {
    const mockGames = [
      {
        id: '1',
        fen: getStartingFen(),
        pgn: '1. e4 e5',
        white: 'Player 1',
        black: 'Player 2',
        date: '2024-01-01',
        result: '1-0',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGames,
    });

    const games = await chessService.getGames();
    expect(games).toEqual(mockGames);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/games'));
  });

  it('handles fetch games error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(chessService.getGames()).rejects.toThrow('Failed to fetch games');
  });
});
