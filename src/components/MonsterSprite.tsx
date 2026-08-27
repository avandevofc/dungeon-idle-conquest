import React from 'react';

interface Props {
  monsterType: string;
  size?: number;
  className?: string;
  animate?: boolean;
  isHit?: boolean;
  themeColor?: string;
}

// ========== MONSTER COLOR PALETTES ==========
const PALETTES: Record<string, Record<string, string>> = {
  bat: {
    body: '#3a2a4a', bodyDark: '#2a1a3a', bodyLight: '#5a4a6a',
    wing: '#4a3a5a', wingDark: '#2a1a3a',
    eye: '#ff3333', eyeGlow: '#ff6666',
    fang: '#e0e0d0',
    outline: '#1a0a2a',
  },
  spider: {
    body: '#2a1a0a', bodyDark: '#1a0a00', bodyLight: '#4a3a2a',
    leg: '#3a2a1a', legDark: '#1a0a00',
    eye: '#ff0000', eyeGlow: '#ff4444',
    fang: '#d0d0c0',
    outline: '#0a0a0a',
    pattern: '#8a2a0a',
  },
  skeleton: {
    bone: '#e8e0d0', boneDark: '#c0b8a8', boneLight: '#f5f0e8',
    robe: '#4a3a3a', robeDark: '#2a1a1a',
    eye: '#ff4400', eyeGlow: '#ff8844',
    outline: '#2a1a0a',
    weapon: '#8a8a8a',
  },
  goblin: {
    skin: '#5a8a3a', skinDark: '#3a6a2a', skinLight: '#7aaa5a',
    cloth: '#8a6a2a', clothDark: '#6a4a1a',
    eye: '#ffcc00', eyeGlow: '#ffee66',
    ear: '#4a7a2a',
    outline: '#1a2a0a',
    weapon: '#8a7a5a',
  },
  wolf: {
    fur: '#6a5a4a', furDark: '#4a3a2a', furLight: '#8a7a6a',
    eye: '#ffaa00', eyeGlow: '#ffcc44',
    fang: '#e8e0d0',
    nose: '#2a1a0a',
    outline: '#2a1a0a',
  },
  elemental: {
    core: '#ff6600', coreDark: '#cc4400', coreLight: '#ffaa44',
    flame: '#ff4400', flameDark: '#cc2200', flameLight: '#ffaa66',
    eye: '#ffee00', eyeGlow: '#ffffff',
    outline: '#4a1a00',
  },
  golem: {
    stone: '#7a7a7a', stoneDark: '#5a5a5a', stoneLight: '#9a9a9a',
    crack: '#3a3a3a',
    eye: '#00ccff', eyeGlow: '#88eeff',
    moss: '#4a6a3a',
    outline: '#2a2a2a',
    gem: '#aa44ff',
  },
  dragon: {
    scale: '#8a2a0a', scaleDark: '#6a1a00', scaleLight: '#aa4a2a',
    wing: '#6a2a0a', wingDark: '#4a1a00',
    eye: '#ffcc00', eyeGlow: '#ffee66',
    belly: '#cc8a4a',
    fire: '#ff6600', fireDark: '#cc4400',
    outline: '#2a0a00',
  },
  ghost: {
    body: '#aabbcc', bodyDark: '#8899aa', bodyLight: '#ccddeeff',
    eye: '#000000', eyeGlow: '#ffffff',
    outline: '#556677',
    glow: '#88aacc',
  },
  snake: {
    scale: '#4a8a2a', scaleDark: '#2a6a1a', scaleLight: '#6aaa4a',
    pattern: '#8a4a0a', patternDark: '#6a3a00',
    eye: '#ff0000', eyeGlow: '#ff4444',
    fang: '#e8e0d0',
    tongue: '#cc2222',
    outline: '#1a2a0a',
  },
  slime: {
    body: '#44cc88', bodyDark: '#22aa66', bodyLight: '#66eebb',
    eye: '#000000', eyeGlow: '#ffffff',
    outline: '#1a5a3a',
    shine: '#aaffdd',
  },
  mushroom: {
    cap: '#cc3333', capDark: '#aa1111', capLight: '#ee5555',
    capSpot: '#e8e0d0',
    stem: '#e8dcc8', stemDark: '#c8bca8',
    eye: '#000000', eyeGlow: '#ffffff',
    outline: '#4a1a1a',
    spore: '#aaffaa',
  },
  eye: {
    body: '#8a2aaa', bodyDark: '#6a0a8a', bodyLight: '#aa4acc',
    iris: '#ff0044', irisDark: '#cc0022', pupil: '#000000',
    vein: '#cc44aa',
    outline: '#3a0a4a',
  },
  mimic: {
    wood: '#8a6a2a', woodDark: '#6a4a1a', woodLight: '#aa8a4a',
    teeth: '#e8e0d0', teethDark: '#c0b8a8',
    eye: '#ff0000', eyeGlow: '#ff4444',
    tongue: '#cc2244',
    outline: '#3a2a0a',
    gold: '#d4af37',
  },
};

