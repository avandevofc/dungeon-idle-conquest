import { PetDef, PetElement, PetType } from '../types';

// ========== CONSTANTS ==========
export const PET_ELEMENTS: Record<PetElement, { icon: string; name: string; color: string }> = {
  fire: { icon: '🔥', name: 'Fogo', color: '#ef4444' },
  ice: { icon: '❄️', name: 'Gelo', color: '#38bdf8' },
  shadow: { icon: '🌑', name: 'Sombra', color: '#a855f7' },
  light: { icon: '☀️', name: 'Luz', color: '#fbbf24' },
  nature: { icon: '🌿', name: 'Natureza', color: '#22c55e' },
  chaos: { icon: '💀', name: 'Caos', color: '#dc2626' },
  arcane: { icon: '🔮', name: 'Arcano', color: '#c084fc' },
  mechanic: { icon: '⚙️', name: 'Mecânico', color: '#94a3b8' },
};

export const EVOLUTION_STAGES = ['🥚', '🐣', '🐲', '🐉', '💥'];

export const PET_LEVEL_COST = (level: number) => Math.floor(50 * Math.pow(1.5, level));
export const PET_XP_PER_LEVEL = (level: number) => Math.floor(100 * Math.pow(1.3, level));

export const PET_TYPE_COLORS: Record<PetType, string> = {
  attack: '#ef4444',
  support: '#22c55e',
  tank: '#3b82f6',
  utility: '#f59e0b',
};

export const PET_TYPE_NAMES: Record<PetType, string> = {
  attack: 'Ataque',
  support: 'Suporte',
  tank: 'Tanque',
  utility: 'Utilidade',
};

// ========== SYNERGY DEFINITIONS ==========
export const SYNERGY_COMBOS: Record<string, { name: string; bonus: string; value: number }> = {
  'fire+fire': { name: 'Inferno', bonus: 'DPS', value: 15 },
  'fire+light': { name: 'Aurora', bonus: 'DPS+Ouro', value: 10 },
  'fire+nature': { name: 'Incêndio Florestal', bonus: 'DPS+HP', value: 10 },
  'ice+ice': { name: 'Blizzard', bonus: 'Congelamento', value: 20 },
  'ice+shadow': { name: 'Frieza Mortal', bonus: 'Crítico', value: 15 },
  'shadow+shadow': { name: 'Escuridão Total', bonus: 'DPS', value: 20 },
  'shadow+chaos': { name: 'Devastação', bonus: 'DPS+Crítico', value: 12 },
  'light+light': { name: 'Santidade', bonus: 'Cura', value: 25 },
  'light+nature': { name: 'Primavera', bonus: 'Regeneração', value: 20 },
  'nature+nature': { name: 'Floresta Viva', bonus: 'HP+Regen', value: 15 },
  'chaos+chaos': { name: 'Caos Absoluto', bonus: 'DPS Aleatório', value: 30 },
  'arcane+arcane': { name: 'Mana Infinita', bonus: 'Mana', value: 25 },
  'arcane+fire': { name: 'Feitiço Arcano', bonus: 'DPS+Mana', value: 10 },
  'mechanic+mechanic': { name: 'Sobre-carga', bonus: 'Velocidade', value: 20 },
  'mechanic+arcane': { name: 'Magitek', bonus: 'Velocidade+DPS', value: 12 },
  'fire+ice': { name: 'Temperatura Extrema', bonus: 'DPS', value: 12 },
  'light+shadow': { name: 'Eclipse', bonus: 'Crítico+DPS', value: 10 },
};

