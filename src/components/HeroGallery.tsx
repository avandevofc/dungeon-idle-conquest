import React, { useState } from 'react';
import { HeroDef } from '../types';
import { HeroSprite } from './HeroSprite';
import { heroUpgradeCost, heroDamage, formatNumber } from '../utils/formatters';

interface Props {
  heroes: { id: string; level: number }[];
  gold: number;
  totalGoldEarned: number;
  manaMult: number;
  heroDefs: HeroDef[];
  onUpgrade: (heroId: string) => void;
  onClose: () => void;
}

const HERO_LORE: Record<string, { title: string; desc: string; stats: string[] }> = {
  warrior: { title: 'O Guardião Ferro', desc: 'Veterano de mil batalhas. Sua espada nunca erra.', stats: ['Alto HP', 'Dano consistente', 'Custo baixo'] },
  archer: { title: 'Olhos de Falcão', desc: 'Criada nas florestas de Elarion, seus tiros nunca erram.', stats: ['Alto DPS', 'Alcance', 'Ataque rápido'] },
  mage: { title: 'Arquiteto do Vazio', desc: 'Domina as artes arcanas proibidas.', stats: ['Dano mágico', 'AOE', 'Escala exponencial'] },
  paladin: { title: 'Luz da Justiça', desc: 'Seu escudo é impenetrável e sua fé inabalável.', stats: ['Tanque', 'Suporte', 'Aura'] },
  healer: { title: 'Mão Divina', desc: 'Canaliza a energia da vida para curar aliados.', stats: ['Cura', 'Suporte', 'Dano Sagrado'] },
  assassin: { title: 'Lâmina das Sombras', desc: 'Ninguém a vê chegar. Ninguém sobrevive.', stats: ['DPS extremo', 'Crítico', 'Veneno'] },
  necromancer: { title: 'Mestre da Cripta', desc: 'Controla as forças da morte.', stats: ['Invocações', 'Dano contíguo', 'Drain'] },
};

