import React, { useEffect, useState } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { useSocket } from './hooks/useSocket';
import { useAuth } from './hooks/useAuth';
import { useSave } from './hooks/useSave';
import { AuthPanel } from './components/AuthPanel';
import { ChatPanel } from './components/ChatPanel';
import { SaveConflictModal } from './components/SaveConflictModal';
import { BattleScreen } from './components/BattleScreen';
import { CombatLog } from './components/CombatLog';
import { HeroGallery } from './components/HeroGallery';
import { InventoryPanel } from './components/InventoryPanel';
import { PetPanel } from './components/PetPanel';
import { SkillTreePanel } from './components/SkillTreePanel';
import { PrestigePanel } from './components/PrestigePanel';
import { ShopPanel } from './components/ShopPanel';
import { DailyChallengePanel } from './components/DailyChallengePanel';
import { StatsPanel } from './components/StatsPanel';
import { NewsGuidePanel } from './components/NewsGuidePanel';
import { AchievementPanel } from './components/AchievementPanel';
import { AchievementNotification } from './components/AchievementNotification';
import { DailyRewardPanel } from './components/DailyRewardPanel';
import { HeroSprite } from './components/HeroSprite';
import { ActiveSkillBar } from './components/ActiveSkillBar';
import { HeroProfile } from './components/HeroProfile';
import { heroUpgradeCost, heroDamage, formatNumber } from './utils/formatters';
import { toggleMute, getMuted } from './utils/sounds';
import { calculatePowerLevel, formatPowerLevel, getPowerRank } from './utils/powerLevel';
import { MANA_UPGRADES } from './data/gameData';
import { ACHIEVEMENT_DEFS } from './data/achievements';
import { CHANGELOG } from './data/newsGuide';
import { getCurrentTier } from './data/evolutions';
import { getEvolutionMultiplier } from './utils/formatters';

type SideTab = 'heroes' | 'inventory' | 'pets' | 'skills' | 'prestige' | 'shop' | 'stats';

