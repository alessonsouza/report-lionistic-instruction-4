---
title: "feat: Relatório de Trimestre — Três Propostas da Instrução Leoística (report-4)"
type: feat
status: active
date: 2026-06-01
depth: deep
origin: none (solo planning — user-provided description)
---

# feat: Relatório de Trimestre — Três Propostas da Instrução Leoística

**Repo:** `report-lionistic-instruction-4` (this repo)

Single-page quarterly report showcasing three proposals of the Instruction directorship, built on the proven `report-lionistic-instruction-3` design system (React 19 + Vite + framer-motion + CSS Modules). One opening hero, a sticky section nav, three stacked proposal sections, one shared footer.

---

## Summary

The previous report (`report-3`) presented a **single** proposal ("BBB da Instrução") as a scrolling landing page. This report presents **three** proposals from the trimester in one shareable page:

1. **Faça Acontecer – Escrevendo Nossa História** (theme *"Mais que cargos, somos causas"*) — the directorship's adaptation of the district "Faça Acontecer" proposal into **director interviews**: narrative + image gallery + an inline self-hosted video of the interviews.
2. **Relatos de Afeto: Memórias do Servir** — a *showcase* of the digital mural the director built (an adaptation of the official Padlet-based proposal), where companions posted photo-memories and interacted via likes/comments; presented here through screenshots of the live site, mural photos, comment highlights, and shared Instagram stories.
3. **BBB da Instrução** — the report-3 format (About / Timeline / Numbers / Gallery / Instruction / Acknowledgments) refreshed with the new assets in `public/votacao-bbb-protocolo/`.

The work reuses report-3's design tokens, animation patterns, and component shapes, generalizing the single-use `Gallery` into a reusable, prop-driven component so all three proposals can share it. A one-time asset-prep step converts the 808 MB `.MOV` to a web-deliverable MP4, optimizes oversized PNGs, and removes Windows metadata files.

---

## Problem Frame

A quarterly activity report needs to communicate three distinct initiatives to the club and district in one polished, link-shareable artifact. The constraints:

- **Three proposals, one page** — each proposal has its own narrative shape (interviews+video; mural+social interaction; voting dynamic), but they must read as one cohesive document with easy navigation between them.
- **Heavy raw media** — an 808 MB `.MOV` and several ~9 MB PNGs cannot ship in a static Vite build as-is and `.MOV` does not play reliably inline in browsers.
- **Content authored separately** — the official proposal texts come from the user; the plan must structure where they live without blocking on the exact wording.
- **Reuse, don't reinvent** — report-3 already solved the visual language, fonts, animation, and lightbox; this report should inherit them.

---

## Scope Boundaries

### In scope
- A single-page React report with an opening hero, sticky anchor navigation (with active-section highlight), three proposal sections, and a shared footer.
- Porting report-3's design system (`index.css` tokens, fonts, global styles) and animation primitives (`FadeIn`, framer-motion variants).
- A reusable, prop-driven `Gallery` (lightbox) shared across proposals.
- An inline `<video>` player for the (converted) interview video.
- A one-time asset-prep pipeline: video conversion, image optimization, filename normalization, `:Zone.Identifier` cleanup.
- Centralized, typed content model in `src/data/content.ts` with clearly marked placeholders for user-supplied official texts.

### Outside this report's identity
- **Live mural functionality.** Relatos de Afeto is a *showcase* of the separate, already-built mural site — real likes/comments/posting are NOT reimplemented here. The report links out to the live mural and shows screenshots of the interaction.
- **Backend / CMS / database.** All content is static in `content.ts`. No server, no auth, no persistence.
- **Multi-page routing.** Confirmed single-page + anchor nav; no `react-router`.

### Deferred to Follow-Up Work
- Final official proposal texts and the live-mural URL (content dependency on the user — scaffolded with placeholders).
- Production deployment/hosting config (mirror whatever report-3 used; not part of this plan).
- Optional: lazy-loading the video poster via a click-to-load facade if first-paint weight becomes a concern after measuring.

