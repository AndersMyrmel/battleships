import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SocketContext } from '../context/SocketProvider';
import { board } from '../types/board';
import { createGrid } from '../utils/index';
import PlayerBoard from '../components/playerboard';
import EnemyBoard from '../components/enemyboard';

interface Username {
  username: string | null;
}

function Play({ username }: Username) {
  const socket = useContext(SocketContext);
  const location = useLocation();
  const [playerBoard, setPlayerBoard] = useState<board>(createGrid(5, 5, 0));
  const [enemyBoard, setEnemyBoard] = useState<board>(createGrid(5, 5, 2));
  const [shipRemaining, setShipsRemaining] = useState<number>(5);
  const [bombsRemaining, setBombsRemaining] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [opponentName, setOpponentName] = useState<string>();

  useEffect(() => {
    socket.on('opponent', (name) => {
      setOpponentName(`${name} ⌛`);
    });

    socket.on('ready', (name) => {
      setBombsRemaining(2);
      setOpponentName(`${name} ✔️`);
    });

    socket.on('miss', (x, y) => {
      const enemyCopy = [...enemyBoard];
      (enemyCopy[x][y] = 0), setEnemyBoard(enemyCopy);
    });

    socket.on('hit', (x, y) => {
      const enemyCopy = [...enemyBoard];
      enemyCopy[x][y] = 1;
      setEnemyBoard(enemyCopy);
    });

    socket.on('missed', () => {
      setBombsRemaining(bombsRemaining + 1);
    });

    socket.on('struck', (x, y) => {
      setBombsRemaining(bombsRemaining + 1);
      const playerCopy = [...playerBoard];
      (playerCopy[x][y] = 2), setPlayerBoard(playerCopy);
    });
  }, [socket, playerBoard, enemyBoard, bombsRemaining]);

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
    if (!submitted || bombsRemaining < 1 || enemyBoard[x][y] !== 2) return;
    setBombsRemaining(bombsRemaining - 1);
    socket.emit('shot', x, y);
  };

  const handleSubmit = () => {
    if (!opponentName) return alert('Please wait for opponent');
    if (shipRemaining > 0) return alert('Place all your ships first');
    setSubmitted(true);
    socket.emit('submitboard', playerBoard);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex text-center">
        <div className="mx-10">
          <h1 className="text-3xl font-poppins font-medium my-16">
            {location.state.username}
          </h1>
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
                : 'bg-green-700 hover:bg-green-600 mt-5 h-12 w-1/2 inline-block font-poppins rounded'
            }
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <div className="mx-10">
          <h1 className="text-3xl font-poppins font-medium my-16">
            {opponentName ?? 'Waiting for player...'}
          </h1>
          <div className="flex justify-between">
            <h1 className="text-3xl font-poppins font-semibold w-2/3 h-12 inline-block">
              Shoot the enemy 🗺️
            </h1>
            <h1 className="font-poppins font-semibold text-3xl">
              💣 x{bombsRemaining}
            </h1>
          </div>
          <EnemyBoard grid={enemyBoard} handleClick={handleShot} />
        </div>
      </div>
    </div>
  );
}

export default Play;
