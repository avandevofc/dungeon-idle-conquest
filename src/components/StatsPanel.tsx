import React from 'react';
import { formatNumber } from '../utils/formatters';

interface Props {
  totalKills: number; totalBossKills: number; totalGoldEarned: number;
  totalManaEarned: number; highestDungeon: number; completedDungeons: number;
  critTotal: number; ascensions: number; skillPoints: number;
}

export function StatsPanel(p: Props) {
  const stats = [
    { icon: '⚔️', label: 'Inimigos', value: formatNumber(p.totalKills), color: '#f87171' },
    { icon: '💀', label: 'Bosses', value: formatNumber(p.totalBossKills), color: '#a78bfa' },
    { icon: '🏰', label: 'Dungeons', value: p.completedDungeons.toString(), color: '#fbbf24' },
    { icon: '🏔️', label: 'Mais Alta', value: `#${p.highestDungeon}`, color: '#22d3ee' },
    { icon: '🪙', label: 'Ouro Total', value: formatNumber(p.totalGoldEarned), color: '#fbbf24' },
    { icon: '💎', label: 'Mana Total', value: formatNumber(p.totalManaEarned), color: '#a78bfa' },
    { icon: '🎯', label: 'Críticos', value: formatNumber(p.critTotal), color: '#fb923c' },
    { icon: '🔄', label: 'Ascensões', value: p.ascensions.toString(), color: '#22d3ee' },
    { icon: '⭐', label: 'Skill Pts', value: p.skillPoints.toString(), color: '#fbbf24' },
  ];

  return (
    <div className="glass-card-static p-4">
      <div className="section-header">
        <div className="section-title">📊 Estatísticas</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}>
            <div className="text-sm mb-1">{s.icon}</div>
            <div className="text-xs font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[8px] text-[#334155] mt-0.5 leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
