interface User {
  name: string;
  id: string;
  board: number[][];
}

const events = (io, client, users: User) => {
  const handleDisconnect = () => {
    const opponent = users[client.id]?.opponent;
    if (opponent) io.to(opponent).emit('opponentleft', users[client.id].name);
    delete users[client.id];
  };

  const handleUsername = (username: string, count: number) => {
    const user = {
      name: username,
      id: client.id,
    };
    users[client.id] = user;

    const roomId = Math.ceil(count / 2);
    client.join(`bs-${roomId}`);

    const opponent = getOpponent();
    if (opponent) {
      users[client.id].opponent = opponent;
      users[opponent].opponent = client.id;
      io.to(client.id).emit('opponent', users[opponent].name);
      io.to(opponent).emit('opponent', users[client.id].name);
    }
  };

  const handleCreateGame = (username: string) => {
    const user = {
      name: username,
      id: client.id,
    };
    users[client.id] = user;

    const roomId = username;
    client.join(`bs-${roomId}`);
  };

  const handleJoinGame = (username: string, hostname: string) => {
    const user = {
      name: username,
      id: client.id,
    };
    users[client.id] = user;

    const roomId = hostname;
    client.join(`bs-${roomId}`);

    const opponent = getOpponent();
    if (opponent) {
      users[client.id].opponent = opponent;
      users[opponent].opponent = client.id;
      io.to(client.id).emit('opponent', users[opponent].name);
      io.to(opponent).emit('opponent', users[client.id].name);
    }
  };

  const handleSubmitBoard = (board: number[][]) => {
    users[client.id].board = board;
    const opponent = users[client.id]?.opponent;
    if (opponent) io.to(opponent).emit('ready', users[client.id].name);
  };

  const handleShot = (x: number, y: number) => {
    const opponent = users[client.id]?.opponent;
    if (!opponent || !users[opponent].board) return;

    if (users[opponent].board[x][y] === 0) {
      io.to(client.id).emit('miss', x, y);
      io.to(opponent).emit('missed');
    } else {
      io.to(client.id).emit('hit', x, y);
      io.to(opponent).emit('struck', x, y);
    }
  };

  const handleGameOver = () => {
    const opponent = users[client.id]?.opponent;
    if (opponent) io.to(opponent).emit('loss', users[client.id].name);
  };

  const getOpponent = () => {
    const [id, room] = client.rooms;
    const clients = io.sockets.adapter.rooms.get(room);
    const opponent = [...clients].filter((item) => item !== id).toString();
    return opponent;
  };

  return {
    handleDisconnect,
    handleUsername,
    handleCreateGame,
    handleJoinGame,
    handleSubmitBoard,
    handleShot,
    handleGameOver,
  };
};

module.exports = { events };
