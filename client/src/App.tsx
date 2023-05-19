import { SocketContext, SocketProvider } from './context/SocketProvider';
import { useEffect, useContext } from 'react';
import Game from './components/game';

const username = prompt('Enter username');

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
  }, []);

  return (
    <SocketProvider>
      <div>
        <Game />
      </div>
    </SocketProvider>
  );
}

export default App;
