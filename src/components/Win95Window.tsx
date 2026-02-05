import React from 'react';
import { motion } from 'framer-motion';

interface Win95WindowProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
  showMenu?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export const Win95Window: React.FC<Win95WindowProps> = ({
  title,
  icon = '📋',
  children,
  className = '',
  showMenu = true,
  onClose,
  onMinimize,
  onMaximize,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.3, 
        ease: [0.175, 0.885, 0.32, 1.275] 
      }}
      className={`win95-window ${className}`}
    >
      {/* 标题栏 */}
      <div className="win95-titlebar">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm">{icon}</span>
          <span className="font-bold text-white text-sm tracking-wide truncate">{title}</span>
        </div>
        <div className="flex gap-1">
          <button 
            className="win95-titlebar-btn"
            onClick={onMinimize}
            disabled={!onMinimize}
          >
            _
          </button>
          <button 
            className="win95-titlebar-btn"
            onClick={onMaximize}
            disabled={!onMaximize}
          >
            □
          </button>
          <button 
            className="win95-titlebar-btn win95-close-btn"
            onClick={onClose}
            disabled={!onClose}
          >
            ✕
          </button>
        </div>
      </div>

      {/* 菜单栏 */}
      {showMenu && (
        <div className="win95-menubar">
          <span className="win95-menu-item"><u>文</u>件(F)</span>
          <span className="win95-menu-item"><u>编</u>辑(E)</span>
          <span className="win95-menu-item"><u>查</u>看(V)</span>
          <span className="win95-menu-item"><u>帮</u>助(H)</span>
        </div>
      )}

      {/* 内容区域 */}
      <div className="win95-content">
        {children}
      </div>
    </motion.div>
  );
};
