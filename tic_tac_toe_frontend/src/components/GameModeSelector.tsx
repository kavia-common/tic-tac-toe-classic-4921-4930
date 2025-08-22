import React from 'react';

interface GameModeSelectorProps {
  onModeSelect: (mode: 'computer' | 'player') => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onModeSelect }) => {
  return (
    <div className="flex gap-4 justify-center mb-8">
      <button
        className="btn btn-primary"
        onClick={() => onModeSelect('computer')}
      >
        Play vs Computer
      </button>
      <button
        className="btn btn-primary"
        onClick={() => onModeSelect('player')}
      >
        Play vs Player
      </button>
    </div>
  );
};

export default GameModeSelector;