---

## Key Technical Decisions

**KTD-1 — Single page + sticky anchor nav (no router).** Confirmed with user. Each proposal is a `<section id="...">`; a sticky `SectionNav` provides jump links with an IntersectionObserver-based active-section highlight. Keeps one shareable URL, matches report-3, avoids a router dependency. *(Rejected: hub+routes — more navigation friction for a document meant to be read top-to-bottom; tabs — hide content and print/share poorly.)*

**KTD-2 — Convert video to self-hosted MP4.** Confirmed with user. `ffmpeg` transcodes the 808 MB `.MOV` → ~720p H.264 MP4 (target tens of MB) plus a poster frame; played via `<video controls preload="none" poster=...>`. Keeps everything first-party, no external platform dependency. *(Rejected: external embed — third-party/account dependency; poster+download-only — no inline playback.)*

**KTD-3 — Generalize `Gallery` to a prop-driven component.** Report-3's `Gallery` reads `galleryContent` from a module-level import. With three proposals each needing a gallery, `Gallery` takes `items` (and optional `title`/`subtitle`/`eyebrow`) as props. The lightbox modal, keyboard nav, and scroll-lock logic are preserved unchanged.

**KTD-4 — Content stays centralized and typed in `content.ts`.** One module exports a typed `report` object: trimester meta + an array/record of three proposals, each with its hero copy, narrative paragraphs, gallery items, and proposal-specific blocks. User-supplied texts drop into marked `// TODO(content):` placeholders. This preserves report-3's single-source-of-truth content pattern and lets the user edit copy without touching components.

**KTD-5 — Per-proposal CSS Modules, shared tokens.** Each section component owns a `.module.css`; all of them consume the global custom properties from `index.css`. No global class leakage; visual consistency via tokens. Matches report-3 exactly.

**KTD-6 — Lightweight test harness (Vitest + Testing Library) for interactive logic only.** Report-3 ships zero tests. Rather than a full suite, add Vitest only to cover the two components with real branching logic — `Gallery` (lightbox open/close/prev/next/keyboard) and `SectionNav` (active-section state). Presentational sections are verified visually. This right-sizes testing to actual risk.

---

## High-Level Technical Design

### Page composition

```
index.html  (root, fonts, title, favicon)
└─ App
   ├─ Hero            (trimester opening: badge, title, club/district, scroll cue)
   ├─ SectionNav      (sticky; anchors -> #mais-que-cargos / #relatos-de-afeto / #bbb;
   │                   active highlight via IntersectionObserver)
   ├─ <section id="mais-que-cargos">   ProposalMaisQueCargos
   │     ├─ ProposalIntro (narrative)
   │     ├─ Gallery (items=cargosImages)         ← reusable
   │     └─ VideoPlayer (src=interview.mp4)      ← new
   ├─ <section id="relatos-de-afeto">  ProposalRelatosDeAfeto
   │     ├─ ProposalIntro (narrative + "what the mural is")
   │     ├─ MuralFeature (official site screenshot + link-out to live mural)
   │     ├─ Gallery (items=muralPhotos)          ← reusable
   │     ├─ CommentHighlights (interaction screenshots)
   │     └─ StoriesStrip (shared Instagram stories)
   ├─ <section id="bbb-instrucao">     ProposalBBB
   │     ├─ About / Timeline / Numbers
   │     ├─ Gallery (items=bbbImages)            ← reusable
   │     ├─ Instruction / Acknowledgments
   └─ Footer          (club, district, year, proposals summary, mural link)
```

### Content model shape (directional)

