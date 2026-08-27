// ==========================================
// BOSSES SPRITES — Dungeon Idle Conquest
// ==========================================

import React from 'react';

// ========== SPRITE DATA POR BOSS ==========

export interface BossSpriteData {
  name: string;
  title: string;
  description: string;
  pixels: string;
  palette: Record<string, string>;
  glowColor: string;
  animationClass: string;
}

export const BOSS_SPRITES: Record<string, BossSpriteData> = {
  // ===== LORDE DAS SOMBRAS (TREVAS) =====
  Trevas: {
    name: 'Lorde das Sombras',
    title: 'O Devorador de Luz',
    description: 'Uma entidade de pura escuridão que existe há mais tempo que as estrelas.',
    glowColor: '#aa00ff',
    animationClass: 'boss-trevas-idle',
    palette: {
      outline: '#1a0a2a',
      body: '#2a0a3a',
      bodyDark: '#1a0020',
      bodyLight: '#5a2a7a',
      eye: '#ff0044',
      eyeGlow: '#ff3377',
      magic: '#aa00ff',
      magicGlow: '#cc44ff',
      shadow: '#0a0010',
      cloak: '#1a0a2a',
      crown: '#5a2a7a',
    },
    pixels: `
......OOOO......
.....OHHHHO.....
....OBBBBBO.....
....OBEABEO.....
...OBBBABBBO....
...OBBBBBBBO....
..OBBBBBBBBBO...
..OBBBBBBBBBO...
...OBBBBBBBO....
...OBBBBBBBO....
....OBBBBBO.....
.....OBBBO......
....CCOBBCC.....
...CCCCBBCCCC...
..CCCCCBBCCCCC..
..CCCCCBBCCCCC..
...CCCCBCCCC....
....OOBBBOO.....
.....OOOO.......
`,
  },

  // ===== SENHOR VULCÂNICO (VULCÂNICA) =====
  Vulcânica: {
    name: 'Senhor Vulcânico',
    title: 'Coração do Vulcão',
    description: 'O próprio vulcão ganhou forma e consciência. Cada erupção é uma de suas respirações.',
    glowColor: '#ff4400',
    animationClass: 'boss-vulcanica-idle',
    palette: {
      outline: '#2a0a0a',
      body: '#8a1a0a',
      bodyDark: '#5a0a00',
      bodyLight: '#cc3a1a',
      eye: '#ffaa00',
      eyeGlow: '#ffcc44',
      fire: '#ff4400',
      fireGlow: '#ff6622',
      lava: '#ff2200',
      armor: '#8a3a1a',
      crown: '#ff6600',
    },
    pixels: `
......OOOO......
.....OHHHHO.....
....OBBBBBO.....
....OBEABEO.....
...OBBBBABBBO....
...OBBBBBBBO....
..OBBBBBBBBBO...
..OBBBBBBBBBO...
...OBBBBBBBO....
...OBBBBBBBO....
....OBBBBBO.....
.....OBBBO......
....FFOBBOFF....
...FFFFBFFFF....
..FFFFFFBFFFFF..
..FFFFFFBFFFFF..
...FFFFBFFFF....
....OOBBBOO.....
.....OOOO.......
`,
  },

  // ===== REI DO GELO ETERNO (GLACIAL) =====
  Glacial: {
    name: 'Rei do Gelo Eterno',
    title: 'Monarca dos Frostlands',
    description: 'Um titã de gelo que governa os reinos congelados com punho de ferro.',
    glowColor: '#00ccff',
    animationClass: 'boss-glacial-idle',
    palette: {
      outline: '#0a1a2a',
      body: '#1a4a7a',
      bodyDark: '#0a2a5a',
      bodyLight: '#4a8acc',
      eye: '#00ccff',
      eyeGlow: '#44eeff',
      ice: '#88eeff',
      iceGlow: '#aaffff',
      frost: '#aaddff',
      armor: '#2a6a9a',
      crown: '#88eeff',
    },
    pixels: `
......OOOO......
.....OKKKHO.....
....OBBBBBO.....
....OBEABEO.....
...OBBBBABBBO....
...OBBBBBBBO....
..OBBBBBBBBBO...
..OBBBBBBBBBO...
...OBBBBBBBO....
...OBBBBBBBO....
....OBBBBBO.....
.....OBBBO......
....IIIBBIII....
...IIIIIBIIIII..
..IIIIIIIBIIIII.
..IIIIIIIBIIIII.
...IIIIIBIIIII..
....OOBBBOO.....
.....OOOO.......
`,
  },

  // ===== TITÃ DO ABISMO (ABISMO) =====
  Abismo: {
    name: 'Titã do Abismo',
    title: 'Lorde das Profundezas',
    description: 'A criatura mais antiga dos oceanos, com tentáculos que se estendem por milhares de metros.',
    glowColor: '#00ff88',
    animationClass: 'boss-abismo-idle',
    palette: {
      outline: '#0a0a1a',
      body: '#0a1a3a',
      bodyDark: '#000a20',
      bodyLight: '#2a4a7a',
      eye: '#00ff88',
      eyeGlow: '#44ffaa',
      tentacle: '#1a3a5a',
      tentacleGlow: '#2a5a8a',
      water: '#004466',
      armor: '#1a2a4a',
      crown: '#00ffaa',
    },
    pixels: `
......OOOO......
.....OHHHHO.....
....OBBBBBO.....
....OBEABEO.....
...OBBBBABBBO....
...OBBBBBBBO....
..OBBBBBBBBBO...
..OBBBBBBBBBO...
...OBBBBBBBO....
...OBBBBBBBO....
....OBBBBBO.....
.....OBBBO......
....TTTBBTTTT...
...TTTTTBBTTTT..
..TTTTTTTBBTTT..
..TTTTTTTBBTTT..
...TTTTTBBTTT...
....OOBBBOO.....
.....OOOO.......
`,
  },

  // ===== ARCANJO EXILADO (CELESTIAL) =====
  Celestial: {
    name: 'Arcanjo Exilado',
    title: 'O Caído da Luz',
    description: 'O maior dos anjos que se rebelou contra a ordem celestial. Sua luz agora é sombria.',
    glowColor: '#ffd700',
    animationClass: 'boss-celestial-idle',
    palette: {
      outline: '#2a2a0a',
      body: '#7a6a1a',
      bodyDark: '#5a4a0a',
      bodyLight: '#ccaa2a',
      eye: '#ffd700',
      eyeGlow: '#ffee44',
      wing: '#ffee88',
      wingGlow: '#ffffaa',
      halo: '#ffdd44',
      armor: '#aa8822',
      crown: '#ffee88',
    },
    pixels: `
......OOOO......
.....OHHHHO.....
....OBBBBBO.....
....OBEABEO.....
...OBBBBABBBO....
...OBBBBBBBO....
.WWBBBBBBBBBWW..
.WWWBBBBBBBBWWW.
..WWBBBBBBBBWW..
...OBBBBBBBO....
....OBBBBBO.....
.....OBBBO......
....AAABBAAA....
...AAAAABAAAAA..
..AAAAAAABAAAA..
..AAAAAAABAAAA..
...AAAAABAAAA...
....OOBBBOO.....
.....OOOO.......
`,
  },

  // ===== LICH SUPREMO (CRIPTA) =====
  Cripta: {
    name: 'Lich Supremo',
    title: 'Mestre da Necromancia',
    description: 'O maior necromante que já existiu. Sua alma está guardada em 7 frascos escondidos.',
    glowColor: '#00ff44',
    animationClass: 'boss-cripta-idle',
    palette: {
      outline: '#1a2a1a',
      body: '#2a4a2a',
      bodyDark: '#1a3a1a',
      bodyLight: '#4a7a4a',
      eye: '#00ff44',
      eyeGlow: '#44ff66',
      skull: '#d0e0d0',
      skullShadow: '#a0b0a0',
      magic: '#00ff44',
      armor: '#3a5a3a',
      crown: '#d0e0d0',
    },
    pixels: `
......OOOO......
.....OKKKHO.....
....OBBBBBO.....
....OBEABEO.....
...OBBBBABBBO....
...OBBBBBBBO....
..OBBBBBBBBBO...
..OBBBBBBBBBO...
...OBBBBBBBO....
...OBBBBBBBO....
....OBBBBBO.....
.....OBBBO......
....MMMBBMMM....
...MMMMMBMMMMM..
..MMMMMMMBMMMM..
..MMMMMMMBMMMM..
...MMMMMBMMMM...
....OOBBBOO.....
.....OOOO.......
`,
  },

  // ===== ARQUIDIABO (INFERNAL) =====
  Infernal: {
    name: 'Arquidiabo',
    title: 'Príncipe das Chamas',
    description: 'O demônio mais poderoso do inferno, com 6 asas de fogo e um exército de diabinhos.',
    glowColor: '#ff2200',
    animationClass: 'boss-infernal-idle',
    palette: {
      outline: '#2a0a00',
      body: '#8a2a00',
      bodyDark: '#5a1a00',
      bodyLight: '#cc5a22',
      eye: '#ffaa00',
      eyeGlow: '#ffcc44',
      fire: '#ff2200',
      fireGlow: '#ff4422',
      horn: '#aa3300',
      armor: '#aa3300',
      crown: '#ff4400',
    },
    pixels: `
....H.OOOO.H....
...HHOHHHHOHH...
....OBBBBBO.....
....OBEABEO.....
...OBBBBABBBO....
...OBBBBBBBO....
..OBBBBBBBBBO...
..OBBBBBBBBBO...
...OBBBBBBBO....
...OBBBBBBBO....
....OBBBBBO.....
.....OBBBO......
....FFOBBOFF....
...FFFFBFFFF....
..FFFFFFBFFFFF..
..FFFFFFBFFFFF..
...FFFFBFFFF....
....OOBBBOO.....
.....OOOO.......
`,
  },

  // ===== SENHOR DO VAZIO (DIMENSIONAL) =====
  Dimensional: {
    name: 'Senhor do Vazio',
    title: 'O Guardião do Nada',
    description: 'Uma entidade que habita entre as dimensões, controlando o vazio que separa os universos.',
    glowColor: '#ff00ff',
    animationClass: 'boss-dimensional-idle',
    palette: {
      outline: '#1a0a2a',
      body: '#5a1a8a',
      bodyDark: '#3a0a5a',
      bodyLight: '#8a3acc',
      eye: '#ff00ff',
      eyeGlow: '#ff44ff',
      void: '#2a0a4a',
      voidGlow: '#6a2aaa',
      portal: '#aa44ff',
      armor: '#6a2a9a',
      crown: '#ff44ff',
    },
    pixels: `
......OOOO......
.....OHHHHO.....
....OBBBBBO.....
....OBEABEO.....
...OBBBBABBBO....
...OBBBBBBBO....
..OBBBBBBBBBO...
..OBBBBBBBBBO...
...OBBBBBBBO....
...OBBBBBBBO....
....OBBBBBO.....
.....OBBBO......
....VVVBBVVV....
...VVVVVBVVVVV..
..VVVVVVVBVVVV..
..VVVVVVVBVVVV..
...VVVVVBVVVV...
....OOBBBOO.....
.....OOOO.......
`,
  },
};

