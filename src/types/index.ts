// Content model types for the portfolio.
// All site content lives in src/data/*.ts and is typed against these shapes.

/** Outbound profile/contact links. Empty string = not set (rendered links self-hide). */
export interface SocialLinks {
  github: string;
  twitter: string; // X
  linkedin: string;
  email: string;
}

/** Identity + about content. Single source for hero, about, footer, contact, metadata. */
export interface Bio {
  /** Real name, e.g. "Polycarp Mulu" */
  name: string;
  /** Primary handle / wordmark, e.g. "C1rcu1t⤬" */
  alias: string;
  /** Secondary handle, e.g. "qu35t" */
  handle: string;
  /** Location, e.g. "Nairobi, Kenya" */
  location: string;
  /** Public contact email */
  email: string;
  /** Hero main statement (display font) */
  headline: string;
  /** Rotating hero role line (typed/cycled) */
  roles: string[];
  /** Hero subline + page metadata description */
  subline: string;
  /** About section bio — one entry per paragraph */
  summary: string[];
  /** Community / lab affiliations */
  affiliations: string[];
  /** Current focus line, e.g. "AH200 Cohort 4 · CXD-1 ..." */
  currentFocus: string;
  /** Credibility strip items (joined by ● nodes in the UI) */
  credibility: string[];
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
  /** domain grouping, e.g. "Hardware" | "Binary" | "Web · Scripting" */
  category?: string;
  /** lifecycle, e.g. "active" | "archived" */
  status?: string;
  /** source repository URL */
  repo?: string;
  /** live demo / external URL */
  demo?: string;
  /** highlight on the grid */
  featured?: boolean;
  /** completion / start year */
  year?: number;
}

/** A grouped set of professional skills (§2 grouped arrangement). */
export interface SkillGroup {
  /** group label, e.g. "Offensive" | "Defensive" | "Automation" | "GRC" | "Cloud" */
  name: string;
  /** skill names in the group */
  skills: string[];
}

/** A capability card for the Focus Areas presentation (§7). */
export interface FocusArea {
  title: string;
  description: string;
  /** technique / tool chips */
  chips: string[];
}

/** Experience / education / certification timeline entry (§3–§4). */
export interface Experience {
  /** role / qualification title */
  title: string;
  /** organisation / institution */
  org: string;
  /** optional location, shown as "Org · Location" */
  location?: string;
  /** kind, used to label/group the timeline */
  kind: "work" | "education" | "certification";
  /** bullet details */
  points?: string[];
}

/** A CTF result. Section self-hides when the array is empty (§5G). */
export interface CTF {
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
