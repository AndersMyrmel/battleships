import { useContext, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { SocketContext } from '../../context/SocketProvider';
import { Reducer, INITIAL_STATE } from './reducer';
import { playHandler } from '../../utils/playHandler';
import { events } from './events';
import { Username } from '../../types/Username';
import PlayerBoard from '../../components/PlayerBoard';
import EnemyBoard from '../../components/EnemyBoard';

function Play({ username }: Username) {
  const location = useLocation();
  const socket = useContext(SocketContext);
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const {
    setOpponent,
    setReady,
    handleMiss,
    handleHit,
    handleMissed,
    handleStruck,
    handleLoss,
  } = events(state, dispatch, socket);
  const { placeShips, handleSubmit, handleShot } = playHandler(
    socket,
    state,
    dispatch
  );

  useEffect(() => {
    dispatch({ type: 'setusername', payload: location.state.username });
  }, []);

  useEffect(() => {
    socket.on('opponent', (name) => setOpponent(name));
    socket.on('ready', (name) => setReady(name));
    socket.on('miss', (x, y) => handleMiss(x, y));
    socket.on('hit', (x, y) => handleHit(x, y));
    socket.on('missed', () => handleMissed());
    socket.on('struck', (x, y) => handleStruck(x, y));
    socket.on('loss', (name) => handleLoss(name));
  }, [socket, state.bombsRemaining]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex text-center">
        <div className="mx-10">
          <h1 className="text-3xl font-poppins font-medium my-16">
            {state.username}
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
