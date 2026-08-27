import React from 'react';
import { DailyRewardState } from '../types';
import { DAILY_REWARDS, getStreakBonus, getStreakColor, getStreakName, formatTimeUntilReset, getRewardTypeIcon, getRewardTypeName } from '../data/dailyRewards';

interface Props {
  dailyRewards: DailyRewardState;
  onClaim: () => void;
  onClose: () => void;
}

export function DailyRewardPanel({ dailyRewards, onClaim, onClose }: Props) {
  const streak = dailyRewards.currentStreak;
  const streakBonus = getStreakBonus(streak);
  const streakColor = getStreakColor(streak);
  const streakName = getStreakName(streak);
  const canClaim = !dailyRewards.claimedToday;
  const nextRewardIndex = dailyRewards.claimedToday ? dailyRewards.lastRewardIndex : (streak % 7);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div
        className="w-full max-w-lg max-h-[85vh] flex flex-col animate-fade-in"
        style={{ background: 'rgba(10,10,18,0.97)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.25)' }}>
              🎁
            </div>
            <div>
              <h2 className="text-sm font-black text-[#f1f5f9]">Recompensas Diárias</h2>
              <p className="text-[10px] text-[#475569]">Faça login todos os dias para bônus maiores!</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost text-[11px] px-3 py-1.5">✕</button>
        </div>

        {/* Streak Info */}
        <div className="px-6 pt-4 flex-shrink-0">
          <div className="p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${streakColor}10, ${streakColor}05)`, border: `1px solid ${streakColor}25` }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{streakBonus.bonusIcon}</span>
                  <div>
                    <div className="text-[12px] font-black" style={{ color: streakColor }}>
                      {streakName}
                    </div>
                    <div className="text-[10px] text-[#94a3b8]">
                      Sequência: {streak} {streak === 1 ? 'dia' : 'dias'}
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-[#475569] mt-2">
                  Bônus: +{streakBonus.bonusPercent}% em todas as recompensas
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[#475569]">Próxima recompensa em</div>
                <div className="text-sm font-bold" style={{ color: streakColor }}>
                  {formatTimeUntilReset()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Rewards */}
        <div className="px-6 pt-4 flex-shrink-0">
          <div className="text-[11px] font-bold text-[#64748b] mb-3">Recompensas da Semana</div>
          <div className="grid grid-cols-7 gap-2">
            {DAILY_REWARDS.map((reward, index) => {
              const isClaimed = dailyRewards.claimedToday && index <= dailyRewards.lastRewardIndex;
              const isNext = index === nextRewardIndex;
              const dayLabel = `Dia ${index + 1}`;

              return (
                <div
                  key={index}
                  className="rounded-xl p-2 text-center transition-all"
                  style={{
                    background: isClaimed ? `${streakColor}15` : isNext ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isClaimed ? `${streakColor}30` : isNext ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.04)'}`,
                    opacity: isClaimed ? 0.6 : 1,
                  }}
                >
                  <div className="text-[8px] text-[#475569] mb-1">{dayLabel}</div>
                  <div className="text-lg mb-1">{reward.icon}</div>
                  <div className="text-[8px] font-bold" style={{ color: isClaimed ? '#334155' : '#f1f5f9' }}>
                    {reward.type === 'gold' && `${reward.amount}`}
                    {reward.type === 'mana' && `${reward.amount}`}
                    {reward.type === 'skillPoints' && `${reward.amount}`}
                    {reward.type === 'item' && '1'}
                  </div>
                  <div className="text-[7px] text-[#334155]">
                    {getRewardTypeName(reward.type)}
                  </div>
                  {reward.boosted && (
                    <div className="text-[7px] text-[#fbbf24] mt-0.5">+boost</div>
                  )}
                  {isClaimed && (
                    <div className="text-[8px] text-[#34d399] mt-0.5">✓</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Claim Button */}
        <div className="px-6 pt-4 pb-2 flex-shrink-0">
          <button
            onClick={onClaim}
            disabled={!canClaim}
            className="w-full py-3 rounded-xl font-bold text-[12px] transition-all"
            style={{
              background: canClaim ? 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(34,211,238,0.1))' : 'rgba(30,30,50,0.5)',
              border: `1px solid ${canClaim ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.05)'}`,
              color: canClaim ? '#34d399' : '#334155',
              cursor: canClaim ? 'pointer' : 'not-allowed',
            }}
          >
            {canClaim ? '🎁 Coletar Recompensa Diária' : '✓ Já coletado hoje!'}
          </button>
        </div>

        {/* Streak Milestones */}
        <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin">
          <div className="text-[11px] font-bold text-[#64748b] mb-3">Marcos de Sequência</div>
          <div className="space-y-2">
            {[
              { streak: 3, bonus: '10%', name: 'Iniciante' },
              { streak: 7, bonus: '25%', name: 'Dedicado' },
              { streak: 14, bonus: '50%', name: 'Veterano' },
              { streak: 30, bonus: '100%', name: 'Lenda' },
              { streak: 60, bonus: '200%', name: 'Mito' },
            ].map(milestone => {
              const reached = streak >= milestone.streak;
              return (
                <div
                  key={milestone.streak}
                  className="flex items-center gap-3 p-2 rounded-xl"
                  style={{
                    background: reached ? 'rgba(52,211,153,0.06)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${reached ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.04)'}`,
                    opacity: reached ? 1 : 0.5,
                  }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: reached ? 'rgba(52,211,153,0.1)' : 'rgba(30,30,50,0.5)' }}>
                    {reached ? '✓' : '🔒'}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-[#f1f5f9]">{milestone.name}</div>
                    <div className="text-[9px] text-[#475569]">{milestone.streak} dias consecutivos</div>
                  </div>
                  <div className="text-[10px] font-bold" style={{ color: reached ? '#34d399' : '#334155' }}>
                    +{milestone.bonus}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-3 border-t border-white/[0.06] flex items-center justify-between flex-shrink-0">
          <span className="text-[10px] text-[#334155]">Maior sequência: {dailyRewards.longestStreak} dias</span>
          <span className="text-[10px] text-[#334155]">Total: {dailyRewards.totalDaysClaimed} dias</span>
        </div>
      </div>
    </div>
  );
}

export default DailyRewardPanel;
