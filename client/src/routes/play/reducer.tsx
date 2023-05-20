import { createGrid } from '../../utils';
import { PlayState, Action } from '../../types/PlayType';

export const INITIAL_STATE = {
  playerBoard: createGrid(5, 5, 0),
  enemyBoard: createGrid(5, 5, 2),
  opponentName: null,
  submitted: false,
  shipsRemaining: 5,
  bombsRemaining: 0,
};

export const Reducer = (state: PlayState, action: Action) => {
  switch (action.type) {
    case 'setplayerboard':
      return {
        ...state,
        playerBoard: action.payload,
      };
    case 'setenemyboard':
      return {
        ...state,
        enemyBoard: action.payload,
      };
    case 'setopponentname':
      return {
        ...state,
        opponentName: action.payload,
      };
    case 'setsubmitted':
      return {
        ...state,
        submitted: action.payload,
      };
    case 'setships':
      return {
        ...state,
        shipsRemaining: action.payload,
      };
    case 'setbombs':
      return {
        ...state,
        bombsRemaining: action.payload,
      };
    case 'setmultiple':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
