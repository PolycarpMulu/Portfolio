import type { Experience } from "@/types";

// Professional Experience — minimal: title + "Org · Location" only (no dates, no
// bullets). Casing: "AfricaHackon" consistent site-wide; "Virtually Testing
// Foundation"; "The Book Bunk"; "The Technical University of Kenya".
export const experience: Experience[] = [
  // — Experience —
  {
    title: "Penetration Tester Intern",
    org: "Virtually Testing Foundation",
    location: "Remote",
    kind: "work",
  },
  {
    title: "Digital Life Associate",
    org: "The Book Bunk",
    location: "Nairobi, Kenya",
    kind: "work",
  },

  // — Education —
  {
    title: "Diploma in Computer Technology",
    org: "The Technical University of Kenya",
    location: "Nairobi, Kenya",
    kind: "education",
  },
  {
    title: "AH200 Cohort 4 — Cybersecurity Training",
    org: "AfricaHackon",
    location: "Nairobi, Kenya",
    kind: "education",
  },

  // — Certifications —
  {
    title: "Cyber Security Swara",
    org: "AfricaHackon",
    kind: "certification",
  },
];
