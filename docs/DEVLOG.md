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

## 2026-06-10 — STEP 5 review checkpoint (decisions) + pause

Captured full-page screenshots via system Chrome (puppeteer-core in a throwaway
`/tmp` dir; project deps untouched) and reviewed Hero + About + Experience at
1440px, 390px, and reduced-motion. Hierarchy, the long-headline wrap (4 lines on
mobile), portrait framing, and the reduced-motion static fallback all verified good.

**Decisions (locked):**
- Experience: keep the two OPTIONAL non-security items excluded (Jays Pyrotechnics
  software dev; Mount Kenya business degree). No change.
- Projects: exclude the five named-only §4C lab projects (no source copy in repo);
  ship Projects with the real portfolio entry only. Updated the `projects.ts` note.

**Next session resumes at:** STEP 6 — Skills as Focus Areas (capability cards
primary + grouped skills cloud below) + the `SkillTag` primitive. Then STEP 7
(Projects + ProjectCard), STEP 8 (Contact + `__forms.html`), STEP 9 (SEO),
STEP 10 (assembly + cleanup), STEP 11 (testing).

**State:** all work through STEP 5 committed + pushed to `origin/main`. Branch `main`.

---

## 2026-06-11 — STEP 6: Skills as Focus Areas

- `src/components/ui/SkillTag.tsx`: small mono pill primitive (border-dim, surface bg).
- `src/components/sections/Skills.tsx`: Focus Areas as the PRIMARY presentation —
  five capability cards (title / description / technique chips) from `focusAreas`,
  card bg surface + border-dim, hover → accent border (§7 visual). Below it, the
  fuller grouped professional-skills cloud from `skillGroups`
  (Offensive/Defensive/Automation/GRC/Cloud) rendered as SkillTags. Numeric radar
  omitted entirely (no Recharts here) per STEP 6. Static server component.
- `page.tsx`: inserted `<Skills/>` after About (Hero → strip → About → Skills →
  Experience; final order in STEP 10).

**Why:** capability cards show depth far better than a pill cloud or a radar of
self-assessed numbers, and avoid the honesty traps flagged in §8.

**Key commands:** `npm run build` · `npm run lint`

---

## 2026-06-11 — STEP 7: Projects + ProjectCard

- `src/components/ui/ProjectCard.tsx`: card (border-dim/surface, hover accent border)
  with category + status·year meta, title, description, tag pills (SkillTag), and
  repo/live links (external, noopener).
- `src/components/sections/Projects.tsx`: `// PROJECTS` section, responsive grid;
  renders `projects` from data. Defensive null-return if the array is empty.
- Per the STEP 5 decision, ships with the single real project (this site); the five
  named-only §4C lab projects stay excluded.
- `page.tsx`: `<Projects/>` after Skills.

**Key commands:** `npm run build` · `npm run lint`

---

## 2026-06-11 — STEP 8: Contact + Netlify Forms

- `public/__forms.html`: verbatim §7 detection file — `form name="contact"`,
  `data-netlify`, `netlify-honeypot="bot-field"`, fields form-name/name/email/
  subject/message/bot-field. Confirmed it exports to `out/__forms.html`.
- `src/components/sections/Contact.tsx` (client): Netlify Forms via `fetch` to
  `/__forms.html` (urlencoded) — NO custom API. Fields name/email/subject/message
  + hidden `bot-field` honeypot; POST keys match the detection file exactly. State:
  isLoading / isSuccess / error; client validation (all required, email contains
  "@"). Success replaces the form with `// MESSAGE TRANSMITTED. I'll be in touch.`;
  failure shows danger text. Styling per §5I (surface inputs, accent focus ring,
  mono/uppercase/accent labels, accent submit, disabled opacity-50). Social links
  (GitHub/X/LinkedIn) beside the form; email intentionally not shown (§8 — prefer
  the form).
- `page.tsx`: `<Contact/>` after Experience.

**Note:** the form only actually submits on Netlify (the POST 404s locally) — that's
expected for this static-export + Netlify Forms pattern.

**Key commands:** `npm run build` · `npm run lint`

---

## 2026-06-11 — STEP 9: SEO (robots, sitemap, OG image, metadata)

