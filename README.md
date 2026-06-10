# C1rcu1t⤬ — Portfolio

Personal portfolio for **Polycarp Mulu** (`C1rcu1t⤬` · `qu35t`) — Cybersecurity
Researcher / Engineer / Penetration Tester / Red Team Engineer. A fully static,
single-page site (no backend) with the contact form handled by Netlify Forms.

## Tech stack

| Layer        | Choice                                            |
| ------------ | ------------------------------------------------- |
| Framework    | Next.js (App Router) — static export (`output: 'export'`) |
| Language     | TypeScript                                        |
| Styling      | Tailwind v4 (CSS-first; tokens in `globals.css @theme`) |
| Fonts        | next/font — Space Grotesk · Inter · JetBrains Mono |
| Forms        | Netlify Forms (via `public/__forms.html`)         |
| Hosting      | Netlify (static)                                   |

> No `tailwind.config.ts`, no database, no server. Content lives as typed config in
> `src/data/*.ts`.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # static export → out/
npm run lint       # eslint
```

The build writes the static site (HTML, assets, `robots.txt`, `sitemap.xml`, OG
image) to `out/`.

## Deploy (Netlify)

| Setting           | Value           |
| ----------------- | --------------- |
| Build command     | `npm run build` |
| Publish directory | `out`           |
| Environment vars  | none            |

**Before deploy:** set the production URL in `src/lib/site.ts` (`SITE_URL`) — it
feeds `metadataBase`, `robots.txt`, `sitemap.xml`, and the OG image.

### Forms

Netlify auto-detects `public/__forms.html` at build and registers the `contact`
form (with a `bot-field` honeypot). Enable email alerts under **Forms → contact →
notifications** in the Netlify dashboard. The React form in `Contact.tsx` POSTs to
`/__forms.html`; its field names match the detection file exactly.

## Project structure (abbreviated)

```
src/
├── app/            # layout, page, globals.css, robots/sitemap/opengraph-image
├── components/
│   ├── layout/     # Navbar, Footer
│   ├── sections/   # Hero, About, Skills, Projects, Experience, CTF, Writeups, Contact
│   └── ui/         # CircuitBackground, TerminalText, SkillTag, ProjectCard, …
├── data/           # bio, skills, projects, experience, ctf, writeups (the "CMS")
├── hooks/          # useActiveSection, useTerminalType, useRotatingType
├── lib/            # site.ts (SITE_URL)
└── types/          # shared TypeScript shapes
public/
├── __forms.html    # Netlify Forms detection
└── assets/         # portrait.jpg
docs/                # BUILD_SPEC.md, PORTFOLIO_CONTENT.md, DEVLOG.md
```

## Editing content

All content is typed config under `src/data/`. CTF and Writeups sections self-hide
while their arrays are empty. Update a `.ts` file and redeploy — no CMS.
