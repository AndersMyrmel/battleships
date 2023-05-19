const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

app.use(cors);
const io = new Server(server);
const users = {};

io.on('connection', (client) => {
  client.on('username', (username) => {
    const user = {
      name: username,
      id: client.id,
    };
    users[client.id] = user;
    io.emit('connected', user);
    console.log(`${username} connected`);
  });

  client.on('disconnect', () => {
    console.log(`${users[client.id].name} disconnected`);
    delete users[client.id];
  });
});

server.listen(3000, () => {
  console.log(`listening on http://localhost:3000`);
  console.log(`VITE ➜  Local:   http://127.0.0.1:5173/`);
});
