import React, { useState, useEffect, useRef } from 'react';
import { DUNGEON_THEMES, HERO_DEFS } from '../data/gameData';
import { FloatingNumber } from '../types';
import { BossSprite, HeroSprite } from './HeroSprite';
import { MonsterSprite } from './MonsterSprite';
import { useScreenShake, useParticles, ScreenShakeWrapper, ParticleRenderer, HitFlash, spawnGoldBurst, spawnManaBurst, spawnHitImpact, spawnSoulExplosion } from './BattleEffects';
import { formatNumber } from '../utils/formatters';

interface Props {
  dungeonNumber: number;
  stage: number;
  completedStages: number;
  enemyHp: number;
  enemyMaxHp: number;
  enemyName: string;
  floatingNumbers: FloatingNumber[];
  heroes: { id: string; level: number; hp: number; maxHp: number; isDead: boolean; reviveTimer: number }[];
}

function getTheme(dn: number) { return DUNGEON_THEMES[((dn - 1) % 8)]; }

function getThemeBg(name: string): string {
  const bgs: Record<string, string> = {
    'Trevas': 'linear-gradient(180deg, #0a0015 0%, #1a0a2e 40%, #0d0d1a 100%)',
    'Vulcânica': 'linear-gradient(180deg, #1a0500 0%, #2a0a00 40%, #0d0500 100%)',
    'Glacial': 'linear-gradient(180deg, #001a2e 0%, #0a1a3a 40%, #051020 100%)',
    'Abismo': 'linear-gradient(180deg, #000a1a 0%, #001020 40%, #000510 100%)',
    'Celestial': 'linear-gradient(180deg, #0a0a2e 0%, #1a1040 40%, #0a0520 100%)',
    'Cripta': 'linear-gradient(180deg, #050a05 0%, #0a150a 40%, #050a08 100%)',
    'Infernal': 'linear-gradient(180deg, #1a0500 0%, #2a0800 40%, #100300 100%)',
    'Dimensional': 'linear-gradient(180deg, #0a0020 0%, #150030 40%, #080015 100%)',
  };
  return bgs[name] || 'linear-gradient(180deg, #06060b 0%, #0c0c14 100%)';
}

