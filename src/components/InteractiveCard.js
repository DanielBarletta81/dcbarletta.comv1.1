'use client';
import { useState, useRef } from 'react';

/**
 * InteractiveCard
 * - Scales up on hover with border glow and mist overlay
 * - Tracks mouse position for parallax tilt effect
 * - Easter egg: hold click for 2s to reveal a hidden rune/glyph
 */
export default function InteractiveCard({ children, label = '', glowColor, style = {} }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [holding, setHolding] = useState(false);
  const [runeVisible, setRuneVisible] = useState(false);
  const cardRef = useRef(null);
  const holdTimer = useRef(null);

  const onMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  };

  const onMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    setHolding(false);
    clearTimeout(holdTimer.current);
  };

  const onMouseDown = () => {
    setHolding(true);
    holdTimer.current = setTimeout(() => {
      setRuneVisible(true);
      setTimeout(() => setRuneVisible(false), 3500);
    }, 2000);
  };

  const onMouseUp = () => {
    setHolding(false);
    clearTimeout(holdTimer.current);
  };

  const color = glowColor || 'var(--accent)';

  return (
    <div
      ref={cardRef}
      className="i-card"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{
        '--glow': color,
        transform: hovered
          ? `scale(1.035) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'scale(1) rotateX(0) rotateY(0)',
        boxShadow: hovered
          ? `0 0 0 1.5px ${color}, 0 0 24px 4px ${color}40, 0 8px 32px #00000030`
          : '0 0 0 1px var(--border)',
        ...style
      }}
    >
      {/* Mist overlay */}
      <div className={`i-card__mist${hovered ? ' i-card__mist--active' : ''}`} aria-hidden="true" />

      {/* Hold-to-reveal rune */}
      {runeVisible && (
        <div className="i-card__rune" aria-hidden="true">
          ᚢ
        </div>
      )}

      {/* Press ring pulse */}
      {holding && <div className="i-card__press-ring" aria-hidden="true" />}

      {children}
    </div>
  );
}
