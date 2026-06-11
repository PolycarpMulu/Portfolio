"use client";

import { useEffect, useRef, useState } from "react";

// Decorative, auto-typing terminal that loops through two illustrative scenes.
// Targets are deliberately fictional (ACME\jdoe, 10.10.10.x, acme.local); the tools
// are real. Not a real engagement. Marked aria-hidden (decorative, no focus trap).

type Cls = "prompt" | "ok" | "warn" | "err" | "high" | "dim";
interface Line {
  text: string;
  cls: Cls;
}

const SCENE_A: Line[] = [
  { text: "$ binwalk -e firmware_dump.bin", cls: "prompt" },
  { text: "[*] Scanning for embedded filesystems...", cls: "dim" },
  { text: "[+] SquashFS @ 0x1A0000 · uImage @ 0x40", cls: "ok" },
  { text: "$ openocd -f interface/jlink.cfg -f target/swd.cfg", cls: "prompt" },
  { text: "[+] SWD link up · halting core · dumping flash", cls: "ok" },
  { text: "$ ghidra-analyzeHeadless . cxd -import fw.elf", cls: "prompt" },
  { text: "[+] 14,902 functions recovered · decompiling...", cls: "ok" },
  { text: "$ yara-scan ./samples/ -r rules/cxd_loader.yar", cls: "prompt" },
  { text: "[!] HIT: sample_3e9c.bin → Rule: Generic_Loader", cls: "err" },
];

const SCENE_B: Line[] = [
  { text: "$ responder -I eth0 -wrf", cls: "prompt" },
  { text: "[+] Captured NetNTLMv2 · user: ACME\\jdoe", cls: "warn" },
  { text: "$ crackmapexec smb 10.10.10.0/24 -u jdoe -H <hash>", cls: "prompt" },
  { text: "[+] 10.10.10.15 · Pwn3d! · local admin", cls: "err" },
  { text: "$ bloodhound-python -d acme.local -c All", cls: "prompt" },
  { text: "[+] 1,204 nodes · path to Domain Admin found", cls: "high" },
  { text: "$ sliver > generate --mtls --os windows", cls: "prompt" },
  { text: "[+] implant beacon active · session opened", cls: "ok" },
  { text: "$ kerbrute userenum -d acme.local users.txt", cls: "prompt" },
  { text: "[+] 38 valid accounts · 3 AS-REP roastable", cls: "warn" },
];

const CLOSER: Line[] = [
  { text: "$ whoami", cls: "prompt" },
  { text: "qu35t — Researcher · Engineer · Pentester · Red Team", cls: "high" },
];

const COLOR: Record<Cls, string> = {
  prompt: "text-accent",
  ok: "text-accent",
  warn: "text-warn",
  err: "text-danger",
  high: "text-danger",
  dim: "text-muted",
};

type Action =
  | { type: "line"; line: Line }
  | { type: "pause"; ms: number }
  | { type: "clear" };

const SEQUENCE: Action[] = [
  ...SCENE_A.map((line): Action => ({ type: "line", line })),
  { type: "pause", ms: 3000 },
  ...SCENE_B.map((line): Action => ({ type: "line", line })),
  { type: "pause", ms: 3000 },
  ...CLOSER.map((line): Action => ({ type: "line", line })),
  { type: "pause", ms: 3000 },
  { type: "clear" },
];

const ALL_STATIC: Line[] = [...SCENE_A, ...SCENE_B, ...CLOSER];

export default function ScriptedTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Keep the newest line in view (instant; no smooth scroll).
  useEffect(() => {
    const box = boxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Render every line statically — no typing, no loop.
      const id = setTimeout(() => setLines(ALL_STATIC), 0);
      return () => clearTimeout(id);
    }

    let cancelled = false;
    let visible = true;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(() => {
          timers.delete(t);
          resolve();
        }, ms);
        timers.add(t);
      });
    const waitVisible = async () => {
      while (!cancelled && !visible) await sleep(150);
    };

    const root = rootRef.current;
    const observer = root
      ? new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
          },
          { threshold: 0.05 },
        )
      : null;
    if (root && observer) observer.observe(root);

    const run = async () => {
      while (!cancelled) {
        for (const action of SEQUENCE) {
          if (cancelled) return;
          await waitVisible();
          if (cancelled) return;

          if (action.type === "clear") {
            setLines([]);
          } else if (action.type === "pause") {
            await sleep(action.ms);
          } else {
            const { line } = action;
            setLines((prev) => [...prev, { text: "", cls: line.cls }]);
            for (let i = 1; i <= line.text.length; i++) {
              if (cancelled) return;
              await waitVisible();
              if (cancelled) return;
              setLines((prev) => {
                const copy = prev.slice();
                copy[copy.length - 1] = { text: line.text.slice(0, i), cls: line.cls };
                return copy;
              });
              await sleep(16);
            }
            await sleep(line.text.startsWith("$") ? 280 : 360);
          }
        }
      }
    };
    void run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      if (root && observer) observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="max-w-xl overflow-hidden border border-border-dim bg-surface/60"
    >
      <div className="flex items-center gap-2 border-b border-border-dim px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-danger" />
        <span className="h-3 w-3 rounded-full bg-warn" />
        <span className="h-3 w-3 rounded-full bg-accent" />
        <span className="ml-2 font-mono text-xs text-muted">root@qu35t — lab</span>
      </div>
      <div
        ref={boxRef}
        className="h-52 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:text-sm"
      >
        {lines.map((l, i) => (
          <div key={i} className={`whitespace-pre-wrap break-words ${COLOR[l.cls]}`}>
            {l.text || " "}
          </div>
        ))}
      </div>
    </div>
  );
}
