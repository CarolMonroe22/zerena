type Props = { size?: number; className?: string };

export function SerenaMark({ size = 64, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Zerena"
      className={className}
    >
      <defs>
        <linearGradient id="serena-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8C2AE" />
          <stop offset="100%" stopColor="#7C9885" />
        </linearGradient>
        <clipPath id="serena-horizon">
          <rect x="0" y="0" width="64" height="40" />
        </clipPath>
      </defs>
      {/* Sol naciente, recortado por el horizonte */}
      <circle cx="32" cy="34" r="12" fill="url(#serena-sun)" clipPath="url(#serena-horizon)" />
      {/* Horizonte recto: línea calma, no una boca */}
      <line
        x1="9"
        y1="40"
        x2="55"
        y2="40"
        stroke="#5E7A68"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
