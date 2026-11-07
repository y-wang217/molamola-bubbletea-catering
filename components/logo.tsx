// A simple sunfish (mola mola) mark: round body, tall dorsal + anal fins, no tail.
export function MolaMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M30 4c4 0 6 6 6 12H26c0-6 1-12 4-12Z" fill="currentColor" opacity="0.85" />
      <path d="M30 60c4 0 6-6 6-12H26c0 6 1 12 4 12Z" fill="currentColor" opacity="0.85" />
      <ellipse cx="30" cy="32" rx="22" ry="18" fill="currentColor" />
      <path d="M50 22c6 3 8 7 8 10s-2 7-8 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="19" cy="28" r="3.2" fill="var(--color-foam)" />
      <circle cx="19" cy="28" r="1.5" fill="var(--color-ink)" />
      <circle cx="38" cy="36" r="2.2" fill="var(--color-foam)" opacity="0.5" />
      <circle cx="31" cy="25" r="1.6" fill="var(--color-foam)" opacity="0.5" />
      <circle cx="42" cy="27" r="1.2" fill="var(--color-foam)" opacity="0.5" />
    </svg>
  );
}