// ========== PIXEL ART DEFINITIONS ==========
// Each is 16x16 grid, '.' = empty

const MONSTER_PIXELS: Record<string, string[]> = {
  bat: [
    '................',
    '..W.....W.......',
    '.WW.....WW......',
    'WWW..O..WWW.....',
    'WWWWOOOOWWWW....',
    '.WWOOEOOOWW.....',
    '..WOOOOOOW......',
    '...OBBBBO.......',
    '....OBBO........',
    '.....OO.........',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
  ],
  spider: [
    '................',
    '....LLLL........',
    '...L....L.......',
    '..LL.OO.LL......',
    '.L..OEOO..L.....',
    'L..OEEEOO..L....',
    'L..OOOOOOO..L...',
    '.L.OOOOOOO.L....',
    '..LOOOOOOOOL....',
    '...LOOOOOOL.....',
    '....LLLLLL......',
    '..LL....LL......',
    '.L..L..L..L.....',
    'L....LL....L....',
    '................',
    '................',
  ],
  skeleton: [
    '................',
    '....OOOO........',
    '...OBBBBO.......',
    '...OBEBBO.......',
    '...OBBBBO.......',
    '....OBBB........',
    '...OAAAAO.......',
    '..OAAAAAAO......',
    '...OAAAAO.......',
    '...OOAAOO.......',
    '....OAAO........',
    '...OA..AO.......',
    '...OA..AO.......',
    '...OB..BO.......',
    '................',
    '................',
  ],
  goblin: [
    '................',
    '....OOOO........',
    '...OHHHOO.......',
    '...OSSSOO.......',
    '..OSSSSSO.......',
    '..OSSESOO.......',
    '..OSSSSO........',
    '...OAAO.........',
    '..OAAAAO........',
    '..OAAAAO........',
    '...OOOO.........',
    '..OB..BO........',
    '..OB..BO........',
    '................',
    '................',
    '................',
  ],
  wolf: [
    '................',
    '....OO..........',
    '...OHOO.........',
    '...OHHOOO.......',
    '..OSSSSOO.......',
    '..OSEEESO.......',
    '..OSSSSO........',
    '...OSSO.........',
    '...OAAO.........',
    '..OAAAAO........',
    '..OAAAAO........',
    '...OB.BO........',
    '...OB..O........',
    '................',
    '................',
    '................',
  ],
  elemental: [
    '......F.........',
    '.....FFF........',
    '....FFFFF.......',
    '...OAAAAO.......',
    '..OAAAAAAO......',
    '..OAEAAEAO......',
    '..OAAAAAAO......',
    '...OAAAAO.......',
    '....AAAA........',
    '...OAAAAO.......',
    '..OAAAAAAO......',
    '..OAAAAAO.......',
    '...OAAAO........',
    '....OAO.........',
    '.....O..........',
    '................',
  ],
  golem: [
    '................',
    '...OOOOOO.......',
    '..OSSSSSOO......',
    '..OSSEESSO......',
    '..OSSSSSO.......',
    '..OOSSSOO.......',
    '...OSSSO........',
    '..OSSSSSO.......',
    '.OSSSSSSSO......',
    '.OSSSSSSSO......',
    '..OOSSSOO.......',
    '..SSO..OSS......',
    '..SS....SS......',
    '..OO....OO......',
    '................',
    '................',
  ],
  dragon: [
    '..............O.',
    '.....O........O.',
    '....OHO..WWWWO..',
    '...OSSOWWWWWO...',
    '..OSSSOOOOOO....',
    '..OSESOO........',
    '..OSSSO.........',
    '...OOO..OAAAO...',
    '.....O.OAAAAAO..',
    '....O.OAAAAAAO..',
    '...OO.OOOOOOOO..',
    '......OO..OO....',
    '.....OO....OO...',
    '................',
    '................',
    '................',
  ],
  ghost: [
    '................',
    '....OOOO........',
    '...OBBBBBO......',
    '..OBBBBBBBO.....',
    '..OBE..BEBO.....',
    '..OBBBBBBBO.....',
    '..OBBBBBBO......',
    '..OBBBBBBBO.....',
    '...OBBBBBO......',
    '...OBBBBBOO.....',
    '..OOBBBBBOOO....',
    '..O.OBBO.OBO....',
    '...O.BB.O.BO....',
    '....O..O..O.....',
    '................',
    '................',
  ],
  snake: [
    '................',
    '................',
    '....OO..........',
    '...OSSOO........',
    '..OSSSSOO.......',
    '..OSSESOO.......',
    '..OSSSSO........',
    '...OSSO.........',
    '....OSSOO.......',
    '.....OSSSO......',
    '......OSSSO.....',
    '.......OSSSO....',
    '........OOO.....',
    '................',
    '................',
    '................',
  ],
  slime: [
    '................',
    '................',
    '................',
    '....OOOO........',
    '...OBBBBBO......',
    '..OBBBBBBBO.....',
    '..OBE.BBBO......',
    '..OBBBBBBBO.....',
    '..OBBBBBBBO.....',
    '...OBBBBBO......',
    '....OOOOOO......',
    '................',
    '................',
    '................',
    '................',
    '................',
  ],
  mushroom: [
    '................',
    '....OOOO........',
    '...OCCCCO.......',
    '..OCCCSCCO......',
    '.OCCCCCCCCO.....',
    '.OCCCSCCCCO.....',
    '..OCCCCCCO......',
    '...OCCCCO.......',
    '....OSSO........',
    '....OSSO........',
    '...OSSSSO.......',
    '....OSSO........',
    '....OOOO........',
    '................',
    '................',
    '................',
  ],
  eye: [
    '................',
    '...OOOOOOO......',
    '..OOVVVVVOO.....',
    '.OOVVVVVVVOO....',
    '.OVVVIRIRVVO....',
    '.OVVVIRIRVVO....',
    '.OOVVVVVVVOO....',
    '..OOVVVVVOO.....',
    '...OOOOOOO......',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
  ],
  mimic: [
    '................',
    '..OOOOOOOOO.....',
    '.OBBBBBBBBBO....',
    '.OBBBBBBBBBO....',
    '.OBBBBBBBBBO....',
    '.OBTTTTTTBBO....',
    '.OBBBBBBBBBO....',
    '.OOOOOOOOOOO....',
    '.OBBBBBBBBBO....',
    '.OBBBBBBBBBO....',
    '.OBBBBBBBBBO....',
    '.OOOOOOOOOOO....',
    '................',
    '................',
    '................',
    '................',
  ],
};

