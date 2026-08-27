import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, CombatLogEntry, FloatingNumber, ManaUpgradeState, ItemInstance, PetState, SkillState, PrestigeState, ActiveSkillState, AchievementState, DailyRewardState } from '../types';
import { ACTIVE_SKILLS, getSkillsForHero, canUnlockSkill, getScaledEffect } from '../data/activeSkills';
import { ACHIEVEMENT_DEFS, checkAchievement } from '../data/achievements';
import { claimDailyReward, getTodayString, DAILY_REWARDS, getStreakMilestone } from '../data/dailyRewards';
import { HERO_DEFS, MANA_UPGRADES, DUNGEON_THEMES } from '../data/gameData';
import { ITEMS, RARITY_CHANCE, itemUpgradeCost, RARITY_COLORS } from '../data/items';
import { PET_DEFS, PET_LEVEL_COST } from '../data/pets';
import { SKILL_DEFS } from '../data/skills';
import { PRESTIGE_DEFS, prestigePointsForAscension } from '../data/prestige';
import { generateDailyChallenge, SHOP_ITEMS } from '../data/shop';
import { monsterHp, goldDrop, heroUpgradeCost, heroDamage, totalDps, dungeonMultiplier, getEnemyName, getEvolutionMultiplier } from '../utils/formatters';
import { playSkillSound, playAchievementSound, playLevelUpSound } from '../utils/sounds';
import { getEvolutionDef, getNextTier, getCurrentTier } from '../data/evolutions';

const SAVE_KEY = 'dic_save_v2';
const SAVE_INTERVAL = 30_000;
const TICK_MS = 1000;
const LOG_MAX = 80;
const BASE_CRIT_CHANCE = 0.05;
const BASE_CRIT_MULT = 2.0;
const BASE_ATTACK_INTERVAL = 1000; // ms

let nextLogId = 1;
let nextFloatId = 1;
let nextItemUid = 1;

function getInitialState(): GameState {
  return {
    gold: 0,
    totalGoldEarned: 0,
    mana: 0,
    totalManaEarned: 0,
    heroes: HERO_DEFS.map(h => {
      const hp = h.baseHp;
      return { id: h.id, level: h.id === 'warrior' ? 1 : 0, hp, maxHp: hp, isDead: false, reviveTimer: 0, evolutionLevel: 0 };
    }),
    dungeon: { currentDungeon: 1, currentStage: 1, enemiesDefeated: 0, completedDungeons: 0 },
    currentEnemy: { hp: 0, maxHp: 0 },
    manaUpgrades: MANA_UPGRADES.map(u => ({ id: u.id, level: 0 })),
    combatLog: [],
    floatingNumbers: [],
    lastSaveTime: Date.now(),
    gameStartTime: Date.now(),
    // New systems
    crit: { chance: BASE_CRIT_CHANCE, multiplier: BASE_CRIT_MULT, totalCrits: 0 },
    inventory: { items: [], maxSlots: 20, goldFindBonus: 0, damageBonus: 0, critChanceBonus: 0, critDmgBonus: 0 },
    pets: [],
    skills: [],
    prestige: { points: 0, totalPointsEarned: 0, ascensions: 0, upgrades: [] },
    dailyChallenge: generateDailyChallenge(getTodayString()),
    skillPoints: 0,
    totalKills: 0,
    totalBossKills: 0,
    highestDungeon: 1,
    activePet: null,
    activeSkills: [],
    achievements: [],
    dailyRewards: {
      lastClaimDate: '',
      currentStreak: 0,
      longestStreak: 0,
      totalDaysClaimed: 0,
      claimedToday: false,
      lastRewardIndex: 0,
    },
  };
}

function loadSave(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    if (typeof parsed.gold !== 'number' || !parsed.dungeon) return null;
    const defaults = getInitialState();

    // Merge heroes - ensure all HERO_DEFS heroes exist
    const savedHeroes = parsed.heroes || [];
    const mergedHeroes = defaults.heroes.map(defaultHero => {
      const saved = savedHeroes.find((h: any) => h.id === defaultHero.id);
      if (saved) {
        return {
          ...defaultHero,
          ...saved,
          maxHp: saved.maxHp || defaultHero.maxHp,
          hp: saved.hp !== undefined ? saved.hp : defaultHero.maxHp,
          isDead: saved.isDead || false,
          reviveTimer: saved.reviveTimer || 0,
        };
      }
      return defaultHero;
    });

    return {
      ...defaults,
      ...parsed,
      heroes: mergedHeroes,
      crit: { ...defaults.crit, ...parsed.crit },
      inventory: { ...defaults.inventory, ...parsed.inventory },
      prestige: { ...defaults.prestige, ...parsed.prestige },
      dailyChallenge: generateDailyChallenge(getTodayString()),
      activeSkills: parsed.activeSkills || [],
      achievements: parsed.achievements || [],
      dailyRewards: parsed.dailyRewards || { lastClaimDate: '', currentStreak: 0, longestStreak: 0, totalDaysClaimed: 0, claimedToday: false, lastRewardIndex: 0 },
    };
  } catch { return null; }
}

function saveGame(state: GameState) {
  try {
    const toSave = { ...state, lastSaveTime: Date.now(), combatLog: [], floatingNumbers: [] };
    localStorage.setItem(SAVE_KEY, JSON.stringify(toSave));
  } catch { /* ignore */ }
}

function getTheme(dn: number) { return DUNGEON_THEMES[((dn - 1) % 8)]; }
function getCycleNum(dn: number) { return Math.floor((dn - 1) / 8); }
function getDungeonFullName(dn: number) {
  const t = getTheme(dn);
  const c = getCycleNum(dn);
  return c === 0 ? `${t.emoji} ${t.name}` : `${t.emoji} ${t.name} ${c + 1}`;
}

// ========== ITEM DROP ==========
function rollItemDrop(dungeonNumber: number, isBoss: boolean, itemChanceBonus: number): ItemInstance | null {
  const baseChance = isBoss ? 40 : 8;
  const chance = Math.min(90, baseChance + itemChanceBonus);
  if (Math.random() * 100 > chance) return null;

  // Roll rarity
  const roll = Math.random() * 100;
  let rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' = 'common';
  let cumulative = 0;
  for (const r of ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const) {
    cumulative += RARITY_CHANCE[r];
    if (roll < cumulative) { rarity = r; break; }
  }

  // Filter items by rarity and roll one
  const pool = ITEMS.filter(i => i.rarity === rarity);
  if (pool.length === 0) return null;
  const def = pool[Math.floor(Math.random() * pool.length)];

  return {
    uid: `item-${nextItemUid++}-${Date.now()}`,
    defId: def.id,
    level: 1,
    equipped: false,
  };
}

