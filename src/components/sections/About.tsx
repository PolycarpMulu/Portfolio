import SectionLabel from "@/components/ui/SectionLabel";
import { bio } from "@/data/bio";

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionLabel>{"// ABOUT"}</SectionLabel>

        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-14">
          <div className="max-w-2xl">
            {bio.summary.map((paragraph, i) => (
              <p
                key={i}
                className="mt-4 text-base leading-relaxed text-muted first:mt-0"
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                Current Focus
              </p>
              <p className="mt-2 font-mono text-sm text-accent">
                {bio.currentFocus}
              </p>
            </div>
          </div>

          <div className="md:pt-1">
            {/* Plain <img> by design: static export with images.unoptimized — the
                next/image optimizer adds no value here. Reduced-motion safe: the hover
                glow is a transition, neutralized by the global media query. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/portrait.jpg"
              alt={`${bio.name} — portrait`}
              width={1200}
              height={800}
              loading="lazy"
              className="w-full max-w-sm rounded-lg border border-border-dim transition-shadow duration-300 hover:border-accent hover:shadow-[0_0_30px_-6px_var(--color-accent)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
