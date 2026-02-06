import React from 'react';
import { motion } from 'framer-motion';

interface AttributeBarProps {
  label: string;
  value: number;
  emoji?: string;
  dangerHigh?: boolean;
}

export const AttributeBar: React.FC<AttributeBarProps> = ({
  label,
  value,
  emoji,
  dangerHigh = false,
}) => {
  const getColor = (v: number) => {
    if (dangerHigh) {
      if (v >= 70) return 'bg-red-500';
      if (v >= 40) return 'bg-yellow-500';
      return 'bg-green-500';
    }
    if (v >= 70) return 'bg-green-500';
    if (v >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTextColor = (v: number) => {
    if (dangerHigh) {
      if (v >= 70) return 'text-red-700';
      if (v >= 40) return 'text-yellow-700';
      return 'text-green-700';
    }
    if (v >= 70) return 'text-green-700';
    if (v >= 40) return 'text-yellow-700';
    return 'text-red-700';
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="w-16 sm:w-20 text-xs font-bold flex items-center gap-1">
        {emoji && <span>{emoji}</span>}
        {label}
      </span>
      <div className="flex-1 win95-progress-bg">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`win95-progress-fill ${getColor(value)}`}
        />
      </div>
      <span className={`w-7 sm:w-8 text-xs font-bold text-right ${getTextColor(value)}`}>
        {value}
      </span>
    </div>
  );
};
