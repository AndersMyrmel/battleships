import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketProvider';

function Root() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState('');

  const joinGame = () => {
    if (!username) return alert('Enter username');

    socket.emit('username', username);
    navigate('Play', {
      state: {
        username: username,
      },
    });
  };

  const createGame = () => {
    if (!username) return alert('Enter username');
    socket.emit('username', username);
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-start">
        <h1 className="font-poppins font-bold text-8xl mt-32 mb-32">
          battleships
        </h1>

        <div className="mb-20 w-80">
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
              placeholder="John"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <button
            className="bg-rose-700 hover:bg-rose-800 h-16 w-48 font-poppins font-medium rounded mx-10"
            onClick={createGame}
          >
            Create Game
          </button>
          <button
            className="bg-green-700 hover:bg-green-800 h-16 w-48 font-poppins font-medium rounded mx-10"
            onClick={joinGame}
          >
            Join Game
          </button>
        </div>
      </div>
    </>
  );
}

export default Root;
