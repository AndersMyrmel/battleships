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
                  className="table-cell lg:w-24 lg:h-24 sm:w-16 sm:h-16 xs:h-8 xs:w-8 text-center lg:text-3xl sm:text-xl xs:text-sm align-middle font-normal border border-neutral-600"
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
