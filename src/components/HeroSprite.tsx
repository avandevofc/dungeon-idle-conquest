import React from 'react';
import { BOSS_SPRITES, type BossSpriteData } from './BossSprites';

interface Props {
  heroId: string;
  size?: number;
  className?: string;
  animate?: boolean;
  isHit?: boolean;
  isDefeated?: boolean;
}

// Each hero is drawn as a grid of colored "pixels" via SVG rects
// 16x16 grid, each pixel = size/16

// Color palettes per hero
const PALETTES: Record<string, Record<string, string>> = {
  warrior: {
    skin: '#e8b89d',
    skinDark: '#c4956e',
    armor: '#8b8b8b',
    armorDark: '#5c5c5c',
    armorLight: '#b0b0b0',
    hair: '#8B4513',
    sword: '#e0e0e0',
    swordHilt: '#d4a017',
    outline: '#2a1a0a',
    cape: '#c0392b',
    capeDark: '#962d22',
    boots: '#5c3a1e',
    eye: '#2c1810',
  },
  archer: {
    skin: '#f0c8a0',
    skinDark: '#d4a878',
    armor: '#2d5a27',
    armorDark: '#1a3d16',
    armorLight: '#4a8a3f',
    hair: '#c0392b',
    bow: '#8B4513',
    bowString: '#ddd',
    arrow: '#c0a060',
    outline: '#1a0a00',
    cloak: '#3a7a2f',
    cloakDark: '#2a5a1f',
    boots: '#4a3020',
    eye: '#2c5020',
  },
  mage: {
    skin: '#f0d0b0',
    skinDark: '#d0b090',
    robe: '#4a1a8a',
    robeDark: '#2e0e5a',
    robeLight: '#6a3aaa',
    hat: '#3a1070',
    hatBand: '#d4a017',
    staff: '#8B6914',
    orb: '#00ccff',
    orbGlow: '#88eeff',
    outline: '#1a0a30',
    hair: '#e8d0a0',
    boots: '#3a1a5a',
    eye: '#4a2a8a',
    beard: '#d0c0a0',
  },
  paladin: {
    skin: '#e8c8a8',
    skinDark: '#c0a888',
    armor: '#d4af37',
    armorDark: '#b8942a',
    armorLight: '#f0d060',
    helm: '#c0c0c0',
    helmDark: '#909090',
    shield: '#b8942a',
    shieldGem: '#0066cc',
    outline: '#2a1a0a',
    cape: '#1a3a8a',
    capeDark: '#0a2a6a',
    boots: '#707070',
    eye: '#2a4060',
  },
  healer: {
    skin: '#f5deb3',
    skinDark: '#deb887',
    robe: '#2d8a4e',
    robeDark: '#1a5c35',
    robeLight: '#3aab6a',
    hood: '#1e6b3a',
    staff: '#8B6914',
    orb: '#00ff88',
    orbGlow: '#66ffbb',
    outline: '#0a3a1a',
    hair: '#e8d0a0',
    boots: '#2a5a3a',
    eye: '#228B22',
    cross: '#ffffff',
    glow: '#00ff88',
  },
  assassin: {
    skin: '#d8b898',
    skinDark: '#b89878',
    cloth: '#1a1a2a',
    clothDark: '#0a0a1a',
    clothLight: '#2a2a3a',
    mask: '#2a2a2a',
    blade: '#c0d0e0',
    bladeGlow: '#88aaff',
    outline: '#0a0a0a',
    hair: '#2a2a2a',
    boots: '#1a1a1a',
    eye: '#ff3333',
    scarf: '#8b0000',
    scarfDark: '#5a0000',
  },
  necromancer: {
    skin: '#c8b0a0',
    skinDark: '#a08878',
    robe: '#2a1a3a',
    robeDark: '#1a0a2a',
    robeLight: '#4a2a5a',
    hood: '#1a0a2a',
    staff: '#5a3a2a',
    skull: '#e0e0d0',
    skullShadow: '#b0b0a0',
    magic: '#aa55ff',
    magicGlow: '#cc88ff',
    outline: '#0a0a1a',
    hair: '#3a2a4a',
    boots: '#2a1a2a',
    eye: '#aa55ff',
    robeGem: '#ff3366',
  },
};

