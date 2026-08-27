import { useEffect, useRef, useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface OnlinePlayer {
  id: string;
  nickname: string;
  dungeon: number;
  stage: number;
  dps: number;
  totalKills: number;
  powerLevel: number;
  joinedAt: number;
}

export interface ChatMessage {
  id: string;
  playerId: string;
  nickname: string;
  text: string;
  timestamp: number;
  type: 'message' | 'system' | 'join' | 'leave';
}

interface UseSocketReturn {
  isConnected: boolean;
  onlinePlayers: OnlinePlayer[];
  chatMessages: ChatMessage[];
  sendMessage: (text: string) => void;
  updateProgress: (data: { dungeon: number; stage: number; dps: number; totalKills: number; powerLevel: number }) => void;
}

export function useSocket(nickname: string): UseSocketReturn {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlinePlayers, setOnlinePlayers] = useState<OnlinePlayer[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const nicknameRef = useRef(nickname);
  nicknameRef.current = nickname;

  useEffect(() => {
    // Conectar ao servidor
    const serverUrl = window.location.origin;
    const socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🔌 Conectado ao servidor!');
      setIsConnected(true);

      // Enviar join com nickname
      socket.emit('player:join', {
        nickname: nicknameRef.current,
        dungeon: 1,
        stage: 1,
        dps: 0,
        totalKills: 0,
        powerLevel: 0,
      });
    });

    socket.on('disconnect', () => {
      console.log('❌ Desconectado do servidor');
      setIsConnected(false);
    });

    socket.on('players:online', (players: OnlinePlayer[]) => {
      setOnlinePlayers(players);
    });

    socket.on('chat:history', (history: ChatMessage[]) => {
      setChatMessages(history);
    });

    socket.on('chat:message', (msg: ChatMessage) => {
      setChatMessages(prev => [...prev.slice(-99), msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [nickname]);

  const sendMessage = useCallback((text: string) => {
    if (socketRef.current && text.trim()) {
      socketRef.current.emit('chat:send', { text: text.trim() });
    }
  }, []);

  const updateProgress = useCallback((data: { dungeon: number; stage: number; dps: number; totalKills: number; powerLevel: number }) => {
    if (socketRef.current) {
      socketRef.current.emit('player:update', data);
    }
  }, []);

  return {
    isConnected,
    onlinePlayers,
    chatMessages,
    sendMessage,
    updateProgress,
  };
}
