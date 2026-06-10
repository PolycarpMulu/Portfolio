import type { Project } from "@/types";

// Real projects. Source: docs/PORTFOLIO_CONTENT.md §5.
//
// NOTE: §5 also lists five lab projects by name only — CXD-1, HSC Lab
// Infrastructure, Web App Pentest Suite, Malware Analyst Isolated User,
// AH200 Lab Setup. Their descriptions/tags live in "BUILD_SPEC §4C" (a v1 doc not
// present in this repo). DECISION (STEP 5 review): exclude the five rather than
// fabricate copy — ship Projects with the real portfolio entry only for now.
export const projects: Project[] = [
  {
    title: "C1rcu1t⤬ Portfolio",
    slug: "circuit-portfolio",
    description:
      "Static Next.js + Tailwind v4 portfolio, built milestone-by-milestone with a full development log (docs/DEVLOG.md).",
    tags: ["nextjs", "tailwind", "netlify"],
    category: "Web · Scripting",
    status: "active",
    repo: "https://github.com/PolycarpMulu/Portfolio",
    year: 2026,
  },
];
