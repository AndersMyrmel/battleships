import { Grid } from '../types/Grid';

function PlayerBoard({ grid, handleClick }: Grid) {
  return (
    <div className="">
      {grid.map((row, rowidx) => {
        return (
          <div className="table-row" key={rowidx}>
            {row.map((cell, cellidx) => {
              return (
                <div
                  className="table-cell w-24 h-24 text-center text-3xl align-middle font-normal border border-neutral-600"
                  id={`${rowidx}${cellidx}`}
                  key={cellidx}
                  onClick={() => handleClick(rowidx, cellidx)}
                >
                  {cell > 1 ? '💥' : cell === 1 ? '🚢' : '🌊'}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default PlayerBoard;