// Pixel art definitions (16 wide, variable height)
const WARRIOR_PIXELS = `
........OO......
.......OHHO.....
.......OHHO.....
......OSSSO.....
.....OSSSSO.....
.....OASSAO.....
....OAASSAAO....
....OAAAAAAO....
.....OAAAAO.....
.....OAAAAO.....
....CCOAAOCC....
...CCCOAAOCCC...
...CCCOAAOCCC...
.....OOOO.......
....OBOBBO......
....OBOOBO......
.....O..O.......
`;

const ARCHER_PIXELS = `
........OO......
.......OHHO.....
.......OHHO.....
......OSSSO.....
.....OSSSSO.....
.....OASSAO.....
....OAASSAAO....
....OAAAAAAO....
.....OAAAAO.....
.....OAAAAO.....
.....OOAAOO.....
.....OOAAOO.....
....OOOAAOOO....
.....OOOO.......
....OBOOBO......
....OBOOBO......
.....O..O.......
`;

const MAGE_PIXELS = `
........OO......
.......OHHO.....
.......OHHO.....
......OSSSO.....
.....OSSSSO.....
.....OASSAO.....
....OAASSAAO....
....OAAAAAAO....
.....OAAAAO.....
.....ORAAO......
....RRRAAAO.....
...RRRRAAARRR...
...RRRRAAARRR...
....RRRAARRR....
.....RRRRR......
.....RRRR.......
......RRR.......
`;

const PALADIN_PIXELS = `
........OO......
.......OKKO.....
.......OKKO.....
......OSSSO.....
.....OSSSSO.....
.....OASSAO.....
....OAAAAAAAO...
....OAAAAGAAO...
.....OAAAAO.....
.....OAAAAO.....
....AAAAGAAA....
...AAAAAGAAAA...
...AAAAAGAAAA...
.....OOOO.......
....OOOOOO......
....OBOOBO......
.....O..O.......
`;

const ASSASSIN_PIXELS = `
........OO......
.......OHHO.....
.......OHHO.....
......OSSSO.....
.....OSSSSO.....
.....OREAO.....
....OAASSAAO....
....OAAAAAAO....
.....OAAAAO.....
.....OAAAAO.....
.....OAAAAO.....
.....OOAAOO.....
.....OOAAOO.....
.....OOOO.......
....OBOOBO......
....OBOOBO......
.....O..O.......
`;

const NECROMANCER_PIXELS = `
........OO......
.......OHHO.....
.......OHHO.....
......OSSSO.....
.....OSSSSO.....
.....OASSAO.....
....OAASSAAO....
....OAAAAAAO....
.....OAAAAO.....
.....ORAAO......
....RRRAAAO.....
...RRRRAAARRR...
...RRRRAAARRR...
....RRRAARRR....
.....RRRRR......
.....RRRR.......
......RRR.......
`;

const HEALER_PIXELS = `
........OO......
.......OHHO.....
.......OHHO.....
......OSSSO.....
.....OSSSSO.....
.....OASSAO.....
....OAASSAAO....
....OAAAAAAO....
.....OAAAGA....
.....OAAAAO.....
.....OAAAAO.....
.....OOAAOO.....
.....OOAAOO.....
.....OOOO.......
....OBOOBO......
....OBOOBO......
.....O..O.......
`;

const PIXEL_MAPS: Record<string, string> = {
  warrior: WARRIOR_PIXELS,
  archer: ARCHER_PIXELS,
  mage: MAGE_PIXELS,
  paladin: PALADIN_PIXELS,
  healer: HEALER_PIXELS,
  assassin: ASSASSIN_PIXELS,
  necromancer: NECROMANCER_PIXELS,
};

