import './Board.css';
import { grid } from '../../types/grid';

function PlayerBoard({ grid, handleClick }: grid) {
  return (
    <div className="table">
      {grid.map((row, rowidx) => {
        return (
          <div className="row" key={rowidx}>
            {row.map((cell, cellidx) => {
              return (
                <div
                  className="cell"
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
