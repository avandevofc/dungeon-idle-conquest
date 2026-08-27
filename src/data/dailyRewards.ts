// ==========================================
// SISTEMA DE RECOMPENSAS DIÁRIAS — Dungeon Idle Conquest
// ==========================================

export type DailyRewardType = 'gold' | 'mana' | 'skillPoints' | 'item' | 'boost';

export interface DailyRewardDef {
  day: number;
  type: DailyRewardType;
  amount: number;
  name: string;
  description: string;
  icon: string;
  boosted?: boolean; // recompensa com bônus de streak
  boostMultiplier: number;
}

export interface DailyStreakDef {
  minDays: number;
  maxDays: number;
  bonusPercent: number;
  bonusName: string;
  bonusIcon: string;
}

export interface DailyRewardState {
  lastClaimDate: string; // YYYY-MM-DD
  currentStreak: number;
  longestStreak: number;
  totalDaysClaimed: number;
  claimedToday: boolean;
  lastRewardIndex: number;
}

// ========== RECOMPENSAS POR DIA (ciclo de 7 dias) ==========

export const DAILY_REWARDS: DailyRewardDef[] = [
  {
    day: 1,
    type: 'gold',
    amount: 100,
    name: 'Pacote de Ouro',
    description: '100 ouro para começar o dia!',
    icon: '🪙',
    boosted: false,
    boostMultiplier: 1,
  },
  {
    day: 2,
    type: 'mana',
    amount: 3,
    name: 'Essência de Mana',
    description: '3 de mana para upgrades permanentes!',
    icon: '💎',
    boosted: false,
    boostMultiplier: 1,
  },
  {
    day: 3,
    type: 'skillPoints',
    amount: 1,
    name: 'Ponto de Habilidade',
    description: '1 ponto de habilidade para melhorar skills!',
    icon: '⭐',
    boosted: false,
    boostMultiplier: 1,
  },
  {
    day: 4,
    type: 'gold',
    amount: 500,
    name: 'Saco de Ouro',
    description: '500 ouro para upgrades!',
    icon: '💰',
    boosted: true,
    boostMultiplier: 1.5,
  },
  {
    day: 5,
    type: 'item',
    amount: 1,
    name: 'Baú Misterioso',
    description: '1 item aleatório de raridade Incomum ou superior!',
    icon: '📦',
    boosted: false,
    boostMultiplier: 1,
  },
  {
    day: 6,
    type: 'mana',
    amount: 10,
    name: 'Cristal de Mana',
    description: '10 de mana para upgrades poderosos!',
    icon: '🔮',
    boosted: true,
    boostMultiplier: 2,
  },
  {
    day: 7,
    type: 'gold',
    amount: 2000,
    name: 'Tesouro Real',
    description: '2000 ouro + bônus especial de final de semana!',
    icon: '👑',
    boosted: true,
    boostMultiplier: 2,
  },
];

// ========== BÔNUS DE SEQUÊNCIA ==========

export const STREAK_BONUSES: DailyStreakDef[] = [
  {
    minDays: 3,
    maxDays: 6,
    bonusPercent: 10,
    bonusName: 'Iniciante',
    bonusIcon: '🌱',
  },
  {
    minDays: 7,
    maxDays: 13,
    bonusPercent: 25,
    bonusName: 'Dedicado',
    bonusIcon: '🔥',
  },
  {
    minDays: 14,
    maxDays: 29,
    bonusPercent: 50,
    bonusName: 'Veterano',
    bonusIcon: '⭐',
  },
  {
    minDays: 30,
    maxDays: 59,
    bonusPercent: 100,
    bonusName: 'Lenda',
    bonusIcon: '🏆',
  },
  {
    minDays: 60,
    maxDays: 999,
    bonusPercent: 200,
    bonusName: 'Mito',
    bonusIcon: '👑',
  },
];

// ========== RECOMPENSAS ESPECIAIS POR SEQUÊNCIA ==========

export const STREAK_MILESTONES: { streak: number; reward: { type: DailyRewardType; amount: number; name: string } }[] = [
  { streak: 7, reward: { type: 'mana', amount: 15, name: 'Recompensa Semanal' } },
  { streak: 14, reward: { type: 'skillPoints', amount: 5, name: 'Recompensa Quinzenal' } },
  { streak: 30, reward: { type: 'item', amount: 1, name: 'Recompensa Mensal' } },
  { streak: 60, reward: { type: 'mana', amount: 50, name: 'Recompensa Bimestral' } },
  { streak: 100, reward: { type: 'skillPoints', amount: 15, name: 'Recompensa Centenária' } },
];

