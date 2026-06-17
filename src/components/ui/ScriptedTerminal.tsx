"use client";

import { useEffect, useRef, useState } from "react";

// Decorative, auto-typing terminal that loops through two illustrative scenes + a
// closer. Targets are deliberately fictional (ACME\jdoe, 10.10.10.x, acme.local);
// tools are real. Not a real engagement. aria-hidden (decorative, no focus trap).

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

interface Scene {
  label: string;
  lines: Line[];
}
const SCENES: Scene[] = [
  { label: "hardware · re", lines: SCENE_A },
  { label: "red team", lines: SCENE_B },
  { label: "whoami", lines: CLOSER },
];
const ALL_STATIC: Line[] = [...SCENE_A, ...SCENE_B, ...CLOSER];

const COLOR: Record<Cls, string> = {
  prompt: "text-accent",
  ok: "text-accent",
  warn: "text-warn",
  err: "text-danger",
  high: "text-danger",
  dim: "text-muted",
};

export default function ScriptedTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [label, setLabel] = useState(SCENES[0].label);
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Keep the newest line in view (instant).
  useEffect(() => {
    const box = boxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      const id = setTimeout(() => {
        setLabel("log");
        setLines(ALL_STATIC);
      }, 0);
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
        for (const scene of SCENES) {
          if (cancelled) return;
          await waitVisible();
          if (cancelled) return;
          setLabel(scene.label);
          for (const line of scene.lines) {
            if (cancelled) return;
            await waitVisible();
            if (cancelled) return;
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
            await sleep(line.text.startsWith("$") ? 260 : 340);
          }
          await sleep(3000);
        }
        setLines([]); // per-loop clear so lines never accumulate
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
      className="w-full max-w-xl overflow-hidden rounded-xl border border-accent/30 bg-surface/60 shadow-[0_0_40px_rgba(0,255,156,0.08),0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-[8px] transition-shadow duration-300 hover:border-accent hover:shadow-[0_0_30px_-6px_var(--color-accent)]"
    >
      <div className="flex items-center gap-2 border-b border-accent/20 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28ca41]" />
        <span className="ml-2 font-mono text-xs text-muted">root@qu35t ~</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted/70">
          {label}
        </span>
      </div>
      <div
        ref={boxRef}
        className="h-44 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:h-56 sm:text-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {lines.map((l, i) => (
          <div key={i} className={`whitespace-pre-wrap break-words ${COLOR[l.cls]}`}>
            {l.text || " "}
          </div>
        ))}
      </div>
    </div>
  );
}
