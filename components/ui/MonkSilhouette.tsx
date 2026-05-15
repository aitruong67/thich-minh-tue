interface MonkSilhouetteProps {
  className?: string
}

export default function MonkSilhouette({ className = '' }: MonkSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 160 260"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Silhouette of Thầy Minh Tuệ walking with his patchwork robe and rice-cooker bowl"
      className={className}
    >
      {/* Shaved head */}
      <circle cx="80" cy="26" r="22" fill="currentColor" />

      {/* Patchwork robe — slightly wider at hem to evoke a walking stride */}
      <path
        d="M 58 46 C 48 82, 36 148, 38 250 L 122 250 C 124 148, 112 82, 102 46 Z"
        fill="currentColor"
      />

      {/* Patchwork seam lines — horizontal dashes suggesting sewn cloth patches */}
      <path d="M 56 82  L 104 82"  stroke="rgba(14,10,6,0.28)" strokeWidth="1.5" strokeDasharray="5 3" fill="none" />
      <path d="M 52 118 L 108 118" stroke="rgba(14,10,6,0.28)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      <path d="M 47 157 L 113 157" stroke="rgba(14,10,6,0.22)" strokeWidth="1.5" strokeDasharray="5 4" fill="none" />
      <path d="M 43 196 L 117 196" stroke="rgba(14,10,6,0.18)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      {/* Vertical patch seam */}
      <path d="M 76 46 L 73 250" stroke="rgba(14,10,6,0.15)" strokeWidth="1"   strokeDasharray="7 5" fill="none" />

      {/* Left arm — extended, carrying the rice-cooker pot */}
      <path
        d="M 58 95 C 42 106, 26 118, 18 128"
        stroke="currentColor"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />

      {/* Rice-cooker pot (nồi cơm điện) used as alms bowl */}
      {/* Lid knob */}
      <rect x="13" y="105" width="10" height="9"  rx="2.5" fill="currentColor" />
      {/* Lid */}
      <rect x="5"  y="113" width="28" height="9"  rx="3.5" fill="currentColor" />
      {/* Body */}
      <rect x="3"  y="120" width="32" height="26" rx="5"   fill="currentColor" />
      {/* Power cord — signature detail of Thầy's pot */}
      <path
        d="M 33 140 Q 44 150 40 164"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.62"
      />

      {/* Right arm — raised slightly for balance while walking */}
      <path
        d="M 102 90 C 122 98, 134 106, 138 114"
        stroke="currentColor"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />

      {/* Bare feet — walking stride, slightly splayed */}
      <ellipse cx="60"  cy="254" rx="16" ry="7" fill="currentColor" transform="rotate(-10,60,254)"  />
      <ellipse cx="100" cy="254" rx="16" ry="7" fill="currentColor" transform="rotate(10,100,254)" />
    </svg>
  )
}
