// ==========================================
// SISTEMA DE CONQUISTAS — Dungeon Idle Conquest
// ==========================================

export type AchievementCategory = 'kills' | 'dungeons' | 'gold' | 'mana' | 'heroes' | 'items' | 'prestige' | 'special' | 'monsterDex';

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  condition: string;
  conditionValue: number;
  conditionType: 'totalKills' | 'totalBossKills' | 'completedDungeons' | 'highestDungeon' | 'totalGoldEarned' | 'totalManaEarned' | 'heroLevel' | 'totalItems' | 'totalCrits' | 'ascensions' | 'totalSkillPoints' | 'monstersDiscovered' | 'bossesDiscovered' | 'allMonstersDiscovered';
  reward: AchievementReward;
  hidden: boolean;
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
  // ======================================================================
  // ⚔️ CONQUISTAS DE KILLS
  // ======================================================================
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
    id: 'mass_extermination',
    name: 'Extermínio em Massa',
    description: 'Derrote 100.000 monstros',
    icon: '☢️',
    category: 'kills',
    condition: 'Derrote 100.000 monstros',
    conditionValue: 100000,
    conditionType: 'totalKills',
    reward: { type: 'skillPoints', amount: 10 },
    hidden: false,
    tier: 'platinum',
  },
  {
    id: 'legendary_slayer',
    name: 'Destruidor Lendário',
    description: 'Derrote 500.000 monstros',
    icon: '👑',
    category: 'kills',
    condition: 'Derrote 500.000 monstros',
    conditionValue: 500000,
    conditionType: 'totalKills',
    reward: { type: 'pet', amount: 1, petId: 'golden_scarab' },
    hidden: false,
    tier: 'diamond',
  },
  {
    id: 'apocalypse',
    name: 'Apocalipse',
    description: 'Derrote 1.000.000 de monstros',
    icon: '🌋',
    category: 'kills',
    condition: 'Derrote 1.000.000 de monstros',
    conditionValue: 1000000,
    conditionType: 'totalKills',
    reward: { type: 'prestigePoints', amount: 50 },
    hidden: false,
    tier: 'diamond',
  },
  // --- Boss Kills ---
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
  {
    id: 'boss_legend',
    name: 'Lenda dos Chefes',
    description: 'Derrote 500 chefes',
    icon: '🔥',
    category: 'kills',
    condition: 'Derrote 500 chefes',
    conditionValue: 500,
    conditionType: 'totalBossKills',
    reward: { type: 'skillPoints', amount: 15 },
    hidden: false,
    tier: 'platinum',
  },
  {
    id: 'boss_god',
    name: 'Senhor dos Chefes',
    description: 'Derrote 1.000 chefes',
    icon: '💀',
    category: 'kills',
    condition: 'Derrote 1.000 chefes',
    conditionValue: 1000,
    conditionType: 'totalBossKills',
    reward: { type: 'prestigePoints', amount: 30 },
    hidden: false,
    tier: 'diamond',
  },

  // ======================================================================
  // 🏰 CONQUISTAS DE DUNGEONS
  // ======================================================================
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
    id: 'dungeon_warrior',
    name: 'Guerreiro das Dungeons',
    description: 'Complete 25 dungeons',
    icon: '⚔️',
    category: 'dungeons',
    condition: 'Complete 25 dungeons',
    conditionValue: 25,
    conditionType: 'completedDungeons',
    reward: { type: 'gold', amount: 1500 },
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
    id: 'dungeon_veteran',
    name: 'Veterano das Dungeons',
    description: 'Complete 100 dungeons',
    icon: '🛡️',
    category: 'dungeons',
    condition: 'Complete 100 dungeons',
    conditionValue: 100,
    conditionType: 'completedDungeons',
    reward: { type: 'mana', amount: 25 },
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
    id: 'dungeon_undead',
    name: 'Imortal das Dungeons',
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
    id: 'dungeon_eternal',
    name: 'Eterno Explorador',
    description: 'Complete 1.000 dungeons',
    icon: '🌌',
    category: 'dungeons',
    condition: 'Complete 1.000 dungeons',
    conditionValue: 1000,
    conditionType: 'completedDungeons',
    reward: { type: 'prestigePoints', amount: 40 },
    hidden: false,
    tier: 'diamond',
  },
  // --- Highest Dungeon ---
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
    tier: 'platinum',
  },
  {
    id: 'reach_dungeon_100',
    name: 'Além do Infinito',
    description: 'Alcance a dungeon 100',
    icon: '🌀',
    category: 'dungeons',
    condition: 'Alcance a dungeon 100',
    conditionValue: 100,
    conditionType: 'highestDungeon',
    reward: { type: 'prestigePoints', amount: 50 },
    hidden: false,
    tier: 'diamond',
  },

  // ======================================================================
  // 💰 CONQUISTAS DE OURO
  // ======================================================================
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
    id: 'gold_baron',
    name: 'Barão do Ouro',
    description: 'Acumule 10.000.000 de ouro',
    icon: '🏦',
    category: 'gold',
    condition: 'Acumule 10.000.000 de ouro',
    conditionValue: 10000000,
    conditionType: 'totalGoldEarned',
    reward: { type: 'skillPoints', amount: 5 },
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
    tier: 'gold',
  },
  {
    id: 'gold_emperor',
    name: 'Imperador do Ouro',
    description: 'Acumule 1.000.000.000 de ouro',
    icon: '🏛️',
    category: 'gold',
    condition: 'Acumule 1 bilhão de ouro',
    conditionValue: 1000000000,
    conditionType: 'totalGoldEarned',
    reward: { type: 'prestigePoints', amount: 15 },
    hidden: false,
    tier: 'platinum',
  },
  {
    id: 'gold_god',
    name: 'Deus do Ouro',
    description: 'Acumule 10.000.000.000 de ouro',
    icon: '🌟',
    category: 'gold',
    condition: 'Acumule 10 bilhões de ouro',
    conditionValue: 10000000000,
    conditionType: 'totalGoldEarned',
    reward: { type: 'prestigePoints', amount: 25 },
    hidden: false,
    tier: 'diamond',
  },
  {
    id: 'midas_supreme',
    name: 'Midas Supremo',
    description: 'Acumule 1.000.000.000.000 de ouro',
    icon: '🤲',
    category: 'gold',
    condition: 'Acumule 1 trilhão de ouro',
    conditionValue: 1000000000000,
    conditionType: 'totalGoldEarned',
    reward: { type: 'pet', amount: 1, petId: 'golden_dragon' },
    hidden: false,
    tier: 'diamond',
  },

  // ======================================================================
  // 💎 CONQUISTAS DE MANA
  // ======================================================================
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
    id: 'mana_hoarder',
    name: 'Acumulador de Mana',
    description: 'Colete 200 mana',
    icon: '💠',
    category: 'mana',
    condition: 'Colete 200 mana',
    conditionValue: 200,
    conditionType: 'totalManaEarned',
    reward: { type: 'mana', amount: 20 },
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
    id: 'mana_archmage',
    name: 'Arquimago',
    description: 'Colete 2.000 mana',
    icon: '🧙',
    category: 'mana',
    condition: 'Colete 2.000 mana',
    conditionValue: 2000,
    conditionType: 'totalManaEarned',
    reward: { type: 'skillPoints', amount: 10 },
    hidden: false,
    tier: 'platinum',
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
  {
    id: 'mana_sovereign',
    name: 'Soberano Arcano',
    description: 'Colete 20.000 mana',
    icon: '⚜️',
    category: 'mana',
    condition: 'Colete 20.000 mana',
    conditionValue: 20000,
    conditionType: 'totalManaEarned',
    reward: { type: 'prestigePoints', amount: 40 },
    hidden: false,
    tier: 'diamond',
  },

  // ======================================================================
  // 🦸 CONQUISTAS DE HERÓIS
  // ======================================================================
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
    id: 'hero_level_25',
    name: 'Herói Veterano',
    description: 'Alcance nível 25 com qualquer herói',
    icon: '🎖️',
    category: 'heroes',
    condition: 'Alcance nível 25',
    conditionValue: 25,
    conditionType: 'heroLevel',
    reward: { type: 'mana', amount: 10 },
    hidden: false,
    tier: 'silver',
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
    tier: 'gold',
  },
  {
    id: 'hero_level_75',
    name: 'Herói Mítico',
    description: 'Alcance nível 75 com qualquer herói',
    icon: '🔱',
    category: 'heroes',
    condition: 'Alcance nível 75',
    conditionValue: 75,
    conditionType: 'heroLevel',
    reward: { type: 'skillPoints', amount: 10 },
    hidden: false,
    tier: 'platinum',
  },
  {
    id: 'hero_level_100',
    name: 'Demigod',
    description: 'Alcance nível 100 com qualquer herói',
    icon: '💫',
    category: 'heroes',
    condition: 'Alcance nível 100',
    conditionValue: 100,
    conditionType: 'heroLevel',
    reward: { type: 'prestigePoints', amount: 25 },
    hidden: false,
    tier: 'diamond',
  },
  {
    id: 'hero_level_200',
    name: 'Transcendente',
    description: 'Alcance nível 200 com qualquer herói',
    icon: '🌟',
    category: 'heroes',
    condition: 'Alcance nível 200',
    conditionValue: 200,
    conditionType: 'heroLevel',
    reward: { type: 'pet', amount: 1, petId: 'cosmic_phoenix' },
    hidden: false,
    tier: 'diamond',
  },

  // ======================================================================
  // 📦 CONQUISTAS DE ITENS
  // ======================================================================
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
    id: 'item_apprentice',
    name: 'Aprendiz de Itens',
    description: 'Colete 10 itens',
    icon: '🎒',
    category: 'items',
    condition: 'Colete 10 itens',
    conditionValue: 10,
    conditionType: 'totalItems',
    reward: { type: 'gold', amount: 200 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'collector',
    name: 'Colecionador',
    description: 'Colete 50 itens',
    icon: '🛍️',
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
    icon: '🏦',
    category: 'items',
    condition: 'Colete 200 itens',
    conditionValue: 200,
    conditionType: 'totalItems',
    reward: { type: 'mana', amount: 15 },
    hidden: false,
    tier: 'gold',
  },
  {
    id: 'museum',
    name: 'Museu Vivo',
    description: 'Colete 500 itens',
    icon: '🏛️',
    category: 'items',
    condition: 'Colete 500 itens',
    conditionValue: 500,
    conditionType: 'totalItems',
    reward: { type: 'skillPoints', amount: 10 },
    hidden: false,
    tier: 'platinum',
  },
  {
    id: 'legendary_collector',
    name: 'Colecionador Lendário',
    description: 'Colete 1.000 itens',
    icon: '🏆',
    category: 'items',
    condition: 'Colete 1.000 itens',
    conditionValue: 1000,
    conditionType: 'totalItems',
    reward: { type: 'prestigePoints', amount: 20 },
    hidden: false,
    tier: 'diamond',
  },

  // ======================================================================
  // 🔄 CONQUISTAS DE PRESTIGE
  // ======================================================================
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
    id: 'ascension_apprentice',
    name: 'Aprendiz da Ascensão',
    description: 'Realize 5 ascensões',
    icon: '🔁',
    category: 'prestige',
    condition: 'Ascenda 5 vezes',
    conditionValue: 5,
    conditionType: 'ascensions',
    reward: { type: 'prestigePoints', amount: 10 },
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
    id: 'ascension_expert',
    name: 'Especialista da Ascensão',
    description: 'Realize 25 ascensões',
    icon: '💫',
    category: 'prestige',
    condition: 'Ascenda 25 vezes',
    conditionValue: 25,
    conditionType: 'ascensions',
    reward: { type: 'prestigePoints', amount: 40 },
    hidden: false,
    tier: 'gold',
  },
  {
    id: 'ascension_legend',
    name: 'Lenda da Ascensão',
    description: 'Realize 50 ascensões',
    icon: '🌌',
    category: 'prestige',
    condition: 'Ascenda 50 vezes',
    conditionValue: 50,
    conditionType: 'ascensions',
    reward: { type: 'pet', amount: 1, petId: 'void_walker' },
    hidden: false,
    tier: 'platinum',
  },
  {
    id: 'ascension_supreme',
    name: 'Ascensão Suprema',
    description: 'Realize 100 ascensões',
    icon: '⚜️',
    category: 'prestige',
    condition: 'Ascenda 100 vezes',
    conditionValue: 100,
    conditionType: 'ascensions',
    reward: { type: 'prestigePoints', amount: 75 },
    hidden: false,
    tier: 'diamond',
  },
  {
    id: 'ascension_eternal',
    name: 'Eterno',
    description: 'Realize 200 ascensões',
    icon: '♾️',
    category: 'prestige',
    condition: 'Ascenda 200 vezes',
    conditionValue: 200,
    conditionType: 'ascensions',
    reward: { type: 'pet', amount: 1, petId: 'eternal_serpent' },
    hidden: false,
    tier: 'diamond',
  },

  // ======================================================================
  // 📖 CONQUISTAS DE MONSTER DEX
  // ======================================================================
  {
    id: 'dex_first_step',
    name: 'Primeiro Passo',
    description: 'Descubra 5 monstros na Monster Dex',
    icon: '📖',
    category: 'monsterDex',
    condition: 'Descubra 5 monstros',
    conditionValue: 5,
    conditionType: 'monstersDiscovered',
    reward: { type: 'gold', amount: 100 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'dex_curious',
    name: 'Curioso',
    description: 'Descubra 10 monstros na Monster Dex',
    icon: '🔍',
    category: 'monsterDex',
    condition: 'Descubra 10 monstros',
    conditionValue: 10,
    conditionType: 'monstersDiscovered',
    reward: { type: 'gold', amount: 500 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'dex_naturalist',
    name: 'Naturalista',
    description: 'Descubra 25 monstros na Monster Dex',
    icon: '🌿',
    category: 'monsterDex',
    condition: 'Descubra 25 monstros',
    conditionValue: 25,
    conditionType: 'monstersDiscovered',
    reward: { type: 'mana', amount: 15 },
    hidden: false,
    tier: 'silver',
  },
  {
    id: 'dex_scholar',
    name: 'Erudito',
    description: 'Descubra 50 monstros na Monster Dex',
    icon: '📚',
    category: 'monsterDex',
    condition: 'Descubra 50 monstros',
    conditionValue: 50,
    conditionType: 'monstersDiscovered',
    reward: { type: 'skillPoints', amount: 10 },
    hidden: false,
    tier: 'gold',
  },
  {
    id: 'dex_sage',
    name: 'Sábio',
    description: 'Descubra 75 monstros na Monster Dex',
    icon: '🧙',
    category: 'monsterDex',
    condition: 'Descubra 75 monstros',
    conditionValue: 75,
    conditionType: 'monstersDiscovered',
    reward: { type: 'prestigePoints', amount: 15 },
    hidden: false,
    tier: 'platinum',
  },
  {
    id: 'dex_master',
    name: 'Mestre da Dex',
    description: 'Complete 100% da Monster Dex',
    icon: '🏆',
    category: 'monsterDex',
    condition: 'Descubra todos os monstros',
    conditionValue: 999,
    conditionType: 'allMonstersDiscovered',
    reward: { type: 'pet', amount: 1, petId: 'dex_master' },
    hidden: false,
    tier: 'diamond',
  },
  {
    id: 'dex_first_boss',
    name: 'Primeiro Boss',
    description: 'Descubra seu primeiro boss na Dex',
    icon: '💀',
    category: 'monsterDex',
    condition: 'Descubra 1 boss',
    conditionValue: 1,
    conditionType: 'bossesDiscovered',
    reward: { type: 'mana', amount: 5 },
    hidden: false,
    tier: 'bronze',
  },
  {
    id: 'dex_boss_hunter',
    name: 'Caçador de Chefes Dex',
    description: 'Descubra 4 bosses na Dex',
    icon: '😈',
    category: 'monsterDex',
    condition: 'Descubra 4 bosses',
    conditionValue: 4,
    conditionType: 'bossesDiscovered',
    reward: { type: 'skillPoints', amount: 5 },
    hidden: false,
    tier: 'gold',
  },
  {
    id: 'dex_all_bosses',
    name: 'Lenda dos Chefes',
    description: 'Descubra todos os 8 bosses na Dex',
    icon: '👑',
    category: 'monsterDex',
    condition: 'Descubra todos os bosses',
    conditionValue: 8,
    conditionType: 'bossesDiscovered',
    reward: { type: 'prestigePoints', amount: 30 },
    hidden: false,
    tier: 'diamond',
  },

  // ======================================================================
  // ⭐ CONQUISTAS ESPECIAIS
  // ======================================================================
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
    id: 'critical_storm',
    name: 'Tempestade Crítica',
    description: 'Acerte 5.000 críticos',
    icon: '⚡',
    category: 'special',
    condition: 'Acerte 5.000 críticos',
    conditionValue: 5000,
    conditionType: 'totalCrits',
    reward: { type: 'mana', amount: 25 },
    hidden: false,
    tier: 'gold',
  },
  {
    id: 'critical_god',
    name: 'Deus do Crítico',
    description: 'Acerte 25.000 críticos',
    icon: '💥',
    category: 'special',
    condition: 'Acerte 25.000 críticos',
    conditionValue: 25000,
    conditionType: 'totalCrits',
    reward: { type: 'prestigePoints', amount: 20 },
    hidden: false,
    tier: 'platinum',
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
    id: 'skill_polymath',
    name: 'Polímata',
    description: 'Gaste 200 pontos de habilidade',
    icon: '🧠',
    category: 'special',
    condition: 'Gaste 200 pontos de habilidade',
    conditionValue: 200,
    conditionType: 'totalSkillPoints',
    reward: { type: 'prestigePoints', amount: 20 },
    hidden: false,
    tier: 'platinum',
  },
  {
    id: 'skill_omniscient',
    name: 'Onisciente',
    description: 'Gaste 500 pontos de habilidade',
    icon: '🔮',
    category: 'special',
    condition: 'Gaste 500 pontos de habilidade',
    conditionValue: 500,
    conditionType: 'totalSkillPoints',
    reward: { type: 'pet', amount: 1, petId: 'mind_flayer' },
    hidden: false,
    tier: 'diamond',
  },
  // --- Conquistas Secretas ---
  {
    id: 'secret_achievement',
    name: '???',
    description: 'Uma conquista misteriosa...',
    icon: '❓',
    category: 'special',
    condition: '???',
    conditionValue: 999999,
    conditionType: 'totalKills',
    reward: { type: 'pet', amount: 1, petId: 'time_relic' },
    hidden: true,
    tier: 'diamond',
  },
  {
    id: 'secret_speedrun',
    name: '???',
    description: 'Velocidade é tudo...',
    icon: '❓',
    category: 'special',
    condition: '???',
    conditionValue: 1,
    conditionType: 'ascensions',
    reward: { type: 'title', amount: 1, title: 'Relâmpago' },
    hidden: true,
    tier: 'diamond',
  },
  {
    id: 'secret_monster_collector',
    name: '???',
    description: 'Coleccionador de almas...',
    icon: '❓',
    category: 'special',
    condition: '???',
    conditionValue: 1,
    conditionType: 'bossesDiscovered',
    reward: { type: 'title', amount: 1, title: 'Bestiário Vivo' },
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
  monstersDiscovered: number;
  bossesDiscovered: number;
  totalMonsters: number;
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
    case 'monstersDiscovered':
      return gameState.monstersDiscovered >= achievement.conditionValue;
    case 'bossesDiscovered':
      return gameState.bossesDiscovered >= achievement.conditionValue;
    case 'allMonstersDiscovered':
      return gameState.totalMonsters > 0 && gameState.monstersDiscovered >= gameState.totalMonsters;
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
    case 'monsterDex': return '📖';
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
    case 'monsterDex': return 'Monster Dex';
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
  { id: 'monsterDex', label: '📖 Monster Dex' },
  { id: 'special', label: '⭐ Especial' },
];

export default ACHIEVEMENT_DEFS;
