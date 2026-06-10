# C1rcu1t⤬ Portfolio — Build Specification v2
> **Polycarp | Cybersecurity Engineer | Hardware · Binary · Crypto**
> Alias: `C1rcu1t⤬` · `qu35t` · Nairobi, Kenya
> Stack: **Next.js (App Router) · TypeScript · Tailwind v4 · Recharts · Netlify**
> Backend: **none** — fully static. Contact form via **Netlify Forms**.

──●──┬──●──

## 0. What changed from v1 (read first)

This is a revised, decision-locked version of the original spec. Key changes:

- **Tailwind v4 (CSS-first).** No `tailwind.config.ts`. All design tokens live in
  `globals.css` under an `@theme` block and become utilities automatically.
- **No Flask / no PostgreSQL.** The site is 100% static. The contact form posts to
  **Netlify Forms** — zero backend, zero cold start, built-in spam filtering.
- **`--src-dir` fixed.** v1 had a `--no-src-dir` flag that contradicted the whole
  `src/`-based layout. Corrected.
- **Fonts via `next/font`** instead of a CSS `@import` (no layout shift, self-hosted).
- **Accessibility + SEO baked in:** `prefers-reduced-motion`, contrast-safe muted token,
  `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`.
- **Empty sections hide themselves** instead of shipping visible "placeholder" content.

──●──┬──●──

## 1. How to build this with Claude Code

Don't paste the prompts below one at a time like a chat. Claude Code is agentic — it
works in your real repo, creates many files per turn, and can run the dev server to
verify itself. Work like this:

1. **Scaffold first** (Prompt 5A). Let `create-next-app` generate the project — the
   current template also drops an `AGENTS.md` + `CLAUDE.md` for you automatically.
2. **Seed `CLAUDE.md`.** Append the "Project Rules" block from §10 of this file into the
   repo's `CLAUDE.md`. Claude Code reads it automatically every session, so your tokens
   and conventions are always in context without re-explaining them.
3. **Drop this spec into the repo** at `docs/BUILD_SPEC.md` and tell Claude Code to use
   it as the source of truth.
4. **Work in milestones, not prompts.** Suggested order:
   `data layer → tokens/layout → hero → remaining sections → contact → deploy`.
   Let Claude Code build a whole milestone, then run `npm run build` and `npm run lint`
   to self-check before you review.
5. **`git commit` after every milestone.** Agentic edits are fast; commits are your undo.
6. **Use plan mode** for the initial scaffold so you can sanity-check the file plan first.

──●──┬──●──

## 2. Architecture

```
┌─────────────────────────────────────────────┐
│              Next.js (App Router)            │
│   TypeScript · Tailwind v4 · Recharts        │
│   All content static in src/data/*.ts        │
│   Static export  →  out/                      │
│   Deploy: Netlify                            │
└───────────────────┬──────────────────────────┘
                    │  POST (contact only)
                    ▼
┌─────────────────────────────────────────────┐
│              Netlify Forms                   │
│   Detected at build from public/__forms.html │
│   Honeypot + spam filtering built in         │
│   Submissions → Netlify dashboard + email    │
└─────────────────────────────────────────────┘
```

**Content model:** all portfolio content (projects, skills, CTFs, writeups, bio) lives in
`src/data/` as typed TS config. No CMS, no DB. Editing content = editing a `.ts` file and
redeploying.

──●──┬──●──

## 3. Repository Structure

```
circuit-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # single-page scroll
│   │   ├── globals.css              # ← Tailwind v4 @theme tokens live here
│   │   ├── opengraph-image.tsx      # static OG image
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/ (Navbar.tsx, Footer.tsx)
│   │   ├── sections/ (Hero, About, Skills, Projects, CTFAchievements, Writeups, Contact)
│   │   └── ui/ (TerminalText, SectionLabel, ProjectCard, SkillTag, CircuitBackground)
│   ├── data/ (bio.ts, projects.ts, skills.ts, ctf.ts, writeups.ts)
│   ├── hooks/ (useTerminalType.ts, useActiveSection.ts)
│   └── types/ (index.ts)
├── public/
│   ├── __forms.html                 # ← Netlify Forms detection file
│   └── assets/
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── CLAUDE.md                        # generated by create-next-app; extend per §10
└── package.json
```

