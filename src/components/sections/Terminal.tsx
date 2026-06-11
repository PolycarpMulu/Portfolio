"use client";

import { useEffect, useRef, useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { bio } from "@/data/bio";
import { focusAreas, skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";

type Line = { kind: "in" | "out" | "err"; text: string };

const PROMPT = "root@qu35t ~ $";

const BANNER = [
  `${bio.alias} // ${bio.handle} — interactive lab`,
  bio.roles.join(" · "),
  "Every tool below runs client-side; nothing is sent anywhere. Type 'help'.",
].join("\n");

const HELP = [
  "Commands:",
  "  help            this help",
  "  whoami          identity",
  "  about           bio",
  "  skills          focus areas + skill groups",
  "  projects        project list",
  "  experience      work / education / certs",
  "  contact         links",
  "  banner          show the banner",
  "  clear           clear the screen",
  "",
  "Security tools (100% local — nothing leaves your browser):",
  "  hash <text>     SHA-256 via Web Crypto",
  "  b64 enc <text>  Base64 encode (UTF-8)",
  "  b64 dec <text>  Base64 decode (UTF-8)",
  "  jwt <token>     decode JWT header + payload (does NOT verify the signature)",
].join("\n");

// --- local crypto helpers (no eval, no network → CSP-safe) ---
async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function b64encode(s: string): string {
  let bin = "";
  new TextEncoder().encode(s).forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin);
}
function b64decode(s: string): string {
  const bytes = Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
function b64urlToString(s: string): string {
  let t = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = t.length % 4;
  if (pad) t += "=".repeat(4 - pad);
  return b64decode(t);
}
function decodeJwt(token: string): string {
  const parts = token.split(".");
  if (parts.length < 2) throw new Error("not a JWT (expected header.payload.signature)");
  const header = JSON.parse(b64urlToString(parts[0]));
  const payload = JSON.parse(b64urlToString(parts[1]));
  return [
    "header:",
    JSON.stringify(header, null, 2),
    "",
    "payload:",
    JSON.stringify(payload, null, 2),
    "",
    "// signature NOT verified — this is a local decode only.",
  ].join("\n");
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(() => [{ kind: "out", text: BANNER }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);

  const push = (...ls: Line[]) => setLines((prev) => [...prev, ...ls]);

  async function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    push({ kind: "in", text: cmd });

    const parts = cmd.split(/\s+/);
    const name = parts[0].toLowerCase();
    const arg = cmd.slice(parts[0].length).trim();

    try {
      switch (name) {
        case "help":
          push({ kind: "out", text: HELP });
          break;
        case "clear":
          setLines([]);
          break;
        case "banner":
          push({ kind: "out", text: BANNER });
          break;
        case "whoami":
          push({
            kind: "out",
            text: `${bio.name} (${bio.alias} / ${bio.handle})\n${bio.roles.join(" · ")}\n${bio.location}`,
          });
          break;
        case "about":
          push({ kind: "out", text: bio.summary.join("\n\n") });
          break;
        case "skills":
          push({
            kind: "out",
            text:
              "Focus areas:\n" +
              focusAreas.map((f) => `  • ${f.title}`).join("\n") +
              "\n\nGroups:\n" +
              skillGroups.map((g) => `  ${g.name}: ${g.skills.join(", ")}`).join("\n"),
          });
          break;
        case "projects":
          push({
            kind: "out",
            text:
              projects.length === 0
                ? "(no public projects yet)"
                : projects
                    .map(
                      (p) =>
                        `  • ${p.title} — ${p.description}${p.repo ? `\n    ${p.repo}` : ""}`,
                    )
                    .join("\n"),
          });
          break;
        case "experience":
          push({
            kind: "out",
            text: experience
              .map((e) => `  • ${e.title} — ${e.org}${e.period ? ` (${e.period})` : ""}`)
              .join("\n"),
          });
          break;
        case "contact":
          push({
            kind: "out",
            text: [
              bio.social.github && `  github:   ${bio.social.github}`,
              bio.social.twitter && `  x:        ${bio.social.twitter}`,
              bio.social.linkedin && `  linkedin: ${bio.social.linkedin}`,
              bio.social.email && `  email:    ${bio.social.email}`,
            ]
              .filter(Boolean)
              .join("\n"),
          });
          break;
        case "hash":
          if (!arg) push({ kind: "err", text: "usage: hash <text>" });
          else push({ kind: "out", text: await sha256(arg) });
          break;
        case "b64": {
          const sub = (parts[1] || "").toLowerCase();
          const payload = cmd.slice(cmd.indexOf(parts[1] || "") + (parts[1] || "").length).trim();
          if (sub === "enc") push({ kind: "out", text: b64encode(payload) });
          else if (sub === "dec") push({ kind: "out", text: b64decode(payload) });
          else push({ kind: "err", text: "usage: b64 enc <text> | b64 dec <text>" });
          break;
        }
        case "jwt":
          if (!arg) push({ kind: "err", text: "usage: jwt <token>" });
          else push({ kind: "out", text: decodeJwt(arg) });
          break;
        default:
          push({ kind: "err", text: `command not found: ${name} — try 'help'` });
      }
    } catch (err) {
      push({ kind: "err", text: `error: ${err instanceof Error ? err.message : String(err)}` });
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input;
      if (cmd.trim()) setHistory((h) => [...h, cmd]);
      setHistIdx(-1);
      setInput("");
      void run(cmd);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const ni = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(ni);
      setInput(history[ni] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < 0) return;
      const ni = histIdx + 1;
      if (ni >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(ni);
        setInput(history[ni]);
      }
    }
  };

  return (
    <section id="terminal" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionLabel>{"// TERMINAL"}</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold text-fg sm:text-4xl">
          Interactive Terminal
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          A client-side lab. The security tools (SHA-256, Base64, JWT decode) run
          entirely in your browser via Web Crypto — nothing is sent anywhere. Type{" "}
          <code className="font-mono text-accent">help</code> to start.
        </p>

        <div
          onClick={() => inputRef.current?.focus()}
          className="mt-8 overflow-hidden border border-border-dim bg-surface/60"
        >
          <div className="flex items-center gap-2 border-b border-border-dim px-4 py-2">
            <span className="h-3 w-3 rounded-full bg-danger" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-muted" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-accent" aria-hidden="true" />
            <span className="ml-2 font-mono text-xs text-muted">root@qu35t — lab</span>
          </div>

          <div className="max-h-96 overflow-y-auto p-4 font-mono text-sm leading-relaxed">
            {lines.map((l, i) => (
              <div key={i} className="whitespace-pre-wrap break-words">
                {l.kind === "in" ? (
                  <>
                    <span className="text-accent">{PROMPT}</span>{" "}
                    <span className="text-fg">{l.text}</span>
                  </>
                ) : (
                  <span className={l.kind === "err" ? "text-danger" : "text-muted"}>
                    {l.text}
                  </span>
                )}
              </div>
            ))}

            <div className="mt-1 flex items-center gap-2">
              <span className="shrink-0 text-accent">{PROMPT}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-label="terminal input"
                className="flex-1 bg-transparent text-fg caret-accent outline-none"
              />
            </div>
            <div ref={endRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
