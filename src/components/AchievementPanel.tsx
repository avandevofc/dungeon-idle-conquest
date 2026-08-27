import React, { useState, useMemo } from 'react';
import { AchievementState } from '../types';
import { ACHIEVEMENT_DEFS, AchievementCategory, CATEGORY_FILTERS, getTierColor, getTierName, getCategoryIcon, getCategoryName } from '../data/achievements';

interface Props {
  achievements: AchievementState[];
  gameState: {
    totalKills: number;
    totalBossKills: number;
    completedDungeons: number;
    highestDungeon: number;
    totalGoldEarned: number;
    totalManaEarned: number;
    heroes: { id: string; level: number }[];
    inventory: { items: any[] };
    crit: { totalCrits: number };
    prestige: { ascensions: number };
    skillPoints: number;
    monstersDiscovered?: number;
    bossesDiscovered?: number;
    totalMonsters?: number;
  };
  onClose: () => void;
}

interface AchievementCardProps {
  key?: React.Key;
  achievement: typeof ACHIEVEMENT_DEFS[0];
  state: AchievementState | undefined;
  progress: number;
  maxProgress: number;
}

function AchievementCard({ achievement, state, progress, maxProgress }: AchievementCardProps) {
  const isUnlocked = state?.unlocked || false;
  const tierColor = getTierColor(achievement.tier);
  const progressPercent = Math.min(100, (progress / maxProgress) * 100);

  return (
    <div
      className="rounded-xl p-3 transition-all"
      style={{
        background: isUnlocked ? `${tierColor}08` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isUnlocked ? `${tierColor}30` : 'rgba(255,255,255,0.04)'}`,
        opacity: achievement.hidden && !isUnlocked ? 0.5 : 1,
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{
            background: isUnlocked ? `${tierColor}15` : 'rgba(30,30,50,0.5)',
            border: `1px solid ${isUnlocked ? `${tierColor}25` : 'rgba(255,255,255,0.05)'}`,
          }}
        >
          {isUnlocked ? achievement.icon : '🔒'}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold" style={{ color: isUnlocked ? '#f1f5f9' : '#64748b' }}>
              {achievement.hidden && !isUnlocked ? '???' : achievement.name}
            </span>
            <span
              className="px-1.5 py-0.5 rounded text-[8px] font-bold"
              style={{ background: `${tierColor}15`, color: tierColor, border: `1px solid ${tierColor}25` }}
            >
              {getTierName(achievement.tier)}
            </span>
          </div>
          <div className="text-[9px] text-[#475569] mt-0.5">
            {achievement.hidden && !isUnlocked ? 'Conquista secreta' : achievement.description}
          </div>

          {/* Progress bar */}
          {!isUnlocked && (
            <div className="mt-2">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%`, background: `linear-gradient(90deg, ${tierColor}80, ${tierColor})` }}
                />
              </div>
              <div className="text-[8px] text-[#334155] mt-1">
                {progress.toLocaleString()} / {maxProgress.toLocaleString()}
              </div>
            </div>
          )}

          {/* Reward */}
          <div className="flex items-center gap-1.5 mt-1.5">
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

        {/* Unlocked badge */}
        {isUnlocked && (
          <div
            className="px-2 py-1 rounded-lg text-[9px] font-bold"
            style={{ background: `${tierColor}20`, color: tierColor, border: `1px solid ${tierColor}30` }}
          >
            ✓
          </div>
        )}
      </div>
    </div>
  );
}

export function AchievementPanel({ achievements, gameState, onClose }: Props) {
  const [category, setCategory] = useState<AchievementCategory | 'all'>('all');

  const filteredAchievements = useMemo(() => {
    return ACHIEVEMENT_DEFS.filter(a => {
      if (category === 'all') return true;
      return a.category === category;
    });
  }, [category]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalAchievements = ACHIEVEMENT_DEFS.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[85vh] flex flex-col animate-fade-in"
        style={{ background: 'rgba(10,10,18,0.97)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.25)' }}>
              🏆
            </div>
            <div>
              <h2 className="text-sm font-black text-[#f1f5f9]">Conquistas</h2>
              <p className="text-[10px] text-[#475569]">{unlockedCount}/{totalAchievements} desbloqueadas</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost text-[11px] px-3 py-1.5">✕</button>
        </div>

        {/* Progress summary */}
        <div className="px-6 pt-4 flex-shrink-0">
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / totalAchievements) * 100}%`, background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)' }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-[#334155]">{unlockedCount} desbloqueadas</span>
            <span className="text-[9px] text-[#334155]">{totalAchievements - unlockedCount} restantes</span>
          </div>
        </div>

        {/* Category filters */}
        <div className="px-6 pt-3 pb-2 flex gap-1.5 overflow-x-auto flex-shrink-0 scrollbar-thin">
          {CATEGORY_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setCategory(f.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all flex-shrink-0 ${category === f.id ? 'bg-[rgba(251,191,36,0.2)] text-[#fcd34d] border border-[rgba(251,191,36,0.3)]' : 'text-[#475569] hover:text-[#94a3b8] border border-transparent hover:bg-[rgba(255,255,255,0.03)]'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Achievements list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 scrollbar-thin">
          {filteredAchievements.map(achievement => {
            const state = achievements.find(a => a.id === achievement.id);
            
            // Calculate progress
            let progress = 0;
            let maxProgress = achievement.conditionValue;
            switch (achievement.conditionType) {
              case 'totalKills': progress = gameState.totalKills; break;
              case 'totalBossKills': progress = gameState.totalBossKills; break;
              case 'completedDungeons': progress = gameState.completedDungeons; break;
              case 'highestDungeon': progress = gameState.highestDungeon; break;
              case 'totalGoldEarned': progress = gameState.totalGoldEarned; break;
              case 'totalManaEarned': progress = gameState.totalManaEarned; break;
              case 'heroLevel': progress = Math.max(...gameState.heroes.map(h => h.level)); break;
              case 'totalItems': progress = gameState.inventory.items.length; break;
              case 'totalCrits': progress = gameState.crit.totalCrits; break;
              case 'ascensions': progress = gameState.prestige.ascensions; break;
              case 'totalSkillPoints': progress = gameState.skillPoints; break;
              case 'monstersDiscovered': progress = (gameState as any).monstersDiscovered || 0; break;
              case 'bossesDiscovered': progress = (gameState as any).bossesDiscovered || 0; break;
              case 'allMonstersDiscovered': progress = (gameState as any).monstersDiscovered || 0; maxProgress = (gameState as any).totalMonsters || 1; break;
            }

            return (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                state={state}
                progress={progress}
                maxProgress={maxProgress}
              />
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/[0.06] flex items-center justify-between flex-shrink-0">
          <span className="text-[10px] text-[#334155]">Dungeon Idle Conquest</span>
          <span className="text-[10px] text-[#334155]">{filteredAchievements.length} conquistas</span>
        </div>
      </div>
    </div>
  );
}

export default AchievementPanel;
