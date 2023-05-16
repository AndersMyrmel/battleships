import { io } from 'socket.io-client';
import { useEffect } from 'react';
import Game from './components/game';
import './App.css';

const username = prompt('Enter username');

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
});

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('username', username);
    });

    socket.on('connected', (user) => console.log(user.name));
  }, []);

  return (
    <div className="main">
      <Game />
    </div>
  );
}

export default App;
