// One-time asset-prep: resize + recompress proposal images and normalize
// filenames to clean ASCII so content.ts references are predictable.
//
//   bun run optimize:images
//
// Idempotent-ish: re-running after a successful pass is a no-op for files
// whose source name no longer exists (already renamed). Safe to delete the
// `sharp` devDependency once assets are committed.
import sharp from 'sharp'
import { existsSync } from 'node:fs'
import { unlink } from 'node:fs/promises'
import { join, dirname } from 'node:path'

const PUBLIC = 'public'
const MAX = 1600

// [dir, fromName, toName] — `to` extension picks the output format.
const MAP = [
  // ── Mais que Cargos (Faça Acontecer / interviews) ────────────────────────
  ['mais-que-cargos', 'capa-todos-diretores-entrevistando.jpeg', 'capa-todos-diretores-entrevistando.jpg'],
  ['mais-que-cargos', 'diretora-novos-associados-entrevistando.PNG', 'diretora-novos-associados-entrevistando.jpg'],
  ['mais-que-cargos', 'imagem-diretor-instrucao-entrevistando-mais-importante.PNG', 'diretor-instrucao-entrevistando.jpg'],
  ['mais-que-cargos', 'imagem-diretora-lideranca-entrevistando.PNG', 'diretora-lideranca-entrevistando.jpg'],

  // ── Relatos de Afeto (mural showcase) ────────────────────────────────────
  ['relatos-de-afeto', 'foto-oficial-site-mural.jpeg', 'foto-oficial-site-mural.jpg'],
  ['relatos-de-afeto', 'fotos-mural.png', 'mural-overview.png'],
  ['relatos-de-afeto', 'fotos-mural-1.png', 'mural-1.png'],
  ['relatos-de-afeto', 'fotos-mural-2.png', 'mural-2.png'],
  ['relatos-de-afeto', 'fotos-mural-3.png', 'mural-3.png'],
  ['relatos-de-afeto', 'foto-mural-com-comentario.png', 'mural-comentario-1.png'],
  ['relatos-de-afeto', 'fotos-mural-engraçadas-com-comnetario.png', 'mural-comentario-2.png'],
  ['relatos-de-afeto', 'imagem-descricao-proposta.png', 'imagem-descricao-proposta.png'],
  ['relatos-de-afeto/fotos-instagran-csotry-compartilhados', 'WhatsApp Image 2026-06-01 at 19.01.02.jpeg', '../stories/story-1.jpg'],
  ['relatos-de-afeto/fotos-instagran-csotry-compartilhados', 'WhatsApp Image 2026-06-01 at 19.01.02 (1).jpeg', '../stories/story-2.jpg'],
  ['relatos-de-afeto/fotos-instagran-csotry-compartilhados', 'WhatsApp Image 2026-06-01 at 19.01.02 (2).jpeg', '../stories/story-3.jpg'],
  ['relatos-de-afeto/fotos-instagran-csotry-compartilhados', 'WhatsApp Image 2026-06-01 at 19.01.02 (3).jpeg', '../stories/story-4.jpg'],

  // ── BBB da Instrução (protocol voting) ───────────────────────────────────
  ['votacao-bbb-protocolo', 'companheiros-emparedados.png', 'companheiros-emparedados.png'],
  ['votacao-bbb-protocolo', 'regras-paredao-e-temas-sugeridos.png', 'regras-paredao-e-temas-sugeridos.png'],
  ['votacao-bbb-protocolo', 'Resultado-final.png', 'resultado-final.png'],
  ['votacao-bbb-protocolo', 'engajamento-clube-what1.png', 'engajamento-clube-1.png'],
  ['votacao-bbb-protocolo', 'engajamento-clube-what2.png', 'engajamento-clube-2.png'],
  ['votacao-bbb-protocolo', 'engajamento-clube-whats.png', 'engajamento-clube-geral.png'],
  ['votacao-bbb-protocolo', 'imagem-descricao-proposta.png', 'imagem-descricao-proposta.png'],
]

let okCount = 0
let skipCount = 0
let savedBytes = 0

for (const [dir, from, to] of MAP) {
  const src = join(PUBLIC, dir, from)
  const dst = join(PUBLIC, dir, to) // `to` may contain ../ to hop folders
  if (!existsSync(src)) {
    console.log(`skip (no source): ${src}`)
    skipCount++
    continue
  }
  const isJpg = /\.jpe?g$/i.test(dst)
  const input = sharp(src).rotate().resize(MAX, MAX, { fit: 'inside', withoutEnlargement: true })
  const out = isJpg
    ? input.jpeg({ quality: 78, mozjpeg: true })
    : input.png({ quality: 80, compressionLevel: 9, palette: true })

  const srcBytes = (await sharp(src).metadata()).size ?? 0
  const buf = await out.toBuffer()
  // Write to a temp buffer first, then place it (sharp can't read+write same path).
  await Bun.write(dst, buf)
  savedBytes += Math.max(0, srcBytes - buf.length)
  if (join(dirname(dst), '') !== join(dirname(src), '') || to.split('/').pop() !== from) {
    await unlink(src)
  }
  console.log(`ok: ${src} -> ${dst} (${(buf.length / 1024).toFixed(0)} KB)`)
  okCount++
}

console.log(`\nDone: ${okCount} optimized, ${skipCount} skipped, ~${(savedBytes / 1024 / 1024).toFixed(1)} MB saved.`)
