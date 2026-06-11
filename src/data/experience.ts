import type { Experience } from "@/types";

// Security-relevant experience, education, certifications (PORTFOLIO_CONTENT §3–§4),
// in the documented order. Curation rule: excludes the 2014 cashier / 2015 accounts
// intern roles. Also omits the two items the source marks OPTIONAL + non-security
// (Jays Pyrotechnics software dev; Mount Kenya University business degree).
// Dates intentionally omitted — entries show title + org + description only.
export const experience: Experience[] = [
  // — Experience —
  {
    title: "Cyber Security Engineer",
    org: "AfricaHackon",
    period: "",
    kind: "work",
    points: [
      "Cybersecurity engineering and knowledge-sharing within East Africa's premier hacking community.",
    ],
  },
  {
    title: "Penetration Tester Intern",
    org: "Virtually Testing Foundation",
    period: "",
    kind: "work",
    points: ["Hands-on penetration testing across web and network targets."],
  },
  {
    title: "Digital Life Associate",
    org: "The Book Bunk",
    period: "",
    kind: "work",
    points: [
      "Digital systems and technology work supporting public library restoration.",
    ],
  },

  // — Education —
  {
    title: "Computer Technology / Computer Systems Technology",
    org: "The Technical University of Kenya",
    period: "",
    kind: "education",
  },
  {
    title: "Cyber Security Engineer (Training)",
    org: "AfricaHackon",
    period: "",
    kind: "education",
  },

  // — Certifications —
  {
    title: "AfricaHackOn Cyber Security Swara",
    org: "AfricaHackon",
    period: "",
    kind: "certification",
  },
];