// ========== 🔥 FIRE PETS ==========
const FIRE_PETS: PetDef[] = [
  {
    id: 'fire_imp', name: 'Diablinho Ardente', icon: '🔥', type: 'attack', element: 'fire', rarity: 'common',
    description: 'Um pequeno demônio que joga bolas de fogo.', lore: 'Nasceu nas chamas de um vulcão ativo.',
    passives: [
      { name: 'Chama Viva', description: '+15% DPS', unlockLevel: 1, effect: (l) => 0.15, effectLabel: '+15% DPS' },
      { name: 'Queimadura', description: 'Inimigos queimam 3%/s', unlockLevel: 10, effect: (l) => 0.03, effectLabel: 'Queima 3%/s' },
      { name: 'Explosão', description: '10% chance de AoE', unlockLevel: 25, effect: (l) => 0.10, effectLabel: '10% AoE' },
    ],
    activeSkill: { id: 'fireball', name: 'Bola de Fogo', icon: '🔥', description: '300% dano AoE + queima 5%/s por 3s', cooldown: 12, damage: 300, aoe: true, dot: { damage: 5, duration: 3 } },
    unlockCondition: 'Derrote 50 inimigos', evolutionStages: ['🥚', '🔥', '👿', '😈', '👹'],
  },
  {
    id: 'salamander', name: 'Salamandra Ígnea', icon: '🦎', type: 'attack', element: 'fire', rarity: 'uncommon',
    description: 'Anfíbio gigante que nada em lava.', lore: 'O calor não a destrói, apenas a fortalece.',
    passives: [
      { name: 'Resistência Ígnea', description: '+20% DPS', unlockLevel: 1, effect: () => 0.20, effectLabel: '+20% DPS' },
      { name: 'Lava Viva', description: 'Dano Adicional 5%/s', unlockLevel: 12, effect: () => 0.05, effectLabel: '+5% Dano/s' },
    ],
    activeSkill: { id: 'lava_surge', name: 'Surto de Lava', icon: '🌋', description: '400% dano AoE por 4s', cooldown: 15, damage: 400, aoe: true },
    unlockCondition: 'Vulcânica 3', evolutionStages: ['🥚', '🦎', '🦎🔥', '🐉', '🐉💥'],
  },
  {
    id: 'fire_drake', name: 'Drake de Fogo', icon: '🐲', type: 'attack', element: 'fire', rarity: 'rare',
    description: 'Jovem dragão que cuspe fogo.', lore: 'Ainda jovem, mas já devora castelos.',
    passives: [
      { name: 'Sopro Ardente', description: '+30% DPS', unlockLevel: 1, effect: () => 0.30, effectLabel: '+30% DPS' },
      { name: 'Escamas de Magma', description: '+15% HP', unlockLevel: 15, effect: () => 0.15, effectLabel: '+15% HP' },
      { name: 'Fúria do Dragão', description: '+20% Crítico', unlockLevel: 30, effect: () => 0.20, effectLabel: '+20% Crítico' },
    ],
    activeSkill: { id: 'dragon_breath', name: 'Sopro do Dragão', icon: '🐲', description: '500% dano AoE + queima 8%/s por 5s', cooldown: 18, damage: 500, aoe: true, dot: { damage: 8, duration: 5 } },
    unlockCondition: 'Vulcânica 10', evolutionStages: ['🥚', '🐣', '🐲', '🐉', '🐉🔥'],
  },
  {
    id: 'phoenix_fire', name: 'Fênix das Cinzas', icon: '🦅', type: 'support', element: 'fire', rarity: 'legendary',
    description: 'Renascida das cinzas, purifica tudo.', lore: 'Cada morte é apenas um novo começo.',
    passives: [
      { name: 'Renascimento', description: '+25% DPS + regen', unlockLevel: 1, effect: () => 0.25, effectLabel: '+25% DPS + Regen' },
      { name: 'Chama Pura', description: '+40% Ouro', unlockLevel: 20, effect: () => 0.40, effectLabel: '+40% Ouro' },
      { name: 'Imortalidade', description: 'Ressuscita herói 1x/s', unlockLevel: 50, effect: () => 1, effectLabel: '1 Ressurreição/s' },
    ],
    activeSkill: { id: 'rebirth', name: 'Renascimento', icon: '🦅', description: 'Cura TODOS heróis 50% HP + buff 50% DPS por 8s', cooldown: 25, heal: 50, buff: { stat: 'dps', value: 50, duration: 8 } },
    unlockCondition: 'Vulcânica 25', evolutionStages: ['🥚', '🔥', '🦅', '🦅✨', '🌟'],
  },
  {
    id: 'magma_golem', name: 'Golem de Magma', icon: '🪨', type: 'tank', element: 'fire', rarity: 'rare',
    description: 'Golem formado por magma solidificado.', lore: 'A pedra derretida forma seu corpo indestrutível.',
    passives: [
      { name: 'Corpo Vulcânico', description: '+25% HP', unlockLevel: 1, effect: () => 0.25, effectLabel: '+25% HP' },
      { name: 'Magma Endurecido', description: '-20% dano recebido', unlockLevel: 15, effect: () => 0.20, effectLabel: '-20% Dano' },
    ],
    activeSkill: { id: 'magma_shield', name: 'Escudo Vulcânico', icon: '🛡️', description: 'Absorve 100% dano por 5s + reflete 20%', cooldown: 20, buff: { stat: 'defense', value: 100, duration: 5 } },
    unlockCondition: 'Vulcânica 8', evolutionStages: ['🥚', '🪨', '🪨🔥', '🪨🌋', '🌋'],
  },
];

