import { useEffect, useState } from 'react';
import { board } from '../../types/board';
import { createGrid, placeShips, ships } from '../../utils/index';
import Board from '../board';
import './Game.css';

function Game() {
  const [playerBoard, setPlayerBoard] = useState<board>(createGrid(5, 5));
  const [opponentBoard, setOpponentBoard] = useState<board>(createGrid(5, 5));

  useEffect(() => {
    placeShips(ships, [...playerBoard], setPlayerBoard);
  }, []);

  return (
    <div className="main">
      <div className="table">
        <Board grid={playerBoard} enemy="" />
      </div>
      <div className="table">
        <Board grid={opponentBoard} enemy="e" />
      </div>
    </div>
  );
}

export default Game;