```ts
// src/data/content.ts — directional sketch, not final API
type GalleryItem = { id; src; alt; caption };
type Proposal = {
  id: 'mais-que-cargos' | 'relatos-de-afeto' | 'bbb-instrucao';
  navLabel: string;
  hero: { eyebrow; title; subtitle };
  narrative: string[];          // HTML-allowed paragraphs (report-3 uses <strong>/<em>/<a>)
  gallery: GalleryItem[];
  // proposal-specific blocks below, optional per proposal:
  video?: { src; poster; caption };
  mural?: { liveUrl; officialShot; commentShots: GalleryItem[]; stories: GalleryItem[] };
  bbb?: { timeline; numbers; instruction; acknowledgments };  // ported report-3 shapes
};
export const report = { trimester: {...}, proposals: Proposal[] };
```

### Asset-prep flow

```
raw assets (public/<proposal>/...)        one-time, manual, documented in README
   │
   ├─ rm  **/*:Zone.Identifier            (Windows ADS junk)  ── then gitignore the pattern
   ├─ ffmpeg .MOV ─ scale=-2:720,H.264,crf23 ─► video-entrevistas.mp4 (~tens of MB)
   ├─ ffmpeg -ss <t> -frames:v 1        ─► video-poster.jpg
   └─ optimize 9 MB PNGs ─ resize ≤1600px + recompress ─► web-sized images
```

---

## Output Structure

```
src/
├─ App.tsx                       # composes Hero, SectionNav, 3 proposals, Footer
├─ main.tsx                      # unchanged entry
├─ index.css                     # ported design tokens + global styles (from report-3)
├─ data/
│  └─ content.ts                 # typed `report` object; user texts via TODO(content) placeholders
├─ components/
│  ├─ FadeIn.tsx                 # ported scroll-reveal primitive
│  ├─ Hero.tsx / .module.css     # trimester opening
│  ├─ SectionNav.tsx / .module.css   # sticky anchor nav + scrollspy
│  ├─ Footer.tsx / .module.css
│  ├─ Gallery.tsx / .module.css  # GENERALIZED (prop-driven) lightbox gallery
│  ├─ VideoPlayer.tsx / .module.css   # inline <video> player
│  ├─ ProposalSection.tsx / .module.css   # shared section heading/intro wrapper
│  ├─ proposals/
│  │  ├─ MaisQueCargos.tsx / .module.css
│  │  ├─ RelatosDeAfeto.tsx / .module.css
│  │  └─ BBBInstrucao.tsx / .module.css
└─ test/
   └─ setup.ts                   # Testing Library / jsdom setup
public/
├─ mais-que-cargos/  (optimized images + video-entrevistas.mp4 + video-poster.jpg)
├─ relatos-de-afeto/ (optimized mural photos, comment shots, stories/)
├─ votacao-bbb-protocolo/ (optimized images)
└─ favicon.svg, logo-leo.png
```

> The tree is a scope declaration. Per-unit **Files** lists are authoritative; the implementer may adjust layout if a better one emerges.

---

## Implementation Units

### U1. Foundation: design system port, dependencies, boilerplate removal

**Goal:** Turn the fresh Vite scaffold into a styled shell matching report-3's design language, with the right dependencies and a clean entry point.

**Requirements:** Establishes the visual + tooling base every other unit depends on.

**Dependencies:** none.