// ❄️ ICE PETS
const ICE_PETS: PetDef[] = [
  {
    id: 'ice_sprite', name: 'Espírito Gelado', icon: '❄️', type: 'support', element: 'ice', rarity: 'common',
    description: 'Um espírito que congela inimigos.', lore: 'Cada gota de sua presença vira gelo.',
    passives: [
      { name: 'Geada', description: '+15% DPS', unlockLevel: 1, effect: () => 0.15, effectLabel: '+15% DPS' },
      { name: 'Congelamento', description: 'Lentidão 10%', unlockLevel: 10, effect: () => 0.10, effectLabel: 'Lentidão 10%' },
    ],
    activeSkill: { id: 'frost_nova', name: 'Nova Congelante', icon: '❄️', description: 'Congela todos 3s + 200% dano', cooldown: 14, damage: 200, aoe: true, debuff: { stat: 'speed', value: 100, duration: 3 } },
    unlockCondition: 'Glacial 3', evolutionStages: ['🥚', '❄️', '🧊', '🥶', '💎'],
  },
  {
    id: 'frost_wolf', name: 'Lobo Glacial', icon: '🐺', type: 'attack', element: 'ice', rarity: 'uncommon',
    description: 'Lobo que caça entre nevascas.', lore: 'Seu uivo congela a alma.',
    passives: [
      { name: 'Presas de Gelo', description: '+25% DPS', unlockLevel: 1, effect: () => 0.25, effectLabel: '+25% DPS' },
      { name: 'Frieza Mortal', description: '+15% Crítico', unlockLevel: 15, effect: () => 0.15, effectLabel: '+15% Crítico' },
    ],
    activeSkill: { id: 'ice_fang', name: 'Presa Glacial', icon: '🐺', description: '400% dano single target + lentidão 50% por 4s', cooldown: 10, damage: 400, debuff: { stat: 'speed', value: 50, duration: 4 } },
    unlockCondition: 'Glacial 8', evolutionStages: ['🥚', '🐺', '🐺❄️', '🐺💎', '🐺✨'],
  },
  {
    id: 'ice_golem', name: 'Golem de Gelo', icon: '🧊', type: 'tank', element: 'ice', rarity: 'rare',
    description: 'Golem de gelo eterno.', lore: 'Formado há milênios, nunca derrete.',
    passives: [
      { name: 'Gelo Eterno', description: '+30% HP', unlockLevel: 1, effect: () => 0.30, effectLabel: '+30% HP' },
      { name: 'Casca de Gelo', description: '-25% dano recebido', unlockLevel: 20, effect: () => 0.25, effectLabel: '-25% Dano' },
    ],
    activeSkill: { id: 'ice_wall', name: 'Parede de Gelo', icon: '🧊', description: 'Barreira 80% absorve dano por 6s', cooldown: 18, buff: { stat: 'defense', value: 80, duration: 6 } },
    unlockCondition: 'Glacial 12', evolutionStages: ['🥚', '🧊', '🧊❄️', '🧊💎', '💠'],
  },
  {
    id: 'frost_serpent', name: 'Serpente Glacial', icon: '🐍', type: 'attack', element: 'ice', rarity: 'epic',
    description: 'Serpente que morde com frio eterno.', lore: 'Seu veneno congela o sangue.',
    passives: [
      { name: 'Mordida Glacial', description: '+40% DPS', unlockLevel: 1, effect: () => 0.40, effectLabel: '+40% DPS' },
      { name: 'Veneno Congelante', description: 'DoT 8%/s', unlockLevel: 20, effect: () => 0.08, effectLabel: 'DoT 8%/s' },
      { name: 'Escuridão', description: '+25% DPS no escuro', unlockLevel: 40, effect: () => 0.25, effectLabel: '+25% DPS' },
    ],
    activeSkill: { id: 'serpent_venom', name: 'Veno Glacial', icon: '🐍', description: '600% dano + congela 4s', cooldown: 16, damage: 600, debuff: { stat: 'speed', value: 100, duration: 4 } },
    unlockCondition: 'Glacial 20', evolutionStages: ['🥚', '🐍', '🐍❄️', '🐉', '🐉❄️'],
  },
];

