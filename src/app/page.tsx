import Hero from "@/components/sections/Hero";
import CredibilityStrip from "@/components/ui/CredibilityStrip";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

// Section order is finalized in STEP 10 (Hero → About → Skills → Projects →
// Experience → CTF → Writeups → Contact). Sections are added per-step until then.
export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
