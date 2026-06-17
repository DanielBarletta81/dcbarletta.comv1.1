'use client';
import { useState } from 'react';

export default function DCBLogo({ size = 40 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="D.C. Barletta logo"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'default',
        transition: 'filter 0.4s ease',
        filter: hovered
          ? 'drop-shadow(0 0 8px var(--accent)) drop-shadow(0 0 20px var(--accent))'
          : 'none',
        overflow: 'visible'
      }}
    >
      {/* Outer ring — ancient cartouche */}
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="var(--text)"
        strokeWidth="1.2"
        style={{
          transition: 'stroke-width 0.3s, opacity 0.3s',
          opacity: hovered ? 1 : 0.6
        }}
      />
      {/* Inner ring */}
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke="var(--text-subtle)"
        strokeWidth="0.5"
        style={{ opacity: hovered ? 0.8 : 0.3, transition: 'opacity 0.3s' }}
      />
      {/* D */}
      <text
        x="11"
        y="38"
        fontSize="18"
        fontFamily="var(--font-display), serif"
        fontWeight="700"
        fill="var(--text)"
        style={{ transition: 'fill 0.3s' }}
      >
        D
      </text>
      {/* C */}
      <text
        x="26"
        y="38"
        fontSize="18"
        fontFamily="var(--font-display), serif"
        fontWeight="400"
        fill={hovered ? 'var(--accent)' : 'var(--text)'}
        style={{ transition: 'fill 0.3s' }}
      >
        C
      </text>
      {/* B */}
      <text
        x="42"
        y="38"
        fontSize="18"
        fontFamily="var(--font-display), serif"
        fontWeight="700"
        fill="var(--text)"
        style={{ transition: 'fill 0.3s' }}
      >
        B
      </text>
      {/* Decorative compass tick — north */}
      <line x1="32" y1="2" x2="32" y2="7" stroke="var(--text-subtle)" strokeWidth="1" opacity={hovered ? 1 : 0.4} style={{ transition: 'opacity 0.3s' }} />
    </svg>
  );
}
