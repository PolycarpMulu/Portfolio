"use client";

import { useEffect, useRef } from "react";

// Tasteful console nod to fellow hackers. The challenge decodes with the site's
// own terminal: `b64 dec QzFSQ1UxVHtjbDEzbnRfczFkM19sNGJ9`.
export default function ConsoleEgg() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const accent = "color:#00ff9c;font-family:monospace";
    const muted = "color:#9aabbd;font-family:monospace";

    console.log("%cC1rcu1t⤬ // qu35t", `${accent};font-size:16px;font-weight:bold`);
    console.log("%cWelcome, fellow hacker — everything here runs client-side.", accent);
    console.log(
      "%cTry the terminal (hash · b64 · jwt) or curl /.well-known/security.txt",
      muted,
    );
    console.log("%cchallenge → b64 dec QzFSQ1UxVHtjbDEzbnRfczFkM19sNGJ9", muted);
  }, []);

  return null;
}
