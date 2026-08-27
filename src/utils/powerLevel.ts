import { GameState } from '../types';
import { HERO_DEFS } from '../data/gameData';
import { ITEMS } from '../data/items';
import { PET_DEFS } from '../data/pets';
import { SKILL_DEFS } from '../data/skills';
import { PRESTIGE_DEFS } from '../data/prestige';
import { heroDamage, getEvolutionMultiplier } from './formatters';

// Rarity weights for power calculation
const RARITY_WEIGHT: Record<string, number> = {
  common: 1,
  uncommon: 2,
  rare: 5,
  epic: 15,
  legendary: 50,
};

// Evolution tier multiplier
function getEvolutionPowerMultiplier(level: number): number {
  return 1 + level * 0.5; // Each evolution adds 50% power
}

export function calculatePowerLevel(state: GameState): number {
  let power = 0;

  // 1. Hero Levels & Damage (40% of total power)
  for (const hero of state.heroes) {
    if (hero.level > 0) {
      const def = HERO_DEFS.find(d => d.id === hero.id);
      if (def) {
        // Base damage from level
        const baseDmg = heroDamage(def.baseDmg, hero.level, 1, getEvolutionMultiplier(hero.evolutionLevel));
        power += baseDmg * 10;
        
        // Evolution bonus (massive multiplier)
        const evoMultiplier = getEvolutionPowerMultiplier(hero.evolutionLevel);
        power *= evoMultiplier;
        
        // HP bonus (survivability = power)
        power += hero.maxHp * 0.1;
      }
    }
  }

  // 2. Gold Earned (20% of total power) - represents overall progression
  power += Math.log10(state.totalGoldEarned + 1) * 100000;

  // 3. Mana Upgrades (15% of total power) - permanent progression
  for (const upgrade of state.manaUpgrades) {
    if (upgrade.level > 0) {
      power += upgrade.level * 50000;
    }
  }

  // 4. Inventory Items (10% of total power)
  for (const item of state.inventory.items) {
    if (item.equipped) {
      const def = ITEMS.find(i => i.id === item.defId);
      if (def) {
        const rarityMult = RARITY_WEIGHT[def.rarity] || 1;
        const levelMult = 1 + (item.level - 1) * 0.15;
        power += def.baseStat * rarityMult * levelMult * 1000;
      }
    }
  }

  // 5. Pets (5% of total power)
  for (const pet of state.pets) {
    const def = PET_DEFS.find(d => d.id === pet.id);
    if (def) {
      const levelMult = 1 + (pet.level - 1) * 0.1;
      // Pet type bonus
      const typeBonus = def.type === 'attack' ? 2 : def.type === 'support' ? 1.5 : 1;
      power += 10000 * levelMult * typeBonus;
    }
  }

  // 6. Skills (5% of total power)
  for (const skill of state.skills) {
    if (skill.level > 0) {
      const def = SKILL_DEFS.find(d => d.id === skill.id);
      if (def) {
        power += skill.level * 25000;
      }
    }
  }

  // 7. Prestige (5% of total power) - the ultimate progression
  power += state.prestige.points * 500000;
  power += state.prestige.ascensions * 1000000;

  // 8. Dungeon Progression (bonus)
  power += state.dungeon.completedDungeons * 100000;
  power += state.highestDungeon * 50000;

  // 9. Critical Stats (bonus)
  power += state.crit.totalCrits * 1000;

  // 10. Total Kills (bonus)
  power += state.totalKills * 100;
  power += state.totalBossKills * 5000;

  return Math.floor(power);
}

// Format power level for display (like browser RPGs)
export function formatPowerLevel(power: number): { value: string; suffix: string; color: string } {
  if (power < 1000) {
    return { value: power.toString(), suffix: '', color: '#94a3b8' }; // Gray
  } else if (power < 1000000) {
    // K (milhar)
    const k = power / 1000;
    return { 
      value: k.toFixed(k < 10 ? 1 : 0), 
      suffix: 'K', 
      color: '#22c55e' // Green
    };
  } else if (power < 1000000000) {
    // M (milhão)
    const m = power / 1000000;
    return { 
      value: m.toFixed(m < 10 ? 1 : 0), 
      suffix: 'M', 
      color: '#3b82f6' // Blue
    };
  } else if (power < 1000000000000) {
    // B (bilhão)
    const b = power / 1000000000;
    return { 
      value: b.toFixed(b < 10 ? 1 : 0), 
      suffix: 'B', 
      color: '#a855f7' // Purple
    };
  } else if (power < 1000000000000000) {
    // T (trilhão)
    const t = power / 1000000000000;
    return { 
      value: t.toFixed(t < 10 ? 1 : 0), 
      suffix: 'T', 
      color: '#f59e0b' // Amber
    };
  } else if (power < 1000000000000000000) {
    // Qa (quatrilhão)
    const qa = power / 1000000000000000;
    return { 
      value: qa.toFixed(qa < 10 ? 1 : 0), 
      suffix: 'Qa', 
      color: '#ef4444' // Red
    };
  } else {
    // Qi (quintilhão) and beyond
    const qi = power / 1000000000000000000;
    return { 
      value: qi.toFixed(qi < 10 ? 2 : 0), 
      suffix: 'Qi', 
      color: '#ec4899' // Pink
    };
  }
}

// Get power rank based on power level
export function getPowerRank(power: number): { rank: string; title: string; color: string } {
  if (power < 1000) {
    return { rank: 'E', title: 'Iniciante', color: '#94a3b8' };
  } else if (power < 10000) {
    return { rank: 'D', title: 'Aprendiz', color: '#22c55e' };
  } else if (power < 100000) {
    return { rank: 'C', title: 'Guerreiro', color: '#3b82f6' };
  } else if (power < 1000000) {
    return { rank: 'B', title: 'Veterano', color: '#a855f7' };
  } else if (power < 10000000) {
    return { rank: 'A', title: 'Herói', color: '#f59e0b' };
  } else if (power < 100000000) {
    return { rank: 'S', title: 'Lenda', color: '#ef4444' };
  } else if (power < 1000000000) {
    return { rank: 'SS', title: 'Mito', color: '#ec4899' };
  } else if (power < 10000000000) {
    return { rank: 'SSS', title: 'Deus', color: '#fbbf24' };
  } else {
    return { rank: '★', title: 'Transcendente', color: '#22d3ee' };
  }
}
