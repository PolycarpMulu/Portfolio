import type { FocusArea, SkillGroup } from "@/types";

// Focus Areas — primary Skills presentation (docs/PORTFOLIO_CONTENT.md §7).
// Framed as areas of practice/study (not paid services). Edit freely.
export const focusAreas: FocusArea[] = [
  {
    title: "Penetration Testing & Red Teaming",
    description:
      "Offensive assessment of web, network, and mobile targets; building practical exploitation and red-team skills.",
    chips: ["Web", "Network", "Mobile", "OWASP", "Burp Suite", "ffuf", "nuclei"],
  },
  {
    title: "Malware Analysis & Threat Intelligence",
    description:
      "Static and behavioural malware analysis; tracking adversary TTPs and writing CTI notes.",
    chips: ["YARA", "Capa", "FLOSS", "Volatility3", "OSINT", "MITRE ATT&CK"],
  },
  {
    title: "Hardware & Firmware Security",
    description:
      "Reverse engineering embedded devices and firmware; building the CXD-1 research platform.",
    chips: ["Ghidra", "OpenOCD", "JTAG/SWD", "binwalk", "ESP32-S3", "ChipWhisperer"],
  },
  {
    title: "Vulnerability Assessment & Defensive Security",
    description:
      "Finding and prioritising weaknesses; understanding detection and hardening.",
    chips: [
      "Vuln Assessment",
      "Network Security",
      "Cyber Defense",
      "Risk Management",
    ],
  },
  {
    title: "Security Automation & GRC",
    description:
      "Scripting security workflows; governance, risk, and compliance fundamentals.",
    chips: ["Python", "Bash", "Security Automation", "GRC", "Compliance", "Standards"],
  },
];

// Professional skills — the canonical 18, grouped by domain (§2).
export const skillGroups: SkillGroup[] = [
  {
    name: "Offensive",
    skills: [
      "Penetration Testing",
      "Vulnerability Assessment",
      "Web Application Security",
      "Mobile Application Security",
      "OSINT",
    ],
  },
  {
    name: "Defensive",
    skills: [
      "Cyber Defense",
      "Network Security",
      "Malware Analysis",
      "Threat Intelligence",
      "Cybersecurity",
    ],
  },
  {
    name: "Automation",
    skills: ["Cybersecurity Automation", "Security Automation"],
  },
  {
    name: "GRC",
    skills: [
      "Governance",
      "GRC",
      "Risk Management",
      "Cybersecurity Compliance",
      "Cybersecurity Standards",
    ],
  },
  {
    name: "Cloud",
    skills: ["Cloud Security"],
  },
];
