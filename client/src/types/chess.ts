export interface ChessMove {
  from: string;
  to: string;
  promotion?: 'q' | 'r' | 'b' | 'n';
}

export interface ChessGame {
  id: string;
  fen: string;
  pgn: string;
  white: string;
  black: string;
  date: string;
  result: string;
  timeControl?: string;
  eco?: string;
  event?: string;
  annotations?: GameAnnotation[];
}

export interface GameAnnotation {
  ply: number;
  comment: string;
  shapes?: Shape[];
}

export interface Shape {
  brush: string;
  orig: string;
  dest?: string;
}

export type GameResult = '1-0' | '0-1' | '1/2-1/2' | '*';
