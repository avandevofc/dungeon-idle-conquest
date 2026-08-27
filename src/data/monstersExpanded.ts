// ==========================================
// MONSTROS ADICIONAIS EXPANDIDOS — Dungeon Idle Conquest
// ==========================================

import { MonsterLore } from './monsters';

// ========== MONSTROS ADICIONAIS POR TEMA ==========

export const MONSTROS_ADICIONAIS: Record<string, MonsterLore[]> = {
  'Trevas': [
    { name: 'Espectro da Meia-Noite', description: 'Espírito que só aparece quando os sinos tocam meia-noite, assustando viajantes perdidos.', funFact: 'Coleciona relógios parados — acredita que controla o tempo.' },
    { name: 'Súcubo das Trevas', description: 'Demônio sedutor que se disfarça de pessoa querida para atrair vítimas.', funFact: 'Já se disfarçou de 47 pessoas diferentes — todas eram constrangedoras.' },
    { name: 'Guardião do Portal', description: 'Criatura que protege os portais entre dimensões, atacando quem tenta passar.', funFact: 'Nunca deixou ninguém passar — nem ele mesmo.' },
    { name: 'Cavaleiro Negro', description: 'Cavaleiro corrompido que vagueia entre as sombras, procurando redenção.', funFact: 'Já tentou se redimir 100 vezes — sempre falha no último passo.' },
    { name: 'Bruxa das Sombras', description: 'Bruxa que canaliza escuridão pura para curar aliados e destruir inimigos.', funFact: 'Suas poções são pretas — mas sabor de morango.' },
    { name: 'Golem Sombrio', description: 'Construto de obsidiana que se move silenciosamente entre as sombras.', funFact: 'É tão silencioso que até ele se assusta quando tropeça.' },
    { name: 'Wraith Ancestral', description: 'Espectro milenar que controla as sombras com um toque.', funFact: 'Já existia antes do mundo — e já esqueceu como nasceu.' },
    { name: 'Vampiro Lorde', description: 'Vampiro aristocrático com poderes sobre as trevas e sangue.', funFact: 'Só bebe vinho tinto com sangue — é exigente.' },
    { name: 'Morcego Demoníaco', description: 'Morcego com chifres e olhos vermelhos que espalha medo.', funFact: 'Ao morrer, explode em morcegos menores — é como uma caixa de pandora.' },
    { name: 'Esqueleto das Trevas', description: 'Esqueleto animado por magia negra que protege os corredores escuros.', funFact: 'Ainda tenta falar, mas só consegue estalar os ossos.' },
  ],
  'Vulcânica': [
    { name: 'Gigante de Magma', description: 'Titã formado por rocha derretida que caminha sobre rios de lava.', funFact: 'Cada passo cria um terremoto — é um sismo ambulante.' },
    { name: 'Serpente de Fogo', description: 'Serpente que nada em lava e cospe fogo pelas presas.', funFact: 'Ainda está aprendendo a controlar o fogo — às vezes engasga.' },
    { name: 'Duende Ígneo', description: 'Duende que habita as cavernas vulcânicas e coleta cristais de fogo.', funFact: 'Coleciona cristais como se fossemPokemon — é obcecado.' },
    { name: 'Drake Ancião', description: 'Dragão velho que domina o fogo, mas está ficando lento.', funFact: 'Já derrotou 100 heróis — mas não lembra de nenhum.' },
    { name: 'Elemental de Lava', description: 'Pura energia vulcânica em forma humanoid, com olhos de magma.', funFact: 'Chora lava quando está triste — é dramático demais.' },
    { name: 'Goblin Vulkanista', description: 'Goblin que forja armas com lava e obsidiana.', funFact: 'Suas armas são tão quentes que derretem antes de acertar o alvo.' },
    { name: 'Troll de Pedra', description: 'Troll gigante com pele de rocha que resiste ao calor extremo.', funFact: 'Acha que é indestrutível — mas é só pedra com cara de raiva.' },
    { name: 'Fênix Ancestral', description: 'Pássaro de fogo que renasce das cinzas há milênios.', funFact: 'Já morreu 1000 vezes — está ficando cansada de renascer.' },
    { name: 'Magma Worm', description: 'Vermelho gigante que nada em magma e devora tudo ao redor.', funFact: 'Ainda está crescendo — quando parar, será do tamanho de uma montanha.' },
    { name: 'Golem de Obsidiana', description: 'Golem formado por obsidiana vulcânica que queima tudo que toca.', funFact: 'É tão quente que não pode ser tocado — nem por outros golems.' },
  ],
  'Glacial': [
    { name: 'Gigante de Gelo', description: 'Titã de gelo que governa as terras congeladas com punho de ferro.', funFact: 'Ainda está crescendo — quando parar, será do tamanho de uma montanha.' },
    { name: 'Serpente Glacial', description: 'Serpente que se move por entre os icebergs e congela tudo ao redor.', funFact: 'Pode se tornar invisível quando está sobre neve — é como um camaleão.' },
    { name: 'Harpia Gelada', description: 'Harpia com penas de gelo e garras que congelam ao tocar.', funFact: 'Seu canto faz com que até o fogo se apague — é como um extintor.' },
    { name: 'Goblin de Gelo', description: 'Goblin que sobreviveu ao frio extremo e agora usa gelo como arma.', funFact: 'Guarda sorvete no bolso — para散热 do próprio corpo.' },
    { name: 'Elemental de Gelo', description: 'Pura energia gelada que assume forma humanoid e congelante.', funFact: 'Chora cristais de gelo quando está triste — é dramático.' },
    { name: 'Yeti Ancião', description: 'Yeti milenar com pelo branco e sabedoria ancestral.', funFact: 'Já viu a humanidade nascer — e acha bem chata.' },
    { name: 'Golem de Gelo', description: 'Golem formado por gelo eterno que não derrete com o tempo.', funFact: 'Cada 100 anos, ganha uma nova camada de gelo — como uma árvore.' },
    { name: 'Lobo de Gelo', description: 'Lobo coberto de cristais de gelo que deixa rastros congelados.', funFact: 'Seu sopro congela até o tempo ao redor — é como um freezer.' },
    { name: 'Frost Giant Jr.', description: 'Jovem gigante de gelo que ainda está crescendo.', funFact: 'Ainda não atinge 10 metros — apenas 9.99.' },
    { name: 'Aranha de Gelo', description: 'Aranha que tece teias de gelo que congelam qualquer coisa que toque.', funFact: 'Suas teias são mais fortes que aço quando estão frias — é química.' },
  ],
  'Abismo': [
    { name: 'Leviatã Ancião', description: 'Criatura marinha milenar que domina as profundezas oceânicas.', funFact: 'Já existia antes dos oceanos — e já esqueceu como era antes.' },
    { name: 'Kraken Colossal', description: 'Kraken gigante com tentáculos que se estendem por quilômetros.', funFact: 'Ainda não aprendeu a controlar todos os tentáculos — é desajeitado.' },
    { name: 'Medusa Profunda', description: 'Medusa que habita as fossas mais profundas, com tentáculos venenosos.', funFact: 'Seu veneno faz com que a vítima flutue indefinidamente — é como um balão.' },
    { name: 'Polvo Sombrio', description: 'Polvo que controla as correntes abissais com sua mente.', funFact: 'Sonha em ser artista — desenha em tinta no fundo do mar.' },
    { name: 'Engolidor Gigante', description: 'Criatura de boca gigante que engole tudo que vê, inclusive luz.', funFact: 'Já engoliu um tesouro inteiro — ainda está tentando cagar.' },
    { name: 'Hidra Anciã', description: 'Hidra com 7 cabeças que já derrotou muitos heróis.', funFact: 'Cada cabeça tem uma personalidade diferente — e brigam entre si.' },
    { name: 'Tentacle Lord', description: 'Senhor dos tentáculos que controla todas as criaturas abissais.', funFact: 'Ainda está aprendendo a coordenar todos os braços — é desajeitado.' },
    { name: 'Peixe-Lanterna Ancião', description: 'Peixe abissal com luz enganosa que atrai presas há milênios.', funFact: 'A luz é na verdade um osso de aventureiro anterior — é macabro.' },
    { name: 'Serpente Abissal', description: 'Serpente marinha gigante que domina as correntes profundas.', funFact: 'Pode se tornar invisível quando está sobre areia — é como um camaleão.' },
    { name: 'Golem Abissal', description: 'Golem formado por coral negro e pressão oceânica.', funFact: 'Cada vez que um pedaço cai, outro cresce no lugar — é regenerativo.' },
  ],
  'Celestial': [
    { name: 'Arcanjo Exilado', description: 'O maior dos anjos que se rebelou contra a ordem celestial.', funFact: 'Sua luz agora é sombria — é como um farol quebrado.' },
    { name: 'Serafim Corrompido', description: 'Serafim que perdeu sua fé e agora serve às trevas.', funFact: 'Ainda canta hinos, mas agora são distorcidos — é triste.' },
    { name: 'Querubim Rebelde', description: 'Querubim que se recusou a seguir ordens e foi exilado.', funFact: 'Tem至do de dormir — tem medo de sonhar com o paraíso.' },
    { name: 'Goblin Celeste', description: 'Goblin que invadiu o céu e agora rouba nuvens douradas.', funFact: 'Usa as nuvens como colchão — é bem confortável.' },
    { name: 'Espírito Puro', description: 'Espírito de luz corrompido que brilha com uma luz enganosa.', funFact: 'Mentiu tanto que sua luz agora é amarela em vez de branca.' },
    { name: 'Cometa Vivo', description: 'Cometa que ganhou consciência e agora escolhe onde cair.', funFact: 'Tem至do de profundidade — sempre pousa em montanhas altas.' },
    { name: 'Golem Dourado', description: 'Golem feito de ouro celestial que protege os portões do céu.', funFact: 'É muito pesado — cada passo cria um terremoto menor.' },
    { name: 'Grifo Sagrado', description: 'Grifo que foi banido do céu por motivos desconhecidos.', funFact: 'Finge que não lembra por que foi banido, mas na verdade comeu o jardim divino.' },
    { name: 'Unicórnio Negro', description: 'Unicórnio corrompido que agora espalha trevas em vez de pura beleza.', funFact: 'Ainda é lindo — mas de um jeito aterrorizante.' },
    { name: 'Angel of Dawn Jr.', description: 'Jovem anjo da alvorada que ainda não aprende a controlar sua luz.', funFact: 'Acorda todo mundo às 5h da manhã sem querer — é inconveniente.' },
  ],
  'Cripta': [
    { name: 'Lich Supremo', description: 'O maior necromante que já existiu. Sua alma está guardada em 7 frascos escondidos.', funFact: 'Já esqueceu onde guardou 3 dos frascos — está em pânico.' },
    { name: 'Vampiro Ancião', description: 'Vampiro que existe há milênios e domina os poderes das trevas.', funFact: 'Já bebeu sangue de 1000 heróis — é bem exigente.' },
    { name: 'Múmia Real', description: 'Faraó mumificado que protege seu tesouro eternamente.', funFact: 'Ainda espera que alguém desvende seu túmulo — é paciente.' },
    { name: 'Esqueleto Arqueiro', description: 'Esqueleto que dispara flechas de osso com precisão mortal.', funFact: 'Nunca erra um tiro — mas às vezes atira no próprio pé.' },
    { name: 'Zumbi Ancião', description: 'Zumbi que já perdeu metade do corpo, mas continua avançando.', funFact: 'Esqueceu por que está andando — mas continua andando.' },
    { name: 'Wraith Ancestral', description: 'Espectro milenar que controla as sombras com um toque.', funFact: 'Já existia antes do mundo — e já esqueceu como nasceu.' },
    { name: 'Golem de Ossos', description: 'Construto feito de milhares de ossos entrelaçados.', funFact: 'Cada osso é de um aventureiro diferente — ele sabe os nomes de todos.' },
    { name: 'Vampirinho', description: 'Vampiro jovem que ainda não sabe morder direito.', funFact: 'Morde coxas em vez de pescoço — é constrangedor.' },
    { name: 'Espectro Sombrio', description: 'Espectro que se alimenta de memórias dos vivos.', funFact: 'Já comeu tantas memórias que esqueceu quem ele é.' },
    { name: 'Lich Jr.', description: 'Jovem lich que ainda está aprendendo a manter sua alma no cajado.', funFact: 'Às vezes esquece onde guardou a alma e entra em pânico.' },
  ],
  'Infernal': [
    { name: 'Arquidiabo', description: 'O demônio mais poderoso do inferno, com 6 asas de fogo.', funFact: 'Já derrotou 1000 anjos — mas ainda tem至do de escuro.' },
    { name: 'Diabo Ancião', description: 'Demônio milenar que domina as chamas eternas.', funFact: 'Já existia antes do inferno — e já esqueceu como era antes.' },
    { name: 'Balrog Supremo', description: 'O maior dos Balrogs, com chamas que queimam a própria alma.', funFact: 'Já derrotou 500 heróis — mas ainda não aprendeu a cozinhar.' },
    { name: 'Súcubo Anciã', description: 'Súcubos milenar que seduz heróis há séculos.', funFact: 'Já foi bloqueada por 1000 heróis no Tinder Infernal.' },
    { name: 'Incubiço Ancião', description: 'Incubo milenar que tem至do de interação social.', funFact: 'Prefere monstros a humanos — é mais fácil de lidar.' },
    { name: 'Golem Ígneo', description: 'Golem formado por lava infernal e raiva pura.', funFact: 'Sua raiva é tão intense que às vezes explode — literalmente.' },
    { name: 'Hell Hound Ancião', description: 'Cão infernal milenar que caça almas perdidas.', funFact: 'Já caçou 1000 almas — mas ainda não aprendu a voltar para casa.' },
    { name: 'Cavaleiro Maldito', description: 'Cavaleiro que vendeu sua alma e agora serve eternamente ao inferno.', funFact: 'Arrepende-se todo dia, mas o contrato não tem cláusula de arrependimento.' },
    { name: 'Pit Fiend Supremo', description: 'O maior dos demônios infernais, com poder destrutivo massivo.', funFact: 'Ainda não está pronto para o cargo — tem至do de escuro.' },
    { name: 'Inferno Golem', description: 'Golem formado por chamas infernais que queima tudo ao redor.', funFact: 'É tão quente que não pode ser tocado — nem por outros demônios.' },
  ],
  'Dimensional': [
    { name: 'Void Lord', description: 'Senhor do vazio que controla o nada entre dimensões.', funFact: 'Já existia antes do nada — e já esqueceu como era.' },
    { name: 'Rift Lord', description: 'Senhor das fendas dimensionais que abre portais por onde quiser.', funFact: 'Já abriu 1000 portais — mas sempre se perde no caminho.' },
    { name: 'Fragmento Ancião', description: 'Pedaço de realidade que ganhou consciência e está confuso há milênios.', funFact: 'Acredita que é uma pessoa, mas na verdade é um conceito.' },
    { name: 'Void Stalker Ancião', description: 'Criatura do vazio que persegue almas perdidas entre dimensões.', funFact: 'É muito bom de papo — pode conversar por horas sobre o vazio.' },
    { name: 'Éter Ancião', description: 'Pedaço de éter que ganhou forma e agora flutua confuso há milênios.', funFact: 'Ainda não decidiu se é gaz, líquido ou sólido — é tudo ao mesmo tempo.' },
    { name: 'Quimera Cósmica Anciã', description: 'Quimera formada por pedaços de realidades diferentes há milênios.', funFact: 'Cada cabeça vem de um universo diferente — nunca concordam em nada.' },
    { name: 'Aberração Suprema', description: 'Criatura que não deveria existir — é um erro na matrix da realidade.', funFact: 'Olhar para ela faz com que a cabeça doinda — mesmo que você não tenha cabeça.' },
    { name: 'Paradoxo Ancião', description: 'Ser que existe e não existe ao mesmo tempo há milênios.', funFact: 'Se você o mata, ele nunca existiu — mas se ele nunca existiu, como você o matou?' },
    { name: 'Dimensional Golem', description: 'Golem que existe em múltiplas dimensões ao mesmo tempo.', funFact: 'Às vezes suas partes do corpo estão em universos diferentes — é confuso.' },
    { name: 'Void Walker Ancião', description: 'Caminhante do vazio que já percorreu todas as dimensões.', funFact: 'Já esteve em 10000 universos diferentes — em todos eles é um monstro.' },
  ],
};

// ========== FUNÇÃO PARA OBTER TODOS OS MONSTROS ==========

export function getAllMonsters(): MonsterLore[] {
  const allMonsters: MonsterLore[] = [];
  for (const monsters of Object.values(MONSTROS_ADICIONAIS)) {
    allMonsters.push(...monsters);
  }
  return allMonsters;
}

// ========== FUNÇÃO PARA OBTER MONSTROS POR TEMA ==========

export function getMonstersByTheme(theme: string): MonsterLore[] {
  return MONSTROS_ADICIONAIS[theme] || [];
}

// ========== TOTAL DE MONSTROS ==========

export function getTotalMonsterCount(): number {
  return getAllMonsters().length;
}

export default MONSTROS_ADICIONAIS;
