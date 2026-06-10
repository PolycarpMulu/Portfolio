import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";

// Section order is finalized in STEP 10 (Hero → About → Skills → Projects →
// Experience → CTF → Writeups → Contact). Sections are added per-step until then.
export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
    </>
  );
}
