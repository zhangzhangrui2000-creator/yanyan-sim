import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, Attributes, Character, Progress, Choice } from '@/types/game';

const createSeededRng = (seed: string) => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const INITIAL_ATTRIBUTES: Attributes = {
  academic: 50,
  mental: 100,
  advisor: 50,
  money: 5000,
  peer_relations: 50,
  pressure: 0,
  advisor_mood: 50,
  sleep_debt: 0,
  health: 100,
  karma: 0,
  rumor: 0,
  kpi: 0,
};

const INITIAL_PROGRESS: Progress = {
  semester: 1,
  week: 1,
  day: 1,
  scene: 'welcome',
  kpiWarnings: 0,
  eventCounter: 0,
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
      seed: null,
      backlashQueue: [],
      chainRemaining: 0,
      chainReturnScene: null,

      // 创建角色
      createCharacter: (character: Character) => {
        const isTorture = get().mode === 'torture';
        // 根据背景调整初始属性
        let attrModifiers: Partial<Attributes> = {};
        let moneyDelta = 0;
        
        switch (character.background) {
          case 'top2':
            attrModifiers = { academic: 60, mental: 75, advisor: 55, peer_relations: 45 };
            break;
          case 'c9':
            attrModifiers = { academic: 55, mental: 78, advisor: 52, peer_relations: 50 };
            break;
          case 'normal':
            attrModifiers = { academic: 50, mental: 80, advisor: 50, peer_relations: 55 };
            moneyDelta -= 500;
            break;
          case 'other':
            attrModifiers = { academic: 45, mental: 82, advisor: 48, peer_relations: 60 };
            moneyDelta -= 800;
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
              academic: (attrModifiers.academic || 50) - 5,
              peer_relations: (attrModifiers.peer_relations || 50) - 15
            };
            moneyDelta += 1500;
            break;
          case 'academic':
            attrModifiers = {
              ...attrModifiers,
              academic: (attrModifiers.academic || 50) + 5,
              mental: (attrModifiers.mental || 80) - 5,
              peer_relations: (attrModifiers.peer_relations || 50) - 20
            };
            moneyDelta -= 500;
            break;
        }

        const baseAttributes = { ...INITIAL_ATTRIBUTES, ...attrModifiers };
        baseAttributes.money = baseAttributes.money + moneyDelta;

        set({
          character,
          attributes: isTorture
            ? {
                ...baseAttributes,
                mental: Math.max(0, baseAttributes.mental - 10),
                pressure: 20,
                sleep_debt: 10,
              }
            : baseAttributes,
          isCharacterCreated: true,
          progress: { ...INITIAL_PROGRESS, scene: 'first_day' },
          history: [`创建了角色：${character.name}`],
          seed: `${character.name}-${Date.now()}`,
          backlashQueue: [],
          chainRemaining: 0,
          chainReturnScene: null,
        });
      },

      // 做出选择
      makeChoice: (choice: Choice) => {
        const state = get();
        const isTorture = state.mode === 'torture';
        const newAttributes = { ...state.attributes };
        let backlogQueue = [...state.backlashQueue];
        let chainRemaining = state.chainRemaining;
        let chainReturnScene = state.chainReturnScene;
        
        // 应用效果
        Object.entries(choice.effects).forEach(([key, value]) => {
          const attrKey = key as keyof Attributes;
          const delta = value || 0;
          const scaledDelta =
            isTorture && attrKey === 'money' ? delta * 100 : delta;
          newAttributes[attrKey] = newAttributes[attrKey] + scaledDelta;
        });

        // 更新进度
        const newProgress = { ...state.progress };
        newProgress.day += 1;
        newProgress.eventCounter += 1;
        
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
          const rng = createSeededRng(`${state.seed || 'fallback'}-${newProgress.eventCounter}`);
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
          const aiChoices = new Set(['ask_chatgpt', 'ask_gpt', 'ask_ai']);
          const relaxChoices = new Set(['go_out', 'sleep_weekend', 'take_break']);
          const rebelChoices = new Set(['report_rules', 'incident_fight', 'confront_directly', 'talk_back']);
          const relationshipOps = new Set([
            'join_alliance',
            'join_lickers',
            'form_alliance',
            'tell_advisor',
          ]);

          const clamp = (v: number, min = -9999, max = 9999) => Math.min(max, Math.max(min, v));
          const applyGlobalDamage = (scale = 1) => {
            newAttributes.mental = clamp(newAttributes.mental - 10 * scale, -10, 150);
            newAttributes.pressure = clamp(newAttributes.pressure + 15 * scale, 0, 200);
            newAttributes.health = clamp(newAttributes.health - 8 * scale, -10, 150);
            newAttributes.advisor_mood = clamp(newAttributes.advisor_mood - 8 * scale, 0, 100);
            newAttributes.kpi = clamp(newAttributes.kpi - 2 * scale, -20, 30);
            newAttributes.karma = clamp(newAttributes.karma + 1, 0, 999);
            newAttributes.rumor = clamp(newAttributes.rumor + 1, 0, 999);
          };

          // 连锁反应场景处理
          if (state.progress.scene === 'backlash_chain' && chainRemaining > 0) {
            applyGlobalDamage(1);
            chainRemaining -= 1;
            if (chainRemaining <= 0 && chainReturnScene) {
              newProgress.scene = chainReturnScene;
              chainReturnScene = null;
            } else {
              newProgress.scene = 'backlash_chain';
            }
          }

          // 全局折磨惩罚
          newAttributes.mental = clamp(newAttributes.mental - 5, -10, 150);
          newAttributes.money = clamp(newAttributes.money - 50, -9999, 999999);
          newAttributes.advisor = clamp(newAttributes.advisor - 2, -100, 100);
          newAttributes.pressure = clamp(newAttributes.pressure + 8, 0, 200);

          if (allNighterChoices.has(choice.id)) {
            newAttributes.sleep_debt = clamp(newAttributes.sleep_debt + 25, 0, 200);
            newAttributes.mental = clamp(newAttributes.mental - 10, -10, 150);
            newAttributes.pressure = clamp(newAttributes.pressure + 10, 0, 200);
          } else if (restChoices.has(choice.id)) {
            newAttributes.sleep_debt = clamp(newAttributes.sleep_debt - 20, 0, 200);
            newAttributes.mental = clamp(newAttributes.mental + 5, -10, 150);
          } else {
            newAttributes.sleep_debt = clamp(newAttributes.sleep_debt + 5, 0, 200);
          }

          if (backfireChoices.has(choice.id)) {
            newAttributes.advisor_mood = clamp(newAttributes.advisor_mood - 15, 0, 100);
            newAttributes.advisor = clamp(newAttributes.advisor - 5, -100, 100);
            newAttributes.pressure = clamp(newAttributes.pressure + 8, 0, 200);
          }

          if (relationshipOps.has(choice.id)) {
            newAttributes.rumor = clamp(newAttributes.rumor + 1, 0, 999);
          }

          // 负面选择增加业力
          const hasNegative = Object.values(choice.effects).some((v) => (v || 0) < 0);
          if (hasNegative) {
            newAttributes.karma = clamp(newAttributes.karma + 1, 0, 999);
          }

          // AI/捷径检测
          if (aiChoices.has(choice.id) && rng() < 0.5) {
            newAttributes.advisor_mood = clamp(newAttributes.advisor_mood - 25, 0, 100);
            newAttributes.karma = clamp(newAttributes.karma + 3, 0, 999);
            newAttributes.pressure = clamp(newAttributes.pressure + 15, 0, 200);
          }

          // 基础衰减
          if (newAttributes.academic < 50) {
            newAttributes.advisor_mood = clamp(newAttributes.advisor_mood - 3, 0, 100);
          }
          if (newAttributes.pressure > 70) {
            newAttributes.advisor_mood = clamp(newAttributes.advisor_mood - 4, 0, 100);
          }

          // 每日自动机制
          if (newAttributes.pressure > 50) {
            newAttributes.karma = clamp(newAttributes.karma + 1, 0, 999);
          }
          if (newAttributes.sleep_debt > 30) {
            newAttributes.health = clamp(newAttributes.health - 5, -10, 150);
          }
          if (newAttributes.pressure > 100) {
            newAttributes.sleep_debt = clamp(newAttributes.sleep_debt + 5, 0, 200);
          }
          if (newAttributes.pressure > 150) {
            newAttributes.health = clamp(newAttributes.health - 5, -10, 150);
          }
          if (newAttributes.sleep_debt > 50) {
            newAttributes.mental = clamp(newAttributes.mental - 10, -10, 150);
          }
          if (newAttributes.sleep_debt > 100) {
            applyGlobalDamage(2);
          }

          // 周度绩效检查
          if (newProgress.day % 7 === 0) {
            newAttributes.advisor_mood = clamp(newAttributes.advisor_mood - 3, 0, 100);
            const warningTriggered =
              newAttributes.academic < 50 || newAttributes.advisor < 40 || newAttributes.pressure > 70;
            if (warningTriggered) {
              newProgress.kpiWarnings += 1;
              newAttributes.mental = clamp(newAttributes.mental - 5, -10, 150);
              newAttributes.advisor = clamp(newAttributes.advisor - 5, -100, 100);
            }

            if (newAttributes.advisor_mood < 20 && rng() < 0.5) {
              newProgress.kpiWarnings += 1;
            }

            const kpiDelta =
              (newAttributes.academic >= 60 ? 1 : -1) +
              (newAttributes.advisor >= 50 ? 1 : -1) +
              (newAttributes.pressure > 80 ? -1 : 0);
            newAttributes.kpi = clamp(newAttributes.kpi + kpiDelta, -20, 30);
          }

          // 随机轮盘（每3事件抽取1-2反噬）
          if (newProgress.eventCounter % 3 === 0 && rng() < 0.7) {
            const extraHits = rng() < 0.5 ? 1 : 2;
            for (let i = 0; i < extraHits; i += 1) {
              applyGlobalDamage(1);
            }
          }

          // 反噬机制
          const risk = 0.8;
          let forcedType: 'immediate' | 'delayed' | 'chain' | null = null;
          if (aiChoices.has(choice.id)) forcedType = 'delayed';
          if (relaxChoices.has(choice.id)) forcedType = 'delayed';
          if (rebelChoices.has(choice.id)) forcedType = 'chain';

          if (rng() < risk || forcedType) {
            const roll = forcedType
              ? forcedType
              : rng() < 0.5
                ? 'immediate'
                : rng() < 0.8
                  ? 'delayed'
                  : 'chain';

            const severity = 1 + Math.floor(rng() * 2); // 1-2
            if (roll === 'immediate') {
              applyGlobalDamage(severity);
            } else if (roll === 'delayed') {
              const steps = 1 + Math.floor(rng() * 5);
              backlogQueue.push({ steps, severity, chain: 0 });
            } else {
              const chain = 2 + Math.floor(rng() * 3);
              applyGlobalDamage(1);
              newProgress.scene = 'backlash_chain';
              chainRemaining = chain;
              chainReturnScene = choice.nextScene;
            }

            // 概率地狱：失败时全参数-10%
            let blastChance = 0.2 + rng() * 0.3;
            blastChance = Math.min(0.9, blastChance * 2);
            if (rng() < blastChance) {
              Object.keys(newAttributes).forEach((key) => {
                const k = key as keyof Attributes;
                newAttributes[k] = newAttributes[k] - newAttributes[k] * 0.1;
              });
            }
          }

          // 延迟炸弹倒计时
          if (backlogQueue.length > 0) {
            const nextQueue: typeof backlogQueue = [];
            backlogQueue.forEach((item) => {
              const nextSteps = item.steps - 1;
              if (nextSteps <= 0) {
                applyGlobalDamage(item.severity);
                if (item.chain > 0) {
                  newProgress.scene = 'backlash_chain';
                  chainRemaining = item.chain;
                  chainReturnScene = choice.nextScene;
                }
              } else {
                nextQueue.push({ ...item, steps: nextSteps });
              }
            });
            backlogQueue = nextQueue;
          }

          // 谣言爆发
          if (newAttributes.rumor >= 5) {
            newAttributes.rumor = newAttributes.rumor - 5;
            newAttributes.peer_relations = clamp(newAttributes.peer_relations - 10, -100, 100);
            newAttributes.advisor = clamp(newAttributes.advisor - 10, -100, 100);
          }

          // 业力爆发
          if (newAttributes.karma > 10) {
            applyGlobalDamage(2);
            newAttributes.karma = Math.max(0, newAttributes.karma - 5);
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

          if (newAttributes.health < 50 && state.progress.scene !== 'sickness_event' && newProgress.scene !== 'backlash_chain') {
            newProgress.scene = 'sickness_event';
            chainReturnScene = choice.nextScene;
          }
        }

        // 检查游戏结束条件
        let finalScene = choice.nextScene;
        if (newAttributes.mental <= 0) {
          finalScene = 'ending_dropout_mental';
        } else if (newAttributes.health <= 0) {
          finalScene = 'ending_health';
        } else if (newAttributes.money < 0) {
          finalScene = 'ending_bankrupt';
        } else if (newAttributes.pressure >= 150) {
          finalScene = 'ending_burnout';
        } else if (newAttributes.sleep_debt >= 100) {
          finalScene = 'ending_burnout';
        } else if (newAttributes.advisor_mood <= 0) {
          finalScene = 'ending_kicked';
        } else if (newAttributes.kpi < -5) {
          finalScene = 'ending_kpi_fail';
        } else if (newProgress.kpiWarnings >= 3) {
          finalScene = 'ending_kicked';
        } else if (newProgress.semester > 6 && newAttributes.academic < 60) {
          finalScene = 'ending_delay';
        } else if (newProgress.semester > 6 && newAttributes.academic >= 80) {
          finalScene = 'ending_excellent';
        } else if (newProgress.semester > 6) {
          if (newAttributes.kpi < -5) {
            finalScene = 'ending_kpi_fail';
          } else if (newAttributes.kpi <= 15) {
            finalScene = 'ending_eternal_delay';
          } else {
            finalScene = 'ending_graduation';
          }
        }

        if (isTorture && finalScene === 'ending_excellent') {
          const rng = createSeededRng(`${state.seed || 'fallback'}-excellent-${newProgress.eventCounter}`);
          if (rng() > 0.05) {
            finalScene = 'ending_graduation';
          }
        }

        if (isTorture && finalScene === 'ending_graduation') {
          const rng = createSeededRng(`${state.seed || 'fallback'}-fake-${newProgress.eventCounter}`);
          if (rng() < 0.4) {
            finalScene = 'ending_fake_graduation';
          }
        }

        newProgress.scene = finalScene;

        set({
          attributes: newAttributes,
          progress: newProgress,
          history: [...state.history, `选择了：${choice.text}`],
          backlashQueue: backlogQueue,
          chainRemaining,
          chainReturnScene,
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
          seed: null,
          backlashQueue: [],
          chainRemaining: 0,
          chainReturnScene: null,
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
          mental: '精神值',
          advisor: '导师关系',
          money: '金钱',
          peer_relations: '同门关系',
          pressure: '压力值',
          advisor_mood: '导师情绪',
          sleep_debt: '睡眠负债',
          health: '健康值',
          karma: '业力',
          rumor: '谣言值',
          kpi: 'KPI',
        };
        return labels[key];
      },
    }),
    {
      name: 'grad-school-simulator',
    }
  )
);
          if (state.progress.scene === 'sickness_event' && chainReturnScene) {
            newProgress.scene = chainReturnScene;
            chainReturnScene = null;
          }
