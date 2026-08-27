import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import authRouter from './server/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========== ONLINE STATE ==========
interface OnlinePlayer {
  id: string;
  nickname: string;
  dungeon: number;
  stage: number;
  dps: number;
  totalKills: number;
  powerLevel: number;
  joinedAt: number;
}

interface ChatMessage {
  id: string;
  playerId: string;
  nickname: string;
  text: string;
  timestamp: number;
  type: 'message' | 'system' | 'join' | 'leave';
}

const onlinePlayers = new Map<string, OnlinePlayer>();
const chatHistory: ChatMessage[] = [];
const MAX_CHAT_HISTORY = 100;
let messageIdCounter = 0;

function broadcastPlayerList(io: Server) {
  const players = Array.from(onlinePlayers.values());
  io.emit('players:online', players);
}

function broadcastChatHistory(io: Server, socketId: string) {
  const targetSocket = io.sockets.sockets.get(socketId);
  if (targetSocket) {
    targetSocket.emit('chat:history', chatHistory.slice(-50));
  }
}

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const PORT = 3002;

  // Socket.IO setup
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  // ========== API ROUTES (must be BEFORE Vite middleware) ==========
  app.use(express.json());
  app.use('/api/auth', authRouter);
  
  app.get('/api/online', (_req, res) => {
    res.json({ count: onlinePlayers.size, players: Array.from(onlinePlayers.values()) });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // ========== SOCKET.IO EVENTS ==========
  io.on('connection', (socket) => {
    console.log(`🔌 Jogador conectado: ${socket.id}`);

    // Player joins with nickname
    socket.on('player:join', (data: { nickname: string; dungeon: number; stage: number; dps: number; totalKills: number; powerLevel: number }) => {
      const player: OnlinePlayer = {
        id: socket.id,
        nickname: data.nickname || 'Herói Anônimo',
        dungeon: data.dungeon || 1,
        stage: data.stage || 1,
        dps: data.dps || 0,
        totalKills: data.totalKills || 0,
        powerLevel: data.powerLevel || 0,
        joinedAt: Date.now(),
      };

      onlinePlayers.set(socket.id, player);
      
      // System message
      const joinMsg: ChatMessage = {
        id: String(++messageIdCounter),
        playerId: socket.id,
        nickname: player.nickname,
        text: `${player.nickname} entrou no servidor! 🏰`,
        timestamp: Date.now(),
        type: 'join',
      };
      chatHistory.push(joinMsg);
      if (chatHistory.length > MAX_CHAT_HISTORY) chatHistory.shift();

      io.emit('chat:message', joinMsg);
      broadcastPlayerList(io);
      broadcastChatHistory(io, socket.id);

      console.log(`🎮 ${player.nickname} entrou! (${onlinePlayers.size} online)`);
    });

    // Player updates their progress
    socket.on('player:update', (data: { dungeon: number; stage: number; dps: number; totalKills: number; powerLevel: number }) => {
      const player = onlinePlayers.get(socket.id);
      if (player) {
        player.dungeon = data.dungeon;
        player.stage = data.stage;
        player.dps = data.dps;
        player.totalKills = data.totalKills;
        player.powerLevel = data.powerLevel;
        broadcastPlayerList(io);
      }
    });

    // Chat message
    socket.on('chat:send', (data: { text: string }) => {
      const player = onlinePlayers.get(socket.id);
      if (!player || !data.text || data.text.trim().length === 0) return;

      const text = data.text.trim().slice(0, 200); // Limit message length
      const msg: ChatMessage = {
        id: String(++messageIdCounter),
        playerId: socket.id,
        nickname: player.nickname,
        text,
        timestamp: Date.now(),
        type: 'message',
      };

      chatHistory.push(msg);
      if (chatHistory.length > MAX_CHAT_HISTORY) chatHistory.shift();

      io.emit('chat:message', msg);
      console.log(`💬 ${player.nickname}: ${text}`);
    });

    // Player disconnects
    socket.on('disconnect', () => {
      const player = onlinePlayers.get(socket.id);
      if (player) {
        const leaveMsg: ChatMessage = {
          id: String(++messageIdCounter),
          playerId: socket.id,
          nickname: player.nickname,
          text: `${player.nickname} saiu do servidor 👋`,
          timestamp: Date.now(),
          type: 'leave',
        };
        chatHistory.push(leaveMsg);
        if (chatHistory.length > MAX_CHAT_HISTORY) chatHistory.shift();

        io.emit('chat:message', leaveMsg);
        onlinePlayers.delete(socket.id);
        broadcastPlayerList(io);

        console.log(`👋 ${player.nickname} saiu! (${onlinePlayers.size} online)`);
      }
    });
  });

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 Dungeon Idle Conquest rodando em http://localhost:${PORT}`);
    console.log(`🔌 Socket.IO habilitado para chat em tempo real`);
    console.log(`👥 ${onlinePlayers.size} jogadores online`);
  });
}

startServer();
