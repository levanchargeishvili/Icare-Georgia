/* Original animated illustrations for the service cards. Animated in Services.tsx. */

export function ScreenArt() {
  return (
    <svg className="art art-screen" viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <linearGradient id="scr-fresh" x1="0" y1="1" x2="0.4" y2="0">
          <stop offset="0" stopColor="#1d4ed8" />
          <stop offset="0.6" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#67e8f9" />
        </linearGradient>
        <linearGradient id="scr-dead" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#111827" />
          <stop offset="1" stopColor="#1f2937" />
        </linearGradient>
        <clipPath id="scr-clip">
          <rect x="79" y="20" width="62" height="130" rx="9" />
        </clipPath>
      </defs>
      <g className="phone">
        <rect x="73" y="12" width="74" height="146" rx="15" fill="#0b1020" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" />
        <rect x="79" y="20" width="62" height="130" rx="9" fill="url(#scr-dead)" />
        <g clipPath="url(#scr-clip)">
          <g className="cracks" fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round">
            <path pathLength={1} d="M112 72 L96 52 L88 30" />
            <path pathLength={1} d="M112 72 L132 58 L140 40" />
            <path pathLength={1} d="M112 72 L90 92 L80 118" />
            <path pathLength={1} d="M112 72 L128 100 L124 140" />
            <path pathLength={1} d="M112 72 L142 82" />
            <path pathLength={1} d="M96 52 L84 60" />
            <path pathLength={1} d="M128 100 L140 110" />
          </g>
          <rect className="fresh" x="79" y="20" width="62" height="130" fill="url(#scr-fresh)" />
          <circle className="fresh-orb" cx="122" cy="60" r="34" fill="#93c5fd" opacity="0.35" />
        </g>
        <rect x="100" y="24" width="20" height="5" rx="2.5" fill="#0b1020" />
      </g>
      <g className="check">
        <circle cx="158" cy="38" r="14" fill="#34d399" />
        <path d="M151 38 l5 5 l9 -10" fill="none" stroke="#04210f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

export function BatteryArt() {
  return (
    <svg className="art art-battery" viewBox="0 0 220 170" aria-hidden="true">
      <rect x="38" y="52" width="132" height="70" rx="14" fill="#0b1020" stroke="rgba(255,255,255,.25)" strokeWidth="2" />
      <rect x="172" y="74" width="10" height="26" rx="4" fill="rgba(255,255,255,.25)" />
      <rect className="lvl" x="45" y="59" width="118" height="56" rx="9" fill="#ff5a5f" />
      <path className="bolt" d="M108 64 L92 90 H104 L98 112 L118 82 H106 Z" fill="#fff" />
      <text className="pct" x="104" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontFamily="JetBrains Mono, monospace">8%</text>
    </svg>
  )
}

export function DiagArt() {
  return (
    <svg className="art art-diag" viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <clipPath id="diag-clip">
          <rect x="30" y="26" width="160" height="104" rx="12" />
        </clipPath>
      </defs>
      <rect x="30" y="26" width="160" height="104" rx="12" fill="#0b1020" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" />
      <g clipPath="url(#diag-clip)">
        <g stroke="rgba(148,163,184,.12)" strokeWidth="1">
          {[46, 66, 86, 106].map((y) => <line key={y} x1="30" x2="190" y1={y} y2={y} />)}
          {[60, 90, 120, 150].map((x) => <line key={x} y1="26" y2="130" x1={x} x2={x} />)}
        </g>
        <path d="M30 80 H72 L80 62 L90 104 L100 48 L110 92 L118 80 H190" fill="none" stroke="rgba(79,209,255,.18)" strokeWidth="2" />
        <path className="pulse-line" pathLength={1} d="M30 80 H72 L80 62 L90 104 L100 48 L110 92 L118 80 H190" fill="none" stroke="#4fd1ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect className="scan" x="30" y="26" width="160" height="16" fill="url(#diag-scan)" />
      </g>
      <defs>
        <linearGradient id="diag-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fd1ff" stopOpacity="0" />
          <stop offset="1" stopColor="#4fd1ff" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g className="dots">
        <circle cx="86" cy="150" r="5" fill="#34d399" />
        <circle cx="110" cy="150" r="5" fill="#34d399" />
        <circle cx="134" cy="150" r="5" fill="#34d399" />
      </g>
    </svg>
  )
}
