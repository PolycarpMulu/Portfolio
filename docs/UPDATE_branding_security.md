# Portfolio Update — Branding + Security Showcase
> Work order for Claude Code. Execute top to bottom.

**Live site:** https://polycarpmulu.netlify.app/
**Repo:** https://github.com/PolycarpMulu/Portfolio
> Local dev runs at http://localhost:3000 (`npm run dev`). After pushing, Netlify rebuilds
> the live URL above — verify headers, `security.txt`, favicon, and the terminal against the
> live deploy, since headers and `/.well-known/` only apply on Netlify, not the dev server.

Source images (on disk):
- `~/CyberLab/Projects/circuit-portfolio/attachments/IMG_8656.PNG` → browser tab icon (favicon)
- `~/CyberLab/Projects/circuit-portfolio/attachments/IMG_8657.PNG` → site logo (navbar)

**Working rules (every part):**
- After each Part: `npm run build` + `npm run lint`, fix all errors, append a dated entry
  to `docs/DEVLOG.md`, then `git add -A`, commit, and `git push origin main`.
- Stay within existing design tokens — no new colors, no hardcoded hex.
- This is a STATIC Next.js site (`output: 'export'`) on Netlify. No backend.
- Do not fabricate. If an image is unsuitable (see checks below), STOP and ask.

──●──┬──●──

## Part A — Tab icon (favicon) from IMG_8656.PNG

1. Inspect the image first. Confirm it's roughly square and reads on a browser tab. If it
   isn't square, center-crop to square. If it's smaller than ~256px, note it (favicons want
   256–512px) and upscale only if it stays crisp.
2. App Router favicon convention: DELETE the default `src/app/favicon.ico`, then add the
   processed image as `src/app/icon.png` and a copy as `src/app/apple-icon.png`. Next.js
   auto-generates the `<link rel="icon">` metadata from these files.
3. Optionally also emit a legacy `favicon.ico`.
4. Build and confirm the new icon shows in the tab.

## Part B — Logo from IMG_8657.PNG

1. **Inspect first.** The site background is dark (`#0A0A0F`). If the logo is dark artwork
   with no transparency, it will be invisible on the navbar — STOP and ask me for a
   transparent or light version. If it has transparency or light marks, proceed.
2. Copy to `public/assets/logo.png`.
3. In `Navbar.tsx`, replace the text "C1rcu1t⤬" wordmark with the logo:
   `<img src="/assets/logo.png" alt="C1rcu1t⤬ — Polycarp Mulu" />`, height ~28–32px, width
   auto, plain `<img>` (static export). Keep the small pulse dot beside it if it still looks
   good; otherwise drop it.
4. Optionally reuse a small version in the Footer. Keep nav spacing intact; test on mobile.

──●──┬──●──

## Part C — Security showcase

Make the portfolio itself demonstrate security competence. Two tiers: hardening (pure win)
and an interactive showcase.

### C1 — Site hardening (security headers)
Add headers via a Netlify `public/_headers` file (or `netlify.toml`). Include:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```
- **TUNE + TEST.** Next.js hydration can require `'unsafe-inline'` for scripts/styles; the
  fonts are self-hosted via `next/font` so no external font domain is needed.
- After deploying a preview, TEST the whole site renders and is interactive. Do NOT ship a
  broken site for a header grade — if CSP breaks hydration, loosen it minimally and retest.
- Verify (don't assume) a strong grade on securityheaders.com / Mozilla Observatory.

### C2 — security.txt (RFC 9116)
Add `public/.well-known/security.txt`:
```
Contact: mailto:polycarpmulu@gmail.com
Expires: <a REAL date ~12 months from today, ISO 8601, e.g. 2027-06-11T00:00:00.000Z>
Preferred-Languages: en
Canonical: https://polycarpmulu.netlify.app/.well-known/security.txt
```
Confirm it serves at `/.well-known/security.txt` after build. (Signals responsible-disclosure
literacy — a real security-professional touch.)

### C3 — Interactive terminal (the centerpiece)
Build a client-side (`"use client"`) interactive terminal — its own section (`// TERMINAL`
or a "Lab" section), in the existing terminal aesthetic (bordered chip, mono, accent prompt
`root@qu35t ~ $`). This is the feature that showcases skill.

- Visitors type commands. Support command history (up/down arrows), `help`, and `clear`.
- Info commands pull from REAL `src/data` where possible:
  `help · whoami · about · skills · projects · experience · contact · clear · banner`
- Security utility commands — **all run locally in the browser, nothing is sent anywhere:**
  - `hash <text>`         → SHA-256 via Web Crypto (`crypto.subtle.digest`)
  - `b64 enc <text>` / `b64 dec <text>` → Base64 encode/decode (UTF-8 safe)
  - `jwt <token>`         → decode header + payload (base64url) and pretty-print JSON.
                            State clearly it does NOT verify the signature; local-only.
- Print a one-line note that all tools run client-side (nothing leaves the browser) — that
  privacy stance is itself part of the showcase.
- Keyboard-accessible; respect `prefers-reduced-motion` (no typing animation if reduced).
- These tools need no `eval` and no external calls, so they stay CSP-compatible.

### C4 — Hacker easter egg (optional, keep it tasteful)
- On load, `console.log` a styled banner + a short note to fellow hackers, plus a small
  challenge (e.g. a base64/hex string that decodes to a flag, or a hint pointing at a hidden
  terminal command or at `security.txt`). Subtle, not noisy.
- Optionally a single HTML-comment nod in the page source.
- Keep it benign — a signal to the security crowd, nothing that breaks or misleads.

### C5 — Optional "hardened" footer line
A small footer note is fine if it fits cleanly, e.g.
`Hardened: CSP · security headers · security.txt · 100% client-side`. Skip if it clutters.

──●──┬──●──

## Wrap-up
1. `npm run build` + `npm run lint` — zero errors.
2. Push so Netlify builds a preview, then TEST end to end: favicon shows; logo renders on the
   dark navbar; terminal commands work (verify `hash`, `b64`, `jwt` produce correct output);
   `security.txt` serves; headers present (check securityheaders.com); nothing broke at
   desktop or ~375px mobile.
3. Log each part in `docs/DEVLOG.md`, commit, push `origin main`.
4. Summarize what changed and the security-header grade actually achieved.

◈ ──●── ◈ ──●── ◈