export function HeroGallery({ heroes, gold, totalGoldEarned, manaMult, heroDefs, onUpgrade, onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const selDef = selected ? heroDefs.find(h => h.id === selected) : null;
  const selLevel = selected ? (heroes.find(h => h.id === selected)?.level || 0) : 0;
  const selUnlocked = selected ? totalGoldEarned >= (heroDefs.find(h => h.id === selected)?.unlockThreshold || 0) : false;
  const selCost = selDef ? heroUpgradeCost(selDef.baseCost, selLevel) : 0;
  const selDmg = selDef && selLevel > 0 ? heroDamage(selDef.baseDmg, selLevel, manaMult) : 0;
  const selLore = selected ? HERO_LORE[selected] : null;
  const totalDps = heroDefs.reduce((sum, def) => { const h = heroes.find(hr => hr.id === def.id); return h && h.level > 0 ? sum + heroDamage(def.baseDmg, h.level, manaMult) : sum; }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
      <div className="relative w-full max-w-5xl max-h-[90vh] mx-4 rounded-3xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(180deg, #0c0c14, #06060b)', border: '1px solid rgba(255,255,255,0.06)' }}>

        {/* Header */}
        <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black" style={{ background: 'linear-gradient(135deg, #fbbf24, #a78bfa, #f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ⚔️ Galeria de Heróis
              </h2>
              <p className="text-[10px] text-[#475569] mt-0.5 font-medium">
                {heroes.filter(h => h.level > 0).length}/{heroDefs.length} desbloqueados · DPS: <span className="text-[#f87171]">{formatNumber(totalDps)}</span>/s
              </p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}>✕</button>
          </div>
          <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(heroes.filter(h => h.level > 0).length / heroDefs.length) * 100}%`, background: 'linear-gradient(90deg, #fbbf24, #a78bfa, #f87171)' }} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row" style={{ height: 'calc(90vh - 80px)' }}>
          {/* Grid */}
          <div className="lg:w-1/2 p-4 overflow-y-auto scrollbar-thin">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {heroDefs.map(def => {
                const hero = heroes.find(h => h.id === def.id);
                const level = hero?.level || 0;
                const unlocked = totalGoldEarned >= def.unlockThreshold;
                const isSel = selected === def.id;
                const lore = HERO_LORE[def.id];
                const dmg = level > 0 ? heroDamage(def.baseDmg, level, manaMult) : def.baseDmg;
                const progress = Math.min(1, totalGoldEarned / def.unlockThreshold);

                return (
                  <button key={def.id} onClick={() => setSelected(def.id)} className="relative p-3 rounded-xl text-left transition-all duration-200 cursor-pointer" style={{
                    background: isSel ? `${def.color}12` : 'rgba(15,15,25,0.5)',
                    border: `1px solid ${isSel ? def.color + '40' : 'rgba(255,255,255,0.04)'}`,
                    boxShadow: isSel ? `0 0 20px ${def.color}15` : 'none',
                    transform: isSel ? 'scale(1.02)' : undefined,
                  }}>
                    <div className="flex justify-center mb-2">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: unlocked ? `${def.color}10` : '#0a0a15', border: `1px solid ${unlocked ? def.color + '20' : '#1a1a2e'}` }}>
                        {unlocked ? <HeroSprite heroId={def.id} size={48} animate={level > 0} /> : <div className="text-2xl opacity-20">🔒</div>}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[11px] font-bold text-[#f1f5f9]">{def.name}</div>
                      {level > 0 ? (
                        <div className="text-[9px] text-[#475569]">Lv.{level} · <span className="text-[#f87171]">{formatNumber(dmg)}</span>/s</div>
                      ) : unlocked ? (
                        <div className="text-[9px] text-[#34d399]/70">Desbloqueado</div>
                      ) : (
                        <div className="text-[9px] text-[#334155]">{formatNumber(def.unlockThreshold)} 🪙</div>
                      )}
                    </div>
                    {!unlocked && (
                      <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress * 100}%`, background: '#475569' }} />
                      </div>
                    )}
                    {level > 0 && (
                      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: def.color, boxShadow: `0 0 8px ${def.color}` }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail */}
          <div className="lg:w-1/2 p-6 flex flex-col" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
            {selDef && selLore ? (
              <div className="flex-1 flex flex-col animate-fade-in">
                <div className="flex justify-center mb-4">
                  <div className="w-28 h-28 rounded-2xl flex items-center justify-center overflow-hidden" style={{ background: selUnlocked ? `${selDef.color}08` : '#0a0a15', border: `2px solid ${selUnlocked ? selDef.color + '30' : '#1a1a2e'}`, boxShadow: selLevel > 0 ? `0 0 30px ${selDef.color}15` : 'none' }}>
                    {selUnlocked ? <HeroSprite heroId={selDef.id} size={100} animate={selLevel > 0} /> : <div className="text-4xl opacity-15">🔒</div>}
                  </div>
                </div>

                <div className="text-center mb-3">
                  <h3 className="text-lg font-black" style={{ color: selDef.color }}>{selDef.icon} {selDef.name}</h3>
                  <p className="text-[11px] italic" style={{ color: '#64748b' }}>{selLore.title}</p>
                </div>
                <p className="text-[11px] text-[#64748b] text-center mb-3 leading-relaxed">{selLore.desc}</p>

                <div className="flex justify-center gap-1.5 mb-4">
                  {selLore.stats.map((s, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 rounded-full font-semibold" style={{ background: `${selDef.color}10`, color: `${selDef.color}cc`, border: `1px solid ${selDef.color}20` }}>{s}</span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {[['Nível', selLevel, '#f1f5f9'], ['Dano/s', formatNumber(selDmg), '#f87171'], ['Base', formatNumber(selDef.baseDmg), '#fbbf24'], ['Próximo', `🪙${formatNumber(selCost)}`, '#34d399']].map(([l, v, c]) => (
                    <div key={l as string} className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <div className="text-[9px] text-[#334155] mb-0.5">{l}</div>
                      <div className="text-base font-black" style={{ color: c as string }}>{v}</div>
                    </div>
                  ))}
                </div>

                {selUnlocked ? (
                  <button onClick={() => onUpgrade(selDef.id)} disabled={gold < selCost} className="w-full py-2.5 rounded-xl font-bold text-xs transition-all" style={{
                    background: gold >= selCost ? `linear-gradient(135deg, ${selDef.color}18, ${selDef.color}0a)` : 'rgba(30,30,50,0.5)',
                    border: `1px solid ${gold >= selCost ? selDef.color + '30' : 'rgba(255,255,255,0.05)'}`,
                    color: gold >= selCost ? '#fbbf24' : '#475569',
                    cursor: gold >= selCost ? 'pointer' : 'not-allowed',
                  }}>
                    ⬆️ Melhorar — 🪙{formatNumber(selCost)}
                  </button>
                ) : (
                  <div className="text-center">
                    <div className="text-[10px] text-[#334155] mb-2">🔒 {formatNumber(selDef.unlockThreshold)} 🪙 total</div>
                    <div className="h-1.5 rounded-full overflow-hidden max-w-[200px] mx-auto" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (totalGoldEarned / selDef.unlockThreshold) * 100)}%`, background: '#475569' }} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-[#334155]">
                  <div className="text-3xl mb-2">👆</div>
                  <div className="text-[11px]">Selecione um herói</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
