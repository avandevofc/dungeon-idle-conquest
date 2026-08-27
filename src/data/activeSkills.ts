// Skills unicas por heroi — cada classe tem 3 habilidades distintas

export interface ActiveSkillDef {
  id: string;
  heroId: string;
  name: string;
  description: string;
  icon: string;
  cooldown: number;
  duration: number;
  effect: 'damage_boost' | 'heal_all' | 'crit_boost' | 'aoe_damage' | 'shield' | 'dot' | 'stun' | 'speed_boost' | 'lifesteal' | 'revive' | 'execute' | 'summon' | 'debuff' | 'freeze';
  effectValue: number;
  effectScaling: number;
  manaCost: number;
  unlockLevel: number;
  color: string;
  animation: string;
}

export const ACTIVE_SKILLS: ActiveSkillDef[] = [
  // ===== GUERREIRO — Tanque bruto, fúria, escudo =====
  {
    id: 'warrior_bash', heroId: 'warrior', name: 'Concussão',
    description: 'Golpe esmagador que causa 200% de dano e atordoa o inimigo por 2s.',
    icon: '⚔️', cooldown: 10, duration: 2,
    effect: 'stun', effectValue: 200, effectScaling: 2, manaCost: 0,
    unlockLevel: 5, color: '#f59e0b', animation: 'skill-bash',
  },
  {
    id: 'warrior_berserk', heroId: 'warrior', name: 'Fúria de Guerra',
    description: 'Entra em fúria: +80% DPS por 6s. Quanto mais baixo o HP, maior o dano.',
    icon: '😤', cooldown: 15, duration: 6,
    effect: 'damage_boost', effectValue: 80, effectScaling: 1, manaCost: 0,
    unlockLevel: 10, color: '#ef4444', animation: 'skill-berserk',
  },
  {
    id: 'warrior_fortress', heroId: 'warrior', name: 'Fortaleza',
    description: 'Assume postura defensiva: absorve 60% do dano de TODOS os heróis por 5s.',
    icon: '🛡️', cooldown: 20, duration: 5,
    effect: 'shield', effectValue: 60, effectScaling: 0.5, manaCost: 0,
    unlockLevel: 20, color: '#d97706', animation: 'skill-fortress',
  },

  // ===== ARQUEIRA — DPS ranged, crit, velocidade =====
  {
    id: 'archer_rain', heroId: 'archer', name: 'Chuva de Flechas',
    description: 'Dispara rajada de flechas: 180% dano AoE + DoT de 5% por 4s.',
    icon: '🏹', cooldown: 8, duration: 4,
    effect: 'aoe_damage', effectValue: 180, effectScaling: 2.5, manaCost: 0,
    unlockLevel: 5, color: '#10b981', animation: 'skill-rain',
  },
  {
    id: 'archer_eagle', heroId: 'archer', name: 'Olho de Águia',
    description: 'Visão perfeita: +40% chance de crítico e +60% dano crítico por 8s.',
    icon: '👁️', cooldown: 14, duration: 8,
    effect: 'crit_boost', effectValue: 40, effectScaling: 0.4, manaCost: 0,
    unlockLevel: 12, color: '#34d399', animation: 'skill-eagle',
  },
  {
    id: 'archer_pierce', heroId: 'archer', name: 'Perfuração',
    description: 'Flecha perfurante: ignora 50% da defesa do monstro por 10s.',
    icon: '🎯', cooldown: 18, duration: 10,
    effect: 'debuff', effectValue: 50, effectScaling: 0.3, manaCost: 0,
    unlockLevel: 22, color: '#059669', animation: 'skill-pierce',
  },

  // ===== MAGO — Magia elemental, controle, devastação =====
  {
    id: 'mage_fireball', heroId: 'mage', name: 'Bola de Fogo',
    description: 'Lança bola de fogo: 300% de dano + queima 8% por 4s.',
    icon: '🔥', cooldown: 7, duration: 4,
    effect: 'dot', effectValue: 300, effectScaling: 3, manaCost: 0,
    unlockLevel: 5, color: '#ef4444', animation: 'skill-fireball',
  },
  {
    id: 'mage_blizzard', heroId: 'mage', name: 'Nevasca Arcana',
    description: 'Congela TODOS os inimigos por 3s e causa 200% de dano de gelo.',
    icon: '❄️', cooldown: 16, duration: 3,
    effect: 'freeze', effectValue: 200, effectScaling: 2, manaCost: 0,
    unlockLevel: 12, color: '#0ea5e9', animation: 'skill-blizzard',
  },
  {
    id: 'mage_arcane_blast', heroId: 'mage', name: 'Explosão Arcana',
    description: 'Detona energia pura: 500% de dano mágico AoE.',
    icon: '💥', cooldown: 22, duration: 0,
    effect: 'aoe_damage', effectValue: 500, effectScaling: 5, manaCost: 0,
    unlockLevel: 25, color: '#8b5cf6', animation: 'skill-arcane',
  },

  // ===== PALADINO — Tanque sagrado, cura, retaliação =====
  {
    id: 'paladin_holy_smite', heroId: 'paladin', name: 'Golpe Sagrado',
    description: 'Investida divina: 250% de dano sagrado + cura 15% do dano causado.',
    icon: '✨', cooldown: 8, duration: 0,
    effect: 'lifesteal', effectValue: 250, effectScaling: 2.5, manaCost: 0,
    unlockLevel: 5, color: '#fbbf24', animation: 'skill-smite',
  },
  {
    id: 'paladin_aura', heroId: 'paladin', name: 'Aura Protetora',
    description: 'Aura sagrada: cura 3% HP/s de todos os heróis + 25% defesa por 8s.',
    icon: '🌟', cooldown: 18, duration: 8,
    effect: 'heal_all', effectValue: 25, effectScaling: 0.5, manaCost: 0,
    unlockLevel: 14, color: '#f59e0b', animation: 'skill-aura',
  },
  {
    id: 'paladin_retribution', heroId: 'paladin', name: 'Retribuição',
    description: 'Julgamento divino: causa dano igual a 40% do HP perdido do monstro.',
    icon: '⚡', cooldown: 20, duration: 0,
    effect: 'execute', effectValue: 40, effectScaling: 0.3, manaCost: 0,
    unlockLevel: 22, color: '#eab308', animation: 'skill-retribution',
  },

  // ===== CURANDEIRO — Suporte puro, ressurreição, barreira =====
  {
    id: 'healer_rejuvenate', heroId: 'healer', name: 'Rejuvenescimento',
    description: 'Cura imediata: restaura 45% do HP máximo de TODOS os heróis.',
    icon: '💚', cooldown: 12, duration: 0,
    effect: 'heal_all', effectValue: 45, effectScaling: 0.6, manaCost: 0,
    unlockLevel: 5, color: '#22c55e', animation: 'skill-rejuv',
  },
  {
    id: 'healer_revive', heroId: 'healer', name: 'Ressurreição',
    description: 'Ressuscita TODOS os heróis mortos com 50% do HP máximo.',
    icon: '🕊️', cooldown: 30, duration: 0,
    effect: 'revive', effectValue: 50, effectScaling: 0.5, manaCost: 0,
    unlockLevel: 15, color: '#4ade80', animation: 'skill-revive',
  },
  {
    id: 'healer_barrier', heroId: 'healer', name: 'Barreira de Vida',
    description: 'Cria barreira que absorve 100% do dano por 4s no herói mais ferido.',
    icon: '🛡️', cooldown: 22, duration: 4,
    effect: 'shield', effectValue: 100, effectScaling: 0, manaCost: 0,
    unlockLevel: 20, color: '#16a34a', animation: 'skill-barrier',
  },

  // ===== ASSASSINO — Burst, execute, invisibilidade =====
  {
    id: 'assassin_execute', heroId: 'assassin', name: 'Execução',
    description: 'Golpe fatal: causa 400% de dano. Se inimigo < 30% HP, dano é triplicado.',
    icon: '🗡️', cooldown: 10, duration: 0,
    effect: 'execute', effectValue: 400, effectScaling: 4, manaCost: 0,
    unlockLevel: 5, color: '#ef4444', animation: 'skill-execute',
  },
  {
    id: 'assassin_vanish', heroId: 'assassin', name: 'Desaparecimento',
    description: 'Fica invisível por 4s, evitando TODOS os ataques. Próximo golpe é crítico.',
    icon: '👻', cooldown: 16, duration: 4,
    effect: 'shield', effectValue: 100, effectScaling: 0, manaCost: 0,
    unlockLevel: 14, color: '#94a3b8', animation: 'skill-vanish',
  },
  {
    id: 'assassin_blade_storm', heroId: 'assassin', name: 'Tempestade de Lâminas',
    description: 'Fúria de lâminas: +120% velocidade de ataque por 5s. Drenagem de vida 20%.',
    icon: '🌀', cooldown: 20, duration: 5,
    effect: 'lifesteal', effectValue: 120, effectScaling: 1.5, manaCost: 0,
    unlockLevel: 22, color: '#dc2626', animation: 'skill-bladestorm',
  },

  // ===== NECROMANTE — Invocação, drenagem, morte =====
  {
    id: 'necro_drain', heroId: 'necromancer', name: 'Drenar Vida',
    description: 'Drena alma: 280% de dano + cura 30% do dano causado para TODOS.',
    icon: '💀', cooldown: 8, duration: 0,
    effect: 'lifesteal', effectValue: 280, effectScaling: 3, manaCost: 0,
    unlockLevel: 5, color: '#a855f7', animation: 'skill-drain',
  },
  {
    id: 'necro_summon', heroId: 'necromancer', name: 'Exército dos Mortos',
    description: 'Invoca 3 esqueletos por 6s: cada um causa 100% de dano por tick.',
    icon: '🧟', cooldown: 20, duration: 6,
    effect: 'summon', effectValue: 300, effectScaling: 3, manaCost: 0,
    unlockLevel: 14, color: '#7c3aed', animation: 'skill-summon',
  },
  {
    id: 'necro_plague', heroId: 'necromancer', name: 'Praga Negra',
    description: 'Envenena o monstro: -30% DPS dele + 120% de dano por 6s.',
    icon: '☠️', cooldown: 18, duration: 6,
    effect: 'debuff', effectValue: 120, effectScaling: 2, manaCost: 0,
    unlockLevel: 22, color: '#6d28d9', animation: 'skill-plague',
  },
];

