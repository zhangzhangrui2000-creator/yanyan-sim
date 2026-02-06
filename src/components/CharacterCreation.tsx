import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Win95Window } from './Win95Window';
import { Win95Button } from './Win95Button';
import { useGameStore } from '@/store/gameStore';
import { BACKGROUNDS, MAJORS, ADVISOR_TYPES } from '@/types/game';

export const CharacterCreation: React.FC = () => {
  const createCharacter = useGameStore(state => state.createCharacter);
  
  const [step, setStep] = useState(1);
  const hasSubmittedRef = useRef(false);
  const [character, setCharacter] = useState({
    name: '',
    gender: '' as 'male' | 'female' | '',
    background: '',
    major: '',
    advisorType: '',
  });
  const submitCharacter = useCallback(() => {
    if (hasSubmittedRef.current) {
      return;
    }
    hasSubmittedRef.current = true;
    // 生成随机名字
    const names = character.gender === 'male' 
      ? ['小明', '伟强', '志远', '浩然', '子轩']
      : ['小红', '婷婷', '雨萱', '思琪', '梦洁'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    
    createCharacter({
      ...character,
      name: randomName,
      gender: character.gender as 'male' | 'female',
    });
  }, [character, createCharacter]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      submitCharacter();
    }
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return character.gender !== '';
      case 2:
        return character.background !== '';
      case 3:
        return character.major !== '';
      case 4:
        return character.advisorType !== '';
      default:
        return false;
    }
  };

  useEffect(() => {
    if (step === 1 && character.gender) {
      setStep(2);
      return;
    }
    if (step === 2 && character.background) {
      setStep(3);
      return;
    }
    if (step === 3 && character.major) {
      setStep(4);
      return;
    }
  }, [
    step,
    character.gender,
    character.background,
    character.major,
    character.advisorType,
    submitCharacter,
  ]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-sm font-bold mb-4">选择性别：</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCharacter({ ...character, gender: 'male' })}
                className={`win95-btn py-3 sm:py-4 ${character.gender === 'male' ? 'win95-btn-active' : ''}`}
              >
                <span className="text-2xl mb-2 block">👨</span>
                <span>男</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCharacter({ ...character, gender: 'female' })}
                className={`win95-btn py-3 sm:py-4 ${character.gender === 'female' ? 'win95-btn-active' : ''}`}
              >
                <span className="text-2xl mb-2 block">👩</span>
                <span>女</span>
              </motion.button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <h3 className="text-sm font-bold mb-4">本科背景：</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(BACKGROUNDS).map((bg) => (
                <motion.button
                  key={bg.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCharacter({ ...character, background: bg.id })}
                  className={`win95-btn p-3 text-left ${character.background === bg.id ? 'win95-btn-active' : ''}`}
                >
                  <span className="text-lg mr-2">{bg.emoji}</span>
                  <span className="font-bold text-sm">{bg.name}</span>
                  <p className="text-xs text-gray-600 mt-1">{bg.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
            <h3 className="text-sm font-bold mb-4">专业方向：</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(MAJORS).map((major) => (
                <motion.button
                  key={major.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCharacter({ ...character, major: major.id })}
                  className={`win95-btn p-3 text-left ${character.major === major.id ? 'win95-btn-active' : ''}`}
                >
                  <span className="text-lg mr-2">{major.emoji}</span>
                  <span className="font-bold text-sm">{major.name}</span>
                  <p className="text-xs text-gray-600 mt-1">{major.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <h3 className="text-sm font-bold mb-4">选择导师类型：</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(ADVISOR_TYPES).map((advisor) => (
                <motion.button
                  key={advisor.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCharacter({ ...character, advisorType: advisor.id })}
                  className={`win95-btn p-3 text-left ${character.advisorType === advisor.id ? 'win95-btn-active' : ''}`}
                >
                  <span className="text-lg mr-2">{advisor.emoji}</span>
                  <span className="font-bold text-sm">{advisor.name}</span>
                  <p className="text-xs text-gray-600 mt-1">{advisor.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {advisor.traits.map((trait, i) => (
                      <span key={i} className="text-[10px] bg-gray-200 px-1 py-0.5 rounded">
                        {trait}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Win95Window 
      title="新生入学登记" 
      icon="📝"
      className="w-[92vw] max-w-none"
    >
      <div className="p-3 sm:p-4">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🎓</span>
            <h2 className="text-lg font-bold">研究生入学系统</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            请如实填写以下信息，这将影响你的初始属性。
          </p>
        </div>

        {/* 进度指示器 */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 ${
                s <= step ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* 步骤内容 */}
        <div className="mb-6">
          {renderStep()}
        </div>

        {/* 按钮 */}
        <div className="flex justify-between">
          {step > 1 ? (
            <Win95Button
              onClick={() => setStep(step - 1)}
              emoji="◀"
            >
              上一步
            </Win95Button>
          ) : (
            <div />
          )}
          <Win95Button
            onClick={handleNext}
            disabled={!isStepComplete()}
            variant="primary"
            emoji={step === 4 ? '✓' : '▶'}
          >
            {step === 4 ? '完成注册' : '下一步'}
          </Win95Button>
        </div>
      </div>
    </Win95Window>
  );
};