export function BattleScreen({ dungeonNumber, stage, completedStages, enemyHp, enemyMaxHp, enemyName, floatingNumbers, heroes }: Props) {
  const theme = getTheme(dungeonNumber);
  const cycleNum = Math.floor((dungeonNumber - 1) / 8);
  const isBoss = stage === 10;
  const hpPercent = enemyMaxHp > 0 ? (enemyHp / enemyMaxHp) * 100 : 0;
  const dungeonName = cycleNum === 0 ? theme.name : `${theme.name} ${cycleNum + 1}`;

  const { shake, triggerShake } = useScreenShake();
  const { particles, spawnParticles } = useParticles();

  const [isHit, setIsHit] = useState(false);
  const [showDeath, setShowDeath] = useState(false);
  const prevHpRef = useRef(enemyHp);
  const prevStageRef = useRef(stage);
  const prevNameRef = useRef(enemyName);

  useEffect(() => {
    const hpDown = enemyHp < prevHpRef.current;
    const stageUp = stage !== prevStageRef.current;
    const nameUp = enemyName !== prevNameRef.current;

    if (hpDown || stageUp) {
      setIsHit(true);
      if (isBoss && hpDown) triggerShake(12);
      else if (hpDown) triggerShake(4);
      if (hpDown) spawnHitImpact(spawnParticles, 50, 45);
      if (stageUp || nameUp) {
        setShowDeath(true);
        spawnGoldBurst(spawnParticles, 50, 40, 10);
        spawnSoulExplosion(spawnParticles, 50, 40, prevStageRef.current === 10);
        if (prevStageRef.current === 10) setTimeout(() => spawnManaBurst(spawnParticles, 50, 40), 200);
        setTimeout(() => setShowDeath(false), 800);
      }
      const t = setTimeout(() => setIsHit(false), 300);
      prevHpRef.current = enemyHp;
      prevStageRef.current = stage;
      prevNameRef.current = enemyName;
      return () => clearTimeout(t);
    }
    prevHpRef.current = enemyHp;
    prevStageRef.current = stage;
    prevNameRef.current = enemyName;
  }, [enemyHp, stage, enemyName, isBoss, triggerShake, spawnParticles]);

  return (
    <ScreenShakeWrapper shake={shake}>
      <div className="relative overflow-hidden min-h-[380px] flex flex-col items-center justify-center" style={{ background: getThemeBg(theme.name) }}>

        {/* Ambient pixel particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="absolute animate-float" style={{ width: 2 + Math.floor(Math.random() * 3) * 2, height: 2 + Math.floor(Math.random() * 3) * 2, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, background: theme.accentColor, opacity: 0.12 + Math.random() * 0.12, animationDelay: `${Math.random() * 6}s`, animationDuration: `${4 + Math.random() * 5}s` }} />
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 px-4 py-3 flex justify-between items-center z-10">
          <div className="text-[11px] font-semibold" style={{ color: `${theme.accentColor}aa` }}>
            {theme.emoji} {dungeonName}
          </div>
          <div className="text-[10px] text-[#475569] font-medium">
            {isBoss ? <span className="text-[#f87171]">💀 BOSS</span> : `Stage ${stage}/10`}
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {[1,2,3,4,5,6,7,8,9,10].map(s => (
            <div key={s} className={`progress-dot ${s < stage ? 'completed' : s === stage ? `current ${isBoss ? 'boss' : ''}` : 'pending'}`} />
          ))}
        </div>

        {/* Hit flash */}
        <HitFlash active={isHit} color={isBoss ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.08)'} />

        {/* Death effect */}
        {showDeath && (
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
            <div className="w-28 h-28 rounded-full animate-ping" style={{ background: 'rgba(255,255,255,0.15)' }} />
            <div className="absolute w-20 h-20 rounded-full animate-ping" style={{ background: 'rgba(251,191,36,0.1)', animationDelay: '0.1s' }} />
          </div>
        )}

        {/* Particles */}
        <ParticleRenderer particles={particles} />

        {/* Enemy area */}
        <div className="relative z-10 flex flex-col items-center gap-3 mt-10">
          {/* Floating numbers */}
          {floatingNumbers.map(f => (
            <div key={f.id} className="absolute pointer-events-none animate-float-up font-black z-20" style={{ left: `${f.x}%`, top: `${f.y}%`, color: f.isCrit ? '#f87171' : '#fbbf24', fontSize: f.isCrit ? '26px' : '18px', textShadow: '0 0 12px rgba(0,0,0,0.8)' }}>
              {f.value.toLocaleString()}
            </div>
          ))}

          {/* Sprite */}
          <div className="relative">
            {isBoss ? (
              <BossSprite themeId={theme.name} size={110} animate isHit={isHit} />
            ) : (
              <MonsterSprite monsterType={enemyName} size={80} animate isHit={isHit} themeColor={theme.accentColor} />
            )}
            {isBoss && (
              <div className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-black animate-pulse" style={{ background: 'rgba(239,68,68,0.9)', color: 'white', boxShadow: '0 0 12px rgba(239,68,68,0.5)' }}>
                BOSS
              </div>
            )}
          </div>

          {/* Name */}
          <div className={`text-sm font-bold ${isBoss ? 'text-[#f87171]' : 'text-[#f1f5f9]'}`}>
            {enemyName}
          </div>

          {/* HP Bar */}
          <div className="w-56 sm:w-64">
            <div className="hp-bar-container">
              <div className={`hp-bar-fill ${isBoss ? 'boss' : 'normal'}`} style={{ width: `${hpPercent}%` }} />
            </div>
            <div className="text-center mt-1.5">
              <span className="text-[10px] text-[#475569] font-medium">
                {enemyHp.toLocaleString()} / {enemyMaxHp.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Hero HP bars at bottom */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <div className="flex gap-1.5 justify-center flex-wrap">
            {heroes.filter(h => h.level > 0).map(h => {
              const def = HERO_DEFS.find(d => d.id === h.id);
              if (!def) return null;
              const hpPct = h.maxHp > 0 ? (h.hp / h.maxHp) * 100 : 0;
              return (
                <div key={h.id} className="flex items-center gap-1 px-1.5 py-1 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-5 h-5 rounded flex items-center justify-center" style={{ opacity: h.isDead ? 0.3 : 1, filter: h.isDead ? 'grayscale(1)' : undefined }}>
                    <HeroSprite heroId={h.id} size={18} animate={!h.isDead} />
                  </div>
                  <div className="w-16">
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${hpPct}%`, background: h.isDead ? '#475569' : hpPct > 50 ? '#34d399' : hpPct > 25 ? '#fbbf24' : '#f87171' }} />
                    </div>
                    <div className="text-[8px] text-center mt-0.5" style={{ color: h.isDead ? '#475569' : '#64748b' }}>
                      {h.isDead ? `💀 ${h.reviveTimer}s` : `${Math.floor(h.hp)}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {shake.intensity > 0.1 && (
          <div className="absolute bottom-3 right-4 z-10">
            <span className="text-[10px] font-bold" style={{ color: 'rgba(248,113,113,0.5)' }}>
              {isBoss ? '💥 BOSS HIT' : '⚡ HIT'}
            </span>
          </div>
        )}
      </div>
    </ScreenShakeWrapper>
  );
}
