const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { events } = require('./events');
const db = require('./database');

app.use(cors());
const io = new Server(server);
const users = {};
let roomCount = 1;

io.on('connection', (client) => {
  const {
    handleDisconnect,
    handleUsername,
    handleCreateGame,
    handleJoinGame,
    handleSubmitBoard,
    handleShot,
    handleGameOver,
  } = events(io, client, users);
  db.incrementVisits();

  client.on('username', (username: string) => {
    handleUsername(username, roomCount);
    db.addUser(username);
    roomCount += 1;
  });

  client.on('creategame', (username: string) => {
    handleCreateGame(username);
    db.addUser(username);
  });

  client.on('joingame', (username: string, hostname: string) => {
    handleJoinGame(username, hostname);
    db.addUser(username);
  });

  client.on('submitboard', (board: number[][]) => {
    handleSubmitBoard(board);
    db.incrementGamesStarted();
  });

  client.on('shot', (x: number, y: number) => {
    handleShot(x, y);
  });

  client.on('gameover', () => {
    handleGameOver();
    db.incrementGamesCompleted();
  });

  client.on('disconnect', handleDisconnect);
});

server.listen(3000, () => {
  console.log(`listening on http://localhost:3000`);
  console.log(`VITE ➜  Local:   http://127.0.0.1:5173/`);
});
