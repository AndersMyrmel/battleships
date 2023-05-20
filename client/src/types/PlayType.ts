export interface PlayState {
  playerBoard: number[][];
  enemyBoard: number[][];
  opponentName: string;
  submitted: boolean;
  shipsRemaining: number;
  bombsRemaining: number;
}

interface APlayerBoard {
  type: 'setplayerboard';
  payload: number[][];
}

interface AEnemyBoard {
  type: 'setenemyboard';
  payload: number[][];
}

interface AOpponentName {
  type: 'setopponentname';
  payload: string;
}

interface ASubmitted {
  type: 'setsubmitted';
  payload: boolean;
}

interface AShips {
  type: 'setships';
  payload: number;
}

interface ABombs {
  type: 'setbombs';
  payload: number;
}

interface AMultiple {
  type: 'setmultiple';
  payload: unknown;
}

export type Action =
  | APlayerBoard
  | AEnemyBoard
  | AOpponentName
  | ASubmitted
  | AShips
  | ABombs
  | AMultiple;
