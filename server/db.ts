import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';
import fs from 'fs';

// Funciona tanto em ESM quanto em CJS (production bundle)
let __dirname: string;
try {
  __dirname = path.dirname(new URL(import.meta.url).pathname);
} catch {
  __dirname = process.cwd();
}

const DB_PATH = path.join(__dirname, 'data', 'game.db');

// Criar diretório de dados se não existir
import fs from 'fs';
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(DB_PATH);

// Habilitar WAL mode para melhor performance
db.pragma('journal_mode = WAL');

// Criar tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nickname TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS game_saves (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    save_data TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS user_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    total_playtime INTEGER DEFAULT 0,
    highest_power_level INTEGER DEFAULT 0,
    total_dungeons_completed INTEGER DEFAULT 0,
    total_ascensions INTEGER DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

// ========== USER OPERATIONS ==========

export interface User {
  id: number;
  username: string;
  email: string;
  nickname: string;
  created_at: string;
  last_login: string;
}

export interface CreateUserResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface LoginResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// Criar usuário
export async function createUser(
  username: string,
  email: string,
  password: string,
  nickname: string
): Promise<CreateUserResult> {
  try {
    // Validar inputs
    if (username.length < 3 || username.length > 20) {
      return { success: false, error: 'Nome de usuário deve ter 3-20 caracteres' };
    }
    if (email.length < 5 || !email.includes('@')) {
      return { success: false, error: 'Email inválido' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Senha deve ter pelo menos 6 caracteres' };
    }
    if (nickname.length < 2 || nickname.length > 20) {
      return { success: false, error: 'Nickname deve ter 2-20 caracteres' };
    }

    // Verificar se username ou email já existem
    const existingUser = db.prepare(
      'SELECT id FROM users WHERE username = ? OR email = ?'
    ).get(username, email);

    if (existingUser) {
      return { success: false, error: 'Usuário ou email já cadastrado' };
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // Inserir usuário
    const result = db.prepare(
      'INSERT INTO users (username, email, password_hash, nickname) VALUES (?, ?, ?, ?)'
    ).run(username, email, passwordHash, nickname);

    const user: User = {
      id: result.lastInsertRowid as number,
      username,
      email,
      nickname,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };

    // Criar stats iniciais
    db.prepare(
      'INSERT INTO user_stats (user_id) VALUES (?)'
    ).run(user.id);

    // Criar save vazio
    db.prepare(
      'INSERT INTO game_saves (user_id, save_data) VALUES (?, ?)'
    ).run(user.id, '{}');

    return { success: true, user };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return { success: false, error: 'Erro interno do servidor' };
  }
}

// Login
export async function loginUser(
  usernameOrEmail: string,
  password: string
): Promise<LoginResult> {
  try {
    // Buscar usuário
    const user = db.prepare(
      'SELECT * FROM users WHERE username = ? OR email = ?'
    ).get(usernameOrEmail, usernameOrEmail) as any;

    if (!user) {
      return { success: false, error: 'Usuário não encontrado' };
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return { success: false, error: 'Senha incorreta' };
    }

    // Atualizar último login
    db.prepare(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(user.id);

    const userData: User = {
      id: user.id,
      username: user.username,
      email: user.email,
      nickname: user.nickname,
      created_at: user.created_at,
      last_login: new Date().toISOString(),
    };

    // Gerar token simples (em produção, usar JWT)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

    return { success: true, user: userData, token };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return { success: false, error: 'Erro interno do servidor' };
  }
}

// Verificar token
export function verifyToken(token: string): User | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [userId, timestamp] = decoded.split(':');
    
    // Token válido por 30 dias
    const age = Date.now() - parseInt(timestamp);
    if (age > 30 * 24 * 60 * 60 * 1000) {
      return null;
    }

    const user = db.prepare(
      'SELECT * FROM users WHERE id = ?'
    ).get(parseInt(userId)) as any;

    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      nickname: user.nickname,
      created_at: user.created_at,
      last_login: user.last_login,
    };
  } catch {
    return null;
  }
}

// ========== SAVE OPERATIONS ==========

// Salvar jogo
export function saveGameToDb(userId: number, saveData: any): boolean {
  try {
    const saveJson = JSON.stringify(saveData);
    db.prepare(
      'UPDATE game_saves SET save_data = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?'
    ).run(saveJson, userId);
    return true;
  } catch (error) {
    console.error('Erro ao salvar jogo:', error);
    return false;
  }
}

// Carregar jogo
export function loadGameFromDb(userId: number): any | null {
  try {
    const save = db.prepare(
      'SELECT save_data FROM game_saves WHERE user_id = ?'
    ).get(userId) as any;

    if (!save) return null;
    return JSON.parse(save.save_data);
  } catch (error) {
    console.error('Erro ao carregar jogo:', error);
    return null;
  }
}

// ========== STATS OPERATIONS ==========

export interface UserStats {
  total_playtime: number;
  highest_power_level: number;
  total_dungeons_completed: number;
  total_ascensions: number;
}

// Atualizar stats
export function updateUserStats(userId: number, stats: Partial<UserStats>): boolean {
  try {
    const current = db.prepare(
      'SELECT * FROM user_stats WHERE user_id = ?'
    ).get(userId) as any;

    if (!current) return false;

    db.prepare(`
      UPDATE user_stats SET
        total_playtime = MAX(total_playtime, ?),
        highest_power_level = MAX(highest_power_level, ?),
        total_dungeons_completed = MAX(total_dungeons_completed, ?),
        total_ascensions = MAX(total_ascensions, ?),
        last_updated = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `).run(
      stats.total_playtime ?? current.total_playtime,
      stats.highest_power_level ?? current.highest_power_level,
      stats.total_dungeons_completed ?? current.total_dungeons_completed,
      stats.total_ascensions ?? current.total_ascensions,
      userId
    );

    return true;
  } catch (error) {
    console.error('Erro ao atualizar stats:', error);
    return false;
  }
}

// Buscar stats
export function getUserStats(userId: number): UserStats | null {
  try {
    const stats = db.prepare(
      'SELECT * FROM user_stats WHERE user_id = ?'
    ).get(userId) as any;

    if (!stats) return null;

    return {
      total_playtime: stats.total_playtime,
      highest_power_level: stats.highest_power_level,
      total_dungeons_completed: stats.total_dungeons_completed,
      total_ascensions: stats.total_ascensions,
    };
  } catch (error) {
    console.error('Erro ao buscar stats:', error);
    return null;
  }
}

// Buscar leaderboard
export function getLeaderboard(limit: number = 10): Array<{
  username: string;
  nickname: string;
  highest_power_level: number;
  total_dungeons_completed: number;
}> {
  try {
    return db.prepare(`
      SELECT u.username, u.nickname, s.highest_power_level, s.total_dungeons_completed
      FROM user_stats s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.highest_power_level DESC
      LIMIT ?
    `).all(limit) as any[];
  } catch (error) {
    console.error('Erro ao buscar leaderboard:', error);
    return [];
  }
}

export default db;
