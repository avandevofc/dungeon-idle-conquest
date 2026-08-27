// ==========================================
// ITENS EXPANDIDOS — Dungeon Idle Conquest
// ==========================================

import { ItemDef, ItemRarity } from '../types';

export interface ItemLore {
  id: string;
  name: string;
  description: string;
  funFact: string;
  lore: string;
}

// ========== LORE DOS ITENS POR CATEGORIA ==========

export const WEAPON_LORE: ItemLore[] = [
  // COMUM
  { id: 'rusty_sword', name: 'Espada Enferrujada', description: 'Uma velha espada que já viu muitas batalhas. Ainda corta... às vezes.', funFact: 'O ferreiro que a fez desistiu de ser ferreiro no dia seguinte.', lore: 'Forjada por um aprendiz que trocou o ferro por couro de galinha.' },
  { id: 'iron_blade', name: 'Lâmina de Ferro', description: 'Espada básica mas confiável. Não vai ganhar nenhum prêmio, mas mata monstros.', funFact: 'Foi usada para abrir latas de conserva durante a guerra.', lore: 'O ferreiro mais famoso da vila a fez em 5 minutos — e cobrou caro.' },
  { id: 'bone_club', name: 'Clava de Ossos', description: 'Macaco feito do fêmur de um monstro anterior. Ironicamente eficiente.', funFact: 'O monstro original ainda está confuso sobre onde foi parar seu osso.', lore: 'Toda clava conta uma história — esta conta a história de um fêmur.' },
  { id: 'stone_axe', name: 'Machado de Pedra', description: 'Machado primitivo que mais parece um pedaço de rocha afiada.', funFact: 'É tão pesado que mais parece um peso de papel gigante.', lore: 'Usado pelos primeiros humanos para cortar árvores — e dedos acidentalmente.' },
  { id: 'stick_wand', name: 'Cajado de Graveto', description: 'Não é mágico. É só um graveto. Mas é um graveto afiado.', funFact: 'O mago que o usou foi rido pela guilda inteira.', lore: 'Quando não há cajado mágico, um graveto afiado serve.' },
  
  // INCOMUM
  { id: 'shadow_dagger', name: 'Adaga Sombria', description: 'Adaga que absorve luz ao redor, tornando-se quase invisível.', funFact: 'Já foi perdida 3 vezes porque ninguém consegue encontrá-la no escuro.', lore: 'Forjada à meia-noite por um ladrão que queria roubar a si mesmo.' },
  { id: 'flame_sword', name: 'Espada Ígnea', description: 'Espada que arde com chamas eternas que não queimam quem a empunha.', funFact: 'É ótima para acender velas — e matar monstros, claro.', lore: 'O ferreiro a Forjou com lágrimas de fênix e raiva de dragão.' },
  { id: 'thunder_hammer', name: 'Martelo do Trovão', description: 'Martelo que convoca raios quando golpeia. Cuidado com a eletricidade.', funFact: 'Já causou 3 apagões na vila ao lado.', lore: 'Feito com um pedaço de trovão solidificado — sim, é tão perigoso quanto parece.' },
  { id: 'poison_fang', name: 'Presa Venenosa', description: 'Adaga feita com a presa de um monstro peçonhento. Cada corte envenena.', funFact: 'O poiso é tão forte que o alvo morre antes de sentir a dor.', lore: 'Um caçador extraiu a presa e descobriu que o veneno era mais valioso que o monstro.' },
  { id: 'crystal_wand', name: 'Cajado de Cristal', description: 'Cajado com ponta de cristal que amplifica magia natural.', funFact: 'O cristal brilha quando o mago está com raiva — é um indicador de humor.', lore: 'Encontrado em uma caverna de cristais, onde曾 existiu um mago ancient.' },
  
  // RARO
  { id: 'frost_staff', name: 'Cajado Glacial', description: 'Cajado que congela o ar ao redor, criando uma aura de gelo eterno.', funFact: 'O mago que o usa precisa de luvas — o cajado congela as mãos.', lore: 'Forjado com gelo de um glacier milenar que nunca derreteu.' },
  { id: 'void_blade', name: 'Lâmina do Vazio', description: 'Espada que corta a própria realidade, abrindo portais microscópicos.', funFact: 'Já cortou acidentalmente um buraco para outra dimensão — foi constrangedor.', lore: 'Forjada por um artesão que estudou o vazio entre estrelas.' },
  { id: 'blood_reaper', name: 'Ceifador de Sangue', description: 'Foice que se alimenta do sangue dos inimigos e se fortalece.', funFact: 'Tem至do de ferrugem — é irônico, mas acontece.', lore: 'Dizem que a foice chora sangue quando está com fome.' },
  { id: 'dragon_slayer', name: 'Matador de Dragões', description: 'Espada forjada especificamente para derrotar dragões. Funciona em qualquer coisa.', funFact: 'O primeiro dragão que viu riu dela — depois foi morto.', lore: 'Forjada com escamas de 100 dragões e a raiva de 1000 cavaleiros.' },
  { id: 'holy_staff', name: 'Cajado Sagrado', description: 'Cajado canaliza luz divina, queimando mortos-vivos e curando aliados.', funFact: 'Funciona melhor contra mortos-vivos — contra vivos, é apenas um graveto brilhante.', lore: 'Abençoado por um arcanjo que estava de bom humor.' },
  
  // ÉPICO
  { id: 'holy_mace', name: 'Maça Sagrada', description: 'Maça abençoada que causa dano sagrado, eficaz contra demônios e mortos-vivos.', funFact: 'O papa曾 tentou confiscá-la, mas o dono era mais forte.', lore: 'Forjada com ouro do templo mais sagrado do reino.' },
  { id: 'dragon_fang', name: 'Presa de Dragão', description: 'Espada feita com a presa de um dragão ancão. Causa dano de fogo.', funFact: 'O dragão original ainda está procurando sua presa.', lore: 'Um herói matou um dragão e descobriu que a presa era mais valiosa que o ouro.' },
  { id: 'soul_edge', name: 'Fio da Alma', description: 'Espada que corta a própria alma do inimigo, causando dano permanente.', funFact: 'O primeiro usuário cortou sua própria alma acidentalmente — foi awkward.', lore: 'Forjada por um necromante que queria uma espada que matasse duas vezes.' },
  { id: 'chaos_blade', name: 'Lâmina do Caos', description: 'Espada que causa dano aleatório — às vezes mais, às vezes menos.', funFact: 'O usuário nunca sabe quanto dano vai causar — é uma surpresa.', lore: 'Forjada com fragmentos de realidades colapsadas.' },
  { id: 'shadow_katana', name: 'Katana das Sombras', description: 'Katana que se move sozinha, cortando sombras e ilusões.', funFact: 'Já cortou acidentalmente a própria sombra — ficou sem sombra por uma semana.', lore: 'Forjada por um samurai que queria caçar fantasmas.' },
  
  // LENDÁRIO
  { id: 'excalibur', name: 'Excalibur', description: 'A lendária espada do rei Arthur. Dizem que quem a empunha é invencível.', funFact: 'Na verdade, o rei Arthur perdeu a espada várias vezes — mas isso é outra história.', lore: 'Forjada por hads comum, banhada em luz estelar e guardada em uma pedra.' },
  { id: 'soul_reaper', name: 'Ceifador de Almas', description: 'Foice que coleta almas dos mortos. Cada alma coletada a fortalece.', funFact: 'A foice tem至do de solidão — precisa constantemente de novas almas.', lore: 'Dizem que a foice tem consciência própria e escolhe seu usuário.' },
  { id: 'reality_breaker', name: 'Quebrador de Realidade', description: 'Espada que corta a própria tessitura da realidade.', funFact: 'Já cortou acidentalmente um universo inteiro — foi consertado, mas...', lore: 'Forjada por um deus que estava entediado com a realidade atual.' },
  { id: 'eternal_edge', name: 'Fio Eterno', description: 'Espada que nunca perde o fio, independentemente do uso.', funFact: 'Já foi usada para cortar pão, papel e até cabelo — sempre afiada.', lore: 'Forjada com fragmentos de tempo congelado e luz de estrela morta.' },
  { id: 'void_scythe', name: 'Foice do Vazio', description: 'Foice que aprisiona almas no vazio entre dimensões.', funFact: 'As almas aprisionadas formam uma comitiva dentro da foice — é uma festa.', lore: 'Criada pelo Senhor do Vazio como presente para seu aniversário.' },
];