// Character-to-color mapping
const CHAR_COLOR: Record<string, (p: Record<string, string>) => string | null> = {
  'O': (p) => p.outline || '#000',
  'B': (p) => p.body || p.bone || p.fur || p.stone || p.scale || p.wood || p.cap || p.stem || '#888',
  'b': (p) => p.bodyDark || p.boneDark || p.furDark || p.stoneDark || p.scaleDark || p.woodDark || p.capDark || p.stemDark || '#555',
  'L': (p) => p.bodyLight || p.boneLight || p.furLight || p.stoneLight || p.scaleLight || p.woodLight || p.capLight || '#aaa',
  'S': (p) => p.skin || p.bone || p.fur || '#ddd',
  's': (p) => p.skinDark || p.boneDark || '#bbb',
  'E': (p) => p.eye || '#ff0000',
  'e': (p) => p.eyeGlow || '#ff4444',
  'H': (p) => p.hair || p.hood || '#333',
  'A': (p) => p.armor || p.cloth || p.core || p.wing || p.body || '#888',
  'a': (p) => p.armorDark || p.clothDark || p.coreDark || p.wingDark || p.bodyDark || '#555',
  'W': (p) => p.wing || p.wingDark || '#4a3a5a',
  'w': (p) => p.wingDark || '#2a1a3a',
  'F': (p) => p.flame || p.fire || '#ff4400',
  'f': (p) => p.flameDark || p.fireDark || '#cc2200',
  'P': (p) => p.pattern || p.vein || '#8a2a0a',
  'p': (p) => p.patternDark || '#6a3a00',
  'C': (p) => p.cap || p.crack || '#cc3333',
  'c': (p) => p.capSpot || p.gem || '#e8e0d0',
  'T': (p) => p.teeth || '#e8e0d0',
  't': (p) => p.teethDark || '#c0b8a8',
  'V': (p) => p.body || '#8a2aaa',
  'I': (p) => p.iris || '#ff0044',
  'i': (p) => p.pupil || '#000000',
  'D': (p) => p.tongue || p.diamond || '#cc2222',
  'G': (p) => p.glow || p.moss || '#88aacc',
  'M': (p) => p.moss || p.shine || '#4a6a3a',
  'N': (p) => p.nose || '#2a1a0a',
  'R': (p) => p.robe || '#4a3a3a',
  'r': (p) => p.robeDark || '#2a1a1a',
  'J': (p) => p.jaw || p.belly || '#cc8a4a',
  'Q': (p) => p.gold || '#d4af37',
  'X': (p) => p.spore || '#aaffaa',
};

