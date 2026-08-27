// ==========================================
// MONSTER COLLECTION — Sistema de Coleção
// Monstros descobertos dão bônus permanentes
// ==========================================

export interface CollectionBonus {
  type: 'dps' | 'gold' | 'hp' | 'critChance' | 'critDmg' | 'mana';
  value: number; // percentage
}

export interface MonsterCollectionEntry {
  id: string;
  name: string;
  theme: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'boss' | 'legendary';
  bonus: CollectionBonus;
  description: string;
}

// ========== TODOS OS MONSTROS COLETÁVEIS ==========
export const MONSTER_COLLECTION: Record<string, MonsterCollectionEntry> = {
  // ===== TREVAS =====
  'Sombra Rastejante': { id: 'shadow_crawler', name: 'Sombra Rastejante', theme: 'Trevas', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Uma massa viscosa de escuridão pura.' },
  'Goblin das Trevas': { id: 'dark_goblin', name: 'Goblin das Trevas', theme: 'Trevas', rarity: 'common', bonus: { type: 'gold', value: 0.5 }, description: 'Goblin corrompido pela magia negra.' },
  'Lobo Nublido': { id: 'cloud_wolf', name: 'Lobo Nublido', theme: 'Trevas', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Lobo fantasma que caça entre nuvens escuras.' },
  'Oculto Negro': { id: 'black_hidden', name: 'Oculto Negro', theme: 'Trevas', rarity: 'uncommon', bonus: { type: 'critChance', value: 0.3 }, description: 'Criatura invisível que só se revela ao atacar.' },
  'Morcego Sombrio': { id: 'shadow_bat', name: 'Morcego Sombrio', theme: 'Trevas', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Morcego gigante com dentes brilhantes.' },
  'Araknis Noturno': { id: 'night_spider', name: 'Araknis Noturno', theme: 'Trevas', rarity: 'uncommon', bonus: { type: 'dps', value: 0.7 }, description: 'Aranha do tamanho de um cão.' },
  'Espírito Errante': { id: 'wandering_spirit', name: 'Espírito Errante', theme: 'Trevas', rarity: 'common', bonus: { type: 'mana', value: 0.3 }, description: 'Alma de aventureiro perdido.' },
  'Cobra Negra': { id: 'black_cobra', name: 'Cobra Negra', theme: 'Trevas', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Serpente venenosa nas sombras.' },
  'Golem de Ébano': { id: 'ebony_golem', name: 'Golem de Ébano', theme: 'Trevas', rarity: 'rare', bonus: { type: 'hp', value: 2 }, description: 'Construto de pedra negra ancestral.' },
  'Nightmare': { id: 'nightmare', name: 'Nightmare', theme: 'Trevas', rarity: 'uncommon', bonus: { type: 'critDmg', value: 1 }, description: 'Pesadelo materializado.' },

  // ===== VULCÂNICA =====
  'Lagarto Ígneo': { id: 'fire_lizard', name: 'Lagarto Ígneo', theme: 'Vulcânica', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Lagarto coberto de escamas derretidas.' },
  'Goblin de Lava': { id: 'lava_goblin', name: 'Goblin de Lava', theme: 'Vulcânica', rarity: 'common', bonus: { type: 'gold', value: 0.5 }, description: 'Goblin resistente ao calor extremo.' },
  'Salamandra': { id: 'salamander', name: 'Salamandra', theme: 'Vulcânica', rarity: 'uncommon', bonus: { type: 'dps', value: 0.7 }, description: 'Anfíbio gigante que nada em lava.' },
  'Elemental de Fogo': { id: 'fire_elemental', name: 'Elemental de Fogo', theme: 'Vulcânica', rarity: 'uncommon', bonus: { type: 'dps', value: 1 }, description: 'Pura energia ígnea humanoid.' },
  'Brasa Viva': { id: 'living_ember', name: 'Brasa Viva', theme: 'Vulcânica', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Carvão animado que pulsa como fogo.' },
  'Escorpione Ardente': { id: 'burning_scorpion', name: 'Escorpione Ardente', theme: 'Vulcânica', rarity: 'uncommon', bonus: { type: 'critChance', value: 0.5 }, description: 'Escorpião com cauda ígnea.' },
  'Golem de Magma': { id: 'magma_golem', name: 'Golem de Magma', theme: 'Vulcânica', rarity: 'rare', bonus: { type: 'hp', value: 2 }, description: 'Golem formado por magma solidificado.' },
  'Fênix Menor': { id: 'lesser_phoenix', name: 'Fênix Menor', theme: 'Vulcânica', rarity: 'uncommon', bonus: { type: 'dps', value: 1 }, description: 'Pássaro de fogo que renasce das cinzas.' },
  'Drake de Fogo': { id: 'fire_drake', name: 'Drake de Fogo', theme: 'Vulcânica', rarity: 'rare', bonus: { type: 'dps', value: 1.5 }, description: 'Jovem dragão que cuspe fogo.' },

  // ===== GLACIAL =====
  'Yeti Bebê': { id: 'baby_yeti', name: 'Yeti Bebê', theme: 'Glacial', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Yeti jovem coberto de pelo azul.' },
  'Lobo de Gelo': { id: 'ice_wolf', name: 'Lobo de Gelo', theme: 'Glacial', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Lobo coberto de cristais de gelo.' },
  'Elemental Glacial': { id: 'ice_elemental', name: 'Elemental Glacial', theme: 'Glacial', rarity: 'uncommon', bonus: { type: 'dps', value: 1 }, description: 'Pura energia gelada humanoid.' },
  'Goblin de Gelo': { id: 'ice_goblin', name: 'Goblin de Gelo', theme: 'Glacial', rarity: 'common', bonus: { type: 'gold', value: 0.5 }, description: 'Goblin que usa gelo como arma.' },
  'Pinguinho Rebelde': { id: 'rebel_drop', name: 'Pinguinho Rebelde', theme: 'Glacial', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Pingode de água que se recusou a derreter.' },
  'Aranha de Frio': { id: 'cold_spider', name: 'Aranha de Frio', theme: 'Glacial', rarity: 'uncommon', bonus: { type: 'critChance', value: 0.5 }, description: 'Aranha que tece teias de gelo.' },
  'Golem de Gelo': { id: 'ice_golem', name: 'Golem de Gelo', theme: 'Glacial', rarity: 'rare', bonus: { type: 'hp', value: 2 }, description: 'Golem formado por gelo eterno.' },
  'Harpia Gelada': { id: 'frozen_harpy', name: 'Harpia Gelada', theme: 'Glacial', rarity: 'uncommon', bonus: { type: 'dps', value: 0.7 }, description: 'Harpia com penas de gelo.' },
  'Serpente Glacial': { id: 'glacial_serpent', name: 'Serpente Glacial', theme: 'Glacial', rarity: 'rare', bonus: { type: 'dps', value: 1.5 }, description: 'Serpente gigante nos icebergs.' },

  // ===== ABISMO =====
  'Peixe-Lanterna': { id: 'angler_fish', name: 'Peixe-Lanterna', theme: 'Abismo', rarity: 'common', bonus: { type: 'gold', value: 0.7 }, description: 'Peixe abissal com luz enganosa.' },
  'Goblin Abissal': { id: 'abyssal_goblin', name: 'Goblin Abissal', theme: 'Abismo', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Goblin evoluído para pressão extrema.' },
  'Kraken Menor': { id: 'lesser_kraken', name: 'Kraken Menor', theme: 'Abismo', rarity: 'uncommon', bonus: { type: 'dps', value: 1 }, description: 'Jovem kraken com tentáculos.' },
  'Polvo Sombrio': { id: 'shadow_octopus', name: 'Polvo Sombrio', theme: 'Abismo', rarity: 'uncommon', bonus: { type: 'mana', value: 0.5 }, description: 'Polvo que controla correntes abissais.' },
  'Engolidor': { id: 'swallower', name: 'Engolidor', theme: 'Abismo', rarity: 'rare', bonus: { type: 'gold', value: 1.5 }, description: 'Criatura de boca gigante.' },
  'Hidra Jovem': { id: 'young_hydra', name: 'Hidra Jovem', theme: 'Abismo', rarity: 'uncommon', bonus: { type: 'dps', value: 1 }, description: 'Hidra com 3 cabeças.' },
  'Golem Abissal': { id: 'abyssal_golem', name: 'Golem Abissal', theme: 'Abismo', rarity: 'rare', bonus: { type: 'hp', value: 2 }, description: 'Golem formado por coral negro.' },
  'Medusa Profunda': { id: 'deep_medusa', name: 'Medusa Profunda', theme: 'Abismo', rarity: 'uncommon', bonus: { type: 'critDmg', value: 1.5 }, description: 'Medusa das fossas profundas.' },
  'Leviatã Bebê': { id: 'baby_leviathan', name: 'Leviatã Bebê', theme: 'Abismo', rarity: 'rare', bonus: { type: 'dps', value: 2 }, description: 'Jovem criatura do tamanho de navio.' },

  // ===== CELESTIAL =====
  'Anjo Caído': { id: 'fallen_angel', name: 'Anjo Caído', theme: 'Celestial', rarity: 'uncommon', bonus: { type: 'dps', value: 1 }, description: 'Anjo que perdeu suas asas de ouro.' },
  'Serafim Destruido': { id: 'destroyed_seraphim', name: 'Serafim Destruido', theme: 'Celestial', rarity: 'rare', bonus: { type: 'dps', value: 2 }, description: 'Serafim corrompido com 4 asas queimadas.' },
  'Querubim Rebelde': { id: 'rebel_cherub', name: 'Querubim Rebelde', theme: 'Celestial', rarity: 'uncommon', bonus: { type: 'critChance', value: 0.7 }, description: 'Querubim que se recusou a seguir ordens.' },
  'Goblin Celeste': { id: 'celestial_goblin', name: 'Goblin Celeste', theme: 'Celestial', rarity: 'common', bonus: { type: 'gold', value: 0.5 }, description: 'Goblin que invadiu o céu.' },
  'Espírito Puro': { id: 'pure_spirit', name: 'Espírito Puro', theme: 'Celestial', rarity: 'common', bonus: { type: 'mana', value: 0.5 }, description: 'Espírito de luz corrompido.' },
  'Cometa Vivo': { id: 'living_comet', name: 'Cometa Vivo', theme: 'Celestial', rarity: 'uncommon', bonus: { type: 'dps', value: 0.7 }, description: 'Cometa que ganhou consciência.' },
  'Golem Dourado': { id: 'golden_golem', name: 'Golem Dourado', theme: 'Celestial', rarity: 'rare', bonus: { type: 'gold', value: 2 }, description: 'Golem feito de ouro celestial.' },
  'Grifo Sagrado': { id: 'sacred_griffin', name: 'Grifo Sagrado', theme: 'Celestial', rarity: 'uncommon', bonus: { type: 'dps', value: 1 }, description: 'Grifo banido do céu.' },
  'Unicórnio Negro': { id: 'black_unicorn', name: 'Unicórnio Negro', theme: 'Celestial', rarity: 'rare', bonus: { type: 'critDmg', value: 2 }, description: 'Unicórnio corrompido.' },

  // ===== CRIPTA =====
  'Esqueleto Velho': { id: 'old_skeleton', name: 'Esqueleto Velho', theme: 'Cripta', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Esqueleto com ossos translúcidos.' },
  'Zumbi Cambaleante': { id: 'stumbling_zombie', name: 'Zumbi Cambaleante', theme: 'Cripta', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Zumbi que perdeu metade do corpo.' },
  'Morte-Viva': { id: 'living_dead', name: 'Morte-Viva', theme: 'Cripta', rarity: 'uncommon', bonus: { type: 'dps', value: 0.7 }, description: 'Cadáver animado por magia.' },
  'Goblin Espectral': { id: 'spectral_goblin', name: 'Goblin Espectral', theme: 'Cripta', rarity: 'common', bonus: { type: 'gold', value: 0.5 }, description: 'Fantasma de goblin que morreu roubando.' },
  'Múmia Enrolada': { id: 'wrapped_mummy', name: 'Múmia Enrolada', theme: 'Cripta', rarity: 'uncommon', bonus: { type: 'dps', value: 0.7 }, description: 'Múmia enrolada errado.' },
  'Wraith Jovem': { id: 'young_wraith', name: 'Wraith Jovem', theme: 'Cripta', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Espectro jovem aprendendo a assombrar.' },
  'Golem de Ossos': { id: 'bone_golem', name: 'Golem de Ossos', theme: 'Cripta', rarity: 'rare', bonus: { type: 'hp', value: 2 }, description: 'Construto de milhares de ossos.' },
  'Vampirinho': { id: 'little_vampire', name: 'Vampirinho', theme: 'Cripta', rarity: 'uncommon', bonus: { type: 'dps', value: 0.7 }, description: 'Vampiro jovem que morde coxas.' },
  'Espectro Sombrio': { id: 'shadow_specter', name: 'Espectro Sombrio', theme: 'Cripta', rarity: 'uncommon', bonus: { type: 'mana', value: 0.5 }, description: 'Espectro que se alimenta de memórias.' },

  // ===== INFERNAL =====
  'Diabinho': { id: 'little_devil', name: 'Diabinho', theme: 'Infernal', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Demônio menor irritante.' },
  'Goblin Infernal': { id: 'infernal_goblin', name: 'Goblin Infernal', theme: 'Infernal', rarity: 'common', bonus: { type: 'gold', value: 0.5 }, description: 'Goblin que cuspe enxofre.' },
  'Demônio Menor': { id: 'lesser_demon', name: 'Demônio Menor', theme: 'Infernal', rarity: 'uncommon', bonus: { type: 'dps', value: 0.7 }, description: 'Demônio de escalão baixo.' },
  'Súcubo Júnior': { id: 'junior_succubus', name: 'Súcubo Júnior', theme: 'Infernal', rarity: 'uncommon', bonus: { type: 'critChance', value: 0.5 }, description: 'Súcubo que confunde sedução com perseguição.' },
  'Incubiço': { id: 'incubus', name: 'Incubiço', theme: 'Infernal', rarity: 'uncommon', bonus: { type: 'dps', value: 0.7 }, description: 'Incubo com medo de interação social.' },
  'Golem Ígneo': { id: 'igneous_golem', name: 'Golem Ígneo', theme: 'Infernal', rarity: 'rare', bonus: { type: 'hp', value: 2 }, description: 'Golem formado por lava infernal.' },
  'Balrog Jovem': { id: 'young_balrog', name: 'Balrog Jovem', theme: 'Infernal', rarity: 'rare', bonus: { type: 'dps', value: 2 }, description: 'Jovem Balrog com fogo incontrolável.' },
  'Pit Fiend Jr.': { id: 'pit_fiend_jr', name: 'Pit Fiend Jr.', theme: 'Infernal', rarity: 'uncommon', bonus: { type: 'dps', value: 1 }, description: 'Filho do senhor do abismo infernal.' },
  'Cavaleiro Maldito': { id: 'cursed_knight', name: 'Cavaleiro Maldito', theme: 'Infernal', rarity: 'rare', bonus: { type: 'critDmg', value: 2 }, description: 'Cavaleiro que vendeu sua alma.' },

  // ===== DIMENSIONAL =====
  'Riftling': { id: 'riftling', name: 'Riftling', theme: 'Dimensional', rarity: 'common', bonus: { type: 'dps', value: 0.5 }, description: 'Criatura que nasce de fendas dimensionais.' },
  'Goblin Cósmico': { id: 'cosmic_goblin', name: 'Goblin Cósmico', theme: 'Dimensional', rarity: 'common', bonus: { type: 'gold', value: 0.5 }, description: 'Goblin que viajou entre dimensões.' },
  'Fragmento Vivo': { id: 'living_fragment', name: 'Fragmento Vivo', theme: 'Dimensional', rarity: 'uncommon', bonus: { type: 'dps', value: 0.7 }, description: 'Pedacinho de realidade consciente.' },
  'Void Stalker': { id: 'void_stalker', name: 'Void Stalker', theme: 'Dimensional', rarity: 'uncommon', bonus: { type: 'critDmg', value: 1 }, description: 'Criatura do vazio que persegue almas.' },
  'Éter Jovem': { id: 'young_aether', name: 'Éter Jovem', theme: 'Dimensional', rarity: 'common', bonus: { type: 'mana', value: 0.5 }, description: 'Pedaço de éter com forma.' },
  'Golem Dimensional': { id: 'dimensional_golem', name: 'Golem Dimensional', theme: 'Dimensional', rarity: 'rare', bonus: { type: 'hp', value: 2 }, description: 'Golem em múltiplas dimensões.' },
  'Quimera Cósmica': { id: 'cosmic_chimera', name: 'Quimera Cósmica', theme: 'Dimensional', rarity: 'uncommon', bonus: { type: 'dps', value: 1 }, description: 'Quimera de realidades diferentes.' },
  'Aberração': { id: 'aberration', name: 'Aberração', theme: 'Dimensional', rarity: 'rare', bonus: { type: 'critChance', value: 1 }, description: 'Erro na matrix da realidade.' },
  'Paradoxo Cambiante': { id: 'changing_paradox', name: 'Paradoxo Cambiante', theme: 'Dimensional', rarity: 'uncommon', bonus: { type: 'dps', value: 0.7 }, description: 'Ser que existe e não existe.' },

  // ===== BOSSES =====
  'Lorde das Sombras': { id: 'shadow_lord', name: 'Lorde das Sombras', theme: 'Trevas', rarity: 'boss', bonus: { type: 'dps', value: 5 }, description: 'O Devorador de Luz.' },
  'Senhor Vulcânico': { id: 'volcanic_lord', name: 'Senhor Vulcânico', theme: 'Vulcânica', rarity: 'boss', bonus: { type: 'dps', value: 5 }, description: 'Coração do Vulcão.' },
  'Rei do Gelo Eterno': { id: 'eternal_ice_king', name: 'Rei do Gelo Eterno', theme: 'Glacial', rarity: 'boss', bonus: { type: 'hp', value: 10 }, description: 'Monarca dos Frostlands.' },
  'Titã do Abismo': { id: 'abyss_titan', name: 'Titã do Abismo', theme: 'Abismo', rarity: 'boss', bonus: { type: 'gold', value: 5 }, description: 'Lorde das Profundezas.' },
  'Arcanjo Exilado': { id: 'exiled_archangel', name: 'Arcanjo Exilado', theme: 'Celestial', rarity: 'boss', bonus: { type: 'critDmg', value: 5 }, description: 'O Caído da Luz.' },
  'Lich Supremo': { id: 'supreme_lich', name: 'Lich Supremo', theme: 'Cripta', rarity: 'boss', bonus: { type: 'mana', value: 5 }, description: 'Mestre da Necromancia.' },
  'Arquidiabo': { id: 'archdevil', name: 'Arquidiabo', theme: 'Infernal', rarity: 'boss', bonus: { type: 'dps', value: 8 }, description: 'Príncipe das Chamas.' },
  'Senhor do Vazio': { id: 'void_lord', name: 'Senhor do Vazio', theme: 'Dimensional', rarity: 'boss', bonus: { type: 'critChance', value: 3 }, description: 'O Guardião do Nada.' },

  // ===== MONSTROS RAROS =====
  'Goblin Dourado': { id: 'golden_goblin', name: 'Goblin Dourado', theme: 'all', rarity: 'legendary', bonus: { type: 'gold', value: 10 }, description: 'Goblin raro banhado a ouro.' },
  'Cristal de Mana Ancestral': { id: 'mana_crystal', name: 'Cristal de Mana Ancestral', theme: 'all', rarity: 'legendary', bonus: { type: 'mana', value: 10 }, description: 'Cristal vivo com mana pura.' },
  'Assassino das Sombras': { id: 'shadow_assassin', name: 'Assassino das Sombras', theme: 'all', rarity: 'legendary', bonus: { type: 'critDmg', value: 10 }, description: 'Aventureiro corrompido.' },
  'Mimic Tesourei': { id: 'treasure_mimic', name: 'Mimic Tesourei', theme: 'all', rarity: 'legendary', bonus: { type: 'gold', value: 15 }, description: 'Baú faminto por ouro.' },
  'Caminhante do Vazio': { id: 'void_walker', name: 'Caminhante do Vazio', theme: 'Dimensional', rarity: 'legendary', bonus: { type: 'dps', value: 10 }, description: 'Criatura que surge do nada.' },
};

// ========== FUNÇÕES DE COLEÇÃO ==========

export function getCollectionBonus(discoveredIds: string[]): {
  dpsBonus: number;
  goldBonus: number;
  hpBonus: number;
  critChanceBonus: number;
  critDmgBonus: number;
  manaBonus: number;
} {
  let dps = 0, gold = 0, hp = 0, critChance = 0, critDmg = 0, mana = 0;

  for (const id of discoveredIds) {
    const entry = Object.values(MONSTER_COLLECTION).find(e => e.id === id);
    if (!entry) continue;
    switch (entry.bonus.type) {
      case 'dps': dps += entry.bonus.value; break;
      case 'gold': gold += entry.bonus.value; break;
      case 'hp': hp += entry.bonus.value; break;
      case 'critChance': critChance += entry.bonus.value; break;
      case 'critDmg': critDmg += entry.bonus.value; break;
      case 'mana': mana += entry.bonus.value; break;
    }
  }

  return { dpsBonus: dps, goldBonus: gold, hpBonus: hp, critChanceBonus: critChance, critDmgBonus: critDmg, manaBonus: mana };
}

export function getCollectionStats(discoveredIds: string[]) {
  const total = Object.keys(MONSTER_COLLECTION).length;
  const discovered = discoveredIds.length;
  const percentage = Math.round((discovered / total) * 100);

  const byRarity = {
    common: { total: 0, discovered: 0 },
    uncommon: { total: 0, discovered: 0 },
    rare: { total: 0, discovered: 0 },
    boss: { total: 0, discovered: 0 },
    legendary: { total: 0, discovered: 0 },
  };

  for (const entry of Object.values(MONSTER_COLLECTION)) {
    byRarity[entry.rarity].total++;
    if (discoveredIds.includes(entry.id)) {
      byRarity[entry.rarity].discovered++;
    }
  }

  return { total, discovered, percentage, byRarity };
}

export const RARITY_COLORS: Record<string, string> = {
  common: '#94a3b8',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  boss: '#a855f7',
  legendary: '#f59e0b',
};

export const RARITY_LABELS: Record<string, string> = {
  common: 'Comum',
  uncommon: 'Incomum',
  rare: 'Raro',
  boss: 'Boss',
  legendary: 'Lendário',
};
