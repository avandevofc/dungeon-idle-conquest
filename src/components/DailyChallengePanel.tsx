import React from 'react';
import { DailyChallenge } from '../types';
import { DUNGEON_THEMES } from '../data/gameData';

interface Props { challenge: DailyChallenge | null; }

export function DailyChallengePanel({ challenge }: Props) {
  if (!challenge) return null;
  const theme = DUNGEON_THEMES.find(t => t.name === challenge.theme);

  return (
    <div className="glass-card-static p-4">
      <div className="section-header">
        <div className="section-title">📅 Desafio Diário</div>
      </div>
      <div className="p-3 rounded-xl" style={{
        background: challenge.completed ? 'rgba(52,211,153,0.05)' : 'rgba(248,113,113,0.04)',
        border: `1px solid ${challenge.completed ? 'rgba(52,211,153,0.15)' : 'rgba(248,113,113,0.1)'}`,
      }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{theme?.emoji || '🏰'}</span>
          <div>
            <div className="text-[11px] font-bold text-[#f1f5f9]">{challenge.name}</div>
            <div className="text-[9px] text-[#475569]">{challenge.theme} · Dungeon {challenge.dungeonNumber}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(248,113,113,0.1)', color: '#fca5a5', border: '1px solid rgba(248,113,113,0.15)' }}>{challenge.modifier}</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(34,211,238,0.1)', color: '#67e8f9', border: '1px solid rgba(34,211,238,0.15)' }}>⭐ {challenge.reward.amount}</span>
        </div>
        {challenge.completed
          ? <div className="text-[10px] text-[#34d399] font-bold">✓ Completado!</div>
          : <div className="text-[9px] text-[#334155]">Disponível até amanhã</div>}
      </div>
    </div>
  );
}
