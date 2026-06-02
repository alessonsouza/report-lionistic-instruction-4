# Relatório de Trimestre — Instrução Leoística

Relatório de trimestre da Diretoria de Instrução Leoística do **LEO Clube Ômega Pinhalzinho-SC** (Distrito LD-8), sob a proposta *Unir para Instruir*. Página única que apresenta três propostas:

1. **Faça Acontecer – Escrevendo Nossa História** (*Mais que cargos, somos causas*) — entrevistas com os diretores do clube (galeria + vídeo).
2. **Relatos de Afeto: Memórias do Servir** — vitrine do mural digital coletivo (fotos, curtidas/comentários e stories).
3. **BBB da Instrução** — dinâmica de votação inspirada no BBB (linha do tempo, números, instrução e agradecimentos).

Stack: React 19 + Vite + TypeScript, animações com framer-motion, estilos em CSS Modules. Conteúdo centralizado em [`src/data/content.ts`](src/data/content.ts) — edite os textos lá, sem mexer nos componentes.

## Desenvolvimento

```bash
bun install
bun run dev       # servidor de desenvolvimento
bun run build     # type-check + build de produção
bun run preview   # pré-visualizar o build
bun run lint      # eslint
bun run test      # vitest (Gallery + SectionNav)
```

## Preparação de mídia (passo único)

As imagens já estão otimizadas e versionadas. Para reprocessá-las (redimensiona ≤1600px, recomprime e normaliza nomes):

```bash
bun run optimize:images
```

### Vídeo das entrevistas

O arquivo original `.MOV` (~808 MB) fica em `media-raw/` — **fora** de `public/`, para que o Vite nunca o inclua no build — e **não** é versionado (`.gitignore`). Converta-o para um MP4 leve e coloque o resultado em `public/mais-que-cargos/video-entrevistas.mp4` (referenciado pelo player). Requer [ffmpeg](https://ffmpeg.org/):

```bash
ffmpeg -i "media-raw/video-entrevistas-da-proposta.MOV" \
  -vf scale=-2:720 -c:v libx264 -crf 23 -preset medium \
  -c:a aac -movflags +faststart \
  public/mais-que-cargos/video-entrevistas.mp4
```

Enquanto o MP4 não existir, o player exibe a imagem de capa com o selo "Vídeo em processamento". A imagem de capa (`capa-todos-diretores-entrevistando.jpg`) já serve de *poster*, então um passo separado de `ffmpeg` para o poster não é necessário.

## Conteúdo pendente

Marcados como `// TODO(content):` em `src/data/content.ts`:

- Redação final adaptada de cada proposta.
- A **URL do mural ao vivo** (`proposals[relatos-de-afeto].mural.liveUrl` e `footerContent.muralUrl`) — enquanto for `#`, os botões de "mural ao vivo" ficam ocultos.
