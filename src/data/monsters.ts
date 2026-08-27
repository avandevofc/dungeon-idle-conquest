// ==========================================
// MONSTROS EXPANDIDOS — Dungeon Idle Conquest
// ==========================================

export interface MonsterDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  theme: string;
  isBoss: boolean;
  hpMultiplier: number;
  damageMultiplier: number;
  goldDrop: number;
  manaDrop: number;
}

export interface MonsterLore {
  name: string;
  description: string;
  funFact: string;
}

// ========== LORE DOS MONSTROS POR TEMA ==========

export const MONSTER_LORE: Record<string, MonsterLore[]> = {
  'Trevas': [
    { name: 'Sombra Rastejante', description: 'Uma massa viscosa de escuridão pura que se arrasta pelo chão, devorando a luz ao redor.', funFact: 'Dizem que nasce quando a luz é negada por tempo demais.' },
    { name: 'Goblin das Trevas', description: 'Goblin corrompido pela magia negra, com olhos brilhantes e garras afiadas.', funFact: 'Coleta poeira de estrelas para trocar com outros goblins.' },
    { name: 'Lobo Nublido', description: 'Lobo fantasma que caça entre as nuvens escuras, silencioso como o vento.', funFact: 'Seu uivo faz com que corações fracos parem de bater.' },
    { name: 'Oculto Negro', description: 'Criatura invisível que só se revela quando está prestes a atacar.', funFact: 'Tem medo de espelhos — pode ver sua verdadeira forma.' },
    { name: 'Morcego Sombrio', description: 'Morcego gigante com asas de couro negro e dentes que brilham no escuro.', funFact: 'Nunca dorme — vive em um sono eterno entre as sombras.' },
    { name: 'Araknis Noturno', description: 'Aranha do tamanho de um cão, com patas que cortam como lâminas.', funFact: 'Tece suas teias com fios de pesadelo solidificado.' },
    { name: 'Espírito Errante', description: 'Alma de um aventureiro perdido que nunca encontrou a saída da dungeon.', funFact: 'Repete em voz alta o último grito que deu antes de morrer.' },
    { name: 'Cobra Negra', description: 'Serpente venenosa que se esconde nas sombras, esperando a vítima errar.', funFact: 'Seu veneno faz com que a vítima veja seus medos mais profundos.' },
    { name: 'Golem de Ébano', description: 'Construto de pedra negra animado por magia ancestral.', funFact: 'Cada pedra que o compõe é de um templo destruído.' },
    { name: 'Nightmare', description: 'Pesadelo materializado que assombra os sonhos dos aventureiros.', funFact: 'Alimenta-se do medo — quanto mais assustado você estiver, mais forte fica.' },
  ],
  'Vulcânica': [
    { name: 'Lagarto Ígneo', description: 'Lagarto coberto de escamas derretidas que deixa rastros de fogo.', funFact: 'Precisa beber magma para se manter vivo.' },
    { name: 'Goblin de Lava', description: 'Goblin que habita as margens de rios de lava, resistente ao calor extremo.', funFact: 'Assa seus inimigos em pedras quentes antes de comer.' },
    { name: 'Salamandra', description: 'Anfíbio gigante que nada em lava como se fosse água.', funFact: 'Pode prever erupções vulcânicas 3 dias antes.' },
    { name: 'Elemental de Fogo', description: 'Pura energia ígnea em forma humanoid, que queima tudo que toca.', funFact: 'Nasce no coração de um vulcão e morre ao encontrar água.' },
    { name: 'Brasa Viva', description: 'Carvão animado que pulsa como um coração de fogo.', funFact: 'Quando morre, explode em faíscas que incendiam tudo ao redor.' },
    { name: 'Escorpione Ardente', description: 'Escorpião com cauda que gera fogo em vez de veneno.', funFact: 'Suas pinças derretem metais comuns em segundos.' },
    { name: 'Golem de Magma', description: 'Golem formado por rocha derretida e magma solidificado.', funFact: 'Seu núcleo é um pedaço de estrela cadente.' },
    { name: 'Fênix Menor', description: 'Pássaro de fogo que renasce das cinzas, mas em versão menor.', funFact: 'Ainda está aprendendo a renascer — às vezes volta torto.' },
    { name: 'Drake de Fogo', description: 'Jovem dragão que ainda não aprendeu a voar, mas já cuspe fogo.', funFact: 'Tem至do medo de frangos — remind de quando era ovo.' },
    { name: 'Magma Lord Jr.', description: 'Filho do Senhor Vulcânico, ainda não domina todo seu poder.', funFact: 'Chora lava quando está com raiva — e está sempre com raiva.' },
  ],
  'Glacial': [
    { name: 'Yeti Bebê', description: 'Yeti jovem coberto de pelo azul que brinca com flocos de neve mortais.', funFact: 'Ainda não aprendeu a rugir — emite um miado fofinho.' },
    { name: 'Lobo de Gelo', description: 'Lobo coberto de cristais de gelo que deixa rastros congelados.', funFact: 'Seu sopro congela até o tempo ao redor.' },
    { name: 'Elemental Glacial', description: 'Pura energia gelada que assume forma humanoid e congelante.', funFact: 'Chora cristais de gelo quando está triste.' },
    { name: 'Goblin de Gelo', description: 'Goblin que sobreviveu ao frio extremo e agora usa gelo como arma.', funFact: 'Guarda sorvete no bolso — para散热 do próprio corpo.' },
    { name: 'Pinguinho Rebelde', description: 'Pingone de água que se recusou a derreter e agora é sólido e rebelde.', funFact: 'Odeia o sol com toda sua força cristalina.' },
    { name: 'Aranha de Frio', description: 'Aranha que tece teias de gelo que congelam qualquer coisa que toque.', funFact: 'Suas teias são mais fortes que aço quando estão frias.' },
    { name: 'Golem de Gelo', description: 'Golem formado por gelo eterno que não derrete com o tempo.', funFact: 'Cada 100 anos, ganha uma nova camada de gelo — como uma árvore.' },
    { name: 'Harpia Gelada', description: 'Harpia com penas de gelo e garras que congelam ao tocar.', funFact: 'Seu canto faz com que até o fogo se apague.' },
    { name: 'Serpente Glacial', description: 'Serpente gigante que se move por entre os icebergs.', funFact: 'Pode se tornar invisível quando está sobre neve.' },
    { name: 'Frost Giant Jr.', description: 'Jovem gigante de gelo que ainda está crescendo.', funFact: 'Ainda não atinge 10 metros — apenas 9.99.' },
  ],
  'Abismo': [
    { name: 'Peixe-Lanterna', description: 'Peixe abissal com luz enganosa que atrai presas para a escuridão.', funFact: 'A luz é na verdade um osso de aventureiro anterior.' },
    { name: 'Goblin Abissal', description: 'Goblin que evoluiu para viver na pressão extrema das profundezas.', funFact: 'Pode esmagar diamantes com as mãos de tanta pressão.' },
    { name: 'Kraken Menor', description: 'Jovem kraken que ainda não aprendeu a控制ar todos os seus tentáculos.', funFact: 'Tenta abraçar tudo que vê — às vezes sem querer mata.' },
    { name: 'Polvo Sombrio', description: 'Polvo que controla as correntes abissais com sua mente.', funFact: 'Sonha em ser artista — desenha em tinta no fundo do mar.' },
    { name: 'Engolidor', description: 'Criatura de boca gigante que engole tudo que vê, inclusive luz.', funFact: 'Já engoliu um tesouro inteiro — ainda está tentando cagar.' },
    { name: 'Hidra Jovem', description: 'Hidra com apenas 3 cabeças que ainda está crescendo.', funFact: 'Cada cabeça tem uma personalidade diferente e elas brigam entre si.' },
    { name: 'Golem Abissal', description: 'Golem formado por coral negro e pressão oceânica.', funFact: 'Cada vez que um pedaço cai, outro cresce no lugar.' },
    { name: 'Medusa Profunda', description: 'Medusa que habita as fossas mais profundas, com tentáculos venenosos.', funFact: 'Seu veneno faz com que a vítima flutue indefinidamente.' },
    { name: 'Leviatã Bebê', description: 'Jovem criatura marinha que já é do tamanho de um navio.', funFact: 'Ainda está na fase de mordiscar tudo — incluindo ilhas.' },
    { name: 'Tentacle Lord Jr.', description: 'Filho do Titã do Abismo, com apenas 20 tentáculos.', funFact: 'Ainda está aprendendo a coordinar todos os braços.' },
  ],
  'Celestial': [
    { name: 'Anjo Caído', description: 'Anjo que perdeu suas asas de ouro e agora vagueia entre nuvens cinzentas.', funFact: 'Ainda tenta voar às vezes — e cai do mesmo jeito.' },
    { name: 'Serafim Destruido', description: 'Serafim corrompido com 4 asas queimadas e olhos de fúria.', funFact: 'Canta hinos distorcidos que causam dor nos ouvidos mortais.' },
    { name: 'Querubim Rebelde', description: 'Querubim que se recusou a seguir ordens e foi exilado.', funFact: 'Tem至do de dormir — tem medo de sonhar com o paraíso.' },
    { name: 'Goblin Celeste', description: 'Goblin que invadiu o céu e agora rouba nuvens douradas.', funFact: 'Usa as nuens como colchão — é bem confortável.' },
    { name: 'Espírito Puro', description: 'Espírito de luz corrompido que brilha com uma luz enganosa.', funFact: 'Mentiu tanto que sua luz agora é amarela em vez de branca.' },
    { name: 'Cometa Vivo', description: 'Cometa que ganhou consciência e agora escolhe onde cair.', funFact: 'Tem至do de profundidade — sempre pousa em montanhas altas.' },
    { name: 'Golem Dourado', description: 'Golem feito de ouro celestial que protege os portões do céu.', funFact: 'É muito pesado — cada passo cria um terremoto menor.' },
    { name: 'Grifo Sagrado', description: 'Grifo que foi banido do céu por motivos desconhecidos.', funFact: 'Finge que não lembra por que foi banido, mas na verdade comeu o jardim divino.' },
    { name: 'Unicórnio Negro', description: 'Unicórnio corrompido que agora espalha trevas em vez de pura beleza.', funFact: 'Ainda é lindo — mas de um jeito aterrorizante.' },
    { name: 'Angel of Dawn Jr.', description: 'Jovem anjo da alvorada que ainda não aprende a controlar sua luz.', funFact: 'Acorda todo mundo às 5h da manhã sem querer.' },
  ],
  'Cripta': [
    { name: 'Esqueleto Velho', description: 'Esqueleto que passou tanto tempo na cripta que ossos estão ficando translúcidos.', funFact: 'Ainda tenta falar, mas só consegue estalar os ossos.' },
    { name: 'Zumbi Cambaleante', description: 'Zumbi que já perdeu metade do corpo, mas continua avançando.', funFact: 'Esqueceu por que está andando — mas continua andando.' },
    { name: 'Morte-Viva', description: 'Cadáver animado por magia necromântica que obedece ao primeiro que vê.', funFact: 'Gostaria de poder escolher a quem obedece, mas não pode.' },
    { name: 'Goblin Espectral', description: 'Fantasma de um goblin que morreu roubando um baú maldito.', funFact: 'Ainda tenta abrir baús — suas mãos passam por eles.' },
    { name: 'Múmia Enrolada', description: 'Múmia que foi enrolada errado e agora se move em círculos.', funFact: 'Queria ser desenrolada, mas ninguém entende o que ela diz.' },
    { name: 'Wraith Jovem', description: 'Espectro jovem que ainda está aprendendo a assombrar.', funFact: 'Assusta mais por acidente do que de propósito.' },
    { name: 'Golem de Ossos', description: 'Construto feito de milhares de ossos entrelaçados.', funFact: 'Cada osso é de um aventureiro diferente — ele sabe os nomes de todos.' },
    { name: 'Vampirinho', description: 'Vampiro jovem que ainda não sabe morder direito.', funFact: 'Morde coxas em vez de pescoço — é constrangedor.' },
    { name: 'Espectro Sombrio', description: 'Espectro que se alimenta de memórias dos vivos.', funFact: 'Já comeu tantas memórias que esqueceu quem ele é.' },
    { name: 'Lich Jr.', description: 'Jovem lich que ainda está aprendendo a manter sua alma no cajado.', funFact: 'Às vezes esquece onde guardou a alma e entra em pânico.' },
  ],
  'Infernal': [
    { name: 'Diabinho', description: 'Demônio menor que tenta ser maligno, mas acaba sendo apenas irritante.', funFact: 'Sua maior conquista foi fazer um anjo derrubar o café.' },
    { name: 'Goblin Infernal', description: 'Goblin que fez um pacto com o inferno e agora cuspe enxofre.', funFact: 'O pacto dizia que ele teria poder infinito — mas veio com letras miúdas.' },
    { name: 'Demônio Menor', description: 'Demônio de escalão baixo que sonha em ser grande um dia.', funFact: 'Tem至do de fogo — é irônico, mas acontece.' },
    { name: 'Súcubo Júnior', description: 'Súcubo que ainda está aprendendo a seduzir — confunde sedução com perseguição.', funFact: 'Foi bloqueado por 47 aventureiros no Tinder Infernal.' },
    { name: 'Incubiço', description: 'Incubo que tem至do de interação social e evita contato humano.', funFact: 'Prefere monstros a humanos — é mais fácil de lidar.' },
    { name: 'Golem Ígneo', description: 'Golem formado por lava infernal e raiva pura.', funFact: 'Sua raiva é tão intense que às vezes explode — literalmente.' },
    { name: 'Balrog Jovem', description: 'Jovem Balrog que ainda não aprende a controlar seu fogo.', funFact: 'Tenta assustar todo mundo com suas chamas, mas às vezes se assusta com elas.' },
    { name: 'Pit Fiend Jr.', description: 'Filho do senhor do abismo infernal, com apenas 3 olhos.', funFact: 'Ainda não está pronto para o cargo — tem至do de escuro.' },
    { name: 'Cavaleiro Maldito', description: 'Cavaleiro que vendeu sua alma e agora serve eternamente ao inferno.', funFact: 'Arrepende-se todo dia, mas o contrato não tem cláusula de arrependimento.' },
    { name: 'Hell Hound Jr.', description: 'Filhote de cão infernal que cai fogo em vez de latir.', funFact: 'Quando late, as pessoasmorrem de susto — é muito assustador.' },
  ],
  'Dimensional': [
    { name: 'Riftling', description: 'Pequena criatura que nasce de fendas dimensionais e desaparece rapidamente.', funFact: 'Existe por apenas 47 segundos — mas nesses 47 segundos é muito irritante.' },
    { name: 'Goblin Cósmico', description: 'Goblin que viajou entre dimensões e agora não sabe onde está.', funFact: 'Já esteve em 47 universos diferentes — em todos eles é um goblin.' },
    { name: 'Fragmento Vivo', description: 'Pedacinho de realidade que ganhou consciência e está confuso.', funFact: 'Acredita que é uma pessoa, mas na verdade é um conceito.' },
    { name: 'Void Stalker', description: 'Criatura do vazio que persegue almas perdidas entre dimensões.', funFact: 'É muito bom de papo — pode conversar por horas sobre o vazio.' },
    { name: 'Éter Jovem', description: 'Pedaço de éter que ganhou forma e agora flutua confuso.', funFact: 'Ainda não decidiu se é gaz, líquido ou sólido — é tudo ao mesmo tempo.' },
    { name: 'Golem Dimensional', description: 'Golem que existe em múltiplas dimensões ao mesmo tempo.', funFact: 'Às vezes suas partes do corpo estão em universos diferentes.' },
    { name: 'Quimera Cósmica', description: 'Quimera formada por pedaços de realidades diferentes.', funFact: 'Cada cabeça vem de um universo diferente — nunca concordam em nada.' },
    { name: 'Aberração', description: 'Criatura que não deveria existir — é um erro na matrix da realidade.', funFact: 'Olhar para ela faz com que a cabeça doende — mesmo que você não tenha cabeça.' },
    { name: 'Paradoxo Cambiante', description: 'Ser que existe e não existe ao mesmo tempo.', funFact: 'Se você o mata, ele nunca existiu — mas se ele nunca existiu, como você o matou?' },
    { name: 'Void Lord Jr.', description: 'Jovem senhor do vazio que ainda está aprendendo a controlar o nada.', funFact: 'Seu primeiro ataque foi acidental — tropeçou no vazio e caiu em outro universo.' },
  ],
};

