// ========== HERO TYPES ==========
export interface HeroDef {
  id: string;
  name: string;
  icon: string;
  sprite?: string;
  baseDmg: number;
  baseHp: number;
  baseCost: number;
  unlockThreshold: number;
  color: string;
}

export interface HeroState {
  id: string;
  level: number;
  hp: number;
  maxHp: number;
  isDead: boolean;
  reviveTimer: number;
  evolutionLevel: number; // 0 = base, 1 = 1st evo, 2 = 2nd evo
}

// ========== ENEMY TYPES ==========
export interface EnemyDef {
  name: string;
  icon: string;
  isBoss: boolean;
  position: number;
}

export interface EnemyState {
  hp: number;
  maxHp: number;
}

// ========== DUNGEON TYPES ==========
export type DungeonTheme = 'Trevas' | 'Vulcânica' | 'Glacial' | 'Abismo' | 'Celestial' | 'Cripta' | 'Infernal' | 'Dimensional';

export interface DungeonThemeDef {
  name: DungeonTheme;
  emoji: string;
  bgClass: string;
  accentColor: string;
}

export interface DungeonState {
  currentDungeon: number;
  currentStage: number;
  enemiesDefeated: number;
  completedDungeons: number;
}

// ========== MANA UPGRADE TYPES ==========
export interface ManaUpgradeDef {
  id: string;
  name: string;
  icon: string;
  description: string;
  baseCost: number;
  costScale: number;
  effect: (level: number) => number;
  effectLabel: (level: number) => string;
}

export interface ManaUpgradeState {
  id: string;
  level: number;
}

// ========== COMBAT LOG ==========
export type LogType = 'damage' | 'kill' | 'gold' | 'mana' | 'levelup' | 'dungeon' | 'boss' | 'upgrade' | 'crit' | 'item' | 'pet' | 'skill' | 'achievement' | 'prestige';

export interface CombatLogEntry {
  id: number;
  text: string;
  type: LogType;
  timestamp: number;
}

// ========== FLOATING DAMAGE ==========
export interface FloatingNumber {
  id: number;
  value: number;
  x: number;
  y: number;
  isCrit: boolean;
  timestamp: number;
}

// ========== CRITICAL HIT SYSTEM ==========
export interface CritState {
  chance: number; // base 5%
  multiplier: number; // base 2x
  totalCrits: number;
}

// ========== ITEM/LOOT SYSTEM ==========
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type ItemSlot = 'weapon' | 'armor' | 'accessory';

export interface ItemDef {
  id: string;
  name: string;
  slot: ItemSlot;
  rarity: ItemRarity;
  icon: string;
  baseStat: number; // flat bonus
  statType: 'damage' | 'gold' | 'hp' | 'critChance' | 'critDmg';
  dropWeight: number; // lower = rarer
}

export interface ItemInstance {
  uid: string; // unique id
  defId: string;
  level: number;
  equipped: boolean;
  heroId?: string; // which hero has it equipped
}

export interface InventoryState {
  items: ItemInstance[];
  maxSlots: number;
  goldFindBonus: number; // from equipment
  damageBonus: number;
  critChanceBonus: number;
  critDmgBonus: number;
}

// ========== PET SYSTEM ==========
export type PetType = 'attack' | 'support' | 'tank' | 'utility';

export interface PetDef {
  id: string;
  name: string;
  icon: string;
  type: PetType;
  rarity: ItemRarity;
  description: string;
  effect: string;
  unlockCondition: string;
}

export interface PetState {
  id: string;
  level: number;
  active: boolean;
}

// ========== ACTIVE SKILL SYSTEM ==========
export interface ActiveSkillState {
  id: string;
  cooldownRemaining: number;
  isActive: boolean;
  activeUntil: number;
}

// ========== ACHIEVEMENT SYSTEM ==========
export interface AchievementState {
  id: string;
  unlocked: boolean;
  unlockedAt?: number;
  notified: boolean;
}

// ========== DAILY REWARD SYSTEM ==========
export interface DailyRewardState {
  lastClaimDate: string;
  currentStreak: number;
  longestStreak: number;
  totalDaysClaimed: number;
  claimedToday: boolean;
  lastRewardIndex: number;
}

// ========== SKILL TREE ==========
export type SkillBranch = 'offensive' | 'defensive' | 'utility';

export interface SkillDef {
  id: string;
  name: string;
  icon: string;
  branch: SkillBranch;
  description: string;
  maxLevel: number;
  costPerLevel: number; // in skill points
  effect: (level: number) => string;
  prerequisite?: string; // skill id required
}

export interface SkillState {
  id: string;
  level: number;
}

// ========== PRESTIGE SYSTEM ==========
export interface PrestigeDef {
  id: string;
  name: string;
  icon: string;
  description: string;
  cost: number; // prestige points to buy
  effect: (level: number) => number;
  effectLabel: (level: number) => string;
  maxLevel: number;
}

export interface PrestigeState {
  points: number; // current unspent
  totalPointsEarned: number;
  ascensions: number;
  upgrades: { id: string; level: number }[];
}

// ========== DAILY CHALLENGE ==========
export interface DailyChallenge {
  id: string;
  name: string;
  description: string;
  theme: DungeonTheme;
  modifier: string; // e.g., "2x HP, 3x Gold"
  reward: { type: 'gold' | 'mana' | 'item' | 'prestige'; amount: number };
  completed: boolean;
  date: string; // YYYY-MM-DD
  dungeonNumber: number;
  hpMultiplier: number;
  goldMultiplier: number;
}

// ========== SHOP SYSTEM ==========
export type ShopCategory = 'upgrades' | 'items' | 'pets' | 'consumables' | 'utility' | 'premium';

export interface ShopItem {
  id: string;
  name: string;
  icon: string;
  category: ShopCategory;
  description: string;
  price: number;
  priceType: 'gold' | 'mana' | 'prestige';
  effect: string;
  repeatable: boolean;
}

// ========== GAME STATE ==========
export interface GameState {
  gold: number;
  totalGoldEarned: number;
  mana: number;
  totalManaEarned: number;
  heroes: HeroState[];
  dungeon: DungeonState;
  currentEnemy: EnemyState;
  manaUpgrades: ManaUpgradeState[];
  combatLog: CombatLogEntry[];
  floatingNumbers: FloatingNumber[];
  lastSaveTime: number;
  gameStartTime: number;
  // New systems
  crit: CritState;
  inventory: InventoryState;
  pets: PetState[];
  skills: SkillState[];
  prestige: PrestigeState;
  dailyChallenge: DailyChallenge | null;
  skillPoints: number;
  totalKills: number;
  totalBossKills: number;
  highestDungeon: number;
  activePet: string | null;
  activeSkills: ActiveSkillState[];
  achievements: AchievementState[];
  dailyRewards: DailyRewardState;
}
