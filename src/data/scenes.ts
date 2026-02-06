import type { Scene } from '@/types/game';

export const scenes: Record<string, Scene> = {
  // ========== 初始场景 ==========
  welcome: {
    id: 'welcome',
    title: '欢迎',
    description: '欢迎来到读研模拟器！\n\n在这里，你将体验从入学到毕业的完整研究生生涯。\n面对各种经典场景，做出你的选择。\n\n请根据最真实的想法选择，不用担心 game over ❤️',
    emoji: '🎓',
    background: 'bg-dorm',
    choices: [
      {
        id: 'start',
        text: '开始我的研究生之旅',
        emoji: '🚀',
        effects: {},
        nextScene: 'character_creation',
      },
    ],
  },

  // ========== 角色创建 ==========
  character_creation: {
    id: 'character_creation',
    title: '新生入学登记',
    description: '请填写你的基本信息，这将影响你的初始属性。',
    emoji: '📝',
    background: 'bg-library',
    choices: [
      {
        id: 'create_male_top2_cs_push',
        text: 'TOP2本科，计算机专业，Push型导师',
        emoji: '👨‍💻',
        effects: {},
        nextScene: 'first_day',
      },
      {
        id: 'create_female_985_science_free',
        text: '985本科，理工科，放养型导师',
        emoji: '👩‍🔬',
        effects: {},
        nextScene: 'first_day',
      },
      {
        id: 'create_male_normal_industry',
        text: '普通211，经管专业，业界型导师',
        emoji: '👨‍💼',
        effects: {},
        nextScene: 'first_day',
      },
      {
        id: 'create_female_other_humanities_academic',
        text: '其他院校，人文社科，学术型导师',
        emoji: '👩‍🏫',
        effects: {},
        nextScene: 'first_day',
      },
    ],
  },

  // ========== 第一天 ==========
  first_day: {
    id: 'first_day',
    title: '入学第一天',
    description: '你拖着行李箱来到学校，办理了入住手续。看着陌生的校园，你心里既期待又忐忑。\n\n晚上，导师发来消息："明天下午来我办公室一趟，认识一下课题组。"',
    emoji: '🏫',
    background: 'bg-dorm',
    choices: [
      {
        id: 'prepare_well',
        text: '认真准备自我介绍，查阅导师的论文',
        emoji: '📚',
        effects: { academic: 5, mental: -5 },
        nextScene: 'first_meeting',
      },
      {
        id: 'relax',
        text: '先好好休息，明天随机应变',
        emoji: '😴',
        effects: { mental: 5, advisor: -5 },
        nextScene: 'first_meeting',
      },
      {
        id: 'ask_senior',
        text: '找学长学姐打听导师风格',
        emoji: '🔍',
        effects: { advisor: 5, mental: 5, peer_relations: 5 },
        nextScene: 'first_meeting',
      },
    ],
  },

  // ========== 第一次组会 ==========
  first_meeting: {
    id: 'first_meeting',
    title: '第一次组会',
    description: '这是你入学后的第一次组会。实验室里坐着十几个师兄师姐，导师让你介绍一下自己。\n\n轮到你时...',
    emoji: '🗣️',
    background: 'bg-lab',
    choices: [
      {
        id: 'honest',
        text: '坦诚地说自己还没想清楚研究方向',
        emoji: '😅',
        effects: { mental: 5, advisor: -5 },
        nextScene: 'topic_selection',
      },
      {
        id: 'bluff',
        text: '硬着头皮吹一个宏大的研究计划',
        emoji: '🎤',
        effects: { academic: -5, advisor: 5 },
        nextScene: 'topic_selection',
      },
      {
        id: 'prepared',
        text: '展示了提前准备的PPT，详细讲解',
        emoji: '📊',
        effects: { academic: 5, mental: -10, advisor: 10 },
        nextScene: 'topic_selection',
      },
    ],
  },

  // ========== 选题 ==========
  topic_selection: {
    id: 'topic_selection',
    title: '选题困境',
    description: '开学已经一个月了，导师问你："想好自己的研究方向了吗？"\n\n你其实还在迷茫中...',
    emoji: '🤔',
    background: 'bg-library',
    choices: [
      {
        id: 'follow_advisor',
        text: '选导师擅长的方向，稳妥毕业',
        emoji: '👨‍🏫',
        effects: { academic: 5, advisor: 10, mental: -5 },
        nextScene: 'strict_attendance',
      },
      {
        id: 'follow_interest',
        text: '选自己感兴趣但导师不熟的方向',
        emoji: '❤️',
        effects: { academic: -5, advisor: -10, mental: 10 },
        nextScene: 'strict_attendance',
      },
      {
        id: 'hot_topic',
        text: '选当前最热门的发论文方向',
        emoji: '🔥',
        effects: { academic: 10, mental: -10, money: -5 },
        nextScene: 'strict_attendance',
      },
    ],
  },

  // ========== 严格考勤制度 ==========
  strict_attendance: {
    id: 'strict_attendance',
    title: '实验室新规',
    description: '导师在群里发通知：\n\n"从下周开始实行严格考勤制度：\n• 每周工作6天（周一至周六）\n• 早上8:30-11:30，下午13:30-17:30，晚上18:30-22:30\n• 每天打卡6次，实验室安装摄像头监控\n• 无故缺勤扣发助研津贴"\n\n群里一片沉默...',
    emoji: '📹',
    background: 'bg-lab',
    choices: [
      {
        id: 'accept_rules',
        text: '默默接受，遵守规定',
        emoji: '😔',
        effects: { mental: -15, advisor: 5, money: -5 },
        nextScene: 'daily_routine_1',
      },
      {
        id: 'complain_peer',
        text: '私下和同门吐槽，抱团取暖',
        emoji: '💬',
        effects: { mental: 5, peer_relations: 10, advisor: -5 },
        nextScene: 'daily_routine_1',
      },
      {
        id: 'ask_exception',
        text: '找导师申请特殊情况（如身体原因）',
        emoji: '🙏',
        effects: { advisor: -10, mental: 5 },
        nextScene: 'daily_routine_1',
      },
      {
        id: 'report_rules',
        text: '向学院反映不合理考勤',
        emoji: '🧾',
        effects: { advisor: -15, mental: -5, peer_relations: -5 },
        nextScene: 'daily_routine_1',
      },
    ],
  },

  // ========== 折磨版：深夜打卡 ==========
  torture_checkin: {
    id: 'torture_checkin',
    title: '深夜打卡',
    description: '折磨版开始生效：实验室打卡系统升级为“人脸 + 随机抽查”。\n\n夜里 00:30，你收到群通知：\n“今晚临时抽查，30 分钟内未打卡视为缺勤。”\n\n你正在床上，眼睛已经睁不开了...',
    emoji: '🧾',
    background: 'bg-lab',
    choices: [
      {
        id: 'torture_run_back',
        text: '翻身起床冲回实验室打卡',
        emoji: '🏃',
        effects: { academic: 5, mental: -15, pressure: 15 },
        nextScene: 'daily_routine_1',
      },
      {
        id: 'torture_fake',
        text: '找同门代打卡（欠人情）',
        emoji: '🤝',
        effects: { peer_relations: -10, money: -5, pressure: 10 },
        nextScene: 'daily_routine_1',
      },
      {
        id: 'torture_sleep',
        text: '装睡，赌导师不会追究',
        emoji: '😴',
        effects: { advisor: -15, money: -10, pressure: 10 },
        nextScene: 'daily_routine_1',
      },
    ],
  },

  // ========== 日常场景1：看论文 ==========
  daily_routine_1: {
    id: 'daily_routine_1',
    title: '看论文的日常',
    description: '你已经看了三天论文了，这篇英文文献还是看不懂。\n\n下午组会导师可能会问进度...',
    emoji: '📄',
    background: 'bg-library',
    choices: [
      {
        id: 'keep_reading',
        text: '继续硬啃，查字典逐句翻译',
        emoji: '📖',
        effects: { academic: 10, mental: -10 },
        nextScene: 'group_meeting_1',
      },
      {
        id: 'ask_chatgpt',
        text: '用ChatGPT帮忙理解，提高效率',
        emoji: '🤖',
        effects: { academic: 5, mental: 5 },
        nextScene: 'group_meeting_1',
      },
      {
        id: 'ask_senior_paper',
        text: '找师兄师姐请教这篇论文',
        emoji: '👥',
        effects: { academic: 5, peer_relations: 5 },
        nextScene: 'group_meeting_1',
      },
    ],
  },

  // ========== 组会场景1 ==========
  group_meeting_1: {
    id: 'group_meeting_1',
    title: '周组会',
    description: '组会上，导师突然点名问你："这周看了几篇论文？有什么想法？"\n\n你其实只草草看了一篇...',
    emoji: '😰',
    background: 'bg-lab',
    choices: [
      {
        id: 'honest_progress',
        text: '如实汇报，承认进度慢',
        emoji: '😔',
        effects: { advisor: -5, mental: 5 },
        nextScene: 'tianlin_quiz',
      },
      {
        id: 'exaggerate',
        text: '稍微夸大一下，说看了3篇',
        emoji: '😏',
        effects: { advisor: 5, mental: -10 },
        nextScene: 'tianlin_quiz',
      },
      {
        id: 'divert',
        text: '转移话题，问导师一个技术问题',
        emoji: '🤓',
        effects: { academic: 5, advisor: 5 },
        nextScene: 'tianlin_quiz',
      },
    ],
  },

  // ========== 热搜问答 ==========
  tianlin_quiz: {
    id: 'tianlin_quiz',
    title: '热搜问答',
    description: '此时，网络热搜上有一个名字「天临元年」持续霸榜。\n\n你知道“天临元年”是哪一年吗？',
    emoji: '🔥',
    background: 'bg-lab',
    choices: [
      {
        id: 'tianlin_2017',
        text: '2017年',
        effects: { mental: -5 },
        nextScene: 'ending_withdrawal',
      },
      {
        id: 'tianlin_2018',
        text: '2018年',
        effects: { mental: -5 },
        nextScene: 'ending_withdrawal',
      },
      {
        id: 'tianlin_2019',
        text: '2019年',
        effects: { academic: 2 },
        nextScene: 'advisor_errands',
      },
      {
        id: 'tianlin_2020',
        text: '2020年',
        effects: { mental: -5 },
        nextScene: 'ending_withdrawal',
      },
    ],
  },

  // ========== 给老师做杂事 ==========
  advisor_errands: {
    id: 'advisor_errands',
    title: '导师的私事',
    description: '周五晚上，导师私聊你：\n\n"小王啊，明天周末有空吗？帮我个忙。我家要搬家，你来帮把手，顺便把几个快递取一下。对了，我孩子数学不太好，你有空的话帮忙辅导一下？"\n\n你本来计划周末赶进度的...',
    emoji: '📦',
    background: 'bg-dorm',
    choices: [
      {
        id: 'agree_all',
        text: '全部答应，导师的事最重要',
        emoji: '🙇',
        effects: { advisor: 15, mental: -10, academic: -10, money: -5 },
        nextScene: 'peer_competition',
      },
      {
        id: 'partial_agree',
        text: '答应搬家，但说没时间辅导',
        emoji: '🤷',
        effects: { advisor: 5, mental: -5, academic: -5 },
        nextScene: 'peer_competition',
      },
      {
        id: 'refuse_politely',
        text: '委婉拒绝，说周末要赶论文进度',
        emoji: '😅',
        effects: { advisor: -15, mental: 5, academic: 5 },
        nextScene: 'peer_competition',
      },
    ],
  },

  // ========== 同门竞争 ==========
  peer_competition: {
    id: 'peer_competition',
    title: '组内的暗流',
    description: '你发现实验室的同门小李经常在导师面前"无意"提起你的进度慢。\n\n更过分的是，他把你告诉他的研究想法，抢先做了出来，还在组会上汇报，导师夸他有想法。\n\n你气得手都在抖...',
    emoji: '😤',
    background: 'bg-lab',
    choices: [
      {
        id: 'confront_directly',
        text: '当场揭穿他，在组会上对质',
        emoji: '⚔️',
        effects: { peer_relations: -20, advisor: -10, mental: -10 },
        nextScene: 'bullying_senior',
      },
      {
        id: 'tell_advisor',
        text: '私下找导师说明情况',
        emoji: '📞',
        effects: { advisor: -5, peer_relations: -10, mental: -5 },
        nextScene: 'bullying_senior',
      },
      {
        id: 'form_alliance',
        text: '找其他被欺负的同门抱团',
        emoji: '🤝',
        effects: { peer_relations: 15, mental: 5 },
        nextScene: 'bullying_senior',
      },
      {
        id: 'swallow_anger',
        text: '忍气吞声，以后防着点',
        emoji: '😶',
        effects: { mental: -15, academic: 5 },
        nextScene: 'bullying_senior',
      },
    ],
  },

  // ========== 师兄师姐的霸凌 ==========
  bullying_senior: {
    id: 'bullying_senior',
    title: '实验室的"传统"',
    description: '实验室的博士师兄老王，仗着自己资历老，经常对你冷嘲热讽。\n\n今天你在调代码，他路过看了一眼："这么简单的问题搞了一周？我当年一天就搞定了。你这水平是怎么考上研的？"\n\n旁边几个师兄师姐在偷笑...',
    emoji: '🥶',
    background: 'bg-lab',
    choices: [
      {
        id: 'talk_back',
        text: '怼回去："您当年条件不一样"',
        emoji: '🔥',
        effects: { peer_relations: -15, mental: 5 },
        nextScene: 'experiment_1',
      },
      {
        id: 'stay_silent',
        text: '沉默不语，继续干活',
        emoji: '😶',
        effects: { mental: -10, peer_relations: -5 },
        nextScene: 'experiment_1',
      },
      {
        id: 'ask_help_humbly',
        text: '虚心请教："师兄能指点一下吗？"',
        emoji: '🙏',
        effects: { academic: 5, peer_relations: 5, mental: -5 },
        nextScene: 'experiment_1',
      },
      {
        id: 'complain_advisor',
        text: '向导师反映这个情况',
        emoji: '📢',
        effects: { advisor: -5, peer_relations: -20, mental: 5 },
        nextScene: 'experiment_1',
      },
    ],
  },

  // ========== 实验/代码场景1 ==========
  experiment_1: {
    id: 'experiment_1',
    title: '实验失败',
    description: '你的实验/代码已经跑了一周了，结果还是不对。\n\n深夜11点，实验室只剩你一个人。摄像头红灯还在一闪一闪...',
    emoji: '🔬',
    background: 'bg-lab',
    choices: [
      {
        id: 'stay_up',
        text: '继续熬夜调试，不信搞不定',
        emoji: '☕',
        effects: { academic: 5, mental: -15, money: -5 },
        nextScene: 'weekend_choice',
      },
      {
        id: 'go_sleep',
        text: '先回去睡觉，明天再说',
        emoji: '🛏️',
        effects: { mental: 10 },
        nextScene: 'weekend_choice',
      },
      {
        id: 'ask_help',
        text: '在群里问师兄师姐',
        emoji: '💬',
        effects: { academic: 5, peer_relations: 5 },
        nextScene: 'weekend_choice',
      },
    ],
  },

  // ========== 折磨版：凌晨消息 ==========
  torture_midnight: {
    id: 'torture_midnight',
    title: '凌晨消息',
    description: '折磨版开始生效：凌晨 02:17，导师发来语音：\n\n“明早 9 点我要看你们本周进度汇总，别拖。”\n\n你的眼睛酸痛，电脑还在跑。',
    emoji: '🌙',
    background: 'bg-lab',
    choices: [
      {
        id: 'torture_pull_allnighter',
        text: '硬扛到天亮，整理汇总',
        emoji: '☕',
        effects: { academic: 5, mental: -20, pressure: 15 },
        nextScene: 'weekend_choice',
      },
      {
        id: 'torture_quick_patch',
        text: '临时拼凑一份“能看”的汇报',
        emoji: '🧩',
        effects: { advisor: -5, mental: -10, pressure: 10 },
        nextScene: 'weekend_choice',
      },
      {
        id: 'torture_ignore',
        text: '假装没看到，先睡',
        emoji: '🙈',
        effects: { advisor: -20, pressure: 10 },
        nextScene: 'weekend_choice',
      },
    ],
  },

  // ========== 折磨版：实验室事故 ==========
  lab_incident: {
    id: 'lab_incident',
    title: '实验室事故',
    description: '你们组的服务器崩了，导师在群里点名要一个人负责。\n\n你知道不是你，但导师已经暗示“先有人出来扛”。',
    emoji: '🧯',
    background: 'bg-lab',
    choices: [
      {
        id: 'incident_take_blame',
        text: '认下责任，先稳住场面',
        emoji: '😶',
        effects: { advisor: 10, mental: -20, pressure: 15 },
        nextScene: 'internship_choice',
      },
      {
        id: 'incident_fight',
        text: '据理力争，要求查日志',
        emoji: '📑',
        effects: { advisor: -20, peer_relations: -10, pressure: 10 },
        nextScene: 'internship_choice',
      },
      {
        id: 'incident_shift',
        text: '私下协调，推给运维/师兄',
        emoji: '🌀',
        effects: { peer_relations: -15, mental: -10, pressure: 10 },
        nextScene: 'internship_choice',
      },
    ],
  },

  // ========== 周末选择 ==========
  weekend_choice: {
    id: 'weekend_choice',
    title: '周末到了',
    description: '终于到周日了！你已经连续工作13天了。\n\n室友约你出去玩，但你还有一堆事没做完...',
    emoji: '🎉',
    background: 'bg-dorm',
    choices: [
      {
        id: 'work_weekend',
        text: '继续干活，科研人没有周末',
        emoji: '💻',
        effects: { academic: 10, mental: -15 },
        nextScene: 'paper_rejection_1',
      },
      {
        id: 'go_out',
        text: '出去玩一天，劳逸结合',
        emoji: '🎮',
        effects: { mental: 15, money: -10, academic: -5 },
        nextScene: 'paper_rejection_1',
      },
      {
        id: 'sleep_weekend',
        text: '在宿舍睡两天',
        emoji: '😴',
        effects: { mental: 20, academic: -10 },
        nextScene: 'paper_rejection_1',
      },
    ],
  },

  // ========== 论文被拒 ==========
  paper_rejection_1: {
    id: 'paper_rejection_1',
    title: '论文被拒',
    description: '你投了三个月的论文被拒了。审稿人给了很尖锐的意见，说你"缺乏创新性"。\n\n导师说："改改再投吧。"\n\n同门小李"安慰"你："没事，我第一篇也被拒了，你现在才拒一篇，还好啦~"',
    emoji: '❌',
    background: 'bg-lab',
    choices: [
      {
        id: 'revise_resubmit',
        text: '认真修改，投一个低一点的会议',
        emoji: '🔧',
        effects: { academic: 5, mental: -10 },
        nextScene: 'theft_paper',
      },
      {
        id: 'argue_reviewers',
        text: '写反驳信， argue 审稿人',
        emoji: '📝',
        effects: { academic: -5, mental: -5, advisor: -5 },
        nextScene: 'theft_paper',
      },
      {
        id: 'sarcasm_back',
        text: '回怼小李："你拒了三篇当然觉得我好"',
        emoji: '😏',
        effects: { peer_relations: -10, mental: 5 },
        nextScene: 'theft_paper',
      },
    ],
  },

  // ========== 论文被抢走 ==========
  theft_paper: {
    id: 'theft_paper',
    title: '晴天霹雳',
    description: '你辛苦做了半年的实验，写了一半的论文，突然被导师叫去谈话。\n\n导师说："小王啊，你的这个方向小张（另一个同门）也在做，他进度快一些。这样吧，这个工作让他先投，你换个方向重新做。"\n\n你整个人都懵了...',
    emoji: '💔',
    background: 'bg-lab',
    choices: [
      {
        id: 'accept_unfair',
        text: '默默接受，重新开始',
        emoji: '😭',
        effects: { academic: -15, mental: -20, advisor: -10, peer_relations: -15 },
        nextScene: 'scholarship',
      },
      {
        id: 'argue_evidence',
        text: '据理力争，拿出实验记录证明是你先做的',
        emoji: '📊',
        effects: { advisor: -20, mental: -10, peer_relations: -20 },
        nextScene: 'scholarship',
      },
      {
        id: 'negotiate_coauthor',
        text: '请求挂共一作者',
        emoji: '🤝',
        effects: { advisor: -5, academic: -5, peer_relations: -10 },
        nextScene: 'scholarship',
      },
    ],
  },

  // ========== 奖学金 ==========
  scholarship: {
    id: 'scholarship',
    title: '奖学金评定',
    description: '一年一度的奖学金评定开始了。\n\n你发现自己和另一个同学分数差不多，但名额只有一个。\n\n你听说那个同学经常帮导师处理私事，还经常在朋友圈晒和导师的合影...',
    emoji: '💰',
    background: 'bg-library',
    choices: [
      {
        id: 'compete_fair',
        text: '凭实力竞争，不玩套路',
        emoji: '💪',
        effects: { mental: 5, money: -10 },
        nextScene: 'group_clique',
      },
      {
        id: 'ask_advisor',
        text: '找导师帮忙说句话',
        emoji: '🙏',
        effects: { advisor: -5, money: 10 },
        nextScene: 'group_clique',
      },
      {
        id: 'start_licking',
        text: '也开始"舔"导师，多帮做事',
        emoji: '👅',
        effects: { advisor: 10, money: 15, mental: -15, peer_relations: -10 },
        nextScene: 'group_clique',
      },
    ],
  },

  // ========== 小团体 ==========
  group_clique: {
    id: 'group_clique',
    title: '实验室政治',
    description: '你发现实验室已经分成了几个小团体：\n\n• 以博士老王为首的"元老派"，仗着资历欺负新人\n• 以小李为首的"舔狗派"，天天围着导师转\n• 几个和你一样的"苦力派"，被压榨但不敢反抗\n\n有人私下拉你加入他们的"反压迫联盟"...',
    emoji: '🏴‍☠️',
    background: 'bg-lab',
    choices: [
      {
        id: 'join_alliance',
        text: '加入"反压迫联盟"，抱团取暖',
        emoji: '🤝',
        effects: { peer_relations: 20, mental: 10, advisor: -10 },
        nextScene: 'relationship',
      },
      {
        id: 'stay_neutral',
        text: '保持中立，谁也不得罪',
        emoji: '😐',
        effects: { peer_relations: -5, mental: -5 },
        nextScene: 'relationship',
      },
      {
        id: 'join_lickers',
        text: '加入"舔狗派"，抱紧导师大腿',
        emoji: '👅',
        effects: { advisor: 15, peer_relations: -20, mental: -10 },
        nextScene: 'relationship',
      },
    ],
  },

  // ========== 感情生活 ==========
  relationship: {
    id: 'relationship',
    title: '感情状况',
    description: '实验室的师兄/师姐最近对你很关心，经常帮你解决问题。\n\n你感觉ta可能对你有好感...',
    emoji: '💕',
    background: 'bg-dorm',
    choices: [
      {
        id: 'pursue',
        text: '主动表白，实验室恋情我来了',
        emoji: '💘',
        effects: { mental: 15, academic: -5, peer_relations: 5 },
        nextScene: 'midterm',
      },
      {
        id: 'ignore',
        text: '装作不知道，科研第一',
        emoji: '🚫',
        effects: { academic: 5, mental: -5 },
        nextScene: 'midterm',
      },
      {
        id: 'ambiguous',
        text: '保持暧昧，享受被关心的感觉',
        emoji: '😏',
        effects: { mental: 10, academic: -10 },
        nextScene: 'midterm',
      },
    ],
  },

  // ========== 中期检查 ==========
  midterm: {
    id: 'midterm',
    title: '中期答辩',
    description: '转眼间到了中期检查。你的进度只完成了50%，导师看起来不太满意。\n\n答辩委员会问了一个你答不上来的问题...',
    emoji: '🎯',
    background: 'bg-lab',
    choices: [
      {
        id: 'admit',
        text: '承认准备不足，承诺加快进度',
        emoji: '😓',
        effects: { advisor: -10, mental: -5 },
        nextScene: 'advisor_delay',
      },
      {
        id: 'bluff_midterm',
        text: '硬着头皮瞎编，假装很懂',
        emoji: '🎭',
        effects: { academic: -10, advisor: -15 },
        nextScene: 'advisor_delay',
      },
      {
        id: 'ask_time',
        text: '请求延期，需要更多时间',
        emoji: '⏰',
        effects: { advisor: -5, mental: 10 },
        nextScene: 'advisor_delay',
      },
    ],
  },

  // ========== 导师拖着不改论文 ==========
  advisor_delay: {
    id: 'advisor_delay',
    title: '无尽的等待',
    description: '你把毕业论文初稿发给导师已经两个月了，一直没有回复。\n\n每次问，导师都说："最近太忙，过两天看。"\n\n你听说上一届有个师兄被拖了两年才毕业，你心里越来越慌...',
    emoji: '⏳',
    background: 'bg-lab',
    choices: [
      {
        id: 'keep_asking',
        text: '每周催一次，坚持不懈',
        emoji: '📞',
        effects: { advisor: -15, mental: -10 },
        nextScene: 'crisis',
      },
      {
        id: 'bribe_gift',
        text: '送点礼物，"表示表示"',
        emoji: '🎁',
        effects: { money: -20, advisor: 10, mental: -5 },
        nextScene: 'crisis',
      },
      {
        id: 'ask_senior_intervene',
        text: '请实验室元老帮忙说情',
        emoji: '🙏',
        effects: { peer_relations: -10, advisor: 5 },
        nextScene: 'crisis',
      },
      {
        id: 'wait_patiently',
        text: '继续等，相信导师',
        emoji: '🧘',
        effects: { mental: -5, academic: -5 },
        nextScene: 'crisis',
      },
    ],
  },

  // ========== 危机事件 ==========
  crisis: {
    id: 'crisis',
    title: '科研危机',
    description: '你的实验设备坏了/代码被误删了/数据丢失了！\n\n这可能是几个月的工作量...',
    emoji: '💥',
    background: 'bg-lab',
    choices: [
      {
        id: 'start_over',
        text: '从头再来，科研就是这样',
        emoji: '🔄',
        effects: { academic: -10, mental: -20 },
        nextScene: 'internship_choice',
      },
      {
        id: 'ask_advisor_help',
        text: '找导师求助，看有没有备份',
        emoji: '🆘',
        effects: { advisor: -10, academic: 5 },
        nextScene: 'internship_choice',
      },
      {
        id: 'take_break',
        text: '先休息一周，调整心情',
        emoji: '🏖️',
        effects: { mental: 15, academic: -15 },
        nextScene: 'internship_choice',
      },
      {
        id: 'blame_self',
        text: '主动背锅，承认是自己疏忽',
        emoji: '😶',
        effects: { advisor: 5, mental: -20, peer_relations: -5 },
        nextScene: 'internship_choice',
      },
    ],
  },

  // ========== 实习选择 ==========
  internship_choice: {
    id: 'internship_choice',
    title: '实习机会',
    description: '一家大厂给你发了实习offer，薪资很高。\n\n但导师说："毕业要紧，别去实习。"',
    emoji: '💼',
    background: 'bg-library',
    choices: [
      {
        id: 'take_internship',
        text: '偷偷去实习，赚钱要紧',
        emoji: '💰',
        effects: { money: 20, academic: -15, advisor: -15 },
        nextScene: 'thesis_writing',
      },
      {
        id: 'refuse',
        text: '听导师的，专心写论文',
        emoji: '📚',
        effects: { academic: 10, advisor: 10, money: -5 },
        nextScene: 'thesis_writing',
      },
      {
        id: 'negotiate',
        text: '和导师商量，远程实习',
        emoji: '🤝',
        effects: { money: 10, academic: -5, advisor: -5 },
        nextScene: 'thesis_writing',
      },
    ],
  },

  // ========== 写论文 ==========
  thesis_writing: {
    id: 'thesis_writing',
    title: '毕业论文',
    description: '终于到写毕业论文的时候了。你已经熬了三个通宵，但进度还是只有30%。\n\n距离提交只剩两周...',
    emoji: '📝',
    background: 'bg-lab',
    choices: [
      {
        id: 'all_nighter',
        text: '继续爆肝，每天睡4小时',
        emoji: '☕',
        effects: { academic: 15, mental: -25 },
        nextScene: 'blind_review',
      },
      {
        id: 'ask_gpt',
        text: '用AI辅助写作，提高效率',
        emoji: '🤖',
        effects: { academic: 5, mental: 5 },
        nextScene: 'blind_review',
      },
      {
        id: 'ask_advisor_review',
        text: '请导师帮忙看看，求指导',
        emoji: '🙏',
        effects: { advisor: -10, academic: 10 },
        nextScene: 'blind_review',
      },
    ],
  },

  // ========== 盲审 ==========
  blind_review: {
    id: 'blind_review',
    title: '论文盲审',
    description: '你的论文送出去盲审了。这是决定你能否毕业的关键时刻...\n\n两周后，结果回来了。',
    emoji: '📨',
    background: 'bg-library',
    choices: [
      {
        id: 'check_result',
        text: '查看盲审结果',
        emoji: '👀',
        effects: {},
        nextScene: 'blind_review_result',
      },
    ],
  },

  blind_review_result: {
    id: 'blind_review_result',
    title: '盲审结果',
    description: '盲审结果出来了！\n\n两位专家的意见：一位给了"优秀"，一位给了"合格"。\n\n你可以参加答辩了！',
    emoji: '🎉',
    background: 'bg-library',
    choices: [
      {
        id: 'prepare_defense',
        text: '准备最终答辩',
        emoji: '🎯',
        effects: { mental: 10 },
        nextScene: 'final_defense',
      },
    ],
  },

  // ========== 最终答辩 ==========
  final_defense: {
    id: 'final_defense',
    title: '毕业答辩',
    description: '这是你研究生生涯的最后一场答辩。\n\n答辩委员会坐在下面，你的导师也在。\n\n你深吸一口气，开始展示...',
    emoji: '🎓',
    background: 'bg-lab',
    choices: [
      {
        id: 'defense_confident',
        text: '自信满满，流畅完成答辩',
        emoji: '💪',
        effects: { academic: 10 },
        nextScene: 'ending_graduation',
      },
      {
        id: 'defense_nervous',
        text: '虽然紧张，但还算顺利',
        emoji: '😅',
        effects: { mental: -5 },
        nextScene: 'ending_graduation',
      },
      {
        id: 'defense_bad',
        text: '发挥失常，被问住了',
        emoji: '😰',
        effects: { academic: -5, mental: -10 },
        nextScene: 'ending_delay',
      },
    ],
  },

  // ========== 结局 ==========
  ending_graduation: {
    id: 'ending_graduation',
    title: '顺利毕业',
    description: '恭喜你！你顺利通过了答辩，拿到了硕士学位！\n\n回首这几年，有熬夜的辛苦，也有收获的喜悦。那些曾经的委屈和不平，都将成为你人生的养分。\n\n无论过程如何，你做到了。\n\n🎓 毕业快乐！',
    emoji: '🎊',
    background: 'bg-library',
    isEnd: true,
    endingType: 'graduation',
    choices: [
      {
        id: 'restart',
        text: '再玩一次',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_excellent: {
    id: 'ending_excellent',
    title: '优秀毕业',
    description: '太厉害了！你以优异的成绩毕业，还拿到了优秀毕业论文！\n\n导师推荐你去读博，大厂也给你发了offer。\n\n你的人生，由你选择。\n\n🏆 优秀毕业！',
    emoji: '🏆',
    background: 'bg-library',
    isEnd: true,
    endingType: 'excellent',
    choices: [
      {
        id: 'restart',
        text: '再玩一次',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_delay: {
    id: 'ending_delay',
    title: '延毕了...',
    description: '很遗憾，你的论文没有通过，需要延期毕业。\n\n但不要灰心，这只是暂时的挫折。\n\n调整状态，继续努力，你一定能毕业的！\n\n💪 加油！',
    emoji: '⏰',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'delay',
    choices: [
      {
        id: 'restart',
        text: '重新开始',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_dropout_mental: {
    id: 'ending_dropout_mental',
    title: '休学调整',
    description: '你的心理健康亮起了红灯，需要休学调整。\n\n记住，身体健康和心理健康永远是最重要的。\n\n调整好再出发，人生还有很多可能。\n\n❤️ 照顾好自己',
    emoji: '💚',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'dropout',
    choices: [
      {
        id: 'restart',
        text: '重新开始',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_burnout: {
    id: 'ending_burnout',
    title: '精神崩溃',
    description: '持续的高压把你彻底耗空。\n\n你开始失眠、记忆断片、对一切都失去兴趣。\n\n最终，你不得不停下，去修复被压垮的自己。\n\n🫥 精神崩溃',
    emoji: '🫥',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'burnout',
    choices: [
      {
        id: 'restart',
        text: '重新开始',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_kicked: {
    id: 'ending_kicked',
    title: '绩效清退',
    description: '多次绩效预警后，你被要求退出课题组。\n\n没有人会为你的缺口买单，系统只看指标。\n\n这不是终点，但它确实是一个沉重的落点。\n\n🧾 绩效清退',
    emoji: '🧾',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'kicked',
    choices: [
      {
        id: 'restart',
        text: '重新开始',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_withdrawal: {
    id: 'ending_withdrawal',
    title: '顺利肄业',
    description: '你对“天临元年”的回答让现场短暂沉默。\n\n最终，你决定提前结束这段研究生旅程，把精力留给更适合自己的方向。\n\n肄业不是失败，而是选择。换条路，人生仍然可以写出新章节。\n\n🎒 顺利肄业',
    emoji: '🎒',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'withdrawal',
    choices: [
      {
        id: 'restart',
        text: '重新开始',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },
};

// 获取随机日常场景
export const getRandomDailyScene = (): string => {
  const dailyScenes = [
    'daily_routine_1',
    'group_meeting_1',
    'experiment_1',
    'weekend_choice',
    'peer_competition',
    'bullying_senior',
  ];
  return dailyScenes[Math.floor(Math.random() * dailyScenes.length)];
};
