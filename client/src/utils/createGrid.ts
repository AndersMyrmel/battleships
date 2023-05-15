export const createGrid = (row: number, col: number, initial: number) =>
  new Array(row).fill(0).map(() => new Array(col).fill(initial));
