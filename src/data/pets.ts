import { PetDef } from '../types';

export const PET_DEFS: PetDef[] = [
  // Attack pets
  {
    id: 'fire_imp',
    name: 'Diablinho de Fogo',
    icon: '🔥',
    type: 'attack',
    rarity: 'uncommon',
    description: 'Um pequeno demônio que joga bolas de fogo nos inimigos.',
    effect: '+15% Dano Total',
    unlockCondition: 'Derrote 50 inimigos',
  },
  {
    id: 'shadow_wolf',
    name: 'Lobo das Sombras',
    icon: '🐺',
    type: 'attack',
    rarity: 'rare',
    description: 'Um lobo espectral que morde as almas dos inimigos.',
    effect: '+30% Dano Total',
    unlockCondition: 'Complete a Dungeon 5',
  },
  {
    id: 'dragon_whelp',
    name: 'Filhote de Dragão',
    icon: '🐲',
    type: 'attack',
    rarity: 'epic',
    description: 'Um jovem dragão que cospe fogo devastador.',
    effect: '+50% Dano Total',
    unlockCondition: 'Complete a Dungeon 15',
  },
  {
    id: 'phoenix',
    name: 'Fênix Ancestral',
    icon: '🦅',
    type: 'attack',
    rarity: 'legendary',
    description: 'Renascida das cinzas, sua chama purifica tudo.',
    effect: '+100% Dano Total',
    unlockCondition: 'Complete a Dungeon 30',
  },

  // Support pets
  {
    id: 'fairy',
    name: 'Fada Curandeira',
    icon: '🧚',
    type: 'support',
    rarity: 'common',
    description: 'Uma fada que aumenta a regeneração de ouro.',
    effect: '+20% Ouro Global',
    unlockCondition: 'Ganhe 500 🪙 total',
  },
  {
    id: 'spirit_wisp',
    name: 'Wispy Espiritual',
    icon: '✨',
    type: 'support',
    rarity: 'uncommon',
    description: 'Um espírito luminoso que atrai ouro.',
    effect: '+40% Ouro Global',
    unlockCondition: 'Ganhe 5.000 🪙 total',
  },
  {
    id: 'mana_crystal',
    name: 'Cristal de Mana',
    icon: '💎',
    type: 'support',
    rarity: 'rare',
    description: 'Um cristal vivo que gera mana constantemente.',
    effect: '+1 💎 a cada 30s',
    unlockCondition: 'Acumule 50 💎',
  },
  {
    id: 'angel',
    name: 'Anjo Guardião',
    icon: '👼',
    type: 'support',
    rarity: 'legendary',
    description: 'Um ser celestial que abençoa seus heróis.',
    effect: '+75% Ouro e +50% Dano',
    unlockCondition: 'Complete a Dungeon 25',
  },

  // Tank pets
  {
    id: 'stone_golem',
    name: 'Golem de Pedra',
    icon: '🪨',
    type: 'tank',
    rarity: 'uncommon',
    description: 'Um golem que absorve dano para seus heróis.',
    effect: '-10% Dano Recebido',
    unlockCondition: 'Derrote 100 inimigos',
  },
  {
    id: 'shield_turtle',
    name: 'Tartaruga Guardiã',
    icon: '🐢',
    type: 'tank',
    rarity: 'rare',
    description: 'Sua casca é mais forte que qualquer armadura.',
    effect: '-25% Dano Recebido',
    unlockCondition: 'Complete a Dungeon 8',
  },

  // Utility pets
  {
    id: 'treasure_mimic',
    name: 'Mimic Caçador',
    icon: '📦',
    type: 'utility',
    rarity: 'rare',
    description: 'Caça itens valiosos escondidos nas dungeons.',
    effect: '+50% Chance de Item',
    unlockCondition: 'Equipe 3 itens',
  },
  {
    id: 'time_relic',
    name: 'Relíquia Temporal',
    icon: '⏰',
    type: 'utility',
    rarity: 'epic',
    description: 'Manipula o tempo, acelerando seus heróis.',
    effect: '+20% Velocidade de Ataque',
    unlockCondition: 'Complete a Dungeon 20',
  },
];

export const PET_LEVEL_COST = (level: number) => Math.floor(50 * Math.pow(1.5, level));

export const PET_TYPE_COLORS: Record<string, string> = {
  attack: '#ef4444',
  support: '#22c55e',
  tank: '#3b82f6',
  utility: '#f59e0b',
};

export const PET_TYPE_NAMES: Record<string, string> = {
  attack: 'Ataque',
  support: 'Suporte',
  tank: 'Tanque',
  utility: 'Utilidade',
};
