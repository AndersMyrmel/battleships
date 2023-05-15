import { useEffect, useState } from 'react';
import { board } from '../../types/board';
import { createGrid, placeShips, ships } from '../../utils/index';
import PlayerBoard from '../playerboard';
import EnemyBoard from '../enemyboard';
import './Game.css';

function Game() {
  const [playerBoard, setPlayerBoard] = useState<board>(createGrid(5, 5, 0));
  const [enemyBoard, setEnemyBoard] = useState<board>(createGrid(5, 5, 2));

  useEffect(() => {
    placeShips(ships, [...playerBoard], setPlayerBoard);
  }, []);

  const handleShot = (x: number, y: number) => {
    const enemyCopy = [...enemyBoard];
    const playerCopy = [...playerBoard];

    if (playerBoard[x][y] === 0) enemyCopy[x][y] = 0;
    else (enemyCopy[x][y] = 1), (playerCopy[x][y] = 2);
    setEnemyBoard(enemyCopy), setPlayerBoard(playerCopy);
  };

  return (
    <div className="main">
      <PlayerBoard grid={playerBoard} />
      <EnemyBoard grid={enemyBoard} handleShot={handleShot} />
    </div>
  );
}

export default Game;
