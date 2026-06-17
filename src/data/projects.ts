import type { Project } from "@/types";

// Real projects (docs/PORTFOLIO_MASTER_WORKORDER.md PART 2).
//
// TODO(links): the Africahackon_Cohort-IV- repo + per-project subfolders, and the
// Student-Allocation repo, are private / 404 right now, so every card links to the
// GitHub profile as a safe placeholder. Once public, repoint cards 1–6 to their real
// subfolders and #7 to https://github.com/PolycarpMulu/Student-Allocation.
const GH = "https://github.com/PolycarpMulu";

export const projects: Project[] = [
  {
    title: "Beetlebug Android CTF",
    slug: "beetlebug-android-ctf",
    description:
      "Mobile app penetration test across ~10 vulnerability classes — hardcoded secrets, insecure storage, WebView abuse, SQLi, Firebase misconfig, exported components, logging leaks, clipboard, biometric/deeplink bypass, and binary patching.",
    tags: ["Mobile Security", "RE", "JADX", "ADB", "APKTool"],
    category: "Mobile · CTF",
    status: "Team · Squad 1",
    repo: GH,
  },
  {
    title: "Network Forensics & IDS",
    slug: "network-forensics-ids",
    description:
      "Keylogger PCAP forensics in Wireshark plus Snort detection rules (ICMP exfiltration, Nmap SYN scans).",
    tags: ["Network Security", "DFIR", "Wireshark", "Snort"],
    category: "Network · DFIR",
    repo: GH,
  },
  {
    title: "Base64 Password Encoder",
    slug: "base64-password-encoder",
    description:
      "Portable Bash password-encoding tool with base64 / openssl / python3 fallbacks and robust error handling.",
    tags: ["Tooling", "Automation", "Bash"],
    category: "Tooling",
    status: "Solo",
    repo: GH,
  },
  {
    title: `"The Gentlemen" Ransomware — Threat Assessment & Detection Engineering`,
    slug: "gentlemen-ransomware-detection",
    description:
      "Full detection stack for 'The Gentlemen' ransomware — Sysmon, Velociraptor VQL, Suricata, Splunk, and Sigma rules mapped to MITRE ATT&CK with an F3EAD workflow.",
    tags: ["Threat Intel", "Detection Eng", "Blue Team"],
    category: "Detection Eng",
    status: "Team",
    repo: GH,
  },
  {
    title: "crAPI — API Security Assessment",
    slug: "crapi-api-security",
    description:
      "OWASP API Security Top 10 assessment of crAPI (BOLA, broken auth, mass assignment, SSRF, JWT forgery) — CRITICAL risk posture.",
    tags: ["API Security", "Web", "Burp Suite"],
    category: "API Security",
    status: "Solo",
    repo: GH,
  },
  {
    title: "Vulnerable Bank — Web & API Pentest",
    slug: "vulnerable-bank-pentest",
    description:
      "Web + API penetration test of a vulnerable bank — SQLi, weak OTP, insecure JWT / privilege escalation, mass assignment, file upload, and business-logic abuse leading to full account/admin compromise.",
    tags: ["Web Security", "API", "Burp", "SQLMap"],
    category: "Web · API",
    status: "Team · Squad 1",
    repo: GH,
  },
  {
    title: "Student-Allocation",
    slug: "student-allocation",
    description:
      "Secure Flask / Next.js academic workflow platform — JWT authentication, RBAC, audit logging, document management, and project-supervision automation.",
    tags: ["Software Development", "Flask", "Next.js", "JWT", "RBAC"],
    category: "Software Dev",
    repo: GH,
  },
];
