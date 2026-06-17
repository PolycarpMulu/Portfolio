# Portfolio — Master Update Work Order
> One consolidated work order for Claude Code. Supersedes the earlier piecemeal work orders.
> Execute top to bottom, in order.

**Live site:** https://polycarpmulu.netlify.app/  ·  **Repo:** https://github.com/PolycarpMulu/Portfolio

## Working rules (read first)
- Re-read the current source before changing anything. If a component already exists (the
  scripted terminal, the experience section), MODIFY it — don't recreate it.
- After each PART: `npm run build` + `npm run lint`, fix errors, append a dated entry to
  `docs/DEVLOG.md`, then `git add -A`, commit, `git push origin main`.
- **If `git push` fails for ANY reason (auth/PAT included), STOP and report the exact error.**
  Nothing counts until it is confirmed on the LIVE URL.
- Stay within the existing design tokens (read them from globals.css). Tokens for reference:
  accent ≈ `#00ff9c` (rgb 0,255,156), danger ≈ `#ff4b6e`, base bg ≈ `#0a0a0f` (rgb 10,10,15),
  surface ≈ `#1a1a2e` (rgb 26,26,46). No new colors, no off-brand hex.
- Where this file references muthengia.com, match SHAPE/STRUCTURE only — never his palette or
  his content.

## GUARDRAILS — do NOT copy these from Muthengia
- His **stat counters** ("9+ Years / 500+ Vulnerabilities / 20+ Certifications / 50+ Organisations") — no stats section at all.
- His **right-click / devtools blocker** JS (the "content is protected" alerts) — never add this.
- His **terminal's threat-intel script** (MISP/Lazarus/APT38) — keep our own two scenes.

──●──┬──●──

## PART 0 — PREFLIGHT (deploy reality check)
Before building anything, confirm the previous work actually reached production. Fetch the live
URL and check, for EACH item, whether it is (a) present in the source, and (b) actually live:
- contact form removed (email + social links instead),
- Experience has no dates and no stray "–" dashes,
- meta description = "Exploring security through research, offensive testing, and continuous learning.",
- credibility strip has separators BETWEEN items (no leading ● on the first item),
- brand-icon links (not text) in Contact + footer,
- terminal is the scripted typing terminal (not a static `root@qu35t ~$`),
- Projects shows real projects (not just the single "C1rcu1t⤬ Portfolio" placeholder).

Report it as a **source-vs-live table**. If items are in source but NOT live → the deploy isn't
landing: run `git status`, `git log --oneline origin/main..HEAD` (unpushed commits?), confirm
`git push` succeeds, and check the Netlify dashboard's latest deploy (status + commit hash).
Fix that FIRST — nothing else matters until a push reaches the live URL.

──●──┬──●──

## PART 1 — Rewrite Experience / Education / Certifications (Muthengia "Professional Experience" style)
Minimal: a `// CAREER`-style eyebrow, an H2 **Professional Experience**, then entries that are
JUST a title + an "Org · Location" line. NO dates, NO bullet descriptions, NO "Ongoing"/"Preceded
by" notes. Keep the three labelled groups (Experience / Education / Certifications), the existing
card styling, and the `#experience` anchor.

**Experience** (exactly two, in order):
1. Penetration Tester Intern — Virtually Testing Foundation · Remote
2. Digital Life Associate — The Book Bunk · Nairobi, Kenya

**Education** (exactly two):
1. Diploma in Computer Technology — The Technical University of Kenya · Nairobi, Kenya
2. AH200 Cohort 4 — Cybersecurity Training · AfricaHackon · Nairobi, Kenya

**Certifications** (exactly one):
1. Cyber Security Swara — AfricaHackOn

Removed entirely: the AfricaHackon "Cyber Security Engineer" job entry, the 2018 Jays entry, the
Business Management diploma, and any in-progress/expected certs. Spelling: "Virtually Testing
Foundation" (not "Virtual"), "The Book Bunk", "The Technical University of Kenya"; AfricaHackon
casing consistent site-wide.

──●──┬──●──

## PART 2 — Replace the placeholder project with the seven real projects
Remove the single "C1rcu1t⤬ Portfolio" placeholder. Add these seven as real cards, keeping the
existing card component, styling, and tag pills. Full descriptions are in
`docs/PORTFOLIO_PROJECTS.md` if present — use those; compact reference:

1. **Beetlebug Android CTF** — mobile app pentest across ~10 vuln classes (hardcoded secrets, insecure storage, WebView abuse, SQLi, Firebase misconfig, exported components, logging, clipboard, biometric/deeplink bypass, binary patching). Tags: Mobile Security · RE · JADX · ADB · APKTool. Team (Squad 1). Link: https://github.com/PolycarpMulu/Africahackon_Cohort-IV-/tree/main/mobile-security
2. **Network Forensics & IDS** — keylogger PCAP forensics in Wireshark + Snort detection rules (ICMP, Nmap SYN). Tags: Network Security · DFIR · Wireshark · Snort. Link: …/tree/main/network-forensics-ids
3. **Base64 Password Encoder** — portable Bash tool with base64/openssl/python3 fallbacks + robust error handling. Tags: Tooling · Automation · Bash. Solo. Link: …/tree/main/bash-tooling
4. **"The Gentlemen" Ransomware — Threat Assessment & Detection Engineering** — full detection stack (Sysmon, Velociraptor VQL, Suricata, Splunk, Sigma, MITRE ATT&CK, F3EAD). Tags: Threat Intel · Detection Eng · Blue Team. Team. Link: …/tree/main/threat-detection-engineering
5. **crAPI — API Security Assessment** — OWASP API Top 10 (BOLA, broken auth, mass assignment, SSRF, JWT forgery…), CRITICAL posture. Tags: API Security · Web · Burp Suite. Solo. Link: …/tree/main/api-security-crapi
6. **Vulnerable Bank — Web & API Pentest** — SQLi, weak OTP, insecure JWT / priv-esc, mass assignment, file upload, business-logic abuse → full account/admin compromise. Tags: Web Security · API · Burp · SQLMap. Team (Squad 1). Link: …/tree/main/web-api-vulnerable-bank
7. **Student-Allocation** — software development project. OPEN the repo, read its README, and fill in an accurate one-line description + the real language/stack before committing. Tags: Software Development. Link: https://github.com/PolycarpMulu/Student-Allocation

