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

## 2026-06-10 — STEP 2: Real data, links, portrait

- Evolved `src/types/index.ts`: expanded `Bio` (headline, roles[], subline,
  summary[] paragraphs, affiliations, currentFocus, credibility[], email); added
  `SkillGroup`, `FocusArea`, `Experience` types and a `status?` field on `Project`.
  Kept three transitional `Bio` fields (`role`/`focus`/`tagline`) so the pre-revision
  Hero + layout metadata still build; these are pruned in STEP 3/9.
- `src/data/bio.ts`: real identity + FINAL hero copy + verbatim About bio +
  affiliations + currentFocus + credibility strip. Real links — GitHub
  (PolycarpMulu), LinkedIn (polycarpmulu), X (C1rcu1tX), email polycarpmulu@gmail.com.
- `src/data/skills.ts`: §7 Focus Areas cards (5) + §2 grouped 18-skill arrangement
  (Offensive/Defensive/Automation/GRC/Cloud). Numeric radar intentionally omitted
  (per STEP 6).
- `src/data/projects.ts`: added the one fully-specified real project (this site).
  The five §4C lab projects are named-only in the docs (descriptions live in a v1
  doc absent from the repo) — deferred to STEP 7 rather than fabricated.
- `ctf.ts` / `writeups.ts`: left empty (sections self-hide).
- Moved `bb07-10-22-0087.jpg → public/assets/portrait.jpg`.

**Why:** swap all placeholder content for real, source-of-truth data before
revising the Hero and building the remaining sections.

**Key commands:** `git mv bb07-10-22-0087.jpg public/assets/portrait.jpg` ·
`npm run build` · `npm run lint`

**Open item:** five §4C project descriptions/tags needed before STEP 7.

---

## 2026-06-10 — STEP 3: Hero revision (final copy + rotating roles + terminal status)

- `src/hooks/useRotatingType.ts`: new hook — type → pause → delete → cycle through
  a word list; reduced-motion renders a single static string (configurable
  `reducedText`, default words joined by " · "). State mutated only in async
  callbacks (set-state-in-effect safe). Exposes `reduced` so callers hide the cursor.
- `src/components/ui/RotatingRoles.tsx` (client): hero role line cycling the four
  roles in accent mono with a blinking cursor.
- `src/components/ui/TerminalStatus.tsx` (client): `root@qu35t ~` prompt + rotating
  status line (decorative, per §8; grounded in real focus areas).
- Rewrote `src/components/sections/Hero.tsx` to the FINAL copy (§1): label
  `// INITIALIZING` → name `Polycarp Mulu / C1rcu1t⤬` → headline (the main
  statement, `text-balance`) → rotating roles → subline → terminal status → CTAs →
  scroll cue. Static text (name/headline/subline) stays server-rendered for SEO.
- Pruned transitional `Bio.role` + `Bio.focus` (type + data); kept `tagline`
  (layout metadata reads it until STEP 9).
- Fixed `react/jsx-no-comment-textnodes`: `// INITIALIZING` wrapped as a string.

**Why:** the hero shipped with old placeholder copy; this aligns it with the final
identity and adds the on-brand rotating role + terminal motifs.

**Key commands:** `npm run build` · `npm run lint`

---

## 2026-06-10 — STEP 4: Experience / Education / Certifications section

- `src/data/experience.ts`: security-relevant history from PORTFOLIO_CONTENT §3–§4,
  in order. **Included:** Cyber Security Engineer @ AfricaHackon (ongoing),
  Penetration Tester Intern @ Virtually Testing Foundation, Digital Life Associate @
  The Book Bunk; Technical University of Kenya (Computer Technology, 2016–2021),
  AfricaHackon training; AfricaHackOn Cyber Security Swara cert. **Excluded** the two
  OPTIONAL non-security items (Jays Pyrotechnics software dev; Mount Kenya business
  degree) per STEP 4's "security-relevant only" — easily re-added on request.
- `src/components/sections/Experience.tsx`: vertical timeline (border-dim rail +
  accent nodes) grouped under Experience / Education / Certifications sub-labels —
  reuses the intended CTF timeline visual language. `id="experience"`, py-24.
- Navbar: added `#experience` link after `projects`.
- `page.tsx`: renders `<Experience/>` (after Hero for now; final order in STEP 10).
- Recorded the new section in `docs/BUILD_SPEC.md` (new PROMPT 5K, updated 5J order,
  §11 checklist, nav-anchor list) and synced the nav-anchor line in CLAUDE.md.

**Why:** a security portfolio needs verifiable career history; the timeline reuses
the established visual language for consistency.

**Key commands:** `npm run build` · `npm run lint`

**Decision to confirm at pause:** keep the two OPTIONAL roles excluded, or add them?

---

## 2026-06-10 — STEP 5: About + portrait + credibility strip

- `src/components/ui/CredibilityStrip.tsx`: affiliations + focus + location from
  `bio.credibility`, separated by accent ● nodes; `border-y` band below the hero.
  No invented metrics.
- `src/components/sections/About.tsx` (§5D): real bio (`bio.summary`, 3 paragraphs)
  + a "Current Focus" line; two-column on desktop (text + portrait), stacked on
  mobile. Framed portrait `/assets/portrait.jpg` (1200×800): `border-border-dim`,
  `rounded-lg`, accent glow on hover via `shadow-[…var(--color-accent)]`. Plain
  `<img>` per spec (static export, `images.unoptimized`); `no-img-element` warning
  suppressed inline with justification. Reduced-motion safe (hover is a transition).
- `page.tsx`: Hero → CredibilityStrip → About → Experience (review layout for the
  pause; final order set in STEP 10).
- Verified the portrait is emitted to `out/assets/portrait.jpg` on build.

**Why:** establishes the personal narrative + visual identity and the honest
credibility row before the remaining content sections.

**Key commands:** `npm run build` · `npm run lint` · `npm run dev`

---