export function getSkillsForHero(heroId: string): ActiveSkillDef[] {
  return ACTIVE_SKILLS.filter(s => s.heroId === heroId);
}

export function getSkillById(skillId: string): ActiveSkillDef | undefined {
  return ACTIVE_SKILLS.find(s => s.id === skillId);
}

export function canUnlockSkill(heroId: string, heroLevel: number, skillId: string): boolean {
  const skill = getSkillById(skillId);
  if (!skill) return false;
  return heroLevel >= skill.unlockLevel;
}

export function getScaledEffect(skill: ActiveSkillDef, heroLevel: number): number {
  const scaling = skill.effectScaling / 100;
  return skill.effectValue * (1 + (heroLevel - 1) * scaling);
}

export const EFFECT_ICONS: Record<string, string> = {
  damage_boost: '⚔️', heal_all: '💚', crit_boost: '🎯', aoe_damage: '💥',
  shield: '🛡️', dot: '🔥', stun: '⚡', speed_boost: '⚡',
  lifesteal: '🩸', revive: '🕊️', execute: '💀', summon: '🧟',
  debuff: '☠️', freeze: '❄️',
};

export const EFFECT_NAMES: Record<string, string> = {
  damage_boost: 'Boost de Dano', heal_all: 'Cura em Área', crit_boost: 'Crítico',
  aoe_damage: 'Dano AoE', shield: 'Escudo', dot: 'DoT', stun: 'Atordoamento',
  speed_boost: 'Velocidade', lifesteal: 'Drenagem', revive: 'Ressurreição',
  execute: 'Execução', summon: 'Invocação', debuff: 'Debuff', freeze: 'Congelar',
};

export default ACTIVE_SKILLS;
