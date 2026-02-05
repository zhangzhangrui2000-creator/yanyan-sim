import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Win95Window } from '@/components/Win95Window';
import { CharacterCreation } from '@/components/CharacterCreation';
import { GameScene } from '@/components/GameScene';
import { Win95Button } from '@/components/Win95Button';
import './App.css';

function App() {
  const { isCharacterCreated, resetGame } = useGameStore();
  const [showCreation, setShowCreation] = React.useState(false);

  React.useEffect(() => {
    if (!isCharacterCreated) {
      setShowCreation(false);
    }
  }, [isCharacterCreated]);

  return (
    <div className="min-h-screen win95-desktop">
      {!isCharacterCreated && (
        <>
          <div className="win95-welcome-bg" />
          <div className="win95-welcome-vignette" />
        </>
      )}
      <AnimatePresence mode="wait">
        {!isCharacterCreated ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex items-center justify-center min-h-screen p-4 pb-24 sm:pb-4"
          >
            {!showCreation ? (
              <Win95Window
                title="欢迎"
                icon="🎓"
                className="w-[92vw] max-w-none"
                showMenu={false}
              >
                <div className="p-4 sm:p-5">
                  <div className="space-y-4 text-sm text-gray-800 leading-relaxed">
                    <p>欢迎来到读研模拟器！</p>
                    <p>
                      在这里，你将体验从入学到毕业的完整研究生生涯。<br />
                      面对各类经典场景，做出你的选择。
                    </p>
                    <p className="text-gray-600">
                      请根据最真实的想法选择，不用担心 game over ❤️
                    </p>
                  </div>
                  <div className="mt-5">
                    <Win95Button
                      variant="primary"
                      emoji="🚀"
                      className="w-full"
                      onClick={() => setShowCreation(true)}
                    >
                      开始我的研究生之旅
                    </Win95Button>
                  </div>
                </div>
              </Win95Window>
            ) : (
              <CharacterCreation />
            )}

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
          className="fixed bottom-4 sm:bottom-3 left-0 right-0 text-center px-4 win95-footnote relative z-10"
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
        <button
          className="win95-start-btn"
          onClick={resetGame}
        >
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

export default App;
