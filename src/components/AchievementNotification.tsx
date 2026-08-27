import React, { useEffect, useState } from 'react';
import { AchievementDef, getTierColor, getTierName } from '../data/achievements';

interface Props {
  achievement: AchievementDef | null;
  onDismiss: () => void;
}

export function AchievementNotification({ achievement, onDismiss }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      setIsLeaving(false);
      
      // Auto-dismiss after 4 seconds
      const timer = setTimeout(() => {
        setIsLeaving(true);
        setTimeout(() => {
          setIsVisible(false);
          onDismiss();
        }, 500);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [achievement, onDismiss]);

  if (!achievement || !isVisible) return null;

  const tierColor = getTierColor(achievement.tier);

  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
      style={{
        opacity: isLeaving ? 0 : 1,
        transform: `translateX(-50%) translateY(${isLeaving ? '-20px' : '0'})`,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        className="px-6 py-4 rounded-2xl flex items-center gap-4 min-w-[300px]"
        style={{
          background: 'rgba(10,10,18,0.95)',
          border: `2px solid ${tierColor}50`,
          boxShadow: `0 0 30px ${tierColor}30, 0 10px 40px rgba(0,0,0,0.5)`,
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            background: `${tierColor}15`,
            border: `1px solid ${tierColor}25`,
            animation: 'skill-activate 0.5s ease-out',
          }}
        >
          {achievement.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: tierColor }}>
              🏆 Conquista Desbloqueada!
            </span>
          </div>
          <div className="text-sm font-black text-[#f1f5f9] mt-1">
            {achievement.name}
          </div>
          <div className="text-[10px] text-[#94a3b8] mt-0.5">
            {achievement.description}
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className="px-1.5 py-0.5 rounded text-[8px] font-bold"
              style={{ background: `${tierColor}15`, color: tierColor, border: `1px solid ${tierColor}25` }}
            >
              {getTierName(achievement.tier)}
            </span>
            <span className="text-[9px] text-[#475569]">Recompensa:</span>
            <span className="text-[9px] font-bold" style={{ color: tierColor }}>
              {achievement.reward.type === 'gold' && `🪙 ${achievement.reward.amount}`}
              {achievement.reward.type === 'mana' && `💎 ${achievement.reward.amount}`}
              {achievement.reward.type === 'skillPoints' && `⭐ ${achievement.reward.amount}`}
              {achievement.reward.type === 'prestigePoints' && `🔄 ${achievement.reward.amount}`}
              {achievement.reward.type === 'pet' && `🐾 Pet Especial`}
              {achievement.reward.type === 'title' && `🏅 Título`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AchievementNotification;