- `src/lib/site.ts`: single `SITE_URL` constant. **TODO(deploy):** set to the real
  production URL — currently a placeholder (`https://c1rcu1t.netlify.app`).
- `src/app/robots.ts` + `src/app/sitemap.ts`: both with `export const dynamic =
  "force-static"` (required under `output: 'export'`). Verified they emit
  `out/robots.txt` (allow all + sitemap URL) and `out/sitemap.xml` (priority 1).
- `src/app/opengraph-image.tsx`: 1200×630 OG card via `ImageResponse` (next/og),
  `dynamic = "force-static"`. void bg + accent wordmark + name + subline + meta row.
  The OG font renderer can't fetch the exotic `⤬` glyph offline, so the card uses
  `×` in the wordmark only (real `⤬` unchanged across the site). Verified visually.
- `layout.tsx`: full metadata — `metadataBase`, title `C1rcu1t⤬ | Polycarp Mulu`,
  description from `bio.subline`, `openGraph` (title/description/url/siteName/type),
  `twitter` (`summary_large_image`). OG image wired via the file convention.
- Removed the last transitional `Bio.tagline` (type + data) now that metadata reads
  `subline`.

**Key commands:** `npm run build` · `npm run lint`

---

## 2026-06-11 — STEP 10: Assembly + cleanup

- Built the two remaining self-hiding sections:
  `src/components/sections/CTFAchievements.tsx` (`id="ctf"`, timeline visual like
  Experience) and `src/components/sections/Writeups.tsx` (`id="writeups"`, card
  grid). Both `return null` while their data arrays are empty.
- Finalized `src/app/page.tsx` to the full §5J order: Hero → CredibilityStrip →
  About → Skills → Projects → Experience → CTF → Writeups → Contact.
- `layout.tsx` already final (Navbar / main / Footer + metadata); left as-is.
- Cleanup: removed the five leftover create-next-app SVGs from `public/`
  (`file/globe/next/vercel/window.svg`, all unreferenced). Confirmed the original
  root `.jpg` is gone (moved to `public/assets/portrait.jpg` in STEP 2). `public/`
  now holds only `__forms.html` + `assets/portrait.jpg`.
- Replaced the default README with a real one (§9): overview, tech-stack table,
  local dev, build, Netlify settings (publish dir `out`), Forms note, structure,
  and the `SITE_URL` deploy reminder.

**Note:** the default `src/app/favicon.ico` (Next.js logo) is left in place — no
brand favicon asset was supplied; swap it when one exists.

**Key commands:** `npm run build` · `npm run lint`

---

## 2026-06-11 — STEP 11: Testing

Built the static export to `out/`, served it with `python3 -m http.server`, and ran
an automated verification pass (headless Chrome via puppeteer-core in a throwaway
`/tmp` dir — project deps untouched).

**Results — all pass:**
- `npm run build` exit 0 (5 routes: `/`, `/_not-found`, `/opengraph-image`,
  `/robots.txt`, `/sitemap.xml`); `npm run lint` exit 0.
- Sections render: hero, about, skills, projects, experience, contact all present.
- CTF + Writeups hidden (empty data) — no `#ctf` / `#writeups` in DOM and no nav
  links for them.
- Nav anchors: every `#…` link resolves to an existing element id (navTargetsOk).
- Images: `/assets/portrait.jpg` loads (naturalWidth > 0).
- Social links present + correct. HTTP: GitHub `200`, X `200`, LinkedIn `999`
  (LinkedIn's standard headless-bot block — URL is valid).
- Mobile @375px: no horizontal overflow (scrollWidth == innerWidth == 375).
- prefers-reduced-motion: bounce-arrow animation-duration neutralized to `1e-05s`;
  rotating roles render the static `·`-joined fallback.
- Console: zero errors, zero failed requests on load.
- Contact field names (`name`, `email`, `subject`, `message`, `bot-field`) + the
  POSTed `form-name=contact` match `public/__forms.html` exactly.

**Not run:** the OPTIONAL Playwright smoke test (committed to the repo) — pending the
go-ahead, since it adds a dependency + browser download.

**Key commands:** `npm run build` · `npm run lint` ·
`python3 -m http.server 8123 --directory out`

---
