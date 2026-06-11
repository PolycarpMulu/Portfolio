# Notion Documentation Spec — C1rcu1t⤬ Portfolio
> Defines the Notion pages to create and keep in sync for this project.
> Canonical local log stays `docs/DEVLOG.md`; Notion is the polished, shareable mirror.

**Live site:** https://polycarpmulu.netlify.app/  ·  **Repo:** https://github.com/PolycarpMulu/Portfolio

## Placement
Create a parent page **`C1rcu1t⤬ Portfolio — Project Documentation`**. If the existing
Master Index page (id `33c5b34f-e019-813a-a67a-e1f859f58168`) is accessible, nest the parent
under it; otherwise create it standalone and return the link. Create the eight sub-pages below
as children of that parent.

Primary sources on disk: `docs/DEVLOG.md`, `docs/PORTFOLIO_CONTENT.md`,
`docs/UPDATE_branding_security.md`, `docs/BUILD_SPEC.md`, and `git log`.

## Page tree

**01 · Overview**
- One-line summary, goals, live URL, repo URL, current status.
- Stack table: Next.js (App Router) · TypeScript · Tailwind v4 · Recharts · Netlify (static).
- Owner: Polycarp Mulu (C1rcu1t⤬ / qu35t).

**02 · Architecture & Decisions** (decision log — one entry per decision: context · choice · why)
Seed with the real decisions already made:
- Tailwind v4 (CSS-first, `@theme`) instead of v3 config file.
- Dropped the Flask backend → static site on Netlify (no cold start, nothing to expire).
- Contact: Netlify Forms → then removed the form entirely for a static "Get in touch" block.
- Identity: roles-based (Researcher / Engineer / Pentester / Red Team) over "Hardware·Binary·Crypto".
- Skills: Focus Areas capability cards instead of a numeric self-assessed radar.
- Security showcase: hardened headers/CSP, security.txt, in-browser terminal tools.

**03 · Development Log** (chronological — mirror `docs/DEVLOG.md`)
- One entry per milestone/step: date, what was built, key commands, commit hash, status.
- This page is kept in sync with DEVLOG.md going forward.

**04 · Content Source-of-Truth** (mirror `docs/PORTFOLIO_CONTENT.md` — the profile, from LinkedIn/CV)
- Bio + hero copy, the 18 skills + Focus Areas, experience/education/certs, projects, links.

**05 · Security Hardening** (doubles as portfolio evidence / a future writeup)
- Source: `docs/UPDATE_branding_security.md` Part C.
- The headers + CSP, security.txt, the in-browser terminal tools (hash/b64/jwt), the easter egg.
- Record the LIVE securityheaders.com grade once measured, and what each control demonstrates.
- Reflect ACTUAL current state — if a control isn't implemented yet, mark it pending, don't claim it.

**06 · Build & Deploy Runbook**
- Local dev (`npm run dev`), build (`npm run build` → `out/`), Netlify deploy settings.
- Known gotchas: GitHub PAT for push auth; headers/security.txt only apply on the live deploy.

**07 · Backlog & Next Steps**
- Outstanding: real CTF placements, technical writeups, curated GitHub projects, open design tweaks.

**08 · Branding & Visual Identity**
- Source: `docs/UPDATE_branding_security.md` Parts A–B + `src/app/globals.css`.
- Favicon (from `IMG_8656.PNG`) and navbar logo (from `IMG_8657.PNG`) — note current status
  (applied / pending) honestly.
- Design tokens (dark theme, accent `#00FF9C`), fonts (Space Grotesk / Inter / JetBrains Mono),
  and the `root@qu35t` terminal aesthetic.

## Sync rules (going forward)
- After each future milestone: append the new entry to **03 · Development Log** and update any
  affected page (e.g. **05** when security work lands, **04** when content changes).
- Keep DEVLOG.md and the Development Log page consistent.

## Notion safety
- Create NEW pages under the new parent. Do NOT overwrite unrelated existing pages.
- When editing a page that has child pages, use targeted content updates, not full-page
  replacement, to avoid removing child-page references.
- Return all created page URLs when done.