// ========== NOMES DE MONSTROS POR TEMA (para compatibilidade) ==========

export function getMonsterNames(): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  
  for (const [theme, monsters] of Object.entries(MONSTER_LORE)) {
    result[theme] = monsters.map(m => m.name);
  }
  
  return result;
}

// ========== NOMES DE BOSSES POR TEMA ==========

export const BOSS_NAMES: Record<string, { name: string; description: string; title: string; sprite?: string }> = {
  'Trevas': {
    name: 'Lorde das Sombras',
    title: 'O Devorador de Luz',
    description: 'Uma entidade de pura escuridão que exists há mais tempo que as estrelas. Seu corpo é feito de sombras sólidas.',
  },
  'Cripta_Special': {
    name: 'Dragão Esqueleto',
    title: 'Chefe da Masmorra dos Mortos',
    description: 'Nível 65. Um dragão esquelético ancestral que guarda a masmorra dos mortos. Seus ataques são devastadores: Sopro de Gelo e Garra de Osso. Suas asas ossadas cortam o ar, e seus olhos vermelhos brilham com fúria eterna.',
    sprite: '/sprites/monsters/dragao-esqueletico.png',
  },
  'Vulcânica': {
    name: 'Senhor Vulcânico',
    title: 'Coração do Vulcão',
    description: 'O próprio vulcão ganhou forma e consciência. Cada erupção é uma de suas respirações.',
  },
  'Glacial': {
    name: 'Rei do Gelo Eterno',
    title: 'Monarca dos Frostlands',
    description: 'Um titã de gelo que governa os reinos congelados com punho de ferro — ou melhor, de gelo.',
  },
  'Abismo': {
    name: 'Titã do Abismo',
    title: 'Lorde das Profundezas',
    description: 'A criatura mais antiga dos oceanos, com tentáculos que se estendem por milhares de metros.',
  },
  'Celestial': {
    name: 'Arcanjo Exilado',
    title: 'O Caído da Luz',
    description: 'O maior dos anjos que se rebelou contra a ordem celestial. Sua luz agora é sombria.',
  },
  'Cripta': {
    name: 'Lich Supremo',
    title: 'Mestre da Necromancia',
    description: 'O maior necromante que já existiu. Sua alma está guardada em 7 frascos escondidos.',
  },
  'Infernal': {
    name: 'Arquidiabo',
    title: 'Príncipe das Chamas',
    description: 'O demônio mais poderoso do inferno, com 6 asas de fogo e um exército de diabinhos.',
  },
  'Dimensional': {
    name: 'Senhor do Vazio',
    title: 'O Guardião do Nada',
    description: 'Uma entidade que habita entre as dimensões, controlando o vazio que separa os universos.',
  },
};