export const ARMOR_LORE: ItemLore[] = [
  // COMUM
  { id: 'cloth_vest', name: 'Vestimenta de Pano', description: 'Camada básica de tecido que protege contra mosquitos — e pouco mais.', funFact: 'O tecido é tão fino que dá para ver através dele.', lore: 'Feita com as sobras de teco de uma costureira que não estava inspirada.' },
  { id: 'leather_armor', name: 'Armadura de Couro', description: 'Couro resistente que protege contra arranhões e olhares desapprovadores.', funFact: 'O couro é de um monstro que morreu de vergonha.', lore: 'O couro mais comum nas dungeons — monstros adoram arranhá-lo.' },
  { id: 'padded_vest', name: 'Colete Acolchoado', description: 'Colete que absorve impactos como se fosse um travesseiro de luta.', funFact: 'O usuário parece um travesseiro ambulante — mas está protegido.', lore: 'Inventado por um covarde que queria fugir das batalhas protegido.' },
  { id: 'scale_mail', name: 'Cota de Escamas', description: 'Escamas de monstro costuradas juntas. Parece um crocodilo fashion.', funFact: 'O monstro original ainda está confuso sobre suas escamas.', lore: 'Cada escama conta uma história — a maioria são histórias de monstros tristes.' },
  { id: 'fur_cloak', name: 'Manto de Pelúcia', description: 'Manto feito com pelo de lobo que é mais fofo do que protetor.', funFact: 'O lobo original ainda está procurando seu pelo.', lore: 'Feito por uma caçadora que queria um manto estiloso — e功能性的.' },
  
  // INCOMUM
  { id: 'chainmail', name: 'Cota de Malha', description: 'Anéis de metal entrelaçados que distribuem o impacto dos golpes.', funFact: 'Cada anel é menor que um grão de arroz — são milhares deles.', lore: 'O ferreiro levou 3 anos para fazer uma cota inteira — e depois perdeu.' },
  { id: 'plate_armor', name: 'Armadura de Placas', description: 'Placas de metal que cobrem o corpo inteiro. Imóvel, mas protetor.', funFact: 'O usuário não consegue se curvar para pegar algo no chão.', lore: 'O mais pesado que um humano consegue carregar — e ainda assim, monstros destroem.' },
  { id: 'bone_shield', name: 'Escudo de Ossos', description: 'Escudo feito com ossos de monstros derrotados. Cada osso tem um nome.', funFact: 'O escudo ranger a cada passo — é como caminhar com um xilofone.', lore: 'Cada osso é de um monstro diferente — o escudo conta histórias em segredo.' },
  { id: 'dark_cloak', name: 'Manto Negro', description: 'Manto que absorve luz, tornando o usuário quase invisível no escuro.', funFact: 'É tão escuro que até o usuário não se vê no espelho.', lore: 'Feito com tecido do vazio — literalmente, é um pedaço de nada.' },
  { id: 'reinforced_leather', name: 'Couro Reforçado', description: 'Couro reforçado com fibras metálicas que resistem a arranhões.', funFact: 'O monstro que tentou arranhar ficou com as garras quebradas.', lore: 'O couro mais resistente que existe — exceto quando encontra dragões.' },
  
  // RARO
  { id: 'shadow_cloak', name: 'Manto das Sombras', description: 'Manto feito com sombras sólidas que se move sozinho.', funFact: 'Às vezes o manto tem至do de ficar parado — ele gosta de se mover.', lore: 'Forjado por um necromante que queria um manto que o acompanhasse.' },
  { id: 'dragon_scale', name: 'Escama de Dragão', description: 'Escama de dragão que é mais resistente que aço e mais leve que pena.', funFact: 'A escama ainda é quente — o dragão original está bravo.', lore: 'Cada escama vale mais que uma fortuna inteira.' },
  { id: 'crystal_plate', name: 'Placas de Cristal', description: 'Placas de cristal mágico que se regeneram quando danificadas.', funFact: 'O cristal brilha tanto que o usuário parece uma lâmpada ambulante.', lore: 'Forjado com cristais de uma caverna que曾 era um templo de luz.' },
  { id: 'frost_armor', name: 'Armadura de Gelo', description: 'Armadura que congela qualquer coisa que toque, incluindo o usuário.', funFact: 'O usuário precisa de luvas — senão as mãos congelam no lugar.', lore: 'Feita com gelo eterno que nunca derrete — nem quando o sol está perto.' },
  { id: 'void_shroud', name: 'Sudário do Vazio', description: 'Sudário que torna o usuário etéreo, permitindo que ataques o atravessem.', funFact: 'O usuário às vezes esquece que está etéreo e tenta pegar coisas — elas caem no chão.', lore: 'Encontrado em uma tumba vazia — o dono original desapareceu no vazio.' },
  
  // ÉPICO
  { id: 'divine_plate', name: 'Armadura Divina', description: 'Armadura abençoada por anjos que brilha com luz sagrada.', funFact: 'A armadura é tão brilhante que acorda todo mundo ao amanhecer.', lore: 'Forjada no paraíso e caída acidentalmente na terra — um anjo a procurou por séculos.' },
  { id: 'berserker_plate', name: 'Armadura do Berserker', description: 'Armadura que se fortalece quanto mais ferido o usuário está.', funFact: 'O usuário precisa se machucar para ficar mais forte — é um paradoxo.', lore: 'Feita por um guerreiro que gostava de sentir dor — por razões que ninguém entende.' },
  { id: 'shadow_plate', name: 'Armadura das Sombras', description: 'Armadura que se torna mais forte quanto mais escuro estiver o ambiente.', funFact: 'Em dias de sol, é como usar papel de presente — não protege nada.', lore: 'Forjada com sombras solidificadas e a raiva de um lobo da noite.' },
  { id: 'phoenix_mail', name: 'Cota da Fênix', description: 'Armadura que ressuscita o usuário uma vez por batalha.', funFact: 'O usuário morre e revive automaticamente — é como um jogo com checkpoint.', lore: 'Feita com penas de fênix e lágrimas de um mago que já morreu 3 vezes.' },
  { id: 'titan_plate', name: 'Armadura do Titã', description: 'Armadura pesada que pertenceu a um titã. Ainda tem marcas de dedos gigantes.', funFact: 'O usuário parece uma formiga usando armadura de elefante.', lore: 'O titã original a trocou por uma caixa de chocolate — foi uma troca justa.' },
  
  // LENDÁRIO
  { id: 'immortal_cuirass', name: 'Couraça Imortal', description: 'Armadura que nunca é destruída, independente do dano recebido.', funFact: 'Já resistiu a ataques de 100 dragões simultâneos — e nem arranhou.', lore: 'Forjada por um deus que queria a armadura perfeita — e conseguiu.' },
  { id: 'void_armor', name: 'Armadura do Vazio', description: 'Armadura que existe em múltiplas dimensões, impossível de destruir.', funFact: 'O usuário às vezes sente braços extras — são de outras dimensões.', lore: 'Criada pelo Senhor do Vazio como presente de aniversário para si mesmo.' },
  { id: 'celestial_plate', name: 'Armadura Celestial', description: 'Armadura feita com luz de estrelas e abençoada pelos deuses.', funFact: 'A armadura canta uma canção suave quando o usuário está triste.', lore: 'Forjada no coração de uma estrela que estava morrendo — sua última obra-prima.' },
  { id: 'blood_armor', name: 'Armadura de Sangue', description: 'Armadura viva que se alimenta do sangue do usuário para se fortalecer.', funFact: 'O usuário precisa alimentar a armadura todos os dias — como um animal de estimação.', lore: 'Criada por um vampiro que queria uma armadura que entendesse sua fome.' },
  { id: 'eternal_guard', name: 'Guarda Eterna', description: 'Armadura que protege contra TODOS os tipos de dano — mágico, físico e cósmico.', funFact: 'É tão protetora que o usuário não sente nada — nem o vento.', lore: 'Forjada com fragmentos de todas as realidades existentes.' },
];

