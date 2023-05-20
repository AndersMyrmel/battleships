import { useContext, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { SocketContext } from '../../context/SocketProvider';
import { Reducer, INITIAL_STATE } from './reducer';
import PlayerBoard from '../../components/PlayerBoard';
import EnemyBoard from '../../components/EnemyBoard';

interface Username {
  username: string | null;
}

function Play({ username }: Username) {
  const location = useLocation();
  const socket = useContext(SocketContext);
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    socket.on('opponent', (name) => {
      dispatch({ type: 'setopponentname', payload: `${name} ⌛` });
    });

    socket.on('ready', (name) => {
      dispatch({
        type: 'setmultiple',
        payload: {
          opponentName: `${name} ✔️`,
          bombsRemaining: 2,
        },
      });
    });

    socket.on('miss', (x, y) => {
      const enemyCopy = [...state.enemyBoard];
      enemyCopy[x][y] = 0;
      dispatch({ type: 'setenemyboard', payload: enemyCopy });
    });

    socket.on('hit', (x, y) => {
      const enemyCopy = [...state.enemyBoard];
      enemyCopy[x][y] = 1;
      dispatch({ type: 'setenemyboard', payload: enemyCopy });
    });

    socket.on('missed', () => {
      dispatch({
        type: 'setbombsremaining',
        payload: state.bombsRemaining + 1,
      });
    });

    socket.on('struck', (x, y) => {
      dispatch({
        type: 'setbombsremaining',
        payload: state.bombsRemaining + 1,
      });
      const playerCopy = [...state.playerBoard];
      playerCopy[x][y] = 2;
      dispatch({ type: 'setplayerboard', payload: playerCopy });
    });
  }, [socket, state.playerBoard, state.enemyBoard, state.bombsRemaining]);

  const placeShips = (x: number, y: number) => {
    if (state.submitted) return;
    const playerCopy = [...state.playerBoard];

    if (playerCopy[x][y] === 0 && state.shipsRemaining > 0) {
      playerCopy[x][y] = 1;
      dispatch({
        type: 'setshipsremaining',
        payload: state.shipsRemaining - 1,
      });
    } else if (playerCopy[x][y] === 1) {
      playerCopy[x][y] = 0;
      dispatch({
        type: 'setshipsremaining',
        payload: state.shipsRemaining + 1,
      });
    }

    dispatch({ type: 'setplayerboard', payload: playerCopy });
  };

  const handleShot = (x: number, y: number) => {
    if (
      !state.submitted ||
      state.bombsRemaining < 1 ||
      state.enemyBoard[x][y] !== 2
    )
      return;
    dispatch({
      type: 'setbombsremaining',
      payload: state.bombsRemaining - 1,
    });
    socket.emit('shot', x, y);
  };

  const handleSubmit = () => {
    if (!state.opponentName) return alert('Please wait for opponent');
    if (state.shipsRemaining > 0) return alert('Place all your ships first');
    dispatch({ type: 'setsubmitted', payload: true });
    socket.emit('submitboard', state.playerBoard);
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
              🚢 {state.submitted ? `✔️` : `x${state.shipsRemaining}`}
            </h1>
          </div>
          <PlayerBoard grid={state.playerBoard} handleClick={placeShips} />
          <button
            className={
              state.submitted
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
            {state.opponentName ?? 'Waiting for player...'}
          </h1>
          <div className="flex justify-between">
            <h1 className="text-3xl font-poppins font-semibold w-2/3 h-12 inline-block">
              Shoot the enemy 🗺️
            </h1>
            <h1 className="font-poppins font-semibold text-3xl">
              💣 x{state.bombsRemaining}
            </h1>
          </div>
          <EnemyBoard grid={state.enemyBoard} handleClick={handleShot} />
        </div>
      </div>
    </div>
  );
}

export default Play;
