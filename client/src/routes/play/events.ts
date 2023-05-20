import { PlayState, Action } from '../../types/PlayType';

const events = (state: PlayState, dispatch: React.Dispatch<Action>) => {
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
    dispatch({ type: 'setenemyboard', payload: enemyCopy });
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

  return {
    setOpponent,
    setReady,
    handleMiss,
    handleHit,
    handleMissed,
    handleStruck,
  };
};

export { events };
