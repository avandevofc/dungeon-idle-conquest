import React, { useState } from 'react';
import { SkillState, SkillBranch } from '../types';
import { SKILL_DEFS, BRANCH_COLORS } from '../data/skills';

interface Props { skills: SkillState[]; skillPoints: number; onUpgrade: (skillId: string) => void; }

const BRANCH_LABELS: Record<SkillBranch, { name: string; icon: string }> = {
  offensive: { name: 'Ofensivo', icon: '⚔️' },
  defensive: { name: 'Defensivo', icon: '🛡️' },
  utility: { name: 'Utilidade', icon: '🔧' },
};

export function SkillTreePanel({ skills, skillPoints, onUpgrade }: Props) {
  const [branch, setBranch] = useState<SkillBranch>('offensive');

  return (
    <div className="glass-card-static p-4">
      <div className="section-header">
        <div className="section-title">⭐ Habilidades</div>
        <div className="section-badge" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>{skillPoints} pts</div>
      </div>

      <div className="flex gap-1 mb-3">
        {(['offensive', 'defensive', 'utility'] as const).map(b => (
          <button key={b} onClick={() => setBranch(b)} className="flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer" style={{ background: branch === b ? `${BRANCH_COLORS[b]}15` : 'transparent', border: `1px solid ${branch === b ? `${BRANCH_COLORS[b]}30` : 'transparent'}`, color: branch === b ? BRANCH_COLORS[b] : '#475569' }}>
            {BRANCH_LABELS[b].icon} {BRANCH_LABELS[b].name}
          </button>
        ))}
      </div>

      <div className="space-y-1.5">
        {SKILL_DEFS.filter(s => s.branch === branch).map(def => {
          const st = skills.find(s => s.id === def.id);
          const level = st?.level || 0;
          const maxed = level >= def.maxLevel;
          const hasPrereq = !def.prerequisite || skills.find(s => s.id === def.prerequisite && s.level > 0);
          const canUp = skillPoints > 0 && !maxed && hasPrereq;

          return (
            <div key={def.id} className="p-2.5 rounded-xl transition-all" style={{ background: canUp ? 'rgba(255,255,255,0.02)' : 'transparent', border: `1px solid ${canUp ? 'rgba(255,255,255,0.05)' : 'transparent'}`, opacity: hasPrereq ? 1 : 0.4 }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0" style={{ background: level > 0 ? `${BRANCH_COLORS[branch]}12` : 'rgba(255,255,255,0.03)', border: `1px solid ${level > 0 ? `${BRANCH_COLORS[branch]}20` : 'rgba(255,255,255,0.04)'}` }}>
                  {def.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#f1f5f9]">{def.name}</span>
                    <span className="text-[9px] text-[#334155]">Lv.{level}/{def.maxLevel}</span>
                  </div>
                  <div className="text-[9px] text-[#64748b]">{def.effect(level)}</div>
                  {!hasPrereq && def.prerequisite && <div className="text-[9px] text-[#f87171]/50">🔒 {SKILL_DEFS.find(s => s.id === def.prerequisite)?.name}</div>}
                </div>
                <button onClick={() => onUpgrade(def.id)} disabled={!canUp} className="text-[9px] px-2 py-1 rounded-lg font-bold transition-all shrink-0 cursor-pointer" style={{ background: canUp ? 'rgba(251,191,36,0.12)' : maxed ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.03)', color: canUp ? '#fbbf24' : maxed ? '#34d399' : '#334155', border: `1px solid ${canUp ? 'rgba(251,191,36,0.2)' : 'transparent'}` }}>
                  {maxed ? '✓' : '+1'}
                </button>
              </div>
              <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(level / def.maxLevel) * 100}%`, background: BRANCH_COLORS[branch] }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
