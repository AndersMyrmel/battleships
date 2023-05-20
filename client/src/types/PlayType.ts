export interface PlayState {
  playerBoard: number[][];
  enemyBoard: number[][];
  username: string;
  opponentName: string;
  submitted: boolean;
  shipsRemaining: number;
  bombsRemaining: number;
  hits: number;
  gameOver: boolean;
}

interface APlayerBoard {
  type: 'setplayerboard';
  payload: number[][];
}

interface AEnemyBoard {
  type: 'setenemyboard';
  payload: number[][];
}

interface AUsername {
  type: 'setusername';
  payload: string;
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

interface AHits {
  type: 'sethits';
  payload: number;
}

interface AGameOver {
  type: 'setgameover';
  payload: boolean;
}

interface AMultiple {
  type: 'setmultiple';
  payload: unknown;
}

export type Action =
  | APlayerBoard
  | AEnemyBoard
  | AUsername
  | AOpponentName
  | ASubmitted
  | AShips
  | ABombs
  | AHits
  | AGameOver
  | AMultiple;
