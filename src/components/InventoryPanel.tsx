import React, { useState } from 'react';
import { ItemInstance, HeroDef } from '../types';
import { ITEMS, RARITY_COLORS, RARITY_NAMES, RARITY_GLOW, itemUpgradeCost } from '../data/items';
import { formatNumber } from '../utils/formatters';

interface Props {
  items: ItemInstance[];
  maxSlots: number;
  gold: number;
  heroes: { id: string; level: number }[];
  heroDefs: HeroDef[];
  onEquip: (itemUid: string, heroId: string) => void;
  onUnequip: (itemUid: string) => void;
  onSell: (itemUid: string) => void;
  onSellByRarity?: (rarity: string) => void;
  onEquipBestAll?: () => void;
}

const SLOT_ICONS: Record<string, string> = { weapon: '⚔️', armor: '🛡️', accessory: '💍' };

export function InventoryPanel({ items, maxSlots, gold, heroes, heroDefs, onEquip, onUnequip, onSell, onSellByRarity, onEquipBestAll }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<'all' | 'equipped'>('all');
  const filtered = tab === 'equipped' ? items.filter(i => i.equipped) : items;
  const selDef = selected ? ITEMS.find(i => i.id === items.find(it => it.uid === selected)?.defId) : null;
  const selInst = selected ? items.find(i => i.uid === selected) : null;

  return (
    <div className="glass-card-static p-4">
      <div className="section-header">
        <div className="section-title">📦 Inventário</div>
        <div className="section-badge" style={{ background: 'rgba(148,163,184,0.1)', color: '#94a3b8' }}>{items.length}/{maxSlots}</div>
      </div>

      <div className="flex gap-1 mb-3">
        {(['all', 'equipped'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${tab === t ? 'text-[#c4b5fd]' : 'text-[#475569]'}`} style={{ background: tab === t ? 'rgba(139,92,246,0.12)' : 'transparent', border: `1px solid ${tab === t ? 'rgba(139,92,246,0.2)' : 'transparent'}` }}>
            {t === 'all' ? 'Todos' : 'Equipados'}
          </button>
        ))}
      </div>

      {/* Equip Best All Button */}
      {onEquipBestAll && (
        <button
          onClick={onEquipBestAll}
          className="w-full mb-3 py-2 text-[9px] font-bold transition-all cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(34,211,238,0.1))',
            border: '2px solid #34d399',
            color: '#34d399',
            boxShadow: '0 0 10px rgba(52,211,153,0.2)',
          }}
        >
          ⚡ EQUIPAR MELHORES
        </button>
      )}

      {/* Sell by Rarity */}
      {onSellByRarity && (
        <div className="mb-3">
          <div className="text-[9px] text-[#475569] mb-1.5 font-medium">Vender por grau:</div>
          <div className="flex gap-1 flex-wrap">
            {([
              { rarity: 'common', label: 'Comum', color: RARITY_COLORS.common },
              { rarity: 'uncommon', label: 'Incomum', color: RARITY_COLORS.uncommon },
              { rarity: 'rare', label: 'Raro', color: RARITY_COLORS.rare },
              { rarity: 'epic', label: 'Épico', color: RARITY_COLORS.epic },
            ]).map(r => {
              const count = items.filter(i => !i.equipped && ITEMS.find(d => d.id === i.defId)?.rarity === r.rarity).length;
              if (count === 0) return null;
              return (
                <button
                  key={r.rarity}
                  onClick={() => {
                    if (confirm(`Vender todos os itens ${r.label} não equipados? (${count} itens)`)) {
                      onSellByRarity(r.rarity);
                    }
                  }}
                  className="px-2 py-1 rounded-lg text-[9px] font-bold transition-all cursor-pointer hover:opacity-80"
                  style={{ background: `${r.color}15`, color: r.color, border: `1px solid ${r.color}30` }}
                >
                  🗑️ {r.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-5 gap-1.5 mb-3">
        {filtered.map(item => {
          const def = ITEMS.find(i => i.id === item.defId);
          if (!def) return null;
          return (
            <button key={item.uid} onClick={() => setSelected(selected === item.uid ? null : item.uid)} className="w-full aspect-square rounded-xl flex items-center justify-center text-lg transition-all cursor-pointer" style={{ background: `${RARITY_COLORS[def.rarity]}10`, border: `1px solid ${RARITY_COLORS[def.rarity]}30`, boxShadow: RARITY_GLOW[def.rarity], transform: selected === item.uid ? 'scale(1.1)' : undefined }}>
              {def.icon}
            </button>
          );
        })}
        {filtered.length === 0 && <div className="col-span-5 text-center text-[10px] text-[#334155] py-4">Nenhum item ainda</div>}
      </div>

      {selDef && selInst && (
        <div className="p-3 rounded-xl animate-fade-in" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{selDef.icon}</span>
            <div>
              <div className="text-[11px] font-bold" style={{ color: RARITY_COLORS[selDef.rarity] }}>{selDef.name}</div>
              <div className="text-[9px] text-[#475569]">{RARITY_NAMES[selDef.rarity]} · {SLOT_ICONS[selDef.slot]} · Lv.{selInst.level}</div>
            </div>
          </div>
          <div className="text-[10px] text-[#64748b] mb-2">+{Math.floor(selDef.baseStat * (1 + (selInst.level - 1) * 0.15))} {selDef.statType}</div>
          <div className="flex gap-1.5">
            {selInst.equipped ? (
              <button onClick={() => onUnequip(selInst.uid)} className="flex-1 btn-danger text-[10px] py-1.5">Remover</button>
            ) : (
              <select onChange={(e) => { if (e.target.value) { onEquip(selInst.uid, e.target.value); e.target.value = ''; } }} className="flex-1 px-2 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer" style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }} defaultValue="">
                <option value="" disabled>Equipar em...</option>
                {heroDefs.filter(h => heroes.find(hr => hr.id === h.id && hr.level > 0)).map(h => <option key={h.id} value={h.id}>{h.icon} {h.name}</option>)}
              </select>
            )}
            <button onClick={() => { onSell(selInst.uid); setSelected(null); }} className="btn-amber text-[10px] py-1.5">🪙 Vender</button>
          </div>
        </div>
      )}
    </div>
  );
}
