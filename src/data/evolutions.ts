// ========== HERO EVOLUTION SYSTEM ==========

export interface EvolutionTier {
  name: string;
  icon: string;
  description: string;
  // Stat multipliers (applied on top of base stats)
  dmgMultiplier: number;
  hpMultiplier: number;
  // Visual
  glowColor: string;
  trailColor: string;
  // Requirements
  requiredLevel: number;
  goldCost: number;
  // Special requirement text
  specialReq?: string;
  // Lore
  lore: string;
  // New abilities unlocked
  abilities: string[];
}

export interface HeroEvolutionDef {
  heroId: string;
  tiers: EvolutionTier[]; // index 0 = base, 1 = 1st evo, 2 = 2nd evo
}

export const EVOLUTION_DEFS: HeroEvolutionDef[] = [
  // ========== GUERREIRO ==========
  {
    heroId: 'warrior',
    tiers: [
      {
        name: 'Guerreiro',
        icon: '⚔️',
        description: 'Combatente corpo a corpo equilibrado.',
        dmgMultiplier: 1,
        hpMultiplier: 1,
        glowColor: '#f59e0b',
        trailColor: 'rgba(245, 158, 11, 0.3)',
        requiredLevel: 0,
        goldCost: 0,
        lore: 'Um guerreiro destemido que busca glória em batalha.',
        abilities: ['Ataque Básico'],
      },
      {
        name: 'Berserker',
        icon: '🪓',
        description: 'Guerreiro agressivo que sacrifica defesa por dano massivo. Ganha dano conforme perde HP.',
        dmgMultiplier: 2.5,
        hpMultiplier: 0.8,
        glowColor: '#dc2626',
        trailColor: 'rgba(220, 38, 38, 0.4)',
        requiredLevel: 30,
        goldCost: 50000,
        specialReq: 'Complete 10 dungeons',
        lore: 'A fúria consome sua alma. Cada ferimento alimenta seu desejo de destruição. Os inimigos recuam ao ver seu olhar selvagem.',
        abilities: ['Fúria Crescente', 'Golpes em Área', 'Modo Fúria'],
      },
      {
        name: 'Senhor da Guerra',
        icon: '🔥',
        description: 'A forma máxima do Guerreiro. Dano físico massivo, fúria permanente e grande resistência.',
        dmgMultiplier: 7,
        hpMultiplier: 1.5,
        glowColor: '#f97316',
        trailColor: 'rgba(249, 115, 22, 0.5)',
        requiredLevel: 60,
        goldCost: 500000,
        specialReq: 'Derrote 100 bosses',
        lore: 'Ele não é apenas um guerreiro — é a própria guerra personificada. Seu machado quebra castelos e seu grito acorda o medo nos corações dos deuses.',
        abilities: ['Fúria Permanente', 'Golpes Devastadores', 'Banner da Guerra', 'Indestrutível'],
      },
    ],
  },

  // ========== ARQUEIRA ==========
  {
    heroId: 'archer',
    tiers: [
      {
        name: 'Arqueira',
        icon: '🏹',
        description: 'Especialista em ataques à distância.',
        dmgMultiplier: 1,
        hpMultiplier: 1,
        glowColor: '#10b981',
        trailColor: 'rgba(16, 185, 129, 0.3)',
        requiredLevel: 0,
        goldCost: 0,
        lore: 'A floresta é seu lar. Cada flecha carrega a precisão de mil treinos sob a luz da lua.',
        abilities: ['Tiro Preciso'],
      },
      {
        name: 'Caçadora',
        icon: '🎯',
        description: 'Especialista em precisão com alto dano crítico, maior alcance e bônus contra chefes.',
        dmgMultiplier: 2.8,
        hpMultiplier: 1.1,
        glowColor: '#059669',
        trailColor: 'rgba(5, 150, 105, 0.4)',
        requiredLevel: 30,
        goldCost: 45000,
        specialReq: 'Acerte 50 golpes críticos',
        lore: 'Suas flechas encontram o ponto fraco de qualquer inimigo. Nenhum alvo escapa de seus olhos de águia.',
        abilities: ['Flechas de Precisão', 'Tiro Vital', 'Caça ao Chefe'],
      },
      {
        name: 'Mestre dos Arcos',
        icon: '🌪️',
        description: 'Lendária arqueira que domina o campo inteiro. Dispara múltiplas flechas com ataques extremamente rápidos.',
        dmgMultiplier: 7.5,
        hpMultiplier: 1.2,
        glowColor: '#14b8a6',
        trailColor: 'rgba(20, 184, 166, 0.5)',
        requiredLevel: 60,
        goldCost: 450000,
        specialReq: 'Complete 100 dungeons',
        lore: 'Dizem que ela pode disparar 100 flechas no tempo de um suspiro. Sua chuva de flechas é mais devastadora que uma tempestade.',
        abilities: ['Chuva de Flechas', 'Flechas Perfurantes', 'Olho de Águia Permanente', 'Tempestade de Flechas'],
      },
    ],
  },

  // ========== MAGO ==========
  {
    heroId: 'mage',
    tiers: [
      {
        name: 'Mago',
        icon: '🔮',
        description: 'Alto dano mágico, porém frágil.',
        dmgMultiplier: 1,
        hpMultiplier: 1,
        glowColor: '#8b5cf6',
        trailColor: 'rgba(139, 92, 246, 0.3)',
        requiredLevel: 0,
        goldCost: 0,
        lore: 'A energia mágica pulsa em suas veias. Cada feitiço é uma conversa com o universo.',
        abilities: ['Bola de Fogo'],
      },
      {
        name: 'Feiticeiro',
        icon: '⚡',
        description: 'Especialista em magia elemental destrutiva com ataques em área e alto dano explosivo.',
        dmgMultiplier: 3,
        hpMultiplier: 0.9,
        glowColor: '#7c3aed',
        trailColor: 'rgba(124, 58, 237, 0.4)',
        requiredLevel: 30,
        goldCost: 55000,
        specialReq: 'Cause 10.000 de dano mágico',
        lore: 'Fogo, gelo e raio obedecem a suas ordens. A magia elemental responde ao seu chamado como velhos aliados.',
        abilities: ['Magia Elemental', 'Explosão Arcana', 'Controle Climático'],
      },
      {
        name: 'Arquimago',
        icon: '🌌',
        description: 'Mestre supremo das artes mágicas. Magias devastadoras com grande poder em área.',
        dmgMultiplier: 8,
        hpMultiplier: 1,
        glowColor: '#a855f7',
        trailColor: 'rgba(168, 85, 247, 0.5)',
        requiredLevel: 60,
        goldCost: 550000,
        specialReq: 'Derrote o Lich Supremo',
        lore: 'Ele transcendeu os limites da magia mortal. Suas runas brilham nas estrelas e seuStaff é feito de um fragmento de buraco negro.',
        abilities: ['Magia Devastadora', 'Tempestade Arcana', 'Redução Temporal', 'Pulsar Cósmico'],
      },
    ],
  },

  // ========== PALADINO ==========
  {
    heroId: 'paladin',
    tiers: [
      {
        name: 'Paladino',
        icon: '🛡️',
        description: 'Tanque defensivo e protetor da equipe.',
        dmgMultiplier: 1,
        hpMultiplier: 1,
        glowColor: '#3b82f6',
        trailColor: 'rgba(59, 130, 246, 0.3)',
        requiredLevel: 0,
        goldCost: 0,
        lore: 'Jurou proteger os inocentes. Seu escudo é impenetrável e sua fé inabalável.',
        abilities: ['Golpe Sagrado'],
      },
      {
        name: 'Cavaleiro Sagrado',
        icon: '✨',
        description: 'Defensor abençoado com poderes divinos, escudos mágicos e proteção para aliados.',
        dmgMultiplier: 1.8,
        hpMultiplier: 2.5,
        glowColor: '#2563eb',
        trailColor: 'rgba(37, 99, 235, 0.4)',
        requiredLevel: 30,
        goldCost: 60000,
        specialReq: 'Proteja aliados 50 vezes',
        lore: 'A luz divina escolheu-o como seu campeão. Seu escudo brilha com o poder de mil sóis.',
        abilities: ['Escudo Sagrado', 'Proteção Divina', 'Aura de Defesa'],
      },
      {
        name: 'Guardião Divino',
        icon: '👑',
        description: 'A forma máxima do Paladino. Defesa extremamente elevada e absorção de dano para toda a equipe.',
        dmgMultiplier: 3.5,
        hpMultiplier: 5,
        glowColor: '#60a5fa',
        trailColor: 'rgba(96, 165, 250, 0.5)',
        requiredLevel: 60,
        goldCost: 600000,
        specialReq: 'Complete 150 dungeons',
        lore: 'Ele é a muralha entre o mundo dos vivos e a escuridão. Nenhum ataque pode atravessar sua presença divina.',
        abilities: ['Muralha Divina', 'Absorção Total', 'Escudo Permanente', 'Julgamento Sagrado'],
      },
    ],
  },

  // ========== CURANDEIRO ==========
  {
    heroId: 'healer',
    tiers: [
      {
        name: 'Curandeiro',
        icon: '💚',
        description: 'Suporte especializado em cura e dano sagrado.',
        dmgMultiplier: 1,
        hpMultiplier: 1,
        glowColor: '#22c55e',
        trailColor: 'rgba(34, 197, 94, 0.3)',
        requiredLevel: 0,
        goldCost: 0,
        lore: 'Seu toque cura feridas e sua presença acalma almas atormentadas.',
        abilities: ['Toque Curativo'],
      },
      {
        name: 'Sacerdote',
        icon: '🌿',
        description: 'Poderoso usuário de magia de cura. Cura em área, remove debuffs e revive aliados.',
        dmgMultiplier: 1.5,
        hpMultiplier: 1.8,
        glowColor: '#16a34a',
        trailColor: 'rgba(22, 163, 74, 0.4)',
        requiredLevel: 30,
        goldCost: 40000,
        specialReq: 'Cure 100.000 HP total',
        lore: 'As ervas sagradas respondem a seu chamado. Ele é a ponte entre a vida e a morte.',
        abilities: ['Cura em Área', 'Purificação', 'Ressurreição', 'Bênção da Defesa'],
      },
      {
        name: 'Arcanjo',
        icon: '👼',
        description: 'A forma máxima do Curandeiro. Cura massiva, aura de regeneração e poderosos ataques sagrados.',
        dmgMultiplier: 4,
        hpMultiplier: 2.5,
        glowColor: '#4ade80',
        trailColor: 'rgba(74, 222, 128, 0.5)',
        requiredLevel: 60,
        goldCost: 400000,
        specialReq: 'Ressuscite 20 aliados',
        lore: 'Suasas de luz emergem de suas costas. Ele é a própria encarnação da graça divina no campo de batalha.',
        abilities: ['Cura Massiva', 'Aura Celestial', 'Ressurreição Permanente', 'Julgamento Divino'],
      },
    ],
  },

  // ========== ASSASSINO ==========
  {
    heroId: 'assassin',
    tiers: [
      {
        name: 'Assassino',
        icon: '🗡️',
        description: 'DPS físico extremamente elevado.',
        dmgMultiplier: 1,
        hpMultiplier: 1,
        glowColor: '#ef4444',
        trailColor: 'rgba(239, 68, 68, 0.3)',
        requiredLevel: 0,
        goldCost: 0,
        lore: 'Nas sombras, ele é imperceptível. Seu golpe é rápido como o pensamento e mortal como o veneno.',
        abilities: ['Golpe Sombrio'],
      },
      {
        name: 'Sombra',
        icon: '🥷',
        description: 'Especialista em velocidade, furtividade e ataques rápidos com alta evasão.',
        dmgMultiplier: 3.2,
        hpMultiplier: 0.8,
        glowColor: '#991b1b',
        trailColor: 'rgba(153, 27, 27, 0.4)',
        requiredLevel: 30,
        goldCost: 55000,
        specialReq: 'Mate 500 inimigos',
        lore: 'Ele se tornou a própria sombra. Nenhum olho pode rastreá-lo, nenhuma armadura pode detê-lo.',
        abilities: ['Invisibilidade', 'Golpe Pelas Costas', 'Evasão Perfeita', 'Ataque Relâmpago'],
      },
      {
        name: 'Mestre das Sombras',
        icon: '☠️',
        description: 'Um assassino lendário praticamente impossível de acompanhar. Ataques instantâneos e execução.',
        dmgMultiplier: 9,
        hpMultiplier: 1,
        glowColor: '#b91c1c',
        trailColor: 'rgba(185, 28, 28, 0.5)',
        requiredLevel: 60,
        goldCost: 550000,
        specialReq: 'Derrote o Arquidiabo',
        lore: 'Ele transcendeu a escuridão. Seu nome é sussurrado em medo por todos que se atrevem a ser seus inimigos. Um golpe basta.',
        abilities: ['Teleporte Sombrio', 'Execução', 'Crítico Extremo', 'Dança das Lâminas'],
      },
    ],
  },

  // ========== NECROMANTE ==========
  {
    heroId: 'necromancer',
    tiers: [
      {
        name: 'Necromante',
        icon: '💀',
        description: 'Extremamente frágil, mas com dano massivo.',
        dmgMultiplier: 1,
        hpMultiplier: 1,
        glowColor: '#a855f7',
        trailColor: 'rgba(168, 85, 247, 0.3)',
        requiredLevel: 0,
        goldCost: 0,
        lore: 'O maior necromante que já existiu. Sua alma está guardada em 7 frascos escondidos pelo mundo.',
        abilities: ['Magia Negra'],
      },
      {
        name: 'Senhor dos Mortos',
        icon: '🦴',
        description: 'Controla criaturas mortas para lutar por ele. Invoca esqueletos e sacrifica lacaios.',
        dmgMultiplier: 3.5,
        hpMultiplier: 1.2,
        glowColor: '#7c2d12',
        trailColor: 'rgba(124, 45, 18, 0.4)',
        requiredLevel: 30,
        goldCost: 60000,
        specialReq: 'Mate 200 mortos-vivos',
        lore: 'Os mortos obedecem a sua voz. Exércitos inteiros se levantam de suas tumbas ao seu chamado.',
        abilities: ['Invocação', 'Exército de Ossos', 'Sacrifício', 'Dano Sombrio'],
      },
      {
        name: 'Rei Lich',
        icon: '👑',
        description: 'A forma máxima do Necromante. Exército de mortos-vivos, magias de morte em área e maldições devastadoras.',
        dmgMultiplier: 10,
        hpMultiplier: 1.5,
        glowColor: '#9333ea',
        trailColor: 'rgba(147, 51, 234, 0.5)',
        requiredLevel: 60,
        goldCost: 650000,
        specialReq: 'Derrote o Lich Supremo na Cripta',
        lore: 'Ele não é apenas o rei dos mortos — ele é a própria morte. Seu exército não tem fim e suas maldições não conhecem cura.',
        abilities: ['Legião Morta', 'Tempestade de Morte', 'Roubo de Vida', 'Maldição Suprema'],
      },
    ],
  },
];