// ========== FUNÇÕES UTILITÁRIAS ==========

export function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function getYesterdayString(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function getStreakBonus(streak: number): DailyStreakDef {
  for (const bonus of [...STREAK_BONUSES].reverse()) {
    if (streak >= bonus.minDays) return bonus;
  }
  return STREAK_BONUSES[0];
}

export function getStreakMilestone(streak: number): typeof STREAK_MILESTONES[0] | null {
  for (const milestone of STREAK_MILESTONES) {
    if (streak === milestone.streak) return milestone;
  }
  return null;
}

export function calculateDailyReward(state: DailyRewardState): { reward: DailyRewardDef; bonus: number; milestone: typeof STREAK_MILESTONES[0] | null } {
  const today = getTodayString();
  
  // Check if already claimed today
  if (state.lastClaimDate === today) {
    return { reward: DAILY_REWARDS[state.lastRewardIndex], bonus: 0, milestone: null };
  }
  
  // Check if streak continues
  const yesterday = getYesterdayString();
  let newStreak = state.currentStreak;
  
  if (state.lastClaimDate === yesterday) {
    // Streak continues
    newStreak = state.currentStreak + 1;
  } else if (state.lastClaimDate !== today) {
    // Streak broken
    newStreak = 1;
  }
  
  // Get reward for current day in cycle
  const dayIndex = (newStreak - 1) % 7;
  const baseReward = DAILY_REWARDS[dayIndex];
  
  // Calculate streak bonus
  const streakBonus = getStreakBonus(newStreak);
  let bonusAmount = 0;
  
  if (baseReward.boosted) {
    bonusAmount = Math.floor(baseReward.amount * (baseReward.boostMultiplier - 1));
  }
  
  // Add streak bonus
  bonusAmount += Math.floor(baseReward.amount * (streakBonus.bonusPercent / 100));
  
  // Check for milestone
  const milestone = getStreakMilestone(newStreak);
  
  return { reward: baseReward, bonus: bonusAmount, milestone };
}

export function claimDailyReward(state: DailyRewardState): DailyRewardState {
  const today = getTodayString();
  const yesterday = getYesterdayString();
  
  let newStreak = state.currentStreak;
  
  if (state.lastClaimDate === yesterday) {
    // Streak continues
    newStreak = state.currentStreak + 1;
  } else if (state.lastClaimDate !== today) {
    // Streak broken or first time
    newStreak = 1;
  }
  
  const dayIndex = (newStreak - 1) % 7;
  
  return {
    lastClaimDate: today,
    currentStreak: newStreak,
    longestStreak: Math.max(state.longestStreak, newStreak),
    totalDaysClaimed: state.totalDaysClaimed + 1,
    claimedToday: true,
    lastRewardIndex: dayIndex,
  };
}

export function getDaysUntilNextReward(): number {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const diff = tomorrow.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatTimeUntilReset(): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
}

export function getStreakColor(streak: number): string {
  if (streak >= 60) return '#ffd700';
  if (streak >= 30) return '#e5e4e2';
  if (streak >= 14) return '#c0c0c0';
  if (streak >= 7) return '#cd7f32';
  return '#9ca3af';
}

export function getStreakName(streak: number): string {
  if (streak >= 60) return 'Mito';
  if (streak >= 30) return 'Lenda';
  if (streak >= 14) return 'Veterano';
  if (streak >= 7) return 'Dedicado';
  if (streak >= 3) return 'Iniciante';
  return 'Novato';
}

export function getRewardTypeIcon(type: DailyRewardType): string {
  switch (type) {
    case 'gold': return '🪙';
    case 'mana': return '💎';
    case 'skillPoints': return '⭐';
    case 'item': return '📦';
    case 'boost': return '⚡';
    default: return '🎁';
  }
}

export function getRewardTypeName(type: DailyRewardType): string {
  switch (type) {
    case 'gold': return 'Ouro';
    case 'mana': return 'Mana';
    case 'skillPoints': return 'Pontos de Habilidade';
    case 'item': return 'Item';
    case 'boost': return 'Boost';
    default: return 'Recompensa';
  }
}

export default DAILY_REWARDS;
