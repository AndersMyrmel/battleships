"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const users = {};
io.on('connection', (client) => {
    console.log('a user connected');
    client.on('username', (username) => {
        const user = {
            name: username,
            id: client.id,
        };
        users[client.id] = user;
        io.emit('connected', user);
    });
});
server.listen(3000, () => {
    console.log(`listening on http://localhost:3000`);
});
//const PORT = process.env.PORT || 3000;
//app.use(express.static('public'));
//
//app.get('/', (req, res) => {
//  res.sendFile(path.join(process.cwd(), './src/index.html'));
//});
//server.listen(PORT, () => {
//  console.log(`listening on http://localhost:${PORT}`);
//});
//# sourceMappingURL=index.js.map