> No `tailwind.config.ts` and no `backend/`. Both are intentionally gone.

──●──┬──●──

## 4. Design Tokens (Tailwind v4)

In v4 you define tokens as CSS custom properties inside `@theme`, and Tailwind generates
the matching utilities (`--color-accent` → `bg-accent`, `text-accent`, `border-accent`;
`--font-display` → `font-display`).

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-void:       #0a0a0f;
  --color-surface:    #1a1a2e;
  --color-surface-hi: #2d2d4e;
  --color-accent:     #00ff9c;   /* terminal green / circuit trace */
  --color-danger:     #ff4b6e;   /* critical badges, errors */
  --color-muted:      #9aabbd;   /* nudged lighter than v1 #8899AA for WCAG AA on void */
  --color-fg:         #e8f4f0;
  --color-border-dim: #2d2d4e;

  --font-display: var(--font-space-grotesk), sans-serif;
  --font-body:    var(--font-inter), sans-serif;
  --font-mono:    var(--font-jetbrains-mono), monospace;
}

html { scroll-behavior: smooth; }
body { background: var(--color-void); color: var(--color-fg); }

@utility section-label {
  @apply font-mono text-accent text-xs uppercase;
  letter-spacing: 0.2em;
}

/* Honor reduced-motion globally — protects the circuit + terminal animations */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Signature element:** animated circuit-trace SVG in the hero background only. One
`<CircuitBackground />`, used nowhere else.

──●──┬──●──

## 5. Content Data Files

Populate these with real data before building components — they are your CMS.
The §4A–4E prompts from the original spec are unchanged and still correct (types, bio,
projects, skills, ctf, writeups). Two small additions:

- **CTF & Writeups:** if real data isn't ready, leave the arrays **empty** rather than
  filling them with placeholder rows. The sections render only when their array has
  entries (see 5G/5H). A portfolio with a hidden section beats one showing "placeholder."
- Use `next/font` CSS variable names that match §4 (`--font-space-grotesk`, etc.).

> Reuse Prompts 4A, 4B, 4C, 4D, 4E verbatim from your v1 doc. They don't need changes.

──●──┬──●──

## 6. Frontend Build — Prompts

### PROMPT 5A — Project Setup (Tailwind v4 + src dir)

```
Initialize a Next.js project (App Router, TypeScript) in the CURRENT directory.

Command:
npx create-next-app@latest . --typescript --eslint --app --src-dir --import-alias "@/*"
Accept the default Tailwind CSS option (this installs Tailwind v4, CSS-first).

After init, confirm there is NO tailwind.config.ts. If create-next-app produced one
(older template), remove it and migrate to v4 CSS-first config instead.

postcss.config.mjs must contain:
  const config = { plugins: ["@tailwindcss/postcss"] };
  export default config;

Replace src/app/globals.css with the @theme token block from docs/BUILD_SPEC.md §4
(import tailwindcss, define color + font tokens, section-label utility,
reduced-motion media query, smooth scroll, body bg/fg).

Set up fonts with next/font/google in src/app/layout.tsx:
  Space_Grotesk (400,500,700) → variable --font-space-grotesk
  Inter (400,500)             → variable --font-inter
  JetBrains_Mono (400,500)    → variable --font-jetbrains-mono
Apply all three variable classes to <html>.

next.config.ts:
  output: 'export', images: { unoptimized: true }, trailingSlash: true

Install Recharts: npm install recharts
```

### PROMPT 5B–5H — Sections

