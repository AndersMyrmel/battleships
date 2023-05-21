"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { events } = require('./events');
app.use(cors());
const io = new Server(server);
const users = {};
let roomCount = 1;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
io.on('connection', (client) => {
    const { handleDisconnect, handleUsername, handleCreateGame, handleJoinGame, handleSubmitBoard, handleShot, handleGameOver, } = events(io, client, users);
    client.on('username', (username) => {
        handleUsername(username, roomCount);
        roomCount += 1;
    });
    client.on('creategame', (username) => {
        handleCreateGame(username);
    });
    client.on('joingame', (username, hostname) => {
        handleJoinGame(username, hostname);
    });
    client.on('submitboard', (board) => {
        handleSubmitBoard(board);
    });
    client.on('shot', (x, y) => {
        handleShot(x, y);
    });
    client.on('gameover', handleGameOver);
    client.on('disconnect', handleDisconnect);
});
server.listen(3000, () => {
    console.log(`listening on http://localhost:3000`);
    console.log(`VITE ➜  Local:   http://127.0.0.1:5173/`);
});
//# sourceMappingURL=index.js.map