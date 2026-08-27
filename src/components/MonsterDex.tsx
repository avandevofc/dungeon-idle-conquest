// ==========================================
// MONSTER DEX — Enciclopédia de Monstros
// ==========================================

import React, { useState } from 'react';
import { MONSTER_LORE, BOSS_NAMES, RARE_MONSTERS } from '../data/monsters';
import { MONSTROS_ADICIONAIS } from '../data/monstersExpanded';
import { DUNGEON_THEMES, ENEMY_NAMES } from '../data/gameData';
import { MonsterSprite } from './MonsterSprite';
import { BossSpriteNew } from './BossSprites';
import { MONSTER_COLLECTION, getCollectionBonus, getCollectionStats, RARITY_COLORS, RARITY_LABELS } from '../data/monsterCollection';

interface MonsterDexProps {
  highestDungeon: number;
  completedDungeons: number;
  totalKills: number;
  monsterCollection: string[];
  onClose: () => void;
}

type DexTab = 'monsters' | 'bosses' | 'rare';

export function MonsterDex({ highestDungeon, completedDungeons, totalKills, monsterCollection, onClose }: MonsterDexProps) {
  const [activeTab, setActiveTab] = useState<DexTab>('monsters');
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [sortByTheme, setSortByTheme] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState<{
    name: string;
    description: string;
    funFact: string;
    theme: string;
    isBoss: boolean;
    spriteKey: string;
  } | null>(null);

  const currentTheme = DUNGEON_THEMES[selectedTheme];
  const themeName = currentTheme?.name || 'Trevas';

  // Check if player has reached this dungeon
  const isUnlocked = selectedTheme < highestDungeon;

  // Get monsters for current theme
  const baseMonsters = MONSTER_LORE[themeName] || [];
  const extraMonsters = MONSTROS_ADICIONAIS[themeName] || [];
  const allMonsters = [...baseMonsters, ...extraMonsters];
  const boss = BOSS_NAMES[themeName] || BOSS_NAMES[themeName + '_Special'];
  const enemyNames = ENEMY_NAMES[themeName as keyof typeof ENEMY_NAMES];

  // Collection stats
  const collectionStats = getCollectionStats(monsterCollection);
  const collectionBonuses = getCollectionBonus(monsterCollection);

  // Count discovered monsters for this theme
  const discoveredCount = allMonsters.filter(m => {
    const entry = Object.values(MONSTER_COLLECTION).find(e => e.name === m.name);
    return entry && monsterCollection.includes(entry.id);
  }).length;

  // Monster sprite key mapping
  const getSpriteKey = (name: string): string => {
    const map: Record<string, string> = {
      'Morcego Sombrio': 'bat', 'Morcego Demoníaco': 'bat', 'Araknis Noturno': 'spider', 'Aranha de Frio': 'spider', 'Aranha de Gelo': 'spider',
      'Esqueleto Velho': 'skeleton', 'Esqueleto das Trevas': 'skeleton', 'Esqueleto Arqueiro': 'skeleton', 'Wraith Jovem': 'skeleton', 'Wraith Ancestral': 'skeleton',
      'Goblin das Trevas': 'goblin', 'Goblin de Lava': 'goblin', 'Goblin de Gelo': 'goblin', 'Goblin Abissal': 'goblin', 'Goblin Celeste': 'goblin',
      'Goblin Espectral': 'goblin', 'Goblin Infernal': 'goblin', 'Goblin Cósmico': 'goblin', 'Goblin Vulkanista': 'goblin',
      'Lobo Nublido': 'wolf', 'Lobo de Gelo': 'wolf', 'Unicórnio Negro': 'wolf',
      'Elemental de Fogo': 'elemental', 'Elemental Glacial': 'elemental', 'Elemental de Gelo': 'elemental', 'Elemental de Lava': 'elemental',
      'Golem de Ébano': 'golem', 'Golem de Magma': 'golem', 'Golem de Gelo': 'golem', 'Golem Abissal': 'golem', 'Golem Dourado': 'golem',
      'Golem de Ossos': 'golem', 'Golem Ígneo': 'golem', 'Golem Dimensional': 'golem', 'Golem Sombrio': 'golem', 'Golem de Obsidiana': 'golem',
      'Drake de Fogo': 'dragon', 'Fênix Menor': 'dragon', 'Drake Ancião': 'dragon', 'Balrog Jovem': 'dragon', 'Balrog Supremo': 'dragon',
      'Espírito Errante': 'ghost', 'Espírito Puro': 'ghost', 'Espectro Sombrio': 'ghost', 'Fragmento Vivo': 'ghost', 'Súcubo Júnior': 'ghost',
      'Súcubo Anciã': 'ghost', 'Anjo Caído': 'ghost', 'Serafim Destruido': 'ghost', 'Serafim Corrompido': 'ghost', 'Morte-Viva': 'ghost',
      'Cobra Negra': 'snake', 'Serpente Glacial': 'snake', 'Serpente de Fogo': 'snake', 'Serpente Abissal': 'snake', 'Hidra Jovem': 'snake',
      'Pinguinho Rebelde': 'slime', 'Brasa Viva': 'slime', 'Éter Jovem': 'slime', 'Paradoxo Cambiante': 'slime', 'Éter Ancião': 'slime',
      'Peixe-Lanterna': 'eye', 'Medusa Profunda': 'eye', 'Cometa Vivo': 'eye', 'Void Stalker': 'eye', 'Aberração': 'eye',
      'Salamandra': 'mushroom', 'Múmia Enrolada': 'skeleton', 'Vampirinho': 'bat', 'Zumbi Cambaleante': 'skeleton',
      'Diabinho': 'goblin', 'Demônio Menor': 'goblin', 'Incubiço': 'ghost', 'Cavaleiro Maldito': 'skeleton',
      'Riftling': 'ghost', 'Quimera Cósmica': 'dragon', 'Kraken Menor': 'spider', 'Polvo Sombrio': 'snake',
      'Engolidor': 'mimic', 'Leviatã Bebê': 'snake', 'Yeti Bebê': 'golem', 'Harpia Gelada': 'bat',
      'Lagarto Ígneo': 'dragon', 'Escorpione Ardente': 'spider',
      'Querubim Rebelde': 'bat', 'Grifo Sagrado': 'dragon',
      // Bosses
      'Lorde das Sombras': 'ghost', 'Senhor Vulcânico': 'dragon', 'Rei do Gelo Eterno': 'golem',
      'Titã do Abismo': 'snake', 'Arcanjo Exilado': 'ghost', 'Lich Supremo': 'skeleton',
      'Arquidiabo': 'dragon', 'Senhor do Vazio': 'eye',
      'Dragão Esquelético Necromante': 'dragon',
    };
    return map[name] || 'slime';
  };

  const themeColors: Record<string, string> = {
    'Trevas': '#a78bfa', 'Vulcânica': '#f87171', 'Glacial': '#38bdf8',
    'Abismo': '#818cf8', 'Celestial': '#fbbf24', 'Cripta': '#34d399',
    'Infernal': '#fb923c', 'Dimensional': '#c084fc',
  };

  const themeEmojis: Record<string, string> = {
    'Trevas': '🌑', 'Vulcânica': '🌋', 'Glacial': '❄️',
    'Abismo': '🕳️', 'Celestial': '✨', 'Cripta': '⚰️',
    'Infernal': '🔥', 'Dimensional': '🌀',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}>
      <div className="w-full max-w-4xl h-[90vh] flex flex-col rounded-2xl overflow-hidden animate-fade-in" style={{ background: 'linear-gradient(180deg, #0c0c1a 0%, #0a0a15 100%)', border: '1px solid rgba(167,139,250,0.15)' }}>

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/[0.06]" style={{ background: 'rgba(167,139,250,0.05)' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">📖</span>
            <div>
              <h2 className="text-lg font-black" style={{ background: 'linear-gradient(135deg, #a78bfa, #f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Monster Dex
              </h2>
              <div className="text-[10px] text-[#475569]">
                {collectionStats.discovered}/{collectionStats.total} monstros · {collectionStats.percentage}%
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Collection Bonuses */}
            <div className="flex gap-2 text-[9px]">
              {collectionBonuses.dpsBonus > 0 && (
                <span className="px-2 py-1 rounded-lg" style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' }}>
                  ⚔️ +{collectionBonuses.dpsBonus.toFixed(1)}% DPS
                </span>
              )}
              {collectionBonuses.goldBonus > 0 && (
                <span className="px-2 py-1 rounded-lg" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}>
                  🪙 +{collectionBonuses.goldBonus.toFixed(1)}% Ouro
                </span>
              )}
              {collectionBonuses.critChanceBonus > 0 && (
                <span className="px-2 py-1 rounded-lg" style={{ background: 'rgba(168,85,247,0.1)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.2)' }}>
                  💥 +{collectionBonuses.critChanceBonus.toFixed(1)}% Crítico
                </span>
              )}
              {collectionBonuses.manaBonus > 0 && (
                <span className="px-2 py-1 rounded-lg" style={{ background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' }}>
                  💎 +{collectionBonuses.manaBonus.toFixed(1)}% Mana
                </span>
              )}
            </div>
            <button onClick={onClose} className="btn-ghost text-[11px] px-3 py-1.5">✕ Fechar</button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="px-6 py-2 flex gap-2 border-b border-white/[0.04]">
          {([
            { id: 'monsters' as DexTab, icon: '👾', label: 'Monstros' },
            { id: 'bosses' as DexTab, icon: '💀', label: 'Bosses' },
            { id: 'rare' as DexTab, icon: '✨', label: 'Raros' },
          ]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${activeTab === tab.id ? 'text-white' : 'text-[#475569] hover:text-[#64748b]'}`}
              style={activeTab === tab.id ? { background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.25)' } : { background: 'transparent', border: '1px solid transparent' }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-6">

          {/* ===== MONSTERS TAB ===== */}
          {activeTab === 'monsters' && (
            <div className="space-y-4">
              {/* Theme Selector */}
              <div className="flex gap-2 flex-wrap">
                {DUNGEON_THEMES.map((theme, i) => {
                  const unlocked = i < highestDungeon;
                  return (
                    <button
                      key={theme.name}
                      onClick={() => { setSelectedTheme(i); setSelectedMonster(null); }}
                      className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all ${selectedTheme === i ? 'text-white' : unlocked ? 'text-[#64748b] hover:text-[#94a3b8]' : 'text-[#334155] opacity-50'}`}
                      style={selectedTheme === i ? { background: `${themeColors[theme.name]}22`, border: `1px solid ${themeColors[theme.name]}44` } : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      {theme.emoji} {unlocked ? theme.name : '🔒 ???'}
                    </button>
                  );
                })}
              </div>

              {/* Rarity Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-[#475569] font-medium">Filtrar:</span>
                {[
                  { id: 'all', label: 'Todos', color: '#94a3b8' },
                  { id: 'common', label: 'Comum', color: RARITY_COLORS.common },
                  { id: 'uncommon', label: 'Incomum', color: RARITY_COLORS.uncommon },
                  { id: 'rare', label: 'Raro', color: RARITY_COLORS.rare },
                  { id: 'boss', label: 'Boss', color: RARITY_COLORS.boss },
                  { id: 'legendary', label: 'Lendário', color: RARITY_COLORS.legendary },
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => { setRarityFilter(filter.id); setSelectedMonster(null); }}
                    className={`px-2 py-1 rounded-lg text-[9px] font-bold transition-all ${rarityFilter === filter.id ? 'text-white' : 'text-[#475569] hover:text-[#64748b]'}`}
                    style={rarityFilter === filter.id ? { background: `${filter.color}22`, border: `1px solid ${filter.color}44`, color: filter.color } : { background: 'transparent', border: '1px solid transparent' }}
                  >
                    {filter.label}
                  </button>
                ))}
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => { setSortByTheme(!sortByTheme); setSelectedMonster(null); }}
                    className={`px-2 py-1 rounded-lg text-[9px] font-bold transition-all ${sortByTheme ? 'text-[#a78bfa]' : 'text-[#475569]'}`}
                    style={sortByTheme ? { background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.25)' } : { background: 'transparent', border: '1px solid transparent' }}
                  >
                    📋 {sortByTheme ? 'Por Dungeon' : 'Por Nome'}
                  </button>
                </div>
              </div>

              {!isUnlocked ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-3">🔒</div>
                  <div className="text-sm text-[#475569]">Chegue à Dungeon {selectedTheme + 1} para desbloquear</div>
                </div>
              ) : (
                <>
                  {/* Theme Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{themeEmojis[themeName]}</span>
                    <div>
                      <h3 className="text-sm font-black" style={{ color: themeColors[themeName] }}>{themeName}</h3>
                      <div className="text-[10px] text-[#475569]">{allMonsters.length} monstros · {discoveredCount} descobertos</div>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full" style={{ background: i < Math.min(10, discoveredCount) ? themeColors[themeName] : 'rgba(255,255,255,0.05)' }} />
                      ))}
                    </div>
                  </div>

                  {/* Monster Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {allMonsters
                      .filter(monster => {
                        const collectionEntry = Object.values(MONSTER_COLLECTION).find(e => e.name === monster.name);
                        if (rarityFilter === 'all') return true;
                        if (!collectionEntry) return rarityFilter === 'common';
                        return collectionEntry.rarity === rarityFilter;
                      })
                      .map((monster, idx) => {
                      const collectionEntry = Object.values(MONSTER_COLLECTION).find(e => e.name === monster.name);
                      const isDiscovered = collectionEntry ? monsterCollection.includes(collectionEntry.id) : false;
                      const spriteKey = getSpriteKey(monster.name);
                      const isSelected = selectedMonster?.name === monster.name;
                      const rarity = collectionEntry?.rarity || 'common';

                      return (
                        <button
                          key={monster.name}
                          onClick={() => setSelectedMonster(isSelected ? null : { ...monster, theme: themeName, isBoss: false, spriteKey })}
                          className={`p-3 rounded-xl text-left transition-all ${isSelected ? 'ring-2' : 'hover:bg-white/[0.03]'}`}
                          style={{
                            background: isSelected ? `${themeColors[themeName]}11` : 'rgba(255,255,255,0.02)',
                            border: `1px solid ${isDiscovered ? RARITY_COLORS[rarity] + '44' : isSelected ? themeColors[themeName] + '44' : 'rgba(255,255,255,0.05)'}`,
                            opacity: isDiscovered ? 1 : 0.3,
                            filter: isDiscovered ? 'none' : 'grayscale(1)',
                          }}
                        >
                          <div className="flex justify-center mb-2">
                            {isDiscovered ? (
                              <MonsterSprite monsterType={spriteKey} size={48} animate={isSelected} />
                            ) : (
                              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: 'rgba(255,255,255,0.03)' }}>❓</div>
                            )}
                          </div>
                          <div className="text-[10px] font-bold text-center truncate" style={{ color: isDiscovered ? RARITY_COLORS[rarity] : '#334155' }}>
                            {isDiscovered ? monster.name : '???'}
                          </div>
                          <div className="text-[9px] text-center mt-0.5" style={{ color: isDiscovered ? '#475569' : '#222' }}>
                            {isDiscovered ? RARITY_LABELS[rarity] : '#???'}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Monster Detail */}
                  {selectedMonster && (
                    <div className="mt-4 p-4 rounded-xl animate-fade-in" style={{ background: `${themeColors[themeName]}08`, border: `1px solid ${themeColors[themeName]}22` }}>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-xl flex items-center justify-center" style={{ background: `${themeColors[themeName]}11`, border: `1px solid ${themeColors[themeName]}22` }}>
                            <MonsterSprite monsterType={selectedMonster.spriteKey} size={64} animate={true} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-black" style={{ color: themeColors[themeName] }}>{selectedMonster.name}</h4>
                          <p className="text-[11px] text-[#94a3b8] mt-1 leading-relaxed">{selectedMonster.description}</p>
                          <p className="text-[10px] text-[#64748b] mt-2 italic">💭 {selectedMonster.funFact}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ===== BOSSES TAB ===== */}
          {activeTab === 'bosses' && (
            <div className="space-y-4">
              <div className="text-[11px] text-[#475569] mb-4">Cada dungeon tem um boss épico no stage 10!</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DUNGEON_THEMES.map((theme, i) => {
                  const unlocked = i < highestDungeon;
                  const bossData = BOSS_NAMES[theme.name] || BOSS_NAMES[theme.name + '_Special'];
                  const isCripta = theme.name === 'Cripta';

                  return (
                    <div
                      key={theme.name}
                      className="p-4 rounded-xl transition-all"
                      style={{
                        background: unlocked ? `${themeColors[theme.name]}08` : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${unlocked ? themeColors[theme.name] + '22' : 'rgba(255,255,255,0.05)'}`,
                        opacity: unlocked ? 1 : 0.3,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: `${themeColors[theme.name]}11`, border: `1px solid ${themeColors[theme.name]}22` }}>
                          {unlocked ? (
                            isCripta ? (
                              <BossSpriteNew themeId="Cripta" size={52} animate={false} />
                            ) : (
                              <BossSpriteNew themeId={theme.name} size={52} animate={false} />
                            )
                          ) : (
                            <span className="text-2xl">🔒</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{theme.emoji}</span>
                            <span className="text-[10px] font-bold" style={{ color: themeColors[theme.name] }}>{theme.name}</span>
                          </div>
                          <div className="text-[12px] font-black text-[#f1f5f9] mt-1">
                            {unlocked ? bossData?.name : '???'}
                          </div>
                          <div className="text-[10px] text-[#64748b] italic">
                            {unlocked ? bossData?.title : 'Derrote o boss para desbloquear'}
                          </div>
                        </div>
                      </div>
                      {unlocked && bossData?.description && (
                        <p className="text-[10px] text-[#475569] mt-3 leading-relaxed">{bossData.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== RARE TAB ===== */}
          {activeTab === 'rare' && (
            <div className="space-y-4">
              <div className="text-[11px] text-[#475569] mb-4">Monstros raros que aparecem com baixa chance durante a batalha!</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RARE_MONSTERS.map((monster) => {
                  const spriteKey = getSpriteKey(monster.name);
                  return (
                    <div
                      key={monster.id}
                      className="p-4 rounded-xl"
                      style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.15)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
                          <MonsterSprite monsterType={spriteKey} size={52} animate={false} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-black text-[#fbbf24]">{monster.name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>Raro</span>
                          </div>
                          <p className="text-[10px] text-[#94a3b8] mt-1">{monster.description}</p>
                          <div className="flex gap-3 mt-2 text-[9px] text-[#64748b]">
                            <span>❤️ ×{monster.hpMultiplier}</span>
                            <span>⚔️ ×{monster.damageMultiplier}</span>
                            <span>🪙 ×{monster.goldDrop}</span>
                            {monster.manaDrop > 0 && <span>💎 ×{monster.manaDrop}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="px-6 py-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-[#475569]">
          <span>📖 {collectionStats.discovered}/{collectionStats.total} monstros descobertos</span>
          <div className="flex gap-3">
            <span>⚔️ +{collectionBonuses.dpsBonus.toFixed(1)}% DPS</span>
            <span>🪙 +{collectionBonuses.goldBonus.toFixed(1)}% Ouro</span>
            <span>💥 +{collectionBonuses.critChanceBonus.toFixed(1)}% Crítico</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonsterDex;
