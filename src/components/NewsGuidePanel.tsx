import React, { useState, useMemo } from 'react';
import { CHANGELOG, GUIDE_SECTIONS, CATEGORY_LABELS, type CategoryFilter } from '../data/newsGuide';

interface Props {
  onClose: () => void;
}

export function NewsGuidePanel({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'news' | 'guide'>('news');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [search, setSearch] = useState('');
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

  const filteredGuide = useMemo(() => {
    const q = search.toLowerCase().trim();
    return GUIDE_SECTIONS.filter(s => {
      const matchCategory = category === 'all' || category === 'updates' || s.category === category;
      const matchSearch = !q || s.title.toLowerCase().includes(q) || s.keywords.some(k => k.toLowerCase().includes(q)) || s.content.some(c => c.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [category, search]);

  const filteredChangelog = useMemo(() => {
    if (category !== 'all' && category !== 'updates') return [];
    return CHANGELOG;
  }, [category]);

  const typeColor: Record<string, string> = {
    feature: '#34d399',
    fix: '#fbbf24',
    balance: '#22d3ee',
    content: '#a78bfa',
    improvement: '#f87171',
  };

  const typeLabel: Record<string, string> = {
    feature: 'Novo',
    fix: 'Fix',
    balance: 'Balance',
    content: 'Conteúdo',
    improvement: 'Melhoria',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div
        className="w-full max-w-3xl max-h-[85vh] flex flex-col animate-fade-in"
        style={{ background: 'rgba(10,10,18,0.97)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)' }}>
              📰
            </div>
            <div>
              <h2 className="text-sm font-black text-[#f1f5f9]">Novidades & Guia</h2>
              <p className="text-[10px] text-[#475569]">Mudanças recentes e manual do jogo</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost text-[11px] px-3 py-1.5">✕</button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 pt-4 flex gap-2 flex-shrink-0">
          <button
            onClick={() => { setActiveTab('news'); setCategory('all'); setSearch(''); }}
            className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${activeTab === 'news' ? 'bg-[rgba(139,92,246,0.2)] text-[#c4b5fd] border border-[rgba(139,92,246,0.3)]' : 'text-[#475569] hover:text-[#94a3b8] border border-transparent'}`}
          >
            🆕 Novidades
          </button>
          <button
            onClick={() => { setActiveTab('guide'); setCategory('all'); setSearch(''); }}
            className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${activeTab === 'guide' ? 'bg-[rgba(139,92,246,0.2)] text-[#c4b5fd] border border-[rgba(139,92,246,0.3)]' : 'text-[#475569] hover:text-[#94a3b8] border border-transparent'}`}
          >
            📖 Guia
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 pt-3 flex-shrink-0">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] text-sm">🔎</span>
            <input
              type="text"
              placeholder="Pesquisar no guia..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-[12px] text-[#f1f5f9] placeholder-[#334155] outline-none focus:border-[rgba(139,92,246,0.4)] transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-6 pt-3 pb-2 flex gap-1.5 overflow-x-auto flex-shrink-0 scrollbar-thin">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategory(key as CategoryFilter)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all flex-shrink-0 ${category === key ? 'bg-[rgba(139,92,246,0.2)] text-[#c4b5fd] border border-[rgba(139,92,246,0.3)]' : 'text-[#475569] hover:text-[#94a3b8] border border-transparent hover:bg-[rgba(255,255,255,0.03)]'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-thin">

          {/* Highlights (only on news tab, no search, all category) */}
          {activeTab === 'news' && category === 'all' && !search && (
            <div className="rounded-xl p-4 mb-4" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(52,211,153,0.08))', border: '1px solid rgba(139,92,246,0.2)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">📌</span>
                <span className="text-[11px] font-black text-[#c4b5fd]">DESTAQUE</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold animate-pulse" style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }}>NOVO!</span>
              </div>
              <div className="text-[12px] font-bold text-[#f1f5f9] mb-1">Sistema de HP dos Heróis</div>
              <div className="text-[11px] text-[#94a3b8] leading-relaxed">
                Agora os heróis possuem HP e podem receber ataques diretamente dos monstros e chefes. Heróis morrem quando o HP chega a zero e ressuscitam após 10 segundos.
              </div>
            </div>
          )}

          {/* Changelog (news tab) */}
          {activeTab === 'news' && filteredChangelog.map(entry => (
            <div key={entry.id} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: `${typeColor[entry.type]}15`, color: typeColor[entry.type], border: `1px solid ${typeColor[entry.type]}30` }}>
                  {typeLabel[entry.type]}
                </span>
                <span className="text-[10px] text-[#334155]">{entry.date}</span>
              </div>
              <div className="text-[12px] font-bold text-[#f1f5f9] mb-1">{entry.title}</div>
              <div className="text-[11px] text-[#94a3b8] leading-relaxed">{entry.description}</div>
            </div>
          ))}

          {/* Guide sections */}
          {activeTab === 'guide' && filteredGuide.map(section => {
            const isExpanded = expandedGuide === section.id || search.length > 0;
            return (
              <div key={section.id} className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <button
                  onClick={() => setExpandedGuide(isExpanded && search.length === 0 ? null : section.id)}
                  className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="flex-1 text-[12px] font-bold text-[#f1f5f9]">{section.title}</span>
                  <span className={`text-[10px] text-[#475569] transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0 border-t border-white/[0.04]">
                    <div className="mt-3 space-y-1.5">
                      {section.content.map((line, i) => (
                        <div key={i} className="text-[11px] text-[#94a3b8] leading-relaxed" style={{ minHeight: line === '' ? '8px' : undefined }}>
                          {line.split('**').map((part, j) =>
                            j % 2 === 1 ? <strong key={j} className="text-[#c4b5fd] font-bold">{part}</strong> : <span key={j}>{part}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Empty state */}
          {activeTab === 'guide' && filteredGuide.length === 0 && (
            <div className="text-center py-8">
              <div className="text-2xl mb-2 opacity-30">🔍</div>
              <div className="text-[11px] text-[#475569]">Nenhum resultado encontrado</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/[0.06] flex items-center justify-between flex-shrink-0">
          <span className="text-[10px] text-[#334155]">Dungeon Idle Conquest v1.0</span>
          <span className="text-[10px] text-[#334155]">{filteredGuide.length} seções · {CHANGELOG.length} atualizações</span>
        </div>
      </div>
    </div>
  );
}
