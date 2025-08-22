'use client';

import { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import GameStatus from '../components/GameStatus';
import GameModeSelector from '../components/GameModeSelector';

export default function Home() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<'computer' | 'player' | null>(null);

  const checkWinner = (squares: string[]): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const isDraw = (squares: string[]): boolean => {
    return squares.every((square) => square !== '');
  };

  const handleCellClick = (index: number) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const computerMove = () => {
    const emptyCells = board
      .map((cell, index) => (cell === '' ? index : -1))
      .filter((index) => index !== -1);

    if (emptyCells.length > 0) {
      const randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      handleCellClick(randomIndex);
    }
  };

  useEffect(() => {
    if (
      gameMode === 'computer' &&
      currentPlayer === 'O' &&
      !winner &&
      !isDraw(board)
    ) {
      const timer = setTimeout(computerMove, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode]);

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const handleModeSelect = (mode: 'computer' | 'player') => {
    setGameMode(mode);
    resetGame();
  };

  return (
    <main className="min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-primary text-center mb-8">
        Tic Tac Toe
      </h1>

      {!gameMode ? (
        <GameModeSelector onModeSelect={handleModeSelect} />
      ) : (
        <>
          <GameStatus
            winner={winner}
            isDraw={isDraw(board)}
            currentPlayer={currentPlayer}
            gameMode={gameMode}
          />

          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            disabled={
              gameMode === 'computer' && currentPlayer === 'O' && !winner
            }
          />

          <div className="mt-8 text-center">
            <button onClick={resetGame} className="btn btn-accent">
              Reset Game
            </button>
          </div>
        </>
      )}
    </main>
  );
}
