// Signature animated circuit-trace backdrop. Used ONLY in the hero (§4).
// Pure SVG + CSS keyframes (trace-flow / node-pulse defined in globals.css), so
// prefers-reduced-motion neutralizes the motion via the global media query.
// Decorative only → aria-hidden + pointer-events-none.

interface Trace {
  d: string;
  /** dash length used to "draw" the trace */
  len: number;
  /** seconds */
  duration: number;
  /** seconds */
  delay: number;
}

interface Node {
  cx: number;
  cy: number;
  r: number;
  duration: number;
  delay: number;
}

const TRACES: Trace[] = [
  { d: "M0 120 H180 V60 H360", len: 480, duration: 4, delay: 0 },
  { d: "M800 90 H620 V200 H440 V120", len: 520, duration: 4.6, delay: 0.5 },
  { d: "M0 300 H120 V420 H300 V360 H520", len: 640, duration: 5.2, delay: 0.2 },
  { d: "M800 340 H700 V260 H560 V440 H400", len: 660, duration: 5, delay: 0.8 },
  { d: "M120 600 V500 H260 V560 H460 V480", len: 540, duration: 4.4, delay: 1.1 },
  { d: "M800 540 H640 V600", len: 280, duration: 3.6, delay: 0.4 },
  { d: "M380 0 V90 H520 V180", len: 360, duration: 4, delay: 0.9 },
];

const NODES: Node[] = [
  { cx: 360, cy: 60, r: 4, duration: 3, delay: 0 },
  { cx: 440, cy: 120, r: 3.5, duration: 3.4, delay: 0.6 },
  { cx: 300, cy: 360, r: 4, duration: 3.2, delay: 0.3 },
  { cx: 560, cy: 440, r: 3.5, duration: 3.6, delay: 0.9 },
  { cx: 260, cy: 560, r: 3, duration: 2.8, delay: 0.5 },
  { cx: 520, cy: 180, r: 4, duration: 3.3, delay: 1.2 },
  { cx: 700, cy: 260, r: 3, duration: 3, delay: 0.2 },
];

export default function CircuitBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 800 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {TRACES.map((t, i) => (
          <path
            key={`trace-${i}`}
            d={t.d}
            className="stroke-accent"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: t.len,
              strokeDashoffset: t.len,
              animation: `trace-flow ${t.duration}s ease-out ${t.delay}s forwards`,
            }}
          />
        ))}
        {NODES.map((n, i) => (
          <circle
            key={`node-${i}`}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            className="fill-accent"
            style={{
              animation: `node-pulse ${n.duration}s ease-in-out ${n.delay}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
