import '../playerboard/Board.css';
import { grid } from '../../types/grid';

function EnemyBoard({ grid, handleClick }: grid) {
  return (
    <div className="table">
      {grid.map((row, rowidx) => {
        return (
          <div className="row" key={rowidx}>
            {row.map((cell, cellidx) => {
              return (
                <div
                  className={`cell e`}
                  id={`${rowidx}${cellidx}`}
                  key={cellidx}
                  onClick={() => handleClick(rowidx, cellidx)}
                >
                  {cell > 1 ? '?' : cell}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default EnemyBoard;
