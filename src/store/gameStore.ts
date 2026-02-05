import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, Attributes, Character, Progress, Choice } from '@/types/game';

const INITIAL_ATTRIBUTES: Attributes = {
  academic: 50,
  mental: 80,
  advisor: 50,
  money: 50,
  peer_relations: 50,
};

const INITIAL_PROGRESS: Progress = {
  semester: 1,
  week: 1,
  day: 1,
  scene: 'welcome',
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // 初始状态
      attributes: { ...INITIAL_ATTRIBUTES },
      progress: { ...INITIAL_PROGRESS },
      character: null,
      isPlaying: false,
      isCharacterCreated: false,
      history: [],

      // 创建角色
      createCharacter: (character: Character) => {
        // 根据背景调整初始属性
        let attrModifiers: Partial<Attributes> = {};
        
        switch (character.background) {
          case 'top2':
            attrModifiers = { academic: 60, mental: 75, money: 50, advisor: 55, peer_relations: 45 };
            break;
          case 'c9':
            attrModifiers = { academic: 55, mental: 78, money: 50, advisor: 52, peer_relations: 50 };
            break;
          case 'normal':
            attrModifiers = { academic: 50, mental: 80, money: 45, advisor: 50, peer_relations: 55 };
            break;
          case 'other':
            attrModifiers = { academic: 45, mental: 82, money: 40, advisor: 48, peer_relations: 60 };
            break;
        }

        // 根据导师类型调整
        switch (character.advisorType) {
          case 'push':
            attrModifiers = { 
              ...attrModifiers, 
              mental: (attrModifiers.mental || 80) - 10,
              advisor: (attrModifiers.advisor || 50) - 5,
              peer_relations: (attrModifiers.peer_relations || 50) - 10
            };
            break;
          case 'free':
            attrModifiers = {
              ...attrModifiers,
              mental: (attrModifiers.mental || 80) + 5,
              advisor: (attrModifiers.advisor || 50) - 10,
              peer_relations: (attrModifiers.peer_relations || 50) + 5
            };
            break;
          case 'industry':
            attrModifiers = {
              ...attrModifiers,
              money: (attrModifiers.money || 50) + 15,
              academic: (attrModifiers.academic || 50) - 5,
              peer_relations: (attrModifiers.peer_relations || 50) - 15
            };
            break;
          case 'academic':
            attrModifiers = {
              ...attrModifiers,
              academic: (attrModifiers.academic || 50) + 5,
              mental: (attrModifiers.mental || 80) - 5,
              peer_relations: (attrModifiers.peer_relations || 50) - 20
            };
            break;
        }

        set({
          character,
          attributes: { ...INITIAL_ATTRIBUTES, ...attrModifiers },
          isCharacterCreated: true,
          progress: { ...INITIAL_PROGRESS, scene: 'first_day' },
          history: [`创建了角色：${character.name}`],
        });
      },

      // 做出选择
      makeChoice: (choice: Choice) => {
        const state = get();
        const newAttributes = { ...state.attributes };
        
        // 应用效果
        Object.entries(choice.effects).forEach(([key, value]) => {
          const attrKey = key as keyof Attributes;
          newAttributes[attrKey] = Math.max(0, Math.min(100, newAttributes[attrKey] + (value || 0)));
        });

        // 更新进度
        const newProgress = { ...state.progress };
        newProgress.day += 1;
        
        // 每周7天，每学期20周
        if (newProgress.day % 7 === 0) {
          newProgress.week += 1;
        }
        if (newProgress.week > 20) {
          newProgress.week = 1;
          newProgress.semester += 1;
        }
        
        newProgress.scene = choice.nextScene;

        // 检查游戏结束条件
        let finalScene = choice.nextScene;
        if (newAttributes.mental <= 0) {
          finalScene = 'ending_dropout_mental';
        } else if (newProgress.semester > 6 && newAttributes.academic < 60) {
          finalScene = 'ending_delay';
        } else if (newProgress.semester > 6 && newAttributes.academic >= 80) {
          finalScene = 'ending_excellent';
        } else if (newProgress.semester > 6) {
          finalScene = 'ending_graduation';
        }

        newProgress.scene = finalScene;

        set({
          attributes: newAttributes,
          progress: newProgress,
          history: [...state.history, `选择了：${choice.text}`],
        });
      },

      // 重置游戏
      resetGame: () => {
        set({
          attributes: { ...INITIAL_ATTRIBUTES },
          progress: { ...INITIAL_PROGRESS },
          character: null,
          isPlaying: false,
          isCharacterCreated: false,
          history: [],
        });
      },

      // 获取属性颜色
      getAttributeColor: (value: number) => {
        if (value >= 70) return 'bg-green-500';
        if (value >= 40) return 'bg-yellow-500';
        return 'bg-red-500';
      },

      // 获取属性标签
      getAttributeLabel: (key: keyof Attributes) => {
        const labels = {
          academic: '学术能力',
          mental: '心理健康',
          advisor: '导师关系',
          money: '经济状况',
          peer_relations: '同门关系',
        };
        return labels[key];
      },
    }),
    {
      name: 'grad-school-simulator',
    }
  )
);
