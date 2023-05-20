import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { PlayState, Action } from '../types/PlayType';

const playHandler = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  state: PlayState,
  dispatch: React.Dispatch<Action>
) => {
  const placeShips = (x: number, y: number) => {
    if (state.submitted) return;
    const playerCopy = [...state.playerBoard];

    if (playerCopy[x][y] === 0 && state.shipsRemaining > 0) {
      playerCopy[x][y] = 1;
      dispatch({ type: 'setships', payload: state.shipsRemaining - 1 });
    } else if (playerCopy[x][y] === 1) {
      playerCopy[x][y] = 0;
      dispatch({ type: 'setships', payload: state.shipsRemaining + 1 });
    }

    dispatch({ type: 'setplayerboard', payload: playerCopy });
  };

  const handleSubmit = () => {
    if (!state.opponentName) return alert('Please wait for opponent');
    if (state.shipsRemaining > 0) return alert('Place all your ships first');

    dispatch({ type: 'setsubmitted', payload: true });
    socket.emit('submitboard', state.playerBoard);
  };

  const handleShot = (x: number, y: number) => {
    if (
      !state.submitted ||
      state.bombsRemaining < 1 ||
      state.enemyBoard[x][y] !== 2
    )
      return;

    dispatch({ type: 'setbombs', payload: state.bombsRemaining - 1 });
    socket.emit('shot', x, y);
  };

  return { placeShips, handleSubmit, handleShot };
};

export { playHandler };
