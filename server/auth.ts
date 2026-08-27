import { Router, Request, Response } from 'express';
import {
  createUser,
  loginUser,
  verifyToken,
  saveGameToDb,
  loadGameFromDb,
  updateUserStats,
  getUserStats,
  getLeaderboard,
} from './db.js';

const router = Router();

// Middleware de autenticação
function authMiddleware(req: Request, res: Response, next: Function) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  const user = verifyToken(token);
  if (!user) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
    return;
  }

  (req as any).user = user;
  next();
}

// ========== ROTAS PÚBLICAS ==========

// Registro
router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password, nickname } = req.body;

  if (!username || !email || !password || !nickname) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    return;
  }

  const result = await createUser(username, email, password, nickname);
  
  if (result.success) {
    res.json({ 
      success: true, 
      user: result.user,
      message: 'Conta criada com sucesso! Faça login para jogar.' 
    });
  } else {
    res.status(400).json({ error: result.error });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    return;
  }

  const result = await loginUser(username, password);
  
  if (result.success) {
    res.json({ 
      success: true, 
      user: result.user,
      token: result.token 
    });
  } else {
    res.status(401).json({ error: result.error });
  }
});

// Leaderboard público
router.get('/leaderboard', (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const leaderboard = getLeaderboard(limit);
  res.json({ leaderboard });
});

// ========== ROTAS PROTEGIDAS (requerem token) ==========

// Verificar token
router.get('/me', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({ success: true, user });
});

// Salvar jogo
router.post('/save', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  const { saveData, stats } = req.body;

  if (!saveData) {
    res.status(400).json({ error: 'Dados do save são obrigatórios' });
    return;
  }

  const saved = saveGameToDb(user.id, saveData);
  
  if (saved && stats) {
    updateUserStats(user.id, stats);
  }

  if (saved) {
    res.json({ success: true, message: 'Jogo salvo com sucesso!' });
  } else {
    res.status(500).json({ error: 'Erro ao salvar jogo' });
  }
});

// Carregar jogo
router.get('/load', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  const saveData = loadGameFromDb(user.id);
  const stats = getUserStats(user.id);

  res.json({ 
    success: true, 
    saveData: saveData || {},
    stats 
  });
});

// Atualizar stats
router.post('/stats', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  const { stats } = req.body;

  if (!stats) {
    res.status(400).json({ error: 'Stats são obrigatórias' });
    return;
  }

  const updated = updateUserStats(user.id, stats);
  
  if (updated) {
    res.json({ success: true, message: 'Stats atualizadas!' });
  } else {
    res.status(500).json({ error: 'Erro ao atualizar stats' });
  }
});

// Buscar stats do usuário
router.get('/stats', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  const stats = getUserStats(user.id);
  res.json({ success: true, stats });
});

export default router;
