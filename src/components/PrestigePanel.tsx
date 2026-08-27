import React from 'react';
import { PrestigeState } from '../types';
import { PRESTIGE_DEFS, prestigePointsForAscension } from '../data/prestige';

interface Props { prestige: PrestigeState; completedDungeons: number; onAscend: () => void; onBuyUpgrade: (id: string) => void; }

export function PrestigePanel({ prestige, completedDungeons, onAscend, onBuyUpgrade }: Props) {
  const pts = prestigePointsForAscension(completedDungeons);
  const canAscend = completedDungeons >= 10;

  return (
    <div className="glass-card-static p-4">
      <div className="section-header">
        <div className="section-title">⭐ Ascensão</div>
        <div className="flex items-center gap-2">
          <div className="section-badge" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>{prestige.points} pts</div>
          <span className="text-[9px] text-[#334155]">#{prestige.ascensions}</span>
        </div>
      </div>

      <div className="p-3 rounded-xl mb-3" style={{ background: canAscend ? 'rgba(34,211,238,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${canAscend ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.04)'}`, opacity: canAscend ? 1 : 0.5 }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-[#22d3ee]">🔄 Ascender</span>
          <span className="text-[10px] text-[#0e7490]">+{pts} pontos</span>
        </div>
        <div className="text-[10px] text-[#475569] mb-2">{canAscend ? `Resetar por ${pts} pontos` : `Complete 10 dungeons (${completedDungeons}/10)`}</div>
        <button onClick={onAscend} disabled={!canAscend} className="w-full py-2 rounded-xl text-[11px] font-bold transition-all" style={{ background: canAscend ? 'rgba(34,211,238,0.12)' : 'rgba(30,30,50,0.5)', border: `1px solid ${canAscend ? 'rgba(34,211,238,0.2)' : 'rgba(255,255,255,0.05)'}`, color: canAscend ? '#22d3ee' : '#475569', cursor: canAscend ? 'pointer' : 'not-allowed' }}>
          🔄 Ascender Agora
        </button>
      </div>

      <div className="space-y-1.5">
        {PRESTIGE_DEFS.map(def => {
          const existing = prestige.upgrades.find(u => u.id === def.id);
          const level = existing?.level || 0;
          const maxed = level >= def.maxLevel;
          const canBuy = prestige.points >= def.cost && !maxed;

          return (
            <div key={def.id} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}>
              <span className="text-sm shrink-0">{def.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-[#f1f5f9]">{def.name}</span>
                  <span className="text-[9px] text-[#334155]">Lv.{level}/{def.maxLevel}</span>
                </div>
                <div className="text-[9px] text-[#64748b]">{level > 0 ? def.effectLabel(level) : def.description}</div>
              </div>
              <button onClick={() => onBuyUpgrade(def.id)} disabled={!canBuy} className="text-[9px] px-2 py-1 rounded-lg font-bold transition-all shrink-0 cursor-pointer" style={{ background: canBuy ? 'rgba(34,211,238,0.12)' : maxed ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.03)', color: canBuy ? '#22d3ee' : maxed ? '#34d399' : '#334155', border: `1px solid ${canBuy ? 'rgba(34,211,238,0.2)' : 'transparent'}` }}>
                {maxed ? '✓' : `⭐${def.cost}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
