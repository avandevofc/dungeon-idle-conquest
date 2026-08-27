// ==========================================
// MONSTER SPRITE — Pixel Art RPG Detalhado
// ==========================================

import React from 'react';

interface Props {
  monsterType: string;
  size?: number;
  className?: string;
  animate?: boolean;
  isHit?: boolean;
  themeColor?: string;
}

// ========== PALETAS DE CORES RICA ==========
const PALETTES: Record<string, Record<string, string>> = {
  bat: {
    body: '#4a2a5a', bodyDark: '#2a0a3a', bodyLight: '#7a4a8a',
    wing: '#5a3a6a', wingDark: '#3a1a4a', wingMembrane: '#6a2a7a',
    eye: '#ff2222', eyeGlow: '#ff5555', eyeInner: '#ffaaaa',
    fang: '#f0e8d0', fangDark: '#c0b890',
    ear: '#5a2a6a', earInner: '#8a4a9a',
    outline: '#1a0a2a', highlight: '#9a6aaa',
  },
  spider: {
    body: '#3a2010', bodyDark: '#1a0800', bodyLight: '#5a3820',
    bodyPattern: '#8a3020', bodyPatternDark: '#6a1808',
    leg: '#4a3018', legDark: '#2a1008', legJoint: '#6a4828',
    eye: '#ff0000', eyeGlow: '#ff3333', eyeCenter: '#440000',
    fang: '#e8e0c8', fangTip: '#aa8860',
    venom: '#88ff44', venomGlow: '#aaff66',
    outline: '#0a0808', highlight: '#7a5838',
  },
  skeleton: {
    bone: '#f0e8d8', boneDark: '#c8b898', boneLight: '#fffff0',
    skull: '#f8f0e0', skullDark: '#d8c8a8',
    robe: '#3a2a4a', robeDark: '#1a0a2a', robeLight: '#5a4a6a',
    eye: '#ff4400', eyeGlow: '#ff8844', eyeFlame: '#ffcc00',
    rib: '#e0d8c8', ribDark: '#b8a888',
    weapon: '#888888', weaponEdge: '#cccccc',
    outline: '#1a0a0a', highlight: '#fff8e8',
  },
  goblin: {
    skin: '#4a8a2a', skinDark: '#2a6a1a', skinLight: '#6aaa4a', skinBelly: '#5a9a3a',
    cloth: '#8a6a2a', clothDark: '#6a4a1a', clothLight: '#aa8a4a',
    eye: '#ffcc00', eyeGlow: '#ffee66', eyePupil: '#220000',
    ear: '#3a7a1a', earInner: '#6aaa4a',
    tooth: '#f0e8d0', toothDark: '#c0b890',
    weapon: '#8a7a5a', weaponEdge: '#bab0a0',
    outline: '#0a2a0a', highlight: '#8acc5a',
  },
  wolf: {
    fur: '#6a5a4a', furDark: '#3a2a1a', furLight: '#9a8a7a', furBelly: '#8a7a6a',
    mane: '#4a3a2a', maneDark: '#2a1a0a',
    eye: '#ffaa00', eyeGlow: '#ffcc44', eyePupil: '#110000',
    fang: '#f0e8d0', fangShadow: '#c8b898',
    nose: '#2a1a0a', noseWet: '#4a3a2a',
    claw: '#d0c8b0',
    outline: '#1a0a0a', highlight: '#baaa9a',
  },
  elemental: {
    core: '#ff6600', coreDark: '#cc3300', coreLight: '#ffaa44',
    flame: '#ff4400', flameDark: '#cc1100', flameLight: '#ffcc66',
    flameTip: '#ffee88', flameInner: '#ff8800',
    eye: '#ffee00', eyeGlow: '#ffffff', eyePupil: '#ff4400',
    ember: '#ffaa44', emberDark: '#cc6600',
    outline: '#4a1a00', highlight: '#ffddaa',
  },
  golem: {
    stone: '#7a7a7a', stoneDark: '#4a4a4a', stoneLight: '#aaaaaa', stoneHighlight: '#cccccc',
    crack: '#3a3a3a', crackGlow: '#00aaff',
    eye: '#00ccff', eyeGlow: '#44eeff', eyeInner: '#004466',
    moss: '#3a6a2a', mossDark: '#1a4a0a',
    gem: '#aa44ff', gemGlow: '#cc66ff', gemDark: '#6622aa',
    outline: '#2a2a2a', highlight: '#e0e0e0',
  },
  dragon: {
    scale: '#8a2a0a', scaleDark: '#5a0a00', scaleLight: '#ba4a2a', scaleHighlight: '#da6a4a',
    wing: '#6a2a0a', wingDark: '#3a0a00', wingMembrane: '#9a3a1a',
    eye: '#ffcc00', eyeGlow: '#ffee44', eyePupil: '#220000',
    belly: '#cc8a4a', bellyDark: '#aa6a2a',
    fire: '#ff6600', fireDark: '#cc3300', fireLight: '#ffaa44', fireTip: '#ffee88',
    horn: '#4a3a2a', hornTip: '#8a7a6a',
    claw: '#d0c0a0',
    outline: '#1a0500', highlight: '#da8a5a',
  },
  ghost: {
    body: '#8899bb', bodyDark: '#5566aa', bodyLight: '#aabbdd', bodyGlow: '#c0d0ee',
    eye: '#ffffff', eyeGlow: '#ffffff', eyePupil: '#000044', eyeInner: '#aabbff',
    mouth: '#3344aa', tongue: '#5566cc',
    wisps: '#7788aa', wispsGlow: '#99aacc',
    outline: '#334466', highlight: '#ddeeff',
  },
  snake: {
    scale: '#3a8a2a', scaleDark: '#1a6a0a', scaleLight: '#5aaa4a', scaleHighlight: '#7acc6a',
    pattern: '#8a4a0a', patternDark: '#6a2a00', patternLight: '#aa6a2a',
    eye: '#ff0000', eyeGlow: '#ff4444', eyePupil: '#220000',
    tongue: '#cc2222', tongueFork: '#aa1111',
    fang: '#f0e8d0', fangTip: '#e0d0b0',
    belly: '#5aaa4a', bellyDark: '#3a8a2a',
    outline: '#0a2a0a', highlight: '#8acc6a',
  },
  slime: {
    body: '#33cc77', bodyDark: '#11aa55', bodyLight: '#55eebb', bodyHighlight: '#88ffdd',
    eye: '#ffffff', eyeGlow: '#ffffff', eyePupil: '#003322',
    shine: '#aaffdd', shineSmall: '#ccffee',
    bubble: '#55eebb', bubbleDark: '#33cc77',
    outline: '#0a5a3a', highlight: '#bbffdd',
  },
  mushroom: {
    cap: '#cc3333', capDark: '#991111', capLight: '#ee5555', capHighlight: '#ff8888',
    capSpot: '#f0e8d0', capSpotDark: '#d0c8a8',
    stem: '#e8dcc8', stemDark: '#c8bca8', stemHighlight: '#f8f0e8',
    eye: '#ffffff', eyeGlow: '#ffffff', eyePupil: '#220000',
    spore: '#aaffaa', sporeGlow: '#ccffcc',
    outline: '#4a1a1a', highlight: '#ffaaaa',
  },
  eye: {
    body: '#7a1a9a', bodyDark: '#4a0a6a', bodyLight: '#aa3acc', bodyHighlight: '#cc66ee',
    iris: '#ff0044', irisDark: '#cc0022', irisLight: '#ff4488',
    pupil: '#000000', pupilGlow: '#220022',
    vein: '#cc44aa', veinDark: '#992288',
    lid: '#5a0a7a', lidHighlight: '#8a3aaa',
    outline: '#2a0a3a', highlight: '#dd88ee',
  },
  mimic: {
    wood: '#8a6a2a', woodDark: '#6a4a1a', woodLight: '#aa8a4a', woodGrain: '#7a5a1a',
    teeth: '#f0e8d0', teethDark: '#c8b898', teethSharp: '#e0d0b0',
    eye: '#ff0000', eyeGlow: '#ff3333', eyePupil: '#440000',
    tongue: '#cc2244', tongueDark: '#aa1133',
    gold: '#d4af37', goldLight: '#f0d060', goldDark: '#aa8822',
    lock: '#aa8822', lockDark: '#886611',
    outline: '#2a1a0a', highlight: '#ccaa55',
  },
};

