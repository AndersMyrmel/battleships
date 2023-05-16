import { board } from './board';

export type grid = {
  grid: board;
  handleClick: (x: number, y: number) => void;
};
