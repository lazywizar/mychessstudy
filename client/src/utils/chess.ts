/**
 * Validates a FEN string
 * @param fen - The FEN string to validate
 * @returns boolean indicating if the FEN string is valid
 */
export const isValidFen = (fen: string): boolean => {
  if (typeof fen !== 'string') return false;

  // Split FEN into its components
  const parts = fen.split(' ');
  if (parts.length !== 6) return false;

  // Basic validation of piece placement
  const rows = parts[0].split('/');
  if (rows.length !== 8) return false;

  for (const row of rows) {
    let sum = 0;
    for (const char of row) {
      if ('12345678'.includes(char)) {
        sum += parseInt(char);
      } else if ('prnbqkPRNBQK'.includes(char)) {
        sum += 1;
      } else {
        return false;
      }
    }
    if (sum !== 8) return false;
  }

  return true;
};

/**
 * Gets the starting position FEN string
 * @returns The standard chess starting position FEN
 */
export const getStartingFen = (): string => {
  return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
};
