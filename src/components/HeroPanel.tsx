import React from 'react';
import { HeroDef } from '../types';
import { heroUpgradeCost, heroDamage, formatNumber } from '../utils/formatters';
import { HeroSprite } from './HeroSprite';

interface Props {
  heroes: { id: string; level: number }[];
  gold: number;
  totalGoldEarned: number;
  manaMult: number;
  heroDefs: HeroDef[];
  onUpgrade: (heroId: string) => void;
}

export function HeroPanel({ heroes, gold, totalGoldEarned, manaMult, heroDefs, onUpgrade }: Props) {
  return (
    <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4 space-y-2">
      <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
        <span className="text-base">⚔️</span> Heróis
      </h3>

      {heroDefs.map(def => {
        const hero = heroes.find(h => h.id === def.id);
        const level = hero?.level || 0;
        const isUnlocked = totalGoldEarned >= def.unlockThreshold;
        const cost = heroUpgradeCost(def.baseCost, level);
        const dmg = level > 0 ? heroDamage(def.baseDmg, level, manaMult) : 0;
        const canAfford = gold >= cost;

        return (
          <div
            key={def.id}
            className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
              isUnlocked
                ? 'bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/30'
                : 'bg-slate-900/40 border border-slate-800/20 opacity-50'
            }`}
          >
            {/* SVG Pixel Art Sprite */}
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
              style={{
                background: isUnlocked ? `${def.color}15` : '#1e293b',
                border: `1px solid ${isUnlocked ? def.color + '40' : '#334155'}`,
              }}
            >
              {isUnlocked ? (
                <HeroSprite heroId={def.id} size={40} animate={level > 0} />
              ) : (
                <span className="text-xl opacity-40">{def.icon}</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-200">{def.name}</span>
                {level > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-700/60 text-slate-300 font-medium">
                    Lv.{level}
                  </span>
                )}
              </div>
              {isUnlocked ? (
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {level > 0 ? (
                    <>Dano: <span className="text-red-400">{formatNumber(dmg)}</span>/s</>
                  ) : (
                    <>Dano base: <span className="text-slate-500">{formatNumber(def.baseDmg)}</span></>
                  )}
                </div>
              ) : (
                <div className="text-[10px] text-slate-500 mt-0.5">
                  🔒 Precisa de {formatNumber(def.unlockThreshold)} 🪙 total
                </div>
              )}
            </div>

            {/* Upgrade button */}
            {isUnlocked && (
              <button
                onClick={() => onUpgrade(def.id)}
                disabled={!canAfford}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                  canAfford
                    ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 cursor-pointer hover:scale-105 active:scale-95'
                    : 'bg-slate-800/40 text-slate-500 border border-slate-700/30 cursor-not-allowed'
                }`}
              >
                +1 Lv<br />
                <span className="text-[9px] opacity-70">🪙 {formatNumber(cost)}</span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
