import { ImageResponse } from "next/og";
import { bio } from "@/data/bio";

// Static OG card generated at build time (compatible with output: 'export').
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${bio.alias} — ${bio.name}`;

// Design tokens (kept literal here: this runs in the OG renderer, not the app,
// so Tailwind utilities / CSS vars are unavailable).
const VOID = "#0a0a0f";
const ACCENT = "#00ff9c";
const MUTED = "#9aabbd";
const BORDER = "#2d2d4e";

export default function OpengraphImage() {
  // The OG font renderer can't fetch the exotic "⤬" glyph (offline build) — use a
  // standard "×" in the card only; the real wordmark is unchanged across the site.
  const wordmark = bio.alias.replace("⤬", "×");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: VOID,
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(0,255,156,0.10), transparent 45%)`,
        }}
      >
        <div style={{ display: "flex", color: ACCENT, fontSize: 120, fontWeight: 700 }}>
          {wordmark}
        </div>
        <div style={{ display: "flex", color: "#e8f4f0", fontSize: 40, marginTop: 12 }}>
          {bio.name}
        </div>
        <div style={{ display: "flex", color: MUTED, fontSize: 30, marginTop: 28, maxWidth: 900 }}>
          {bio.subline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            paddingTop: 28,
            borderTop: `2px solid ${BORDER}`,
            color: MUTED,
            fontSize: 24,
            letterSpacing: 4,
          }}
        >
          {bio.roles[0]} · {bio.location}
        </div>
      </div>
    ),
    { ...size },
  );
}
