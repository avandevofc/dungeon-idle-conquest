import React from 'react';
import { formatNumber } from '../utils/formatters';

interface Props {
  gold: number;
  mana: number;
  totalGoldEarned: number;
  dps: number;
  goldMult: number;
  manaMult: number;
}

export function ResourceBar({ gold, mana, totalGoldEarned, dps, goldMult, manaMult }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Gold */}
      <div className="bg-gradient-to-br from-amber-900/50 to-amber-950/50 border border-amber-700/40 rounded-xl p-3 flex items-center gap-3">
        <span className="text-3xl">🪙</span>
        <div>
          <div className="text-amber-300 font-bold text-lg leading-tight">{formatNumber(gold)}</div>
          <div className="text-amber-500/70 text-[10px]">Ouro</div>
        </div>
      </div>

      {/* Mana */}
      <div className="bg-gradient-to-br from-purple-900/50 to-purple-950/50 border border-purple-700/40 rounded-xl p-3 flex items-center gap-3">
        <span className="text-3xl">💎</span>
        <div>
          <div className="text-purple-300 font-bold text-lg leading-tight">{formatNumber(mana)}</div>
          <div className="text-purple-500/70 text-[10px]">Mana</div>
        </div>
      </div>

      {/* DPS */}
      <div className="bg-gradient-to-br from-red-900/50 to-red-950/50 border border-red-700/40 rounded-xl p-3 flex items-center gap-3">
        <span className="text-3xl">⚔️</span>
        <div>
          <div className="text-red-300 font-bold text-lg leading-tight">{formatNumber(dps)}</div>
          <div className="text-red-500/70 text-[10px]">DPS Total</div>
        </div>
      </div>

      {/* Multipliers */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/40 rounded-xl p-3 flex flex-col justify-center">
        <div className="text-[10px] text-slate-400 mb-1">Multiplicadores</div>
        <div className="flex gap-3">
          <span className="text-xs text-red-400">⚔️ ×{manaMult.toFixed(1)}</span>
          <span className="text-xs text-amber-400">🪙 ×{goldMult.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
