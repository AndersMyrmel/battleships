const events = (io, client, users) => {
  const handleDisconnect = () => {
    console.log(`${users[client.id].name} disconnected`);
    delete users[client.id];
  };

  const handleUsername = (username, count) => {
    const user = {
      name: username,
      id: client.id,
    };
    users[client.id] = user;
    io.emit('connected', user);
    console.log(`${username} connected`);

    const roomId = Math.ceil(count / 2);
    client.join(`bs-${roomId}`);
  };

  const handleSubmitBoard = (board) => {
    users[client.id].board = board;
  };

  const handleShot = (x, y) => {
    const [id, room] = client.rooms;
    const clients = io.sockets.adapter.rooms.get(room);
    const opponent = [...clients].filter((item) => item !== id).toString();
    if (!opponent || !users[opponent].board) return;

    if (users[opponent].board[x][y] === 0) {
      io.to(id).emit('miss', x, y);
    } else {
      io.to(id).emit('hit', x, y);
      io.to(opponent).emit('struck', x, y);
    }
  };

  return { handleDisconnect, handleUsername, handleSubmitBoard, handleShot };
};

module.exports = { events };
