import { isValidFen, getStartingFen } from '../../utils/chess';

describe('Chess Utilities', () => {
  describe('isValidFen', () => {
    it('validates starting position', () => {
      expect(isValidFen(getStartingFen())).toBe(true);
    });

    it('validates empty board', () => {
      expect(isValidFen('8/8/8/8/8/8/8/8 w - - 0 1')).toBe(true);
    });

    it('rejects invalid FEN strings', () => {
      expect(isValidFen('invalid')).toBe(false);
      expect(isValidFen('8/8/8/8/8/8/8 w - - 0 1')).toBe(false); // Missing rank
      expect(isValidFen('8/8/8/8/8/8/8/9 w - - 0 1')).toBe(false); // Invalid number
      expect(isValidFen('8/8/8/8/8/8/8/8')).toBe(false); // Missing components
    });
  });

  describe('getStartingFen', () => {
    it('returns valid starting position', () => {
      const startingFen = getStartingFen();
      expect(startingFen).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
      expect(isValidFen(startingFen)).toBe(true);
    });
  });
});