// Character-to-color mapping
const CHAR_TO_COLOR: Record<string, (palette: Record<string, string>) => string | null> = {
  'O': (p) => p.outline || '#000',
  'S': (p) => p.skin || '#e8b89d',
  's': (p) => p.skinDark || '#c4956e',
  'H': (p) => p.hair || p.hood || '#333',
  'A': (p) => p.armor || p.robe || p.cloth || '#888',
  'a': (p) => p.armorDark || p.robeDark || p.clothDark || '#555',
  'L': (p) => p.armorLight || p.robeLight || p.clothLight || '#aaa',
  'B': (p) => p.boots || '#444',
  'C': (p) => p.cape || p.cloak || p.shield || null,
  'c': (p) => p.capeDark || p.cloakDark || p.shieldGem || null,
  'R': (p) => p.robe || p.robeDark || p.cloth || '#444',
  'D': (p) => p.hat || p.helm || p.hood || '#333',
  'K': (p) => p.helm || p.hatBand || '#999',
  'G': (p) => p.cross || p.shieldGem || p.orbGlow || p.magicGlow || '#ffd700',
  'E': (p) => p.eye || '#000',
  'M': (p) => p.mask || '#222',
  'r': (p) => p.bladeGlow || p.magic || '#88f',
  'd': (p) => p.blade || p.sword || '#ccc',
  'b': (p) => p.bow || p.staff || p.swordHilt || '#8B4513',
  'P': (p) => p.orb || p.skull || '#00ccff',
  'p': (p) => p.orbGlow || p.skullShadow || '#88eeff',
  'F': (p) => p.robeGem || p.scarf || '#ff3366',
  'T': (p) => p.scarf || p.arrow || '#c0392b',
  't': (p) => p.scarfDark || '#8a0000',
};

function parsePixels(art: string): string[][] {
  const lines = art.trim().split('\n').map(l => l.split(''));
  while (lines.length < 17) {
    lines.unshift(new Array(16).fill('.'));
  }
  return lines.map(row => {
    while (row.length < 16) row.push('.');
    return row.slice(0, 16);
  });
}

function buildRects(pixels: string[][], palette: Record<string, string>, pixelSize: number, offsetY: number): React.ReactNode[] {
  const rects: React.ReactNode[] = [];
  for (let y = 0; y < pixels.length && y < 16; y++) {
    for (let x = 0; x < pixels[y].length; x++) {
      const ch = pixels[y][x];
      if (ch === '.') continue;
      const colorFn = CHAR_TO_COLOR[ch];
      if (!colorFn) continue;
      const color = colorFn(palette);
      if (!color) continue;
      rects.push(
        <rect
          key={`${x}-${y}`}
          x={x * pixelSize}
          y={y * pixelSize + offsetY}
          width={pixelSize}
          height={pixelSize}
          fill={color}
        />
      );
    }
  }
  return rects;
}

