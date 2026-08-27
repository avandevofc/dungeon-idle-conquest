import { ShopItem, DailyChallenge, DungeonTheme } from '../types';

// Only items whose effects are implemented in useGameEngine.ts buyShopItem
export const SHOP_ITEMS: ShopItem[] = [
  // ========== OURO — MANA ==========
  { id: 'mana_crystal_small', name: 'Cristal Menor', icon: '💠', category: 'upgrades', description: '+10 Mana', price: 500, priceType: 'gold', effect: 'mana_10', repeatable: true },
  { id: 'mana_crystal_large', name: 'Cristal Maior', icon: '💎', category: 'upgrades', description: '+50 Mana', price: 5000, priceType: 'gold', effect: 'mana_50', repeatable: true },
  { id: 'mana_crystal_huge', name: 'Cristal Âmbar', icon: '🔮', category: 'upgrades', description: '+200 Mana', price: 50000, priceType: 'gold', effect: 'mana_200', repeatable: true },

  // ========== OURO — SLOTS DE INVENTÁRIO ==========
  { id: 'inv_slot_1', name: 'Bolsa de Couro', icon: '🎒', category: 'utility', description: '+5 Slots de Inventário', price: 2000, priceType: 'gold', effect: 'inv_slot_5', repeatable: true },
  { id: 'inv_slot_2', name: 'Mochila do Viajante', icon: '🎒', category: 'utility', description: '+5 Slots de Inventário', price: 8000, priceType: 'gold', effect: 'inv_slot_5', repeatable: true },
  { id: 'inv_slot_3', name: 'Baú Expandido', icon: '📦', category: 'utility', description: '+5 Slots de Inventário', price: 25000, priceType: 'gold', effect: 'inv_slot_5', repeatable: true },
  { id: 'inv_slot_4', name: 'Dimensão Bolsa', icon: '🌀', category: 'utility', description: '+10 Slots de Inventário', price: 100000, priceType: 'gold', effect: 'inv_slot_10', repeatable: true },
  { id: 'inv_slot_5', name: 'Bolsa Infinita', icon: '♾️', category: 'utility', description: '+20 Slots de Inventário', price: 500000, priceType: 'gold', effect: 'inv_slot_20', repeatable: true },

  // ========== OURO — CONSUMÁVEIS ==========
  { id: 'heal_potion', name: 'Poção de Cura', icon: '🧪', category: 'consumables', description: 'Cura todos os heróis em 50%', price: 50, priceType: 'gold', effect: 'heal_all', repeatable: true },
  { id: 'resurrection_scroll', name: 'Pergaminho de Ressurreição', icon: '📜', category: 'consumables', description: 'Ressuscita todos os heróis mortos', price: 1500, priceType: 'gold', effect: 'revive_all', repeatable: true },
  { id: 'mega_potion', name: 'Mega Poção', icon: '💖', category: 'consumables', description: 'Cura 100% de todos os heróis', price: 3000, priceType: 'gold', effect: 'mega_heal', repeatable: true },

  // ========== MANA — PACKS ==========
  { id: 'mana_hero_pack', name: 'Pacote de Heróis', icon: '🦸', category: 'premium', description: 'Todos os heróis ganham +5 níveis', price: 400, priceType: 'mana', effect: 'hero_level_pack', repeatable: true },
  { id: 'mana_gold_pack', name: 'Pacote Dourado', icon: '💰', category: 'premium', description: 'Receba 10x o ouro da dungeon atual', price: 150, priceType: 'mana', effect: 'gold_10x_current', repeatable: true },

  // ========== PRESTIGE — RECURSOS ==========
  { id: 'prestige_gold_pack', name: 'Pacote Dourado', icon: '🪙', category: 'upgrades', description: '+5.000 Ouro', price: 2, priceType: 'prestige', effect: 'gold_5000', repeatable: true },
  { id: 'prestige_mana_pack', name: 'Pacote de Mana', icon: '💎', category: 'upgrades', description: '+50 Mana', price: 3, priceType: 'prestige', effect: 'mana_50', repeatable: true },
  { id: 'prestige_skill_point', name: 'Ponto de Habilidade', icon: '⭐', category: 'upgrades', description: '+1 Ponto de Skill', price: 5, priceType: 'prestige', effect: 'skill_point', repeatable: true },
  { id: 'prestige_mega_slot', name: 'Dimensão Extra', icon: '📦', category: 'premium', description: '+15 Slots de Inventário', price: 12, priceType: 'prestige', effect: 'inv_slot_15', repeatable: true },
];

// Daily challenge
const CHALLENGE_MODIFIERS = [
  { name: 'Modo Furioso', desc: '2x HP, 3x Ouro', hpMult: 2, goldMult: 3 },
  { name: 'Modo Relâmpago', desc: '1.5x HP, inimigos rápidos, 2x Ouro', hpMult: 1.5, goldMult: 2 },
  { name: 'Modo Titânico', desc: '5x HP, 5x Ouro, 2x Mana', hpMult: 5, goldMult: 5 },
  { name: 'Modo Glass Cannon', desc: '0.5x HP, 4x Ouro', hpMult: 0.5, goldMult: 4 },
  { name: 'Modo Abissal', desc: '3x HP, 2x Ouro, boss extra difícil', hpMult: 3, goldMult: 2 },
  { name: 'Modo Dourado', desc: '2x HP, 6x Ouro', hpMult: 2, goldMult: 6 },
  { name: 'Modo Mana Rush', desc: '2x HP, 3x Mana', hpMult: 2, goldMult: 2 },
  { name: 'Modo Caos', desc: '4x HP, 4x Ouro, 2x Mana', hpMult: 4, goldMult: 4 },
];

const CHALLENGE_THEMES: DungeonTheme[] = ['Trevas', 'Vulcânica', 'Glacial', 'Abismo', 'Celestial', 'Cripta', 'Infernal', 'Dimensional'];

export function generateDailyChallenge(dateStr: string): DailyChallenge {
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = ((seed << 5) - seed) + dateStr.charCodeAt(i);
    seed |= 0;
  }

  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  const modifierIdx = Math.floor(rand() * CHALLENGE_MODIFIERS.length);
  const themeIdx = Math.floor(rand() * CHALLENGE_THEMES.length);
  const mod = CHALLENGE_MODIFIERS[modifierIdx];
  const theme = CHALLENGE_THEMES[themeIdx];

  return {
    id: `daily-${dateStr}`,
    name: `Desafio Diário: ${mod.name}`,
    description: mod.desc,
    theme,
    modifier: mod.desc,
    reward: { type: 'prestige', amount: 1 },
    completed: false,
    date: dateStr,
    dungeonNumber: Math.floor(rand() * 10) + 1,
    hpMultiplier: mod.hpMult,
    goldMultiplier: mod.goldMult,
  };
}

export function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
