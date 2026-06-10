import type { Project } from "@/types";

// Real projects. Source: docs/PORTFOLIO_CONTENT.md §5.
//
// NOTE: §5 also lists five lab projects by name only — CXD-1, HSC Lab
// Infrastructure, Web App Pentest Suite, Malware Analyst Isolated User,
// AH200 Lab Setup — deferring to "BUILD_SPEC §4C" for their descriptions/tags.
// Those §4C details are NOT present in this repo (v1 doc), so they are intentionally
// omitted here rather than fabricated. To be added in STEP 7 once real copy is supplied.
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
