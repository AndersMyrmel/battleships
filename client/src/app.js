"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
var react_1 = require("react");
var game_1 = require("./components/game");
require("./App.css");
var username = prompt('Enter username');
var socket = (0, socket_io_client_1.io)('http://localhost:3000', {
    transports: ['websocket', 'polling'],
});
function App() {
    (0, react_1.useEffect)(function () {
        socket.on('connect', function () {
            socket.emit('username', username);
        });
        socket.on('connected', function (user) { return console.log(user.name); });
    }, []);
    return (<div className="main">
      <game_1.default />
    </div>);
}
exports.default = App;
