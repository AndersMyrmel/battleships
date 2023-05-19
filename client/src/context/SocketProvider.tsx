import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

//const URL =
//  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

const URL = 'http://localhost:3000';
const socket = io(URL, { transports: ['websocket', 'polling'] });
const SocketContext = createContext<Socket>(socket);

const SocketProvider = ({ children }: any) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
