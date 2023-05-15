import './Board.css';
import { BoardProps } from '../../types/BoardProps';

function PlayerBoard({ grid }: BoardProps) {
  return (
    <div className="table e">
      {grid.map((row, rowidx) => {
        return (
          <div className="row" key={rowidx}>
            {row.map((cell, cellidx) => {
              return (
                <div
                  className={`cell`}
                  id={`${rowidx}${cellidx}`}
                  key={cellidx}
                >
                  {cell > 1 ? 'X' : cell}
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
