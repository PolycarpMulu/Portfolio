import CircuitBackground from "@/components/ui/CircuitBackground";
import SectionLabel from "@/components/ui/SectionLabel";
import RotatingRoles from "@/components/ui/RotatingRoles";
import ScriptedTerminal from "@/components/ui/ScriptedTerminal";
import { GitHubIcon, XIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { bio } from "@/data/bio";

const socials = [
  { label: "GitHub", href: bio.social.github, Icon: GitHubIcon },
  { label: "X", href: bio.social.twitter, Icon: XIcon },
  { label: "LinkedIn", href: bio.social.linkedin, Icon: LinkedInIcon },
].filter((s) => s.href !== "");

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden"
    >
      <CircuitBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center md:gap-12">
        {/* Left — text stack */}
        <div>
          <SectionLabel>{"// INITIALIZING"}</SectionLabel>

          <h2 className="mt-5 font-display text-xl font-medium text-fg sm:text-2xl">
            {bio.name} <span className="text-accent">/ {bio.alias}</span>
          </h2>

          <h1 className="mt-3 text-balance font-display text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl lg:text-5xl">
            {bio.headline}
          </h1>

          <p className="mt-5 text-base sm:text-lg">
            <RotatingRoles words={bio.roles} />
          </p>

          <p className="mt-4 max-w-xl font-mono text-sm text-muted">
            {bio.subline}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-accent px-6 py-3 font-display text-sm font-bold text-void transition-opacity hover:opacity-90"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="border border-accent px-6 py-3 font-display text-sm font-bold text-accent transition-colors hover:bg-accent hover:text-void"
            >
              Contact
            </a>
          </div>

          {socials.length > 0 && (
            <ul className="mt-8 flex gap-5">
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

        {/* Right — scripted terminal, vertically centred */}
        <div className="w-full md:justify-self-end">
          <ScriptedTerminal />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted">
        <span className="inline-block animate-bounce">▼</span>
      </div>
    </section>
  );
}
