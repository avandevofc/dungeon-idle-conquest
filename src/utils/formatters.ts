// ========== NUMBER FORMATTING ==========
export function formatNumber(n: number): string {
  if (n < 0) return '-' + formatNumber(-n);
  if (n < 1000) return Math.floor(n).toString();
  if (n < 1e6) return (n / 1e3).toFixed(1) + 'K';
  if (n < 1e9) return (n / 1e6).toFixed(1) + 'M';
  if (n < 1e12) return (n / 1e9).toFixed(1) + 'B';
  if (n < 1e15) return (n / 1e12).toFixed(1) + 'T';
  return (n / 1e15).toFixed(1) + 'Q';
}

// ========== FORMULA FUNCTIONS ==========
export function monsterHp(pos: number, dungeonMultiplier: number): number {
  // HP = 20 × 1.18^pos × dungeonMultiplier
  return Math.floor(20 * Math.pow(1.18, pos) * dungeonMultiplier);
}

export function goldDrop(pos: number, dungeonMultiplier: number): number {
  // Gold = 2 × 1.15^pos × dungeonMultiplier
  return Math.floor(2 * Math.pow(1.15, pos) * dungeonMultiplier);
}

export function heroUpgradeCost(baseCost: number, level: number): number {
  // Cost = base × 1.07^level
  return Math.floor(baseCost * Math.pow(1.07, level));
}

export function heroDamage(baseDmg: number, level: number, manaMult: number, evoMultiplier: number = 1): number {
  // Damage = base × level × manaMultiplier × evolutionMultiplier
  return Math.floor(baseDmg * level * manaMult * evoMultiplier);
}

export function totalDps(heroes: { id: string; level: number; evolutionLevel?: number }[], heroDefs: { id: string; baseDmg: number }[], manaMult: number): number {
  let total = 0;
  for (const h of heroes) {
    const def = heroDefs.find(d => d.id === h.id);
    if (def && h.level > 0) {
      const evoMult = getEvolutionMultiplier(h.evolutionLevel || 0);
      total += heroDamage(def.baseDmg, h.level, manaMult, evoMult);
    }
  }
  return total;
}

// Evolution multiplier lookup
export function getEvolutionMultiplier(evolutionLevel: number): number {
  const muls = [1, 2.5, 7]; // Base, 1st evo, 2nd evo
  return muls[Math.min(evolutionLevel, muls.length - 1)];
}

// ========== DUNGEON HELPERS ==========
export function dungeonMultiplier(dungeonNumber: number): number {
  // Every 8 dungeons the cycle repeats with higher stats
  // Base multiplier increases: dungeon 1 = 1x, dungeon 9 = 2x, etc.
  return Math.pow(1.25, dungeonNumber - 1);
}

export function getDungeonName(dungeonNumber: number): { themeName: string; cycleNum: number } {
  const themeIndex = ((dungeonNumber - 1) % 8);
  const cycleNum = Math.floor((dungeonNumber - 1) / 8);
  return { themeName: themeNames[themeIndex], cycleNum };
}

const themeNames = ['Trevas', 'Vulcânica', 'Glacial', 'Abismo', 'Celestial', 'Cripta', 'Infernal', 'Dimensional'];

export function getDungeonFullName(dungeonNumber: number): string {
  const { themeName, cycleNum } = getDungeonName(dungeonNumber);
  if (cycleNum === 0) return themeName;
  return `${themeName} ${cycleNum + 1}`;
}

export function getEnemyName(dungeonNumber: number, position: number, isBoss: boolean): string {
  const { themeName } = getDungeonName(dungeonNumber);
  const themeIndex = themeNames.indexOf(themeName);
  const themes: Record<string, { mobs: string[]; boss: string }> = {
    'Trevas': { mobs: ['Sombra Rastejante', 'Goblin das Trevas', 'Lobo Nublido', 'Oculto Negro', 'Morcego Sombrio', 'Araknis Noturno', 'Espírito Errante', 'Cobra Negra', 'Golem de Ébano'], boss: 'Lorde das Sombras' },
    'Vulcânica': { mobs: ['Lagarto Ígneo', 'Goblin de Lava', 'Salamandra', 'Elemental de Fogo', 'Brasa Viva', 'Escorpione Ardente', 'Golem de Magma', 'Fênix Menor', 'Drake de Fogo'], boss: 'Senhor Vulcânico' },
    'Glacial': { mobs: ['Yeti Bebê', 'Lobo de Gelo', 'Elemental Glacial', 'Goblin de Gelo', 'Pinguinho Rebelde', 'Aranha de Frio', 'Golem de Gelo', 'Harpia Gelada', 'Serpente Glacial'], boss: 'Rei do Gelo Eterno' },
    'Abismo': { mobs: ['Peixe-Lanterna', 'Goblin Abissal', 'Kraken Menor', 'Polvo Sombrio', 'Engolidor', 'Hidra Jovem', 'Golem Abissal', 'Medusa Profunda', 'Leviatã Bebê'], boss: 'Titã do Abismo' },
    'Celestial': { mobs: ['Anjo Caído', 'Serafim Destruido', 'Querubim Rebelde', 'Goblin Celeste', 'Espírito Puro', 'Cometa Vivo', 'Golem Dourado', 'Grifo Sagrado', 'Unicórnio Negro'], boss: 'Arcanjo Exilado' },
    'Cripta': { mobs: ['Esqueleto Velho', 'Zumbi Cambaleante', 'Morte-Viva', 'Goblin Espectral', 'Múmia Enrolada', 'Wraith Jovem', 'Golem de Ossos', 'Vampirinho', 'Espectro Sombrio'], boss: 'Lich Supremo' },
    'Infernal': { mobs: ['Diabinho', 'Goblin Infernal', 'Demônio Menor', 'Súcubo Júnior', 'Incubiço', 'Golem Ígneo', 'Balrog Jovem', 'Pit Fiend Jr.', 'Cavaleiro Maldito'], boss: 'Arquidiabo' },
    'Dimensional': { mobs: ['Riftling', 'Goblin Cósmico', 'Fragmento Vivo', 'Void Stalker', 'Éter Jovem', 'Golem Dimensional', 'Quimera Cósmica', 'Aberração', 'Paradoxo Cambiante'], boss: 'Senhor do Vazio' },
  };
  const themeKey = themeNames[themeIndex];
  const t = themes[themeKey];
  if (isBoss) return t.boss;
  return t.mobs[(position - 1) % t.mobs.length];
}

// ========== TIME FORMATTING ==========
export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 5000) return 'agora';
  if (diff < 60000) return `${Math.floor(diff / 1000)}s atrás`;
  if (diff < 3600000) return `${Math.floor(diff / 60000)}min atrás`;
  return `${Math.floor(diff / 3600000)}h atrás`;
}
