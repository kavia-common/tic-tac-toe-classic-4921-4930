import React from 'react';

interface GameBoardProps {
  board: string[];
  onCellClick: (index: number) => void;
  disabled: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick, disabled }) => {
  return (
    <div className="game-board">
      {board.map((cell, index) => (
        <button
          key={index}
          className="game-cell"
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== ''}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;
