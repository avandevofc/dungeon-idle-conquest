import { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  nickname: string;
}

interface UseAuthReturn {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  saveGame: (saveData: any, stats?: any) => Promise<boolean>;
  loadGame: () => Promise<any | null>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('dic_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('dic_token');
  });
  const [isLoading, setIsLoading] = useState(true);

  // Verificar token ao carregar
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (data.success && data.user) {
          setUser(data.user);
        } else {
          // Token inválido
          localStorage.removeItem('dic_token');
          localStorage.removeItem('dic_user');
          setToken(null);
          setUser(null);
        }
      } catch {
        // Erro de conexão - manter login local
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = useCallback((user: User, token: string) => {
    setUser(user);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('dic_token');
    localStorage.removeItem('dic_user');
    setUser(null);
    setToken(null);
  }, []);

  const saveGame = useCallback(async (saveData: any, stats?: any): Promise<boolean> => {
    if (!token) return false;

    try {
      const res = await fetch('/api/auth/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ saveData, stats }),
      });
      const data = await res.json();
      return data.success;
    } catch {
      return false;
    }
  }, [token]);

  const loadGame = useCallback(async (): Promise<any | null> => {
    if (!token) return null;

    try {
      const res = await fetch('/api/auth/load', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      return data.success ? data.saveData : null;
    } catch {
      return null;
    }
  }, [token]);

  return {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
    saveGame,
    loadGame,
  };
}
