const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { events } = require('./helpers');

app.use(cors);
const io = new Server(server);
const users = {};
let roomCount = 1;

io.on('connection', (client) => {
  const { handleDisconnect, handleUsername, handleSubmitBoard, handleShot } =
    events(io, client, users);

  client.on('username', (username) => {
    handleUsername(username, roomCount);
    roomCount += 1;
  });

  client.on('submitboard', (board) => {
    handleSubmitBoard(board);
  });

  client.on('shot', (x, y) => {
    handleShot(x, y);
  });

  client.on('disconnect', handleDisconnect);
});

server.listen(3000, () => {
  console.log(`listening on http://localhost:3000`);
  console.log(`VITE ➜  Local:   http://127.0.0.1:5173/`);
});