// 🌑 SHADOW PETS
const SHADOW_PETS: PetDef[] = [
  {
    id: 'shadow_wolf', name: 'Lobo das Trevas', icon: '🐺', type: 'attack', element: 'shadow', rarity: 'common',
    description: 'Lobo espectral que morde almas.', lore: 'Nasce quando a luz se vai.',
    passives: [
      { name: 'Mordida Sombria', description: '+18% DPS', unlockLevel: 1, effect: () => 0.18, effectLabel: '+18% DPS' },
      { name: 'Evasão', description: '5% chance esquivar', unlockLevel: 12, effect: () => 0.05, effectLabel: '5% Evasão' },
    ],
    activeSkill: { id: 'shadow_bite', name: 'Mordida das Sombras', icon: '🐺', description: '350% dano + rouba 10% vida', cooldown: 11, damage: 350, heal: 10 },
    unlockCondition: 'Trevas 3', evolutionStages: ['🥚', '🐺', '🐺🌑', '🐺💜', '🐺✨'],
  },
  {
    id: 'shadow_bat', name: 'Morcego Vampírico', icon: '🦇', type: 'utility', element: 'shadow', rarity: 'common',
    description: 'Morcego que suga ouro e vida.', lore: 'Onde há ouro, há morcegos.',
    passives: [
      { name: 'Roubo', description: '+20% Ouro', unlockLevel: 1, effect: () => 0.20, effectLabel: '+20% Ouro' },
      { name: 'Sentir Ouro', description: '+10% Drop Item', unlockLevel: 10, effect: () => 0.10, effectLabel: '+10% Item' },
    ],
    activeSkill: { id: 'gold_drain', name: 'Drenar Ouro', icon: '🦇', description: 'Dobra ouro do próximo kill', cooldown: 20, buff: { stat: 'gold', value: 100, duration: 1 } },
    unlockCondition: 'Trevas 1', evolutionStages: ['🥚', '🦇', '🦇🌑', '🦇💜', '🦇✨'],
  },
  {
    id: 'necromancer_pet', name: 'Necromante Júnior', icon: '💀', type: 'support', element: 'shadow', rarity: 'rare',
    description: 'Aprendiz das artes necromânticas.', lore: 'Mortos não descansam quando ele está por perto.',
    passives: [
      { name: 'Necromancia', description: '+25% DPS', unlockLevel: 1, effect: () => 0.25, effectLabel: '+25% DPS' },
      { name: 'Exército Morto', description: 'Invoca esqueleto a cada 30s', unlockLevel: 18, effect: () => 1, effectLabel: 'Invoca Esqueleto' },
    ],
    activeSkill: { id: 'raise_dead', name: 'Ressurreição', icon: '💀', description: 'Invoca 3 esqueletos por 8s', cooldown: 22, damage: 150, aoe: true },
    unlockCondition: 'Cripta 5', evolutionStages: ['🥚', '💀', '💀🌑', '💀👑', '👑'],
  },
  {
    id: 'assassin_shadow', name: 'Assassino das Sombras', icon: '🗡️', type: 'attack', element: 'shadow', rarity: 'epic',
    description: 'Matador silencioso que aparece do nada.', lore: 'Ninguém vê sua lâmina chegar.',
    passives: [
      { name: 'Golpe Furtivo', description: '+35% DPS', unlockLevel: 1, effect: () => 0.35, effectLabel: '+35% DPS' },
      { name: 'Crítico Garantido', description: '+20% Crítico', unlockLevel: 20, effect: () => 0.20, effectLabel: '+20% Crítico' },
      { name: 'Invisível', description: '10% chance evitar dano', unlockLevel: 35, effect: () => 0.10, effectLabel: '10% Evasão' },
    ],
    activeSkill: { id: 'shadow_strike', name: 'Golpe Sombrio', icon: '🗡️', description: '800% dano se inimigo > 50% HP', cooldown: 15, damage: 800 },
    unlockCondition: 'Cripta 15', evolutionStages: ['🥚', '🗡️', '🗡️🌑', '🗡️💜', '👻'],
  },
];