**Files:**
- `package.json` — add `framer-motion`; add dev deps `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.
- `vite.config.ts` — add Vitest `test` config (jsdom env, setup file).
- `src/index.css` — replace with report-3's token set + global styles (port `src/index.css` from `report-lionistic-instruction-3`).
- `index.html` — set `<title>`, `lang="pt-BR"`, add Google Fonts links (Cormorant Garamond + DM Sans), keep favicon.
- `src/App.tsx` — strip Vite demo content down to an empty composition shell.
- `src/test/setup.ts` — Testing Library + jest-dom setup.
- **Delete:** `src/App.css`, `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png` (Vite demo artifacts).

**Approach:** Copy the `:root` custom properties, base element styles, scrollbar, reduced-motion block, and `::selection`/`:focus-visible` rules verbatim from report-3's `index.css` (see `../report-lionistic-instruction-3/src/index.css`). Wire fonts via `<link>` in `index.html` (report-3 references `Cormorant Garamond` + `DM Sans`). Keep `main.tsx` as-is.

**Patterns to follow:** `report-lionistic-instruction-3/src/index.css` (tokens), its `index.html` font loading.

**Test scenarios:** `Test expectation: none -- configuration/scaffolding unit; verified by build + visual.`

**Verification:** `bun run dev` renders an empty styled page with correct fonts/background; `bun run build` and `bun run lint` pass; no references remain to deleted demo assets.

---

### U2. Asset preparation pipeline (one-time)

**Goal:** Make the raw media web-deliverable: convert the video, optimize oversized images, normalize names, and remove Windows metadata files.

**Requirements:** Unblocks U5 (video), and reduces build weight for U5–U7 galleries.

**Dependencies:** none (can run in parallel with U1).

**Files:**
- `public/mais-que-cargos/video-entrevistas.mp4` — new, transcoded from `video-entrevistas-da-proposta.MOV`.
- `public/mais-que-cargos/video-poster.jpg` — new, extracted poster frame.
- `public/mais-que-cargos/*.PNG`, `public/relatos-de-afeto/*.png`, `public/votacao-bbb-protocolo/*.png` — resized/recompressed in place (the 9 MB director PNGs especially).
- `public/**/*:Zone.Identifier` — **delete** all (11 files).
- `.gitignore` — add `*:Zone.Identifier`.
- `README.md` — document the one-time asset commands so the step is reproducible.
- **Do not commit** the original 808 MB `.MOV` (add to `.gitignore` or move out of the build path).

**Approach:**
- **Prerequisite:** `ffmpeg` is **not installed** in this environment — install it (or run this unit on a machine that has it) before transcoding. Surface this clearly; it is a hard blocker for U5's inline player.
- Transcode: `ffmpeg -i <MOV> -vf scale=-2:720 -c:v libx264 -crf 23 -preset medium -c:a aac -movflags +faststart video-entrevistas.mp4` (target tens of MB; `+faststart` enables progressive playback).
- Poster: `ffmpeg -ss 00:00:02 -i <MOV> -frames:v 1 -q:v 3 video-poster.jpg`.
- Images: resize longest edge to ≤1600px and recompress (the gallery never displays larger); keep originals out of the build.
- Normalize spaces/accents in filenames where they complicate `src` paths (e.g., `fotos-mural-engraçadas...` → ascii-safe) and update references accordingly.

**Patterns to follow:** report-3 keeps display assets in `public/` referenced by absolute `/...` paths.

**Test scenarios:** `Test expectation: none -- media/tooling step; verified by file inspection.`

**Verification:** `video-entrevistas.mp4` plays in a browser and is < ~80 MB; `video-poster.jpg` exists; no `:Zone.Identifier` files remain (`find public -name '*:Zone.Identifier'` is empty); largest PNG is well under 1 MB; total `public/` build payload is reasonable for static hosting.

---

### U3. Content model + shared primitives

**Goal:** Centralize all copy/media references in a typed `content.ts` and port the shared animation primitive.

**Requirements:** Single source of truth for content (KTD-4); every section component reads from it.

**Dependencies:** U1.

**Files:**
- `src/data/content.ts` — new; exports a typed `report` object (trimester meta + three proposals) per the HTD sketch.
- `src/components/FadeIn.tsx` — ported from report-3.

**Approach:** Define `Proposal` and `GalleryItem` types and the `report` constant. Populate gallery `src`/`alt`/`caption` and structural fields now (asset paths are known); leave **prose** as `// TODO(content):` placeholders carrying short descriptive drafts so the page renders meaningfully. Draft the narrative from the **official base texts** (see *Source Proposal Texts* below) but write the report copy to describe the directorship's **adaptation** (interviews; custom mural site) — the official texts are grounding, **not** verbatim report copy. Narrative strings may contain inline HTML (`<strong>`, `<em>`, `<a>`) exactly like report-3, rendered via `dangerouslySetInnerHTML` (see security note in System-Wide Impact). Mirror report-3's `content.ts` export style.

