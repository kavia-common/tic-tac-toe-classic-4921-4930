import React from 'react';

interface GameStatusProps {
  winner: string | null;
  isDraw: boolean;
  currentPlayer: string;
  gameMode: 'computer' | 'player' | null;
}

const GameStatus: React.FC<GameStatusProps> = ({
  winner,
  isDraw,
  currentPlayer,
  gameMode,
}) => {
  if (winner) {
    return (
      <div className="text-2xl font-bold text-primary text-center mb-4">
        {winner === 'O' && gameMode === 'computer'
          ? 'Computer wins!'
          : `Player ${winner} wins!`}
      </div>
    );
  }

  if (isDraw) {
    return (
      <div className="text-2xl font-bold text-primary text-center mb-4">
        Game is a draw!
      </div>
    );
  }

  return (
    <div className="text-xl text-secondary text-center mb-4">
      {gameMode === 'computer' && currentPlayer === 'O'
        ? "Computer's turn"
        : `Player ${currentPlayer}'s turn`}
    </div>
  );
};

export default GameStatus;