// ☀️ LIGHT PETS
const LIGHT_PETS: PetDef[] = [
  {
    id: 'fairy', name: 'Fada Curandeira', icon: '🧚', type: 'support', element: 'light', rarity: 'common',
    description: 'Fada que cura e abençoa.', lore: 'Suas asas brilham com luz pura.',
    passives: [
      { name: 'Benção', description: '+15% Ouro', unlockLevel: 1, effect: () => 0.15, effectLabel: '+15% Ouro' },
      { name: 'Cura', description: 'Regen 2% HP/s', unlockLevel: 10, effect: () => 0.02, effectLabel: 'Regen 2%/s' },
    ],
    activeSkill: { id: 'fairy_heal', name: 'Cura Encantada', icon: '🧚', description: 'Cura 30% HP de todos + remove debuffs', cooldown: 15, heal: 30 },
    unlockCondition: 'Celestial 3', evolutionStages: ['🥚', '🧚', '🧚✨', '🧚☀️', '👼'],
  },
  {
    id: 'angel_pet', name: 'Anjo Guardião', icon: '👼', type: 'support', element: 'light', rarity: 'legendary',
    description: 'Ser celestial que protege seus heróis.', lore: 'Mandado dos céus para proteger os mortais.',
    passives: [
      { name: 'Proteção Divina', description: '+30% HP + DPS', unlockLevel: 1, effect: () => 0.30, effectLabel: '+30% HP + DPS' },
      { name: 'Aura Sagrada', description: 'Cura 5% HP/s', unlockLevel: 25, effect: () => 0.05, effectLabel: 'Cura 5%/s' },
      { name: 'Vingança', description: '+50% DPS < 30% HP', unlockLevel: 50, effect: () => 0.50, effectLabel: '+50% DPS < 30% HP' },
    ],
    activeSkill: { id: 'divine_shield', name: 'Escudo Divino', icon: '👼', description: 'Imortalidade 4s + cura 40% HP', cooldown: 30, heal: 40, buff: { stat: 'defense', value: 100, duration: 4 } },
    unlockCondition: 'Celestial 25', evolutionStages: ['🥚', '✨', '👼', '👼☀️', '🌟'],
  },
  {
    id: 'unicorn', name: 'Unicórnio Sagrado', icon: '🦄', type: 'support', element: 'light', rarity: 'epic',
    description: 'Criatura pura que remove maldições.', lore: 'Seu chifre cura qualquer doença.',
    passives: [
      { name: 'Pureza', description: '+25% Ouro + DPS', unlockLevel: 1, effect: () => 0.25, effectLabel: '+25% Ouro + DPS' },
      { name: 'Chifre Sagrado', description: '+15% Dano Crítico', unlockLevel: 18, effect: () => 0.15, effectLabel: '+15% Dano Crítico' },
    ],
    activeSkill: { id: 'purify', name: 'Purificação', icon: '🦄', description: 'Remove todos debuffs + buff 40% DPS por 6s', cooldown: 18, buff: { stat: 'dps', value: 40, duration: 6 } },
    unlockCondition: 'Celestial 15', evolutionStages: ['🥚', '🦄', '🦄✨', '🦄☀️', '🦄🌟'],
  },
];

