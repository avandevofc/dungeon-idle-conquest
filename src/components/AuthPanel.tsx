import React, { useState } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  nickname: string;
}

interface AuthPanelProps {
  onLogin: (user: User, token: string) => void;
  onGuestPlay: () => void;
}

// ========== ORNATE CORNER DECORATION ==========
function OrnateCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: -8, left: -8 },
    tr: { top: -8, right: -8, transform: 'scaleX(-1)' },
    bl: { bottom: -8, left: -8, transform: 'scaleY(-1)' },
    br: { bottom: -8, right: -8, transform: 'scale(-1,-1)' },
  };
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" className="absolute pointer-events-none" style={{ ...styles[position], zIndex: 2 }}>
      <path d="M2 34 L2 14 Q2 2 14 2 L34 2" stroke="rgba(168,85,247,0.6)" strokeWidth="2" fill="none" />
      <path d="M6 34 L6 16 Q6 6 16 6 L34 6" stroke="rgba(196,181,253,0.35)" strokeWidth="1" fill="none" />
      <circle cx="4" cy="4" r="3" fill="#a855f7" opacity="0.8" />
      <circle cx="4" cy="4" r="1.5" fill="#e9d5ff" />
    </svg>
  );
}

export function AuthPanel({ onLogin, onGuestPlay }: AuthPanelProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const accent = '#22d3ee'; // cyan accent

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();

        if (data.success) {
          localStorage.setItem('dic_token', data.token);
          localStorage.setItem('dic_user', JSON.stringify(data.user));
          onLogin(data.user, data.token);
        } else {
          setError(data.error || 'Erro ao fazer login');
        }
      } else {
        if (!email.includes('@')) {
          setError('Email inválido');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Senha deve ter pelo menos 6 caracteres');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password, nickname: nickname || username }),
        });
        const data = await res.json();

        if (data.success) {
          const loginRes = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });
          const loginData = await loginRes.json();

          if (loginData.success) {
            localStorage.setItem('dic_token', loginData.token);
            localStorage.setItem('dic_user', JSON.stringify(loginData.user));
            onLogin(loginData.user, loginData.token);
          }
        } else {
          setError(data.error || 'Erro ao criar conta');
        }
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" style={{ background: '#0a0a12' }}>
      {/* ===== BACKGROUND: Pixel-art castle ===== */}
      <div className="absolute inset-0">
        {/* Sky gradient: dark blue top -> purple -> sunset orange at horizon */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, #0d1024 0%, #141830 20%, #232048 40%, #3a2a55 55%, #5a3560 70%, #7a4460 82%, #8a5560 90%, #3a2530 100%)',
        }} />

        {/* Galaxy swirl */}
        <svg className="absolute" style={{ top: '2%', right: '18%', width: '340px', height: '180px', opacity: 0.75 }} viewBox="0 0 200 100">
          <defs>
            <radialGradient id="galaxy1" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#a8e6cf" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#7dd3fc" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="galaxy2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="50" rx="95" ry="30" fill="url(#galaxy1)" transform="rotate(-15 100 50)" />
          <ellipse cx="100" cy="50" rx="60" ry="18" fill="url(#galaxy2)" transform="rotate(-15 100 50)" />
          <ellipse cx="95" cy="48" rx="25" ry="8" fill="#e0f2fe" opacity="0.7" transform="rotate(-15 100 50)" />
        </svg>

        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(80)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white animate-pulse" style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 55}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }} />
          ))}
        </div>

        {/* Detailed castle */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 700" fill="none" preserveAspectRatio="xMidYMax slice" style={{ height: '100%' }}>
          {/* ===== FAR BACK TOWERS ===== */}
          {/* Tower far left */}
          <rect x="60" y="180" width="70" height="520" fill="#151322" />
          <polygon points="95,90 50,180 140,180" fill="#151322" />
          <rect x="88" y="60" width="14" height="35" fill="#151322" />
          <rect x="80" y="260" width="14" height="22" rx="6" fill="#fbbf24" opacity="0.5" />
          <rect x="98" y="340" width="14" height="22" rx="6" fill="#fbbf24" opacity="0.4" />

          {/* Tower back left-center */}
          <rect x="260" y="120" width="90" height="580" fill="#181528" />
          <polygon points="305,20 250,120 360,120" fill="#181528" />
          <rect x="297" y="-10" width="16" height="35" fill="#181528" />
          <rect x="285" y="200" width="16" height="24" rx="7" fill="#fbbf24" opacity="0.6" />
          <rect x="285" y="280" width="16" height="24" rx="7" fill="#fbbf24" opacity="0.35" />
          <rect x="285" y="380" width="16" height="24" rx="7" fill="#fbbf24" opacity="0.5" />

          {/* Central tall tower */}
          <rect x="620" y="40" width="120" height="660" fill="#1a1730" />
          <polygon points="680,-80 600,40 760,40" fill="#1a1730" />
          <rect x="668" y="-120" width="24" height="50" fill="#1a1730" />
          <rect x="655" y="140" width="20" height="28" rx="9" fill="#fbbf24" opacity="0.7" />
          <rect x="655" y="240" width="20" height="28" rx="9" fill="#fbbf24" opacity="0.4" />
          <rect x="655" y="340" width="20" height="28" rx="9" fill="#fbbf24" opacity="0.6" />
          <rect x="655" y="460" width="20" height="28" rx="9" fill="#fbbf24" opacity="0.35" />
          {/* battlement on central tower */}
          <rect x="610" y="30" width="16" height="20" fill="#1a1730" />
          <rect x="640" y="30" width="16" height="20" fill="#1a1730" />
          <rect x="672" y="30" width="16" height="20" fill="#1a1730" />
          <rect x="704" y="30" width="16" height="20" fill="#1a1730" />
          <rect x="734" y="30" width="16" height="20" fill="#1a1730" />

          {/* Tower back right-center */}
          <rect x="1080" y="140" width="95" height="560" fill="#181528" />
          <polygon points="1127,40 1070,140 1185,140" fill="#181528" />
          <rect x="1119" y="10" width="16" height="35" fill="#181528" />
          <rect x="1110" y="230" width="16" height="24" rx="7" fill="#fbbf24" opacity="0.55" />
          <rect x="1110" y="330" width="16" height="24" rx="7" fill="#fbbf24" opacity="0.4" />
          <rect x="1110" y="430" width="16" height="24" rx="7" fill="#fbbf24" opacity="0.5" />

          {/* Tower far right */}
          <rect x="1300" y="200" width="75" height="500" fill="#151322" />
          <polygon points="1338,110 1290,200 1385,200" fill="#151322" />
          <rect x="1330" y="80" width="14" height="35" fill="#151322" />
          <rect x="1322" y="290" width="14" height="22" rx="6" fill="#fbbf24" opacity="0.5" />
          <rect x="1340" y="380" width="14" height="22" rx="6" fill="#fbbf24" opacity="0.35" />

          {/* ===== MID TOWERS ===== */}
          <rect x="420" y="220" width="80" height="480" fill="#1d1935" />
          <polygon points="460,130 405,220 515,220" fill="#1d1935" />
          <rect x="452" y="100" width="16" height="35" fill="#1d1935" />
          <rect x="445" y="300" width="18" height="26" rx="8" fill="#fbbf24" opacity="0.6" />
          <rect x="445" y="400" width="18" height="26" rx="8" fill="#fbbf24" opacity="0.4" />
          {/* balcony */}
          <rect x="408" y="360" width="104" height="10" fill="#1d1935" />

          <rect x="930" y="230" width="85" height="470" fill="#1d1935" />
          <polygon points="972,140 918,230 1027,230" fill="#1d1935" />
          <rect x="964" y="110" width="16" height="35" fill="#1d1935" />
          <rect x="955" y="310" width="18" height="26" rx="8" fill="#fbbf24" opacity="0.6" />
          <rect x="955" y="410" width="18" height="26" rx="8" fill="#fbbf24" opacity="0.4" />
          <rect x="918" y="370" width="109" height="10" fill="#1d1935" />

          {/* ===== FRONT WALL with battlements ===== */}
          <rect x="0" y="480" width="1440" height="220" fill="#211d38" />
          {/* battlements */}
          {[...Array(19)].map((_, i) => (
            <rect key={i} x={i * 78} y="450" width="46" height="34" fill="#211d38" />
          ))}
          {/* wall texture hint */}
          {[...Array(8)].map((_, r) => (
            <div key={r} />
          ))}
          {/* arched windows on wall */}
          <rect x="180" y="540" width="20" height="30" rx="10" fill="#fbbf24" opacity="0.45" />
          <rect x="360" y="540" width="20" height="30" rx="10" fill="#fbbf24" opacity="0.35" />
          <rect x="540" y="540" width="20" height="30" rx="10" fill="#fbbf24" opacity="0.45" />
          <rect x="880" y="540" width="20" height="30" rx="10" fill="#fbbf24" opacity="0.45" />
          <rect x="1060" y="540" width="20" height="30" rx="10" fill="#fbbf24" opacity="0.35" />
          <rect x="1240" y="540" width="20" height="30" rx="10" fill="#fbbf24" opacity="0.45" />

          {/* banners on wall */}
          <polygon points="330,480 330,560 345,548 360,560 360,480" fill="#7a2850" opacity="0.85" />
          <polygon points="1080,480 1080,560 1095,548 1110,560 1110,480" fill="#7a2850" opacity="0.85" />

          {/* ===== CENTRAL GATE ===== */}
          <path d="M640 700 L640 560 Q720 480 800 560 L800 700 Z" fill="#12101f" />
          <path d="M655 700 L655 570 Q720 505 785 570 L785 700 Z" fill="#1a1628" />
          {/* gate bars */}
          {[...Array(6)].map((_, i) => (
            <rect key={i} x={665 + i * 20} y="580" width="6" height="120" fill="#0c0a16" />
          ))}
          {/* torches beside gate */}
          <circle cx="630" cy="580" r="5" fill="#fbbf24" opacity="0.9" />
          <circle cx="810" cy="580" r="5" fill="#fbbf24" opacity="0.9" />
          <rect x="627" y="585" width="6" height="18" fill="#2a2438" />
          <rect x="807" y="585" width="6" height="18" fill="#2a2438" />

          {/* Sunset glow at horizon */}
          <rect x="0" y="640" width="1440" height="60" fill="url(#sunsetGlow)" opacity="0.4" />
          <defs>
            <linearGradient id="sunsetGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff9a56" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff9a56" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Foreground ground */}
          <rect x="0" y="690" width="1440" height="10" fill="#0e0c18" />
        </svg>
      </div>

      {/* ===== AUTH CARD with ornate frame ===== */}
      <div className="relative z-10 w-full max-w-[420px] mx-4 animate-fade-in">
        <div className="relative rounded-2xl p-8" style={{
          background: 'rgba(18, 16, 32, 0.82)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7), 0 0 50px rgba(139, 92, 246, 0.15), inset 0 0 40px rgba(0,0,0,0.3)',
        }}>
          <OrnateCorner position="tl" />
          <OrnateCorner position="tr" />
          <OrnateCorner position="bl" />
          <OrnateCorner position="br" />

          {/* Logo */}
          <div className="text-center mb-5">
            <div className="inline-block mb-2" style={{ filter: 'drop-shadow(0 0 16px rgba(236, 72, 153, 0.5))' }}>
              <span className="text-5xl">🏰</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight" style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 40%, #fb923c 70%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
              filter: 'drop-shadow(0 2px 8px rgba(251, 191, 36, 0.25))',
            }}>
              Dungeon Idle Conquest
            </h1>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Derrote monstros, evolua heróis, conquiste dungeons!
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-1 mb-5 p-1 rounded-xl" style={{ background: 'rgba(0,0,0,0.35)' }}>
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={mode === 'login' ? {
                background: 'rgba(34, 211, 238, 0.12)',
                color: accent,
                border: `1px solid ${accent}55`,
                boxShadow: `0 0 12px ${accent}22`,
              } : {
                color: 'rgba(255,255,255,0.35)',
                border: '1px solid transparent',
              }}
            >
              Entrar
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={mode === 'register' ? {
                background: 'rgba(34, 211, 238, 0.12)',
                color: accent,
                border: `1px solid ${accent}55`,
                boxShadow: `0 0 12px ${accent}22`,
              } : {
                color: 'rgba(255,255,255,0.35)',
                border: '1px solid transparent',
              }}
            >
              Criar Conta
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#f1f5f9',
                  }}
                  onFocus={(e) => e.target.style.borderColor = `${accent}66`}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {mode === 'login' ? 'Usuário ou Email' : 'Nome de Usuário'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#f1f5f9',
                }}
                onFocus={(e) => e.target.style.borderColor = `${accent}66`}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                placeholder="seu_usuario"
                required
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Nickname (como aparece no jogo)</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#f1f5f9',
                  }}
                  onFocus={(e) => e.target.style.borderColor = `${accent}66`}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  placeholder="Seu Herói"
                  required
                />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>Senha</label>
                {mode === 'login' && (
                  <button type="button" className="text-xs" style={{ color: `${accent}99` }}>
                    Esqueci minha senha
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 pr-11 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#f1f5f9',
                  }}
                  onFocus={(e) => e.target.style.borderColor = `${accent}66`}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-sm"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-center py-2.5 px-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.12)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              style={{
                background: loading
                  ? 'rgba(34,211,238,0.3)'
                  : 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 50%, #06b6d4 100%)',
                color: '#062028',
                boxShadow: loading ? 'none' : '0 4px 24px rgba(34, 211, 238, 0.4)',
              }}
            >
              {loading ? '⏳ Processando...' : mode === 'login' ? '🔑 Entrar' : '⚔️ Criar Conta'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>ou</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Guest Play */}
          <button
            onClick={onGuestPlay}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.01]"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            👤 Jogar como Visitante
          </button>

          {/* Footer */}
          <p className="text-center mt-3 text-[10px]" style={{ color: 'rgba(255,255,255,0.22)' }}>
            {mode === 'login'
              ? 'Seus dados serão salvos na nuvem ☁️'
              : 'Crie uma conta para salvar progresso na nuvem'}
          </p>
        </div>
      </div>
    </div>
  );
}