// ========== HELPER FUNCTIONS ==========

export function getEvolutionDef(heroId: string): HeroEvolutionDef | undefined {
  return EVOLUTION_DEFS.find(e => e.heroId === heroId);
}

export function getCurrentTier(heroId: string, evolutionLevel: number): EvolutionTier {
  const def = getEvolutionDef(heroId);
  if (!def) return EVOLUTION_DEFS[0].tiers[0];
  return def.tiers[Math.min(evolutionLevel, def.tiers.length - 1)];
}

export function getNextTier(heroId: string, evolutionLevel: number): EvolutionTier | null {
  const def = getEvolutionDef(heroId);
  if (!def) return null;
  if (evolutionLevel >= def.tiers.length - 1) return null;
  return def.tiers[evolutionLevel + 1];
}

export function canEvolve(
  heroId: string,
  evolutionLevel: number,
  heroLevel: number,
  gold: number,
  completedDungeons: number,
  totalBossKills: number,
  totalKills: number,
  totalCrits: number,
): { can: boolean; reason: string } {
  const next = getNextTier(heroId, evolutionLevel);
  if (!next) return { can: false, reason: 'Já está na evolução máxima!' };

  // Level check
  if (heroLevel < next.requiredLevel) {
    return { can: false, reason: `Precisa de nível ${next.requiredLevel} (atual: ${heroLevel})` };
  }

  // Gold check
  if (gold < next.goldCost) {
    return { can: false, reason: `Precisa de ${next.goldCost.toLocaleString()} ouro` };
  }

  // Special requirement check (simplified)
  if (next.specialReq) {
    // We'll allow evolution when basic conditions are met
    // The special req is displayed as flavor text
  }

  return { can: true, reason: 'Pronto para evoluir!' };
}

export function getEvolutionBonuses(evolutionLevel: number): { dmgBonus: number; hpBonus: number } {
  // Sum up all tier bonuses up to current level
  return { dmgBonus: 0, hpBonus: 0 }; // Bonuses are applied via multiplier in HERO_DEFS lookup
}
