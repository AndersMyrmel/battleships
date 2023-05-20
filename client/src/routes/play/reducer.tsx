import { createGrid } from '../../utils/createGrid';
import { PlayState, Action } from '../../types/PlayType';

export const INITIAL_STATE = {
  playerBoard: createGrid(5, 5, 0),
  enemyBoard: createGrid(5, 5, 2),
  username: null,
  opponentName: null,
  submitted: false,
  shipsRemaining: 5,
  bombsRemaining: 0,
  hits: 0,
  gameOver: false,
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
    case 'setusername':
      return {
        ...state,
        username: action.payload,
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
    case 'sethits':
      return {
        ...state,
        hits: action.payload,
      };
    case 'setgameover':
      return {
        ...state,
        gameOver: action.payload,
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