// ========== COMPUTE BONUSES ==========
function computeInventoryBonuses(items: ItemInstance[]) {
  let goldFind = 0, damage = 0, critChance = 0, critDmg = 0;
  for (const item of items) {
    if (!item.equipped) continue;
    const def = ITEMS.find(i => i.id === item.defId);
    if (!def) continue;
    const mult = 1 + (item.level - 1) * 0.15;
    const val = def.baseStat * mult;
    switch (def.statType) {
      case 'gold': goldFind += val / 100; break;
      case 'damage': damage += val / 100; break;
      case 'critChance': critChance += val / 100; break;
      case 'critDmg': critDmg += val / 100; break;
    }
  }
  return { goldFind, damage, critChance, critDmg };
}

function computePrestigeBonuses(upgrades: { id: string; level: number }[]) {
  let dmgMult = 1, goldMult = 1, critChance = 0, critDmg = 0, startGold = 0, startMana = 0, itemChance = 0, manaBossMult = 1;
  for (const u of upgrades) {
    const def = PRESTIGE_DEFS.find(p => p.id === u.id);
    if (!def) continue;
    switch (u.id) {
      case 'eternal_power': dmgMult = def.effect(u.level); break;
      case 'golden_touch': goldMult = def.effect(u.level); break;
      case 'swift_start': startGold = def.effect(u.level); break;
      case 'mana_reservoir': startMana = def.effect(u.level); break;
      case 'critical_origin': critChance = def.effect(u.level) / 100; critDmg = def.effect(u.level) * 2 / 100; break;
      case 'item_magnet': itemChance = (def.effect(u.level) - 1) * 100; break;
      case 'soul_collector': manaBossMult = def.effect(u.level); break;
    }
  }
  return { dmgMult, goldMult, critChance, critDmg, startGold, startMana, itemChance, manaBossMult };
}

function computeSkillBonuses(skills: { id: string; level: number }[]) {
  let dmgPct = 0, critChance = 0, critDmg = 0, goldPct = 0, itemChance = 0, atkSpeedPct = 0, manaBossPct = 0;
  for (const s of skills) {
    const def = SKILL_DEFS.find(d => d.id === s.id);
    if (!def || s.level === 0) continue;
    switch (s.id) {
      case 'power_strike': dmgPct += s.level * 15; break;
      case 'critical_mastery': critChance += s.level * 3; critDmg += s.level * 10; break;
      case 'blood_fury': dmgPct += s.level * 10; break; // simplified
      case 'arcane_blast': dmgPct += s.level * 5; break; // simplified
      case 'gold_rush': goldPct += s.level * 12; break;
      case 'treasure_hunter': itemChance += s.level * 5; break;
      case 'swift_feet': atkSpeedPct += s.level * 8; break;
      case 'mana_surge': manaBossPct += s.level * 20; break;
    }
  }
  return { dmgPct, critChance, critDmg, goldPct, itemChance, atkSpeedPct, manaBossPct };
}

function computePetBonuses(pets: PetState[], activePet: string | null) {
  let dmgPct = 0, goldPct = 0, itemChance = 0, atkSpeedPct = 0;
  if (!activePet) return { dmgPct, goldPct, itemChance, atkSpeedPct };
  const pet = pets.find(p => p.id === activePet);
  if (!pet) return { dmgPct, goldPct, itemChance, atkSpeedPct };
  const def = PET_DEFS.find(d => d.id === activePet);
  if (!def) return { dmgPct, goldPct, itemChance, atkSpeedPct };
  const lvlMult = 1 + (pet.level - 1) * 0.1;
  switch (def.type) {
    case 'attack': dmgPct += (def.id === 'phoenix' ? 100 : def.id === 'dragon_whelp' ? 50 : def.id === 'shadow_wolf' ? 30 : 15) * lvlMult; break;
    case 'support': goldPct += (def.id === 'angel' ? 75 : def.id === 'spirit_wisp' ? 40 : 20) * lvlMult; break;
    case 'utility': itemChance += (def.id === 'treasure_mimic' ? 50 : 20) * lvlMult; atkSpeedPct += (def.id === 'time_relic' ? 20 : 0) * lvlMult; break;
  }
  return { dmgPct, goldPct, itemChance, atkSpeedPct };
}

