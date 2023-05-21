import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

const URL = 'https://battleships-server-ia62.onrender.com/';
const socket = io(URL, { transports: ['websocket', 'polling'] });
const SocketContext = createContext<Socket>(socket);

const SocketProvider = ({ children }: any) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
