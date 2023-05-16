import { useState } from 'react';
import { board } from '../../types/board';
import { createGrid } from '../../utils/index';
import PlayerBoard from '../playerboard';
import EnemyBoard from '../enemyboard';

function Game() {
  const [playerBoard, setPlayerBoard] = useState<board>(createGrid(5, 5, 0));
  const [enemyBoard, setEnemyBoard] = useState<board>(createGrid(5, 5, 2));

  const placeShips = (x: number, y: number) => {
    const playerCopy = [...playerBoard];
    playerCopy[x][y] = 1;
    setPlayerBoard(playerCopy);
  };

  const handleShot = (x: number, y: number) => {
    const enemyCopy = [...enemyBoard];
    const playerCopy = [...playerBoard];

    if (playerBoard[x][y] === 0)
      (enemyCopy[x][y] = 0), setEnemyBoard(enemyCopy);
    else {
      (enemyCopy[x][y] = 1), (playerCopy[x][y] = 2);
      setEnemyBoard(enemyCopy), setPlayerBoard(playerCopy);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex text-center">
        <div className="mx-8">
          <h1 className="text-3xl font-bold">Place your ships</h1>
          <PlayerBoard grid={playerBoard} handleClick={placeShips} />
        </div>

        <div className="mx-8">
          <h1 className="text-3xl font-bold">Shoot enemy</h1>
          <EnemyBoard grid={enemyBoard} handleClick={handleShot} />
        </div>
      </div>
    </div>
  );
}

export default Game;
