// ==========================================
// MONSTER DISCOVERY NOTIFICATION
// Animação épica quando um monstro novo é descoberto
// ==========================================

import React, { useEffect, useState } from 'react';
import { MonsterSprite } from './MonsterSprite';
import { RARITY_COLORS, RARITY_LABELS, MonsterCollectionEntry } from '../data/monsterCollection';

interface MonsterDiscoveryNotificationProps {
  monster: MonsterCollectionEntry | null;
  onDismiss: () => void;
}

export function MonsterDiscoveryNotification({ monster, onDismiss }: MonsterDiscoveryNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (monster) {
      // Entrance animation
      setTimeout(() => setIsVisible(true), 50);
      // Show details after sprite appears
      setTimeout(() => setShowDetails(true), 600);
      // Auto-dismiss after 4 seconds
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onDismiss, 500);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [monster, onDismiss]);

  if (!monster) return null;

  const rarityColor = RARITY_COLORS[monster.rarity] || '#94a3b8';
  const rarityLabel = RARITY_LABELS[monster.rarity] || 'Comum';

  // Sprite key mapping (simplified)
  const getSpriteKey = (name: string): string => {
    const map: Record<string, string> = {
      'Morcego Sombrio': 'bat', 'Araknis Noturno': 'spider', 'Esqueleto Velho': 'skeleton',
      'Goblin das Trevas': 'goblin', 'Lobo Nublido': 'wolf', 'Elemental de Fogo': 'elemental',
      'Golem de Ébano': 'golem', 'Drake de Fogo': 'dragon', 'Espírito Errante': 'ghost',
      'Cobra Negra': 'snake', 'Pinguinho Rebelde': 'slime', 'Salamandra': 'mushroom',
      'Peixe-Lanterna': 'eye', 'Engolidor': 'mimic', 'Pit Fiend Jr.': 'dragon',
      'Cavaleiro Maldito': 'skeleton', 'Lich Supremo': 'skeleton',
      'Arquidiabo': 'dragon', 'Lorde das Sombras': 'ghost',
    };
    return map[name] || 'slime';
  };

  const bonusText = {
    dps: `⚔️ +${monster.bonus.value}% DPS`,
    gold: `🪙 +${monster.bonus.value}% Ouro`,
    hp: `❤️ +${monster.bonus.value}% HP`,
    critChance: `💥 +${monster.bonus.value}% Crítico`,
    critDmg: `🔥 +${monster.bonus.value}% Dano Crítico`,
    mana: `💎 +${monster.bonus.value}% Mana`,
  }[monster.bonus.type];

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${
        isVisible && !isExiting ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ background: isVisible && !isExiting ? 'rgba(0,0,0,0.7)' : 'transparent', pointerEvents: isVisible && !isExiting ? 'auto' : 'none' }}
      onClick={() => {
        setIsExiting(true);
        setTimeout(onDismiss, 500);
      }}
    >
      <div
        className={`relative transition-all duration-500 ${
          isVisible && !isExiting ? 'scale-100 translate-y-0' : 'scale-50 translate-y-10'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl animate-pulse"
          style={{
            background: `radial-gradient(circle, ${rarityColor}33 0%, transparent 70%)`,
            filter: 'blur(20px)',
            transform: 'scale(1.5)',
          }}
        />

        {/* Main card */}
        <div
          className="relative px-8 py-6 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(180deg, #0c0c1a 0%, #0a0a15 100%)',
            border: `2px solid ${rarityColor}66`,
            boxShadow: `0 0 40px ${rarityColor}44, inset 0 0 20px ${rarityColor}11`,
          }}
        >
          {/* "NEW!" badge */}
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-black tracking-wider"
            style={{
              background: `linear-gradient(135deg, ${rarityColor}, ${rarityColor}cc)`,
              color: '#000',
              boxShadow: `0 0 20px ${rarityColor}88`,
            }}
          >
            ✨ NOVO! ✨
          </div>

          {/* Sparkle particles */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-ping"
                style={{
                  background: rarityColor,
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${0.8 + Math.random() * 0.4}s`,
                }}
              />
            ))}
          </div>

          {/* Sprite */}
          <div className="flex justify-center mb-4 mt-2">
            <div
              className="w-24 h-24 rounded-xl flex items-center justify-center"
              style={{
                background: `${rarityColor}11`,
                border: `2px solid ${rarityColor}44`,
                boxShadow: `0 0 30px ${rarityColor}33`,
              }}
            >
              <MonsterSprite monsterType={getSpriteKey(monster.name)} size={80} animate={true} />
            </div>
          </div>

          {/* Monster name */}
          <h3
            className="text-xl font-black mb-1 tracking-wide"
            style={{ color: rarityColor }}
          >
            {monster.name}
          </h3>

          {/* Rarity badge */}
          <div
            className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold mb-3"
            style={{
              background: `${rarityColor}22`,
              color: rarityColor,
              border: `1px solid ${rarityColor}44`,
            }}
          >
            {rarityLabel}
          </div>

          {/* Details */}
          {showDetails && (
            <div className="animate-fade-in space-y-2">
              {/* Description */}
              <p className="text-[11px] text-[#94a3b8] italic">
                {monster.description}
              </p>

              {/* Bonus */}
              <div
                className="inline-block px-4 py-2 rounded-xl text-sm font-bold"
                style={{
                  background: `${rarityColor}15`,
                  color: rarityColor,
                  border: `1px solid ${rarityColor}33`,
                }}
              >
                {bonusText} PERMANENTE!
              </div>
            </div>
          )}

          {/* Click to dismiss */}
          <div
            className="mt-4 text-[9px] text-[#475569] animate-pulse cursor-pointer hover:text-[#94a3b8] transition-colors"
            onClick={() => {
              setIsExiting(true);
              setTimeout(onDismiss, 500);
            }}
          >
            Clique para fechar
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonsterDiscoveryNotification;
