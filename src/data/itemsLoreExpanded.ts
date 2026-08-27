// ==========================================
// ITENS ADICIONAIS COM LORE EXPANDIDO — Dungeon Idle Conquest
// ==========================================

export interface ItemLoreExpanded {
  id: string;
  name: string;
  slot: 'weapon' | 'armor' | 'accessory';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: string;
  baseStat: number;
  statType: 'damage' | 'hp' | 'gold' | 'critChance' | 'critDmg';
  description: string;
  lore: string;
  funFact: string;
}

// ========== ITENS ADICIONAIS COM LORE ==========

export const ITENS_ADICIONAIS: ItemLoreExpanded[] = [
  // ===== ARMAS ADICIONAIS =====
  {
    id: 'crystal_dagger',
    name: 'Adaga de Cristal',
    slot: 'weapon',
    rarity: 'uncommon',
    icon: '💎',
    baseStat: 35,
    statType: 'damage',
    description: 'Adaga feita com cristal puro quebrado em pedaços afiados.',
    lore: 'O cristal veio de uma caverna onde曾 existiu um mago que transformava pedras em diamantes.',
    funFact: 'É tão afiada que corta o próprio ar — e às vezes corta o usuário.',
  },
  {
    id: 'shadow_bow',
    name: 'Arco das Sombras',
    slot: 'weapon',
    rarity: 'rare',
    icon: '🏹',
    baseStat: 95,
    statType: 'damage',
    description: 'Arco que dispara flechas de escuridão pura que perseguem o alvo.',
    lore: 'Forjado com madeira de uma árvore que cresceu em um cemitério durante 1000 anos.',
    funFact: 'As flechas perseguem o alvo — mas às vezes perseguem o arqueiro por engano.',
  },
  {
    id: 'thunder_axe',
    name: 'Machado do Trovão',
    slot: 'weapon',
    rarity: 'rare',
    icon: '⚡',
    baseStat: 110,
    statType: 'damage',
    description: 'Machado que convoca raios quando golpeia, causando dano elétrico.',
    lore: 'Forjado com metal atingido por 100 trovões simultâneos — é quase impossível.',
    funFact: 'Já causou 3 apagões na vila ao lado — é um problema elétrico.',
  },
  {
    id: 'blood_sword',
    name: 'Espada de Sangue',
    slot: 'weapon',
    rarity: 'epic',
    icon: '🩸',
    baseStat: 280,
    statType: 'damage',
    description: 'Espada que se alimenta do sangue dos inimigos e se fortalece.',
    lore: 'Forjada com sangue de 100 dragões e lágrimas de 1000 heróis.',
    funFact: 'A espada chora sangue quando está com fome — é como um animal de estimação.',
  },
  {
    id: 'void_staff',
    name: 'Cajado do Vazio',
    slot: 'weapon',
    rarity: 'legendary',
    icon: '🌀',
    baseStat: 950,
    statType: 'damage',
    description: 'Cajado que canaliza o poder do vazio entre dimensões.',
    lore: 'Forjado pelo Senhor do Vazio como presente de aniversário para si mesmo.',
    funFact: 'O cajado é tão poderoso que o usuário precisa de óculos escuros para olhá-lo.',
  },

  // ===== ARMADURAS ADICIONAIS =====
  {
    id: 'leather_vest',
    name: 'Colete de Couro',
    slot: 'armor',
    rarity: 'common',
    icon: '🦺',
    baseStat: 18,
    statType: 'hp',
    description: 'Colete de couro resistente que protege contra arranhões.',
    lore: 'Feito com couro de monstro que morreu de vergonha — é irônico.',
    funFact: 'O couro é tão fino que dá para ver através dele — é quase transparente.',
  },
  {
    id: 'chain_vest',
    name: 'Colete de Malha',
    slot: 'armor',
    rarity: 'uncommon',
    icon: '🔗',
    baseStat: 45,
    statType: 'hp',
    description: 'Cota de malha que distribui o impacto dos golpes.',
    lore: 'Cada anel é menor que um grão de arroz — são milhares deles.',
    funFact: 'O ferreiro levou 3 anos para fazer uma cota inteira — e depois perdeu.',
  },
  {
    id: 'plate_vest',
    name: 'Colete de Placas',
    slot: 'armor',
    rarity: 'rare',
    icon: '🛡️',
    baseStat: 170,
    statType: 'hp',
    description: 'Armadura de placas que cobrem o corpo inteiro.',
    lore: 'O mais pesado que um humano consegue carregar — e ainda assim, monstros destroem.',
    funFact: 'O usuário não consegue se curvar para pegar algo no chão — é impraticável.',
  },
  {
    id: 'dragon_armor',
    name: 'Armadura de Dragão',
    slot: 'armor',
    rarity: 'epic',
    icon: '🐲',
    baseStat: 550,
    statType: 'hp',
    description: 'Armadura feita com escamas de dragão que resiste a fogo e gelo.',
    lore: 'Forjada com escamas de 10 dragões diferentes — cada uma com uma cor.',
    funFact: 'A armadura ainda é quente — o dragão original está bravo.',
  },
  {
    id: 'void_armor',
    name: 'Armadura do Vazio',
    slot: 'armor',
    rarity: 'legendary',
    icon: '🌀',
    baseStat: 1800,
    statType: 'hp',
    description: 'Armadura que existe em múltiplas dimensões, impossível de destruir.',
    lore: 'Criada pelo Senhor do Vazio como presente de aniversário para si mesmo.',
    funFact: 'O usuário às vezes sente braços extras — são de outras dimensões.',
  },

  // ===== ACESSÓRIOS ADICIONAIS =====
  {
    id: 'lucky_charm',
    name: 'Talismã da Sorte',
    slot: 'accessory',
    rarity: 'common',
    icon: '🍀',
    baseStat: 4,
    statType: 'gold',
    description: 'Talismã que traz sorte — ou pelo menos a pessoa acredita.',
    lore: 'Feito com ouro de um leprechaun que estava de bom humor.',
    funFact: 'O talismã já foi perdido 7 vezes — mas sempre aparece no bolso certo.',
  },
  {
    id: 'crit_ring',
    name: 'Anel do Crítico',
    slot: 'accessory',
    rarity: 'uncommon',
    icon: '💍',
    baseStat: 4,
    statType: 'critChance',
    description: 'Anel que aumenta a chance de acertos críticos.',
    lore: 'Feito com cristal de um mago que só acertava críticos — e depois morreu.',
    funFact: 'O anel vibra quando o usuário está prestes a acertar um crítico.',
  },
  {
    id: 'speed_boots',
    name: 'Botas da Velocidade',
    slot: 'accessory',
    rarity: 'rare',
    icon: '👟',
    baseStat: 12,
    statType: 'critChance',
    description: 'Botas que aumentam a velocidade de ataque significativamente.',
    lore: 'Feitas com asas de um grifo que não sabia voar.',
    funFact: 'O usuário corre tão rápido que às vezes esquece para onde estava indo.',
  },
  {
    id: 'dragon_pendant',
    name: 'Pingente de Dragão',
    slot: 'accessory',
    rarity: 'epic',
    icon: '🐉',
    baseStat: 35,
    statType: 'damage',
    description: 'Pingente com presa de dragão que aumenta o dano massivamente.',
    lore: 'Extraído de um dragão que estava dormindo — ele ainda está bravo.',
    funFact: 'O pingente é tão quente que o usuário precisa de luvas para tocá-lo.',
  },
  {
    id: 'infinity_ring',
    name: 'Anel do Infinito',
    slot: 'accessory',
    rarity: 'legendary',
    icon: '♾️',
    baseStat: 60,
    statType: 'critDmg',
    description: 'Anel que amplifica o dano crítico em níveis absurdos.',
    lore: 'Forjado com fragmentos de tempo congelado e luz de estrela morta.',
    funFact: 'O anel é tão poderoso que o usuário se sente como um deus — temporariamente.',
  },
];

// ========== FUNÇÕES UTILITÁRIAS ==========

export function getAllItemsLore(): ItemLoreExpanded[] {
  return ITENS_ADICIONAIS;
}

export function getItemsBySlot(slot: 'weapon' | 'armor' | 'accessory'): ItemLoreExpanded[] {
  return ITENS_ADICIONAIS.filter(item => item.slot === slot);
}

export function getItemsByRarity(rarity: string): ItemLoreExpanded[] {
  return ITENS_ADICIONAIS.filter(item => item.rarity === rarity);
}

export function getItemLoreById(id: string): ItemLoreExpanded | undefined {
  return ITENS_ADICIONAIS.find(item => item.id === id);
}

export function getTotalItemsCount(): number {
  return ITENS_ADICIONAIS.length;
}

export const RARITY_COLORS: Record<string, string> = {
  common: '#9ca3af',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  epic: '#a855f7',
  legendary: '#f59e0b',
};

export const RARITY_NAMES: Record<string, string> = {
  common: 'Comum',
  uncommon: 'Incomum',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Lendário',
};

export default ITENS_ADICIONAIS;
