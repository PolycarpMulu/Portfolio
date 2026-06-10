// Content model types for the portfolio.
// All site content lives in src/data/*.ts and is typed against these shapes.
// Shapes inferred from how BUILD_SPEC §5/§6 components consume the data
// (the v1 §4A–4E prompts were not available); adjust fields as real data lands.

/** Outbound profile/contact links. Empty string = not set yet (rendered links self-hide). */
export interface SocialLinks {
  github: string;
  twitter: string; // X
  linkedin: string;
  email: string;
}

/** Identity + about content. Single source for hero, about, footer, contact, metadata. */
export interface Bio {
  /** Real name, e.g. "Polycarp" */
  name: string;
  /** Primary handle / wordmark, e.g. "C1rcu1t⤬" */
  alias: string;
  /** Secondary handle, e.g. "qu35t" */
  handle: string;
  /** Role line, e.g. "Cybersecurity Engineer" */
  role: string;
  /** Focus areas, e.g. ["Hardware", "Binary", "Crypto"] */
  focus: string[];
  /** Location, e.g. "Nairobi, Kenya" */
  location: string;
  /** Short one-liner used in hero + page metadata description */
  tagline: string;
  /** Longer About paragraph (markdown-free plain text) */
  summary: string;
  social: SocialLinks;
}

/** A portfolio project (rendered by ProjectCard, §5F). */
export interface Project {
  title: string;
  /** url-safe id, unique per project */
  slug: string;
  description: string;
  /** tech/stack tags shown on the card */
  tags: string[];
  /** domain grouping, e.g. "Hardware" | "Binary" | "Crypto" | "Web" */
  category?: string;
  /** source repository URL */
  repo?: string;
  /** live demo / external URL */
  demo?: string;
  /** highlight on the grid */
  featured?: boolean;
  /** completion year */
  year?: number;
}

/** A single skill data point for the Recharts chart (§5E). */
export interface Skill {
  /** axis label / chart subject */
  name: string;
  /** proficiency 0–100 */
  level: number;
  /** optional grouping, e.g. "Hardware" | "Binary" | "Crypto" */
  category?: string;
}

/** A CTF result. Section self-hides when the array is empty (§5G). */
export interface CTF {
  /** event name */
  name: string;
  team?: string;
  /** ISO date or year string */
  date: string;
  /** placement, e.g. "1st / 240" */
  placement?: string;
  /** challenge categories solved */
  categories?: string[];
  /** CTFtime / event / writeup URL */
  url?: string;
  notes?: string;
}

/** A technical writeup / blog post. Section self-hides when empty (§5H). */
export interface Writeup {
  title: string;
  /** url-safe id, unique per writeup */
  slug: string;
  /** ISO date */
  date: string;
  summary: string;
  tags: string[];
  /** external URL to the full post */
  url: string;
  category?: string;
}