// ========== SPRITES PIXEL ART 16x16 RPG DETALHADO ==========

const MONSTER_PIXELS: Record<string, string[]> = {
  // ===== MORCEGO — Asas abertas, olhos brilhantes =====
  bat: [
    '................',
    '..w.....w.......',
    '.wW.....Ww......',
    'wWW..O..WWw.....',
    'wWWWOOOOOwww....',
    '.wWOOEOOOWW.....',
    '..WOOFEOOW......',
    '...OOOOOO.......',
    '....OBBBO.......',
    '...OBFFBO.......',
    '....OBBB........',
    '.....OO.........',
    '....F..F........',
    '................',
    '................',
    '................',
  ],

  // ===== ARANHA — 8 patas, olhos múltiplos =====
  spider: [
    '................',
    '....LLLL........',
    '...L....L.......',
    '..LL.OO.LL......',
    '.L..OEEO..L.....',
    'L..OEEEOO..L....',
    'L..OOOOOOO..L...',
    '.LOOOOOOOOOL....',
    '..LOOOOOOOOL....',
    '...LOOOOOOL.....',
    '....LLLLLL......',
    '..LL....LL......',
    '.L..L..L..L.....',
    'L....LL....L....',
    '................',
    '................',
  ],

  // ===== ESQUELETO — Arcos, ossos, olhos flamejantes =====
  skeleton: [
    '................',
    '....OOOO........',
    '...OSSSOO.......',
    '...OSEESO.......',
    '...OSSSOO.......',
    '....OSO.........',
    '...ORRROO.......',
    '..ORRRRRROO.....',
    '..ORRORRRO......',
    '...ORRRRO.......',
    '...OOOROO.......',
    '....ORO.........',
    '...OA..AO.......',
    '...OB..BO.......',
    '................',
    '................',
  ],

  // ===== GOBLIN — Orelhas grandes, adaga =====
  goblin: [
    '................',
    '..E....E........',
    '..EOOOOOE.......',
    '...OHHHOO.......',
    '...OSSSOO.......',
    '..OSSSSSO.......',
    '..OSSESOO.......',
    '..OSSSSO........',
    '...OAAO.........',
    '..OAAAAO........',
    '..OAAAAO........',
    '...OOOO.........',
    '..OB..BW........',
    '..OB..BW........',
    '................',
    '................',
  ],

  // ===== LOBO — Pelo espesso, garras =====
  wolf: [
    '................',
    '....OO..........',
    '...OHOO.........',
    '...OHHOOO.......',
    '..OSSSSSOO......',
    '..OSEEESO.......',
    '..OSSSSOO.......',
    '...OSSSO........',
    '...OAAO.........',
    '..OAAAAO........',
    '..OAAAAO........',
    '...OB.BO........',
    '...OC.CO........',
    '................',
    '................',
    '................',
  ],

  // ===== ELEMENTAL DE FOGO — Chamas vivas =====
  elemental: [
    '......F.........',
    '.....FFF........',
    '....FFFFF.......',
    '...FFAFFFA......',
    '..OAAAAAAO......',
    '..OAEAAEAO......',
    '..OAAAAAAO......',
    '...OAAAAO.......',
    '....AAAA........',
    '...OAAAAO.......',
    '..OAAAAAAO......',
    '..OAAFFAAO......',
    '...OAAO.........',
    '....OFO.........',
    '.....F..........',
    '................',
  ],

  // ===== GOLEM — Pedra, musgo, gemas =====
  golem: [
    '................',
    '...OOOOOOO......',
    '..OSSSSSSOO.....',
    '..OSSEESSO......',
    '..OSSSSSSO......',
    '..OOSSSSSOO.....',
    '...OSSSSO.......',
    '..OSSSSSSO......',
    '.OSSSSSSSO......',
    '.OSSGSSSSO......',
    '..OOSSSSOO......',
    '..SSO..OSS......',
    '..SM....MS......',
    '..OO....OO......',
    '................',
    '................',
  ],

  // ===== DRAGÃO — Asas, chifres, fogo =====
  dragon: [
    '..............O.',
    '.....O........O.',
    '....OHO..WWWWO..',
    '...OSSOWWWWWO...',
    '..OSSSOOOOOO....',
    '..OSESOO........',
    '..OSSSO.........',
    '...OOO..OAAAO...',
    '.....O.OJAAAO...',
    '....O.OAAAAAAO..',
    '...FF.OOOOOOOO..',
    '..FFFFF.OO.OO...',
    '..FF............',
    '................',
    '................',
    '................',
  ],

  // ===== FANTASMA — Corpo etéreo, olhos vazios =====
  ghost: [
    '................',
    '....OOOO........',
    '...OBLLBO.......',
    '..OBBBBBBO......',
    '..OBE..EBBO.....',
    '..OBBBBBBO......',
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

  // ===== COBRA — Corpo sinuoso, presas =====
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

  // ===== SLIME — Corpo gelatinoso, brilho =====
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

  // ===== COGUMELO — Chapéu com manchas =====
  mushroom: [
    '................',
    '....OOOO........',
    '...OCCCCO.......',
    '..OCCSCCCO......',
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

  // ===== OLHO — Olho gigante com veias =====
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

  // ===== MIMIC — Baú com dentes =====
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
  'S': (p) => p.skin || p.bone || p.fur || p.scale || '#ddd',
  's': (p) => p.skinDark || p.boneDark || '#bbb',
  'E': (p) => p.eye || '#ff0000',
  'e': (p) => p.eyeGlow || '#ff4444',
  'H': (p) => p.hair || p.hood || p.skull || '#333',
  'A': (p) => p.armor || p.cloth || p.core || p.wing || p.body || '#888',
  'a': (p) => p.armorDark || p.clothDark || p.coreDark || p.wingDark || p.bodyDark || '#555',
  'W': (p) => p.wing || p.wingDark || '#4a3a5a',
  'w': (p) => p.wingMembrane || p.wingDark || '#2a1a3a',
  'F': (p) => p.flame || p.fire || '#ff4400',
  'f': (p) => p.flameDark || p.fireDark || '#cc2200',
  'P': (p) => p.pattern || p.vein || '#8a2a0a',
  'p': (p) => p.patternDark || '#6a3a00',
  'C': (p) => p.cap || p.crack || '#cc3333',
  'c': (p) => p.capSpot || p.gem || '#e8e0d0',
  'T': (p) => p.teeth || p.teethSharp || '#e8e0d0',
  't': (p) => p.teethDark || '#c0b8a8',
  'V': (p) => p.body || p.vein || '#8a2aaa',
  'I': (p) => p.iris || p.irisLight || '#ff0044',
  'i': (p) => p.pupil || '#000000',
  'D': (p) => p.tongue || p.diamond || '#cc2222',
  'G': (p) => p.glow || p.moss || p.gem || '#88aacc',
  'M': (p) => p.moss || p.shine || p.mane || '#4a6a3a',
  'N': (p) => p.nose || '#2a1a0a',
  'R': (p) => p.robe || p.rib || '#4a3a3a',
  'r': (p) => p.robeDark || p.ribDark || '#2a1a1a',
  'J': (p) => p.jaw || p.belly || p.bellyDark || '#cc8a4a',
  'Q': (p) => p.gold || '#d4af37',
  'X': (p) => p.spore || p.highlight || '#aaffaa',
};

// Monster type to sprite key mapping
const TYPE_TO_SPRITE: Record<string, string> = {
  'Morcego Sombrio': 'bat', 'Morcego Demoníaco': 'bat',
  'Araknis Noturno': 'spider', 'Aranha de Frio': 'spider', 'Aranha de Gelo': 'spider',
  'Esqueleto Velho': 'skeleton', 'Esqueleto das Trevas': 'skeleton', 'Esqueleto Arqueiro': 'skeleton',
  'Wraith Jovem': 'skeleton', 'Wraith Ancestral': 'skeleton', 'Cavaleiro Maldito': 'skeleton', 'Cavaleiro Negro': 'skeleton',
  'Múmia Enrolada': 'skeleton', 'Zumbi Cambaleante': 'skeleton', 'Morte-Viva': 'skeleton',
  'Goblin das Trevas': 'goblin', 'Goblin de Lava': 'goblin', 'Goblin de Gelo': 'goblin',
  'Goblin Abissal': 'goblin', 'Goblin Celeste': 'goblin', 'Goblin Espectral': 'goblin',
  'Goblin Infernal': 'goblin', 'Goblin Cósmico': 'goblin', 'Goblin Vulkanista': 'goblin',
  'Diabinho': 'goblin', 'Demônio Menor': 'goblin',
  'Lobo Nublido': 'wolf', 'Lobo de Gelo': 'wolf', 'Unicórnio Negro': 'wolf',
  'Elemental de Fogo': 'elemental', 'Elemental Glacial': 'elemental', 'Elemental de Gelo': 'elemental', 'Elemental de Lava': 'elemental',
  'Golem de Ébano': 'golem', 'Golem de Magma': 'golem', 'Golem de Gelo': 'golem',
  'Golem Abissal': 'golem', 'Golem Dourado': 'golem', 'Golem de Ossos': 'golem',
  'Golem Ígneo': 'golem', 'Golem Dimensional': 'golem', 'Golem Sombrio': 'golem', 'Golem de Obsidiana': 'golem',
  'Drake de Fogo': 'dragon', 'Fênix Menor': 'dragon', 'Drake Ancião': 'dragon',
  'Balrog Jovem': 'dragon', 'Balrog Supremo': 'dragon', 'Grifo Sagrado': 'dragon', 'Quimera Cósmica': 'dragon',
  'Espírito Errante': 'ghost', 'Espírito Puro': 'ghost', 'Espectro Sombrio': 'ghost',
  'Fragmento Vivo': 'ghost', 'Súcubo Júnior': 'ghost', 'Súcubo Anciã': 'ghost',
  'Anjo Caído': 'ghost', 'Serafim Destruido': 'ghost', 'Serafim Corrompido': 'ghost', 'Riftling': 'ghost',
  'Cobra Negra': 'snake', 'Serpente Glacial': 'snake', 'Serpente de Fogo': 'snake', 'Serpente Abissal': 'snake',
  'Hidra Jovem': 'snake', 'Leviatã Bebê': 'snake', 'Leviatã Ancião': 'snake',
  'Pinguinho Rebelde': 'slime', 'Brasa Viva': 'slime', 'Éter Jovem': 'slime',
  'Paradoxo Cambiante': 'slime', 'Éter Ancião': 'slime',
  'Salamandra': 'mushroom',
  'Peixe-Lanterna': 'eye', 'Medusa Profunda': 'eye', 'Cometa Vivo': 'eye',
  'Void Stalker': 'eye', 'Aberração': 'eye',
  'Engolidor': 'mimic',
  'Vampirinho': 'bat', 'Vampiro Lorde': 'bat', 'Vampiro Ancião': 'bat',
  'Bruxa das Sombras': 'ghost', 'Guardião do Portal': 'ghost',
  'Espectro da Meia-Noite': 'ghost', 'Súcubo das Trevas': 'ghost',
  'Nightmare': 'ghost',
  'Querubim Rebelde': 'bat', 'Harpia Gelada': 'bat',
  'Lagarto Ígneo': 'dragon', 'Escorpione Ardente': 'spider',
  'Gigante de Magma': 'golem', 'Gigante de Gelo': 'golem', 'Yeti Bebê': 'golem', 'Yeti Ancião': 'golem',
  'Frost Giant Jr.': 'golem',
  'Kraken Menor': 'spider', 'Kraken Colossal': 'spider',
  'Polvo Sombrio': 'snake', 'Hidra Anciã': 'snake', 'Tentacle Lord': 'snake', 'Tentacle Lord Jr.': 'snake',
  'Angel of Dawn Jr.': 'ghost',
  'Lich Jr.': 'skeleton', 'Lich Supremo': 'skeleton',
  'Incubiço': 'ghost', 'Incubiço Ancião': 'ghost',
  'Pit Fiend Jr.': 'dragon', 'Pit Fiend Supremo': 'dragon', 'Hell Hound Jr.': 'wolf', 'Hell Hound Ancião': 'wolf',
  'Diabo Ancião': 'dragon',
  'Void Lord': 'eye', 'Void Lord Jr.': 'eye', 'Rift Lord': 'eye',
  'Void Walker Ancião': 'eye',
  'Dimensional Golem': 'golem', 'Paradoxo Ancião': 'slime',
  // Bosses
  'Lorde das Sombras': 'ghost', 'Senhor Vulcânico': 'dragon', 'Rei do Gelo Eterno': 'golem',
  'Titã do Abismo': 'snake', 'Arcanjo Exilado': 'ghost',
  'Arquidiabo': 'dragon', 'Senhor do Vazio': 'eye', 'Dragão Esquelético Necromante': 'dragon',
  // Rare
  'Goblin Dourado': 'goblin', 'Cristal de Mana Ancestral': 'eye', 'Assassino das Sombras': 'skeleton',
  'Mimic Tesourei': 'mimic', 'Caminhante do Vazio': 'eye',
};

// Fallback by theme
const THEME_DEFAULTS: Record<string, string> = {
  'Trevas': 'ghost', 'Vulcânica': 'dragon', 'Glacial': 'wolf',
  'Abismo': 'snake', 'Celestial': 'ghost', 'Cripta': 'skeleton',
  'Infernal': 'dragon', 'Dimensional': 'eye',
};

function getSpriteKey(monsterName: string, _dungeonTheme: string): string {
  if (TYPE_TO_SPRITE[monsterName]) return TYPE_TO_SPRITE[monsterName];
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

  // Determine glow
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
          <filter id={`m-glow-${spriteKey}-${size}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      <g filter={hasGlow ? `url(#m-glow-${spriteKey}-${size})` : undefined}>
        {rects}
      </g>
    </svg>
  );
}

export { getSpriteKey, PALETTES as MONSTER_PALETTES };
export default MonsterSprite;
