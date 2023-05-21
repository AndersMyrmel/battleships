import { useContext, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { SocketContext } from '../../context/SocketProvider';
import { Reducer, INITIAL_STATE } from './reducer';
import { playHandler } from '../../utils/playHandler';
import { events } from './events';
import PlayerBoard from '../../components/PlayerBoard';
import EnemyBoard from '../../components/EnemyBoard';
import Header from '../../components/Header';

function Play() {
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
    handleDisconnect,
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
    socket.on('opponentleft', (name) => handleDisconnect(name));
  }, [socket, state.bombsRemaining]);

  return (
    <>
      <Header username={location.state.username} />
      <div className="h-full flex justify-center items-center">
        <div className="flex text-center">
          <div className="lg:mx-10 sm:mx-5 xs:mx-5">
            <h1 className="lg:text-3xl font-poppins font-medium my-16 sm:text-2xl xs:text-sm">
              {state.username}
            </h1>
            <div className="flex justify-between">
              <h1 className="lg:text-2xl font-poppins font-semibold lg:h-10 sm:h-8 xs:h-6 sm:text-xl xs:text-xs">
                Place your ships 🧭
              </h1>
              <h1 className="font-poppins font-semibold lg:text-2xl sm:text-xl xs:text-xs">
                🚢 {state.submitted ? `✔️` : `x${state.shipsRemaining}`}
              </h1>
            </div>
            <PlayerBoard grid={state.playerBoard} handleClick={placeShips} />
            <button
              className={
                state.submitted
                  ? 'invisible mt-5 h-12'
                  : 'bg-green-700 hover:bg-green-600 mt-5 lg:h-12 lg:w-1/2 sm:h-8 sm:w-1/2 lg:text-lg sm:text-sm font-poppins rounded xs:w-1/2 xs:h-5 xs:text-xs'
              }
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <div className="lg:mx-10 sm:mx-5 xs:mx-5">
            <h1 className="lg:text-3xl font-poppins font-medium my-16 sm:text-2xl xs:text-sm">
              {state.opponentName ?? 'Waiting for player...'}
            </h1>
            <div className="flex justify-between">
              <h1 className="lg:text-2xl font-poppins font-semibold lg:h-10 sm:h-8 xs:h-6 sm:text-xl xs:text-xs">
                Shoot the enemy 🗺️
              </h1>
              <h1 className="font-poppins font-semibold lg:text-2xl sm:text-xl xs:text-xs">
                💣 x{state.bombsRemaining}
              </h1>
            </div>
            <EnemyBoard grid={state.enemyBoard} handleClick={handleShot} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Play;
