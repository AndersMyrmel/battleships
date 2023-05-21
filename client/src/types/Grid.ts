import { Board } from './Board';

export type Grid = {
  grid: Board;
  handleClick: (x: number, y: number) => void;
};
