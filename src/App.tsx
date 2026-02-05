import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Win95Window } from '@/components/Win95Window';
import { CharacterCreation } from '@/components/CharacterCreation';
import { GameScene } from '@/components/GameScene';
import './App.css';

function App() {
  const { isCharacterCreated } = useGameStore();

  return (
    <div className="min-h-screen win95-desktop">
      <AnimatePresence mode="wait">
        {!isCharacterCreated ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-screen p-4 pb-24 sm:pb-4"
          >
            {/* 桌面图标 */}
            <div className="fixed top-3 left-3 hidden sm:grid grid-cols-1 gap-3 sm:top-4 sm:left-4 sm:gap-4">
              <DesktopIcon icon="🗑️" label="回收站" />
              <DesktopIcon icon="💻" label="我的电脑" />
              <DesktopIcon icon="📁" label="我的文档" />
              <DesktopIcon icon="🌐" label="Internet" />
            </div>

            {/* 主窗口 */}
            <Win95Window
              title="读研模拟器.exe"
              icon="🎓"
              className="w-full max-w-[92vw] sm:max-w-md"
              showMenu={true}
            >
              <div className="p-5 sm:p-8 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.175, 0.885, 0.32, 1.275]
                  }}
                >
                  <div className="text-5xl sm:text-6xl mb-4">🎓</div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2 win95-gradient-text">
                    读研模拟器
                  </h1>
                  <p className="text-gray-600 text-sm mb-6">
                    Grad School Simulator v1.0
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <p className="text-sm text-gray-700 leading-relaxed">
                    欢迎来到读研模拟器！<br />
                    在这里，你将体验从入学到毕业的完整研究生生涯。
                  </p>
                  
                  <p className="text-xs text-gray-500">
                    请根据最真实的想法选择<br />
                    不用担心 game over ❤️
                  </p>

                  <div className="pt-4">
                    <CharacterCreation />
                  </div>
                </motion.div>
              </div>
            </Win95Window>

          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GameScene />
          </motion.div>
        )}
      </AnimatePresence>

      {!isCharacterCreated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-4 sm:bottom-3 left-0 right-0 text-center px-4 win95-footnote"
        >
          <p className="text-white text-xs opacity-70 drop-shadow-md">
            本游戏纯属虚构，如有雷同纯属巧合
          </p>
          <p className="text-white text-xs opacity-70 drop-shadow-md mt-1">
            © 2026 读研模拟器
          </p>
        </motion.div>
      )}

      {/* 任务栏 */}
      <div className="win95-taskbar">
        <button className="win95-start-btn">
          <span className="text-lg">🪟</span>
          <span className="font-bold">开始</span>
        </button>
        <div className="win95-taskbar-divider" />
        <div className="flex-1 flex items-center gap-2 px-2">
          {isCharacterCreated && (
            <div className="win95-taskbar-item active">
              <span>🎓</span>
              <span className="text-sm">读研模拟器</span>
            </div>
          )}
        </div>
        <div className="win95-taskbar-time">
          {new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}

// 桌面图标组件
const DesktopIcon: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center gap-1 p-2 rounded cursor-pointer hover:bg-blue-500/30"
  >
    <span className="text-3xl drop-shadow-lg">{icon}</span>
    <span className="text-white text-xs text-center drop-shadow-md max-w-[60px]">
      {label}
    </span>
  </motion.div>
);

export default App;