Reuse Prompts 5B (Navbar/Footer), 5C (Hero + CircuitBackground + useTerminalType),
5D (About), 5E (Skills), 5F (Projects), 5G (CTF), 5H (Writeups) from your v1 doc, with
these **four amendments**:

1. **Tailwind classes are v4-native** — `bg-accent`, `text-muted`, `font-display`, etc.
   all come straight from the `@theme` tokens. No config-file class names.
2. **Recharts is client-only.** The Skills chart component (5E) must start with
   `"use client"` or the static build will fail.
3. **Navbar active-section highlight** uses an `IntersectionObserver` via a
   `useActiveSection.ts` hook — don't poll scroll position.
4. **CTF (5G) and Writeups (5H) render conditionally.** If the imported array is empty,
   return `null` for the whole section (and the nav link for it). No placeholder rows,
   no "last updated" stubs shipped to production.

### PROMPT 5I — Contact Section (Netlify Forms, no backend)

```
Build src/components/sections/Contact.tsx as a Netlify Forms submission — NO fetch to any
custom API, NO src/lib/api.ts.

Fields: name (text), email (email), subject (text), message (textarea, min 4 rows),
plus a hidden honeypot field named "bot-field".

Because this is a static export, the React form is submitted via fetch to a static
detection file (see §7). Submit handler:

  const encode = (d: Record<string,string>) =>
    Object.keys(d).map(k => encodeURIComponent(k)+"="+encodeURIComponent(d[k])).join("&");

  await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({ "form-name": "contact", name, email, subject, message, "bot-field": "" }),
  });

State: isLoading, isSuccess, error. Client-side validation: all fields required, email
must contain "@". On success, replace the form with the accent-mono message
"// MESSAGE TRANSMITTED. I'll be in touch." On failure, show danger-colored error text.

Styling: inputs bg surface, border border-dim, text fg, Inter font; focus → border accent
+ subtle accent glow; labels mono/uppercase/accent; submit button bg accent, text black,
font-display, disabled opacity-50.

Beside the form on desktop, render GitHub / X / LinkedIn links from bio.ts.
Section label: "// CONTACT".
```

### PROMPT 5J — Page Assembly

```
Assemble src/app/page.tsx in order:
Hero → About → Skills → Projects → CTFAchievements → Writeups → Contact
(CTF and Writeups self-hide when empty.)

Each non-hero section: <section id="..."> with py-24, inner max-w-6xl mx-auto px-4.

src/app/layout.tsx:
- html lang="en" + the three next/font variable classes
- metadata: title "C1rcu1t⤬ | Polycarp", description from bio.tagline,
  openGraph + twitter card metadata
- render <Navbar /> {children} <Footer />
- body: bg-void text-fg font-body antialiased
```

──●──┬──●──

## 7. Netlify Forms Setup (replaces the entire backend)

Netlify detects forms at **build time** by scanning HTML files in the deploy. A static
Next export won't expose the React form to that scanner, so add a plain detection file.

**`public/__forms.html`** — Netlify reads this and registers the "contact" form:

```html
<!DOCTYPE html>
<html>
  <head><meta charset="utf-8"><title>Forms</title></head>
  <body>
    <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="text" name="subject" />
      <textarea name="message"></textarea>
      <input name="bot-field" />
    </form>
  </body>
</html>
```

The field `name` attributes here **must match** the keys you POST from `Contact.tsx`.
The `netlify-honeypot="bot-field"` + the hidden `bot-field` input give you free bot
filtering. In the Netlify dashboard: **Forms → contact → notifications** to get an email
on each submission. No rate limiting, no DB, no migrations, nothing to expire.

> Want a real backend artifact for the portfolio later? Build it as a **separate,
> deliberately-hardened API project** with its own repo + threat-model writeup, and link
> it under Projects. Keep it out of the contact path so a cold start never breaks the form.

──●──┬──●──

## 8. SEO & Metadata

