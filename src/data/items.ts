import { ItemDef, ItemRarity } from '../types';

export const RARITY_COLORS: Record<ItemRarity, string> = {
  common: '#9ca3af',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  epic: '#a855f7',
  legendary: '#f59e0b',
};

export const RARITY_NAMES: Record<ItemRarity, string> = {
  common: 'Comum',
  uncommon: 'Incomum',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Lendário',
};

export const RARITY_GLOW: Record<ItemRarity, string> = {
  common: 'none',
  uncommon: '0 0 8px rgba(34,197,94,0.4)',
  rare: '0 0 12px rgba(59,130,246,0.5)',
  epic: '0 0 16px rgba(168,85,247,0.6)',
  legendary: '0 0 20px rgba(245,158,11,0.7)',
};

export const ITEMS: ItemDef[] = [
  // ========== WEAPONS (20 itens) ==========
  // COMUM
  { id: 'rusty_sword', name: 'Espada Enferrujada', slot: 'weapon', rarity: 'common', icon: '🗡️', baseStat: 5, statType: 'damage', dropWeight: 100 },
  { id: 'iron_blade', name: 'Lâmina de Ferro', slot: 'weapon', rarity: 'common', icon: '⚔️', baseStat: 12, statType: 'damage', dropWeight: 80 },
  { id: 'bone_club', name: 'Clava de Ossos', slot: 'weapon', rarity: 'common', icon: '🦴', baseStat: 8, statType: 'damage', dropWeight: 90 },
  { id: 'stone_axe', name: 'Machado de Pedra', slot: 'weapon', rarity: 'common', icon: '🪓', baseStat: 10, statType: 'damage', dropWeight: 85 },
  { id: 'stick_wand', name: 'Cajado de Graveto', slot: 'weapon', rarity: 'common', icon: '🪵', baseStat: 6, statType: 'damage', dropWeight: 95 },
  
  // INCOMUM
  { id: 'shadow_dagger', name: 'Adaga Sombria', slot: 'weapon', rarity: 'uncommon', icon: '🔪', baseStat: 25, statType: 'damage', dropWeight: 50 },
  { id: 'flame_sword', name: 'Espada Ígnea', slot: 'weapon', rarity: 'uncommon', icon: '🔥', baseStat: 40, statType: 'damage', dropWeight: 35 },
  { id: 'thunder_hammer', name: 'Martelo do Trovão', slot: 'weapon', rarity: 'uncommon', icon: '🔨', baseStat: 35, statType: 'damage', dropWeight: 40 },
  { id: 'poison_fang', name: 'Presa Venenosa', slot: 'weapon', rarity: 'uncommon', icon: '🐍', baseStat: 30, statType: 'damage', dropWeight: 45 },
  { id: 'crystal_wand', name: 'Cajado de Cristal', slot: 'weapon', rarity: 'uncommon', icon: '🔮', baseStat: 32, statType: 'damage', dropWeight: 42 },
  
  // RARO
  { id: 'frost_staff', name: 'Cajado Glacial', slot: 'weapon', rarity: 'rare', icon: '❄️', baseStat: 80, statType: 'damage', dropWeight: 20 },
  { id: 'void_blade', name: 'Lâmina do Vazio', slot: 'weapon', rarity: 'rare', icon: '🌀', baseStat: 120, statType: 'damage', dropWeight: 15 },
  { id: 'blood_reaper', name: 'Ceifador de Sangue', slot: 'weapon', rarity: 'rare', icon: '🩸', baseStat: 100, statType: 'damage', dropWeight: 18 },
  { id: 'dragon_slayer', name: 'Matador de Dragões', slot: 'weapon', rarity: 'rare', icon: '🐉', baseStat: 110, statType: 'damage', dropWeight: 16 },
  { id: 'holy_staff', name: 'Cajado Sagrado', slot: 'weapon', rarity: 'rare', icon: '✝️', baseStat: 90, statType: 'damage', dropWeight: 19 },
  
  // ÉPICO
  { id: 'holy_mace', name: 'Maça Sagrada', slot: 'weapon', rarity: 'epic', icon: '🔨', baseStat: 200, statType: 'damage', dropWeight: 8 },
  { id: 'dragon_fang', name: 'Presa de Dragão', slot: 'weapon', rarity: 'epic', icon: '🐉', baseStat: 350, statType: 'damage', dropWeight: 5 },
  { id: 'soul_edge', name: 'Fio da Alma', slot: 'weapon', rarity: 'epic', icon: '👻', baseStat: 280, statType: 'damage', dropWeight: 6 },
  { id: 'chaos_blade', name: 'Lâmina do Caos', slot: 'weapon', rarity: 'epic', icon: '💫', baseStat: 320, statType: 'damage', dropWeight: 5 },
  { id: 'shadow_katana', name: 'Katana das Sombras', slot: 'weapon', rarity: 'epic', icon: '⚔️', baseStat: 300, statType: 'damage', dropWeight: 6 },
  
  // LENDÁRIO
  { id: 'excalibur', name: 'Excalibur', slot: 'weapon', rarity: 'legendary', icon: '⚔️', baseStat: 750, statType: 'damage', dropWeight: 2 },
  { id: 'soul_reaper', name: 'Ceifador de Almas', slot: 'weapon', rarity: 'legendary', icon: '💀', baseStat: 1200, statType: 'damage', dropWeight: 1 },
  { id: 'reality_breaker', name: 'Quebrador de Realidade', slot: 'weapon', rarity: 'legendary', icon: '💥', baseStat: 900, statType: 'damage', dropWeight: 1.5 },
  { id: 'eternal_edge', name: 'Fio Eterno', slot: 'weapon', rarity: 'legendary', icon: '✨', baseStat: 850, statType: 'damage', dropWeight: 1.5 },
  { id: 'void_scythe', name: 'Foice do Vazio', slot: 'weapon', rarity: 'legendary', icon: '🌀', baseStat: 1000, statType: 'damage', dropWeight: 1 },

  // ========== ARMORS (20 itens) ==========
  // COMUM
  { id: 'cloth_vest', name: 'Vestimenta de Pano', slot: 'armor', rarity: 'common', icon: '👕', baseStat: 10, statType: 'hp', dropWeight: 100 },
  { id: 'leather_armor', name: 'Armadura de Couro', slot: 'armor', rarity: 'common', icon: '🦺', baseStat: 25, statType: 'hp', dropWeight: 80 },
  { id: 'padded_vest', name: 'Colete Acolchoado', slot: 'armor', rarity: 'common', icon: '🧥', baseStat: 15, statType: 'hp', dropWeight: 90 },
  { id: 'scale_mail', name: 'Cota de Escamas', slot: 'armor', rarity: 'common', icon: '🐲', baseStat: 20, statType: 'hp', dropWeight: 85 },
  { id: 'fur_cloak', name: 'Manto de Pelúcia', slot: 'armor', rarity: 'common', icon: '🐺', baseStat: 12, statType: 'hp', dropWeight: 92 },
  
  // INCOMUM
  { id: 'chainmail', name: 'Cota de Malha', slot: 'armor', rarity: 'uncommon', icon: '🛡️', baseStat: 50, statType: 'hp', dropWeight: 45 },
  { id: 'plate_armor', name: 'Armadura de Placas', slot: 'armor', rarity: 'uncommon', icon: '🛡️', baseStat: 80, statType: 'hp', dropWeight: 30 },
  { id: 'bone_shield', name: 'Escudo de Ossos', slot: 'armor', rarity: 'uncommon', icon: '🦴', baseStat: 40, statType: 'hp', dropWeight: 48 },
  { id: 'dark_cloak', name: 'Manto Negro', slot: 'armor', rarity: 'uncommon', icon: '🧥', baseStat: 35, statType: 'hp', dropWeight: 50 },
  { id: 'reinforced_leather', name: 'Couro Reforçado', slot: 'armor', rarity: 'uncommon', icon: '🦺', baseStat: 45, statType: 'hp', dropWeight: 47 },
  
  // RARO
  { id: 'shadow_cloak', name: 'Manto das Sombras', slot: 'armor', rarity: 'rare', icon: '🧥', baseStat: 150, statType: 'hp', dropWeight: 18 },
  { id: 'dragon_scale', name: 'Escama de Dragão', slot: 'armor', rarity: 'rare', icon: '🐲', baseStat: 250, statType: 'hp', dropWeight: 12 },
  { id: 'crystal_plate', name: 'Placas de Cristal', slot: 'armor', rarity: 'rare', icon: '💎', baseStat: 180, statType: 'hp', dropWeight: 16 },
  { id: 'frost_armor', name: 'Armadura de Gelo', slot: 'armor', rarity: 'rare', icon: '❄️', baseStat: 200, statType: 'hp', dropWeight: 15 },
  { id: 'void_shroud', name: 'Sudário do Vazio', slot: 'armor', rarity: 'rare', icon: '👻', baseStat: 170, statType: 'hp', dropWeight: 17 },
  
  // ÉPICO
  { id: 'divine_plate', name: 'Armadura Divina', slot: 'armor', rarity: 'epic', icon: '✨', baseStat: 500, statType: 'hp', dropWeight: 6 },
  { id: 'berserker_plate', name: 'Armadura do Berserker', slot: 'armor', rarity: 'epic', icon: '😡', baseStat: 450, statType: 'hp', dropWeight: 7 },
  { id: 'shadow_plate', name: 'Armadura das Sombras', slot: 'armor', rarity: 'epic', icon: '🌑', baseStat: 480, statType: 'hp', dropWeight: 6.5 },
  { id: 'phoenix_mail', name: 'Cota da Fênix', slot: 'armor', rarity: 'epic', icon: '🔥', baseStat: 520, statType: 'hp', dropWeight: 5.5 },
  { id: 'titan_plate', name: 'Armadura do Titã', slot: 'armor', rarity: 'epic', icon: '🗿', baseStat: 600, statType: 'hp', dropWeight: 4 },
  
  // LENDÁRIO
  { id: 'immortal_cuirass', name: 'Couraça Imortal', slot: 'armor', rarity: 'legendary', icon: '👑', baseStat: 1500, statType: 'hp', dropWeight: 2 },
  { id: 'void_armor', name: 'Armadura do Vazio', slot: 'armor', rarity: 'legendary', icon: '🌀', baseStat: 1800, statType: 'hp', dropWeight: 1 },
  { id: 'celestial_plate', name: 'Armadura Celestial', slot: 'armor', rarity: 'legendary', icon: '🌟', baseStat: 1600, statType: 'hp', dropWeight: 1.5 },
  { id: 'blood_armor', name: 'Armadura de Sangue', slot: 'armor', rarity: 'legendary', icon: '🩸', baseStat: 1400, statType: 'hp', dropWeight: 1.5 },
  { id: 'eternal_guard', name: 'Guarda Eterna', slot: 'armor', rarity: 'legendary', icon: '🛡️', baseStat: 2000, statType: 'hp', dropWeight: 0.8 },

  // ========== ACCESSORIES (20 itens) ==========
  // COMUM
  { id: 'lucky_ring', name: 'Anel da Sorte', slot: 'accessory', rarity: 'common', icon: '💍', baseStat: 5, statType: 'gold', dropWeight: 90 },
  { id: 'iron_pendant', name: 'Pingente de Ferro', slot: 'accessory', rarity: 'common', icon: '📿', baseStat: 3, statType: 'damage', dropWeight: 95 },
  { id: 'leather_bracelet', name: 'Pulseira de Couro', slot: 'accessory', rarity: 'common', icon: '⌚', baseStat: 4, statType: 'hp', dropWeight: 92 },
  { id: 'bone_necklace', name: 'Colar de Ossos', slot: 'accessory', rarity: 'common', icon: '🦴', baseStat: 2, statType: 'critChance', dropWeight: 98 },
  { id: 'stone_ring', name: 'Anel de Pedra', slot: 'accessory', rarity: 'common', icon: '💍', baseStat: 6, statType: 'hp', dropWeight: 88 },
  
  // INCOMUM
  { id: 'crit_amulet', name: 'Amuleto Crítico', slot: 'accessory', rarity: 'uncommon', icon: '📿', baseStat: 3, statType: 'critChance', dropWeight: 40 },
  { id: 'gold_charm', name: 'Talismã Dourado', slot: 'accessory', rarity: 'uncommon', icon: '🪙', baseStat: 15, statType: 'gold', dropWeight: 35 },
  { id: 'swift_boots', name: 'Botas da Velocidade', slot: 'accessory', rarity: 'uncommon', icon: '👟', baseStat: 5, statType: 'critChance', dropWeight: 38 },
  { id: 'mana_crystal_ring', name: 'Anel de Cristal de Mana', slot: 'accessory', rarity: 'uncommon', icon: '💎', baseStat: 10, statType: 'gold', dropWeight: 42 },
  { id: 'shadow_cloak_pin', name: 'Broche do Manto Sombrio', slot: 'accessory', rarity: 'uncommon', icon: '📌', baseStat: 8, statType: 'damage', dropWeight: 44 },
  
  // RARO
  { id: 'berserker_ring', name: 'Anel do Berserker', slot: 'accessory', rarity: 'rare', icon: '💥', baseStat: 20, statType: 'critDmg', dropWeight: 18 },
  { id: 'vampiric_pendant', name: 'Pingente Vampírico', slot: 'accessory', rarity: 'rare', icon: '🧛', baseStat: 25, statType: 'damage', dropWeight: 15 },
  { id: 'frost_necklace', name: 'Colar de Gelo', slot: 'accessory', rarity: 'rare', icon: '❄️', baseStat: 15, statType: 'critChance', dropWeight: 20 },
  { id: 'flame_ring', name: 'Anel de Fogo', slot: 'accessory', rarity: 'rare', icon: '🔥', baseStat: 22, statType: 'damage', dropWeight: 17 },
  { id: 'void_pendant', name: 'Pingente do Vazio', slot: 'accessory', rarity: 'rare', icon: '🌀', baseStat: 18, statType: 'critDmg', dropWeight: 19 },
  
  // ÉPICO
  { id: 'crown_fortune', name: 'Coroa da Fortuna', slot: 'accessory', rarity: 'epic', icon: '👑', baseStat: 40, statType: 'gold', dropWeight: 7 },
  { id: 'eye_of_storm', name: 'Olho da Tempestade', slot: 'accessory', rarity: 'epic', icon: '👁️', baseStat: 8, statType: 'critChance', dropWeight: 5 },
  { id: 'heart_of_phoenix', name: 'Coração da Fênix', slot: 'accessory', rarity: 'epic', icon: '❤️', baseStat: 35, statType: 'hp', dropWeight: 6 },
  { id: 'dragon_eye', name: 'Olho de Dragão', slot: 'accessory', rarity: 'epic', icon: '🐉', baseStat: 30, statType: 'critChance', dropWeight: 6.5 },
  { id: 'soul_ring', name: 'Anel da Alma', slot: 'accessory', rarity: 'epic', icon: '👻', baseStat: 45, statType: 'damage', dropWeight: 5.5 },
  
  // LENDÁRIO
  { id: 'infinity_gem', name: 'Gema do Infinito', slot: 'accessory', rarity: 'legendary', icon: '💎', baseStat: 50, statType: 'damage', dropWeight: 2 },
  { id: 'reality_ring', name: 'Anel da Realidade', slot: 'accessory', rarity: 'legendary', icon: '💍', baseStat: 60, statType: 'critDmg', dropWeight: 1 },
  { id: 'void_crown', name: 'Coroa do Vazio', slot: 'accessory', rarity: 'legendary', icon: '👑', baseStat: 55, statType: 'gold', dropWeight: 1.5 },
  { id: 'celestial_pendant', name: 'Pingente Celestial', slot: 'accessory', rarity: 'legendary', icon: '🌟', baseStat: 40, statType: 'hp', dropWeight: 1.5 },
  { id: 'eternal_band', name: 'Aliança Eterna', slot: 'accessory', rarity: 'legendary', icon: '💫', baseStat: 65, statType: 'damage', dropWeight: 0.8 },
];

// Drop chances by rarity (percentage)
export const RARITY_CHANCE: Record<ItemRarity, number> = {
  common: 50,
  uncommon: 30,
  rare: 14,
  epic: 5,
  legendary: 1,
};

// Upgrade cost per item level
export function itemUpgradeCost(rarity: ItemRarity, level: number): number {
  const base: Record<ItemRarity, number> = { common: 10, uncommon: 25, rare: 60, epic: 150, legendary: 400 };
  return Math.floor(base[rarity] * Math.pow(1.3, level));
}
