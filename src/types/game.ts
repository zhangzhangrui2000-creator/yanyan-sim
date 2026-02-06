// 游戏类型定义

export interface Attributes {
  academic: number;      // 学术能力
  mental: number;        // 精神值
  advisor: number;       // 导师关系
  money: number;         // 金钱
  peer_relations: number; // 同门关系
  pressure: number;      // 压力值
  advisor_mood: number;  // 导师情绪
  sleep_debt: number;    // 睡眠负债
  health: number;        // 健康值
  karma: number;         // 业力
  rumor: number;         // 谣言值
  kpi: number;           // KPI
}

export interface Character {
  name: string;
  gender: 'male' | 'female';
  background: string;  // 本科背景
  major: string;       // 专业方向
  advisorType: string; // 导师类型
}

export interface Progress {
  semester: number;    // 当前学期 (1-6)
  week: number;        // 当前周 (1-20)
  day: number;         // 总天数
  scene: string;       // 当前场景ID
  kpiWarnings: number; // 绩效预警次数
  eventCounter: number; // 事件计数器
}

export interface BacklashEvent {
  steps: number;       // 剩余步数
  severity: number;    // 反噬强度
  chain: number;       // 连锁次数
}

export interface Choice {
  id: string;
  text: string;
  emoji?: string;
  effects: Partial<Attributes>;
  nextScene: string;
  condition?: (attrs: Attributes) => boolean;
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  emoji?: string;
  background?: string;
  choices: Choice[];
  isEnd?: boolean;
  endingType?: 'graduation' | 'dropout' | 'delay' | 'excellent' | 'withdrawal' | 'burnout' | 'kicked' | 'eternal' | 'kpi_fail' | 'fake' | 'health' | 'bankrupt';
}

export type GameMode = 'normal' | 'torture';

export interface GameState {
  // 角色属性
  attributes: Attributes;
  
  // 游戏进度
  progress: Progress;
  
  // 角色信息
  character: Character | null;
  
  // 游戏状态
  isPlaying: boolean;
  isCharacterCreated: boolean;
  history: string[];  // 历史记录
  mode: GameMode;
  seed: string | null;
  backlashQueue: BacklashEvent[];
  chainRemaining: number;
  chainReturnScene: string | null;
  
  // 动作
  createCharacter: (character: Character) => void;
  makeChoice: (choice: Choice) => void;
  resetGame: () => void;
  setMode: (mode: GameMode) => void;
  getAttributeColor: (value: number) => string;
  getAttributeLabel: (key: keyof Attributes) => string;
}

// 导师类型
export const ADVISOR_TYPES = {
  push: {
    id: 'push',
    name: 'Push型导师',
    emoji: '👨‍🏫',
    description: '学术能力强，要求严格，push很紧',
    traits: ['学术大牛', '要求严格', '经常开会', '毕业快但压力大']
  },
  free: {
    id: 'free',
    name: '放养型导师',
    emoji: '🌿',
    description: '基本不管，自由度高，但指导很少',
    traits: ['完全自由', '很少见面', '自己摸索', '容易迷茫']
  },
  industry: {
    id: 'industry',
    name: '业界型导师',
    emoji: '💼',
    description: '项目很多，有钱但学术弱',
    traits: ['项目多', '工资高', '学术弱', '好找工作']
  },
  academic: {
    id: 'academic',
    name: '学术型导师',
    emoji: '📚',
    description: '论文要求高，出国机会多',
    traits: ['论文要求高', '出国机会多', '读博推荐', '延毕风险']
  }
};

// 本科背景
export const BACKGROUNDS = {
  top2: {
    id: 'top2',
    name: 'TOP2/清北',
    emoji: '🏆',
    description: '本科就是卷王'
  },
  c9: {
    id: 'c9',
    name: 'C9/985',
    emoji: '🎓',
    description: '名校出身，基础扎实'
  },
  normal: {
    id: 'normal',
    name: '普通211/一本',
    emoji: '📖',
    description: '普通本科，需要更努力'
  },
  other: {
    id: 'other',
    name: '其他院校',
    emoji: '💪',
    description: '逆袭选手，加油！'
  }
};

// 专业方向
export const MAJORS = {
  cs: {
    id: 'cs',
    name: '计算机/AI',
    emoji: '💻',
    description: '代码、论文、实习三手抓'
  },
  science: {
    id: 'science',
    name: '理工科',
    emoji: '🔬',
    description: '实验、数据、重复'
  },
  humanities: {
    id: 'humanities',
    name: '人文社科',
    emoji: '📜',
    description: '看书、写论文、田野调查'
  },
  business: {
    id: 'business',
    name: '经管商科',
    emoji: '📊',
    description: '模型、数据、案例分析'
  }
};
