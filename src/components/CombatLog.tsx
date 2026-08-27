import React, { useRef, useEffect } from 'react';
import { CombatLogEntry } from '../types';
import { timeAgo } from '../utils/formatters';

interface Props { log: CombatLogEntry[]; }

const LOG_COLORS: Record<CombatLogEntry['type'], string> = {
  damage: '#64748b', kill: '#34d399', gold: '#fbbf24', mana: '#a78bfa',
  levelup: '#22d3ee', dungeon: '#60a5fa', boss: '#f87171', upgrade: '#fcd34d',
  crit: '#fb923c', item: '#60a5fa', pet: '#f472b6', skill: '#fbbf24',
  achievement: '#fde68a', prestige: '#22d3ee',
};

export function CombatLog({ log }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [log.length]);

  return (
    <div className="glass-card-static p-4">
      <div className="section-header">
        <div className="section-title">📜 Combat Log</div>
      </div>
      <div ref={scrollRef} className="h-44 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
        {log.length === 0 && (
          <div className="text-[11px] text-[#334155] text-center py-8">Iniciando batalha...</div>
        )}
        {log.map(entry => (
          <div key={entry.id} className="log-entry animate-fade-in">
            <div className="log-dot" style={{ background: LOG_COLORS[entry.type] }} />
            <span className="flex-1" style={{ color: LOG_COLORS[entry.type] }}>{entry.text}</span>
            <span className="text-[9px] text-[#334155] shrink-0 mt-0.5">{timeAgo(entry.timestamp)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
