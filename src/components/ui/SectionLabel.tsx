interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Small mono/accent/uppercase section eyebrow, e.g. "// ABOUT".
 * Uses the `section-label` utility defined in globals.css.
 */
export default function SectionLabel({
  children,
  className = "",
}: SectionLabelProps) {
  return <span className={`section-label ${className}`}>{children}</span>;
}
