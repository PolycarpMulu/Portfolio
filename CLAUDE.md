@AGENTS.md

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