export const ACCESSORY_LORE: ItemLore[] = [
  // COMUM
  { id: 'lucky_ring', name: 'Anel da Sorte', description: 'Anel que traz sorte — ou pelo menos a pessoa acredita que traz.', funFact: 'O anel já foi perdido 7 vezes — mas sempre aparece no bolso certo.', lore: 'Feito com ouro de um leprechaun que estava de bom humor.' },
  { id: 'iron_pendant', name: 'Pingente de Ferro', description: 'Pingente simples que protege contra moreias — ou contra moreias que não existem.', funFact: 'O pingente é tão feio que os monstros fogem de vergonha.', lore: 'Feito por um ferreiro que queria um presente para sua esposa — ela não gostou.' },
  { id: 'leather_bracelet', name: 'Pulseira de Couro', description: 'Pulseira de couro que dá coragem — ou pelo menos a pessoa acredita que dá.', funFact: 'A pulseira é tão apertada que o usuário não consegue tirá-la.', lore: 'Feita com couro de monstro que morreu de vergonha.' },
  { id: 'bone_necklace', name: 'Colar de Ossos', description: 'Colar feito com ossos de monstros que traz proteção contra espíritos.', funFact: 'Os ossos ranger a cada passo — é como ter um	xilofone no pescoço.', lore: 'Feito por um xamã que queria um colar estiloso — e功能性的.' },
  { id: 'stone_ring', name: 'Anel de Pedra', description: 'Anel de pedra que dá resistência — ou pelo menos a pessoa acredita que dá.', funFact: 'O anel é tão pesado que o dedo do usuário fica torto.', lore: 'Feito com pedra de um rio que曾 era sagrado.' },
  
  // INCOMUM
  { id: 'crit_amulet', name: 'Amuleto Crítico', description: 'Amuleto que aumenta a chance de acertos críticos em 3%.', funFact: 'O amuleto vibra quando o usuário está prestes a acertar um crítico.', lore: 'Feito com cristal de um mago que só acertava críticos — e depois morreu.' },
  { id: 'gold_charm', name: 'Talismã Dourado', description: 'Talismã que aumenta o ouro dropado em 15%.', funFact: 'O talismã atrai ouro — e também ladrões.', lore: 'Feito com ouro de um leprechaun que estava muito de bom humor.' },
  { id: 'swift_boots', name: 'Botas da Velocidade', description: 'Botas que aumentam a velocidade de ataque em 5%.', funFact: 'O usuário corre tão rápido que às vezes esquece para onde estava indo.', lore: 'Feitas com asas de um grifo que não sabia voar.' },
  { id: 'mana_crystal_ring', name: 'Anel de Cristal de Mana', description: 'Anel que armazena mana e a libera gradualmente.', funFact: 'O anel brilha quando o usuário está com raiva — é um indicador de humor.', lore: 'Feito com cristal de mana que曾 era um olho de monstro.' },
  { id: 'shadow_cloak_pin', name: 'Broche do Manto Sombrio', description: 'Broche que esconde o usuário em sombras quando está parado.', funFact: 'O usuário às vezes fica tão escondido que esquece onde está.', lore: 'Feito com sombra solidificada e a raiva de um lobo da noite.' },
  
  // RARO
  { id: 'berserker_ring', name: 'Anel do Berserker', description: 'Anel que aumenta o dano crítico em 20%.', funFact: 'O anel faz com que o usuário fique com raiva automaticamente.', lore: 'Feito com sangue de um berserker que nunca parou de lutar.' },
  { id: 'vampiric_pendant', name: 'Pingente Vampírico', description: 'Pingente que rouba vida dos inimigos a cada golpe.', funFact: 'O pingente suga vida como se fosse um canudo — é nojento, mas eficiente.', lore: 'Feito com sangue de um vampiro que morreu de sede — é irônico.' },
  { id: 'frost_necklace', name: 'Colar de Gelo', description: 'Colar que congela inimigos próximos aleatoriamente.', funFact: 'O colar é tão frio que o usuário precisa de luvas para tocá-lo.', lore: 'Feito com gelo eterno que nunca derrete — nem quando o sol está perto.' },
  { id: 'flame_ring', name: 'Anel de Fogo', description: 'Anel que causa dano de fogo a cada golpe.', funFact: 'O anel é tão quente que o usuário precisa de luvas para tocá-lo.', lore: 'Feito com lava de um vulcão que estava erupção — foi perigoso, mas valeu a pena.' },
  { id: 'void_pendant', name: 'Pingente do Vazio', description: 'Pingente que permite ao usuário atacar através de portais microscópicos.', funFact: 'O pingente abre portais tão pequenos que ninguém percebe — exceto o alvo.', lore: 'Feito com fragmento de vazio que曾 era um buraco negro.' },
  
  // ÉPICO
  { id: 'crown_fortune', name: 'Coroa da Fortuna', description: 'Coroa que aumenta o ouro dropado em 40%.', funFact: 'A coroa é tão pesada que o usuário precisa de um servo para segurá-la.', lore: 'Feita com ouro de 1000 leprechauns que foram convencidos a doar.' },
  { id: 'eye_of_storm', name: 'Olho da Tempestade', description: 'Olho que aumenta a chance de crítico em 8%.', funFact: 'O olho vê tudo — inclusive o que o usuário não quer que seja visto.', lore: 'Encontrado no centro de uma tempestade que durou 100 anos.' },
  { id: 'heart_of_phoenix', name: 'Coração da Fênix', description: 'Coração que ressuscita o usuário uma vez por batalha.', funFact: 'O coração bate tão forte que o usuário parece ter dois corações.', lore: 'Extraído de uma fênix que estava morrendo — sua última obra-prima.' },
  { id: 'dragon_eye', name: 'Olho de Dragão', description: 'Olho que permite ver fraquezas de monstros.', funFact: 'O olho vê através de paredes — o usuário sabe demais.', lore: 'Arrancado de um dragão que estava dormindo — ele ainda está bravo.' },
  { id: 'soul_ring', name: 'Anel da Alma', description: 'Anel que protege a alma do usuário contra ataques espirituais.', funFact: 'O anel é tão protetor que a alma do usuário não consegue sair para festas.', lore: 'Forjado com fragmentos de almas que曾 estavam perdidas no vazio.' },
  
  // LENDÁRIO
  { id: 'infinity_gem', name: 'Gema do Infinito', description: 'Gema que amplifica todos os stats em 50%.', funFact: 'A gema é tão poderosa que o usuário precisa de óculos escuros para olhá-la.', lore: 'Encontrada no centro do universo — o deus que a guardava estava distraído.' },
  { id: 'reality_ring', name: 'Anel da Realidade', description: 'Anel que permite ao usuário ignorar as leis da física por 10 segundos.', funFact: 'O usuário às vezes voa sem querer — é constrangedor em público.', lore: 'Forjado com fragmentos de realidade que曾 foram destruídas.' },
  { id: 'void_crown', name: 'Coroa do Vazio', description: 'Coroa que permite ao usuário controlar o vazio por 5 segundos.', funFact: 'A coroa é tão pesada que o usuário precisa de um servo para segurá-la — e o servo também precisa de um servo.', lore: 'Criada pelo Senhor do Vazio como presente de aniversário para si mesmo — ele gostou tanto que fez outra.' },
  { id: 'celestial_pendant', name: 'Pingente Celestial', description: 'Pingente que canaliza luz divina, curando 10% do HP a cada golpe.', funFact: 'O pingente é tão brilhante que acorda todo mundo ao amanhecer.', lore: 'Encontrado no paraíso — um anjo o perdeu e está com vergonha de pedir de volta.' },
  { id: 'eternal_band', name: 'Aliança Eterna', description: 'Aliança que fortalece TODOS os outros equipamentos em 25%.', funFact: 'A aliança é tão poderosa que o usuário se sente como um deus.', lore: 'Forjada com fragmentos de tempo congelado e luz de estrela morta.' },
];

