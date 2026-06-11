import CircuitBackground from "@/components/ui/CircuitBackground";
import SectionLabel from "@/components/ui/SectionLabel";
import RotatingRoles from "@/components/ui/RotatingRoles";
import ScriptedTerminal from "@/components/ui/ScriptedTerminal";
import { bio } from "@/data/bio";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden"
    >
      <CircuitBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20">
        <SectionLabel>{"// INITIALIZING"}</SectionLabel>

        <h2 className="mt-5 font-display text-2xl font-medium text-fg sm:text-3xl">
          {bio.name} <span className="text-accent">/ {bio.alias}</span>
        </h2>

        <h1 className="mt-3 max-w-4xl text-balance font-display text-3xl font-bold leading-tight tracking-tight text-fg sm:text-5xl lg:text-6xl">
          {bio.headline}
        </h1>

        <p className="mt-6 text-base sm:text-lg">
          <RotatingRoles words={bio.roles} />
        </p>

        <p className="mt-4 max-w-2xl font-mono text-sm text-muted sm:text-base">
          {bio.subline}
        </p>

        <div className="mt-8">
          <ScriptedTerminal />
        </div>

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
