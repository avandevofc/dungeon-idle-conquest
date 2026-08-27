import React from 'react';
import { ManaUpgradeDef, ManaUpgradeState } from '../types';
import { formatNumber } from '../utils/formatters';

interface Props {
  upgrades: ManaUpgradeState[];
  mana: number;
  upgradeDefs: ManaUpgradeDef[];
  onBuy: (upgradeId: string) => void;
}

export function ManaUpgradePanel({ upgrades, mana, upgradeDefs, onBuy }: Props) {
  return (
    <div className="bg-slate-900/80 border border-purple-900/40 rounded-2xl p-4 space-y-2">
      <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2 mb-3">
        <span className="text-base">💎</span> Upgrades de Mana
        <span className="text-[10px] text-purple-400/60 font-normal ml-auto">Permanentes</span>
      </h3>

      {upgradeDefs.map(def => {
        const state = upgrades.find(u => u.id === def.id);
        const level = state?.level || 0;
        const cost = Math.floor(def.baseCost * Math.pow(def.costScale, level));
        const canAfford = mana >= cost;

        return (
          <div
            key={def.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-purple-950/30 border border-purple-800/30 hover:border-purple-700/40 transition-all"
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-purple-900/40 border border-purple-700/30 shrink-0">
              {def.icon}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-purple-200">{def.name}</span>
                {level > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-800/40 text-purple-300 font-medium">
                    Lv.{level}
                  </span>
                )}
              </div>
              <div className="text-[10px] text-purple-400/70 mt-0.5">
                {level > 0 ? def.effectLabel(level) : def.description}
              </div>
            </div>

            {/* Buy button */}
            <button
              onClick={() => onBuy(def.id)}
              disabled={!canAfford}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                canAfford
                  ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 cursor-pointer hover:scale-105 active:scale-95'
                  : 'bg-slate-800/40 text-slate-500 border border-slate-700/30 cursor-not-allowed'
              }`}
            >
              +1 Lv<br />
              <span className="text-[9px] opacity-70">💎 {formatNumber(cost)}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
