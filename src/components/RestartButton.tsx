import React from 'react';
import { Win95Button } from './Win95Button';
import { useGameStore } from '@/store/gameStore';

interface RestartButtonProps {
  label?: string;
  emoji?: string;
  className?: string;
}

export const RestartButton: React.FC<RestartButtonProps> = ({
  label = '重新开始',
  emoji = '🔄',
  className = '',
}) => {
  const { resetGame } = useGameStore();

  return (
    <Win95Button onClick={resetGame} emoji={emoji} className={className}>
      {label}
    </Win95Button>
  );
};
