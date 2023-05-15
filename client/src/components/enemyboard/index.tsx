import '../playerboard/Board.css';
import { BoardProps } from '../../types/BoardProps';

interface EnemyProps extends BoardProps {
  handleShot: (x: number, y: number) => void;
}

function EnemyBoard({ grid, handleShot }: EnemyProps) {
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
                  onClick={() => handleShot(rowidx, cellidx)}
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
