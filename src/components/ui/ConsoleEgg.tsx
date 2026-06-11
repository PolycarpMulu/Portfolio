"use client";

import { useEffect, useRef } from "react";

// Tasteful console nod to fellow hackers. The challenge is a base64 string you can
// decode with any tool: `echo QzFSQ1UxVHtjbDEzbnRfczFkM19sNGJ9 | base64 -d`.
export default function ConsoleEgg() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const accent = "color:#00ff9c;font-family:monospace";
    const muted = "color:#9aabbd;font-family:monospace";

    console.log("%cC1rcu1t⤬ // qu35t", `${accent};font-size:16px;font-weight:bold`);
    console.log("%cWelcome, fellow hacker. This site is static + hardened.", accent);
    console.log(
      "%cRecon tip: curl https://polycarpmulu.netlify.app/.well-known/security.txt",
      muted,
    );
    console.log("%cchallenge → base64: QzFSQ1UxVHtjbDEzbnRfczFkM19sNGJ9", muted);
  }, []);

  return null;
}
