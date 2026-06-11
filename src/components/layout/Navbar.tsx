"use client";

import { useState } from "react";
import { bio } from "@/data/bio";
import { ctf } from "@/data/ctf";
import { writeups } from "@/data/writeups";
import { useActiveSection } from "@/hooks/useActiveSection";

interface NavItem {
  id: string;
  label: string;
}

// Order matches page.tsx assembly. CTF + Writeups links self-hide when their
// data arrays are empty (§6 amendment 4).
function buildItems(): NavItem[] {
  const items: NavItem[] = [
    { id: "about", label: "about" },
    { id: "skills", label: "skills" },
    { id: "projects", label: "projects" },
    { id: "experience", label: "experience" },
    { id: "terminal", label: "terminal" },
  ];
  if (ctf.length > 0) items.push({ id: "ctf", label: "ctf" });
  if (writeups.length > 0) items.push({ id: "writeups", label: "writeups" });
  items.push({ id: "contact", label: "contact" });
  return items;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const items = buildItems();
  const active = useActiveSection(items.map((i) => i.id));

  const linkClass = (id: string) =>
    `font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:text-accent ${
      active === id ? "text-accent" : "text-muted"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border-dim bg-void/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a
          href="#"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          aria-label={`${bio.alias} — home`}
        >
          {/* Plain <img> by design: static export with images.unoptimized. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-display text-lg font-bold text-fg">
            {bio.alias}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden gap-8 md:flex">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={linkClass(item.id)}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle (pure Tailwind + React state, no component libs) */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="font-mono text-sm text-muted transition-colors hover:text-accent md:hidden"
        >
          {open ? "[ x ]" : "[ ≡ ]"}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="flex flex-col gap-4 border-t border-border-dim px-4 py-4 md:hidden">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={linkClass(item.id)}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
