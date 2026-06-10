import CircuitBackground from "@/components/ui/CircuitBackground";
import TerminalText from "@/components/ui/TerminalText";
import { bio } from "@/data/bio";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center overflow-hidden"
    >
      <CircuitBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
        <p className="mb-6 text-sm">
          <TerminalText text="whoami" prompt="> " speed={75} />
        </p>

        <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-6xl lg:text-7xl">
          {bio.name} <span className="text-accent">/ {bio.alias}</span>
        </h1>

        <p className="mt-4 font-display text-xl text-muted sm:text-2xl">
          {bio.role}
        </p>

        <div className="mt-6 min-h-[1.75rem] text-base text-fg sm:text-lg">
          <TerminalText
            text={bio.tagline}
            prompt="$ "
            speed={40}
            startDelay={700}
          />
        </div>

        <ul className="mt-8 flex flex-wrap gap-3">
          {bio.focus.map((f) => (
            <li
              key={f}
              className="border border-border-dim bg-surface px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-muted"
            >
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
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
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted">
        <span className="inline-block animate-bounce">▼</span>
      </div>
    </section>
  );
}