// 🌿 NATURE PETS
const NATURE_PETS: PetDef[] = [
  {
    id: 'slime_green', name: 'Slime Verde', icon: '🟢', type: 'utility', element: 'nature', rarity: 'common',
    description: 'Slime gelatinoso que atrai itens.', lore: 'Coleta tudo que toca.',
    passives: [
      { name: 'Coleta', description: '+20% Item Drop', unlockLevel: 1, effect: () => 0.20, effectLabel: '+20% Item' },
      { name: 'Regeneração', description: 'Regen 1% HP/s', unlockLevel: 8, effect: () => 0.01, effectLabel: 'Regen 1%/s' },
    ],
    activeSkill: { id: 'slime_absorb', name: 'Absorção', icon: '🟢', description: 'Dobra drop do próximo kill', cooldown: 25, buff: { stat: 'itemFind', value: 100, duration: 1 } },
    unlockCondition: 'Derrote 30 inimigos', evolutionStages: ['🥚', '🟢', '🟢🌿', '🟢💚', '💚'],
  },
  {
    id: 'treant', name: 'Treant Jovem', icon: '🌳', type: 'tank', element: 'nature', rarity: 'uncommon',
    description: 'Árvore senciente que protege.', lore: 'Suas raízes seguram o chão.',
    passives: [
      { name: 'Raízes', description: '+25% HP', unlockLevel: 1, effect: () => 0.25, effectLabel: '+25% HP' },
      { name: 'Casca Grossa', description: '-15% dano recebido', unlockLevel: 12, effect: () => 0.15, effectLabel: '-15% Dano' },
    ],
    activeSkill: { id: 'root_wall', name: 'Muralha de Raízes', icon: '🌳', description: 'Escudo 70% por 5s + drena vida', cooldown: 16, heal: 15, buff: { stat: 'defense', value: 70, duration: 5 } },
    unlockCondition: 'Natureza 5', evolutionStages: ['🥚', '🌳', '🌳🌿', '🌳💚', '🌲'],
  },
  {
    id: 'nature_fairy', name: 'Fada da Floresta', icon: '🌺', type: 'support', element: 'nature', rarity: 'rare',
    description: 'Fada que comanda plantas.', lore: 'As flores desabrocham onde ela pisa.',
    passives: [
      { name: 'Florescer', description: '+30% Ouro + DPS', unlockLevel: 1, effect: () => 0.30, effectLabel: '+30% Ouro + DPS' },
      { name: 'Espinhos', description: 'Reflete 10% dano', unlockLevel: 18, effect: () => 0.10, effectLabel: 'Reflete 10%' },
    ],
    activeSkill: { id: 'flower_storm', name: 'Tempestade de Flores', icon: '🌺', description: '250% dano AoE + cura 20% HP', cooldown: 14, damage: 250, heal: 20, aoe: true },
    unlockCondition: 'Natureza 12', evolutionStages: ['🥚', '🌺', '🌺🌿', '🌺💚', '🌸'],
  },
];

// 💀 CHAOS PETS
const CHAOS_PETS: PetDef[] = [
  {
    id: 'mimic_pet', name: 'Mimic Caçador', icon: '📦', type: 'utility', element: 'chaos', rarity: 'rare',
    description: 'Baú que gera loot Aleatório.', lore: 'Nunca se sabe o que tem dentro.',
    passives: [
      { name: 'Loot Aleatório', description: '+25% Item', unlockLevel: 1, effect: () => 0.25, effectLabel: '+25% Item' },
      { name: 'Surpresa', description: '+15% Ouro ou DPS', unlockLevel: 15, effect: () => 0.15, effectLabel: '+15% Aleatório' },
    ],
    activeSkill: { id: 'loot_burst', name: 'Explosão de Loot', icon: '📦', description: 'Dropa 3x itens no próximo kill', cooldown: 30, buff: { stat: 'itemFind', value: 300, duration: 1 } },
    unlockCondition: 'Equipe 5 itens', evolutionStages: ['🥚', '📦', '📦💀', '📦💜', '🎁'],
  },
  {
    id: 'chaos_imp', name: 'Diablinho do Caos', icon: '😈', type: 'attack', element: 'chaos', rarity: 'uncommon',
    description: 'Demônio que causa destruição aleatória.', lore: 'O caos é sua única lei.',
    passives: [
      { name: 'Caos Puro', description: '+20% DPS', unlockLevel: 1, effect: () => 0.20, effectLabel: '+20% DPS' },
      { name: 'Dano Aleatório', description: '+10-40% DPS', unlockLevel: 12, effect: () => 0.25, effectLabel: '+10-40% DPS' },
    ],
    activeSkill: { id: 'chaos_blast', name: 'Explosão de Caos', icon: '😈', description: 'Dano Aleatório 200-800%', cooldown: 12, damage: 500, aoe: true },
    unlockCondition: 'Infernal 5', evolutionStages: ['🥚', '😈', '😈💀', '😈💜', '👿'],
  },
  {
    id: 'chaos_tentacle', name: 'Polvo Abissal', icon: '🐙', type: 'attack', element: 'chaos', rarity: 'epic',
    description: 'Polvo das profundezas do caos.', lore: 'Seus tentáculos alcançam outras dimensões.',
    passives: [
      { name: ' Tentáculos', description: '+35% DPS', unlockLevel: 1, effect: () => 0.35, effectLabel: '+35% DPS' },
      { name: 'Engolir', description: 'Mata inimigos < 5% HP', unlockLevel: 25, effect: () => 0.05, effectLabel: 'Executa < 5% HP' },
    ],
    activeSkill: { id: 'tentacle_slam', name: 'Golpe de Tentáculo', icon: '🐙', description: '600% dano AoE + lentidão 60% por 4s', cooldown: 14, damage: 600, aoe: true, debuff: { stat: 'speed', value: 60, duration: 4 } },
    unlockCondition: 'Abismo 15', evolutionStages: ['🥚', '🐙', '🐙💀', '🐙💜', '🐙✨'],
  },
];

