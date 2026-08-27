import React, { useState, useEffect, useRef, useCallback } from 'react';

// ========== PARTICLE TYPES ==========
export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'gold' | 'mana' | 'hit' | 'soul' | 'spark' | 'ambient';
}

// ========== SCREEN SHAKE HOOK ==========
export function useScreenShake() {
  const [shake, setShake] = useState({ x: 0, y: 0, intensity: 0 });
  const frameRef = useRef<number>();

  const triggerShake = useCallback((intensity: number = 8) => {
    let start = Date.now();
    const duration = 400;

    const animate = () => {
      const elapsed = Date.now() - start;
      if (elapsed > duration) {
        setShake({ x: 0, y: 0, intensity: 0 });
        return;
      }
      const progress = elapsed / duration;
      const decay = 1 - progress;
      const x = (Math.random() - 0.5) * intensity * decay;
      const y = (Math.random() - 0.5) * intensity * decay;
      setShake({ x, y, intensity: decay });
      frameRef.current = requestAnimationFrame(animate);
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { shake, triggerShake };
}

// ========== PARTICLE SYSTEM HOOK ==========
export function useParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextIdRef = useRef(0);
  const frameRef = useRef<number>();

  const spawnParticles = useCallback((
    type: Particle['type'],
    x: number,
    y: number,
    count: number,
    colors: string[],
    options?: { spread?: number; speed?: number; size?: number }
  ) => {
    const { spread = 60, speed = 3, size = 4 } = options || {};
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const v = speed * (0.5 + Math.random() * 0.8);
      newParticles.push({
        id: nextIdRef.current++,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * v,
        vy: Math.sin(angle) * v - (type === 'gold' || type === 'mana' ? 2 : 0),
        size: size * (0.6 + Math.random() * 0.8),
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        maxLife: 0.6 + Math.random() * 0.4,
        type,
      });
    }

    setParticles(prev => [...prev, ...newParticles].slice(-100));
  }, []);

  // Animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      setParticles(prev => {
        const alive: Particle[] = [];
        for (const p of prev) {
          const newLife = p.life - dt / p.maxLife;
          if (newLife <= 0) continue;
          alive.push({
            ...p,
            x: p.x + p.vx * 60 * dt,
            y: p.y + p.vy * 60 * dt,
            vy: p.vy + (p.type === 'gold' || p.type === 'mana' ? 4 * dt : 0),
            vx: p.vx * (1 - dt * 2),
            life: newLife,
          });
        }
        return alive;
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { particles, spawnParticles };
}

// ========== EFFECT SPAWNERS ==========
export function spawnGoldBurst(spawn: (type: Particle['type'], x: number, y: number, count: number, colors: string[], options?: { spread?: number; speed?: number; size?: number }) => void, x: number, y: number, amount: number) {
  const count = Math.min(15, Math.max(5, Math.floor(Math.log2(amount + 1) * 3)));
  spawn('gold', x, y, count, ['#ffd700', '#ffaa00', '#ffcc44', '#e8a000', '#ffe066']);
}

export function spawnManaBurst(spawn: (type: Particle['type'], x: number, y: number, count: number, colors: string[], options?: { spread?: number; speed?: number; size?: number }) => void, x: number, y: number) {
  spawn('mana', x, y, 20, ['#aa55ff', '#cc88ff', '#8833dd', '#dd66ff', '#bb44ee']);
}

export function spawnHitImpact(spawn: (type: Particle['type'], x: number, y: number, count: number, colors: string[], options?: { spread?: number; speed?: number; size?: number }) => void, x: number, y: number) {
  spawn('hit', x, y, 6, ['#ffffff', '#ffee88', '#ffcc44', '#ff8844']);
}

export function spawnSoulExplosion(spawn: (type: Particle['type'], x: number, y: number, count: number, colors: string[], options?: { spread?: number; speed?: number; size?: number }) => void, x: number, y: number, isBoss: boolean) {
  const count = isBoss ? 30 : 12;
  const colors = isBoss
    ? ['#ff3333', '#ff6666', '#ffaa44', '#ffffff', '#ff4488']
    : ['#aabbcc', '#8899aa', '#ccddeeff', '#ffffff'];
  spawn('soul', x, y, count, colors, { spread: 80, speed: isBoss ? 5 : 3 });
}

export function spawnSparkle(spawn: (type: Particle['type'], x: number, y: number, count: number, colors: string[], options?: { spread?: number; speed?: number; size?: number }) => void, x: number, y: number) {
  spawn('spark', x, y, 8, ['#ffffff', '#ffee88', '#ffe0cc'], { speed: 1.5, size: 3 });
}

// ========== PARTICLE RENDERER — PIXEL ART SQUARES ==========
export function ParticleRenderer({ particles }: { particles: Particle[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 30 }}>
      {particles.map(p => {
        const opacity = p.life;
        const scale = p.type === 'gold' ? 0.8 + p.life * 0.4 : p.life;

        // Pixel glow per type
        const glow = p.type === 'gold' ? `0 0 ${4 + p.size}px ${p.color}`
          : p.type === 'mana' ? `0 0 ${6 + p.size}px ${p.color}`
          : p.type === 'soul' ? `0 0 ${4 + p.size}px ${p.color}`
          : undefined;

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity,
              transform: `scale(${scale})`,
              boxShadow: glow,
            }}
          />
        );
      })}
    </div>
  );
}

// ========== SCREEN SHAKE WRAPPER ==========
export function ScreenShakeWrapper({
  shake,
  children,
}: {
  shake: { x: number; y: number; intensity: number };
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        transform: `translate(${shake.x}px, ${shake.y}px)`,
        transition: shake.intensity > 0 ? 'none' : 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
}

// ========== HIT FLASH OVERLAY ==========
export function HitFlash({ active, color = 'rgba(255,255,255,0.15)' }: { active: boolean; color?: string }) {
  if (!active) return null;
  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none animate-fade-in"
      style={{
        background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
      }}
    />
  );
}

// ========== BOSS INTRO EFFECT ==========
export function BossIntro({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 z-40 pointer-events-none">
      <div className="absolute inset-0 bg-black/40 animate-fade-in" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(200,0,0,0.3) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
    </div>
  );
}

// ========== DEATH EXPLOSION EFFECT ==========
export function DeathExplosion({ active, x, y }: { active: boolean; x: string; y: string }) {
  if (!active) return null;
  return (
    <div
      className="absolute z-30 pointer-events-none"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      <div className="w-16 h-16 bg-white/20 animate-ping" />
      <div className="absolute inset-0 w-16 h-16 bg-amber-400/15 animate-ping" style={{ animationDelay: '0.1s' }} />
    </div>
  );
}
