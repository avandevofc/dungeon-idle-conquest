import React from 'react';

interface SaveInfo {
  lastSave: number;
  playtime: number;
  powerLevel: number;
  version: number;
}

interface SaveConflictModalProps {
  localSave: SaveInfo | null;
  cloudSave: SaveInfo | null;
  onResolve: (useLocal: boolean) => void;
}

function formatTime(timestamp: number): string {
  if (!timestamp) return 'Nunca';
  const date = new Date(timestamp);
  return date.toLocaleString('pt-BR');
}

function formatPlaytime(seconds: number): string {
  if (!seconds) return '0min';
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${mins}min`;
  return `${mins}min`;
}

function formatPowerLevel(power: number): string {
  if (!power) return '0';
  if (power < 1000) return power.toString();
  if (power < 1000000) return `${(power / 1000).toFixed(1)}K`;
  if (power < 1000000000) return `${(power / 1000000).toFixed(1)}M`;
  return `${(power / 1000000000).toFixed(1)}B`;
}

export function SaveConflictModal({ localSave, cloudSave, onResolve }: SaveConflictModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}>
      <div className="w-full max-w-lg mx-4 rounded-2xl p-6 animate-fade-in" style={{ background: 'rgba(20, 20, 35, 0.98)', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">⚔️</div>
          <h2 className="text-xl font-black text-white">Conflito de Saves</h2>
          <p className="text-sm text-white/50 mt-1">Você tem saves em dois lugares. Qual deseja usar?</p>
        </div>

        {/* Save Comparison */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Local Save */}
          <button
            onClick={() => onResolve(true)}
            className="rounded-xl p-4 text-left transition-all hover:scale-[1.02] hover:border-yellow-500/50"
            style={{ 
              background: 'rgba(251, 191, 36, 0.08)', 
              border: '2px solid rgba(251, 191, 36, 0.3)' 
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💾</span>
              <span className="text-sm font-bold text-yellow-400">Local</span>
            </div>
            {localSave ? (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/50">Último save:</span>
                  <span className="text-white/80">{formatTime(localSave.lastSave)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Power Level:</span>
                  <span className="text-yellow-400 font-bold">{formatPowerLevel(localSave.powerLevel)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Tempo de jogo:</span>
                  <span className="text-white/80">{formatPlaytime(localSave.playtime)}</span>
                </div>
              </div>
            ) : (
              <p className="text-white/40 text-xs">Nenhum save local</p>
            )}
            <div className="mt-3 text-[10px] text-yellow-400/70 text-center">
              Clique para usar este save
            </div>
          </button>

          {/* Cloud Save */}
          <button
            onClick={() => onResolve(false)}
            className="rounded-xl p-4 text-left transition-all hover:scale-[1.02] hover:border-purple-500/50"
            style={{ 
              background: 'rgba(139, 92, 246, 0.08)', 
              border: '2px solid rgba(139, 92, 246, 0.3)' 
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">☁️</span>
              <span className="text-sm font-bold text-purple-400">Nuvem</span>
            </div>
            {cloudSave ? (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/50">Último save:</span>
                  <span className="text-white/80">{formatTime(cloudSave.lastSave)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Power Level:</span>
                  <span className="text-purple-400 font-bold">{formatPowerLevel(cloudSave.powerLevel)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Tempo de jogo:</span>
                  <span className="text-white/80">{formatPlaytime(cloudSave.playtime)}</span>
                </div>
              </div>
            ) : (
              <p className="text-white/40 text-xs">Nenhum save na nuvem</p>
            )}
            <div className="mt-3 text-[10px] text-purple-400/70 text-center">
              Clique para usar este save
            </div>
          </button>
        </div>

        {/* Recommendation */}
        <div className="text-center text-xs text-white/40 mb-4">
          💡 <span className="text-white/60">Recomendação:</span> Use o save mais recente para continuar de onde parou.
        </div>

        {/* Info */}
        <div className="text-[10px] text-white/30 text-center">
          O save não escolhido será sobrescrito no próximo save automático.
        </div>
      </div>
    </div>
  );
}
