// ==========================================
// SISTEMA DE SONS — Dungeon Idle Conquest
// ==========================================

// Estado global do áudio
let audioContext: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isMuted = false;
let volume = 0.3;

// Inicializar AudioContext
function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);
    masterGain.gain.value = volume;
  }
  return audioContext;
}

// ========== CONTROLES DE ÁUDIO ==========

export function setVolume(v: number) {
  volume = Math.max(0, Math.min(1, v));
  if (masterGain) {
    masterGain.gain.value = isMuted ? 0 : volume;
  }
}

export function toggleMute() {
  isMuted = !isMuted;
  if (masterGain) {
    masterGain.gain.value = isMuted ? 0 : volume;
  }
  return isMuted;
}

export function setMuted(muted: boolean) {
  isMuted = muted;
  if (masterGain) {
    masterGain.gain.value = isMuted ? 0 : volume;
  }
}

export function getMuted(): boolean {
  return isMuted;
}

// ========== FUNÇÕES AUXILIARES ==========

function createOscillator(ctx: AudioContext, type: OscillatorType, freq: number, duration: number): OscillatorNode {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.value = freq;
  return osc;
}

function createGain(ctx: AudioContext, value: number): GainNode {
  const gain = ctx.createGain();
  gain.gain.value = value;
  return gain;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3, rampDown: boolean = true) {
  const ctx = getAudioContext();
  const osc = createOscillator(ctx, type, freq, duration);
  const gain = createGain(ctx, volume);
  
  osc.connect(gain);
  gain.connect(masterGain!);
  
  osc.start(ctx.currentTime);
  
  if (rampDown) {
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  }
  
  osc.stop(ctx.currentTime + duration);
}

function playChord(freqs: number[], duration: number, type: OscillatorType = 'sine', volume: number = 0.2) {
  freqs.forEach(freq => playTone(freq, duration, type, volume));
}

// ========== SOM DE HABILIDADES ==========

// ⚔️ Som de Dano (Guerreiro, Assassino)
export function playDamageSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Impacto grave + agudo
  playTone(150, 0.15, 'sawtooth', 0.4);
  setTimeout(() => playTone(200, 0.1, 'square', 0.3), 30);
  setTimeout(() => playTone(100, 0.2, 'sine', 0.2), 50);
}

// 💚 Som de Cura (Paladino, Curandeiro)
export function playHealSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Ascendente suave
  playTone(400, 0.3, 'sine', 0.25);
  setTimeout(() => playTone(500, 0.25, 'sine', 0.2), 100);
  setTimeout(() => playTone(600, 0.2, 'sine', 0.15), 200);
  setTimeout(() => playTone(800, 0.15, 'sine', 0.1), 300);
}

// 🔥 Som de Fogo (Mago)
export function playFireSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Ruido + tom descendente
  const noise = ctx.createBufferSource();
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.1));
  }
  noise.buffer = buffer;
  
  const noiseGain = createGain(ctx, 0.2);
  noise.connect(noiseGain);
  noiseGain.connect(masterGain!);
  noise.start(now);
  
  playTone(300, 0.2, 'sawtooth', 0.3);
  setTimeout(() => playTone(200, 0.3, 'sawtooth', 0.2), 100);
}

// 🛡️ Som de Escudo (Guerreiro, Curandeiro, Assassino)
export function playShieldSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Cristal / defesa
  playTone(800, 0.1, 'sine', 0.3);
  setTimeout(() => playTone(1000, 0.15, 'sine', 0.25), 50);
  setTimeout(() => playTone(1200, 0.2, 'triangle', 0.2), 100);
}

// 🎯 Som de Crítico (Arqueira)
export function playCritSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Agudo + impacto
  playTone(1200, 0.08, 'square', 0.3);
  setTimeout(() => playTone(800, 0.1, 'sawtooth', 0.25), 30);
  setTimeout(() => playTone(400, 0.15, 'sine', 0.2), 60);
}

// ⚡ Som de Velocidade (Mago)
export function playSpeedSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Ascendente rápido
  for (let i = 0; i < 5; i++) {
    setTimeout(() => playTone(400 + i * 200, 0.08, 'sine', 0.15), i * 40);
  }
}