// ========== MAIN HOOK ==========
export function useGameEngine() {
  const [state, setState] = useState<GameState>(() => loadSave() || getInitialState());
  const stateRef = useRef(state);
  stateRef.current = state;

  const [isPaused, setIsPaused] = useState(false);
  const [dps, setDps] = useState(0);
  const [enemyName, setEnemyName] = useState('');

  // Derived values
  const getManaMult = useCallback(() => {
    const powerLevel = state.manaUpgrades.find(u => u.id === 'arcane_power')?.level || 0;
    return 1 + powerLevel * 0.10;
  }, [state.manaUpgrades]);

  const getGoldMult = useCallback(() => {
    const midasLevel = state.manaUpgrades.find(u => u.id === 'midas_touch')?.level || 0;
    return 1 + midasLevel * 0.10;
  }, [state.manaUpgrades]);

  const addLog = useCallback((text: string, type: CombatLogEntry['type']) => {
    setState(prev => ({
      ...prev,
      combatLog: [{ id: nextLogId++, text, type, timestamp: Date.now() }, ...prev.combatLog].slice(0, LOG_MAX),
    }));
  }, []);

  // ========== GAME TICK ==========
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setState(prev => {
        const manaMult = getManaMult();
        const goldMultBase = getGoldMult();
        const invBonuses = computeInventoryBonuses(prev.inventory.items);
        const prestBonuses = computePrestigeBonuses(prev.prestige.upgrades);
        const skillBonuses = computeSkillBonuses(prev.skills);
        const petBonuses = computePetBonuses(prev.pets, prev.activePet);

        // Total multipliers
        const totalDmgMult = manaMult * prestBonuses.dmgMult * (1 + skillBonuses.dmgPct / 100) * (1 + petBonuses.dmgPct / 100) * (1 + invBonuses.damage);
        const totalGoldMult = goldMultBase * prestBonuses.goldMult * (1 + skillBonuses.goldPct / 100) * (1 + petBonuses.goldPct / 100) * (1 + invBonuses.goldFind);
        const totalCritChance = prev.crit.chance + invBonuses.critChance + prestBonuses.critChance + skillBonuses.critChance / 100;
        const totalCritDmg = prev.crit.multiplier + invBonuses.critDmg + prestBonuses.critDmg;
        const attackSpeed = Math.max(200, BASE_ATTACK_INTERVAL * (1 - skillBonuses.atkSpeedPct / 100 - petBonuses.atkSpeedPct / 100));

        // Base DPS from heroes
        let baseDps = 0;
        for (const h of prev.heroes) {
          const def = HERO_DEFS.find(d => d.id === h.id);
          if (def && h.level > 0) baseDps += heroDamage(def.baseDmg, h.level, 1, getEvolutionMultiplier(h.evolutionLevel || 0));
        }

        const rawDps = baseDps * totalDmgMult;
        // Apply crit average
        const avgDps = rawDps * (1 + totalCritChance * (totalCritDmg - 1));

        let { gold, totalGoldEarned, mana, totalManaEarned, currentEnemy, dungeon, combatLog, crit, totalKills, totalBossKills, highestDungeon, inventory, skillPoints, heroes } = prev;
        const newFloats = [...prev.floatingNumbers.filter(f => Date.now() - f.timestamp < 1200)];
        const pos = dungeon.currentStage;
        const isBoss = pos === 10;

        const newLogs: CombatLogEntry[] = [];
        const log = (text: string, type: CombatLogEntry['type']) => {
          newLogs.push({ id: nextLogId++, text, type, timestamp: Date.now() });
        };

        // ========== HERO ATTACK ENEMY ==========
        if (avgDps > 0 && currentEnemy.hp > 0) {
          const damage = Math.floor(avgDps);
          const isCrit = Math.random() < totalCritChance;
          const finalDmg = isCrit ? Math.floor(damage * totalCritDmg) : damage;
          const newHp = Math.max(0, currentEnemy.hp - finalDmg);

          const fid = nextFloatId++;
          newFloats.push({ id: fid, value: finalDmg, x: 35 + Math.random() * 30, y: 25 + Math.random() * 25, isCrit, timestamp: Date.now() });

          if (isCrit) crit = { ...crit, totalCrits: crit.totalCrits + 1 };

          if (newHp <= 0) {
            // ENEMY KILLED
            totalKills++;
            const goldAmt = Math.floor(goldDrop(pos, dungeonMultiplier(dungeon.currentDungeon)) * totalGoldMult);
            gold += goldAmt;
            totalGoldEarned += goldAmt;
            log(`+${goldAmt} 🪙 ouro`, 'gold');

            if (isBoss) {
              totalBossKills++;
              const manaAmt = Math.floor((1 + dungeon.currentDungeon * 0.5) * prestBonuses.manaBossMult);
              mana += manaAmt;
              totalManaEarned += manaAmt;
              log(`+${manaAmt} 💎 mana`, 'mana');
              log(`🏆 Boss derrotado!`, 'boss');
              skillPoints++;

              const item = rollItemDrop(dungeon.currentDungeon, true, skillBonuses.itemChance + petBonuses.itemChance + prestBonuses.itemChance);
              if (item && inventory.items.length < inventory.maxSlots) {
                inventory = { ...inventory, items: [...inventory.items, item] };
                const itemDef = ITEMS.find(i => i.id === item.defId);
                log(`📦 Item: ${itemDef?.icon} ${itemDef?.name} (${itemDef?.rarity})`, 'item');
              }

              const newDungeonNum = dungeon.currentDungeon + 1;
              log(`➡️ ${getDungeonFullName(newDungeonNum)}!`, 'dungeon');
              dungeon = { currentDungeon: newDungeonNum, currentStage: 1, enemiesDefeated: 0, completedDungeons: dungeon.completedDungeons + 1 };
              highestDungeon = Math.max(highestDungeon, newDungeonNum);
            } else {
              dungeon = { ...dungeon, currentStage: dungeon.currentStage + 1, enemiesDefeated: dungeon.enemiesDefeated + 1 };

              const item = rollItemDrop(dungeon.currentDungeon, false, skillBonuses.itemChance + petBonuses.itemChance + prestBonuses.itemChance);
              if (item && inventory.items.length < inventory.maxSlots) {
                inventory = { ...inventory, items: [...inventory.items, item] };
                const itemDef = ITEMS.find(i => i.id === item.defId);
                log(`📦 Item: ${itemDef?.icon} ${itemDef?.name}`, 'item');
              }
            }

            // Spawn next enemy immediately
            const mult = dungeonMultiplier(dungeon.currentDungeon);
            const nextPos = dungeon.currentStage;
            const nextIsBoss = dungeon.currentStage === 10;
            const nextHp = monsterHp(nextPos, mult) * (nextIsBoss ? 5 : 1);
            currentEnemy = { hp: nextHp, maxHp: nextHp };
          } else {
            currentEnemy = { ...currentEnemy, hp: newHp };
          }
        }

        // ========== SAFETY: Replace dead enemy if somehow stuck ==========
        // If enemy HP is 0 but maxHp > 0, it means the enemy was killed but not replaced.
        // This can happen if setState was partially applied or a React batching issue occurred.
        // We spawn the next enemy without re-awarding gold (gold was already awarded on kill).
        if (currentEnemy.hp <= 0 && currentEnemy.maxHp > 0) {
          // Advance stage/dungeon as if the kill was processed
          if (isBoss) {
            const newDungeonNum = dungeon.currentDungeon + 1;
            dungeon = { currentDungeon: newDungeonNum, currentStage: 1, enemiesDefeated: 0, completedDungeons: dungeon.completedDungeons + 1 };
            highestDungeon = Math.max(highestDungeon, newDungeonNum);
          } else {
            dungeon = { ...dungeon, currentStage: dungeon.currentStage + 1, enemiesDefeated: dungeon.enemiesDefeated + 1 };
          }

          // Spawn next enemy
          const mult = dungeonMultiplier(dungeon.currentDungeon);
          const nextPos = dungeon.currentStage;
          const nextIsBoss = dungeon.currentStage === 10;
          const nextHp = monsterHp(nextPos, mult) * (nextIsBoss ? 5 : 1);
          currentEnemy = { hp: nextHp, maxHp: nextHp };
        }

        // ========== ENEMY ATTACKS HEROES ==========
        if (currentEnemy.hp > 0) {
          // Enemy damage = base from dungeon position * dungeon multiplier
          const enemyBaseDmg = Math.floor(5 * Math.pow(1.15, pos) * dungeonMultiplier(dungeon.currentDungeon));
          const enemyDmg = isBoss ? enemyBaseDmg * 3 : enemyBaseDmg;

          // Find alive heroes
          const aliveHeroes = heroes.filter(h => h.level > 0 && !h.isDead);
          if (aliveHeroes.length > 0) {
            // Pick a random alive hero to attack
            const targetIdx = heroes.indexOf(aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)]);
            const target = heroes[targetIdx];
            const def = HERO_DEFS.find(d => d.id === target.id)!;
            const heroMaxHp = def.baseHp * (1 + (target.level - 1) * 0.15);

            // Apply damage with some variation
            const dmgVariation = 0.8 + Math.random() * 0.4;
            const finalEnemyDmg = Math.floor(enemyDmg * dmgVariation);

            const newHeroHp = Math.max(0, target.hp - finalEnemyDmg);

            // Hero floating damage (red, position near hero area)
            newFloats.push({
              id: nextFloatId++,
              value: finalEnemyDmg,
              x: 10 + Math.random() * 20,
              y: 60 + Math.random() * 20,
              isCrit: false,
              timestamp: Date.now(),
            });

            if (newHeroHp <= 0) {
              // Hero dies
              heroes = heroes.map((h, i) => i === targetIdx ? { ...h, hp: 0, isDead: true, reviveTimer: 10 } : h);
              log(`💀 ${def.name} foi derrotado!`, 'damage');
            } else {
              heroes = heroes.map((h, i) => i === targetIdx ? { ...h, hp: newHeroHp } : h);
            }
          }

          // Revive dead heroes
          heroes = heroes.map(h => {
            if (h.isDead && h.reviveTimer > 0) {
              const newTimer = h.reviveTimer - 1;
              if (newTimer <= 0) {
                const def = HERO_DEFS.find(d => d.id === h.id)!;
                const maxHp = def.baseHp * (1 + (h.level - 1) * 0.15);
                log(`✨ ${def.name} ressuscitou!`, 'upgrade');
                return { ...h, hp: Math.floor(maxHp * 0.5), maxHp, isDead: false, reviveTimer: 0 };
              }
              return { ...h, reviveTimer: newTimer };
            }
            return h;
          });
        }

        // ========== UPDATE ACTIVE SKILLS COOLDOWNS ==========
        const newActiveSkills = prev.activeSkills.map(skill => {
          const newSkill = { ...skill };
          if (newSkill.cooldownRemaining > 0) {
            newSkill.cooldownRemaining = Math.max(0, newSkill.cooldownRemaining - 1);
          }
          if (newSkill.isActive && Date.now() > newSkill.activeUntil) {
            newSkill.isActive = false;
          }
          return newSkill;
        });

        // ========== CHECK ACHIEVEMENTS ==========
        let newAchievements = [...prev.achievements];
        const newLogs2: CombatLogEntry[] = [];
        const gameStateForCheck = {
          totalKills,
          totalBossKills,
          completedDungeons: dungeon.completedDungeons,
          highestDungeon,
          totalGoldEarned,
          totalManaEarned,
          heroes: heroes.map(h => ({ id: h.id, level: h.level })),
          inventory,
          crit,
          prestige: prev.prestige,
          skillPoints,
        };

        for (const achievementDef of ACHIEVEMENT_DEFS) {
          const existing = newAchievements.find(a => a.id === achievementDef.id);
          if (existing && existing.unlocked) continue;

          const isUnlocked = checkAchievement(achievementDef, gameStateForCheck);
          if (isUnlocked) {
            const newAchievement: AchievementState = {
              id: achievementDef.id,
              unlocked: true,
              unlockedAt: Date.now(),
              notified: false,
            };
            newAchievements = newAchievements.filter(a => a.id !== achievementDef.id);
            newAchievements.push(newAchievement);

            // Apply reward
            switch (achievementDef.reward.type) {
              case 'gold': gold += achievementDef.reward.amount; totalGoldEarned += achievementDef.reward.amount; break;
              case 'mana': mana += achievementDef.reward.amount; totalManaEarned += achievementDef.reward.amount; break;
              case 'skillPoints': skillPoints += achievementDef.reward.amount; break;
              case 'prestigePoints': prev.prestige.points += achievementDef.reward.amount; prev.prestige.totalPointsEarned += achievementDef.reward.amount; break;
            }

            newLogs2.push({
              id: nextLogId++,
              text: `🏆 Conquista: ${achievementDef.name}!`,
              type: 'achievement',
              timestamp: Date.now(),
            });
            // Play achievement sound
            playAchievementSound();
          }
        }

        return {
          ...prev, gold, totalGoldEarned, mana, totalManaEarned, currentEnemy, dungeon, heroes,
          combatLog: [...newLogs, ...newLogs2, ...combatLog].slice(0, LOG_MAX), floatingNumbers: newFloats,
          crit, totalKills, totalBossKills, highestDungeon, inventory, skillPoints,
          activeSkills: newActiveSkills,
          achievements: newAchievements,
          prestige: { ...prev.prestige },
        };
      });
    }, TICK_MS);
    return () => clearInterval(interval);
  }, [isPaused, getManaMult, getGoldMult]);

  // Update DPS display
  useEffect(() => {
    const manaMult = getManaMult();
    const invBonuses = computeInventoryBonuses(state.inventory.items);
    const prestBonuses = computePrestigeBonuses(state.prestige.upgrades);
    const skillBonuses = computeSkillBonuses(state.skills);
    const petBonuses = computePetBonuses(state.pets, state.activePet);
    const totalDmgMult = manaMult * prestBonuses.dmgMult * (1 + skillBonuses.dmgPct / 100) * (1 + petBonuses.dmgPct / 100) * (1 + invBonuses.damage);
    setDps(totalDps(state.heroes, HERO_DEFS, 1) * totalDmgMult);
  }, [state.heroes, state.manaUpgrades, state.inventory.items, state.prestige.upgrades, state.skills, state.pets, state.activePet]);

  // Auto-save
  useEffect(() => {
    const interval = setInterval(() => saveGame(stateRef.current), SAVE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Spawn initial enemy
  useEffect(() => {
    if (state.currentEnemy.maxHp === 0) {
      const mult = dungeonMultiplier(state.dungeon.currentDungeon);
      const pos = state.dungeon.currentStage;
      const isBoss = pos === 10;
      const hp = monsterHp(pos, mult) * (isBoss ? 5 : 1);
      setState(prev => ({ ...prev, currentEnemy: { hp, maxHp: hp } }));
    }
  }, []);

  useEffect(() => {
    setEnemyName(getEnemyName(state.dungeon.currentDungeon, state.dungeon.currentStage, state.dungeon.currentStage === 10));
  }, [state.dungeon.currentDungeon, state.dungeon.currentStage]);

  // ========== ACTIONS ==========
  const upgradeHero = useCallback((heroId: string) => {
    setState(prev => {
      const idx = prev.heroes.findIndex(h => h.id === heroId);
      if (idx === -1) return prev;
      const hero = prev.heroes[idx];
      const def = HERO_DEFS.find(d => d.id === heroId)!;
      const cost = heroUpgradeCost(def.baseCost, hero.level);
      if (prev.gold < cost) return prev;
      const newHeroes = [...prev.heroes];
      const newLevel = hero.level + 1;
      const newMaxHp = def.baseHp * (1 + (newLevel - 1) * 0.15);
      // If hero is dead, revive on upgrade
      if (hero.isDead) {
        newHeroes[idx] = { ...hero, level: newLevel, maxHp: newMaxHp, hp: Math.floor(newMaxHp * 0.5), isDead: false, reviveTimer: 0 };
      } else {
        newHeroes[idx] = { ...hero, level: newLevel, maxHp: newMaxHp, hp: Math.min(hero.hp + Math.floor(newMaxHp * 0.1), newMaxHp) };
      }
      // Play level up sound
      playLevelUpSound();
      return { ...prev, gold: prev.gold - cost, heroes: newHeroes };
    });
  }, []);

  // ========== HERO EVOLUTION ==========
  const evolveHero = useCallback((heroId: string) => {
    setState(prev => {
      const idx = prev.heroes.findIndex(h => h.id === heroId);
      if (idx === -1) return prev;
      const hero = prev.heroes[idx];
      const def = HERO_DEFS.find(d => d.id === heroId)!;
      
      // Get evolution data dynamically
      const evoDef = getEvolutionDef(heroId);
      if (!evoDef) return prev;
      
      const nextTier = getNextTier(heroId, hero.evolutionLevel);
      if (!nextTier) return prev;
      
      // Check requirements
      if (hero.level < nextTier.requiredLevel) return prev;
      if (prev.gold < nextTier.goldCost) return prev;
      
      // Apply evolution
      const newHeroes = [...prev.heroes];
      const newEvoLevel = hero.evolutionLevel + 1;
      const newMaxHp = def.baseHp * (1 + (hero.level - 1) * 0.15) * nextTier.hpMultiplier;
      
      newHeroes[idx] = {
        ...hero,
        evolutionLevel: newEvoLevel,
        maxHp: newMaxHp,
        hp: newMaxHp, // Full heal on evolution
        isDead: false,
        reviveTimer: 0,
      };
      
      // Log
      const newLog = {
        id: nextLogId++,
        text: `✨ ${def.icon} ${def.name} evoluiu para ${nextTier.icon} ${nextTier.name}!`,
        type: 'upgrade' as const,
        timestamp: Date.now(),
      };
      
      // Play evolution sound
      playLevelUpSound();
      
      return {
        ...prev,
        gold: prev.gold - nextTier.goldCost,
        heroes: newHeroes,
        combatLog: [newLog, ...prev.combatLog].slice(0, LOG_MAX),
      };
    });
  }, []);

  // Bulk upgrade hero (1x, 5x, 10x, 100x, max)
  const bulkUpgradeHero = useCallback((heroId: string, amount: number | 'max') => {
    setState(prev => {
      let gold = prev.gold;
      let hero = prev.heroes.find(h => h.id === heroId);
      if (!hero) return prev;
      const def = HERO_DEFS.find(d => d.id === heroId)!;
      if (hero.level === 0) return prev;

      let levelsToAdd = 0;
      let tempLevel = hero.level;
      let tempGold = gold;

      if (amount === 'max') {
        // Calculate max possible upgrades
        while (true) {
          const cost = heroUpgradeCost(def.baseCost, tempLevel);
          if (tempGold < cost) break;
          tempGold -= cost;
          tempLevel++;
          levelsToAdd++;
        }
      } else {
        // Calculate exact number of upgrades requested
        for (let i = 0; i < amount; i++) {
          const cost = heroUpgradeCost(def.baseCost, tempLevel);
          if (tempGold < cost) break;
          tempGold -= cost;
          tempLevel++;
          levelsToAdd++;
        }
      }

      if (levelsToAdd === 0) return prev;

      const newLevel = hero.level + levelsToAdd;
      const newMaxHp = def.baseHp * (1 + (newLevel - 1) * 0.15);
      const totalCost = gold - tempGold;

      const newHeroes = prev.heroes.map(h => {
        if (h.id !== heroId) return h;
        if (h.isDead) {
          return { ...h, level: newLevel, maxHp: newMaxHp, hp: Math.floor(newMaxHp * 0.5), isDead: false, reviveTimer: 0 };
        }
        return { ...h, level: newLevel, maxHp: newMaxHp, hp: Math.min(h.hp + Math.floor((newMaxHp - h.maxHp) * 0.5), newMaxHp) };
      });

      return { ...prev, gold: gold - totalCost, heroes: newHeroes };
    });
  }, []);

  const buyManaUpgrade = useCallback((upgradeId: string) => {
    setState(prev => {
      const idx = prev.manaUpgrades.findIndex(u => u.id === upgradeId);
      if (idx === -1) return prev;
      const upg = prev.manaUpgrades[idx];
      const def = MANA_UPGRADES.find(d => d.id === upgradeId)!;
      const cost = Math.floor(def.baseCost * Math.pow(def.costScale, upg.level));
      if (prev.mana < cost) return prev;
      const newUpgrades = [...prev.manaUpgrades];
      newUpgrades[idx] = { ...upg, level: upg.level + 1 };
      return { ...prev, mana: prev.mana - cost, manaUpgrades: newUpgrades };
    });
  }, []);

  // Equipment
  const equipItem = useCallback((itemUid: string, heroId: string) => {
    setState(prev => {
      const item = prev.inventory.items.find(i => i.uid === itemUid);
      if (!item) return prev;
      const newItems = prev.inventory.items.map(i =>
        i.uid === itemUid ? { ...i, equipped: true, heroId } : i
      );
      return { ...prev, inventory: { ...prev.inventory, items: newItems } };
    });
  }, []);

  const unequipItem = useCallback((itemUid: string) => {
    setState(prev => {
      const newItems = prev.inventory.items.map(i =>
        i.uid === itemUid ? { ...i, equipped: false, heroId: undefined } : i
      );
      return { ...prev, inventory: { ...prev.inventory, items: newItems } };
    });
  }, []);

  // Equip Best for Hero
  const equipBestForHero = useCallback((heroId: string) => {
    setState(prev => {
      const slots: ('weapon' | 'armor' | 'accessory')[] = ['weapon', 'armor', 'accessory'];
      let newItems = [...prev.inventory.items];

      // First, unequip everything from this hero
      newItems = newItems.map(i =>
        i.heroId === heroId ? { ...i, equipped: false, heroId: undefined } : i
      );

      for (const slot of slots) {
        // Get all unequipped items of this slot
        const available = newItems.filter(i => !i.equipped && (() => {
          const def = ITEMS.find(d => d.id === i.defId);
          return def && def.slot === slot;
        })());

        if (available.length === 0) continue;

        // Find the best item for this slot
        // Score = rarity weight * (1 + level * 0.15) * baseStat
        const rarityWeight: Record<string, number> = { common: 1, uncommon: 2, rare: 4, epic: 8, legendary: 16 };

        let bestItem = available[0];
        let bestScore = 0;

        for (const item of available) {
          const def = ITEMS.find(d => d.id === item.defId);
          if (!def) continue;
          const levelMult = 1 + (item.level - 1) * 0.15;
          const rarityW = rarityWeight[def.rarity] || 1;
          const score = rarityW * def.baseStat * levelMult;
          if (score > bestScore) {
            bestScore = score;
            bestItem = item;
          }
        }

        // Equip the best item
        newItems = newItems.map(i =>
          i.uid === bestItem.uid ? { ...i, equipped: true, heroId } : i
        );
      }

      return { ...prev, inventory: { ...prev.inventory, items: newItems } };
    });
  }, []);

  const equipBestForAll = useCallback(() => {
    setState(prev => {
      const slots: ('weapon' | 'armor' | 'accessory')[] = ['weapon', 'armor', 'accessory'];
      let newItems = [...prev.inventory.items];

      // First, unequip everything
      newItems = newItems.map(i => ({ ...i, equipped: false, heroId: undefined }));

      // Get all unlocked heroes
      const unlockedHeroes = prev.heroes.filter(h => h.level > 0);

      for (const hero of unlockedHeroes) {
        for (const slot of slots) {
          const available = newItems.filter(i => !i.equipped && (() => {
            const def = ITEMS.find(d => d.id === i.defId);
            return def && def.slot === slot;
          })());

          if (available.length === 0) continue;

          const rarityWeight: Record<string, number> = { common: 1, uncommon: 2, rare: 4, epic: 8, legendary: 16 };
          let bestItem = available[0];
          let bestScore = 0;

          for (const item of available) {
            const def = ITEMS.find(d => d.id === item.defId);
            if (!def) continue;
            const levelMult = 1 + (item.level - 1) * 0.15;
            const rarityW = rarityWeight[def.rarity] || 1;
            const score = rarityW * def.baseStat * levelMult;
            if (score > bestScore) {
              bestScore = score;
              bestItem = item;
            }
          }

          newItems = newItems.map(i =>
            i.uid === bestItem.uid ? { ...i, equipped: true, heroId: hero.id } : i
          );
        }
      }

      return { ...prev, inventory: { ...prev.inventory, items: newItems } };
    });
  }, []);

  const sellItem = useCallback((itemUid: string) => {
    setState(prev => {
      const item = prev.inventory.items.find(i => i.uid === itemUid);
      if (!item) return prev;
      const def = ITEMS.find(i => i.id === item.defId);
      const sellPrice = def ? Math.floor(itemUpgradeCost(def.rarity, item.level) * 0.5) : 10;
      const newItems = prev.inventory.items.filter(i => i.uid !== itemUid);
      return { ...prev, gold: prev.gold + sellPrice, inventory: { ...prev.inventory, items: newItems } };
    });
  }, []);

  // Pets
  const unlockPet = useCallback((petId: string) => {
    setState(prev => {
      if (prev.pets.find(p => p.id === petId)) return prev;
      return { ...prev, pets: [...prev.pets, { id: petId, level: 1, active: false }] };
    });
  }, []);

  const setActivePet = useCallback((petId: string | null) => {
    setState(prev => ({ ...prev, activePet: petId }));
  }, []);

  const levelUpPet = useCallback((petId: string) => {
    setState(prev => {
      const idx = prev.pets.findIndex(p => p.id === petId);
      if (idx === -1) return prev;
      const pet = prev.pets[idx];
      const cost = PET_LEVEL_COST(pet.level);
      if (prev.gold < cost) return prev;
      const newPets = [...prev.pets];
      newPets[idx] = { ...pet, level: pet.level + 1 };
      return { ...prev, gold: prev.gold - cost, pets: newPets };
    });
  }, []);

  // Skills
  const upgradeSkill = useCallback((skillId: string) => {
    setState(prev => {
      if (prev.skillPoints <= 0) return prev;
      const def = SKILL_DEFS.find(d => d.id === skillId);
      if (!def) return prev;
      const existing = prev.skills.find(s => s.id === skillId);
      const level = existing?.level || 0;
      if (level >= def.maxLevel) return prev;
      if (def.prerequisite) {
        const prereq = prev.skills.find(s => s.id === def.prerequisite);
        if (!prereq || prereq.level === 0) return prev;
      }
      const newSkills = prev.skills.filter(s => s.id !== skillId);
      newSkills.push({ id: skillId, level: level + 1 });
      return { ...prev, skills: newSkills, skillPoints: prev.skillPoints - 1 };
    });
  }, []);

  // Prestige
  const canAscend = state.dungeon.completedDungeons >= 10;
  const ascend = useCallback(() => {
    setState(prev => {
      if (prev.dungeon.completedDungeons < 10) return prev;
      const pointsEarned = prestigePointsForAscension(prev.dungeon.completedDungeons);
      const defaults = getInitialState();
      return {
        ...defaults,
        gold: 0,
        totalGoldEarned: 0,
        mana: 0,
        totalManaEarned: 0,
        heroes: defaults.heroes,
        dungeon: { currentDungeon: 1, currentStage: 1, enemiesDefeated: 0, completedDungeons: 0 },
        manaUpgrades: MANA_UPGRADES.map(u => ({ id: u.id, level: 0 })),
        crit: { ...defaults.crit },
        inventory: { items: [], maxSlots: 20, goldFindBonus: 0, damageBonus: 0, critChanceBonus: 0, critDmgBonus: 0 },
        pets: prev.pets,
        skills: prev.skills,
        skillPoints: prev.skillPoints + pointsEarned,
        prestige: {
          ...prev.prestige,
          points: prev.prestige.points + pointsEarned,
          totalPointsEarned: prev.prestige.totalPointsEarned + pointsEarned,
          ascensions: prev.prestige.ascensions + 1,
          upgrades: prev.prestige.upgrades,
        },
        totalKills: prev.totalKills,
        totalBossKills: prev.totalBossKills,
        highestDungeon: prev.highestDungeon,
        activePet: prev.activePet,
        lastSaveTime: Date.now(),
        gameStartTime: Date.now(),
      };
    });
  }, []);

  const buyPrestigeUpgrade = useCallback((upgradeId: string) => {
    setState(prev => {
      const def = PRESTIGE_DEFS.find(d => d.id === upgradeId);
      if (!def) return prev;
      const existing = prev.prestige.upgrades.find(u => u.id === upgradeId);
      const level = existing?.level || 0;
      if (level >= def.maxLevel) return prev;
      if (prev.prestige.points < def.cost) return prev;
      const newUpgrades = prev.prestige.upgrades.filter(u => u.id !== upgradeId);
      newUpgrades.push({ id: upgradeId, level: level + 1 });
      return {
        ...prev,
        prestige: { ...prev.prestige, points: prev.prestige.points - def.cost, upgrades: newUpgrades },
      };
    });
  }, []);

  // Shop
  const buyShopItem = useCallback((shopItemId: string) => {
    setState(prev => {
      const shopDef = SHOP_ITEMS.find(s => s.id === shopItemId);
      if (!shopDef) return prev;
      if (shopDef.priceType === 'gold' && prev.gold < shopDef.price) return prev;
      if (shopDef.priceType === 'mana' && prev.mana < shopDef.price) return prev;
      if (shopDef.priceType === 'prestige' && prev.prestige.points < shopDef.price) return prev;

      let newState = { ...prev };
      if (shopDef.priceType === 'gold') newState = { ...newState, gold: prev.gold - shopDef.price };
      if (shopDef.priceType === 'mana') newState = { ...newState, mana: prev.mana - shopDef.price };
      if (shopDef.priceType === 'prestige') newState = { ...newState, prestige: { ...prev.prestige, points: prev.prestige.points - shopDef.price } };

      // Apply effect
      const effect = shopDef.effect;
      
      // === MANA ===
      if (effect === 'mana_10') newState = { ...newState, mana: newState.mana + 10 };
      if (effect === 'mana_50') newState = { ...newState, mana: newState.mana + 50 };
      if (effect === 'mana_200') newState = { ...newState, mana: newState.mana + 200 };
      if (effect === 'mana_25') newState = { ...newState, mana: newState.mana + 25 };
      
      // === OURO ===
      if (effect === 'gold_1000') newState = { ...newState, gold: newState.gold + 1000 };
      if (effect === 'gold_5000') newState = { ...newState, gold: newState.gold + 5000 };
      
      // === SKILL POINTS ===
      if (effect === 'skill_point') newState = { ...newState, skillPoints: newState.skillPoints + 1 };
      
      // === SLOTS DE INVENTÁRIO ===
      if (effect === 'inv_slot_5') newState = { ...newState, inventory: { ...newState.inventory, maxSlots: newState.inventory.maxSlots + 5 } };
      if (effect === 'inv_slot_10') newState = { ...newState, inventory: { ...newState.inventory, maxSlots: newState.inventory.maxSlots + 10 } };
      if (effect === 'inv_slot_15') newState = { ...newState, inventory: { ...newState.inventory, maxSlots: newState.inventory.maxSlots + 15 } };
      if (effect === 'inv_slot_20') newState = { ...newState, inventory: { ...newState.inventory, maxSlots: newState.inventory.maxSlots + 20 } };
      
      // === CONSUMÁVEIS ===
      if (effect === 'heal_all') {
        newState = { ...newState, heroes: newState.heroes.map(h => {
          if (h.level === 0) return h;
          const def = HERO_DEFS.find(d => d.id === h.id)!;
          const maxHp = def.baseHp * (1 + (h.level - 1) * 0.15);
          return { ...h, hp: maxHp * 0.5, maxHp, isDead: false, reviveTimer: 0 };
        })};
      }
      if (effect === 'revive_all') {
        newState = { ...newState, heroes: newState.heroes.map(h => {
          if (h.isDead) {
            const def = HERO_DEFS.find(d => d.id === h.id)!;
            const maxHp = def.baseHp * (1 + (h.level - 1) * 0.15);
            return { ...h, hp: maxHp, maxHp, isDead: false, reviveTimer: 0 };
          }
          return h;
        })};
      }
      if (effect === 'mega_heal') {
        newState = { ...newState, heroes: newState.heroes.map(h => {
          if (h.level === 0) return h;
          const def = HERO_DEFS.find(d => d.id === h.id)!;
          const maxHp = def.baseHp * (1 + (h.level - 1) * 0.15);
          return { ...h, hp: maxHp, maxHp, isDead: false, reviveTimer: 0 };
        })};
      }
      
      // === HERO LEVEL PACK ===
      if (effect === 'hero_level_pack') {
        newState = { ...newState, heroes: newState.heroes.map(h => {
          if (h.level === 0) return h;
          return { ...h, level: h.level + 5 };
        })};
      }
      
      // === GOLD 10x CURRENT ===
      if (effect === 'gold_10x_current') {
        const currentGoldEarned = Math.floor(newState.totalGoldEarned * 0.01) * 10;
        newState = { ...newState, gold: newState.gold + Math.max(currentGoldEarned, 1000) };
      }

      return newState;
    });
  }, []);

  const healAllHeroes = useCallback(() => {
    setState(prev => ({
      ...prev,
      heroes: prev.heroes.map(h => {
        if (h.level === 0) return h;
        const def = HERO_DEFS.find(d => d.id === h.id)!;
        const maxHp = def.baseHp * (1 + (h.level - 1) * 0.15);
        return { ...h, hp: maxHp, maxHp, isDead: false, reviveTimer: 0 };
      }),
    }));
  }, []);

  // Daily Rewards
  const claimDailyReward = useCallback(() => {
    setState(prev => {
      const today = getTodayString();
      if (prev.dailyRewards.lastClaimDate === today) return prev;

      const newDailyRewards = claimDailyReward(prev.dailyRewards);
      const dayIndex = newDailyRewards.lastRewardIndex;
      const reward = DAILY_REWARDS[dayIndex];

      let gold = prev.gold;
      let mana = prev.mana;
      let skillPoints = prev.skillPoints;
      let totalGoldEarned = prev.totalGoldEarned;
      let totalManaEarned = prev.totalManaEarned;

      const newLogs: CombatLogEntry[] = [];
      const log = (text: string, type: CombatLogEntry['type']) => {
        newLogs.push({ id: nextLogId++, text, type, timestamp: Date.now() });
      };

      // Apply base reward
      switch (reward.type) {
        case 'gold':
          gold += reward.amount;
          totalGoldEarned += reward.amount;
          log(`🎁 Recompensa diária: +${reward.amount} 🪙 ouro`, 'gold');
          break;
        case 'mana':
          mana += reward.amount;
          totalManaEarned += reward.amount;
          log(`🎁 Recompensa diária: +${reward.amount} 💎 mana`, 'mana');
          break;
        case 'skillPoints':
          skillPoints += reward.amount;
          log(`🎁 Recompensa diária: +${reward.amount} ⭐ pontos de habilidade`, 'upgrade');
          break;
      }

      // Check for streak milestone
      const milestone = getStreakMilestone(newDailyRewards.currentStreak);
      if (milestone) {
        switch (milestone.reward.type) {
          case 'gold':
            gold += milestone.reward.amount;
            totalGoldEarned += milestone.reward.amount;
            log(`🏆 ${milestone.reward.name}: +${milestone.reward.amount} 🪙 ouro`, 'gold');
            break;
          case 'mana':
            mana += milestone.reward.amount;
            totalManaEarned += milestone.reward.amount;
            log(`🏆 ${milestone.reward.name}: +${milestone.reward.amount} 💎 mana`, 'mana');
            break;
          case 'skillPoints':
            skillPoints += milestone.reward.amount;
            log(`🏆 ${milestone.reward.name}: +${milestone.reward.amount} ⭐ pontos de habilidade`, 'upgrade');
            break;
        }
      }

      log(`🔥 Sequência: ${newDailyRewards.currentStreak} dias!`, 'achievement');

      return {
        ...prev,
        gold,
        mana,
        skillPoints,
        totalGoldEarned,
        totalManaEarned,
        dailyRewards: newDailyRewards,
        combatLog: [...newLogs, ...prev.combatLog].slice(0, LOG_MAX),
      };
    });
  }, []);

  // ========== ACTIVE SKILLS ==========
  const activateSkill = useCallback((skillId: string) => {
    setState(prev => {
      const skillDef = ACTIVE_SKILLS.find(s => s.id === skillId);
      if (!skillDef) return prev;

      // Find the hero
      const hero = prev.heroes.find(h => h.id === skillDef.heroId);
      if (!hero || hero.level === 0 || hero.isDead) return prev;

      // Check unlock level
      if (!canUnlockSkill(skillDef.heroId, hero.level, skillId)) return prev;

      // Check cooldown
      const existingSkill = prev.activeSkills.find(s => s.id === skillId);
      if (existingSkill && (existingSkill.cooldownRemaining > 0 || existingSkill.isActive)) return prev;

      // Apply skill effect
      let newHeroes = [...prev.heroes];
      let newCurrentEnemy = { ...prev.currentEnemy };
      const newLogs: CombatLogEntry[] = [];

      const log = (text: string, type: CombatLogEntry['type']) => {
        newLogs.push({ id: nextLogId++, text, type, timestamp: Date.now() });
      };

      // Get scaled effect value based on hero level
      const scaledEffect = getScaledEffect(skillDef, hero.level);

      switch (skillDef.effect) {
        case 'damage_boost': {
          // Instant high damage to current enemy (scaled by level)
          const heroDef = HERO_DEFS.find(d => d.id === skillDef.heroId)!;
          const baseDmg = heroDamage(heroDef.baseDmg, hero.level, 1, getEvolutionMultiplier(hero.evolutionLevel || 0));
          const skillDmg = Math.floor(baseDmg * (scaledEffect / 100));
          const newHp = Math.max(0, newCurrentEnemy.hp - skillDmg);
          newCurrentEnemy = { ...newCurrentEnemy, hp: newHp };
          log(`⚔️ ${skillDef.name}: ${skillDmg.toLocaleString()} de dano!`, 'damage');
          break;
        }
        case 'heal_all': {
          const healPct = scaledEffect / 100;
          newHeroes = newHeroes.map(h => {
            if (h.level === 0 || h.isDead) return h;
            const def = HERO_DEFS.find(d => d.id === h.id)!;
            const maxHp = def.baseHp * (1 + (h.level - 1) * 0.15);
            const healAmount = Math.floor(maxHp * healPct);
            const newHp = Math.min(h.hp + healAmount, maxHp);
            return { ...h, hp: newHp, maxHp, isDead: false, reviveTimer: 0 };
          });
          log(`💚 ${skillDef.name}: Todos os heróis curados em ${Math.floor(scaledEffect)}%!`, 'upgrade');
          break;
        }
        case 'aoe_damage': {
          const heroDef = HERO_DEFS.find(d => d.id === skillDef.heroId)!;
          const baseDmg = heroDamage(heroDef.baseDmg, hero.level, 1, getEvolutionMultiplier(hero.evolutionLevel || 0));
          const skillDmg = Math.floor(baseDmg * (scaledEffect / 100));
          const newHp = Math.max(0, newCurrentEnemy.hp - skillDmg);
          newCurrentEnemy = { ...newCurrentEnemy, hp: newHp };
          log(`💥 ${skillDef.name}: ${skillDmg.toLocaleString()} de dano em área!`, 'damage');
          break;
        }
        case 'shield': {
          log(`🛡️ ${skillDef.name}: ${skillDef.duration}s de proteção (${Math.floor(scaledEffect)}% absorção)!`, 'upgrade');
          break;
        }
        case 'crit_boost': {
          log(`🎯 ${skillDef.name}: +${Math.floor(scaledEffect)}% crítico por ${skillDef.duration}s!`, 'upgrade');
          break;
        }
        case 'speed_boost': {
          log(`⚡ ${skillDef.name}: +${Math.floor(scaledEffect)}% velocidade por ${skillDef.duration}s!`, 'upgrade');
          break;
        }
        case 'dot': {
          const heroDef = HERO_DEFS.find(d => d.id === skillDef.heroId)!;
          const baseDmg = heroDamage(heroDef.baseDmg, hero.level, 1, getEvolutionMultiplier(hero.evolutionLevel || 0));
          const tickDmg = Math.floor(baseDmg * (scaledEffect / 100));
          // Apply initial damage
          const newHp = Math.max(0, newCurrentEnemy.hp - tickDmg);
          newCurrentEnemy = { ...newCurrentEnemy, hp: newHp };
          log(`🔥 ${skillDef.name}: ${tickDmg.toLocaleString()} de dano por tick!`, 'damage');
          break;
        }
        case 'stun': {
          log(`⚡ ${skillDef.name}: Inimigo atordoado por ${skillDef.duration}s!`, 'upgrade');
          break;
        }
      }

      // Update skill state
      const newActiveSkills = prev.activeSkills.filter(s => s.id !== skillId);
      newActiveSkills.push({
        id: skillId,
        cooldownRemaining: skillDef.cooldown,
        isActive: skillDef.duration > 0,
        activeUntil: skillDef.duration > 0 ? Date.now() + skillDef.duration * 1000 : 0,
      });

      // Play skill sound
      playSkillSound(skillId);

      return {
        ...prev,
        heroes: newHeroes,
        currentEnemy: newCurrentEnemy,
        activeSkills: newActiveSkills,
        combatLog: [...newLogs, ...prev.combatLog].slice(0, LOG_MAX),
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    localStorage.removeItem(SAVE_KEY);
    setState(getInitialState());
  }, []);

  const togglePause = useCallback(() => setIsPaused(p => !p), []);
  const manualSave = useCallback(() => saveGame(stateRef.current), []);    return {
    state, dps, isPaused, enemyName,
    upgradeHero, bulkUpgradeHero, evolveHero, buyManaUpgrade, resetGame, togglePause, manualSave,
    equipItem, unequipItem, sellItem, healAllHeroes, equipBestForHero, equipBestForAll,
    unlockPet, setActivePet, levelUpPet,
    upgradeSkill,
    ascend, buyPrestigeUpgrade,
    buyShopItem,
    activateSkill,
    claimDailyReward,
    getManaMult, getGoldMult,
    getEnemyDisplayName: () => getEnemyName(state.dungeon.currentDungeon, state.dungeon.currentStage, state.dungeon.currentStage === 10),
    getDungeonName: () => getDungeonFullName(state.dungeon.currentDungeon),
    getThemeInfo: () => getTheme(state.dungeon.currentDungeon),
    HERO_DEFS, MANA_UPGRADES,
  };
}
