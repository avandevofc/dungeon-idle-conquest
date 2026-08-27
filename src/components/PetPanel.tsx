import React, { useState } from 'react';
import { PetState } from '../types';
import { PET_DEFS, PET_LEVEL_COST, PET_TYPE_COLORS, PET_TYPE_NAMES, PET_ELEMENTS, EVOLUTION_STAGES, isPetUnlocked } from '../data/pets';
import { RARITY_COLORS, RARITY_NAMES } from '../data/items';
import { formatNumber } from '../utils/formatters';

interface Props {
  pets: PetState[];
  activePet: string | null;
  totalKills: number;
  highestDungeon: number;
  totalGoldEarned: number;
  mana: number;
  inventoryItemCount: number;
  gold: number;
  onUnlock: (petId: string) => void;
  onSetActive: (petId: string | null) => void;
  onLevelUp: (petId: string) => void;
}

export function PetPanel({ pets, activePet, totalKills, highestDungeon, totalGoldEarned, mana, inventoryItemCount, gold, onUnlock, onSetActive, onLevelUp }: Props) {
  const [filter, setFilter] = useState<string>('all');
  const [selectedPet, setSelectedPet] = useState<string | null>(null);

  const gameState = { totalKills, highestDungeon, totalGoldEarned, mana, inventoryItemCount };

  const filteredPets = PET_DEFS.filter(def => {
    if (filter === 'all') return true;
    if (filter === 'owned') return pets.some(p => p.id === def.id);
    if (filter === 'active') return activePet === def.id;
    return def.element === filter || def.type === filter;
  });

  const ownedPets = pets.length;
  const totalPets = PET_DEFS.length;

  return (
    <div className="glass-card-static p-4">
      <div className="section-header mb-3">
        <div className="section-title">🐾 Pets ({ownedPets}/{totalPets})</div>
        {activePet && <div className="section-badge" style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>Ativo</div>}
      </div>

      {/* Element filters */}
      <div className="flex gap-1 mb-3 overflow-x-auto scrollbar-thin pb-1">
        <button onClick={() => setFilter('all')} className={`px-2 py-1 rounded-lg text-[9px] font-bold whitespace-nowrap ${filter === 'all' ? 'bg-[rgba(251,191,36,0.2)] text-[#fcd34d]' : 'text-[#475569]'}`}>
          Todos
        </button>
        <button onClick={() => setFilter('owned')} className={`px-2 py-1 rounded-lg text-[9px] font-bold whitespace-nowrap ${filter === 'owned' ? 'bg-[rgba(52,211,153,0.2)] text-[#34d399]' : 'text-[#475569]'}`}>
          🎒 ({ownedPets})
        </button>
        {Object.entries(PET_ELEMENTS).map(([key, el]) => (
          <button key={key} onClick={() => setFilter(key)} className={`px-2 py-1 rounded-lg text-[9px] font-bold whitespace-nowrap ${filter === key ? `text-white` : 'text-[#475569]'}`}
            style={filter === key ? { background: `${el.color}30`, color: el.color } : {}}>
            {el.icon}
          </button>
        ))}
      </div>

      {/* Pet list */}
      <div className="space-y-1.5 max-h-[400px] overflow-y-auto scrollbar-thin">
        {filteredPets.map(def => {
          const owned = pets.find(p => p.id === def.id);
          const unlocked = isPetUnlocked(def, gameState);
          const isActive = activePet === def.id;
          const cost = owned ? PET_LEVEL_COST(owned.level) : 0;
          const elementInfo = PET_ELEMENTS[def.element];
          const stage = owned ? Math.min(owned.evolutionStage || 0, 4) : 0;
          const isSelected = selectedPet === def.id;

          return (
            <div key={def.id} className="rounded-xl transition-all" style={{
              background: isActive ? 'rgba(52,211,153,0.06)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${isActive ? 'rgba(52,211,153,0.2)' : isSelected ? `${elementInfo.color}30` : 'rgba(255,255,255,0.03)'}`,
              opacity: unlocked || owned ? 1 : 0.35,
            }}>
              {/* Main row */}
              <div className="flex items-center gap-2 p-2 cursor-pointer" onClick={() => setSelectedPet(isSelected ? null : def.id)}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0" style={{ background: `${elementInfo.color}15`, border: `1px solid ${elementInfo.color}30` }}>
                  {unlocked || owned ? (owned ? EVOLUTION_STAGES[stage] : def.icon) : '🔒'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-[#f1f5f9]">{def.name}</span>
                    {owned && <span className="text-[8px] px-1 py-0.5 rounded-full" style={{ background: 'rgba(148,163,184,0.1)', color: '#94a3b8' }}>Lv.{owned.level}</span>}
                    <span className="text-[8px] px-1 py-0.5 rounded-full" style={{ background: `${elementInfo.color}15`, color: elementInfo.color }}>{elementInfo.icon}</span>
                  </div>
                  <div className="text-[9px] text-[#475569]">{def.passives[0]?.effectLabel || def.description}</div>
                  {!unlocked && !owned && <div className="text-[8px] text-[#334155]">🔒 {def.unlockCondition}</div>}
                </div>
                <div className="flex gap-1 shrink-0">
                  {!owned && unlocked && <button onClick={(e) => { e.stopPropagation(); onUnlock(def.id); }} className="btn-primary text-[9px] px-2 py-1">Desbloquear</button>}
                  {owned && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); onSetActive(isActive ? null : def.id); }} className="text-[9px] px-2 py-1 rounded-lg font-bold transition-all cursor-pointer" style={{ background: isActive ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.04)', color: isActive ? '#34d399' : '#64748b', border: `1px solid ${isActive ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.06)'}` }}>
                        {isActive ? '✓' : 'Ativar'}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); onLevelUp(def.id); }} disabled={gold < cost} className="btn-amber text-[9px] px-2 py-1">
                        +1 🪙{formatNumber(cost)}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Expanded details */}
              {isSelected && owned && (
                <div className="px-3 pb-3 border-t border-white/[0.03] mt-1 pt-2">
                  {/* Evolution */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[9px] text-[#64748b] mr-1">Evolução:</span>
                    {EVOLUTION_STAGES.map((s, i) => (
                      <span key={i} className={`text-sm ${i <= stage ? '' : 'opacity-20'}`}>{s}</span>
                    ))}
                  </div>

                  {/* Passives */}
                  <div className="space-y-1 mb-2">
                    {def.passives.map((p, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className={`text-[9px] ${owned.level >= p.unlockLevel ? 'text-[#34d399]' : 'text-[#334155]'}`}>
                          {owned.level >= p.unlockLevel ? '🔓' : '🔒'} {p.name}
                        </span>
                        <span className="text-[8px] text-[#475569]">{p.description}</span>
                        <span className="text-[8px] text-[#334155]">Lv.{p.unlockLevel}</span>
                      </div>
                    ))}
                  </div>

                  {/* Active Skill */}
                  <div className="p-2 rounded-lg" style={{ background: `${elementInfo.color}08`, border: `1px solid ${elementInfo.color}15` }}>
                    <div className="text-[10px] font-bold" style={{ color: elementInfo.color }}>
                      {def.activeSkill.icon} {def.activeSkill.name}
                    </div>
                    <div className="text-[8px] text-[#64748b]">
                      {def.activeSkill.description} · ⏱️ {def.activeSkill.cooldown}s
                    </div>
                  </div>

                  {/* Lore */}
                  <div className="text-[8px] text-[#334155] italic mt-2">"{def.lore}"</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
