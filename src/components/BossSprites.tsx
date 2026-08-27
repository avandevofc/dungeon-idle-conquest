// ==========================================
// BOSSES SPRITES — Pixel Art RPG Épico
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
      outline: '#0a0015', body: '#1a0a2a', bodyDark: '#0a0018', bodyLight: '#3a1a5a',
      eye: '#ff0044', eyeGlow: '#ff3377', eyeInner: '#ff88aa',
      magic: '#aa00ff', magicGlow: '#cc44ff', magicDark: '#7700cc',
      shadow: '#050008', cloak: '#1a0a2a', cloakDark: '#0a0018',
      crown: '#5a2a7a', crownGlow: '#8844aa',
      wing: '#2a0a3a', wingMembrane: '#4a1a6a',
    },
    pixels: `
......OOOO......
.....OKKKHO.....
....OBBBBBO.....
....OBEABEO.....
...OBBBBABBBO...
...OBBBBBBBO....
..OBBBBBBBBBO...
.WBBBBBBBBBWW...
.WWWBBBBBBWWW...
..WWBBBBBBBBWW..
...OBBBBBBBO....
....OBBBBBO.....
.....OBBBO......
....MMOBBOMM....
...MMMMBBBBMM...
...MMMMMMMMMM...
....MMMMMM......
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
      outline: '#1a0500', body: '#6a1a0a', bodyDark: '#3a0800', bodyLight: '#aa3a1a',
      eye: '#ffaa00', eyeGlow: '#ffcc44', eyeInner: '#ff4400',
      fire: '#ff4400', fireDark: '#cc1100', fireLight: '#ffaa44', fireTip: '#ffee88',
      lava: '#ff2200', lavaGlow: '#ff6644',
      armor: '#7a3a1a', armorDark: '#4a1a00',
      crown: '#ff6600', crownGlow: '#ffaa44',
      horn: '#3a1a0a', hornTip: '#8a4a2a',
    },
    pixels: `
....H.OOOO.H....
...HHOHHHHOHH...
...OBBBBBBBBBO..
...OBBBBBBBBBO..
..OBBBBBBBBBO...
..OBEABEABEO....
...OBBBBBBBO....
...OBBBBBBBO....
....OBBBBBO.....
.....OBBBO......
....FFOBBOFF....
...FFFFBFFFF....
..FFFFFFBFFFFF..
..FF.FFFFF.FF...
.....OO.OO......
......O..O......
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
      outline: '#0a1a2a', body: '#1a4a7a', bodyDark: '#0a2a5a', bodyLight: '#4a8acc',
      eye: '#00ccff', eyeGlow: '#44eeff', eyeInner: '#0066aa',
      ice: '#88eeff', iceGlow: '#aaffff', iceDark: '#4488aa',
      frost: '#aaddff', frostGlow: '#ccf0ff',
      armor: '#2a6a9a', armorDark: '#1a4a7a',
      crown: '#88eeff', crownGlow: '#aaffff',
      crystal: '#66ccee', crystalGlow: '#88eeff',
    },
    pixels: `
....C.OOOO.C....
...CCOHHHHOCC...
...CBBBBBBBBBO..
...OBBBBBBBBBO..
..OBBBBBBBBBO...
..OBEABEABEO....
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
      outline: '#050a15', body: '#0a1a3a', bodyDark: '#050a20', bodyLight: '#1a3a6a',
      eye: '#00ff88', eyeGlow: '#44ffaa', eyeInner: '#008844',
      tentacle: '#0a2a4a', tentacleDark: '#051a30', tentacleSuck: '#1a4a6a',
      water: '#003355', waterGlow: '#006688',
      armor: '#0a1a2a', armorDark: '#050a15',
      crown: '#00ffaa', crownGlow: '#44ffcc',
      coral: '#0a3a4a', coralGlow: '#1a5a6a',
    },
    pixels: `
