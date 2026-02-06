import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, Attributes, Character, Progress, Choice } from '@/types/game';

const INITIAL_ATTRIBUTES: Attributes = {
  academic: 50,
  mental: 80,
  advisor: 50,
  money: 50,
  peer_relations: 50,
  pressure: 30,
  advisor_mood: 60,
  sleep_debt: 20,
};

const INITIAL_PROGRESS: Progress = {
  semester: 1,
  week: 1,
  day: 1,
  scene: 'welcome',
  kpiWarnings: 0,
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
      mode: 'normal',

      // 创建角色
      createCharacter: (character: Character) => {
        const isTorture = get().mode === 'torture';
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

        const baseAttributes = { ...INITIAL_ATTRIBUTES, ...attrModifiers };

        set({
          character,
          attributes: isTorture
            ? {
                ...baseAttributes,
                mental: Math.max(0, baseAttributes.mental - 10),
                money: Math.max(0, baseAttributes.money - 10),
                pressure: 50,
              }
            : baseAttributes,
          isCharacterCreated: true,
          progress: { ...INITIAL_PROGRESS, scene: 'first_day' },
          history: [`创建了角色：${character.name}`],
        });
      },

      // 做出选择
      makeChoice: (choice: Choice) => {
        const state = get();
        const isTorture = state.mode === 'torture';
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

        if (isTorture) {
          const allNighterChoices = new Set([
            'stay_up',
            'all_nighter',
            'torture_pull_allnighter',
            'torture_run_back',
          ]);
          const restChoices = new Set([
            'go_sleep',
            'sleep_weekend',
            'take_break',
          ]);
          const backfireChoices = new Set([
            'ask_exception',
            'ask_advisor_help',
            'ask_advisor',
            'complain_advisor',
            'report_rules',
            'incident_fight',
          ]);

          // 全局折磨惩罚
          newAttributes.mental = Math.max(0, Math.min(100, newAttributes.mental - 5));
          newAttributes.money = Math.max(0, Math.min(100, newAttributes.money - 2));
          newAttributes.advisor = Math.max(0, Math.min(100, newAttributes.advisor - 2));
          newAttributes.pressure = Math.max(0, Math.min(100, newAttributes.pressure + 8));

          if (allNighterChoices.has(choice.id)) {
            newAttributes.sleep_debt = Math.max(0, Math.min(100, newAttributes.sleep_debt + 25));
            newAttributes.mental = Math.max(0, Math.min(100, newAttributes.mental - 10));
            newAttributes.pressure = Math.max(0, Math.min(100, newAttributes.pressure + 10));
          } else if (restChoices.has(choice.id)) {
            newAttributes.sleep_debt = Math.max(0, Math.min(100, newAttributes.sleep_debt - 20));
            newAttributes.mental = Math.max(0, Math.min(100, newAttributes.mental + 5));
          } else {
            newAttributes.sleep_debt = Math.max(0, Math.min(100, newAttributes.sleep_debt + 5));
          }

          if (backfireChoices.has(choice.id)) {
            newAttributes.advisor_mood = Math.max(0, Math.min(100, newAttributes.advisor_mood - 15));
            newAttributes.advisor = Math.max(0, Math.min(100, newAttributes.advisor - 5));
            newAttributes.pressure = Math.max(0, Math.min(100, newAttributes.pressure + 8));
          }

          if (newAttributes.academic < 50) {
            newAttributes.advisor_mood = Math.max(0, Math.min(100, newAttributes.advisor_mood - 3));
          }
          if (newAttributes.pressure > 70) {
            newAttributes.advisor_mood = Math.max(0, Math.min(100, newAttributes.advisor_mood - 4));
          }

          // 周度绩效检查
          if (newProgress.day % 7 === 0) {
            const warningTriggered =
              newAttributes.academic < 50 || newAttributes.advisor < 40 || newAttributes.pressure > 70;
            if (warningTriggered) {
              newProgress.kpiWarnings += 1;
              newAttributes.mental = Math.max(0, Math.min(100, newAttributes.mental - 5));
              newAttributes.advisor = Math.max(0, Math.min(100, newAttributes.advisor - 5));
            }
            newAttributes.pressure = Math.max(0, Math.min(100, newAttributes.pressure + 10));
          }

          // 折磨版插入场景
          if (state.progress.scene === 'strict_attendance' && choice.nextScene === 'daily_routine_1') {
            newProgress.scene = 'torture_checkin';
          }
          if (state.progress.scene === 'experiment_1' && choice.nextScene === 'weekend_choice') {
            newProgress.scene = 'torture_midnight';
          }
          if (state.progress.scene === 'crisis' && choice.nextScene === 'internship_choice') {
            newProgress.scene = 'lab_incident';
          }
        }

        // 检查游戏结束条件
        let finalScene = choice.nextScene;
        if (newAttributes.mental <= 0) {
          finalScene = 'ending_dropout_mental';
        } else if (newAttributes.pressure >= 100) {
          finalScene = 'ending_burnout';
        } else if (newAttributes.sleep_debt >= 100) {
          finalScene = 'ending_burnout';
        } else if (newAttributes.advisor_mood <= 0) {
          finalScene = 'ending_kicked';
        } else if (newProgress.kpiWarnings >= 3) {
          finalScene = 'ending_kicked';
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

      setMode: (mode) => {
        set({ mode });
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
          pressure: '绩效压力',
          advisor_mood: '导师情绪',
          sleep_debt: '睡眠负债',
        };
        return labels[key];
      },
    }),
    {
      name: 'grad-school-simulator',
    }
  )
);
