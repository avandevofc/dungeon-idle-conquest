import React from 'react';
import { PetState } from '../types';
import { PET_DEFS, PET_LEVEL_COST, PET_TYPE_COLORS, PET_TYPE_NAMES } from '../data/pets';
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

function isUnlocked(def: typeof PET_DEFS[0], tk: number, hd: number, tg: number, m: number, ii: number): boolean {
  const checks: Record<string, boolean> = {
    fire_imp: tk >= 50, fairy: tg >= 500, stone_golem: tk >= 100,
    shadow_wolf: hd >= 5, spirit_wisp: tg >= 5000, shield_turtle: hd >= 8,
    treasure_mimic: ii >= 3, mana_crystal: m >= 50, dragon_whelp: hd >= 15,
    time_relic: hd >= 20, angel: hd >= 25, phoenix: hd >= 30,
  };
  return checks[def.id] || false;
}

export function PetPanel({ pets, activePet, totalKills, highestDungeon, totalGoldEarned, mana, inventoryItemCount, gold, onUnlock, onSetActive, onLevelUp }: Props) {
  return (
    <div className="glass-card-static p-4">
      <div className="section-header">
        <div className="section-title">🐾 Pets</div>
        {activePet && <div className="section-badge" style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>Ativo</div>}
      </div>
      <div className="space-y-1.5">
        {PET_DEFS.map(def => {
          const owned = pets.find(p => p.id === def.id);
          const unlocked = isUnlocked(def, totalKills, highestDungeon, totalGoldEarned, mana, inventoryItemCount);
          const isActive = activePet === def.id;
          const cost = owned ? PET_LEVEL_COST(owned.level) : 0;

          return (
            <div key={def.id} className="flex items-center gap-2 p-2 rounded-xl transition-all" style={{
              background: isActive ? 'rgba(52,211,153,0.06)' : owned ? 'rgba(255,255,255,0.02)' : 'transparent',
              border: `1px solid ${isActive ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.03)'}`,
              opacity: unlocked || owned ? 1 : 0.35,
            }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0" style={{ background: `${PET_TYPE_COLORS[def.type]}10`, border: `1px solid ${PET_TYPE_COLORS[def.type]}20` }}>
                {unlocked || owned ? def.icon : '🔒'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-[#f1f5f9]">{def.name}</span>
                  {owned && <span className="text-[9px] px-1 py-0.5 rounded-full" style={{ background: 'rgba(148,163,184,0.1)', color: '#94a3b8' }}>Lv.{owned.level}</span>}
                </div>
                <div className="text-[9px] text-[#475569]">{def.effect}</div>
                {!unlocked && !owned && <div className="text-[9px] text-[#334155]">🔒 {def.unlockCondition}</div>}
              </div>
              <div className="flex gap-1 shrink-0">
                {!owned && unlocked && <button onClick={() => onUnlock(def.id)} className="btn-primary text-[9px] px-2 py-1">Desbloquear</button>}
                {owned && (
                  <>
                    <button onClick={() => onSetActive(isActive ? null : def.id)} className="text-[9px] px-2 py-1 rounded-lg font-bold transition-all cursor-pointer" style={{ background: isActive ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.04)', color: isActive ? '#34d399' : '#64748b', border: `1px solid ${isActive ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.06)'}` }}>
                      {isActive ? '✓' : 'Ativar'}
                    </button>
                    <button onClick={() => onLevelUp(def.id)} disabled={gold < cost} className="btn-amber text-[9px] px-2 py-1">
                      +1 🪙{formatNumber(cost)}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
