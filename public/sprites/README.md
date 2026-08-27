# 🎨 SPRITES - Dungeon Idle Conquest

## 📁 Estrutura de Pastas

```
public/sprites/
├── monsters/
│   ├── bosses/          ← Imagens de bosses
│   │   ├── dragao-esqueleto.png
│   │   ├── lich-supremo.png
│   │   ├── senhor-vulcanico.png
│   │   └── ...
│   ├── regular/         ← Imagens de monstros normais
│   │   ├── morcego-sombrio.png
│   │   ├── goblin.png
│   │   └── ...
│   └── README.md        ← Este arquivo
├── heroes/              ← Imagens de heróis
│   ├── guerreiro.png
│   ├── arqueira.png
│   └── ...
└── items/               ← Imagens de itens
    ├── espada.png
    ├── escudo.png
    └── ...
```

## 📋 Como Adicionar um Monstro

### 1. Enviar a imagem
Poste a imagem aqui no chat com o nome do monstro

### 2. Formato recomendado
- **Tamanho:** 128x128px ou 256x256px
- **Formato:** PNG com fundo transparente
- **Estilo:** Pixel art do jogo

### 3. Nome do arquivo
Use o nome do monstro em minúsculo com hífens:
- `morcego-sombrio.png`
- `goblin-de-lava.png`
- `esqueleto-velho.png`

## 🏆 Bosses por Dungeon

| Dungeon | Boss | Arquivo |
|---------|------|---------|
| 🌑 Trevas | Lorde das Sombras | `bosses/lorde-das-sombras.png` |
| 🌋 Vulcânica | Senhor Vulcânico | `bosses/senhor-vulcanico.png` |
| ❄️ Glacial | Rei do Gelo Eterno | `bosses/rei-do-gelo.png` |
| 🕳️ Abismo | Titã do Abismo | `bosses/tita-do-abismo.png` |
| ✨ Celestial | Arcanjo Exilado | `bosses/arcanjo-exilado.png` |
| ⚰️ Cripta | Dragão Esqueleto | `bosses/dragao-esqueleto.png` ✅ |
| 🔥 Infernal | Arquidiabo | `bosses/arquidiabo.png` |
| 🌀 Dimensional | Senhor do Vazio | `bosses/senhor-do-vazio.png` |

## 📝 Notas

- Imagens PNG com fundo transparente funcionam melhor
- O jogo redimensiona automaticamente para o tamanho correto
- Bosses usam a pasta `bosses/`
- Monstros normais usam a pasta `regular/`