// 💀 Som de Necromante
export function playNecroSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Grave + sombrio
  playTone(80, 0.4, 'sawtooth', 0.3);
  setTimeout(() => playTone(60, 0.5, 'sine', 0.25), 100);
  setTimeout(() => playTone(100, 0.3, 'triangle', 0.2), 200);
}

// 🔔 Som de Conquista
export function playAchievementSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Fanfarra
  playTone(523, 0.15, 'sine', 0.3); // C5
  setTimeout(() => playTone(659, 0.15, 'sine', 0.3), 150); // E5
  setTimeout(() => playTone(784, 0.15, 'sine', 0.3), 300); // G5
  setTimeout(() => playTone(1047, 0.3, 'sine', 0.35), 450); // C6
}

// 🎁 Som de Recompensa Diária
export function playDailyRewardSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Suave e agradável
  playTone(440, 0.2, 'sine', 0.2);
  setTimeout(() => playTone(554, 0.2, 'sine', 0.2), 150);
  setTimeout(() => playTone(659, 0.3, 'sine', 0.25), 300);
}

// 💰 Som de Ouro
export function playGoldSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Clink de moeda
  playTone(2000, 0.05, 'square', 0.15);
  setTimeout(() => playTone(2500, 0.08, 'square', 0.1), 30);
}

// 💎 Som de Mana
export function playManaSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Cristal mágico
  playTone(1000, 0.15, 'sine', 0.2);
  setTimeout(() => playTone(1500, 0.2, 'triangle', 0.15), 100);
  setTimeout(() => playTone(2000, 0.15, 'sine', 0.1), 200);
}

// ⬆️ Som de Level Up
export function playLevelUpSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Ascendente épico
  playTone(300, 0.15, 'sine', 0.25);
  setTimeout(() => playTone(400, 0.15, 'sine', 0.25), 100);
  setTimeout(() => playTone(500, 0.15, 'sine', 0.25), 200);
  setTimeout(() => playTone(600, 0.15, 'sine', 0.25), 300);
  setTimeout(() => playTone(800, 0.3, 'sine', 0.3), 400);
}

// 💀 Som de Morte
export function playDeathSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Descendente sombrio
  playTone(400, 0.3, 'sawtooth', 0.2);
  setTimeout(() => playTone(300, 0.3, 'sawtooth', 0.2), 150);
  setTimeout(() => playTone(200, 0.4, 'sine', 0.15), 300);
}

// 👹 Som de Boss
export function playBossSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  
  // Ameaçador
  playTone(80, 0.5, 'sawtooth', 0.3);
  setTimeout(() => playTone(60, 0.6, 'sawtooth', 0.25), 200);
  setTimeout(() => playTone(100, 0.4, 'square', 0.2), 400);
}

// ========== MAPA DE SONS POR HABILIDADE ==========

export const SKILL_SOUNDS: Record<string, () => void> = {
  // Guerreiro
  'warrior_berserk': playDamageSound,
  'warrior_shield_wall': playShieldSound,
  
  // Arqueira
  'archer_rain': playCritSound,
  'archer_eagle_eye': playSpeedSound,
  
  // Mago
  'mage_fireball': playFireSound,
  'mage_time_warp': playSpeedSound,
  
  // Paladino
  'paladin_holy_light': playHealSound,
  'paladin_consecration': playDamageSound,
  
  // Curandeiro
  'healer_rejuvenation': playHealSound,
  'healer_divine_shield': playShieldSound,
  
  // Assassino
  'assassin_shadow_strike': playDamageSound,
  'assassin_vanish': playShieldSound,
  
  // Necromante
  'necro_soul_harvest': playNecroSound,
  'necro_army_dead': playNecroSound,
};

// ========== TOCAR SOM POR HABILIDADE ==========

export function playSkillSound(skillId: string) {
  if (isMuted) return;
  const soundFn = SKILL_SOUNDS[skillId];
  if (soundFn) {
    soundFn();
  }
}

export default {
  setVolume,
  toggleMute,
  setMuted,
  getMuted,
  playSkillSound,
  playDamageSound,
  playHealSound,
  playFireSound,
  playShieldSound,
  playCritSound,
  playSpeedSound,
  playNecroSound,
  playAchievementSound,
  playDailyRewardSound,
  playGoldSound,
  playManaSound,
  playLevelUpSound,
  playDeathSound,
  playBossSound,
};
