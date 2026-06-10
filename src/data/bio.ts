import type { Bio } from "@/types";

// Real content from docs/PORTFOLIO_CONTENT.md §1 (FINAL — used verbatim).
export const bio: Bio = {
  name: "Polycarp Mulu",
  alias: "C1rcu1t⤬",
  handle: "qu35t",
  location: "Nairobi, Kenya",
  email: "polycarpmulu@gmail.com",

  headline:
    "Securing Systems Through Research, Engineering, and Offensive Security",
  roles: [
    "Cybersecurity Researcher",
    "Cybersecurity Engineer",
    "Penetration Tester",
    "Red Team Engineer",
  ],
  subline:
    "Exploring security through research, offensive testing, and continuous learning.",

  summary: [
    "I am a Cybersecurity Researcher, Cybersecurity Engineer, Penetration Tester, and Red Team Engineer focused on understanding how systems can be secured through research, analysis, and practical security testing.",
    "My work combines offensive and defensive security principles, with an emphasis on continuous learning, hands-on experimentation, and the development of real-world technical skills. I am passionate about exploring modern security challenges, analyzing threats, and improving the resilience of digital systems.",
    "This portfolio documents my cybersecurity journey, research, technical write-ups, labs, and professional development as I continue building expertise across multiple areas of cybersecurity.",
  ],

  affiliations: ["AfricaHackon", "Hack The Box Kenya"],
  currentFocus: "AH200 Cohort 4 · CXD-1 Hardware Platform · HSC CyberLab",
  credibility: [
    "AfricaHackon",
    "Hack The Box Kenya",
    "AH200 Cohort 4",
    "HSC CyberLab",
    "Nairobi, Kenya",
  ],

  social: {
    github: "https://github.com/PolycarpMulu",
    twitter: "https://x.com/C1rcu1tX",
    linkedin: "https://www.linkedin.com/in/polycarpmulu/",
    email: "polycarpmulu@gmail.com",
  },

  // Transitional (layout metadata reads this until STEP 9, then moves to `subline`).
  tagline:
    "Exploring security through research, offensive testing, and continuous learning.",
};
