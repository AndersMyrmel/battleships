export const createGrid = (row: number, col: number) =>
  new Array(row).fill(0).map(() => new Array(col).fill(0));
