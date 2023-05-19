const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const events = require('./helpers');

app.use(cors);
const io = new Server(server);
const users = {};
let roomCount = 1;

io.on('connection', (client) => {
  client.on('username', (username) => {
    events.handleUsername(io, client, users, username, roomCount);
    roomCount += 1;
  });

  client.on('submitboard', (board) => {
    events.handleSubmitBoard(client, users, board);
  });

  client.on('shot', async (x, y) => {
    const [id, room] = client.rooms;
    const clients = io.sockets.adapter.rooms.get(room);
    const opponent = [...clients].filter((item) => item !== id).toString();

    if (users[opponent].board[x][y] === 0) io.to(id).emit('miss', x, y);
    else {
      io.to(id).emit('hit', x, y);
      io.to(opponent).emit('struck', x, y);
    }
  });

  client.on('disconnect', () => {
    events.handleDisconnect(client, users);
  });
});

server.listen(3000, () => {
  console.log(`listening on http://localhost:3000`);
  console.log(`VITE ➜  Local:   http://127.0.0.1:5173/`);
});
