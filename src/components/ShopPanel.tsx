import React, { useState } from 'react';
import { SHOP_ITEMS } from '../data/shop';
import { formatNumber } from '../utils/formatters';

interface Props { gold: number; mana: number; prestigePoints: number; onBuy: (id: string) => void; }

const TABS = [
  { key: 'gold' as const, label: 'OURO', icon: '🪙', color: '#fbbf24' },
  { key: 'mana' as const, label: 'MANA', icon: '💎', color: '#a78bfa' },
  { key: 'prestige' as const, label: 'ASCENSÃO', icon: '⭐', color: '#22d3ee' },
];

const CATEGORIES = [
  { key: 'all', label: 'Todos' },
  { key: 'upgrades', label: 'Upgrades' },
  { key: 'consumables', label: 'Itens' },
  { key: 'utility', label: 'Utilidade' },
  { key: 'premium', label: 'Premium' },
];

export function ShopPanel({ gold, mana, prestigePoints, onBuy }: Props) {
  const [tab, setTab] = useState<'gold' | 'mana' | 'prestige'>('gold');
  const [category, setCategory] = useState('all');
  const balances: Record<string, number> = { gold, mana, prestige: prestigePoints };
  const currentTab = TABS.find(t => t.key === tab)!;

  const filtered = SHOP_ITEMS.filter(i => {
    if (i.priceType !== tab) return false;
    if (category !== 'all' && i.category !== category) return false;
    return true;
  });

  // Get available categories for current tab
  const availableCategories = CATEGORIES.filter(c =>
    c.key === 'all' || SHOP_ITEMS.some(i => i.priceType === tab && i.category === c.key)
  );

  return (
    <div className="glass-card-static p-4" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="section-header">
        <div className="section-title">🏪 LOJA</div>
        <div className="text-[8px]" style={{ color: currentTab.color }}>
          SALDO: {formatNumber(balances[tab])}
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex gap-1 mb-2">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setCategory('all'); }}
            className="flex-1 py-2 text-[8px] font-bold transition-all cursor-pointer"
            style={{
              background: tab === t.key ? `${t.color}20` : '#0a0a15',
              border: `2px solid ${tab === t.key ? t.color : '#2a2a4a'}`,
              color: tab === t.key ? t.color : '#556677',
              boxShadow: tab === t.key ? `0 0 10px ${t.color}30` : 'none',
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Category Pills */}
      <div className="flex gap-1 mb-3 flex-wrap">
        {availableCategories.map(c => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className="px-2 py-1 text-[7px] cursor-pointer transition-all"
            style={{
              background: category === c.key ? `${currentTab.color}15` : 'transparent',
              border: `1px solid ${category === c.key ? `${currentTab.color}60` : '#2a2a4a'}`,
              color: category === c.key ? currentTab.color : '#556677',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin">
        {filtered.map(item => {
          const canAfford = balances[item.priceType] >= item.price;
          return (
            <div
              key={item.id}
              className="flex items-center gap-2 p-2 transition-all"
              style={{
                background: canAfford ? 'rgba(255,255,255,0.02)' : 'rgba(10,10,15,0.5)',
                border: `2px solid ${canAfford ? '#2a2a4a' : '#1a1a2e'}`,
                opacity: canAfford ? 1 : 0.6,
              }}
            >
              {/* Icon */}
              <div
                className="w-8 h-8 flex items-center justify-center text-base shrink-0"
                style={{
                  background: `${currentTab.color}15`,
                  border: `2px solid ${currentTab.color}40`,
                }}
              >
                {item.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[8px] font-bold" style={{ color: canAfford ? '#f0f0f0' : '#556677' }}>
                  {item.name}
                </div>
                <div className="text-[7px]" style={{ color: '#556677' }}>
                  {item.description}
                </div>
              </div>

              {/* Price Button */}
              <button
                onClick={() => onBuy(item.id)}
                disabled={!canAfford}
                className="px-2 py-1 text-[7px] font-bold transition-all shrink-0 cursor-pointer"
                style={{
                  background: canAfford ? `${currentTab.color}15` : '#1a1a2e',
                  border: `2px solid ${canAfford ? currentTab.color : '#2a2a4a'}`,
                  color: canAfford ? currentTab.color : '#333355',
                  boxShadow: canAfford ? `0 0 8px ${currentTab.color}20` : 'none',
                }}
              >
                {currentTab.icon} {formatNumber(item.price)}
              </button>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-8 text-[8px]" style={{ color: '#333355' }}>
            Nenhum item nesta categoria
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPanel;