// ========== MONSTROS ESPECIAIS (aparecem raramente) ==========

export const RARE_MONSTERS: MonsterDef[] = [
  {
    id: 'golden_goblin',
    name: 'Goblin Dourado',
    description: 'Um goblin raro banhado a ouro que dropa muito mais ouro que o normal!',
    icon: '✨',
    theme: 'all',
    isBoss: false,
    hpMultiplier: 2,
    damageMultiplier: 1.5,
    goldDrop: 10,
    manaDrop: 0,
  },
  {
    id: 'mana_crystal',
    name: 'Cristal de Mana Ancestral',
    description: 'Um cristal vivo que contém mana pura e concentrada.',
    icon: '💎',
    theme: 'all',
    isBoss: false,
    hpMultiplier: 0.5,
    damageMultiplier: 0,
    goldDrop: 1,
    manaDrop: 5,
  },
  {
    id: 'shadow_assassin',
    name: 'Assassino das Sombras',
    description: 'Um aventureiro corrompido que ataca pelas costas com dano massivo.',
    icon: '🗡️',
    theme: 'all',
    isBoss: false,
    hpMultiplier: 3,
    damageMultiplier: 4,
    goldDrop: 5,
    manaDrop: 0,
  },
  {
    id: 'treasure_mimic',
    name: 'Mimic Tesourei',
    description: 'Disfarçado como um baú, na verdade é um monstro faminto por ouro.',
    icon: '📦',
    theme: 'all',
    isBoss: false,
    hpMultiplier: 1.5,
    damageMultiplier: 2,
    goldDrop: 20,
    manaDrop: 2,
  },
  {
    id: 'void_walker',
    name: 'Caminhante do Vazio',
    description: 'Uma criatura que surge do nada e desaparece no nada — literalmente.',
    icon: '🌀',
    theme: 'Dimensional',
    isBoss: false,
    hpMultiplier: 5,
    damageMultiplier: 3,
    goldDrop: 8,
    manaDrop: 3,
  },
];

export default MONSTER_LORE;