export function HeroSprite({ heroId, size = 80, className = '', animate = true, isHit = false, isDefeated = false }: Props) {
  const palette = PALETTES[heroId] || PALETTES.warrior;
  const art = PIXEL_MAPS[heroId] || WARRIOR_PIXELS;
  const pixels = parsePixels(art);
  const pixelSize = size / 16;
  const offsetY = -pixelSize / 2;
  const rects = buildRects(pixels, palette, pixelSize, offsetY);

  const hasGlow = heroId === 'necromancer' || heroId === 'mage';
  const glowColor = heroId === 'necromancer' ? '#aa55ff' : heroId === 'mage' ? '#00ccff' : null;

  // Animation class
  const idleClass = animate ? `sprite-idle-${heroId}` : '';
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
      {hasGlow && glowColor && (
        <defs>
          <filter id={`glow-${heroId}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      <g filter={hasGlow ? `url(#glow-${heroId})` : undefined}>
        {rects}
      </g>
    </svg>
  );
}

// ========== BOSS SPRITE ==========
interface BossProps {
  themeId: string;
  size?: number;
  className?: string;
  animate?: boolean;
  isHit?: boolean;
  isDefeated?: boolean;
}

const BOSS_PALETTES: Record<string, Record<string, string>> = {
  Trevas: { outline: '#1a0a2a', robe: '#2a0a3a', robeDark: '#1a0020', robeLight: '#5a2a7a', hair: '#1a1a1a', eye: '#ff0044', skin: '#8a6a7a', skinDark: '#6a4a5a', magic: '#aa00ff', orb: '#ff0066', skull: '#d0c0d0' },
  'Vulcânica': { outline: '#2a0a0a', robe: '#8a1a0a', robeDark: '#5a0a00', robeLight: '#cc3a1a', hair: '#ff4400', eye: '#ffaa00', skin: '#cc6633', skinDark: '#994422', armor: '#8a3a1a', orb: '#ff6600' },
  Glacial: { outline: '#0a1a2a', robe: '#1a4a7a', robeDark: '#0a2a5a', robeLight: '#4a8acc', hair: '#aaddff', eye: '#00ccff', skin: '#ccdde8', skinDark: '#aabbcc', armor: '#2a6a9a', orb: '#88eeff' },
  Abismo: { outline: '#0a0a1a', robe: '#0a1a3a', robeDark: '#000a20', robeLight: '#2a4a7a', hair: '#0a0a2a', eye: '#00ff88', skin: '#4a6a8a', skinDark: '#2a4a6a', armor: '#1a2a4a', orb: '#00ffaa' },
  Celestial: { outline: '#2a2a0a', robe: '#7a6a1a', robeDark: '#5a4a0a', robeLight: '#ccaa2a', hair: '#fff8cc', eye: '#ffd700', skin: '#ffe8cc', skinDark: '#ddc8aa', armor: '#aa8822', orb: '#ffee88' },
  Cripta: { outline: '#1a2a1a', robe: '#2a4a2a', robeDark: '#1a3a1a', robeLight: '#4a7a4a', hair: '#4a6a4a', eye: '#00ff44', skin: '#8aaa8a', skinDark: '#6a8a6a', armor: '#3a5a3a', skull: '#d0e0d0' },
  Infernal: { outline: '#2a0a00', robe: '#8a2a00', robeDark: '#5a1a00', robeLight: '#cc5a22', hair: '#ff2200', eye: '#ffaa00', skin: '#cc4422', skinDark: '#993311', armor: '#aa3300', orb: '#ff4400' },
  Dimensional: { outline: '#1a0a2a', robe: '#5a1a8a', robeDark: '#3a0a5a', robeLight: '#8a3acc', hair: '#cc66ff', eye: '#ff00ff', skin: '#aa88cc', skinDark: '#8866aa', armor: '#6a2a9a', orb: '#ff44ff' },
};

const BOSS_ART = `
........OO..........
.......OHHO.........
.......OHHO.........
......OSSSO.........
.....OSSSSO.........
.....OASSAO.........
....OAASSAAO........
....OAAAAAAO........
.....OAAAAO.........
.....ORAAO..........
....RRRAAAO.........
...RRRRAAARRR.......
...RRRRAAARRR.......
....RRRAARRR........
.....RRRRR..........
.....RRRR...........
......RRR...........
`;

export function BossSprite({ themeId, size = 120, className = '', animate = true, isHit = false, isDefeated = false }: BossProps) {
  // Use new boss sprites from BossSprites.tsx
  const bossData = BOSS_SPRITES[themeId];
  if (!bossData) {
    // Fallback to old implementation
    const palette = BOSS_PALETTES[themeId] || BOSS_PALETTES.Trevas;
    const lines = BOSS_ART.trim().split('\n').map(l => l.split(''));
    const pixelSize = size / 20;

    const rects: React.ReactNode[] = [];
    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[y].length; x++) {
        const ch = lines[y][x];
        if (ch === '.') continue;
        const colorFn = CHAR_TO_COLOR[ch];
        if (!colorFn) continue;
        const color = colorFn(palette);
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

    const idleClass = animate ? 'sprite-idle-boss' : '';
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

  // Use new boss sprites
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
