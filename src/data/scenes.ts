import type { Scene } from '@/types/game';

export const scenes: Record<string, Scene> = {
  // ========== 初始场景 ==========
  welcome: {
    id: 'welcome',
    title: '欢迎',
    description: '欢迎来到读研模拟器！

在这里，你将体验从入学到毕业的完整研究生生涯。
面对各种经典场景，做出你的选择。

请根据最真实的想法选择，不用担心 game over ❤️

系统会把你的选择记得很清楚。',
    emoji: '🎓',
    background: 'bg-dorm',
    choices: [
      {
        id: 'start',
        text: '点火开局，进炼狱',
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
    description: '请填写你的基本信息，这将影响你的初始属性。

信息越完整，系统越好照顾你。',
    emoji: '📝',
    background: 'bg-library',
    choices: [
      {
        id: 'create_male_top2_cs_push',
        text: 'TOP2本科，计算机专业，Push型导师（开局就卷）',
        emoji: '👨‍💻',
        effects: {},
        nextScene: 'first_day',
      },
      {
        id: 'create_female_985_science_free',
        text: '985本科，理工科，放养型导师（自生自灭）',
        emoji: '👩‍🔬',
        effects: {},
        nextScene: 'first_day',
      },
      {
        id: 'create_male_normal_industry',
        text: '普通211，经管专业，业界型导师（换绩效换资源）',
        emoji: '👨‍💼',
        effects: {},
        nextScene: 'first_day',
      },
      {
        id: 'create_female_other_humanities_academic',
        text: '其他院校，人文社科，学术型导师（低配起跑）',
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
    description: '你拖着行李箱来到学校，办理了入住手续。校园很陌生，但流程很熟悉。

晚上，导师发来消息："明天下午来我办公室一趟，认识一下课题组。"

这类消息通常都没有备选项。',
    emoji: '🏫',
    background: 'bg-dorm',
    choices: [
      {
        id: 'prepare_well',
        text: '熬夜做自我介绍，先把自己包装好',
        emoji: '📚',
        effects: { academic: 5, mental: -5 },
        nextScene: 'first_meeting',
      },
      {
        id: 'relax',
        text: '先睡一觉，明天再被现实打醒',
        emoji: '😴',
        effects: { mental: 5, advisor: -5 },
        nextScene: 'first_meeting',
      },
      {
        id: 'ask_senior',
        text: '先打听导师脾气，别一脚踩雷',
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
    description: '这是你入学后的第一次组会。实验室里坐着十几个师兄师姐，导师让你介绍一下自己。

轮到你时...

第一印象往往会被复用很久。',
    emoji: '🗣️',
    background: 'bg-lab',
    choices: [
      {
        id: 'honest',
        text: '承认迷茫，等着被贴标签',
        emoji: '😅',
        effects: { mental: 5, advisor: -5 },
        nextScene: 'topic_selection',
      },
      {
        id: 'bluff',
        text: '吹个大饼，先混过这一关',
        emoji: '🎤',
        effects: { academic: -5, advisor: 5 },
        nextScene: 'topic_selection',
      },
      {
        id: 'prepared',
        text: '用PPT撑场面，先把导师哄住',
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
    description: '开学已经一个月了，导师问你："想好自己的研究方向了吗？"

你其实还在迷茫中...

答案会决定你以后怎么解释现在。',
    emoji: '🤔',
    background: 'bg-library',
    choices: [
      {
        id: 'follow_advisor',
        text: '走导师路线，稳妥但失去主权',
        emoji: '👨‍🏫',
        effects: { academic: 5, advisor: 10, mental: -5 },
        nextScene: 'strict_attendance',
      },
      {
        id: 'follow_interest',
        text: '走自己兴趣，换一条更难的路',
        emoji: '❤️',
        effects: { academic: -5, advisor: -10, mental: 10 },
        nextScene: 'strict_attendance',
      },
      {
        id: 'hot_topic',
        text: '追热点，拿指标但更卷',
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
    description: '导师在群里发通知：

"从下周开始实行严格考勤制度：
• 每周工作6天（周一至周六）
• 早上8:30-11:30，下午13:30-17:30，晚上18:30-22:30
• 每天打卡6次，实验室安装摄像头监控
• 无故缺勤扣发助研津贴"

群里很安静，好像大家都在读懂含义。',
    emoji: '📹',
    background: 'bg-lab',
    choices: [
      {
        id: 'accept_rules',
        text: '忍着吞下，别出头',
        emoji: '😔',
        effects: { mental: -15, advisor: 5, money: -5 },
        nextScene: 'daily_routine_1',
      },
      {
        id: 'complain_peer',
        text: '抱团吐槽，换点同门温度',
        emoji: '💬',
        effects: { mental: 5, peer_relations: 10, advisor: -5 },
        nextScene: 'daily_routine_1',
      },
      {
        id: 'ask_exception',
        text: '硬着头皮要例外',
        emoji: '🙏',
        effects: { advisor: -10, mental: 5 },
        nextScene: 'daily_routine_1',
      },
      {
        id: 'report_rules',
        text: '向上举报，赌一把后果',
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
    description: '折磨版开始生效：实验室打卡系统升级为“人脸 + 随机抽查”。

夜里 00:30，你收到群通知：
"今晚临时抽查，30 分钟内未打卡视为缺勤。"

你在床上，知道这条消息不会只是一条消息。',
    emoji: '🧾',
    background: 'bg-lab',
    choices: [
      {
        id: 'torture_run_back',
        text: '半夜爬起来去打卡',
        emoji: '🏃',
        effects: { academic: 5, mental: -15, pressure: 15 },
        nextScene: 'daily_routine_1',
      },
      {
        id: 'torture_fake',
        text: '求人代打，欠人情',
        emoji: '🤝',
        effects: { peer_relations: -10, money: -5, pressure: 10 },
        nextScene: 'daily_routine_1',
      },
      {
        id: 'torture_sleep',
        text: '装死不去，赌系统瞎',
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
    description: '你已经看了三天论文了，这篇英文文献还是看不懂。

下午组会导师可能会问进度...

你开始熟悉‘看过了’这三个字的用途。',
    emoji: '📄',
    background: 'bg-library',
    choices: [
      {
        id: 'keep_reading',
        text: '硬啃英文，慢慢磨',
        emoji: '📖',
        effects: { academic: 10, mental: -10 },
        nextScene: 'group_meeting_1',
      },
      {
        id: 'ask_chatgpt',
        text: '用AI速读，赌不被抓',
        emoji: '🤖',
        effects: { academic: 5, mental: 5 },
        nextScene: 'group_meeting_1',
      },
      {
        id: 'ask_senior_paper',
        text: '求师兄讲解，换人情',
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
    description: '组会上，导师突然点名问你："这周看了几篇论文？有什么想法？"

你其实只草草看了一篇...

回答之后，后面的路会更顺或更直。',
    emoji: '😰',
    background: 'bg-lab',
    choices: [
      {
        id: 'honest_progress',
        text: '如实承认，等着被盯',
        emoji: '😔',
        effects: { advisor: -5, mental: 5 },
        nextScene: 'tianlin_quiz',
      },
      {
        id: 'exaggerate',
        text: '小谎换面子',
        emoji: '😏',
        effects: { advisor: 5, mental: -10 },
        nextScene: 'tianlin_quiz',
      },
      {
        id: 'divert',
        text: '甩个技术问题转移火力',
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
    description: '此时，网络热搜上有一个名字「天临元年」持续霸榜。

你知道“天临元年”是哪一年吗？

问题听起来很随意，但答案会留下记录。',
    emoji: '🔥',
    background: 'bg-lab',
    choices: [
      {
        id: 'tianlin_2017',
        text: '2017年（靠运气蒙）',
        effects: { mental: -5 },
        nextScene: 'ending_withdrawal',
      },
      {
        id: 'tianlin_2018',
        text: '2018年（瞎猜）',
        effects: { mental: -5 },
        nextScene: 'ending_withdrawal',
      },
      {
        id: 'tianlin_2019',
        text: '2019年（正解）',
        effects: { academic: 2 },
        nextScene: 'advisor_errands',
      },
      {
        id: 'tianlin_2020',
        text: '2020年（偏离现实）',
        effects: { mental: -5 },
        nextScene: 'ending_withdrawal',
      },
    ],
  },

  // ========== 给老师做杂事 ==========
  advisor_errands: {
    id: 'advisor_errands',
    title: '导师的私事',
    description: '周五晚上，导师私聊你：

"小王啊，明天周末有空吗？帮我个忙。我家要搬家，你来帮把手，顺便把几个快递取一下。对了，我孩子数学不太好，你有空的话帮忙辅导一下？"

你本来计划周末赶进度的。

有些请求从来不写进合同。',
    emoji: '📦',
    background: 'bg-dorm',
    choices: [
      {
        id: 'agree_all',
        text: '全都答应，换一线好感',
        emoji: '🙇',
        effects: { advisor: 15, mental: -10, academic: -10, money: -5 },
        nextScene: 'peer_competition',
      },
      {
        id: 'partial_agree',
        text: '只答应搬家，划清界线',
        emoji: '🤷',
        effects: { advisor: 5, mental: -5, academic: -5 },
        nextScene: 'peer_competition',
      },
      {
        id: 'refuse_politely',
        text: '拒绝，准备被记账',
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
    description: '你发现实验室的同门小李经常在导师面前"无意"提起你的进度慢。

更过分的是，他把你告诉他的研究想法，抢先做了出来，还在组会上汇报，导师夸他有想法。

你意识到有些内容一旦说出口，就不再属于你。',
    emoji: '😤',
    background: 'bg-lab',
    choices: [
      {
        id: 'confront_directly',
        text: '当场撕破脸',
        emoji: '⚔️',
        effects: { peer_relations: -20, advisor: -10, mental: -10 },
        nextScene: 'bullying_senior',
      },
      {
        id: 'tell_advisor',
        text: '找导师告状，赌他站你',
        emoji: '📞',
        effects: { advisor: -5, peer_relations: -10, mental: -5 },
        nextScene: 'bullying_senior',
      },
      {
        id: 'form_alliance',
        text: '拉同门结盟',
        emoji: '🤝',
        effects: { peer_relations: 15, mental: 5 },
        nextScene: 'bullying_senior',
      },
      {
        id: 'swallow_anger',
        text: '咽下去，暗自防人',
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
    description: '实验室的博士师兄老王，仗着自己资历老，经常对你冷嘲热讽。

今天你在调代码，他路过看了一眼："这么简单的问题搞了一周？我当年一天就搞定了。你这水平是怎么考上研的？"

旁边几个师兄师姐在偷笑。

笑声里通常没人负责。',
    emoji: '🥶',
    background: 'bg-lab',
    choices: [
      {
        id: 'talk_back',
        text: '怼回去，硬碰硬',
        emoji: '🔥',
        effects: { peer_relations: -15, mental: 5 },
        nextScene: 'experiment_1',
      },
      {
        id: 'stay_silent',
        text: '沉默，继续当工具人',
        emoji: '😶',
        effects: { mental: -10, peer_relations: -5 },
        nextScene: 'experiment_1',
      },
      {
        id: 'ask_help_humbly',
        text: '装谦虚，讨口饭吃',
        emoji: '🙏',
        effects: { academic: 5, peer_relations: 5, mental: -5 },
        nextScene: 'experiment_1',
      },
      {
        id: 'complain_advisor',
        text: '找导师说理，赌他管不管',
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
    description: '你的实验/代码已经跑了一周了，结果还是不对。

深夜11点，实验室只剩你一个人。摄像头红灯还在一闪一闪...

你开始习惯只有自己在看进度条。',
    emoji: '🔬',
    background: 'bg-lab',
    choices: [
      {
        id: 'stay_up',
        text: '熬到天亮，死磕',
        emoji: '☕',
        effects: { academic: 5, mental: -15, money: -5 },
        nextScene: 'weekend_choice',
      },
      {
        id: 'go_sleep',
        text: '先睡，实验先放着',
        emoji: '🛏️',
        effects: { mental: 10 },
        nextScene: 'weekend_choice',
      },
      {
        id: 'ask_help',
        text: '群里求助，面子归零',
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
    description: '折磨版开始生效：凌晨 02:17，导师发来语音：

"明早 9 点我要看你们本周进度汇总，别拖。"

你的眼睛酸痛，电脑还在跑。

这类消息通常只需要确认收到。',
    emoji: '🌙',
    background: 'bg-lab',
    choices: [
      {
        id: 'torture_pull_allnighter',
        text: '通宵拼汇报',
        emoji: '☕',
        effects: { academic: 5, mental: -20, pressure: 15 },
        nextScene: 'weekend_choice',
      },
      {
        id: 'torture_quick_patch',
        text: '拼一份能糊弄的',
        emoji: '🧩',
        effects: { advisor: -5, mental: -10, pressure: 10 },
        nextScene: 'weekend_choice',
      },
      {
        id: 'torture_ignore',
        text: '装没看到，先保命',
        emoji: '🙈',
        effects: { advisor: -20, pressure: 10 },
        nextScene: 'weekend_choice',
      },
    ],
  },

  // ========== 折磨版：连锁反噬 ==========
  backlash_chain: {
    id: 'backlash_chain',
    title: '连锁反噬',
    description: '你本以为事情会过去，但新的麻烦接踵而至。

系统在悄悄加码，你只能继续往前走。

每一次应对都会留下下次的理由。',
    emoji: '🧨',
    background: 'bg-lab',
    choices: [
      {
        id: 'backlash_continue',
        text: '继续扛，下一个雷等着',
        emoji: '😵',
        effects: {},
        nextScene: 'backlash_chain',
      },
    ],
  },

  // ========== 折磨版：生病事件 ==========
  sickness_event: {
    id: 'sickness_event',
    title: '生病了',
    description: '你开始持续性头痛、发烧，精神难以集中。

实验室还有一堆事等着你处理。

症状可以请假，进度不会。',
    emoji: '🩺',
    background: 'bg-dorm',
    choices: [
      {
        id: 'sick_push',
        text: '带病硬扛',
        emoji: '🥵',
        effects: { mental: -10, health: -10, pressure: 10 },
        nextScene: 'daily_routine_1',
      },
      {
        id: 'sick_leave',
        text: '请假看病，账单自己扛',
        emoji: '🏥',
        effects: { money: -300, health: 10, advisor: -5 },
        nextScene: 'daily_routine_1',
      },
    ],
  },

  // ========== 折磨版：实验室事故 ==========
  lab_incident: {
    id: 'lab_incident',
    title: '实验室事故',
    description: '你们组的服务器崩了，导师在群里点名要一个人负责。

你知道不是你，但导师已经暗示“先有人出来扛”。

问题需要答案，责任也需要名字。',
    emoji: '🧯',
    background: 'bg-lab',
    choices: [
      {
        id: 'incident_take_blame',
        text: '先背锅，保住位置',
        emoji: '😶',
        effects: { advisor: 10, mental: -20, pressure: 15 },
        nextScene: 'internship_choice',
      },
      {
        id: 'incident_fight',
        text: '据理力争，赌不被穿小鞋',
        emoji: '📑',
        effects: { advisor: -20, peer_relations: -10, pressure: 10 },
        nextScene: 'internship_choice',
      },
      {
        id: 'incident_shift',
        text: '把锅推走，换一身黑',
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
    description: '终于到周日了！你已经连续工作13天了。

室友约你出去玩，但你还有一堆事没做完。

休息是一种会被记住的选择。',
    emoji: '🎉',
    background: 'bg-dorm',
    choices: [
      {
        id: 'work_weekend',
        text: '继续干，周末不存在',
        emoji: '💻',
        effects: { academic: 10, mental: -15 },
        nextScene: 'paper_rejection_1',
      },
      {
        id: 'go_out',
        text: '出去玩一晚，第二天加倍还',
        emoji: '🎮',
        effects: { mental: 15, money: -10, academic: -5 },
        nextScene: 'paper_rejection_1',
      },
      {
        id: 'sleep_weekend',
        text: '睡两天，进度作废',
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
    description: '你投了三个月的论文被拒了。审稿人给了很尖锐的意见，说你"缺乏创新性"。

导师说："改改再投吧。"

同门小李"安慰"你："没事，我第一篇也被拒了，你现在才拒一篇，还好啦~"

这句话听多了就会变得很轻。',
    emoji: '❌',
    background: 'bg-lab',
    choices: [
      {
        id: 'revise_resubmit',
        text: '继续改投，拖命',
        emoji: '🔧',
        effects: { academic: 5, mental: -10 },
        nextScene: 'theft_paper',
      },
      {
        id: 'argue_reviewers',
        text: '硬刚审稿人',
        emoji: '📝',
        effects: { academic: -5, mental: -5, advisor: -5 },
        nextScene: 'theft_paper',
      },
      {
        id: 'sarcasm_back',
        text: '回怼同门，彻底翻脸',
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
    description: '你辛苦做了半年的实验，写了一半的论文，突然被导师叫去谈话。

导师说："小王啊，你的这个方向小张（另一个同门）也在做，他进度快一些。这样吧，这个工作让他先投，你换个方向重新做。"

你整个人都懵了。

有人负责进度，也有人负责接受。',
    emoji: '💔',
    background: 'bg-lab',
    choices: [
      {
        id: 'accept_unfair',
        text: '忍着重来',
        emoji: '😭',
        effects: { academic: -15, mental: -20, advisor: -10, peer_relations: -15 },
        nextScene: 'scholarship',
      },
      {
        id: 'argue_evidence',
        text: '死磕到底',
        emoji: '📊',
        effects: { advisor: -20, mental: -10, peer_relations: -20 },
        nextScene: 'scholarship',
      },
      {
        id: 'negotiate_coauthor',
        text: '讨个共一，换条活路',
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
    description: '一年一度的奖学金评定开始了。

你发现自己和另一个同学分数差不多，但名额只有一个。

你听说那个同学经常帮导师处理私事，还经常在朋友圈晒和导师的合影。

你开始明白评分表外还有一套算法。',
    emoji: '💰',
    background: 'bg-library',
    choices: [
      {
        id: 'compete_fair',
        text: '硬拼实力，赌公平',
        emoji: '💪',
        effects: { mental: 5, money: -10 },
        nextScene: 'group_clique',
      },
      {
        id: 'ask_advisor',
        text: '求导师说话，欠人情',
        emoji: '🙏',
        effects: { advisor: -5, money: 10 },
        nextScene: 'group_clique',
      },
      {
        id: 'start_licking',
        text: '开始跪舔，换指标',
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
    description: '你发现实验室已经分成了几个小团体：

• 以博士老王为首的"元老派"，仗着资历欺负新人
• 以小李为首的"舔狗派"，天天围着导师转
• 几个和你一样的"苦力派"，被压榨但不敢反抗

有人私下拉你加入他们的"反压迫联盟"。

联盟听起来像避风港，也可能是另一种名册。',
    emoji: '🏴‍☠️',
    background: 'bg-lab',
    choices: [
      {
        id: 'join_alliance',
        text: '进反压迫联盟，赌不被清算',
        emoji: '🤝',
        effects: { peer_relations: 20, mental: 10, advisor: -10 },
        nextScene: 'relationship',
      },
      {
        id: 'stay_neutral',
        text: '中立苟住',
        emoji: '😐',
        effects: { peer_relations: -5, mental: -5 },
        nextScene: 'relationship',
      },
      {
        id: 'join_lickers',
        text: '抱导师大腿保命',
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
    description: '实验室的师兄/师姐最近对你很关心，经常帮你解决问题。

你感觉ta可能对你有好感。

关系的走向，往往会影响工作量的分配。',
    emoji: '💕',
    background: 'bg-dorm',
    choices: [
      {
        id: 'pursue',
        text: '谈恋爱，赌不翻车',
        emoji: '💘',
        effects: { mental: 15, academic: -5, peer_relations: 5 },
        nextScene: 'midterm',
      },
      {
        id: 'ignore',
        text: '断情绝爱，专心苟',
        emoji: '🚫',
        effects: { academic: 5, mental: -5 },
        nextScene: 'midterm',
      },
      {
        id: 'ambiguous',
        text: '暧昧续命',
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
    description: '转眼间到了中期检查。你的进度只完成了50%，导师看起来不太满意。

答辩委员会问了一个你答不上来的问题。

这类问题通常没有第二次。',
    emoji: '🎯',
    background: 'bg-lab',
    choices: [
      {
        id: 'admit',
        text: '承认不足，准备背锅',
        emoji: '😓',
        effects: { advisor: -10, mental: -5 },
        nextScene: 'advisor_delay',
      },
      {
        id: 'bluff_midterm',
        text: '硬编到底',
        emoji: '🎭',
        effects: { academic: -10, advisor: -15 },
        nextScene: 'advisor_delay',
      },
      {
        id: 'ask_time',
        text: '开口延期，先活着',
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
    description: '你把毕业论文初稿发给导师已经两个月了，一直没有回复。

每次问，导师都说："最近太忙，过两天看。"

你听说上一届有个师兄被拖了两年才毕业，你心里越来越慌。

等待是一种很有效的管理方式。',
    emoji: '⏳',
    background: 'bg-lab',
    choices: [
      {
        id: 'keep_asking',
        text: '每周催一次，逼到他烦',
        emoji: '📞',
        effects: { advisor: -15, mental: -10 },
        nextScene: 'crisis',
      },
      {
        id: 'bribe_gift',
        text: '送礼换进度',
        emoji: '🎁',
        effects: { money: -20, advisor: 10, mental: -5 },
        nextScene: 'crisis',
      },
      {
        id: 'ask_senior_intervene',
        text: '求元老出面，换一个台阶',
        emoji: '🙏',
        effects: { peer_relations: -10, advisor: 5 },
        nextScene: 'crisis',
      },
      {
        id: 'wait_patiently',
        text: '继续等，赌他良心',
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
    description: '你的实验设备坏了/代码被误删了/数据丢失了！

这可能是几个月的工作量。

事故不会写进排期，但会改掉排期。',
    emoji: '💥',
    background: 'bg-lab',
    choices: [
      {
        id: 'start_over',
        text: '重来，接受清零',
        emoji: '🔄',
        effects: { academic: -10, mental: -20 },
        nextScene: 'internship_choice',
      },
      {
        id: 'ask_advisor_help',
        text: '求导师救命',
        emoji: '🆘',
        effects: { advisor: -10, academic: 5 },
        nextScene: 'internship_choice',
      },
      {
        id: 'take_break',
        text: '停一周，后果自负',
        emoji: '🏖️',
        effects: { mental: 15, academic: -15 },
        nextScene: 'internship_choice',
      },
      {
        id: 'blame_self',
        text: '自己背锅，先保平安',
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
    description: '一家大厂给你发了实习offer，薪资很高。

但导师说："毕业要紧，别去实习。"

有些机会来得正好，也走得很快。',
    emoji: '💼',
    background: 'bg-library',
    choices: [
      {
        id: 'take_internship',
        text: '偷偷实习，赚快钱',
        emoji: '💰',
        effects: { money: 20, academic: -15, advisor: -15 },
        nextScene: 'thesis_writing',
      },
      {
        id: 'refuse',
        text: '听导师的，继续锁死',
        emoji: '📚',
        effects: { academic: 10, advisor: 10, money: -5 },
        nextScene: 'thesis_writing',
      },
      {
        id: 'negotiate',
        text: '谈远程，赌他放行',
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
    description: '终于到写毕业论文的时候了。你已经熬了三个通宵，但进度还是只有30%。

距离提交只剩两周。

你开始学会把时间当作对手。',
    emoji: '📝',
    background: 'bg-lab',
    choices: [
      {
        id: 'all_nighter',
        text: '爆肝到麻木',
        emoji: '☕',
        effects: { academic: 15, mental: -25 },
        nextScene: 'blind_review',
      },
      {
        id: 'ask_gpt',
        text: '用AI抄捷径',
        emoji: '🤖',
        effects: { academic: 5, mental: 5 },
        nextScene: 'blind_review',
      },
      {
        id: 'ask_advisor_review',
        text: '求导师看稿，赌他回你',
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
    description: '你的论文送出去盲审了。这是决定你能否毕业的关键时刻...

两周后，结果回来了。

等待会放大每一个猜测。',
    emoji: '📨',
    background: 'bg-library',
    choices: [
      {
        id: 'check_result',
        text: '打开盲审结果',
        emoji: '👀',
        effects: {},
        nextScene: 'blind_review_result',
      },
    ],
  },

  blind_review_result: {
    id: 'blind_review_result',
    title: '盲审结果',
    description: '盲审结果出来了！

两位专家的意见：一位给了"优秀"，一位给了"合格"。

你可以参加答辩了。

‘可以’不是‘一定’。',
    emoji: '🎉',
    background: 'bg-library',
    choices: [
      {
        id: 'prepare_defense',
        text: '准备答辩，赌命',
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
    description: '这是你研究生生涯的最后一场答辩。

答辩委员会坐在下面，你的导师也在。

你深吸一口气，开始展示。

每句话都要听起来像定稿。',
    emoji: '🎓',
    background: 'bg-lab',
    choices: [
      {
        id: 'defense_confident',
        text: '硬着头皮一口气讲完',
        emoji: '💪',
        effects: { academic: 10 },
        nextScene: 'ending_graduation',
      },
      {
        id: 'defense_nervous',
        text: '勉强讲完',
        emoji: '😅',
        effects: { mental: -5 },
        nextScene: 'ending_graduation',
      },
      {
        id: 'defense_bad',
        text: '翻车，被问到沉默',
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
    description: '恭喜你！你顺利通过了答辩，拿到了硕士学位！

回首这几年，有熬夜的辛苦，也有收获的喜悦。那些曾经的委屈和不平，都将成为你人生的养分。

无论过程如何，你做到了。

🎓 毕业快乐！',
    emoji: '🎊',
    background: 'bg-library',
    isEnd: true,
    endingType: 'graduation',
    choices: [
      {
        id: 'restart',
        text: '再来一遍，看看能不能活',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_excellent: {
    id: 'ending_excellent',
    title: '优秀毕业',
    description: '太厉害了！你以优异的成绩毕业，还拿到了优秀毕业论文！

导师推荐你去读博，大厂也给你发了offer。

你的人生，由你选择。

🏆 优秀毕业！',
    emoji: '🏆',
    background: 'bg-library',
    isEnd: true,
    endingType: 'excellent',
    choices: [
      {
        id: 'restart',
        text: '再来一遍，看看能不能活',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_delay: {
    id: 'ending_delay',
    title: '延毕了...',
    description: '很遗憾，你的论文没有通过，需要延期毕业。

但不要灰心，这只是暂时的挫折。

调整状态，继续努力，你一定能毕业的！

💪 加油！',
    emoji: '⏰',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'delay',
    choices: [
      {
        id: 'restart',
        text: '重开一局，别抱幻想',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_dropout_mental: {
    id: 'ending_dropout_mental',
    title: '休学调整',
    description: '你的心理健康亮起了红灯，需要休学调整。

记住，身体健康和心理健康永远是最重要的。

调整好再出发，人生还有很多可能。

❤️ 照顾好自己',
    emoji: '💚',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'dropout',
    choices: [
      {
        id: 'restart',
        text: '重开一局，别抱幻想',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_health: {
    id: 'ending_health',
    title: '健康崩溃',
    description: '长期透支让你的身体亮起红灯。

你被迫暂停学业，开始系统治疗与恢复。

🩺 健康崩溃',
    emoji: '🩺',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'health',
    choices: [
      {
        id: 'restart',
        text: '重开一局，别抱幻想',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_bankrupt: {
    id: 'ending_bankrupt',
    title: '破产退学',
    description: '开销失控，补助断供，你的账户变成负数。

现实压力逼得你退出这场游戏。

💸 破产退学',
    emoji: '💸',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'bankrupt',
    choices: [
      {
        id: 'restart',
        text: '重开一局，别抱幻想',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_burnout: {
    id: 'ending_burnout',
    title: '精神崩溃',
    description: '持续的高压把你彻底耗空。

你开始失眠、记忆断片、对一切都失去兴趣。

最终，你不得不停下，去修复被压垮的自己。

🫥 精神崩溃',
    emoji: '🫥',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'burnout',
    choices: [
      {
        id: 'restart',
        text: '重开一局，别抱幻想',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_kpi_fail: {
    id: 'ending_kpi_fail',
    title: 'KPI肄业',
    description: '指标长期下滑，你被迫提前退出研究生旅程。

这不是能力问题，而是系统的统计口径。

📉 KPI肄业',
    emoji: '📉',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'kpi_fail',
    choices: [
      {
        id: 'restart',
        text: '重开一局，别抱幻想',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_eternal_delay: {
    id: 'ending_eternal_delay',
    title: '永延毕',
    description: '你始终差一点点达标。

一年又一年，论文一改再改，答辩一次次推迟。

♾️ 永延毕',
    emoji: '♾️',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'eternal',
    choices: [
      {
        id: 'restart',
        text: '重开一局，别抱幻想',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_fake_graduation: {
    id: 'ending_fake_graduation',
    title: '伪毕业',
    description: '你“顺利毕业”了，但导师的黑历史突然曝光，你的名字被牵连。

找工作屡屡受挫，现实比毕业证更难。

🎭 伪毕业',
    emoji: '🎭',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'fake',
    choices: [
      {
        id: 'restart',
        text: '重开一局，别抱幻想',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_kicked: {
    id: 'ending_kicked',
    title: '绩效清退',
    description: '多次绩效预警后，你被要求退出课题组。

没有人会为你的缺口买单，系统只看指标。

这不是终点，但它确实是一个沉重的落点。

🧾 绩效清退',
    emoji: '🧾',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'kicked',
    choices: [
      {
        id: 'restart',
        text: '重开一局，别抱幻想',
        emoji: '🔄',
        effects: {},
        nextScene: 'welcome',
      },
    ],
  },

  ending_withdrawal: {
    id: 'ending_withdrawal',
    title: '顺利肄业',
    description: '你对“天临元年”的回答让现场短暂沉默。

最终，你决定提前结束这段研究生旅程，把精力留给更适合自己的方向。

肄业不是失败，而是选择。换条路，人生仍然可以写出新章节。

🎒 顺利肄业',
    emoji: '🎒',
    background: 'bg-dorm',
    isEnd: true,
    endingType: 'withdrawal',
    choices: [
      {
        id: 'restart',
        text: '重开一局，别抱幻想',
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