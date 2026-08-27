import { HeroDef, ManaUpgradeDef, DungeonThemeDef, DungeonTheme } from '../types';

// ========== HERO DEFINITIONS ==========
export const HERO_DEFS: HeroDef[] = [
  { id: 'warrior', name: 'Guerreiro', icon: '⚔️', sprite: '/sprites/heroes/warrior.png', baseDmg: 10, baseHp: 200, baseCost: 10, unlockThreshold: 0, color: '#f59e0b' },
  { id: 'archer', name: 'Arqueira', icon: '🏹', baseDmg: 50, baseHp: 120, baseCost: 150, unlockThreshold: 45, color: '#10b981' },
  { id: 'mage', name: 'Mago', icon: '🔮', baseDmg: 250, baseHp: 80, baseCost: 1000, unlockThreshold: 300, color: '#8b5cf6' },
  { id: 'paladin', name: 'Paladino', icon: '🛡️', baseDmg: 1500, baseHp: 350, baseCost: 8000, unlockThreshold: 2400, color: '#3b82f6' },
  { id: 'healer', name: 'Curandeiro', icon: '💚', baseDmg: 5000, baseHp: 150, baseCost: 5000, unlockThreshold: 3000, color: '#22c55e' },
  { id: 'assassin', name: 'Assassino', icon: '🗡️', baseDmg: 10000, baseHp: 100, baseCost: 50000, unlockThreshold: 15000, color: '#ef4444' },
  { id: 'necromancer', name: 'Necromante', icon: '💀', sprite: '/sprites/heroes/necromancer.png', baseDmg: 75000, baseHp: 60, baseCost: 350000, unlockThreshold: 105000, color: '#a855f7' },
];

// ========== DUNGEON THEMES ==========
export const DUNGEON_THEMES: DungeonThemeDef[] = [
  { name: 'Trevas', emoji: '🌑', bgClass: 'from-gray-900 via-purple-950 to-black', accentColor: '#6b21a8' },
  { name: 'Vulcânica', emoji: '🌋', bgClass: 'from-red-950 via-orange-950 to-black', accentColor: '#dc2626' },
  { name: 'Glacial', emoji: '❄️', bgClass: 'from-blue-950 via-cyan-950 to-black', accentColor: '#0ea5e9' },
  { name: 'Abismo', emoji: '🕳️', bgClass: 'from-slate-950 via-indigo-950 to-black', accentColor: '#4f46e5' },
  { name: 'Celestial', emoji: '✨', bgClass: 'from-indigo-950 via-yellow-950 to-black', accentColor: '#eab308' },
  { name: 'Cripta', emoji: '⚰️', bgClass: 'from-stone-950 via-emerald-950 to-black', accentColor: '#059669' },
  { name: 'Infernal', emoji: '🔥', bgClass: 'from-red-950 via-amber-950 to-black', accentColor: '#f97316' },
  { name: 'Dimensional', emoji: '🌀', bgClass: 'from-violet-950 via-fuchsia-950 to-black', accentColor: '#d946ef' },
];

// ========== ENEMY NAMES PER THEME ==========
export const ENEMY_NAMES: Record<DungeonTheme, { mobs: string[]; boss: string }> = {
  'Trevas': {
    mobs: ['Sombra Rastejante', 'Goblin das Trevas', 'Lobo Nublido', 'Oculto Negro', 'Morcego Sombrio', 'Araknis Noturno', 'Espírito Errante', 'Cobra Negra', 'Golem de Ébano'],
    boss: 'Lorde das Sombras',
  },
  'Vulcânica': {
    mobs: ['Lagarto Ígneo', 'Goblin de Lava', 'Salamandra', 'Elemental de Fogo', 'Brasa Viva', 'Escorpione Ardente', 'Golem de Magma', 'Fênix Menor', 'Drake de Fogo'],
    boss: 'Senhor Vulcânico',
  },
  'Glacial': {
    mobs: ['Yeti Bebê', 'Lobo de Gelo', 'Elemental Glacial', 'Goblin de Gelo', 'Pinguinho Rebelde', 'Aranha de Frio', 'Golem de Gelo', 'Harpia Gelada', 'Serpente Glacial'],
    boss: 'Rei do Gelo Eterno',
  },
  'Abismo': {
    mobs: ['Peixe-Lanterna', 'Goblin Abissal', 'Kraken Menor', 'Polvo Sombrio', 'Engolidor', 'Hidra Jovem', 'Golem Abissal', 'Medusa Profunda', 'Leviatã Bebê'],
    boss: 'Titã do Abismo',
  },
  'Celestial': {
    mobs: ['Anjo Caído', 'Serafim Destruido', 'Querubim Rebelde', 'Goblin Celeste', 'Espírito Puro', 'Cometa Vivo', 'Golem Dourado', 'Grifo Sagrado', 'Unicórnio Negro'],
    boss: 'Arcanjo Exilado',
  },
  'Cripta': {
    mobs: ['Esqueleto Velho', 'Zumbi Cambaleante', 'Morte-Viva', 'Goblin Espectral', 'Múmia Enrolada', 'Wraith Jovem', 'Golem de Ossos', 'Vampirinho', 'Espectro Sombrio'],
    boss: 'Lich Supremo',
  },
  'Infernal': {
    mobs: ['Diabinho', 'Goblin Infernal', 'Demônio Menor', 'Súcubo Júnior', 'Incubiço', 'Golem Ígneo', 'Balrog Jovem', 'Pit Fiend Jr.', 'Cavaleiro Maldito'],
    boss: 'Arquidiabo',
  },
  'Dimensional': {
    mobs: ['Riftling', 'Goblin Cósmico', 'Fragmento Vivo', 'Void Stalker', 'Éter Jovem', 'Golem Dimensional', 'Quimera Cósmica', 'Aberração', 'Paradoxo Cambiante'],
    boss: 'Senhor do Vazio',
  },
};

// ========== MANA UPGRADES ==========
export const MANA_UPGRADES: ManaUpgradeDef[] = [
  {
    id: 'arcane_power',
    name: 'Poder Arcano',
    icon: '💪',
    description: '+10% Dano Global',
    baseCost: 5,
    costScale: 1.5,
    effect: (level) => 1 + level * 0.10,
    effectLabel: (level) => `+${level * 10}% Dano`,
  },
  {
    id: 'midas_touch',
    name: 'Toque de Midas',
    icon: '🪙',
    description: '+10% Ouro Global',
    baseCost: 5,
    costScale: 1.5,
    effect: (level) => 1 + level * 0.10,
    effectLabel: (level) => `+${level * 10}% Ouro`,
  },
];

// ========== SPRITE HELPERS ==========
export const BOSS_SPRITES: Record<DungeonTheme, string> = {
  'Trevas': '👻',
  'Vulcânica': '🐉',
  'Glacial': '🧊',
  'Abismo': '🐙',
  'Celestial': '👼',
  'Cripta': '💀',
  'Infernal': '😈',
  'Dimensional': '🌀',
};

export const MOB_SPRITES: string[] = ['🦇', '🕷️', '🐍', '🐀', '🧟', '👹', '🧛', '🦴', '🦂'];
