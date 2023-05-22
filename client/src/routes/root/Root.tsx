import { useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../context/SocketProvider';
import { Reducer, INITIAL_STATE } from './reducer';
import Header from '../../components/Header';

function Root() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const createGame = () => {
    if (!state.username) return alert('Enter username');

    socket.emit('creategame', state.username);
    navigate('Play', {
      state: {
        username: state.username,
      },
    });
  };

  const joinGame = () => {
    dispatch({ type: 'setdisplayhost', payload: true });
    if (!state.displayHost) return;
    if (!state.hostname) return alert("Enter host's name");

    socket.emit('joingame', state.username, state.hostname);
    navigate('Play', {
      state: {
        username: state.username,
      },
    });
  };

  const playOnline = () => {
    if (!state.username) return alert('Enter username');

    socket.emit('username', state.username);
    navigate('Play', {
      state: {
        username: state.username,
      },
    });
  };

  return (
    <>
      <Header username={state.username} />
      <div className="h-full flex flex-col items-center justify-start">
        <h1 className="font-poppins font-bold text-5xl md:text-7xl lg:text-8xl mt-32 mb-24">
          battleships
        </h1>

        <div className="mb-16 w-80">
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="guest"
              required
              onChange={(e) =>
                dispatch({ type: 'setusername', payload: e.target.value })
              }
            />
          </div>
        </div>

        {state.displayHost && (
          <div className="mb-16 w-80">
            <div>
              <label
                htmlFor="hostname"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Host name
              </label>
              <input
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="host"
                onChange={(e) =>
                  dispatch({ type: 'sethostname', payload: e.target.value })
                }
                required
              />
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row lg:flex-row">
          <button
            className="bg-rose-600 hover:bg-rose-500 h-14 w-36 font-poppins font-medium rounded mx-4 my-2"
            onClick={createGame}
          >
            Create Game
          </button>
          <button
            className="bg-amber-600 hover:bg-amber-500 h-14 w-36 font-poppins font-medium rounded mx-4 my-2"
            onClick={joinGame}
          >
            Join Game
          </button>
          <button
            className="bg-green-600 hover:bg-green-500 h-14 w-36 font-poppins font-medium rounded mx-4 my-2 mb-4"
            onClick={playOnline}
          >
            Play Online
          </button>
        </div>
      </div>
    </>
  );
}

export default Root;
