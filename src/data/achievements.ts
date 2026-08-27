// ==========================================
// SISTEMA DE CONQUISTAS — Dungeon Idle Conquest
// ==========================================

export type AchievementCategory = 'kills' | 'dungeons' | 'gold' | 'mana' | 'heroes' | 'items' | 'prestige' | 'special';

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  condition: string;
  conditionValue: number;
  conditionType: 'totalKills' | 'totalBossKills' | 'completedDungeons' | 'highestDungeon' | 'totalGoldEarned' | 'totalManaEarned' | 'heroLevel' | 'totalItems' | 'totalCrits' | 'ascensions' | 'totalSkillPoints';
  reward: AchievementReward;
  hidden: boolean; // secreta até ser desbloqueada
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}

export interface AchievementReward {
  type: 'gold' | 'mana' | 'skillPoints' | 'prestigePoints' | 'pet' | 'title';
  amount: number;
  petId?: string;
  title?: string;
}

export interface AchievementState {
  id: string;
  unlocked: boolean;
  unlockedAt?: number;
  notified: boolean;
}

// ========== DEFINIÇÃO DAS CONQUISTAS ==========

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  // ===== CONQUISTAS DE KILLS =====
  {
    id: 'first_blood',
    name: 'Primeiro Sangue',
    description: 'Derrote seu primeiro monstro',
    icon: '⚔️',
    category: 'kills',
    condition: 'Derrote 1 monstro',
    conditionValue: 1,
    conditionType: 'totalKills',
    reward: { type: 'gold', amount: 50 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'monster_hunter',
    name: 'Caçador de Monstros',
    description: 'Derrote 100 monstros',
    icon: '🗡️',
    category: 'kills',
    condition: 'Derrote 100 monstros',
    conditionValue: 100,
    conditionType: 'totalKills',
    reward: { type: 'gold', amount: 500 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'slayer',
    name: 'Destruidor',
    description: 'Derrote 1.000 monstros',
    icon: '💀',
    category: 'kills',
    condition: 'Derrote 1.000 monstros',
    conditionValue: 1000,
    conditionType: 'totalKills',
    reward: { type: 'mana', amount: 5 },
    hidden: false,
    tier: 'silver',
  },
  {
    id: 'monster_exterminator',
    name: 'Exterminador',
    description: 'Derrote 10.000 monstros',
    icon: '🔥',
    category: 'kills',
    condition: 'Derrote 10.000 monstros',
    conditionValue: 10000,
    conditionType: 'totalKills',
    reward: { type: 'mana', amount: 20 },
    hidden: false,
    tier: 'gold',
  },
  {
    id: 'legendary_slayer',
    name: 'Destruidor Lendário',
    description: 'Derrote 100.000 monstros',
    icon: '👑',
    category: 'kills',
    condition: 'Derrote 100.000 monstros',
    conditionValue: 100000,
    conditionType: 'totalKills',
    reward: { type: 'pet', amount: 1, petId: 'golden_scarab' },
    hidden: false,
    tier: 'diamond',
  },
  {
    id: 'boss_slayer',
    name: 'Matador de Chefes',
    description: 'Derrote 10 chefes',
    icon: '👹',
    category: 'kills',
    condition: 'Derrote 10 chefes',
    conditionValue: 10,
    conditionType: 'totalBossKills',
    reward: { type: 'skillPoints', amount: 2 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'boss_hunter',
    name: 'Caçador de Chefes',
    description: 'Derrote 50 chefes',
    icon: '🏆',
    category: 'kills',
    condition: 'Derrote 50 chefes',
    conditionValue: 50,
    conditionType: 'totalBossKills',
    reward: { type: 'mana', amount: 15 },
    hidden: false,
    tier: 'silver',
  },
  {
    id: 'boss_exterminator',
    name: 'Exterminador de Chefes',
    description: 'Derrote 200 chefes',
    icon: '⚡',
    category: 'kills',
    condition: 'Derrote 200 chefes',
    conditionValue: 200,
    conditionType: 'totalBossKills',
    reward: { type: 'pet', amount: 1, petId: 'shadow_wolf' },
    hidden: false,
    tier: 'gold',
  },

  // ===== CONQUISTAS DE DUNGEONS =====
  {
    id: 'first_dungeon',
    name: 'Primeira Dungeon',
    description: 'Complete sua primeira dungeon',
    icon: '🏰',
    category: 'dungeons',
    condition: 'Complete 1 dungeon',
    conditionValue: 1,
    conditionType: 'completedDungeons',
    reward: { type: 'gold', amount: 200 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'dungeon_explorer',
    name: 'Explorador',
    description: 'Complete 10 dungeons',
    icon: '🗺️',
    category: 'dungeons',
    condition: 'Complete 10 dungeons',
    conditionValue: 10,
    conditionType: 'completedDungeons',
    reward: { type: 'mana', amount: 10 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'dungeon_master',
    name: 'Mestre das Dungeons',
    description: 'Complete 50 dungeons',
    icon: '🗝️',
    category: 'dungeons',
    condition: 'Complete 50 dungeons',
    conditionValue: 50,
    conditionType: 'completedDungeons',
    reward: { type: 'skillPoints', amount: 5 },
    hidden: false,
    tier: 'silver',
  },
  {
    id: 'dungeon_legend',
    name: 'Lenda das Dungeons',
    description: 'Complete 200 dungeons',
    icon: '🌟',
    category: 'dungeons',
    condition: 'Complete 200 dungeons',
    conditionValue: 200,
    conditionType: 'completedDungeons',
    reward: { type: 'pet', amount: 1, petId: 'treasure_mimic' },
    hidden: false,
    tier: 'gold',
  },
  {
    id: 'dungeon_god',
    name: 'Deus das Dungeons',
    description: 'Complete 500 dungeons',
    icon: '✨',
    category: 'dungeons',
    condition: 'Complete 500 dungeons',
    conditionValue: 500,
    conditionType: 'completedDungeons',
    reward: { type: 'prestigePoints', amount: 10 },
    hidden: false,
    tier: 'platinum',
  },
  {
    id: 'reach_dungeon_5',
    name: 'Aventureiro',
    description: 'Alcance a dungeon 5',
    icon: '🥾',
    category: 'dungeons',
    condition: 'Alcance a dungeon 5',
    conditionValue: 5,
    conditionType: 'highestDungeon',
    reward: { type: 'gold', amount: 300 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'reach_dungeon_10',
    name: 'Veterano',
    description: 'Alcance a dungeon 10',
    icon: '⚔️',
    category: 'dungeons',
    condition: 'Alcance a dungeon 10',
    conditionValue: 10,
    conditionType: 'highestDungeon',
    reward: { type: 'mana', amount: 15 },
    hidden: false,
    tier: 'silver',
  },
  {
    id: 'reach_dungeon_25',
    name: 'Lenda Viva',
    description: 'Alcance a dungeon 25',
    icon: '🏆',
    category: 'dungeons',
    condition: 'Alcance a dungeon 25',
    conditionValue: 25,
    conditionType: 'highestDungeon',
    reward: { type: 'skillPoints', amount: 10 },
    hidden: false,
    tier: 'gold',
  },
  {
    id: 'reach_dungeon_50',
    name: 'Mito',
    description: 'Alcance a dungeon 50',
    icon: '👑',
    category: 'dungeons',
    condition: 'Alcance a dungeon 50',
    conditionValue: 50,
    conditionType: 'highestDungeon',
    reward: { type: 'pet', amount: 1, petId: 'phoenix' },
    hidden: false,
    tier: 'diamond',
  },

  // ===== CONQUISTAS DE OURO =====
  {
    id: 'first_gold',
    name: 'Primeiras Moedas',
    description: 'Acumule 100 ouro',
    icon: '🪙',
    category: 'gold',
    condition: 'Acumule 100 ouro',
    conditionValue: 100,
    conditionType: 'totalGoldEarned',
    reward: { type: 'gold', amount: 50 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'gold_hoarder',
    name: 'Coletor de Ouro',
    description: 'Acumule 10.000 ouro',
    icon: '💰',
    category: 'gold',
    condition: 'Acumule 10.000 ouro',
    conditionValue: 10000,
    conditionType: 'totalGoldEarned',
    reward: { type: 'gold', amount: 1000 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'gold_magnate',
    name: 'Magnata do Ouro',
    description: 'Acumule 1.000.000 de ouro',
    icon: '💎',
    category: 'gold',
    condition: 'Acumule 1.000.000 de ouro',
    conditionValue: 1000000,
    conditionType: 'totalGoldEarned',
    reward: { type: 'mana', amount: 25 },
    hidden: false,
    tier: 'silver',
  },
  {
    id: 'gold_king',
    name: 'Rei do Ouro',
    description: 'Acumule 100.000.000 de ouro',
    icon: '👑',
    category: 'gold',
    condition: 'Acumule 100.000.000 de ouro',
    conditionValue: 100000000,
    conditionType: 'totalGoldEarned',
    reward: { type: 'pet', amount: 1, petId: 'angel' },
    hidden: false,
    tier: 'platinum',
  },
  {
    id: 'gold_god',
    name: 'Deus do Ouro',
    description: 'Acumule 10.000.000.000 de ouro',
    icon: '🌟',
    category: 'gold',
    condition: 'Acumule 10.000.000.000 de ouro',
    conditionValue: 10000000000,
    conditionType: 'totalGoldEarned',
    reward: { type: 'prestigePoints', amount: 15 },
    hidden: false,
    tier: 'diamond',
  },

  // ===== CONQUISTAS DE MANA =====
  {
    id: 'first_mana',
    name: 'Primeira Essência',
    description: 'Colete 5 mana',
    icon: '💎',
    category: 'mana',
    condition: 'Colete 5 mana',
    conditionValue: 5,
    conditionType: 'totalManaEarned',
    reward: { type: 'mana', amount: 3 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'mana_collector',
    name: 'Coletor de Mana',
    description: 'Colete 50 mana',
    icon: '🔮',
    category: 'mana',
    condition: 'Colete 50 mana',
    conditionValue: 50,
    conditionType: 'totalManaEarned',
    reward: { type: 'skillPoints', amount: 3 },
    hidden: false,
    tier: 'silver',
  },
  {
    id: 'mana_master',
    name: 'Mestre da Mana',
    description: 'Colete 500 mana',
    icon: '✨',
    category: 'mana',
    condition: 'Colete 500 mana',
    conditionValue: 500,
    conditionType: 'totalManaEarned',
    reward: { type: 'pet', amount: 1, petId: 'spirit_wisp' },
    hidden: false,
    tier: 'gold',
  },
  {
    id: 'mana_god',
    name: 'Deus da Mana',
    description: 'Colete 5.000 mana',
    icon: '🌌',
    category: 'mana',
    condition: 'Colete 5.000 mana',
    conditionValue: 5000,
    conditionType: 'totalManaEarned',
    reward: { type: 'prestigePoints', amount: 20 },
    hidden: false,
    tier: 'diamond',
  },

  // ===== CONQUISTAS DE HERÓIS =====
  {
    id: 'first_hero',
    name: 'Primeiro Herói',
    description: 'Desbloqueie seu primeiro herói',
    icon: '🦸',
    category: 'heroes',
    condition: 'Desbloqueie 1 herói',
    conditionValue: 1,
    conditionType: 'heroLevel',
    reward: { type: 'gold', amount: 100 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'hero_team',
    name: 'Equipe Completa',
    description: 'Tenha todos os heróis desbloqueados',
    icon: '👥',
    category: 'heroes',
    condition: 'Desbloqueie todos os heróis',
    conditionValue: 7,
    conditionType: 'heroLevel',
    reward: { type: 'mana', amount: 30 },
    hidden: false,
    tier: 'gold',
  },
  {
    id: 'hero_level_10',
    name: 'Herói Experiente',
    description: 'Alcance nível 10 com qualquer herói',
    icon: '📈',
    category: 'heroes',
    condition: 'Alcance nível 10',
    conditionValue: 10,
    conditionType: 'heroLevel',
    reward: { type: 'skillPoints', amount: 2 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'hero_level_50',
    name: 'Herói Lendário',
    description: 'Alcance nível 50 com qualquer herói',
    icon: '⭐',
    category: 'heroes',
    condition: 'Alcance nível 50',
    conditionValue: 50,
    conditionType: 'heroLevel',
    reward: { type: 'pet', amount: 1, petId: 'dragon_whelp' },
    hidden: false,
    tier: 'platinum',
  },

  // ===== CONQUISTAS DE ITENS =====
  {
    id: 'first_item',
    name: 'Primeiro Item',
    description: 'Colete seu primeiro item',
    icon: '📦',
    category: 'items',
    condition: 'Colete 1 item',
    conditionValue: 1,
    conditionType: 'totalItems',
    reward: { type: 'gold', amount: 50 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'collector',
    name: 'Colecionador',
    description: 'Colete 50 itens',
    icon: '🎒',
    category: 'items',
    condition: 'Colete 50 itens',
    conditionValue: 50,
    conditionType: 'totalItems',
    reward: { type: 'gold', amount: 2000 },
    hidden: false,
    tier: 'silver',
  },
  {
    id: 'hoarder',
    name: 'Acumulador',
    description: 'Colete 200 itens',
    icon: '🏰',
    category: 'items',
    condition: 'Colete 200 itens',
    conditionValue: 200,
    conditionType: 'totalItems',
    reward: { type: 'mana', amount: 15 },
    hidden: false,
    tier: 'gold',
  },

  // ===== CONQUISTAS DE PRESTIGE =====
  {
    id: 'first_ascension',
    name: 'Primeira Ascensão',
    description: 'Realize sua primeira ascensão',
    icon: '🔄',
    category: 'prestige',
    condition: 'Ascenda 1 vez',
    conditionValue: 1,
    conditionType: 'ascensions',
    reward: { type: 'prestigePoints', amount: 5 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'ascension_master',
    name: 'Mestre da Ascensão',
    description: 'Realize 10 ascensões',
    icon: '🌟',
    category: 'prestige',
    condition: 'Ascenda 10 vezes',
    conditionValue: 10,
    conditionType: 'ascensions',
    reward: { type: 'prestigePoints', amount: 25 },
    hidden: false,
    tier: 'silver',
  },
  {
    id: 'ascension_god',
    name: 'Deus da Ascensão',
    description: 'Realize 50 ascensões',
    icon: '🌌',
    category: 'prestige',
    condition: 'Ascenda 50 vezes',
    conditionValue: 50,
    conditionType: 'ascensions',
    reward: { type: 'pet', amount: 1, petId: 'void_walker' },
    hidden: false,
    tier: 'diamond',
  },

  // ===== CONQUISTAS ESPECIAIS =====
  {
    id: 'critical_master',
    name: 'Mestre do Crítico',
    description: 'Acerte 1.000 críticos',
    icon: '🎯',
    category: 'special',
    condition: 'Acerte 1.000 críticos',
    conditionValue: 1000,
    conditionType: 'totalCrits',
    reward: { type: 'skillPoints', amount: 5 },
    hidden: false,
    tier: 'silver',
  },
  {
    id: 'skill_master',
    name: 'Mestre das Habilidades',
    description: 'Gaste 50 pontos de habilidade',
    icon: '⭐',
    category: 'special',
    condition: 'Gaste 50 pontos de habilidade',
    conditionValue: 50,
    conditionType: 'totalSkillPoints',
    reward: { type: 'mana', amount: 20 },
    hidden: false,
    tier: 'gold',
  },
  {
    id: 'secret_achievement',
    name: '🏆 Conquista Secreta',
    description: 'Você encontrou uma conquista secreta!',
    icon: '❓',
    category: 'special',
    condition: '???',
    conditionValue: 999999,
    conditionType: 'totalKills',
    reward: { type: 'pet', amount: 1, petId: 'time_relic' },
    hidden: true,
    tier: 'diamond',
  },
];

// ========== FUNÇÕES UTILITÁRIAS ==========

export function getAchievementsByCategory(category: AchievementCategory): AchievementDef[] {
  return ACHIEVEMENT_DEFS.filter(a => a.category === category);
}

export function getAchievementById(id: string): AchievementDef | undefined {
  return ACHIEVEMENT_DEFS.find(a => a.id === id);
}

export function checkAchievement(achievement: AchievementDef, gameState: {
  totalKills: number;
  totalBossKills: number;
  completedDungeons: number;
  highestDungeon: number;
  totalGoldEarned: number;
  totalManaEarned: number;
  heroes: { id: string; level: number }[];
  inventory: { items: any[] };
  crit: { totalCrits: number };
  prestige: { ascensions: number };
  skillPoints: number;
}): boolean {
  switch (achievement.conditionType) {
    case 'totalKills':
      return gameState.totalKills >= achievement.conditionValue;
    case 'totalBossKills':
      return gameState.totalBossKills >= achievement.conditionValue;
    case 'completedDungeons':
      return gameState.completedDungeons >= achievement.conditionValue;
    case 'highestDungeon':
      return gameState.highestDungeon >= achievement.conditionValue;
    case 'totalGoldEarned':
      return gameState.totalGoldEarned >= achievement.conditionValue;
    case 'totalManaEarned':
      return gameState.totalManaEarned >= achievement.conditionValue;
    case 'heroLevel':
      return gameState.heroes.some(h => h.level >= achievement.conditionValue);
    case 'totalItems':
      return gameState.inventory.items.length >= achievement.conditionValue;
    case 'totalCrits':
      return gameState.crit.totalCrits >= achievement.conditionValue;
    case 'ascensions':
      return gameState.prestige.ascensions >= achievement.conditionValue;
    case 'totalSkillPoints':
      return gameState.skillPoints >= achievement.conditionValue;
    default:
      return false;
  }
}

export function getTierColor(tier: string): string {
  switch (tier) {
    case 'bronze': return '#cd7f32';
    case 'silver': return '#c0c0c0';
    case 'gold': return '#ffd700';
    case 'platinum': return '#e5e4e2';
    case 'diamond': return '#b9f2ff';
    default: return '#9ca3af';
  }
}

export function getTierName(tier: string): string {
  switch (tier) {
    case 'bronze': return 'Bronze';
    case 'silver': return 'Prata';
    case 'gold': return 'Ouro';
    case 'platinum': return 'Platina';
    case 'diamond': return 'Diamante';
    default: return 'Comum';
  }
}

export function getCategoryIcon(category: AchievementCategory): string {
  switch (category) {
    case 'kills': return '⚔️';
    case 'dungeons': return '🏰';
    case 'gold': return '💰';
    case 'mana': return '💎';
    case 'heroes': return '🦸';
    case 'items': return '📦';
    case 'prestige': return '🔄';
    case 'special': return '⭐';
    default: return '📋';
  }
}

export function getCategoryName(category: AchievementCategory): string {
  switch (category) {
    case 'kills': return 'Combate';
    case 'dungeons': return 'Dungeons';
    case 'gold': return 'Ouro';
    case 'mana': return 'Mana';
    case 'heroes': return 'Heróis';
    case 'items': return 'Itens';
    case 'prestige': return 'Ascensão';
    case 'special': return 'Especial';
    default: return 'Outros';
  }
}

export const CATEGORY_FILTERS: { id: AchievementCategory | 'all'; label: string }[] = [
  { id: 'all', label: '📋 Todas' },
  { id: 'kills', label: '⚔️ Combate' },
  { id: 'dungeons', label: '🏰 Dungeons' },
  { id: 'gold', label: '💰 Ouro' },
  { id: 'mana', label: '💎 Mana' },
  { id: 'heroes', label: '🦸 Heróis' },
  { id: 'items', label: '📦 Itens' },
  { id: 'prestige', label: '🔄 Ascensão' },
  { id: 'special', label: '⭐ Especial' },
];

export default ACHIEVEMENT_DEFS;
