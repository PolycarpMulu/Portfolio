# Development Log — C1rcu1t⤬ Portfolio

Engineering log for the portfolio build. Newest entries at the bottom of each
section. Source of truth: `docs/BUILD_SPEC.md` (architecture) +
`docs/PORTFOLIO_CONTENT.md` (real content). Stack: Next.js (App Router) ·
TypeScript · Tailwind v4 (CSS-first) · Recharts · static export · Netlify.

---

## 2026-06-10 — Milestone 1: Scaffold + tokens + fonts + static export
**Commit:** `604fcf1`

- Scaffolded with `create-next-app` (App Router, TypeScript, ESLint, `--src-dir`,
  import alias `@/*`, Tailwind v4). Confirmed **no `tailwind.config.ts`** (v4 is
  CSS-first).
- `src/app/globals.css`: added the `@theme` design tokens from BUILD_SPEC §4
  (void/surface/surface-hi/accent/danger/muted/fg/border-dim + display/body/mono
  font vars), the `section-label` utility, smooth scroll, body bg/fg, and a global
  `prefers-reduced-motion` guard.
- Wired `next/font/google`: Space Grotesk (400/500/700), Inter (400/500),
  JetBrains Mono (400/500) → CSS variables applied to `<html>`.
- `next.config.ts`: `output:'export'`, `images.unoptimized`, `trailingSlash:true`.
- `postcss.config.mjs`: `@tailwindcss/postcss` (array form).
- Installed Recharts. Appended the §10 Project Rules block to `CLAUDE.md`.

**Why:** establish the fixed stack and the single source of design tokens before
any components, so every later component uses generated utilities only.

**Key commands:** `npx create-next-app@latest . --typescript --eslint --app
--src-dir --import-alias "@/*" --tailwind` · `npm install recharts` ·
`npm run build` · `npm run lint`

---

## 2026-06-10 — Milestone 2: Data layer (types + data files)
**Commit:** `cf20c23`

- `src/types/index.ts`: `Bio`, `SocialLinks`, `Project`, `Skill`, `CTF`, `Writeup`
  interfaces (shapes inferred from how BUILD_SPEC §5/§6 components consume the data;
  the v1 §4A–4E prompts were not in-repo).
- `src/data/bio.ts`: real facts that were available at the time
  (name/alias/handle/role/focus/location/tagline); social URLs, email, and About
  summary left as empty `""` TODO placeholders — no fabrication.
- `src/data/{projects,skills,ctf,writeups}.ts`: typed empty arrays. CTF + Writeups
  sections are designed to self-hide while empty.

**Why:** content-as-typed-config is the project's "CMS"; building it first lets
components import stable shapes.

**Key commands:** `npm run build` · `npm run lint`

---

## 2026-06-10 — Milestone 3 (5B): Navbar + Footer + active-section hook
**Commit:** `74b4ddf`

- `src/hooks/useActiveSection.ts`: IntersectionObserver-based active-section
  tracking (no scroll polling, per §6 amendment 3); stable joined-string dependency
  so the observer only re-binds when the section set changes.
- `src/components/layout/Navbar.tsx` (client): sticky, translucent, anchor links
  `#about #skills #projects #ctf #writeups #contact`; CTF + Writeups links self-hide
  when their data arrays are empty; active link → `text-accent`; mobile menu via pure
  React state. Wordmark = `bio.alias`.
- `src/components/layout/Footer.tsx`: identity + build-year; social links self-hide
  when `bio.social.*` is empty.
- `layout.tsx`: body now `flex min-h-screen flex-col` with
  `<Navbar/> → <main flex-1>{children}</main> → <Footer/>`.

**Why:** navigation chrome + the active-section mechanism needed before sections.

**Key commands:** `npm run build` · `npm run lint`

---

## 2026-06-10 — Milestone 4 (5C): Hero + CircuitBackground + terminal typing
**Commit:** `42eda06`

- `src/hooks/useTerminalType.ts`: typewriter effect; honors
  `prefers-reduced-motion` (renders full text immediately); state mutated only in
  async callbacks (satisfies `react-hooks/set-state-in-effect`).
- `src/components/ui/TerminalText.tsx` (client): typed text + accent prompt glyph +
  blinking block cursor.
- `src/components/ui/CircuitBackground.tsx`: signature hero-only animated SVG
  circuit traces + pulsing nodes, driven by CSS keyframes (`trace-flow` /
  `node-pulse` in globals.css) so reduced-motion neutralizes them.
- `src/components/ui/SectionLabel.tsx`: small `section-label` eyebrow primitive.
- `src/components/sections/Hero.tsx`: name/alias, role, terminal tagline, focus
  tags, CTAs, scroll cue. `page.tsx` now renders `<Hero/>`.
- Added `docs/PORTFOLIO_CONTENT.md` as the real-content source of truth.

**Why:** the hero is the signature surface; the terminal + circuit motifs set the
visual identity. (NOTE: hero copy is revised to the final headline/roles/subline in
a later step per PORTFOLIO_CONTENT §1.)

**Key commands:** `npm run build` · `npm run lint`

---

## 2026-06-10 — STEP 0: Push to GitHub
**Commit:** `42eda06` (Hero) pushed with milestones 1–3.

- Renamed local branch `master → main`.
- Committed the previously-uncommitted Hero (Milestone 4) + `PORTFOLIO_CONTENT.md`.
- Added remote `origin → https://github.com/PolycarpMulu/Portfolio.git` and pushed:
  `git push -u origin main` (new branch, 4 commits).

**Why:** protect the Hero work and bring GitHub in sync before the v1 push.

---