// 🔮 ARCANE PETS
const ARCANE_PETS: PetDef[] = [
  {
    id: 'crystal_pet', name: 'Cristal Arcano', icon: '💎', type: 'support', element: 'arcane', rarity: 'common',
    description: 'Cristal que gera mana.', lore: 'A fonte de todo poder arcano.',
    passives: [
      { name: 'Geração de Mana', description: '+20% Mana Drop', unlockLevel: 1, effect: () => 0.20, effectLabel: '+20% Mana' },
      { name: 'Poder Arcano', description: '+10% DPS', unlockLevel: 10, effect: () => 0.10, effectLabel: '+10% DPS' },
    ],
    activeSkill: { id: 'mana_burst', name: 'Surto de Mana', icon: '💎', description: '+5 mana imediato', cooldown: 30, buff: { stat: 'mana', value: 5, duration: 1 } },
    unlockCondition: 'Acumule 20 mana', evolutionStages: ['🥚', '💎', '💎🔮', '💎💜', '💠'],
  },
  {
    id: 'elemental_arcane', name: 'Elemental Arcano', icon: '🌀', type: 'attack', element: 'arcane', rarity: 'rare',
    description: 'Elemental puro de energia arcanista.', lore: 'Feito de pura energia mágica.',
    passives: [
      { name: 'Energia Pura', description: '+30% DPS', unlockLevel: 1, effect: () => 0.30, effectLabel: '+30% DPS' },
      { name: 'Sobrecarga', description: '+20% Dano Crítico', unlockLevel: 18, effect: () => 0.20, effectLabel: '+20% Dano Crítico' },
    ],
    activeSkill: { id: 'arcane_detonation', name: 'Detonação Arcana', icon: '🌀', description: '500% dano mágico AoE', cooldown: 16, damage: 500, aoe: true },
    unlockCondition: 'Arcano 10', evolutionStages: ['🥚', '🌀', '🌀🔮', '🌀💜', '🌀✨'],
  },
  {
    id: 'sphinx', name: 'Esfinge Misteriosa', icon: '🦁', type: 'utility', element: 'arcane', rarity: 'epic',
    description: 'Esfinge que guarda segredos antigos.', lore: 'Só responde perguntas que ninguém fez.',
    passives: [
      { name: 'Segredos', description: '+30% Ouro + Item', unlockLevel: 1, effect: () => 0.30, effectLabel: '+30% Ouro + Item' },
      { name: 'Sabedoria', description: '+25% XP de pet', unlockLevel: 20, effect: () => 0.25, effectLabel: '+25% XP Pet' },
    ],
    activeSkill: { id: 'riddle', name: 'Enigma', icon: '🦁', description: 'Dobra todas as recompensas por 10s', cooldown: 28, buff: { stat: 'allRewards', value: 100, duration: 10 } },
    unlockCondition: 'Arcano 18', evolutionStages: ['🥚', '🦁', '🦁🔮', '🦁💜', '🦁✨'],
  },
];

