# Portfolio — Real Content Pack
> Source of truth for src/data/*.ts. Extracted from Polycarp's LinkedIn export + skills list.
> Claude Code: transform this into the typed .ts files. Polycarp: edit any line freely.

──●──┬──●──

## 1. Identity, Hero & Links  →  src/data/bio.ts

```
name:        Polycarp Mulu
alias:       C1rcu1t⤬
handle:      qu35t
location:    Nairobi, Kenya
email:       polycarpmulu@gmail.com

links:
  github:    https://github.com/PolycarpMulu
  linkedin:  https://www.linkedin.com/in/polycarpmulu/
  twitter:   https://x.com/C1rcu1tX
```

### Hero copy (FINAL — use verbatim)
```
headline:  Securing Systems Through Research, Engineering, and Offensive Security
roles:     ["Cybersecurity Researcher", "Cybersecurity Engineer",
            "Penetration Tester", "Red Team Engineer"]
subline:   Exploring security through research, offensive testing, and continuous learning.
```
> The Hero is already built (Milestone 4) and types "POLYCARP" + alias + an old tagline.
> It must be REVISED to this copy. Recommended layout:
> - Top label: `// INITIALIZING`
> - Name "Polycarp Mulu" — large display font
> - Headline (above) as the main statement, display font
> - `roles` rendered as a rotating terminal-type line (type role, pause, backspace, next,
>   loop) in accent mono — showcases all four identities. This needs a small extension to
>   useTerminalType (add delete/cycle) or a new useRotatingType hook.
> - `subline` below, muted mono.
> - Keep the two buttons + blinking cursor.
> Simpler fallback if you don't want the rotating effect: type the headline once and render
> the four roles as a static `·`-separated line.

### About bio (FINAL — use verbatim)
> I am a Cybersecurity Researcher, Cybersecurity Engineer, Penetration Tester, and Red Team
> Engineer focused on understanding how systems can be secured through research, analysis,
> and practical security testing.
>
> My work combines offensive and defensive security principles, with an emphasis on
> continuous learning, hands-on experimentation, and the development of real-world technical
> skills. I am passionate about exploring modern security challenges, analyzing threats, and
> improving the resilience of digital systems.
>
> This portfolio documents my cybersecurity journey, research, technical write-ups, labs,
> and professional development as I continue building expertise across multiple areas of
> cybersecurity.

**affiliation:**
- AfricaHackon
- Hack The Box Kenya

> Credibility strip: combine affiliations with current focus + location for a fuller row:
> `AfricaHackon · Hack The Box Kenya · AH200 Cohort 4 · HSC CyberLab · Nairobi, Kenya`
> (still no invented metrics).

**currentFocus:** `AH200 Cohort 4 · CXD-1 Hardware Platform · HSC CyberLab`

──●──┬──●──

## 2. Skills  →  src/data/skills.ts

### Radar levels (0–10, SELF-ASSESSED — suggested honest starting values, adjust freely)
> These reflect ~3 yrs experience + a pentest internship + AfricaHackon engineer work, so
> they're higher than the earlier all-1s, which undersold you. Set them to your true read.

```
Mobile & Application Security: 4
Malware Analysis:              4
Threat Intelligence / OSINT:   4
Penetration Testing:           3
Web Application Security:      3
Network Security:              3
Hardware Security:             3
Reverse Engineering:           3
Scripting & Automation:        3
Linux Internals:               3
Cryptography:                  2
Cloud Security:                2
```
Keep the `self-assessed` sublabel + footnote.

### Professional skills (FINAL — render as tag pills like the LinkedIn screenshot)
Canonical list — use exactly these 18:
Cloud Security · Cyber Defense · Cybersecurity · Cybersecurity Automation ·
Cybersecurity Compliance · Cybersecurity Standards · Governance · GRC ·
Malware Analysis · Mobile Application Security · Network Security · OSINT ·
Penetration Testing · Risk Management · Security Automation · Threat Intelligence ·
Vulnerability Assessment · Web Application Security

Optional grouped arrangement (cleaner than 18 flat pills; mirrors the spec's domain
grouping for tools — use this if you want the section to scan by area):
- Offensive:   Penetration Testing · Vulnerability Assessment · Web Application Security ·
               Mobile Application Security · OSINT
- Defensive:   Cyber Defense · Network Security · Malware Analysis · Threat Intelligence ·
               Cybersecurity
- Automation:  Cybersecurity Automation · Security Automation
- GRC:         Governance · GRC · Risk Management · Cybersecurity Compliance ·
               Cybersecurity Standards
- Cloud:       Cloud Security

Note: "Cybersecurity Automation" ≈ "Security Automation", and "Governance" overlaps
"GRC". Both pairs are kept per your list, but you could merge each to tighten the cloud.

### Tooling tags by domain (keep from BUILD_SPEC §4D)
- Hardware: Ghidra, OpenOCD, JTAG, SWD, logic analyzer, ESP-IDF, MicroPython, ChipWhisperer
- Binary/RE: radare2, pwndbg, GDB, pwntools, binwalk, angr, Volatility3, FLOSS, Capa, YARA
- Crypto: hashcat, john, CyberChef, openssl, z3, sympy
- Web: Burp Suite Pro, ffuf, nuclei, subfinder, httpx, feroxbuster, dalfox, amass
- Network: Wireshark, nmap, naabu, netcat

──●──┬──●──

## 3. Experience  →  NEW section (security-relevant only, in this order)

> Add an `Experience` type + section. Reuse the CTF timeline's vertical-timeline visual.
> CURATION RULE: include only the roles below. DO NOT add the 2014 cashier / 2015 accounts
> intern roles — they dilute a security portfolio.

```
1. Cyber Security Engineer — AfricaHackon
   (community / training role; ongoing)
   - Cybersecurity engineering and knowledge-sharing within East Africa's premier
     hacking community.

2. Penetration Tester Intern — Virtually Testing Foundation
   Oct 2021 – Dec 2021
   - Hands-on penetration testing across web and network targets.

3. Digital Life Associate — The Book Bunk
   Apr 2022 – Jan 2025 · Nairobi, Kenya
   - (preceded by Intern, Oct 2021 – Mar 2022)
   - Digital systems and technology work supporting public library restoration.

4. Software Developer — Jays Pyrotechnics Ltd      [OPTIONAL — shows technical range]
   Nov 2018 – Dec 2018
   - Integrated Kinect motion capture with 3D projection.
```

## 4. Education & Certifications  →  same section or a sub-block

```
Education:
- The Technical University of Kenya — Computer Technology / Computer Systems Technology
  (2016 – 2021)
- AfricaHackon — Cyber Security Engineer (training)
- Mount Kenya University — Business/Management (2014 – 2021)   [OPTIONAL]

Certifications:
- AfricaHackOn Cyber Security Swara
```

──●──┬──●──

## 5. Projects  →  src/data/projects.ts

Keep the five projects already specified in BUILD_SPEC §4C (CXD-1, HSC Lab Infrastructure,
Web App Pentest Suite, Malware Analyst Isolated User, AH200 Lab Setup). They're real and
map to your actual lab work. Optional 6th, meta and honest:

```
6. C1rcu1t⤬ Portfolio (this site)
   - Static Next.js + Tailwind v4 portfolio, built milestone-by-milestone with a full
     development log (docs/DEVLOG.md).
   - Status: active · Domain: web, scripting · Tags: nextjs, tailwind, netlify
   - links: GitHub repo
```

──●──┬──●──

## 6. CTF & Writeups

- **CTF:** leave empty for now — you have no real placements yet, and the section
  self-hides. (The AfricaHackon Swara cert lives in Experience/Certifications, not here.)
- **Writeups:** leave empty, OR add ONE real meta-writeup once the site ships:
  "Building a static security portfolio with Next.js + Claude Code — build notes"
  (category: tool), linking to docs/DEVLOG.md. Only add it when it's real.

──●──┬──●──

## 7. Focus Areas  →  OPTIONAL new section (idea adapted from muthengia.com)

Eric Muthengia's site turns flat skills into capability cards: title + one-line
description + a row of technique/tool chips. It reads far stronger than a pill cloud
because it shows *depth*. Adapted honestly for early-career — framed as areas of
practice/study, NOT paid "services" (you're not selling consultancy yet).

This can either ELEVATE the Skills section or REPLACE the pill cloud — your call. Suggested
cards (edit freely):

```
1. Penetration Testing & Red Teaming
   Offensive assessment of web, network, and mobile targets; building practical
   exploitation and red-team skills.
   chips: Web · Network · Mobile · OWASP · Burp Suite · ffuf · nuclei

2. Malware Analysis & Threat Intelligence
   Static and behavioural malware analysis; tracking adversary TTPs and writing CTI notes.
   chips: YARA · Capa · FLOSS · Volatility3 · OSINT · MITRE ATT&CK

3. Hardware & Firmware Security
   Reverse engineering embedded devices and firmware; building the CXD-1 research platform.
   chips: Ghidra · OpenOCD · JTAG/SWD · binwalk · ESP32-S3 · ChipWhisperer

4. Vulnerability Assessment & Defensive Security
   Finding and prioritising weaknesses; understanding detection and hardening.
   chips: Vuln Assessment · Network Security · Cyber Defense · Risk Management

5. Security Automation & GRC                                      [optional 5th]
   Scripting security workflows; governance, risk, and compliance fundamentals.
   chips: Python · Bash · Security Automation · GRC · Compliance · Standards
```

Visual: card bg surface, border border-dim, title in display font, description in muted
Inter, chips as small mono pills. Hover → accent border. Same tokens as everything else.

──●──┬──●──

## 8. Peer-site ideas — ADOPT vs. AVOID

ADOPT (fit your brand + honest at your stage):
- Terminal status element, e.g. a `root@qu35t ~` prompt with a rotating status line
  ("analyzing firmware…", "hunting TTPs…"). Pure aesthetic, on-brand, low risk.
- The rotating role line in the hero (already planned) — Muthengia uses the same device.
- Focus-area capability cards (§7 above).
- Obfuscate any visible email (you're already on Netlify Forms, so prefer the form).

AVOID (honesty traps at early-career):
- Animated stat counters (Years of Experience / Vulnerabilities Discovered / Orgs
  Secured). You can't fill these honestly yet. If you ever want a stats row, use REAL
  counts only once non-zero: writeups published, labs completed, tools built, CVEs.
- A commercial "My Services" / "Ready to Secure Your Business?" CTA. You're not selling
  consultancy — use "Focus Areas" and an honest "Open to opportunities" framing instead.
- "9+ years of experience" tenure framing. Lead with trajectory and real lab work.

──●──┬──●──
◈ ──●── ◈ ──●── ◈
