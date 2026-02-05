import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Win95Window } from './Win95Window';
import { Win95Button } from './Win95Button';
import { RestartButton } from './RestartButton';
import { AttributeBar } from './AttributeBar';
import { TypewriterText } from './TypewriterText';
import { useGameStore } from '@/store/gameStore';
import { scenes } from '@/data/scenes';
import { BACKGROUNDS, MAJORS, ADVISOR_TYPES } from '@/types/game';

export const GameScene: React.FC = () => {
  const { 
    attributes, 
    progress, 
    makeChoice, 
    getAttributeLabel,
    character,
  } = useGameStore();

  const [showChoices, setShowChoices] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [shareImageUrl, setShareImageUrl] = useState<string | null>(null);
  const [isGeneratingShare, setIsGeneratingShare] = useState(false);

  const currentScene = scenes[progress.scene];
  const isEnding = Boolean(currentScene?.isEnd);

  useEffect(() => {
    setShowChoices(false);
    setTypingComplete(false);
  }, [progress.scene]);

  const handleChoice = (choice: typeof currentScene.choices[0]) => {
    makeChoice(choice);
  };

  const handleTypingComplete = () => {
    setTypingComplete(true);
    setTimeout(() => setShowChoices(true), 300);
  };

  const getEndingLabel = (endingType?: string) => {
    switch (endingType) {
      case 'excellent':
        return '优秀毕业';
      case 'graduation':
        return '顺利毕业';
      case 'delay':
        return '延期毕业';
      case 'dropout':
        return '休学调整';
      case 'withdrawal':
        return '顺利肄业';
      default:
        return '读研旅程';
    }
  };

  const getEndingTagline = (endingType?: string) => {
    switch (endingType) {
      case 'excellent':
        return '毕业即高光';
      case 'graduation':
        return '稳稳拿到学位';
      case 'delay':
        return '慢一点，也在前进';
      case 'dropout':
        return '照顾好自己，未来可期';
      case 'withdrawal':
        return '及时止损，换个剧本';
      default:
        return '每一步都算数';
    }
  };

  const buildAchievementList = (endingType?: string) => {
    const research = (value: number) => {
      if (value >= 90) return '论文成果：CCF-A/顶会 1-2 篇或 SCI 一区 1 篇';
      if (value >= 80) return '论文成果：CCF-B/核心期刊 1-2 篇';
      if (value >= 65) return '论文成果：有稳定投稿，Workshop/会议报告';
      if (value >= 50) return '论文成果：初稿完成，仍在反复打磨';
      return '论文成果：方向多次调整，产出受限';
    };

    const academicImpact = (value: number) => {
      if (value >= 85) return '学术影响：有引用/代码开源/数据集沉淀';
      if (value >= 70) return '学术影响：实验可复现，有清晰技术路线';
      if (value >= 55) return '学术影响：完成关键实验，仍待完善';
      return '学术影响：进展断续，仍在建立方法体系';
    };

    const projectsAndContests = (value: number) => {
      if (value >= 85) return '项目/竞赛：省部级项目或竞赛获奖';
      if (value >= 70) return '项目/竞赛：参与实验室重点项目';
      if (value >= 55) return '项目/竞赛：完成小型课题/课程项目';
      return '项目/竞赛：参与有限，更多在积累阶段';
    };

    const mentorship = (value: number) => {
      if (value >= 85) return '导师支持：强力背书，资源倾斜明显';
      if (value >= 70) return '导师支持：沟通顺畅，指导到位';
      if (value >= 50) return '导师支持：指导一般，靠自驱推进';
      return '导师支持：互动较少，独立摸索居多';
    };

    const collaboration = (value: number) => {
      if (value >= 85) return '同门协作：合作密切，团队氛围优秀';
      if (value >= 70) return '同门协作：互助稳定，关系融洽';
      if (value >= 50) return '同门协作：偶有互助，更多各自推进';
      return '同门协作：联系偏少，支持有限';
    };

    const finance = (value: number) => {
      if (value >= 85) return '奖助与收入：经费充足，可选性高';
      if (value >= 70) return '奖助与收入：补贴稳定，压力较小';
      if (value >= 50) return '奖助与收入：开销紧凑，尚可维持';
      return '奖助与收入：资金紧张，压力偏大';
    };

    const wellbeing = (value: number) => {
      if (value >= 85) return '心理成长：状态稳定，抗压显著提升';
      if (value >= 70) return '心理成长：有波动但能快速恢复';
      if (value >= 50) return '心理成长：焦虑明显，仍能坚持';
      return '心理成长：需要休息与恢复';
    };

    const career = (academicValue: number, advisorValue: number, moneyValue: number) => {
      const score = Math.round((academicValue + advisorValue + moneyValue) / 3);
      if (score >= 85) return '就业去向：直博/高薪 Offer，多选其一';
      if (score >= 70) return '就业去向：大厂/科研岗面试机会充足';
      if (score >= 55) return '就业去向：顺利拿到一到两个 Offer';
      return '就业去向：仍在准备期，方向探索中';
    };

    const endingNote = endingType === 'delay'
      ? '节奏调整：延毕后继续打磨，仍有机会翻盘'
      : endingType === 'dropout'
        ? '节奏调整：先照顾自己，未来依然有路可走'
        : endingType === 'withdrawal'
          ? '节奏调整：换条赛道，人生依然精彩'
          : '节奏调整：按计划推进，目标达成感提升';

    return [
      research(attributes.academic),
      academicImpact(attributes.academic),
      projectsAndContests(attributes.academic),
      mentorship(attributes.advisor),
      collaboration(attributes.peer_relations),
      finance(attributes.money),
      career(attributes.academic, attributes.advisor, attributes.money),
      wellbeing(attributes.mental),
      endingNote,
    ];
  };

  const getCharacterLabel = () => {
    if (!character) return '未知同学';
    const background = BACKGROUNDS[character.background as keyof typeof BACKGROUNDS]?.name || '未知背景';
    const major = MAJORS[character.major as keyof typeof MAJORS]?.name || '未知专业';
    const advisor = ADVISOR_TYPES[character.advisorType as keyof typeof ADVISOR_TYPES]?.name || '未知导师';
    return `${background} · ${major} · ${advisor}`;
  };

  const getPosterTheme = (endingType?: string) => {
    switch (endingType) {
      case 'excellent':
        return {
          bgFrom: '#1f2937',
          bgTo: '#0f172a',
          accent: '#fbbf24',
          panel: 'rgba(255, 255, 255, 0.12)',
          text: '#f8fafc',
          subtext: 'rgba(255, 255, 255, 0.8)',
          qrDark: '#111827',
          qrLight: '#ffffff',
        };
      case 'graduation':
        return {
          bgFrom: '#0f172a',
          bgTo: '#1e3a8a',
          accent: '#38bdf8',
          panel: 'rgba(255, 255, 255, 0.12)',
          text: '#e2e8f0',
          subtext: 'rgba(255, 255, 255, 0.75)',
          qrDark: '#0f172a',
          qrLight: '#ffffff',
        };
      case 'delay':
        return {
          bgFrom: '#1f2937',
          bgTo: '#7c2d12',
          accent: '#f97316',
          panel: 'rgba(255, 255, 255, 0.1)',
          text: '#fef3c7',
          subtext: 'rgba(254, 243, 199, 0.75)',
          qrDark: '#1f2937',
          qrLight: '#ffffff',
        };
      case 'dropout':
        return {
          bgFrom: '#0f172a',
          bgTo: '#064e3b',
          accent: '#22c55e',
          panel: 'rgba(255, 255, 255, 0.1)',
          text: '#dcfce7',
          subtext: 'rgba(220, 252, 231, 0.75)',
          qrDark: '#064e3b',
          qrLight: '#ffffff',
        };
      case 'withdrawal':
        return {
          bgFrom: '#111827',
          bgTo: '#4338ca',
          accent: '#a78bfa',
          panel: 'rgba(255, 255, 255, 0.12)',
          text: '#e0e7ff',
          subtext: 'rgba(224, 231, 255, 0.75)',
          qrDark: '#1f2937',
          qrLight: '#ffffff',
        };
      default:
        return {
          bgFrom: '#0f172a',
          bgTo: '#1e293b',
          accent: '#fbbf24',
          panel: 'rgba(255, 255, 255, 0.08)',
          text: '#f8fafc',
          subtext: 'rgba(255, 255, 255, 0.75)',
          qrDark: '#0f172a',
          qrLight: '#ffffff',
        };
    }
  };

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  const drawAvatar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) => {
    const mental = attributes.mental;
    const academic = attributes.academic;
    const advisor = attributes.advisor;
    const money = attributes.money;
    const peer = attributes.peer_relations;

    const skin =
      mental >= 70 ? '#f7d7c4' : mental >= 40 ? '#f0c2a2' : '#e3a48b';
    const hair =
      academic >= 80 ? '#2f2a45' : academic >= 60 ? '#3b2f2f' : '#4b3a26';
    const outfit =
      academic >= 80 ? '#3b82f6' : academic >= 60 ? '#22c55e' : '#f97316';
    const badge =
      advisor >= 70 ? '#fbbf24' : advisor >= 40 ? '#a3a3a3' : '#8b5cf6';
    const accent =
      money >= 70 ? '#16a34a' : money >= 40 ? '#0ea5e9' : '#ef4444';

    const head = size * 0.36;
    const headX = x + size * 0.22;
    const headY = y + size * 0.12;

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    ctx.beginPath();
    ctx.ellipse(x + size * 0.5, y + size * 0.9, size * 0.32, size * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.arc(headX + head, headY + head, head, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = hair;
    ctx.beginPath();
    ctx.arc(headX + head, headY + head * 0.85, head * 1.02, Math.PI, 0);
    ctx.fill();

    if (character?.gender !== 'male') {
      ctx.beginPath();
      ctx.arc(headX + head * 0.3, headY + head * 1.05, head * 0.35, Math.PI * 1.05, Math.PI * 1.9);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(headX + head * 1.7, headY + head * 1.05, head * 0.35, Math.PI * 1.05, Math.PI * 1.9);
      ctx.fill();
    }

    ctx.fillStyle = '#111827';
    ctx.beginPath();
    ctx.arc(headX + head * 0.65, headY + head * 0.95, head * 0.12, 0, Math.PI * 2);
    ctx.arc(headX + head * 1.35, headY + head * 0.95, head * 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(headX + head, headY + head * 1.2, head * 0.35, 0, Math.PI);
    ctx.stroke();

    ctx.fillStyle = outfit;
    drawRoundedRect(ctx, x + size * 0.18, y + size * 0.48, size * 0.64, size * 0.38, 18);
    ctx.fill();

    ctx.fillStyle = accent;
    drawRoundedRect(ctx, x + size * 0.26, y + size * 0.64, size * 0.48, size * 0.14, 12);
    ctx.fill();

    ctx.fillStyle = badge;
    ctx.beginPath();
    ctx.arc(x + size * 0.72, y + size * 0.55, size * 0.07, 0, Math.PI * 2);
    ctx.fill();

    if (peer >= 70) {
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + size * 0.32, y + size * 0.78);
      ctx.lineTo(x + size * 0.42, y + size * 0.9);
      ctx.lineTo(x + size * 0.58, y + size * 0.72);
      ctx.stroke();
    }

    ctx.restore();
  };

  const handleGenerateShareImage = async () => {
    if (!currentScene?.isEnd) return;
    setIsGeneratingShare(true);
    try {
      const width = 1080;
      const height = 1920;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const theme = getPosterTheme(currentScene.endingType);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, theme.bgFrom);
      gradient.addColorStop(1, theme.bgTo);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const cardX = 80;
      const cardY = 420;
      const cardW = 920;
      const cardH = 300;
      drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 26);
      ctx.fillStyle = theme.panel;
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = theme.accent;
      ctx.stroke();

      drawRoundedRect(ctx, cardX + 6, cardY + 6, cardW - 12, cardH - 12, 22);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.stroke();

      const textX = cardX + 40;
      ctx.fillStyle = theme.text;
      ctx.font = 'bold 36px "Microsoft YaHei", "PingFang SC", sans-serif';
      ctx.fillText(character?.name ? `毕业生：${character.name}` : '毕业生：匿名同学', textX, cardY + 130);
      ctx.font = '28px "Microsoft YaHei", "PingFang SC", sans-serif';
      ctx.fillText(getCharacterLabel(), textX, cardY + 190);
      ctx.fillText(`读研进度：第 ${progress.semester} 学期 · 第 ${progress.week} 周`, textX, cardY + 245);

      const avatarSize = 200;
      const avatarX = cardX + cardW - avatarSize - 50;
      const avatarY = cardY + 50;
      drawAvatar(ctx, avatarX, avatarY, avatarSize);

      const dataUrl = canvas.toDataURL('image/png');
      setShareImageUrl(dataUrl);

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'grad-school-simulator-share.png';
      link.click();
    } finally {
      setIsGeneratingShare(false);
    }
  };

  // 获取背景图片
  const getBackgroundImage = () => {
    switch (currentScene.background) {
      case 'bg-lab':
        return '/bg-lab.jpg';
      case 'bg-library':
        return '/bg-library.jpg';
      case 'bg-dorm':
        return '/bg-dorm.jpg';
      default:
        return '/bg-dorm.jpg';
    }
  };

  // 获取属性emoji
  const getAttributeEmoji = (key: string) => {
    const emojis: Record<string, string> = {
      academic: '📚',
      mental: '🧠',
      advisor: '👨‍🏫',
      money: '💰',
      peer_relations: '👥',
    };
    return emojis[key] || '';
  };

  if (!currentScene) {
    return (
      <Win95Window title="错误" icon="⚠️">
        <div className="p-4 text-center">
          <p className="text-red-600 mb-4">场景加载失败</p>
          <RestartButton />
        </div>
      </Win95Window>
    );
  }

  return (
    <div className="relative">
      {/* 背景图片 */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
        }}
      />

      {/* 游戏界面 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 pb-24 sm:pb-4">
        {/* 顶部状态栏（仅结局显示） */}
        {isEnding && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-2 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-20"
          >
            <div className="win95-window">
              <div className="win95-titlebar-small">
                <span className="text-white text-sm font-bold">📊 通关状态</span>
              </div>
              <div className="p-2 flex flex-wrap gap-4">
                {/* 学期信息 */}
                <div className="flex items-center gap-2">
                  <span className="text-sm">📅</span>
                  <span className="text-sm font-bold">
                    第 {progress.semester} 学期 · 第 {progress.week} 周
                  </span>
                </div>
                
                {/* 分隔线 */}
                <div className="w-px bg-gray-400" />
                
                {/* 属性条 */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {Object.entries(attributes).map(([key, value]) => (
                    <AttributeBar
                      key={key}
                      label={getAttributeLabel(key as keyof typeof attributes)}
                      value={value}
                      emoji={getAttributeEmoji(key)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 主游戏窗口 */}
        <Win95Window
          title={currentScene.title}
          icon={currentScene.emoji || '📋'}
          className={`w-[92vw] max-w-none ${isEnding ? 'mt-24 sm:mt-28' : 'mt-20 sm:mt-24'}`}
          showMenu={false}
        >
          <div className="p-4 sm:p-6">
            {/* 场景描述 */}
            <div className="mb-5 sm:mb-6 min-h-[90px] sm:min-h-[120px]">
              <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                <TypewriterText
                  text={currentScene.description}
                  speed={20}
                  onComplete={handleTypingComplete}
                />
              </p>
            </div>

            {/* 选择按钮 */}
            <AnimatePresence>
              {(showChoices || typingComplete) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {currentScene.choices.map((choice, index) => (
                    choice.id === 'restart' ? (
                      <motion.div
                        key={choice.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <RestartButton
                          label={choice.text}
                          emoji={choice.emoji || '🔄'}
                          className="w-full text-left p-3 sm:p-4 flex items-start gap-3"
                        />
                      </motion.div>
                    ) : (
                      <motion.button
                        key={choice.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleChoice(choice)}
                        className="win95-btn w-full text-left p-3 sm:p-4 flex items-start gap-3"
                      >
                        <span className="text-xl flex-shrink-0">
                          {choice.emoji || '💭'}
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed">
                          {choice.text}
                        </span>
                      </motion.button>
                    )
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 结局特殊显示 */}
            {currentScene.isEnd && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 text-center"
              >
                <div className="text-5xl sm:text-6xl mb-4">
                  {currentScene.endingType === 'excellent' && '🏆'}
                  {currentScene.endingType === 'graduation' && '🎓'}
                  {currentScene.endingType === 'delay' && '⏰'}
                  {currentScene.endingType === 'dropout' && '💚'}
                  {currentScene.endingType === 'withdrawal' && '🎒'}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  {currentScene.endingType === 'excellent' && '优秀毕业！'}
                  {currentScene.endingType === 'graduation' && '顺利毕业！'}
                  {currentScene.endingType === 'delay' && '延期毕业'}
                  {currentScene.endingType === 'dropout' && '休学调整'}
                  {currentScene.endingType === 'withdrawal' && '顺利肄业'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-700">
                  {getEndingTagline(currentScene.endingType)}
                </p>

                <div className="mt-6 text-left">
                  <div className="win95-window">
                    <div className="win95-titlebar-small">
                      <span className="text-white text-sm font-bold">🎯 通关总结</span>
                    </div>
                    <div className="p-3 sm:p-4 space-y-3 text-xs sm:text-sm text-gray-800">
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="font-bold">毕业状态：</span>
                        <span>{getEndingLabel(currentScene.endingType)}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="font-bold">角色信息：</span>
                        <span>{character?.name || '匿名同学'}</span>
                        <span className="text-gray-500">|</span>
                        <span>{getCharacterLabel()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="font-bold">读研进度：</span>
                        <span>第 {progress.semester} 学期 · 第 {progress.week} 周</span>
                      </div>
                      <div className="mt-3 grid grid-cols-1 gap-2">
                        {buildAchievementList(currentScene.endingType).map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <span>•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Win95Button
                      onClick={handleGenerateShareImage}
                      disabled={isGeneratingShare}
                      variant="primary"
                      emoji="🖼️"
                    >
                      {isGeneratingShare ? '生成中...' : '生成通关海报'}
                    </Win95Button>
                    {shareImageUrl && (
                      <a
                        href={shareImageUrl}
                        download="grad-school-simulator-share.png"
                        className="win95-btn"
                      >
                        下载图片
                      </a>
                    )}
                    <span className="text-xs text-gray-600">
                      海报包含二维码，可分享给朋友扫码进入首页
                    </span>
                  </div>

                  {shareImageUrl && (
                    <div className="mt-4 share-preview">
                      <img src={shareImageUrl} alt="通关海报预览" />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </Win95Window>

        {/* 底部信息 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-16 sm:bottom-4 left-4 right-4 text-center"
      >
        <p className="text-white text-xs opacity-70 drop-shadow-md">
          读研模拟器 v1.0 | 本游戏纯属虚构，如有雷同纯属巧合
        </p>
        </motion.div>
      </div>
    </div>
  );
};