......OOOO......
.....OKKKHO.....
....OBBBBBO.....
....OBEABEO.....
...OBBBBABBBO...
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
      outline: '#2a2a05', body: '#7a6a1a', bodyDark: '#4a3a08', bodyLight: '#ccaa2a',
      eye: '#ffd700', eyeGlow: '#ffee44', eyeInner: '#aa8800',
      wing: '#ffee88', wingGlow: '#ffffaa', wingDark: '#ccaa44',
      halo: '#ffdd44', haloGlow: '#ffee88',
      armor: '#aa8822', armorDark: '#886611',
      crown: '#ffee88', crownGlow: '#ffffcc',
      feather: '#fff8cc', featherDark: '#ddcc88',
    },
    pixels: `
......OOOO......
.....OKKKHO.....
....OBBBBBO.....
....OBEABEO.....
...OBBBBABBBO...
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
`,
  },

  // ===== CRIPTA — DRAGÃO ESQUELÉTICO =====
  Cripta: {
    name: 'Dragão Esquelético',
    title: 'Chefe da Masmorra dos Mortos',
    description: 'Um antigo dragão esquelético ancestral que guarda a masmorra dos mortos. Seus ataques são devastadores: Sopro de Gelo e Garra de Osso.',
    glowColor: '#00ff44',
    animationClass: 'boss-cripta-idle',
    palette: {
      outline: '#0a1a0a', bone: '#e8e0d0', boneDark: '#b8a888', boneLight: '#f8f0e8',
      eye: '#ff2200', eyeGlow: '#ff6644', eyeInner: '#aa0000',
      wing: '#c8b898', wingDark: '#a89878', wingMembrane: '#d8c8a8',
      fire: '#00ff44', fireDark: '#00aa22', fireLight: '#44ff88', fireTip: '#88ffbb',
      horn: '#d8c8a8', hornTip: '#f0e8d0',
      claw: '#f0e8d0', clawTip: '#c8b898',
      rib: '#d0c0a0', ribDark: '#a89878',
      soul: '#00ff44', soulGlow: '#44ff88',
    },
    pixels: `
.....O....O.....
....OHO..OHO....
...OBBOWWWOOO...
..OBBBBBBBOO....
..OBEEO.........
..OBBBO.........
...OOO..OAAAO...
.....O.OJAAAO...
....O.OAAAAAAO..
...FF.OOOOOOOO..
..FFFF..OO.OO...
..FF............
................
................
................
................
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
      outline: '#1a0500', body: '#7a2200', bodyDark: '#4a0a00', bodyLight: '#aa4422',
      eye: '#ffaa00', eyeGlow: '#ffcc44', eyeInner: '#ff4400',
      fire: '#ff2200', fireDark: '#cc0000', fireLight: '#ff6644', fireTip: '#ffaa88',
      horn: '#8a3300', hornTip: '#cc5522', hornGlow: '#ff6644',
      armor: '#993300', armorDark: '#662200',
      crown: '#ff4400', crownGlow: '#ff8844',
      wing: '#6a1a00', wingMembrane: '#aa3311',
    },
    pixels: `
....H.OOOO.H....
...HHOHHHHOHH...
...HBBBBBBBBBH..
...OBBBBBBBBBO..
..OBBBBBBBBBO...
..OBEABEABEO....
...OBBBBBBBO....
...OBBBBBBBO....
....OBBBBBO.....
.....OBBBO......
....FFOBBOFF....
...FFFFBFFFF....
..FFFFFFBFFFFF..
..FF.FFFFF.FF...
.....OO.OO......
......O..O......
`,
  },

  // ===== CRIpta补充 — LICH SUPREMO =====
  // (mantido para referência)

  // ===== SENHOR DO VAZIO (DIMENSIONAL) =====
  Dimensional: {
    name: 'Senhor do Vazio',
    title: 'O Guardião do Nada',
    description: 'Uma entidade que habita entre as dimensões, controlando o vazio que separa os universos.',
    glowColor: '#ff00ff',
    animationClass: 'boss-dimensional-idle',
    palette: {
      outline: '#0a0015', body: '#4a1a7a', bodyDark: '#2a0a4a', bodyLight: '#7a3acc',
      eye: '#ff00ff', eyeGlow: '#ff44ff', eyeInner: '#aa00aa',
      void: '#1a0a3a', voidGlow: '#5a2aaa', voidDeep: '#0a0020',
      portal: '#aa44ff', portalGlow: '#cc66ff', portalDark: '#7722cc',
      armor: '#5a2a8a', armorDark: '#3a1a5a',
      crown: '#ff44ff', crownGlow: '#ff88ff',
      star: '#ffaaff', starGlow: '#ffccff',
    },
    pixels: `
......OOOO......
.....OKKKHO.....
....OBBBBBO.....
....OBEABEO.....
...OBBBBABBBO...
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
`,
  },
};

// ========== CHARACTER-TO-COLOR MAP ==========
const CHAR_TO_COLOR: Record<string, (palette: Record<string, string>) => string | null> = {
  'O': (p) => p.outline || '#000',
  'H': (p) => p.hair || p.horn || p.halo || p.skull || '#333',
  'B': (p) => p.body || p.bone || '#888',
  'A': (p) => p.bodyDark || p.armor || '#555',
  'E': (p) => p.eye || '#000',
  'R': (p) => p.bodyLight || '#aaa',
  'W': (p) => p.wing || p.armor || null,
  'F': (p) => p.fire || p.magic || null,
  'I': (p) => p.ice || p.frost || null,
  'T': (p) => p.tentacle || null,
  'M': (p) => p.magic || p.moss || null,
  'V': (p) => p.void || p.portal || null,
  'K': (p) => p.crown || p.eyeInner || '#999',
  'C': (p) => p.crown || p.crystal || null,
  'P': (p) => p.portal || p.magic || null,
  'G': (p) => p.eyeGlow || '#ffd700',
  'J': (p) => p.belly || p.soul || null,
  'L': (p) => p.wingMembrane || p.cloak || null,
  'S': (p) => p.scale || p.shell || null,
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
        <filter id={`boss-glow-${themeId}-${size}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#boss-glow-${themeId}-${size})`}>
        {rects}
      </g>
    </svg>
  );
}

export default BOSS_SPRITES;
