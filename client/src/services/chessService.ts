import { ChessGame } from '../types/chess';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

export const chessService = {
  async getGames(): Promise<ChessGame[]> {
    const response = await fetch(`${API_BASE_URL}/api/games`);
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }
    return response.json();
  },

  async getGame(id: string): Promise<ChessGame> {
    const response = await fetch(`${API_BASE_URL}/api/games/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch game');
    }
    return response.json();
  },

  async saveGame(game: Omit<ChessGame, 'id'>): Promise<ChessGame> {
    const response = await fetch(`${API_BASE_URL}/api/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });
    if (!response.ok) {
      throw new Error('Failed to save game');
    }
    return response.json();
  },
};
