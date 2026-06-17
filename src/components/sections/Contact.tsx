"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import { GitHubIcon, XIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { bio } from "@/data/bio";

// Email is obfuscated: the display string never contains a scrapeable address, and
// the mailto is assembled only at click time (not present in the static HTML).
const [EMAIL_USER, EMAIL_DOMAIN] = bio.social.email.split("@");
const EMAIL_DISPLAY = `${EMAIL_USER} [at] ${EMAIL_DOMAIN.replace(".", " [dot] ")}`;

const socials = [
  { label: "GitHub", href: bio.social.github, Icon: GitHubIcon },
  { label: "X", href: bio.social.twitter, Icon: XIcon },
  { label: "LinkedIn", href: bio.social.linkedin, Icon: LinkedInIcon },
].filter((s) => s.href !== "");

export default function Contact() {
  const emailMe = () => {
    window.location.href = `mailto:${EMAIL_USER}@${EMAIL_DOMAIN}`;
  };

  return (
    <section id="contact" className="section-bg-cyber py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionLabel>{"// CONTACT"}</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold text-fg sm:text-4xl">
          Get in touch
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Open to opportunities, research collaboration, and security conversation.
        </p>

        <div className="mt-10 space-y-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Email
            </p>
            <button
              type="button"
              onClick={emailMe}
              aria-label={`Email ${bio.name}`}
              className="mt-2 font-mono text-sm text-fg transition-colors hover:text-accent"
            >
              {EMAIL_DISPLAY}
            </button>
          </div>

          {socials.length > 0 && (
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Elsewhere
              </p>
              <ul className="mt-3 flex flex-col gap-4 sm:flex-row sm:gap-8">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