// Monster type to sprite key mapping
const TYPE_TO_SPRITE: Record<string, string> = {
  // Bats
  'Morcego Sombrio': 'bat', 'bat': 'bat',
  // Spiders
  'Araknis Noturno': 'spider', 'Aranha de Frio': 'spider', 'spider': 'spider',
  // Skeletons
  'Esqueleto Velho': 'skeleton', 'skeleton': 'skeleton', 'Wraith Jovem': 'skeleton',
  // Goblins (appear in every theme!)
  'Goblin das Trevas': 'goblin', 'Goblin de Lava': 'goblin', 'Goblin de Gelo': 'goblin',
  'Goblin Abissal': 'goblin', 'Goblin Celeste': 'goblin', 'Goblin Espectral': 'goblin',
  'Goblin Infernal': 'goblin', 'Goblin Cósmico': 'goblin', 'goblin': 'goblin',
  // Wolves
  'Lobo Nublido': 'wolf', 'Lobo de Gelo': 'wolf', 'wolf': 'wolf',
  // Elementals
  'Elemental de Fogo': 'elemental', 'Elemental Glacial': 'elemental', 'elemental': 'elemental',
  // Golems (big tanky)
  'Golem de Ébano': 'golem', 'Golem de Magma': 'golem', 'Golem de Gelo': 'golem',
  'Golem Abissal': 'golem', 'Golem Dourado': 'golem', 'Golem de Ossos': 'golem',
  'Golem Ígneo': 'golem', 'Golem Dimensional': 'golem', 'golem': 'golem',
  // Dragons
  'Drake de Fogo': 'dragon', 'Fênix Menor': 'dragon', 'dragon': 'dragon',
  // Ghosts
  'Espírito Errante': 'ghost', 'Espírito Puro': 'ghost', 'Espectro Sombrio': 'ghost',
  'Fragmento Vivo': 'ghost', 'ghost': 'ghost',
  // Snakes
  'Cobra Negra': 'snake', 'Serpente Glacial': 'snake', 'snake': 'snake',
  // Slimes
  'Pinguinho Rebelde': 'slime', 'Brasa Viva': 'slime', 'slime': 'slime',
  // Mushrooms
  'Salamandra': 'mushroom', 'mushroom': 'mushroom',
  // Eye monsters
  'Peixe-Lanterna': 'eye', 'Medusa Profunda': 'eye', 'eye': 'eye',
  // Mimics
  'Mimic': 'mimic', 'mimic': 'mimic',
};

// Fallback by theme for unmapped enemies
const THEME_DEFAULTS: Record<string, string> = {
  'Trevas': 'ghost',
  'Vulcânica': 'dragon',
  'Glacial': 'wolf',
  'Abismo': 'snake',
  'Celestial': 'ghost',
  'Cripta': 'skeleton',
  'Infernal': 'demon',
  'Dimensional': 'eye',
};

