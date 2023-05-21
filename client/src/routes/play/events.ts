import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { PlayState, Action } from '../../types/PlayState';

const events = (
  state: PlayState,
  dispatch: React.Dispatch<Action>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
) => {
  const setOpponent = (name: string) => {
    dispatch({ type: 'setopponentname', payload: `${name} ⌛` });
  };

  const setReady = (name: string) => {
    dispatch({
      type: 'setmultiple',
      payload: {
        opponentName: `${name} ✔️`,
        bombsRemaining: 2,
      },
    });
  };

  const handleMiss = (x: number, y: number) => {
    const enemyCopy = [...state.enemyBoard];
    enemyCopy[x][y] = 0;
    dispatch({ type: 'setenemyboard', payload: enemyCopy });
  };

  const handleHit = (x: number, y: number) => {
    const enemyCopy = [...state.enemyBoard];
    enemyCopy[x][y] = 1;
    if (state.hits === 4) handleWin();

    dispatch({
      type: 'setmultiple',
      payload: { enemyBoard: enemyCopy, hits: state.hits + 1 },
    });
  };

  const handleMissed = () => {
    dispatch({ type: 'setbombs', payload: state.bombsRemaining + 1 });
  };

  const handleStruck = (x: number, y: number) => {
    const playerCopy = [...state.playerBoard];
    playerCopy[x][y] = 2;

    dispatch({
      type: 'setmultiple',
      payload: {
        bombsRemaining: state.bombsRemaining + 1,
        playerBoard: playerCopy,
      },
    });
  };

  const handleWin = () => {
    socket.emit('gameover', state.username);
    dispatch({
      type: 'setmultiple',
      payload: {
        username: `${state.username} 🏆`,
        opponentName: state.opponentName.replace('✔️', '💀'),
        gameOver: true,
      },
    });
  };

  const handleLoss = (name: string) => {
    dispatch({
      type: 'setmultiple',
      payload: {
        username: `${state.username} 💀`,
        opponentName: `${name} 🏆`,
        gameOver: true,
      },
    });
  };

  const handleDisconnect = (name: string) => {
    dispatch({ type: 'setopponentname', payload: `${name} ❌` });
  };

  return {
    setOpponent,
    setReady,
    handleMiss,
    handleHit,
    handleMissed,
    handleStruck,
    handleLoss,
    handleDisconnect,
  };
};

export { events };
