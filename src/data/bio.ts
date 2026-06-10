import type { Bio } from "@/types";

// Facts below come from BUILD_SPEC. Social URLs, contact email, and the About
// summary are intentionally left blank — fill with real values (do not fabricate).
// Empty social strings cause their links to self-hide in Contact/Footer.
export const bio: Bio = {
  name: "Polycarp",
  alias: "C1rcu1t⤬",
  handle: "qu35t",
  role: "Cybersecurity Engineer",
  focus: ["Hardware", "Binary", "Crypto"],
  location: "Nairobi, Kenya",
  tagline: "Cybersecurity Engineer — Hardware · Binary · Crypto",
  summary: "", // TODO: add real About bio
  social: {
    github: "", // TODO: https://github.com/...
    twitter: "", // TODO: https://x.com/...
    linkedin: "", // TODO: https://linkedin.com/in/...
    email: "", // TODO: public contact email
  },
};
