import Hero from "@/components/sections/Hero";
import CredibilityStrip from "@/components/ui/CredibilityStrip";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import CTFAchievements from "@/components/sections/CTFAchievements";
import Writeups from "@/components/sections/Writeups";
import Contact from "@/components/sections/Contact";

// Final single-page assembly (BUILD_SPEC §5J, amended order with Experience).
// CTF + Writeups self-hide while their data arrays are empty.
export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <CTFAchievements />
      <Writeups />
      <Contact />
    </>
  );
}
