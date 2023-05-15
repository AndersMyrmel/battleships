import './GameBoard.css';
import { board } from '../../types/board';

type BoardProps = {
  grid: board;
  enemy: string;
};

function GameBoard({ grid, enemy }: BoardProps) {
  return (
    <div className="table">
      {grid.map((row, rowidx) => {
        return (
          <div className="row" key={rowidx}>
            {row.map((cell, cellidx) => {
              return (
                <div
                  className={`cell ${enemy}`}
                  id={`${enemy}${rowidx}${cellidx}`}
                  key={cellidx}
                  onClick={() => console.log(`${enemy}${rowidx}${cellidx}`)}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;
