import { bio } from "@/data/bio";

interface FooterLink {
  label: string;
  href: string;
}

export default function Footer() {
  // Baked at build time (static export).
  const year = new Date().getFullYear();

  // Only render links that have a real value (empty placeholders self-hide).
  const links: FooterLink[] = [
    { label: "GitHub", href: bio.social.github },
    { label: "X", href: bio.social.twitter },
    { label: "LinkedIn", href: bio.social.linkedin },
    {
      label: "Email",
      href: bio.social.email ? `mailto:${bio.social.email}` : "",
    },
  ].filter((l) => l.href !== "");

  return (
    <footer className="border-t border-border-dim">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo.png" alt="" width={24} height={24} className="h-6 w-6" />
            <p className="font-display text-sm font-bold text-fg">{bio.alias}</p>
          </div>
          <p className="mt-1 font-mono text-xs text-muted">
            {bio.name} · {bio.location} · © {year}
          </p>
          <p className="mt-1 font-mono text-xs text-muted/70">
            Hardened: CSP · security headers · security.txt
          </p>
        </div>

        {links.length > 0 && (
          <ul className="flex gap-6">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
