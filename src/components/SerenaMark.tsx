type Props = { size?: number; className?: string };

export function SerenaMark({ size = 64, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Serena"
      className={className}
    >
      <defs>
        <linearGradient id="serena-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8C2AE" />
          <stop offset="100%" stopColor="#7C9885" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="30" r="13" fill="url(#serena-sun)" />
      <path
        d="M6 42 Q 32 32 58 42"
        stroke="#5E7A68"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