> Note: links 1–6 point to subfolders of the `Africahackon_Cohort-IV-` repo that exist only after
> a SEPARATE docs commit. If those folders aren't there yet, point each card at the repo root for
> now and leave a TODO in `docs/DEVLOG.md`.

──●──┬──●──

## PART 3 — Terminal redesign
Modify the existing scripted terminal (keep its two scenes + closer + reduced-motion handling).
Four changes:

**1. Move it to the right of a two-column hero.** Left column = text stack (eyebrow, headline,
rotating role, subline, the two buttons, socials); right column = the terminal panel, vertically
centred. Side-by-side on desktop; stacks on mobile (Part 6).

**2. Frame ("Muthengia edges").** Apply this exact frame, using OUR tokens for color:
- `border-radius: 12px`, `overflow: hidden`, a 1px border in accent at low alpha (`rgba(0,255,156,0.3)`),
- `box-shadow: 0 0 40px rgba(0,255,156,0.08), 0 20px 60px rgba(0,0,0,0.5)`,
- `backdrop-filter: blur(8px)`, semi-transparent dark background,
- a title bar with three small window dots (red `#ff5f57`, yellow `#ffbd2e`, green `#28ca41`),
  then a mono title `root@qu35t ~` and a small scene label.

**3. Hover = the portrait's hover.** Read the hover effect already on the About portrait
(`assets/portrait.jpg`) from the existing CSS/component, and apply the identical transition (same
transform, timing, shadow/glow) to the terminal panel.

**4. Hide the scrollbar (the "remove scroll").** No visible scrollbar:
`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`. Keep the per-loop clear/restart
so lines don't accumulate. No visible scroll UI of any kind.

──●──┬──●──

## PART 4 — Subtle section dividers
Add ONE subtle gradient hairline between sections (Muthengia's "circuit trace"), using OUR accent
token. Adapt the selector to our actual section markup:
```css
.section + .section::after {
  content: '';
  display: block;
  height: 1px;
  margin-top: 48px;
  background: linear-gradient(90deg,
    transparent,
    rgba(0,255,156,0.2) 30%,
    rgba(0,255,156,0.5) 50%,
    rgba(0,255,156,0.2) 70%,
    transparent);
}
```
Keep it subtle — no heavy background textures unless explicitly asked.

──●──┬──●──

## PART 5 — Background images
Three images sit in `Background/` (`IMG_9239.JPG`, `IMG_9240.JPG`, `IMG_9241.JPG`).
1. **View them first** and judge whether each suits a dark background.
2. Move them under `public/` (e.g. `public/bg/`) and optimize: compress + convert to WebP at
   reasonable dimensions (they're large phone JPGs).
3. Apply the suitable one(s) as **section backgrounds under a heavy dark overlay**, Muthengia-style
   — at most one or two sections (e.g. Contact, and optionally the hero or one mid-page section).
   Keep text fully readable:
```css
background:
  linear-gradient(rgba(10,10,15,0.93), rgba(26,26,46,0.90)),
  url('/bg/<image>.webp') center / cover no-repeat;
```
4. Do NOT use `background-attachment: fixed` on mobile (it janks); only at `md`+ if at all.
5. If an image is a portrait/logo rather than a texture/scene, do NOT force it as a full-bleed
   background — use it as a content element instead and note that in DEVLOG.
6. Do not apply a background to every section — one or two, tastefully.

──●──┬──●──

## PART 6 — Responsive pass (all devices)
Test with the dev server at ~320, 375, 414, 768, 1024, 1280, 1440px.
- **No horizontal overflow at any width.**
- **Hero:** two columns at `md`+; below `md`, single stacked column with the terminal full-width
  BELOW the text at reduced height. Headline/role type scales down on small screens.
- **Nav:** hamburger opens/closes, links work, tap targets ≥ 44px.
- **Focus Areas + Projects cards:** reflow (1 → 2 → 3 cols) with no clipped content.
- **Skill pills:** wrap, never overflow their container.
- **Terminal on mobile:** typing text stays inside the panel, no overflow, scrollbar still hidden.
- **Background-image sections:** overlay keeps text readable at every size; no fixed-attachment on mobile.
- **Images:** scale within their containers, no distortion.
- **Section padding/type** tighten on small screens (responsive classes, not fixed px).

──●──┬──●──

## FINISH
Push, wait for the Netlify rebuild, then FETCH the live URL and report exactly what is live for:
the five earlier corrections, the rewritten Professional Experience section, the seven projects,
all four terminal changes, the section dividers, the background images, and the responsive
behavior at mobile vs desktop widths. If anything is not reflected on the live URL after the
rebuild, say so explicitly and show the push/Netlify status — never report success from local
state alone.

◈ ──●── ◈ ──●── ◈
