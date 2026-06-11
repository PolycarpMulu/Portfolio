# Portfolio Update — Corrections + Scripted Terminal
> Work order for Claude Code. Execute top to bottom, in order.

**Live site:** https://polycarpmulu.netlify.app/  ·  **Repo:** https://github.com/PolycarpMulu/Portfolio

**Working rules (read first):**
- After each change: `npm run build` + `npm run lint`, fix errors, append a dated entry to
  `docs/DEVLOG.md`, then `git add -A`, commit, and `git push origin main`.
- **CRITICAL — deploy verification:** if `git push` fails for ANY reason (auth/PAT included),
  STOP IMMEDIATELY and report the exact error. Do not continue. Several past changes never
  reached production, so nothing counts until it is confirmed on the LIVE URL above.
- Re-read the current source before assuming any item is already done.
- Stay within existing design tokens — no new colors, no hardcoded hex.

──●──┬──●──

## PART 1 — Five corrections (still NOT live)

**1. Remove the contact form.**
The Contact section still renders a full form (Name / Email / Subject / Message / Send
Message) plus a visible honeypot label "Do not fill this out:". Delete the form,
`src/lib/api.ts`, `public/__forms.html`, and all Netlify Forms wiring. Replace with a "Get in
touch" block: an obfuscated email (`polycarpmulu@gmail.com`) + GitHub / X / LinkedIn links.
Remove the "Prefer the form…" line. Keep the `#contact` anchor and existing styling.

**2. Remove dates from Experience.**
Remove "Oct 2021 – Dec 2021", "Apr 2022 – Jan 2025", "Ongoing", the "Preceded by Intern
(Oct 2021 – Mar 2022)" note, and the Education year range "2016 – 2021". Keep title + org +
description for each entry. Fix the stray leading "–" dash rendering before each description
bullet.

**3. Fix metadata.**
The meta description still says "Cybersecurity Engineer — Hardware · Binary · Crypto". Change
it to: `Exploring security through research, offensive testing, and continuous learning.`
Update the openGraph + twitter descriptions to match.

**4. Fix the credibility strip.**
It renders "AfricaHackon" then "●Hack The Box Kenya · ●AH200…" — the ● is prefixed to each
item. Put separators BETWEEN items only (no leading ● on any item, including the first).

**5. Add brand icons for GitHub, X, LinkedIn** in BOTH the Contact "Elsewhere" list and the
footer. Replace the text links with inline-SVG brand icons — use the REAL X glyph (not the old
Twitter bird), `currentColor` fill, accent (#00FF9C) on hover, an `aria-label` on each, open
in a new tab with `rel="noopener noreferrer"`. Icon + label in Contact; icon-only in the footer.

──●──┬──●──

## PART 2 — Scripted terminal (replaces the interactive terminal)

Build a React client component (`"use client"`), `ScriptedTerminal`, in the existing terminal
aesthetic (bordered chip, mono, `root@qu35t` prompt). It auto-types a workflow line by line,
auto-scrolls to the newest line, and loops.

- **This is now the site's ONLY terminal.** If a type-your-own interactive terminal (the
  `hash` / `b64` / `jwt` commands) exists in the source or was planned, REMOVE it and use this
  instead. Replace the static `root@qu35t ~$` hero cursor with this scripted terminal in the
  hero area. Leave any security-headers / `security.txt` work untouched — only the terminal is
  being swapped.
- Cycle through TWO scenes: play Scene A fully → ~3s pause → Scene B fully → ~3s pause → loop.
- Line "classes" map to tokens: `prompt`/`ok` = accent #00FF9C, `warn` = amber,
  `err`/`high` = danger #FF4B6E, `dim` = muted. No new colors.

### Scene A — Hardware / Binary / RE
```
$ binwalk -e firmware_dump.bin                          [prompt]
[*] Scanning for embedded filesystems...                [dim]
[+] SquashFS @ 0x1A0000 · uImage @ 0x40                  [ok]
$ openocd -f interface/jlink.cfg -f target/swd.cfg      [prompt]
[+] SWD link up · halting core · dumping flash          [ok]
$ ghidra-analyzeHeadless . cxd -import fw.elf           [prompt]
[+] 14,902 functions recovered · decompiling...         [ok]
$ yara-scan ./samples/ -r rules/cxd_loader.yar          [prompt]
[!] HIT: sample_3e9c.bin → Rule: Generic_Loader         [err]
```

### Scene B — Red Team
```
$ responder -I eth0 -wrf                                [prompt]
[+] Captured NetNTLMv2 · user: ACME\jdoe                 [warn]
$ crackmapexec smb 10.10.10.0/24 -u jdoe -H <hash>      [prompt]
[+] 10.10.10.15 · Pwn3d! · local admin                  [err]
$ bloodhound-python -d acme.local -c All                [prompt]
[+] 1,204 nodes · path to Domain Admin found            [high]
$ sliver > generate --mtls --os windows                 [prompt]
[+] implant beacon active · session opened              [ok]
$ kerbrute userenum -d acme.local users.txt             [prompt]
[+] 38 valid accounts · 3 AS-REP roastable              [warn]
```

### Shared closer (end of each full loop)
```
$ whoami                                                [prompt]
qu35t — Researcher · Engineer · Pentester · Red Team    [high]
```

> Note: the scenes are illustrative, with deliberately fictional lab targets (ACME\jdoe,
> 10.10.10.x, acme.local). All tools shown are from the real toolkit — leave them, but the
> targets/output stay generic. Do not present any of it as a real engagement.

### Requirements
- `prefers-reduced-motion`: render ALL lines statically — no typing, no loop.
- Pause the loop when the component is off-screen (IntersectionObserver).
- Clean up ALL timers/intervals on unmount (no leaks).
- Treat the terminal as decorative: `aria-hidden` (or provide a concise text alternative);
  do not trap keyboard focus.
- Do NOT add animated stat counters (Years / Vulnerabilities / etc.).

──●──┬──●──

## FINISH
Push, wait for Netlify to rebuild, then FETCH the live URL and report exactly what the live
site shows for all five corrections AND the terminal. If the live site does not reflect the
changes after the rebuild, say so explicitly — do not report success from local state alone.

◈ ──●── ◈ ──●── ◈
