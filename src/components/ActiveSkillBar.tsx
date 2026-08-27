import React from 'react';
import { ActiveSkillDef, ACTIVE_SKILLS, getSkillsForHero } from '../data/activeSkills';
import { ActiveSkillState } from '../types';
import { HERO_DEFS } from '../data/gameData';

interface Props {
  heroes: { id: string; level: number; hp: number; maxHp: number; isDead: boolean }[];
  activeSkills: ActiveSkillState[];
  onActivateSkill: (skillId: string) => void;
}

interface SkillButtonProps {
  key?: React.Key;
  skill: ActiveSkillDef;
  state: ActiveSkillState | undefined;
  heroLevel: number;
  heroIsDead: boolean;
  onActivate: () => void;
}

function SkillButton({ skill, state, heroLevel, heroIsDead, onActivate }: SkillButtonProps) {
  const isUnlocked = heroLevel >= skill.unlockLevel;
  const isOnCooldown = state?.cooldownRemaining && state.cooldownRemaining > 0;
  const isActive = state?.isActive || false;
  const isDisabled = !isUnlocked || isOnCooldown || isActive || heroIsDead;
  const cooldownPercent = state?.cooldownRemaining ? (state.cooldownRemaining / skill.cooldown) * 100 : 0;
  const hero = HERO_DEFS.find(h => h.id === skill.heroId);

  if (!isUnlocked) {
    return (
      <div className="relative group">
        <div
          className="w-12 h-12 flex items-center justify-center opacity-30 cursor-not-allowed"
          style={{ background: 'rgba(30,30,50,0.5)', border: '2px solid #333355' }}
        >
          <span style={{ fontSize: '14px', color: '#556677' }}>🔒</span>
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[8px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.9)', color: '#94a3b8' }}>
          Lv.{skill.unlockLevel}
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <button
        onClick={onActivate}
        disabled={isDisabled}
        className="w-12 h-12 flex items-center justify-center transition-all relative overflow-hidden"
        style={{
          background: isDisabled ? 'rgba(30,30,50,0.5)' : `${skill.color}20`,
          border: `2px solid ${isDisabled ? '#333355' : skill.color}`,
          boxShadow: isActive ? `0 0 16px ${skill.color}60` : 'none',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
        title={`${skill.name}: ${skill.description}`}
      >
        {/* Cooldown overlay */}
        {isOnCooldown && state && (
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: 'rgba(0,0,0,0.6)',
              clipPath: `polygon(0 ${cooldownPercent}%, 100% ${cooldownPercent}%, 100% 100%, 0 100%)`,
            }}
          />
        )}
        
        {/* Active glow */}
        {isActive && (
          <div
            className="absolute inset-0 animate-pulse"
            style={{ background: `${skill.color}30` }}
          />
        )}
        
        <span className="relative z-10 text-base">{skill.icon}</span>
      </button>
      
      {/* Cooldown timer */}
      {isOnCooldown && state && (
        <div className="absolute -top-1 -right-1 px-1 py-0.5 text-[8px] font-bold" style={{ background: 'rgba(0,0,0,0.8)', color: '#94a3b8' }}>
          {state.cooldownRemaining}s
        </div>
      )}
      
      {/* Active indicator */}
      {isActive && (
        <div className="absolute -top-1 -right-1 px-1 py-0.5 text-[8px] font-bold animate-pulse" style={{ background: skill.color, color: 'white' }}>
          ON
        </div>
      )}
      
      {/* Tooltip */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 w-48" style={{ background: 'rgba(10,10,18,0.95)', border: '2px solid #2a2a4a' }}>
        <div className="text-[11px] font-bold" style={{ color: skill.color }}>{skill.name}</div>
        <div className="text-[10px] text-[#94a3b8] mt-1">{skill.description}</div>
        <div className="flex items-center gap-2 mt-1.5 text-[9px] text-[#475569]">
          <span>⏱️ {skill.cooldown}s</span>
          {skill.duration > 0 && <span>⏱️ {skill.duration}s</span>}
        </div>
      </div>
    </div>
  );
}

export function ActiveSkillBar({ heroes, activeSkills, onActivateSkill }: Props) {
  // Collect all available skills from heroes with level > 0
  const availableSkills: { skill: ActiveSkillDef; heroLevel: number; heroIsDead: boolean }[] = [];
  
  for (const hero of heroes) {
    if (hero.level === 0) continue;
    const heroSkills = getSkillsForHero(hero.id);
    for (const skill of heroSkills) {
      availableSkills.push({
        skill,
        heroLevel: hero.level,
        heroIsDead: hero.isDead,
      });
    }
  }

  if (availableSkills.length === 0) return null;

  return (
    <div className="glass-card-static p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="section-title text-[11px]">⚡ Habilidades Ativas</div>
        <div className="text-[9px] text-[#475569]">Clique para ativar</div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {availableSkills.map(({ skill, heroLevel, heroIsDead }) => {
          const skillState = activeSkills.find(s => s.id === skill.id);
          return (
            <SkillButton
              key={skill.id}
              skill={skill}
              state={skillState}
              heroLevel={heroLevel}
              heroIsDead={heroIsDead}
              onActivate={() => onActivateSkill(skill.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ActiveSkillBar;