**Patterns to follow:** `report-lionistic-instruction-3/src/data/content.ts` (export shape, HTML-in-string convention), `.../components/FadeIn.tsx`.

**Test scenarios:** `Test expectation: none -- data/types module; consumed and verified by U4–U7.`

**Verification:** `content.ts` type-checks; importing `report` in `App.tsx` compiles; every asset path in `content.ts` resolves to a real file in `public/`.

---

### U4. Shell: Hero + sticky SectionNav + Footer

**Goal:** Build the page chrome that frames and connects the three proposals.

**Requirements:** Cohesion + navigation across proposals (KTD-1).

**Dependencies:** U1, U3.

**Files:**
- `src/components/Hero.tsx` + `Hero.module.css` — trimester opening (adapt report-3 Hero; remove the single voting-link CTA, present the three proposals as the subject).
- `src/components/SectionNav.tsx` + `SectionNav.module.css` — new sticky nav.
- `src/components/Footer.tsx` + `Footer.module.css` — adapt report-3 Footer; list all three proposals; include live-mural link.
- `src/App.tsx` — compose `Hero`, `SectionNav`, the three section placeholders, `Footer`.
- `src/components/SectionNav.test.tsx` — new.

**Approach:** `SectionNav` renders anchor links from `report.proposals` (`navLabel` → `#id`), is `position: sticky; top: 0`, and tracks the active section with an IntersectionObserver over the three `<section>` elements, applying an active class. Clicking a link smooth-scrolls (CSS `scroll-behavior: smooth` already global). Respect `prefers-reduced-motion`. Hero reuses report-3's layered-background + framer-motion stagger pattern but with trimester-level copy.

**Patterns to follow:** `report-lionistic-instruction-3/src/components/Hero.tsx` (stagger variants, layered bg), `.../Footer.tsx`.

**Technical design (directional):** IntersectionObserver with `rootMargin: '-50% 0px -50% 0px'` so a section becomes "active" when its midpoint crosses the viewport center; store active id in `useState`.

**Test scenarios (SectionNav):**
- Renders one nav link per proposal with `href="#<id>"` matching each section id. *(happy path)*
- When section B's observer entry becomes intersecting, B's link gets the active class and A's loses it. *(state transition — mock IntersectionObserver)*
- With zero proposals (empty array), renders no links and does not throw. *(edge case)*
- `prefers-reduced-motion: reduce` is honored — no smooth-scroll animation forced. *(edge case; assert no motion-only behavior breaks)*

**Verification:** Scrolling through the page highlights the correct nav item; clicking a nav item jumps to that proposal; Hero animates in on load; Footer shows all three proposals and a working mural link.

---

### U5. Proposal 1 — "Faça Acontecer / Mais que cargos, somos causas" (interviews + video)

**Goal:** Render the directorship's adaptation of the "Faça Acontecer – Escrevendo Nossa História" proposal (theme *"Mais que cargos, somos causas"*) as director interviews: narrative, image gallery, and inline video. Hero title carries the official proposal name; eyebrow/theme carries "Mais que cargos, somos causas"; narrative frames it as the club's interview adaptation alluding to the district motto *Faça Acontecer*.

**Requirements:** Proposal 1 of 3.

**Dependencies:** U2 (converted video + optimized images), U3, U6 (reusable `Gallery` — see note), U4.