```
Add three files under src/app:

robots.ts      → export default () => ({ rules: [{ userAgent: "*", allow: "/" }],
                  sitemap: "https://<your-domain>/sitemap.xml" })
sitemap.ts     → export default () => [{ url: "https://<your-domain>/", priority: 1 }]
opengraph-image.tsx → generate a 1200×630 OG card with ImageResponse:
                  void background, accent "C1rcu1t⤬" wordmark, tagline in mono.
                  (Runs at build time → static image, compatible with output:'export'.)

In layout.tsx metadata: set metadataBase, openGraph (title/description/images),
twitter (card: "summary_large_image").
```

──●──┬──●──

## 9. Deploy (Netlify)

```
Generate README.md covering:

1. Overview (2 sentences) + tech stack table.
2. Local dev:
     npm install
     npm run dev        # http://localhost:3000
3. Build:
     npm run build      # static export → out/
4. Netlify settings:
     Build command:     npm run build
     Publish directory: out         (NOT ".out")
     No environment variables needed — there is no backend.
5. Forms: note that Netlify auto-detects public/__forms.html on deploy;
   enable email notifications under Forms → contact.
6. Folder structure (abbreviated).
```

──●──┬──●──

## 10. Project Rules — paste into CLAUDE.md

```md
## Portfolio — Project Rules

- Stack: Next.js App Router, TypeScript, Tailwind v4 (CSS-first), Recharts. Static export.
- NO backend. NO tailwind.config.ts. Contact form = Netlify Forms via public/__forms.html.
- Design tokens live ONLY in src/app/globals.css @theme. Use generated utilities
  (bg-accent, text-muted, font-display). Never hardcode hex in components.
- Tokens: void #0a0a0f, surface #1a1a2e, surface-hi #2d2d4e, accent #00ff9c,
  danger #ff4b6e, muted #9aabbd, fg #e8f4f0, border-dim #2d2d4e.
- Fonts via next/font only: display=Space Grotesk, body=Inter, mono=JetBrains Mono.
- CircuitBackground is hero-only. All animations must respect prefers-reduced-motion.
- Any component using Recharts, hooks, or browser APIs starts with "use client".
- CTF + Writeups sections return null when their data array is empty.
- Single-page scroll; nav anchors: #about #skills #projects #ctf #writeups #contact.
- No component libraries — pure Tailwind + React state.
- Verify with `npm run build` and `npm run lint` before declaring a milestone done.
```

──●──┬──●──

## 11. Build Checklist

```
[ ] 5A  — Scaffold (create-next-app, --src-dir, v4) + tokens + next/font + next.config
[ ] CLAUDE.md — append Project Rules (§10)
[ ] 4A–4E — Types + bio/projects/skills/ctf/writeups data (real data, empty arrays OK)
[ ] 5B  — Navbar (IntersectionObserver active-section) + Footer
[ ] 5C  — Hero + CircuitBackground + useTerminalType
[ ] 5D  — About
[ ] 5E  — Skills ("use client" Recharts)
[ ] 5F  — Projects + ProjectCard
[ ] 5G  — CTF (self-hides when empty)
[ ] 5H  — Writeups (self-hides when empty)
[ ] 5I  — Contact (Netlify Forms fetch)
[ ] 7   — public/__forms.html
[ ] 8   — robots.ts, sitemap.ts, opengraph-image.tsx, layout metadata
[ ] 5J  — page.tsx + layout.tsx assembly
[ ] 9   — README + deploy to Netlify (publish dir: out)
[ ] --- — Test contact form end-to-end on the deployed URL
[ ] --- — Verify mobile responsiveness + reduced-motion
[ ] --- — Fill real GitHub/X/LinkedIn links in bio.ts
```

──●──┬──●──

*C1rcu1t⤬ · qu35t · HSC Portfolio v2 · Next.js · Tailwind v4 · Netlify (static)*
◈ ──●── ◈ ──●── ◈