// Specific enemy name to sprite overrides
const NAME_OVERRIDES: Record<string, string> = {
  'Sombra Rastejante': 'slime',
  'Oculto Negro': 'ghost',
  'Sombra': 'ghost',
  'Lagarto Ígneo': 'dragon',
  'Escorpione Ardente': 'spider',
  'Brasa Viva': 'slime',
  'Yeti Bebê': 'golem',
  'Harpia Gelada': 'bat',
  'Peixe-Lanterna': 'eye',
  'Kraken Menor': 'spider',
  'Polvo Sombrio': 'snake',
  'Engolidor': 'mimic',
  'Hidra Jovem': 'dragon',
  'Leviatã Bebê': 'snake',
  'Anjo Caído': 'ghost',
  'Serafim Destruido': 'ghost',
  'Querubim Rebelde': 'bat',
  'Cometa Vivo': 'eye',
  'Grifo Sagrado': 'dragon',
  'Unicórnio Negro': 'wolf',
  'Múmia Enrolada': 'skeleton',
  'Vampirinho': 'bat',
  'Zumbi Cambaleante': 'skeleton',
  'Morte-Viva': 'ghost',
  'Diabinho': 'goblin',
  'Demônio Menor': 'goblin',
  'Súcubo Júnior': 'ghost',
  'Incubiço': 'ghost',
  'Balrog Jovem': 'dragon',
  'Pit Fiend Jr.': 'demon',
  'Cavaleiro Maldito': 'skeleton',
  'Riftling': 'ghost',
  'Void Stalker': 'eye',
  'Éter Jovem': 'slime',
  'Quimera Cósmica': 'dragon',
  'Aberração': 'eye',
  'Paradoxo Cambiante': 'slime',
  // Boss names
  'Lorde das Sombras': 'ghost',
  'Senhor Vulcânico': 'dragon',
  'Rei do Gelo Eterno': 'golem',
  'Titã do Abismo': 'snake',
  'Arcanjo Exilado': 'ghost',
  'Lich Supremo': 'skeleton',
  'Arquidiabo': 'dragon',
  'Senhor do Vazio': 'eye',
};

function getSpriteKey(monsterName: string, dungeonTheme: string): string {
  // 1. Check name overrides first
  if (NAME_OVERRIDES[monsterName]) return NAME_OVERRIDES[monsterName];
  // 2. Check type mapping
  if (TYPE_TO_SPRITE[monsterName]) return TYPE_TO_SPRITE[monsterName];
  // 3. Check theme defaults
  if (THEME_DEFAULTS[dungeonTheme]) return THEME_DEFAULTS[dungeonTheme];
  // 4. Fallback
  return 'slime';
}

function parseGrid(lines: string[]): string[][] {
  return lines.map(row => {
    const chars = row.split('');
    while (chars.length < 16) chars.push('.');
    return chars.slice(0, 16);
  });
}

function buildMonsterRects(grid: string[][], palette: Record<string, string>, pixelSize: number): React.ReactNode[] {
  const rects: React.ReactNode[] = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const ch = grid[y][x];
      if (ch === '.') continue;
      const colorFn = CHAR_COLOR[ch];
      if (!colorFn) continue;
      const color = colorFn(palette);
      if (!color) continue;
      rects.push(
        <rect
          key={`m-${x}-${y}`}
          x={x * pixelSize}
          y={y * pixelSize}
          width={pixelSize}
          height={pixelSize}
          fill={color}
        />
      );
    }
  }
  return rects;
}

// ========== MONSTER SPRITE COMPONENT ==========
export function MonsterSprite({ monsterType, size = 80, className = '', animate = true, isHit = false, themeColor }: Props) {
  const spriteKey = monsterType in MONSTER_PIXELS ? monsterType : getSpriteKey(monsterType, '');
  const palette = PALETTES[spriteKey] || PALETTES.slime;
  const grid = parseGrid(MONSTER_PIXELS[spriteKey] || MONSTER_PIXELS.slime);
  const pixelSize = size / 16;
  const rects = buildMonsterRects(grid, palette, pixelSize);

  const hitClass = isHit ? 'sprite-hit' : '';
  const idleClass = animate ? `monster-idle-${spriteKey}` : '';

  // Determine if this monster needs a glow filter
  const hasGlow = spriteKey === 'ghost' || spriteKey === 'elemental' || spriteKey === 'eye';
  const glowColor = themeColor || (spriteKey === 'ghost' ? '#88aacc' : spriteKey === 'elemental' ? '#ff6600' : '#aa44ff');

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`${idleClass} ${hitClass} ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {hasGlow && (
        <defs>
          <filter id={`m-glow-${spriteKey}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      <g filter={hasGlow ? `url(#m-glow-${spriteKey})` : undefined}>
        {rects}
      </g>
    </svg>
  );
}

// Export for BattleScreen to use
export { getSpriteKey, PALETTES as MONSTER_PALETTES };