> Sequencing note: U5 consumes the generalized `Gallery`. Build the `Gallery` generalization first (tracked in **U6**'s approach) or extract it as the first task of whichever proposal unit lands first; the other two then reuse it.

**Files:**
- `src/components/proposals/MaisQueCargos.tsx` + `.module.css` — new.
- `src/components/VideoPlayer.tsx` + `VideoPlayer.module.css` — new.
- `src/components/Gallery.tsx` + `Gallery.module.css` — generalized (prop-driven), ported from report-3.
- `src/components/ProposalSection.tsx` + `.module.css` — shared heading/intro wrapper (optional but reduces duplication across U5–U7).

**Approach:** Section header + narrative paragraphs (from `content.proposals[mais-que-cargos]`, rendered with `dangerouslySetInnerHTML`), then a `Gallery` of the interview/cover images, then `VideoPlayer`. `VideoPlayer` is a thin wrapper around `<video controls preload="none" poster={poster}>` with a `<source type="video/mp4">`; width-constrained, rounded per tokens, with a caption. Lazy by `preload="none"` so the page doesn't pull the video until played.

**Patterns to follow:** report-3 `Gallery.tsx` (lightbox), `About.tsx` (narrative rendering with `dangerouslySetInnerHTML`).

**Test scenarios (Gallery — covers the generalized component used by all three proposals):**
- Renders one thumbnail button per `items` entry with correct `alt`. *(happy path)*
- Clicking a thumbnail opens the lightbox showing that item; body scroll locks. *(happy path / integration)*
- `Esc` closes the lightbox and restores body scroll. *(error/escape path)*
- `ArrowRight`/`ArrowLeft` advance/rewind with wraparound at the ends. *(edge cases — first→prev wraps to last, last→next wraps to first)*
- Empty `items` renders no thumbnails and never opens a modal. *(edge case)*

**Test scenarios (VideoPlayer):**
- Renders a `<video>` with the `poster` and an mp4 `<source>` from props. *(happy path)*
- `preload="none"` is set (no eager download). *(perf assertion)*

**Verification:** Section shows narrative + gallery + a playable video with poster; video does not download until the user presses play; lightbox works.

---

### U6. Proposal 2 — "Relatos de Afeto: Memórias do Servir" (mural showcase)

**Goal:** Showcase the external digital-mural initiative: what it is, the live site, mural photos, the like/comment interactions, and shared Instagram stories.

**Requirements:** Proposal 2 of 3. Honors the scope boundary — *showcase*, not a rebuilt social feature.

**Dependencies:** U2, U3, U4, and the generalized `Gallery` (extract here if it lands before U5).

**Files:**
- `src/components/proposals/RelatosDeAfeto.tsx` + `.module.css` — new.
- `src/components/Gallery.tsx` — reused (generalize here if first).
- (reuses `ProposalSection`, `FadeIn`.)

**Approach:** Section header + narrative explaining the mural concept (director built a digital wall where companions posted photo-memories and reacted via likes/comments). Sub-blocks:
- **MuralFeature** — the official site screenshot (`foto-oficial-site-mural.jpeg`) with a prominent link-out to the live mural URL (from `content`, user-provided).
- **Gallery** of mural photos (`fotos-mural*.png`).
- **CommentHighlights** — screenshots showing comments/likes interaction (`foto-mural-com-comentario.png`, `fotos-mural-engraçadas-com-comentario.png`) presented as framed cards conveying the "interaction" angle.
- **StoriesStrip** — the shared Instagram stories (`relatos-de-afeto/fotos-instagran-csotry-compartilhados/*`) in a phone-story-style horizontal strip.

**Patterns to follow:** report-3 `Gallery.tsx`, `About.tsx`. StoriesStrip is a simple flex/scroll-snap row — no new dependency.

**Test scenarios:**
- `Test expectation: none -- presentational composition; verified visually.` (The interactive logic it relies on — `Gallery` — is covered in U5's test scenarios. The mural link-out is a static anchor.)

**Verification:** Section reads as a coherent mural story; the live-mural link opens the external site in a new tab; mural photos open in the lightbox; comment highlights and stories strip render responsively; **no** like/comment UI is wired (showcase only, per scope).

---

### U7. Proposal 3 — "BBB da Instrução" (report-3 format, refreshed assets)

**Goal:** Reproduce report-3's BBB proposal experience with the new `votacao-bbb-protocolo/` assets.

**Requirements:** Proposal 3 of 3.

**Dependencies:** U2, U3, U4, generalized `Gallery`.

**Files:**
- `src/components/proposals/BBBInstrucao.tsx` + `.module.css` — new; composes the sub-blocks below.
- Port from report-3 (adapted to read this report's `content`): `About`, `Timeline`, `Numbers`, `Instruction`, `Acknowledgments` (as internal pieces or sub-components under `proposals/bbb/`).
- `src/components/Gallery.tsx` — reused with the BBB image set.

**Approach:** Lift report-3's `About` / `Timeline` / `Numbers` / `Instruction` / `Acknowledgments` components and their `.module.css`, rewiring them to read from `content.proposals[bbb-instrucao]` instead of the old module-level imports. Map the new images: `companheiros-emparedados.png`, `regras-paredao-e-temas-sugeridos.png`, `Resultado-final.png`, `engajamento-clube-what*.png` into the BBB gallery and any hero/background usages. Keep the timeline/numbers/instruction copy structure; final text comes from user (placeholders meanwhile, but report-3's existing BBB text is a strong starting draft — see `../report-lionistic-instruction-3/src/data/content.ts`).

**Patterns to follow:** the entire report-3 component set for these sub-blocks (`About.tsx`, `Timeline.tsx`, `Numbers.tsx`, `Instruction.tsx`, `Acknowledgments.tsx`).

**Test scenarios:**
- `Test expectation: none -- ported presentational sections; gallery logic covered in U5. Verified visually against report-3.`

**Verification:** BBB section visually matches report-3's quality with the new images; timeline, numbers (animated counts if ported), instruction text, and acknowledgments render; gallery lightbox works with the new image set.

---

### U8. Integration, responsive polish, and build verification

**Goal:** Ensure the three proposals read as one cohesive, responsive, accessible document and the production build is clean.

**Requirements:** Cross-cutting quality gate.

**Dependencies:** U4, U5, U6, U7.

**Files:**
- `src/App.tsx` — final composition + section ids wired to nav.
- `README.md` — replace Vite boilerplate with a short project description + the asset-prep commands (from U2) + run/build instructions.
- Minor `.module.css` adjustments across components for responsive breakpoints.

**Approach:** Verify mobile/tablet/desktop layouts (sticky nav must not overlap content; galleries reflow; stories strip scrolls; video scales). Confirm `prefers-reduced-motion` disables framer-motion-heavy entrances. Run lint, type-check, build, and a manual pass on a phone-width viewport. Check the build payload size given the media.

**Test scenarios:** `Test expectation: none -- integration/QA unit; verified by full Vitest run + manual responsive/accessibility pass.`

**Verification:** `bun run lint`, `bun run build`, and `bun run test` (Vitest, U4+U5 suites) all pass; the page is navigable and legible from ~360px up; no console errors; video/poster/images all load; nav scrollspy tracks correctly end-to-end.

---

## System-Wide Impact

- **Build weight / hosting:** the converted MP4 plus optimized images define the deploy payload. Keep the original 808 MB `.MOV` out of the build (gitignore/move). Confirm the host serves `video/mp4` with range requests for `+faststart` seeking.
- **Accessibility:** all media needs `alt`/captions (already modeled in `GalleryItem`); video has `controls`; nav and lightbox preserve report-3's keyboard support and focus-visible styling.
- **Content authority:** the official base texts for proposals 1 and 2 are now captured (see *Source Proposal Texts*); the directorship's adapted copy plus the live-mural URL and BBB final wording remain placeholders, isolated to `content.ts`.
- **`dangerouslySetInnerHTML` safety:** narrative strings are rendered with `dangerouslySetInnerHTML` to allow inline `<strong>`/`<em>`/`<a>`, mirroring report-3. This is acceptable here because **all narrative content is static, author-authored data in `content.ts`** — there is no user input on this page, so the XSS surface is nil. If content ever becomes externally sourced, sanitize with DOMPurify before rendering.

---

## Risks & Dependencies

| Risk | Impact | Mitigation |
|------|--------|------------|
| `ffmpeg` not installed (confirmed absent) | Blocks U5 inline video | Install ffmpeg or run U2 on a machine that has it; U2 is isolated and one-time |
| 808 MB `.MOV` accidentally committed/shipped | Repo bloat, broken deploy | Gitignore/move the original; only the converted MP4 enters `public/` |
| Oversized 9 MB PNGs degrade load | Slow first paint | U2 resizes ≤1600px + recompress; galleries lazy-load (report-3 uses `loading="lazy"`) |
| `Gallery` generalization regresses report-3 behavior | Lightbox bugs across all 3 proposals | Cover with Vitest scenarios (U5) before reuse; keep modal/keyboard logic byte-for-byte where possible |
| Filenames with spaces/accents break `src` paths | Broken images | U2 normalizes names and updates `content.ts` references |
| Final texts arrive late | Page stays in placeholder state | Structure decouples copy from layout; placeholders render meaningfully; text is a pure `content.ts` edit |

**External dependencies:** `framer-motion` (runtime), `vitest`/`@testing-library/*`/`jsdom` (dev), system `ffmpeg` + an image optimizer (one-time tooling), user-provided proposal texts + live-mural URL (content).

---

## Sources & Research

- **Primary template:** `../report-lionistic-instruction-3/` — design tokens (`src/index.css`), content pattern (`src/data/content.ts`), and components (`Hero`, `Gallery`, `About`, `Timeline`, `Numbers`, `Instruction`, `Acknowledgments`, `Footer`, `FadeIn`). This report inherits its visual language wholesale.
- **Stack (confirmed in this repo):** React 19.2, Vite 8, TypeScript ~6.0, ESLint 10; `framer-motion` to be added (present in report-3 at ^12).
- **Assets on disk:** `public/mais-que-cargos/` (interviews + 808 MB `.MOV`), `public/relatos-de-afeto/` (mural photos, comment shots, `fotos-instagran-csotry-compartilhados/`), `public/votacao-bbb-protocolo/` (BBB images).
- External web research: **skipped** — local patterns are a direct, complete template (>3 examples) and the stack is already established in-repo.

### Source Proposal Texts (grounding — NOT verbatim report copy)

These are the **official district proposal texts** the directorship adapted. They are recorded here so the implementer understands the source intent. The report copy must describe the directorship's **adaptation**, not reproduce these verbatim (per the user's explicit instruction).

**Proposal 1 — official:** *"FAÇA ACONTECER – ESCREVENDO NOSSA HISTÓRIA / Instrução, identidade e compromisso."* Valorizes relato, testemunho and memória to strengthen identity and commitment to the LEO movement. Official delivery is **text only**; themes/titles are free but must allude to the District motto **"Faça Acontecer"** (AL 2024/2025). Suggested titles include *"O que me move a fazer acontecer"*, *"Fazer acontecer: do silêncio à ação"*, *"Ser LEO é minha forma de fazer acontecer"*, *"Vozes que ecoam em ações"*, **"Mais que cargos, somos causas"**. Can run at any point in the Leo Year. **Adaptation in this report:** the directorship ran it as **interviews with the club's directors** (photos + video), keeping the "more than positions, we are causes" framing.

**Proposal 2 — official:** *"RELATOS DE AFETO: MEMÓRIAS DO SERVIR / Mural coletivo de experiências."* Each companion brings a photograph representing a meaningful LEO memory; the images become the starting point for the day's Leoistic Instruction as companions share stories, feelings and learnings. Instructions/invocations may be delivered as text or any artistic expression. Officially registered on **Padlet** (a visual-collaboration tool) to form a collective mural; fits under the **"Unir para Instruir"** proposal. **Adaptation in this report:** the director built a **custom digital mural site** (instead of Padlet) where companions posted photos and interacted via **likes and comments** — showcased here via screenshots.

**Proposal 3 — base:** report-3's existing BBB content (`../report-lionistic-instruction-3/src/data/content.ts`) is the strong starting draft; refresh with `votacao-bbb-protocolo/` assets and final wording from the user.

**Still pending from user:** adapted/final copy per proposal, the **live-mural URL**, and any BBB text updates.
