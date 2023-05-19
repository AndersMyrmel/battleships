import { useState } from 'react';
import { board } from '../../types/board';
import { createGrid } from '../../utils/index';
import PlayerBoard from '../playerboard';
import EnemyBoard from '../enemyboard';

function Game() {
  const [playerBoard, setPlayerBoard] = useState<board>(createGrid(5, 5, 0));
  const [enemyBoard, setEnemyBoard] = useState<board>(createGrid(5, 5, 2));
  const [shipRemaining, setShipsRemaining] = useState<number>(5);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const placeShips = (x: number, y: number) => {
    if (submitted) return;
    const playerCopy = [...playerBoard];

    if (playerCopy[x][y] === 0 && shipRemaining > 0)
      (playerCopy[x][y] = 1), setShipsRemaining(shipRemaining - 1);
    else if (playerCopy[x][y] === 1)
      (playerCopy[x][y] = 0), setShipsRemaining(shipRemaining + 1);
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

  const handleClick = () => {
    setSubmitted(true);
    // Pass player board to server
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex text-center">
        <div className="mx-10">
          <div className="flex justify-between">
            <h1 className="text-3xl font-poppins font-semibold w-2/3 h-12 inline-block">
              Place your ships 🧭
            </h1>
            <h1 className="font-poppins font-semibold text-3xl">
              🚢 {submitted ? `✔️` : `x${shipRemaining}`}
            </h1>
          </div>
          <PlayerBoard grid={playerBoard} handleClick={placeShips} />

          <button
            className={
              submitted
                ? 'invisible mt-5 h-12'
                : 'bg-green-700 hover:bg-green-800 mt-5 h-12 w-1/2 inline-block font-poppins rounded'
            }
            onClick={handleClick}
          >
            Submit
          </button>
        </div>

        <div className="mx-10">
          <div className="flex justify-between">
            <h1 className="text-3xl font-poppins font-semibold w-2/3 h-12 inline-block">
              Shoot the enemy 🗺️
            </h1>
            <h1 className="font-poppins font-semibold text-3xl">💣 x3</h1>
          </div>
          <EnemyBoard grid={enemyBoard} handleClick={handleShot} />
        </div>
      </div>
    </div>
  );
}

export default Game;