// ⚙️ MECHANIC PETS
const MECHANIC_PETS: PetDef[] = [
  {
    id: 'spider_bot', name: 'Aranha Mecânica', icon: '🕷️', type: 'utility', element: 'mechanic', rarity: 'common',
    description: 'Aranha robotizada que coleta recursos.', lore: 'Engrenagens microscópicas movem suas patas.',
    passives: [
      { name: 'Coletor', description: '+15% Ouro + Item', unlockLevel: 1, effect: () => 0.15, effectLabel: '+15% Ouro + Item' },
      { name: 'Radar', description: '+10% Drop', unlockLevel: 8, effect: () => 0.10, effectLabel: '+10% Drop' },
    ],
    activeSkill: { id: 'scan', name: 'Varredura', icon: '🕷️', description: 'Revela弱点 do monstro (+30% DPS por 6s)', cooldown: 15, buff: { stat: 'dps', value: 30, duration: 6 } },
    unlockCondition: 'Derrote 25 inimigos', evolutionStages: ['🥚', '🕷️', '🕷️⚙️', '🕷️🔩', '🤖'],
  },
  {
    id: 'robot', name: 'Robot de Combate', icon: '🤖', type: 'attack', element: 'mechanic', rarity: 'uncommon',
    description: 'Robot programado para destruição.', lore: 'Criado para uma guerra que já acabou.',
    passives: [
      { name: 'Poder de Fogo', description: '+22% DPS', unlockLevel: 1, effect: () => 0.22, effectLabel: '+22% DPS' },
      { name: 'Blindagem', description: '+12% HP', unlockLevel: 10, effect: () => 0.12, effectLabel: '+12% HP' },
    ],
    activeSkill: { id: 'missile', name: 'Mísseis', icon: '🤖', description: '350% dano AoE', cooldown: 12, damage: 350, aoe: true },
    unlockCondition: 'Mecânico 5', evolutionStages: ['🥚', '🤖', '🤖⚙️', '🤖🔩', '🤖💥'],
  },
  {
    id: 'gear_spirit', name: 'Espírito da Engrenagem', icon: '⚙️', type: 'support', element: 'mechanic', rarity: 'rare',
    description: 'Espírito preso em uma engrenagem.', lore: 'Gira eternamente, acelerando tudo.',
    passives: [
      { name: 'Aceleração', description: '+20% Vel. Ataque', unlockLevel: 1, effect: () => 0.20, effectLabel: '+20% Vel. Ataque' },
      { name: 'Eficiência', description: '+15% DPS', unlockLevel: 15, effect: () => 0.15, effectLabel: '+15% DPS' },
    ],
    activeSkill: { id: 'overclock', name: 'Sobre-carga', icon: '⚙️', description: '+60% Vel. Ataque por 8s', cooldown: 20, buff: { stat: 'attackSpeed', value: 60, duration: 8 } },
    unlockCondition: 'Mecânico 12', evolutionStages: ['🥚', '⚙️', '⚙️🔩', '⚙️💜', '⚙️✨'],
  },
];

// ========== ALL PETS ==========
export const PET_DEFS: PetDef[] = [
  ...FIRE_PETS,
  ...ICE_PETS,
  ...SHADOW_PETS,
  ...LIGHT_PETS,
  ...NATURE_PETS,
  ...CHAOS_PETS,
  ...ARCANE_PETS,
  ...MECHANIC_PETS,
];

// ========== UNLOCK CHECKER ==========
export function isPetUnlocked(def: PetDef, gameState: {
  totalKills: number;
  highestDungeon: number;
  totalGoldEarned: number;
  mana: number;
  inventoryItemCount: number;
  highestDungeonByTheme?: Record<string, number>;
}): boolean {
  const cond = def.unlockCondition;
  const hdt = gameState.highestDungeonByTheme || {};

  // Generic checks
  if (cond.includes('Derrote')) {
    const n = parseInt(cond.match(/\d+/)?.[0] || '0');
    return gameState.totalKills >= n;
  }
  if (cond.includes('ouro total') || cond.includes('🪙')) {
    const n = parseInt(cond.match(/\d+/)?.[0] || '0');
    return gameState.totalGoldEarned >= n;
  }
  if (cond.includes('mana')) {
    const n = parseInt(cond.match(/\d+/)?.[0] || '0');
    return gameState.mana >= n;
  }
  if (cond.includes('itens')) {
    const n = parseInt(cond.match(/\d+/)?.[0] || '0');
    return gameState.inventoryItemCount >= n;
  }

  // Theme-based checks
  const themeMap: Record<string, string> = {
    'Trevas': 'Trevas', 'Vulcânica': 'Vulcânica', 'Glacial': 'Glacial',
    'Abismo': 'Abismo', 'Celestial': 'Celestial', 'Cripta': 'Cripta',
    'Infernal': 'Infernal', 'Dimensional': 'Dimensional',
    'Natureza': 'Vulcânica', 'Arcano': 'Glacial', 'Mecânico': 'Abismo',
  };

  for (const [theme, level] of Object.entries(hdt)) {
    if (cond.includes(theme) || cond.includes(themeMap[theme] || '')) {
      const n = parseInt(cond.match(/\d+/)?.[0] || '0');
      if (level >= n) return true;
    }
  }

  return false;
}
