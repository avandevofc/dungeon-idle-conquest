import { PrestigeDef } from '../types';

// How many prestige points earned per ascension
export function prestigePointsForAscension(dungeonCompleted: number): number {
  // 1 point per 5 dungeons completed
  return Math.floor(dungeonCompleted / 5);
}

export const PRESTIGE_DEFS: PrestigeDef[] = [
  {
    id: 'eternal_power',
    name: 'Poder Eterno',
    icon: '💪',
    description: 'Bônus permanente de dano que persiste entre ascensões.',
    cost: 1,
    effect: (level) => 1 + level * 0.25,
    effectLabel: (level) => `+${level * 25}% Dano Permanente`,
    maxLevel: 20,
  },
  {
    id: 'golden_touch',
    name: 'Toque Dourado',
    icon: '🪙',
    description: 'Bônus permanente de ouro entre ascensões.',
    cost: 1,
    effect: (level) => 1 + level * 0.25,
    effectLabel: (level) => `+${level * 25}% Ouro Permanente`,
    maxLevel: 20,
  },
  {
    id: 'swift_start',
    name: 'Início Acelerado',
    icon: '⚡',
    description: 'Comece cada ascensão com ouro e níveis de herói.',
    cost: 2,
    effect: (level) => level * 100,
    effectLabel: (level) => `Começa com ${level * 100} 🪙`,
    maxLevel: 15,
  },
  {
    id: 'mana_reservoir',
    name: 'Reservatório de Mana',
    icon: '💎',
    description: 'Ganhe mana extra ao ascender.',
    cost: 2,
    effect: (level) => level * 5,
    effectLabel: (level) => `+${level * 5} 💎 por ascensão`,
    maxLevel: 10,
  },
  {
    id: 'critical_origin',
    name: 'Origem Crítica',
    icon: '🎯',
    description: 'Aumenta chance e dano crítico permanentemente.',
    cost: 3,
    effect: (level) => level * 5,
    effectLabel: (level) => `+${level * 5}% Chance Crit + ${level * 10}% Dano Crit`,
    maxLevel: 10,
  },
  {
    id: 'item_magnet',
    name: 'Ímã de Itens',
    icon: '📦',
    description: 'Aumenta chance de drop de itens.',
    cost: 3,
    effect: (level) => 1 + level * 0.15,
    effectLabel: (level) => `+${level * 15}% Chance de Item`,
    maxLevel: 10,
  },
  {
    id: 'dungeon_veteran',
    name: 'Veterano de Dungeon',
    icon: '🏰',
    description: 'Dungeons começam em estágios mais avançados.',
    cost: 5,
    effect: (level) => level * 2,
    effectLabel: (level) => `Pula ${level * 2} estágios`,
    maxLevel: 5,
  },
  {
    id: 'soul_collector',
    name: 'Colecionador de Almas',
    icon: '👻',
    description: 'Bosses dropam mais mana.',
    cost: 4,
    effect: (level) => 1 + level * 0.5,
    effectLabel: (level) => `+${level * 50}% Mana de Boss`,
    maxLevel: 10,
  },
];
