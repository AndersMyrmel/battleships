import { Dispatch } from 'react';
import { board } from '../types/board';

export const placeShips = (
  ships: board,
  board: board,
  setPlayerBoard: Dispatch<React.SetStateAction<board>>
) => {
  ships.forEach((ship) => {
    const [x, y] = ship;
    board[x][y] = 1;
  });
  setPlayerBoard(board);
};
