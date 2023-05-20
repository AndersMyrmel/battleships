import { SocketContext, SocketProvider } from './context/SocketProvider';
import { useEffect, useContext } from 'react';
import Game from './components/game';

let username: string | null;
do username = prompt('Enter username');
while (username !== null && username === '');

function App() {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('username', username);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [socket]);

  return (
    <SocketProvider>
      <div>
        <Game username={username} />
      </div>
    </SocketProvider>
  );
}

export default App;