// ========== COMPONENTE DE SPRITE DO BOSS ==========

interface BossSpriteProps {
  themeId: string;
  size?: number;
  animate?: boolean;
  isHit?: boolean;
  isDefeated?: boolean;
  className?: string;
}

const CHAR_TO_COLOR: Record<string, (palette: Record<string, string>) => string | null> = {
  'O': (p) => p.outline || '#000',
  'H': (p) => p.hair || p.horn || p.halo || '#333',
  'B': (p) => p.body || '#888',
  'A': (p) => p.bodyDark || '#555',
  'E': (p) => p.eye || '#000',
  'R': (p) => p.bodyLight || '#aaa',
  'W': (p) => p.wing || p.armor || null,
  'F': (p) => p.fire || p.magic || null,
  'I': (p) => p.ice || p.frost || null,
  'T': (p) => p.tentacle || null,
  'M': (p) => p.magic || p.tentacle || null,
  'V': (p) => p.void || p.portal || null,
  'K': (p) => p.skull || p.crown || '#999',
  'C': (p) => p.crown || p.armor || null,
  'P': (p) => p.portal || p.magic || null,
  'G': (p) => p.eyeGlow || '#ffd700',
};

export function BossSpriteNew({ themeId, size = 120, animate = true, isHit = false, isDefeated = false, className = '' }: BossSpriteProps) {
  const bossData = BOSS_SPRITES[themeId] || BOSS_SPRITES.Trevas;
  const lines = bossData.pixels.trim().split('\n').map(l => l.split(''));
  const pixelSize = size / 20;

  const rects: React.ReactNode[] = [];
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const ch = lines[y][x];
      if (ch === '.') continue;
      const colorFn = CHAR_TO_COLOR[ch];
      if (!colorFn) continue;
      const color = colorFn(bossData.palette);
      if (!color) continue;
      rects.push(
        <rect
          key={`boss-${x}-${y}`}
          x={x * pixelSize}
          y={y * pixelSize}
          width={pixelSize}
          height={pixelSize}
          fill={color}
        />
      );
    }
  }

  const idleClass = animate ? bossData.animationClass : '';
  const hitClass = isHit ? 'sprite-hit' : '';
  const defeatClass = isDefeated ? 'sprite-defeat' : '';

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`${idleClass} ${hitClass} ${defeatClass} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      <defs>
        <filter id={`boss-glow-${themeId}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#boss-glow-${themeId})`}>
        {rects}
      </g>
    </svg>
  );
}

export default BOSS_SPRITES;
