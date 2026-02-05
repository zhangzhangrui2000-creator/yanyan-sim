import React from 'react';
import { motion } from 'framer-motion';

interface Win95ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'primary';
  className?: string;
  emoji?: string;
}

export const Win95Button: React.FC<Win95ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'default',
  className = '',
  emoji,
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        win95-btn
        ${variant === 'primary' ? 'win95-btn-primary' : ''}
        ${disabled ? 'win95-btn-disabled' : ''}
        ${className}
      `}
    >
      {emoji && <span className="mr-2">{emoji}</span>}
      {children}
    </motion.button>
  );
};
