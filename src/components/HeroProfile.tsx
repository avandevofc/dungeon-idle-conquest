import React, { useState } from 'react';
import { HeroDef, ItemInstance, PetState, SkillState } from '../types';
import { HeroSprite } from './HeroSprite';
import { ITEMS, RARITY_COLORS, RARITY_NAMES } from '../data/items';
import { PET_DEFS, PET_TYPE_COLORS, PET_TYPE_NAMES } from '../data/pets';
import { SKILL_DEFS, BRANCH_COLORS } from '../data/skills';
import { MONSTER_LORE, BOSS_NAMES } from '../data/monsters';
import { MONSTROS_ADICIONAIS, getAllMonsters } from '../data/monstersExpanded';
import { getItemLore, getAllItemsWithLore } from '../data/itemsExpanded';
import { ITENS_ADICIONAIS, getAllItemsLore } from '../data/itemsLoreExpanded';
import { DUNGEON_THEMES } from '../data/gameData';
import { getEvolutionDef, getCurrentTier, getNextTier, canEvolve } from '../data/evolutions';
import { heroUpgradeCost, heroDamage, formatNumber, getEvolutionMultiplier } from '../utils/formatters';

interface Props {
  hero: { id: string; level: number; hp: number; maxHp: number; isDead: boolean; reviveTimer: number; evolutionLevel: number };
  heroDef: HeroDef;
  gold: number;
  manaMult: number;
  totalGoldEarned: number;
  inventory: ItemInstance[];
  pets: PetState[];
  activePet: string | null;
  skills: SkillState[];
  skillPoints: number;
  onUpgrade: (heroId: string) => void;
  onBulkUpgrade: (heroId: string, amount: number | 'max') => void;
  onEquip: (itemUid: string, heroId: string) => void;
  onUnequip: (itemUid: string) => void;
  onSetPet: (petId: string | null) => void;
  onUpgradeSkill: (skillId: string) => void;
  onEquipBest: (heroId: string) => void;
  onEvolve: (heroId: string) => void;
  onClose: () => void;
}

type Tab = 'stats' | 'equip' | 'skills' | 'pets' | 'lore';

