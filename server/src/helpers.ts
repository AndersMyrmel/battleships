const handleDisconnect = (client, users) => {
  console.log(`${users[client.id].name} disconnected`);
  delete users[client.id];
};

const handleUsername = (io, client, users, username, count) => {
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

const handleSubmitBoard = (client, users, board) => {
  users[client.id].board = board;
};

module.exports = {
  handleUsername,
  handleSubmitBoard,
  handleDisconnect,
};
