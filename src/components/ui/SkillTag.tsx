interface SkillTagProps {
  children: React.ReactNode;
  className?: string;
}

/** Small mono pill for a skill / technique chip. */
export default function SkillTag({ children, className = "" }: SkillTagProps) {
  return (
    <span
      className={`inline-block border border-border-dim bg-surface px-2.5 py-1 font-mono text-xs text-muted ${className}`}
    >
      {children}
    </span>
  );
}