export default function App() {
  // Auth system
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  
  // Guest mode state
  const [isGuest, setIsGuest] = useState(false);
  
  // Save system
  const {
    hasLocalSave, hasCloudSave, lastSaveTime,
    saveToLocal, loadFromLocal, saveToCloud, loadFromCloud,
    showSaveConflict, localSaveInfo, cloudSaveInfo, resolveConflict,
    deleteLocalSave, deleteCloudSave,
  } = useSave(isAuthenticated ? user?.id?.toString() || null : null, isAuthenticated);

  const {
    state, dps, isPaused,
    upgradeHero, bulkUpgradeHero, evolveHero, buyManaUpgrade, resetGame, togglePause, manualSave,
    equipItem, unequipItem, sellItem, healAllHeroes, equipBestForHero, equipBestForAll,
    unlockPet, setActivePet, levelUpPet,
    upgradeSkill,
    ascend, buyPrestigeUpgrade,
    buyShopItem,
    activateSkill,
    claimDailyReward,
    getManaMult, getGoldMult,
    getEnemyDisplayName, getDungeonName,
    HERO_DEFS,
  } = useGameEngine();

  const manaMult = getManaMult();
  const goldMult = getGoldMult();

  const [showGallery, setShowGallery] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showDailyRewards, setShowDailyRewards] = useState(false);
  const [newAchievement, setNewAchievement] = useState<typeof ACHIEVEMENT_DEFS[0] | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showNewsGuide, setShowNewsGuide] = useState(false);
  const [sideTab, setSideTab] = useState<SideTab>('heroes');
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [readUpdates, setReadUpdates] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('dic_read_updates');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  // Online nickname
  const [nickname, setNickname] = useState(() => {
    try {
      return localStorage.getItem('dic_nickname') || `Herói${Math.floor(Math.random() * 999)}`;
    } catch { return `Herói${Math.floor(Math.random() * 999)}`; }
  });
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [tempNickname, setTempNickname] = useState(nickname);

  // Socket connection
  const { isConnected, onlinePlayers, chatMessages, sendMessage, updateProgress } = useSocket(user?.nickname || nickname);

  // Calculate power level
  const powerLevel = calculatePowerLevel(state);
  const formattedPower = formatPowerLevel(powerLevel);
  const powerRank = getPowerRank(powerLevel);

  // Count unread updates
  const unreadCount = CHANGELOG.filter(u => !readUpdates.has(u.id)).length;

  // Mark updates as read when opening news guide
  const handleOpenNewsGuide = () => {
    const allIds = new Set(CHANGELOG.map(u => u.id));
    setReadUpdates(allIds);
    try {
      localStorage.setItem('dic_read_updates', JSON.stringify([...allIds]));
    } catch { /* ignore */ }
    setShowNewsGuide(true);
  };

  // Update server with progress every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateProgress({
        dungeon: state.dungeon.currentDungeon,
        stage: state.dungeon.currentStage,
        dps,
        totalKills: state.totalKills,
        powerLevel,
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [state.dungeon.currentDungeon, state.dungeon.currentStage, dps, state.totalKills, powerLevel, updateProgress]);

  // Save nickname to localStorage
  const handleSaveNickname = () => {
    if (tempNickname.trim()) {
      setNickname(tempNickname.trim());
      localStorage.setItem('dic_nickname', tempNickname.trim());
      setShowNicknameModal(false);
    }
  };

  // Auto-save (local for guests, cloud for logged in users)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        saveToCloud(state, powerLevel);
      }
      saveToLocal(state, powerLevel);
    }, 30000); // Save every 30 seconds
    return () => clearInterval(interval);
  }, [isAuthenticated, state, powerLevel, saveToCloud, saveToLocal]);

  // Load game on mount - check for conflicts
  useEffect(() => {
    const handleInitialLoad = async () => {
      const localSave = loadFromLocal();
      
      if (isAuthenticated) {
        const cloudSave = await loadFromCloud();
        
        if (localSave && cloudSave && localSave.gold !== undefined && cloudSave.gold !== undefined) {
          // Both saves exist - show conflict resolution
          // For now, prefer the one with higher power level or more recent
          const localTime = localSave.lastSaveTime || 0;
          const cloudTime = (cloudSave as any).lastSaveTime || 0;
          
          if (Math.abs(localTime - cloudTime) > 60000) { // More than 1 minute difference
            // TODO: Show SaveConflictModal
            // For now, use cloud save if it's more recent
            if (cloudTime > localTime) {
              console.log('Using cloud save (more recent)');
            } else {
              console.log('Using local save (more recent)');
            }
          }
        } else if (cloudSave && cloudSave.gold !== undefined) {
          console.log('Loading cloud save...');
        }
      }
    };
    
    handleInitialLoad();
  }, [isAuthenticated]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't handle keyboard shortcuts when typing in any input
      const activeElement = document.activeElement;
      const isTyping = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA';
      
      if (isTyping) return; // Don't handle any shortcuts while typing
      
      // Pause only with P key (not space - too easy to trigger accidentally)
      if (e.key === 'p' || e.key === 'P') { e.preventDefault(); togglePause(); }
      if (e.key === 'Escape' && showGallery) setShowGallery(false);
      if (e.key === 'Escape' && showNewsGuide) setShowNewsGuide(false);
      if (e.key === 'Escape' && showAchievements) setShowAchievements(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [togglePause, showGallery, showNewsGuide, showAchievements]);

  const sideTabs: { id: SideTab; icon: string }[] = [
    { id: 'heroes', icon: '⚔️' },
    { id: 'inventory', icon: '📦' },
    { id: 'pets', icon: '🐾' },
    { id: 'skills', icon: '⭐' },
    { id: 'prestige', icon: '🔄' },
    { id: 'shop', icon: '🏪' },
    { id: 'stats', icon: '📊' },
  ];

  // Show auth panel if not logged in and not guest
  if (!isAuthenticated && !isGuest && !isLoading) {
    return (
      <AuthPanel
        onLogin={login}
        onGuestPlay={() => {
          const guestName = `Herói${Math.floor(Math.random() * 999)}`;
          setNickname(guestName);
          setIsGuest(true);
        }}
      />
    );
  }

  // Show loading while checking auth
  if (isLoading && !isGuest) {
    return (
      <div className="h-dvh flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.9)' }}>
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">🏰</div>
          <div className="text-white/60 text-sm">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(6,6,11,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="w-full mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 relative">
            {/* Power Level */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="text-xs font-bold" style={{ color: powerRank.color }}>
                [{powerRank.rank}]
              </span>
              <span className="text-sm font-black" style={{ color: formattedPower.color }}>
                {formattedPower.value}{formattedPower.suffix}
              </span>
              <span className="text-[9px] text-white/50">PL</span>
            </div>
            {/* Castle smoke particles */}
            <div className="absolute -top-3 left-5 pointer-events-none overflow-visible" style={{ width: '20px', height: '16px' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="castle-smoke" style={{ animationDelay: `${i * 0.8}s`, left: `${4 + (i % 3) * 6}px` }} />
              ))}
            </div>
            <div className="relative">
              <div className="castle-hover-ring absolute -inset-2 rounded-xl transition-all duration-300 opacity-0" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)', border: '1px solid rgba(167,139,250,0.2)', transform: 'scale(0.8)' }} />
              <img src="/sprites/castle.png" alt="" className="castle-idle" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight" style={{ background: 'linear-gradient(135deg, #a78bfa, #fbbf24, #f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Dungeon Idle Conquest
              </h1>
              <div className="text-[10px] text-[#475569] -mt-0.5 font-medium">
                {getDungeonName()} · Etapa {state.dungeon.currentStage}/10
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handleOpenNewsGuide} className="btn-ghost text-[11px] px-3 py-1.5 relative">
              📰 Novidades
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full text-[9px] font-black flex items-center justify-center animate-pulse" style={{ background: 'linear-gradient(135deg, #f87171, #ef4444)', color: 'white', boxShadow: '0 0 8px rgba(248,113,113,0.5)' }}>
                  {unreadCount}
                </span>
              )}
            </button>
            <button onClick={() => setShowDailyRewards(true)} className="btn-ghost text-[11px] px-3 py-1.5">
              🎁 Diário
            </button>
            <button onClick={() => setShowAchievements(true)} className="btn-ghost text-[11px] px-3 py-1.5">
              🏆 Conquistas
            </button>
            <button onClick={() => setShowGallery(true)} className="btn-primary text-[11px] px-3 py-1.5">
              ⚔️ Heróis
            </button>
            {state.skillPoints > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' }}>
                ⭐ {state.skillPoints}
              </span>
            )}
            <button onClick={togglePause} className="btn-ghost text-[11px] px-3 py-1.5">
              {isPaused ? '▶️ Play' : '⏸️ Pausar'}
            </button>
            <button onClick={() => { const newMuted = toggleMute(); setIsMuted(newMuted); }} className="btn-ghost text-[11px] px-2.5 py-1.5">
              {isMuted ? '🔇' : '🔊'}
            </button>
            <button onClick={manualSave} className="btn-ghost text-[11px] px-2.5 py-1.5">💾</button>
            <button onClick={() => { setTempNickname(user?.nickname || nickname); setShowNicknameModal(true); }} className="btn-ghost text-[11px] px-2.5 py-1.5 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              {user?.nickname || nickname}
              {isAuthenticated && <span className="text-[9px] text-purple-400">☁️</span>}
            </button>
            {isAuthenticated && (
              <button onClick={() => { if (confirm('Tem certeza que deseja sair?')) logout(); }} className="btn-ghost text-[11px] px-2.5 py-1.5">
                🚪
              </button>
            )}
            <button onClick={() => { if (confirm('Resetar todo o progresso?')) resetGame(); }} className="btn-danger text-[11px] px-2.5 py-1.5">🔄</button>
          </div>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main className="flex-1 w-full px-4 sm:px-6 py-4 space-y-4 overflow-y-auto scrollbar-thin">

        {/* Pause overlay */}
        {isPaused && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
            <div className="text-center animate-fade-in">
              <div className="text-5xl mb-4">⏸️</div>
              <div className="text-2xl font-black text-[#a78bfa]">PAUSADO</div>
              <div className="text-xs text-[#475569] mt-2">Espaço ou clique Play</div>
            </div>
          </div>
        )}

        {/* ===== RESOURCE BAR ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="resource-card gold">
            <div className="resource-icon">🪙</div>
            <div>
              <div className="resource-value">{formatNumber(state.gold)}</div>
              <div className="resource-label">Ouro</div>
            </div>
          </div>
          <div className="resource-card mana">
            <div className="resource-icon">💎</div>
            <div>
              <div className="resource-value">{formatNumber(state.mana)}</div>
              <div className="resource-label">Mana</div>
            </div>
          </div>
          <div className="resource-card dps">
            <div className="resource-icon">⚔️</div>
            <div>
              <div className="resource-value">{formatNumber(dps)}</div>
              <div className="resource-label">DPS</div>
            </div>
          </div>
          <div className="resource-card" style={{ '--card-accent': '#22d3ee' } as any}>
            <div className="resource-icon" style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}>📊</div>
            <div>
              <div className="resource-value" style={{ color: '#22d3ee' }}>×{manaMult.toFixed(1)}</div>
              <div className="resource-label">Mult</div>
            </div>
          </div>
        </div>

        {/* ===== 3-COLUMN LAYOUT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* LEFT: Side panels */}
          <div className="lg:col-span-3 order-2 lg:order-1 space-y-4">
            <div className="tab-bar">
              {sideTabs.map(t => (
                <button key={t.id} onClick={() => setSideTab(t.id)} className={`tab-item ${sideTab === t.id ? 'active' : ''}`} title={t.id}>
                  {t.icon}
                </button>
              ))}
            </div>

            <div className="animate-fade-in">
              {sideTab === 'heroes' && (
                <div className="glass-card-static p-4 space-y-2">
                  <div className="section-header">
                    <div className="section-title">⚔️ Heróis</div>
                  </div>
                  {HERO_DEFS.map(def => {
                    const hero = state.heroes.find(h => h.id === def.id);
                    const level = hero?.level || 0;
                    const isUnlocked = state.totalGoldEarned >= def.unlockThreshold;
                    const cost = heroUpgradeCost(def.baseCost, level);
                    const evoLevel = hero?.evolutionLevel || 0;
                    const tier = getCurrentTier(def.id, evoLevel);
                    const dmg = level > 0 ? heroDamage(def.baseDmg, level, manaMult, getEvolutionMultiplier(evoLevel)) : 0;
                    const canAfford = state.gold >= cost;

                    return (
                      <div key={def.id} className={`hero-item ${level > 0 ? 'active' : ''} ${!isUnlocked ? 'opacity-40' : ''} cursor-pointer`} onClick={() => isUnlocked && level > 0 && setSelectedHeroId(def.id)}>
                        <div className="hero-sprite-container" style={{ background: isUnlocked ? `${def.color}12` : '#1a1a2e', border: `1px solid ${isUnlocked ? def.color + '25' : '#222'}` }}>
                          {isUnlocked ? <HeroSprite heroId={def.id} size={36} animate={level > 0} /> : <span className="text-lg opacity-30">🔒</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold" style={{ color: tier.glowColor || '#f1f5f9' }}>{tier.icon} {tier.name}</span>
                            {level > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(148,163,184,0.1)', color: '#94a3b8' }}>Lv.{level}</span>}
                          </div>
                          {isUnlocked ? (
                            <div className="text-[10px] text-[#475569]">
                              {level > 0 ? <><span className="text-[#f87171]">{formatNumber(dmg)}</span>/s</> : <span>Dano: {formatNumber(def.baseDmg)}</span>}
                            </div>
                          ) : (
                            <div className="text-[9px] text-[#334155]">🔒 {formatNumber(def.unlockThreshold)} 🪙</div>
                          )}
                        </div>
                        {isUnlocked && level > 0 ? (
                          <div className="flex gap-1">
                            <button onClick={(e) => { e.stopPropagation(); upgradeHero(def.id); }} disabled={!canAfford} className="btn-amber text-[9px] px-2 py-1 whitespace-nowrap">
                              +1
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); bulkUpgradeHero(def.id, 'max'); }} disabled={!canAfford} className="btn-primary text-[9px] px-2 py-1 whitespace-nowrap">
                              MAX
                            </button>
                          </div>
                        ) : isUnlocked ? (
                          <button onClick={(e) => { e.stopPropagation(); upgradeHero(def.id); }} disabled={!canAfford} className="btn-amber text-[10px] px-2.5 py-1 whitespace-nowrap">
                            +1 · 🪙{formatNumber(cost)}
                          </button>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
              {sideTab === 'inventory' && <InventoryPanel items={state.inventory.items} maxSlots={state.inventory.maxSlots} gold={state.gold} heroes={state.heroes} heroDefs={HERO_DEFS} onEquip={equipItem} onUnequip={unequipItem} onSell={sellItem} onEquipBestAll={equipBestForAll} />}
              {sideTab === 'pets' && <PetPanel pets={state.pets} activePet={state.activePet} totalKills={state.totalKills} highestDungeon={state.highestDungeon} totalGoldEarned={state.totalGoldEarned} mana={state.mana} inventoryItemCount={state.inventory.items.length} gold={state.gold} onUnlock={unlockPet} onSetActive={setActivePet} onLevelUp={levelUpPet} />}
              {sideTab === 'skills' && <SkillTreePanel skills={state.skills} skillPoints={state.skillPoints} onUpgrade={upgradeSkill} />}
              {sideTab === 'prestige' && <PrestigePanel prestige={state.prestige} completedDungeons={state.dungeon.completedDungeons} onAscend={ascend} onBuyUpgrade={buyPrestigeUpgrade} />}
              {sideTab === 'shop' && <ShopPanel gold={state.gold} mana={state.mana} prestigePoints={state.prestige.points} onBuy={buyShopItem} />}
              {sideTab === 'stats' && <StatsPanel totalKills={state.totalKills} totalBossKills={state.totalBossKills} totalGoldEarned={state.totalGoldEarned} totalManaEarned={state.totalManaEarned} highestDungeon={state.highestDungeon} completedDungeons={state.dungeon.completedDungeons} critTotal={state.crit.totalCrits} ascensions={state.prestige.ascensions} skillPoints={state.skillPoints} />}
            </div>
          </div>

          {/* CENTER: Battle */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <BattleScreen dungeonNumber={state.dungeon.currentDungeon} stage={state.dungeon.currentStage} completedStages={state.dungeon.enemiesDefeated} enemyHp={state.currentEnemy.hp} enemyMaxHp={state.currentEnemy.maxHp} enemyName={getEnemyDisplayName()} floatingNumbers={state.floatingNumbers} heroes={state.heroes} />
          </div>

          {/* RIGHT: Upgrades + Log + Daily */}
          <div className="lg:col-span-4 order-3 space-y-4">
            {/* Mana Upgrades */}
            <div className="glass-card-static p-4">
              <div className="section-header">
                <div className="section-title">💎 Upgrades de Mana</div>
                <div className="section-badge" style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa' }}>Permanentes</div>
              </div>
              <div className="space-y-2">
                {MANA_UPGRADES.map(def => {
                  const stateUpg = state.manaUpgrades.find(u => u.id === def.id);
                  const level = stateUpg?.level || 0;
                  const cost = Math.floor(def.baseCost * Math.pow(def.costScale, level));
                  const canBuy = state.mana >= cost;

                  return (
                    <div key={def.id} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: 'rgba(167,139,250,0.04)', border: '1px solid rgba(167,139,250,0.08)' }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.15)' }}>
                        {def.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold text-[#f1f5f9]">{def.name}</span>
                          {level > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa' }}>Lv.{level}</span>}
                        </div>
                        <div className="text-[10px] text-[#64748b]">{level > 0 ? def.effectLabel(level) : def.description}</div>
                      </div>
                      <button onClick={() => buyManaUpgrade(def.id)} disabled={!canBuy} className="btn-primary text-[10px] px-2.5 py-1 whitespace-nowrap">
                        +1 · 💎{formatNumber(cost)}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <DailyChallengePanel challenge={state.dailyChallenge} />
            <CombatLog log={state.combatLog} />
          </div>
        </div>

        {/* Dungeon Progress */}
        <div className="glass-card-static p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-[#64748b] font-medium">Progresso da Dungeon</span>
            <span className="text-[11px] text-[#475569]">{state.dungeon.completedDungeons} completadas · 🏔️ #{state.highestDungeon}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(state.dungeon.enemiesDefeated / 10) * 100}%`, background: 'linear-gradient(90deg, #a78bfa, #fbbf24, #f87171)' }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[9px] text-[#334155]">Stage 1</span>
            <span className="text-[9px] text-[#334155]">Boss</span>
          </div>
        </div>

        {/* Active Skills Bar */}
        <ActiveSkillBar
          heroes={state.heroes}
          activeSkills={state.activeSkills}
          onActivateSkill={activateSkill}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-4 text-center text-[10px] text-[#334155]">
        Dungeon Idle Conquest · Auto-save · P para pausar
      </footer>

      {showGallery && (
        <HeroGallery heroes={state.heroes} gold={state.gold} totalGoldEarned={state.totalGoldEarned} manaMult={manaMult} heroDefs={HERO_DEFS} onUpgrade={upgradeHero} onClose={() => setShowGallery(false)} />
      )}

      {showNewsGuide && (
        <NewsGuidePanel onClose={() => setShowNewsGuide(false)} />
      )}

      {showDailyRewards && (
        <DailyRewardPanel
          dailyRewards={state.dailyRewards}
          onClaim={claimDailyReward}
          onClose={() => setShowDailyRewards(false)}
        />
      )}

      {showAchievements && (
        <AchievementPanel
          achievements={state.achievements}
          gameState={{
            totalKills: state.totalKills,
            totalBossKills: state.totalBossKills,
            completedDungeons: state.dungeon.completedDungeons,
            highestDungeon: state.highestDungeon,
            totalGoldEarned: state.totalGoldEarned,
            totalManaEarned: state.totalManaEarned,
            heroes: state.heroes,
            inventory: state.inventory,
            crit: state.crit,
            prestige: state.prestige,
            skillPoints: state.skillPoints,
          }}
          onClose={() => setShowAchievements(false)}
        />
      )}

      <AchievementNotification
        achievement={newAchievement}
        onDismiss={() => setNewAchievement(null)}
      />

      {selectedHeroId && (() => {
        const hero = state.heroes.find(h => h.id === selectedHeroId);
        const heroDef = HERO_DEFS.find(d => d.id === selectedHeroId);
        if (!hero || !heroDef) return null;
        return (
          <HeroProfile
            hero={hero}
            heroDef={heroDef}
            gold={state.gold}
            manaMult={manaMult}
            totalGoldEarned={state.totalGoldEarned}
            inventory={state.inventory.items}
            pets={state.pets}
            activePet={state.activePet}
            skills={state.skills}
            skillPoints={state.skillPoints}
            onUpgrade={upgradeHero}
            onBulkUpgrade={bulkUpgradeHero}
            onEquip={equipItem}
            onUnequip={unequipItem}
            onSetPet={setActivePet}
            onUpgradeSkill={upgradeSkill}
            onEquipBest={equipBestForHero}
            onEvolve={evolveHero}
            onClose={() => setSelectedHeroId(null)}
          />
        );
      })()}

      {/* Chat em tempo real */}
      <ChatPanel
        isConnected={isConnected}
        onlinePlayers={onlinePlayers}
        chatMessages={chatMessages}
        onSendMessage={sendMessage}
        currentPlayerId={''}
      />

      {/* Save Conflict Modal */}
      {showSaveConflict && (
        <SaveConflictModal
          localSave={localSaveInfo}
          cloudSave={cloudSaveInfo}
          onResolve={resolveConflict}
        />
      )}

      {/* Modal de nickname */}
      {showNicknameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <div className="glass-card p-6 w-80 animate-fade-in">
            <h3 className="text-lg font-bold text-white mb-4">🎮 Escolha seu nome!</h3>
            <input
              type="text"
              value={tempNickname}
              onChange={(e) => setTempNickname(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 outline-none mb-4"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
              placeholder="Seu nome..."
              maxLength={20}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowNicknameModal(false)}
                className="flex-1 px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveNickname}
                className="flex-1 px-4 py-2 rounded-xl text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
