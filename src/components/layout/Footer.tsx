import { bio } from "@/data/bio";
import { GitHubIcon, XIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

export default function Footer() {
  // Baked at build time (static export).
  const year = new Date().getFullYear();

  // Only render links that have a real value (empty placeholders self-hide).
  const socials = [
    { label: "GitHub", href: bio.social.github, Icon: GitHubIcon },
    { label: "X", href: bio.social.twitter, Icon: XIcon },
    { label: "LinkedIn", href: bio.social.linkedin, Icon: LinkedInIcon },
  ].filter((s) => s.href !== "");

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

        {socials.length > 0 && (
          <ul className="flex gap-5">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted transition-colors hover:text-accent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
