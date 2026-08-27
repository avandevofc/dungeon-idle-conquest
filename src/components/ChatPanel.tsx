import React, { useState, useRef, useEffect } from 'react';
import { OnlinePlayer, ChatMessage } from '../hooks/useSocket';
import { formatPowerLevel, getPowerRank } from '../utils/powerLevel';

interface ChatPanelProps {
  isConnected: boolean;
  onlinePlayers: OnlinePlayer[];
  chatMessages: ChatMessage[];
  onSendMessage: (text: string) => void;
  currentPlayerId: string;
}

export function ChatPanel({
  isConnected,
  onlinePlayers,
  chatMessages,
  onSendMessage,
  currentPlayerId,
}: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Atalho de teclado para abrir/fechar chat
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isExpanded) {
        e.preventDefault();
        if (input.trim()) {
          onSendMessage(input);
          setInput('');
        }
      }
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
      // Ctrl+Enter para abrir chat
      if (e.key === 'Enter' && !isExpanded && e.ctrlKey) {
        e.preventDefault();
        setIsExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [input, isExpanded, onSendMessage]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getNicknameColor = (nickname: string) => {
    // Gerar cor baseada no nome
    const colors = [
      '#f87171', '#fb923c', '#fbbf24', '#a3e635', '#34d399',
      '#22d3ee', '#60a5fa', '#a78bfa', '#e879f9', '#f472b6'
    ];
    const index = nickname.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Botão para abrir/fechar chat */}
      {!isExpanded && (
        <button
          onClick={() => {
            setIsExpanded(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
          }}
        >
          💬
          {onlinePlayers.length > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full text-[10px] font-bold flex items-center justify-center bg-green-500 text-white">
              {onlinePlayers.length}
            </span>
          )}
        </button>
      )}

      {/* Chat expandido */}
      {isExpanded && (
        <div
          className="w-80 h-96 rounded-2xl flex flex-col overflow-hidden animate-fade-in"
          style={{
            background: 'rgba(15, 15, 25, 0.95)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-lg">💬</span>
              <span className="text-sm font-bold text-white">Chat</span>
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Jogadores online */}
          <div className="px-4 py-2 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>{onlinePlayers.length} online</span>
            </div>
            <div className="space-y-1">
              {onlinePlayers.map(player => {
                const formattedPower = formatPowerLevel(player.powerLevel);
                const powerRank = getPowerRank(player.powerLevel);
                return (
                  <div key={player.id} className="flex items-center gap-2 text-[10px]">
                    <span className="font-bold" style={{ color: powerRank.color }}>[{powerRank.rank}]</span>
                    <span className="text-white/80 truncate flex-1">{player.nickname}</span>
                    <span style={{ color: formattedPower.color }}>
                      {formattedPower.value}{formattedPower.suffix}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-thin">
            {chatMessages.length === 0 && (
              <div className="text-center text-white/30 text-xs py-8">
                Nenhuma mensagem ainda. Seja o primeiro a falar! 🗣️
              </div>
            )}

            {chatMessages.map(msg => (
              <div key={msg.id}>
                {msg.type === 'join' || msg.type === 'leave' ? (
                  <div className="text-center text-xs text-white/40 py-1">
                    <span className="text-white/30">{formatTime(msg.timestamp)}</span>{' '}
                    <span className={msg.type === 'join' ? 'text-green-400' : 'text-red-400'}>
                      {msg.text}
                    </span>
                  </div>
                ) : (
                  <div className={`flex flex-col ${msg.playerId === currentPlayerId ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: getNicknameColor(msg.nickname) }}
                      >
                        {msg.nickname}
                      </span>
                      <span className="text-[9px] text-white/30">{formatTime(msg.timestamp)}</span>
                    </div>
                    <div
                      className={`px-3 py-1.5 rounded-2xl max-w-[85%] text-sm ${
                        msg.playerId === currentPlayerId
                          ? 'rounded-tr-sm'
                          : 'rounded-tl-sm'
                      }`}
                      style={{
                        background: msg.playerId === currentPlayerId
                          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4))'
                          : 'rgba(255, 255, 255, 0.08)',
                        color: '#f1f5f9',
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/10">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isConnected ? 'Digite sua mensagem...' : 'Conectando...'}
                disabled={!isConnected}
                className="flex-1 px-3 py-2 rounded-xl text-sm text-white placeholder-white/40 outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                maxLength={200}
              />
              <button
                onClick={handleSend}
                disabled={!isConnected || !input.trim()}
                className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                style={{
                  background: input.trim()
                    ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }}
              >
                📨
              </button>
            </div>
            <div className="text-[9px] text-white/30 mt-2 text-center">
              Enter para enviar • Ctrl+Enter para abrir • Esc para fechar
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