export function HeroProfile({ hero, heroDef, gold, manaMult, totalGoldEarned, inventory, pets, activePet, skills, skillPoints, onUpgrade, onBulkUpgrade, onEquip, onUnequip, onSetPet, onUpgradeSkill, onEquipBest, onEvolve, onClose }: Props) {
  const [tab, setTab] = useState<Tab>('stats');

  const level = hero.level;
  const maxHp = hero.maxHp;
  const hpPct = maxHp > 0 ? (hero.hp / maxHp) * 100 : 0;
  const dmg = level > 0 ? heroDamage(heroDef.baseDmg, level, manaMult, getEvolutionMultiplier(hero.evolutionLevel || 0)) : heroDef.baseDmg;
  const cost = heroUpgradeCost(heroDef.baseCost, level);
  const canAfford = gold >= cost;

  // Evolution
  const currentTier = getCurrentTier(hero.id, hero.evolutionLevel || 0);
  const nextTier = getNextTier(hero.id, hero.evolutionLevel || 0);
  const evoDef = getEvolutionDef(hero.id);

  // Equipment
  const equippedItems = inventory.filter(i => i.equipped && i.heroId === hero.id);
  const availableItems = inventory.filter(i => !i.equipped);

  // Compute equipment bonuses
  let bonusDmg = 0, bonusHp = 0, bonusCrit = 0, bonusGold = 0;
  equippedItems.forEach(item => {
    const def = ITEMS.find(i => i.id === item.defId);
    if (!def) return;
    const mult = 1 + (item.level - 1) * 0.15;
    const val = def.baseStat * mult;
    switch (def.statType) {
      case 'damage': bonusDmg += val; break;
      case 'hp': bonusHp += val; break;
      case 'critChance': bonusCrit += val / 100; break;
      case 'gold': bonusGold += val / 100; break;
    }
  });

  const totalDmg = dmg + bonusDmg;
  const totalHp = maxHp + bonusHp;

  const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: 'stats', icon: '📊', label: 'Stats' },
    { id: 'equip', icon: '⚔️', label: 'Equip' },
    { id: 'skills', icon: '⭐', label: 'Skills' },
    { id: 'pets', icon: '🐾', label: 'Pet' },
    { id: 'lore', icon: '📖', label: 'Lore' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
      <div className="relative w-full max-w-lg max-h-[85vh] mx-4 rounded-3xl overflow-hidden flex flex-col" style={{ background: 'linear-gradient(180deg, #0c0c14, #06060b)', border: '1px solid rgba(255,255,255,0.06)' }}>

        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `${heroDef.color}10`, border: `2px solid ${heroDef.color}30` }}>
            <HeroSprite heroId={hero.id} size={50} animate={level > 0 && !hero.isDead} />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-black" style={{ color: currentTier.glowColor || heroDef.color }}>{currentTier.icon} {currentTier.name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-[#64748b]">Nv.{level}</span>
              <span className="text-[11px] font-bold" style={{ color: hero.isDead ? '#f87171' : '#34d399' }}>
                {hero.isDead ? `💀 Revive em ${hero.reviveTimer}s` : `${Math.floor(hero.hp)}/${Math.floor(totalHp)} HP`}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}>✕</button>
        </div>

        {/* HP Bar */}
        <div className="px-5 pt-3">
          <div className="hp-bar-container">
            <div className={`hp-bar-fill ${hero.isDead ? '' : hpPct > 50 ? 'normal' : 'boss'}`} style={{ width: `${hero.isDead ? 0 : hpPct}%` }} />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-3">
          <div className="tab-bar">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`tab-item ${tab === t.id ? 'active' : ''}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin">
          {/* === STATS TAB === */}
          {tab === 'stats' && (
            <div className="space-y-3 animate-fade-in">
              {/* === EVOLUTION SECTION === */}
              {evoDef && (
                <div className="rounded-2xl p-4" style={{ background: `linear-gradient(135deg, ${currentTier.glowColor}15, ${currentTier.glowColor}05)`, border: `1px solid ${currentTier.glowColor}30` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{currentTier.icon}</span>
                      <div>
                        <div className="text-xs font-black" style={{ color: currentTier.glowColor }}>{currentTier.name}</div>
                        <div className="text-[9px] text-[#64748b]">Evolução {hero.evolutionLevel || 0}/2</div>
                      </div>
                    </div>
                    {/* Evolution progress dots */}
                    <div className="flex gap-1.5">
                      {evoDef.tiers.map((tier, i) => (
                        <div key={i} className="w-3 h-3 rounded-full transition-all" style={{
                          background: i <= (hero.evolutionLevel || 0) ? tier.glowColor : 'rgba(255,255,255,0.1)',
                          boxShadow: i <= (hero.evolutionLevel || 0) ? `0 0 8px ${tier.glowColor}60` : 'none',
                        }} />
                      ))}
                    </div>
                  </div>

                  {/* Current tier abilities */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {currentTier.abilities.map((ability, i) => (
                      <span key={i} className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${currentTier.glowColor}20`, color: currentTier.glowColor, border: `1px solid ${currentTier.glowColor}30` }}>
                        {ability}
                      </span>
                    ))}
                  </div>

                  {/* Next tier preview */}
                  {nextTier ? (
                    <div className="rounded-xl p-3" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">➡️</span>
                          <div>
                            <div className="text-[10px] font-bold text-[#94a3b8]">Próxima evolução:</div>
                            <div className="text-xs font-black" style={{ color: nextTier.glowColor }}>{nextTier.icon} {nextTier.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] text-[#64748b]">+{Math.floor((nextTier.dmgMultiplier - 1) * 100)}% Dano</div>
                          <div className="text-[9px] text-[#64748b]">+{Math.floor((nextTier.hpMultiplier - 1) * 100)}% HP</div>
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-1.5 text-[9px]">
                          <span style={{ color: level >= nextTier.requiredLevel ? '#34d399' : '#f87171' }}>
                            {level >= nextTier.requiredLevel ? '✅' : '❌'}
                          </span>
                          <span className="text-[#94a3b8]">Nível {nextTier.requiredLevel} (atual: {level})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px]">
                          <span style={{ color: gold >= nextTier.goldCost ? '#34d399' : '#f87171' }}>
                            {gold >= nextTier.goldCost ? '✅' : '❌'}
                          </span>
                          <span className="text-[#94a3b8]">{nextTier.goldCost.toLocaleString()} 🪙 ouro</span>
                        </div>
                        {nextTier.specialReq && (
                          <div className="flex items-center gap-1.5 text-[9px]">
                            <span className="text-[#fbbf24]">⭐</span>
                            <span className="text-[#fbbf24] italic">{nextTier.specialReq}</span>
                          </div>
                        )}
                      </div>

                      {/* Evolve button */}
                      {level >= nextTier.requiredLevel && gold >= nextTier.goldCost ? (
                        <button
                          onClick={() => onEvolve(hero.id)}
                          className="w-full py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer"
                          style={{
                            background: `linear-gradient(135deg, ${nextTier.glowColor}40, ${nextTier.glowColor}20)`,
                            border: `2px solid ${nextTier.glowColor}60`,
                            color: nextTier.glowColor,
                            boxShadow: `0 0 20px ${nextTier.glowColor}30`,
                          }}
                        >
                          ✨ EVOLUIR PARA {nextTier.name.toUpperCase()} ✨
                        </button>
                      ) : (
                        <div className="w-full py-2.5 rounded-xl text-[10px] text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#475569' }}>
                          Requisitos não atingidos
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-2 text-[10px] font-bold" style={{ color: currentTier.glowColor }}>
                      🏆 Evolução Máxima Alcançada!
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'HP', value: `${Math.floor(totalHp)}`, color: '#34d399', icon: '❤️' },
                  { label: 'Dano', value: `${formatNumber(totalDmg)}/s`, color: '#f87171', icon: '⚔️' },
                  { label: 'Dano Base', value: `${formatNumber(heroDef.baseDmg)}`, color: '#fbbf24', icon: '🗡️' },
                  { label: 'Nível', value: `${level}`, color: '#a78bfa', icon: '📊' },
                  { label: 'Bonus Equip', value: `+${formatNumber(bonusDmg)} dmg`, color: '#22d3ee', icon: '🛡️' },
                  { label: 'Bonus HP', value: `+${formatNumber(bonusHp)} hp`, color: '#34d399', icon: '❤️' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="text-sm mb-1">{s.icon}</div>
                    <div className="text-xs font-black" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-[9px] text-[#334155]">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Upgrade buttons */}
              <div className="space-y-2">
                <div className="text-[10px] text-[#475569] font-medium">Melhorar Herói</div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 5, 10, 100, 'max' as const].map(amt => {
                    // Calculate cost for this amount
                    let totalCost = 0;
                    let tempLevel = level;
                    const times = amt === 'max' ? 9999 : amt;
                    for (let i = 0; i < times; i++) {
                      const c = heroUpgradeCost(heroDef.baseCost, tempLevel + i);
                      if (gold < totalCost + c) break;
                      totalCost += c;
                    }
                    const canDo = amt === 'max' ? totalCost > 0 : gold >= heroUpgradeCost(heroDef.baseCost, level);
                    const label = amt === 'max' ? 'MAX' : `${amt}x`;
                    const costLabel = amt === 'max' ? `🪙${formatNumber(totalCost)}` : `🪙${formatNumber(heroUpgradeCost(heroDef.baseCost, level) * (amt === 1 ? 1 : 1))}`;

                    return (
                      <button key={label} onClick={() => onBulkUpgrade(hero.id, amt)} disabled={!canDo} className="py-2 rounded-lg font-bold text-[10px] transition-all cursor-pointer" style={{
                        background: canDo ? `${heroDef.color}12` : 'rgba(30,30,50,0.5)',
                        border: `1px solid ${canDo ? heroDef.color + '25' : 'rgba(255,255,255,0.04)'}`,
                        color: canDo ? '#fbbf24' : '#334155',
                      }}>
                        <div className="font-black">{label}</div>
                        <div className="text-[8px] opacity-60 mt-0.5">
                          {amt === 'max' ? `🪙${formatNumber(totalCost)}` : `🪙${formatNumber(heroUpgradeCost(heroDef.baseCost, level))}`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* === EQUIP TAB === */}
          {tab === 'equip' && (
            <div className="space-y-3 animate-fade-in">
              {/* Equipped */}
              <div className="section-header">
                <div className="section-title text-[12px]">Equipado</div>
              </div>
              {equippedItems.length === 0 ? (
                <div className="text-center py-4 text-[10px] text-[#334155]">Nenhum item equipado</div>
              ) : (
                <div className="space-y-1.5">
                  {equippedItems.map(item => {
                    const def = ITEMS.find(i => i.id === item.defId);
                    if (!def) return null;
                    return (
                      <div key={item.uid} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${RARITY_COLORS[def.rarity]}25` }}>
                        <span className="text-lg">{def.icon}</span>
                        <div className="flex-1">
                          <div className="text-[11px] font-bold" style={{ color: RARITY_COLORS[def.rarity] }}>{def.name}</div>
                          <div className="text-[9px] text-[#475569]">+{Math.floor(def.baseStat * (1 + (item.level - 1) * 0.15))} {def.statType} · Lv.{item.level}</div>
                        </div>
                        <button onClick={() => onUnequip(item.uid)} className="text-[9px] px-2 py-1 rounded-lg font-bold cursor-pointer" style={{ background: 'rgba(248,113,113,0.1)', color: '#fca5a5', border: '1px solid rgba(248,113,113,0.15)' }}>
                          Remover
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Equip Best button */}
              <button onClick={() => onEquipBest(hero.id)} className="w-full py-2.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer" style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.12), rgba(34,211,238,0.08))', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}>
                ⚡ Equipar o Melhor
              </button>

              {/* Available */}
              <div className="section-header mt-3">
                <div className="section-title text-[12px]">Disponível</div>
              </div>
              {availableItems.length === 0 ? (
                <div className="text-center py-4 text-[10px] text-[#334155]">Nenhum item disponível</div>
              ) : (
                <div className="space-y-1.5">
                  {availableItems.map(item => {
                    const def = ITEMS.find(i => i.id === item.defId);
                    if (!def) return null;
                    return (
                      <div key={item.uid} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <span className="text-lg">{def.icon}</span>
                        <div className="flex-1">
                          <div className="text-[11px] font-bold" style={{ color: RARITY_COLORS[def.rarity] }}>{def.name}</div>
                          <div className="text-[9px] text-[#475569]">+{Math.floor(def.baseStat * (1 + (item.level - 1) * 0.15))} {def.statType} · Lv.{item.level}</div>
                        </div>
                        <button onClick={() => onEquip(item.uid, hero.id)} className="text-[9px] px-2 py-1 rounded-lg font-bold cursor-pointer" style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.15)' }}>
                          Equipar
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* === SKILLS TAB === */}
          {tab === 'skills' && (
            <div className="space-y-2 animate-fade-in">
              <div className="text-[10px] text-[#475569] mb-2">Pontos disponíveis: <span className="text-[#fbbf24] font-bold">{skillPoints}</span></div>
              {['offensive', 'defensive', 'utility'].map(branch => (
                <div key={branch}>
                  <div className="text-[10px] font-bold mb-1" style={{ color: BRANCH_COLORS[branch as keyof typeof BRANCH_COLORS] }}>
                    {branch === 'offensive' ? '⚔️ Ofensivo' : branch === 'defensive' ? '🛡️ Defensivo' : '🔧 Utilidade'}
                  </div>
                  {SKILL_DEFS.filter(s => s.branch === branch).map(def => {
                    const st = skills.find(s => s.id === def.id);
                    const level = st?.level || 0;
                    const maxed = level >= def.maxLevel;
                    const hasPrereq = !def.prerequisite || skills.find(s => s.id === def.prerequisite && s.level > 0);
                    const canUp = skillPoints > 0 && !maxed && hasPrereq;
                    const branchColor = BRANCH_COLORS[branch as keyof typeof BRANCH_COLORS];

                    return (
                      <div key={def.id} className="flex items-center gap-2 p-2 rounded-lg mb-1" style={{ background: 'rgba(255,255,255,0.02)', opacity: hasPrereq ? 1 : 0.4 }}>
                        <span className="text-sm">{def.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-bold text-[#f1f5f9]">{def.name} <span className="text-[#334155]">Lv.{level}/{def.maxLevel}</span></div>
                          <div className="text-[9px] text-[#64748b]">{def.effect(level)}</div>
                        </div>
                        <button onClick={() => onUpgradeSkill(def.id)} disabled={!canUp} className="text-[9px] px-2 py-1 rounded-lg font-bold cursor-pointer" style={{
                          background: canUp ? `${branchColor}20` : 'rgba(255,255,255,0.03)',
                          color: canUp ? branchColor : '#334155',
                          border: `1px solid ${canUp ? `${branchColor}30` : 'transparent'}`,
                        }}>
                          {maxed ? '✓' : '+1'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* === PETS TAB === */}
          {tab === 'pets' && (
            <div className="space-y-2 animate-fade-in">
              {activePet && (
                <div className="p-3 rounded-xl mb-3" style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}>
                  <div className="text-[10px] text-[#34d399] font-bold mb-1">Pet Ativo</div>
                  {(() => {
                    const petDef = PET_DEFS.find(d => d.id === activePet);
                    const petState = pets.find(p => p.id === activePet);
                    if (!petDef || !petState) return null;
                    return (
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{petDef.icon}</span>
                        <div className="flex-1">
                          <div className="text-[11px] font-bold text-[#f1f5f9]">{petDef.name} Lv.{petState.level}</div>
                          <div className="text-[9px] text-[#475569]">{petDef.effect}</div>
                        </div>
                        <button onClick={() => onSetPet(null)} className="text-[9px] px-2 py-1 rounded-lg font-bold cursor-pointer" style={{ background: 'rgba(248,113,113,0.1)', color: '#fca5a5', border: '1px solid rgba(248,113,113,0.15)' }}>
                          Remover
                        </button>
                      </div>
                    );
                  })()}
                </div>
              )}

              <div className="text-[10px] font-bold text-[#64748b] mb-1">Pets Disponíveis</div>
              {pets.filter(p => p.id !== activePet).map(pet => {
                const def = PET_DEFS.find(d => d.id === pet.id);
                if (!def) return null;
                return (
                  <div key={pet.id} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <span className="text-lg">{def.icon}</span>
                    <div className="flex-1">
                      <div className="text-[11px] font-bold text-[#f1f5f9]">{def.name} Lv.{pet.level}</div>
                      <div className="text-[9px]" style={{ color: PET_TYPE_COLORS[def.type] }}>{PET_TYPE_NAMES[def.type]} · {def.effect}</div>
                    </div>
                    <button onClick={() => onSetPet(pet.id)} className="text-[9px] px-2 py-1 rounded-lg font-bold cursor-pointer" style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.15)' }}>
                      Ativar
                    </button>
                  </div>
                );
              })}
              {pets.length === 0 && <div className="text-center py-4 text-[10px] text-[#334155]">Nenhum pet desbloqueado</div>}
            </div>
          )}

          {/* === LORE TAB === */}
          {tab === 'lore' && (() => {
            const [loreCategory, setLoreCategory] = useState<'monsters' | 'items'>('monsters');
            const [expandedTheme, setExpandedTheme] = useState<string | null>(null);
            const [expandedSlot, setExpandedSlot] = useState<string | null>(null);
            const [showAllMonsters, setShowAllMonsters] = useState(false);
            const [showAllItems, setShowAllItems] = useState(false);

            const totalMonsters = Object.values(MONSTER_LORE).flat().length + getAllMonsters().length;
            const totalItems = getAllItemsWithLore().length + getAllItemsLore().length;

            return (
              <div className="space-y-3 animate-fade-in">
                {/* Category Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setLoreCategory('monsters')}
                    className={`flex-1 py-2 rounded-xl text-[11px] font-bold transition-all ${loreCategory === 'monsters' ? 'text-[#f87171]' : 'text-[#475569]'}`}
                    style={{
                      background: loreCategory === 'monsters' ? 'rgba(248,113,113,0.1)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${loreCategory === 'monsters' ? 'rgba(248,113,113,0.25)' : 'rgba(255,255,255,0.04)'}`,
                    }}
                  >
                    👹 Monstros ({totalMonsters})
                  </button>
                  <button
                    onClick={() => setLoreCategory('items')}
                    className={`flex-1 py-2 rounded-xl text-[11px] font-bold transition-all ${loreCategory === 'items' ? 'text-[#a78bfa]' : 'text-[#475569]'}`}
                    style={{
                      background: loreCategory === 'items' ? 'rgba(167,139,250,0.1)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${loreCategory === 'items' ? 'rgba(167,139,250,0.25)' : 'rgba(255,255,255,0.04)'}`,
                    }}
                  >
                    🛡️ Itens ({totalItems})
                  </button>
                </div>

                {/* Monster Lore */}
                {loreCategory === 'monsters' && (
                  <div className="space-y-2">
                    {DUNGEON_THEMES.map(theme => {
                      const baseMonsters = MONSTER_LORE[theme.name] || [];
                      const extraMonsters = MONSTROS_ADICIONAIS[theme.name] || [];
                      const allThemeMonsters = [...baseMonsters, ...extraMonsters];
                      const boss = BOSS_NAMES[theme.name];
                      const isExpanded = expandedTheme === theme.name;
                      const displayMonsters = showAllMonsters ? allThemeMonsters : allThemeMonsters.slice(0, 3);

                      return (
                        <div key={theme.name} className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${isExpanded ? `${theme.accentColor}30` : 'rgba(255,255,255,0.04)'}` }}>
                          {/* Theme Header */}
                          <button
                            onClick={() => setExpandedTheme(isExpanded ? null : theme.name)}
                            className="w-full px-3 py-2.5 flex items-center gap-3 transition-all"
                            style={{ background: `${theme.accentColor}08` }}
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: `${theme.accentColor}15`, border: `1px solid ${theme.accentColor}25` }}>
                              {theme.emoji}
                            </div>
                            <div className="flex-1 text-left">
                              <div className="text-[11px] font-bold" style={{ color: theme.accentColor }}>{theme.name}</div>
                              <div className="text-[9px] text-[#475569]">{allThemeMonsters.length} monstros + boss</div>
                            </div>
                            <span className={`text-[10px] text-[#475569] transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                          </button>

                          {/* Expanded Content */}
                          {isExpanded && (
                            <div className="px-3 py-3 space-y-3 border-t" style={{ borderColor: `${theme.accentColor}10` }}>
                              {/* Boss Card */}
                              {boss && (
                                <div className="p-3 rounded-xl" style={{ background: `linear-gradient(135deg, rgba(248,113,113,0.08), rgba(248,113,113,0.02))`, border: '1px solid rgba(248,113,113,0.15)' }}>
                                  <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.25)' }}>
                                      💀
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-black text-[#f87171]">{boss.name}</span>
                                        <span className="px-1.5 py-0.5 rounded text-[7px] font-bold" style={{ background: 'rgba(248,113,113,0.2)', color: '#fca5a5' }}>BOSS</span>
                                      </div>
                                      <div className="text-[9px] text-[#fca5a5] italic">{boss.title}</div>
                                      <div className="text-[9px] text-[#94a3b8] mt-1.5 leading-relaxed">{boss.description}</div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Monster List */}
                              <div className="space-y-2">
                                {displayMonsters.map((monster, idx) => (
                                  <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: `${theme.accentColor}10`, border: `1px solid ${theme.accentColor}15` }}>
                                      👾
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-[10px] font-bold text-[#f1f5f9]">{monster.name}</div>
                                      <div className="text-[9px] text-[#94a3b8] leading-relaxed mt-0.5">{monster.description}</div>
                                      <div className="text-[8px] italic mt-1" style={{ color: `${theme.accentColor}aa` }}>
                                        💡 {monster.funFact}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {allThemeMonsters.length > 3 && !showAllMonsters && (
                                <button
                                  onClick={() => setShowAllMonsters(true)}
                                  className="w-full py-1.5 text-[9px] text-center rounded-lg transition-all"
                                  style={{ color: theme.accentColor, background: `${theme.accentColor}08` }}
                                >
                                  +{allThemeMonsters.length - 3} mais monstros...
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Item Lore */}
                {loreCategory === 'items' && (
                  <div className="space-y-2">
                    {([
                      { slot: 'weapon' as const, name: 'Armas', icon: '⚔️', color: '#f87171' },
                      { slot: 'armor' as const, name: 'Armaduras', icon: '🛡️', color: '#3b82f6' },
                      { slot: 'accessory' as const, name: 'Acessórios', icon: '💍', color: '#a78bfa' },
                    ]).map(({ slot, name, icon, color }) => {
                      const baseSlotItems = getAllItemsWithLore().filter(item => {
                        const def = ITEMS.find(i => i.id === item.id);
                        return def && def.slot === slot;
                      });
                      const extraSlotItems = ITENS_ADICIONAIS.filter(item => item.slot === slot);
                      const allSlotItems = [...baseSlotItems, ...extraSlotItems];
                      const isExpanded = expandedSlot === slot;
                      const displayItems = showAllItems ? allSlotItems : allSlotItems.slice(0, 3);

                      return (
                        <div key={slot} className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${isExpanded ? `${color}30` : 'rgba(255,255,255,0.04)'}` }}>
                          {/* Slot Header */}
                          <button
                            onClick={() => setExpandedSlot(isExpanded ? null : slot)}
                            className="w-full px-3 py-2.5 flex items-center gap-3 transition-all"
                            style={{ background: `${color}08` }}
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                              {icon}
                            </div>
                            <div className="flex-1 text-left">
                              <div className="text-[11px] font-bold" style={{ color }}>{name}</div>
                              <div className="text-[9px] text-[#475569]">{allSlotItems.length} itens com lore</div>
                            </div>
                            <span className={`text-[10px] text-[#475569] transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                          </button>

                          {/* Expanded Content */}
                          {isExpanded && (
                            <div className="px-3 py-3 space-y-2 border-t" style={{ borderColor: `${color}10` }}>
                              {displayItems.map(item => {
                                const def = ITEMS.find(i => i.id === item.id);
                                const rarityColor = def ? RARITY_COLORS[def.rarity] : '#9ca3af';

                                return (
                                  <div key={item.id} className="p-3 rounded-xl" style={{ background: `${rarityColor}05`, border: `1px solid ${rarityColor}15` }}>
                                    <div className="flex items-start gap-3">
                                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${rarityColor}15`, border: `1px solid ${rarityColor}25` }}>
                                        {def?.icon || '📦'}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <span className="text-[10px] font-bold" style={{ color: rarityColor }}>{item.name}</span>
                                          {def && (
                                            <span className="px-1.5 py-0.5 rounded text-[7px] font-bold" style={{ background: `${rarityColor}20`, color: rarityColor }}>
                                              {def.rarity.toUpperCase()}
                                            </span>
                                          )}
                                        </div>
                                        <div className="text-[9px] text-[#94a3b8] leading-relaxed mt-1">{item.description}</div>
                                        <div className="text-[8px] text-[#475569] italic mt-1.5 pl-2 border-l-2" style={{ borderColor: `${rarityColor}30` }}>
                                          📜 {item.lore}
                                        </div>
                                        {item.funFact && (
                                          <div className="text-[8px] text-[#34d399] italic mt-1">
                                            💡 {item.funFact}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}

                              {allSlotItems.length > 3 && !showAllItems && (
                                <button
                                  onClick={() => setShowAllItems(true)}
                                  className="w-full py-1.5 text-[9px] text-center rounded-lg transition-all"
                                  style={{ color, background: `${color}08` }}
                                >
                                  +{allSlotItems.length - 3} mais itens...
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