// ========== FUNÇÃO PARA OBTER TODOS OS ITENS COM LORE ==========

export function getAllItemsWithLore(): ItemLore[] {
  return [...WEAPON_LORE, ...ARMOR_LORE, ...ACCESSORY_LORE];
}

// ========== FUNÇÃO PARA OBTER LORE POR ID ==========

export function getItemLore(itemId: string): ItemLore | undefined {
  return getAllItemsWithLore().find(item => item.id === itemId);
}

// ========== NOMES DE ITENS POR RARIDADE ==========

export const RARITY_PREFIXES: Record<ItemRarity, string[]> = {
  common: ['Velho', 'Simples', 'Básico', 'Comum', 'Usado'],
  uncommon: ['Refinado', 'Polido', 'Melhorado', 'Forte', 'Bom'],
  rare: ['Raro', 'Exceptional', 'Notável', 'Distinto', 'Valioso'],
  epic: ['Épico', 'Lendário', 'Fantástico', 'Incrível', 'Majestoso'],
  legendary: ['Divino', 'Sagrado', 'Mítico', 'Supremo', 'Eterno'],
};

// ========== DESCRIPÇÕES POR SLOT ==========

export const SLOT_DESCRIPTIONS: Record<string, string> = {
  weapon: 'Armas aumentam o dano dos heróis.',
  armor: 'Armaduras aumentam o HP máximo dos heróis.',
  accessory: 'Acessórios dão bônus variados (ouro, crítico, etc.).',
};

export default WEAPON_LORE;
