'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    // Cinematic dip-to-black dimmer — overlay fades in, theme swaps at peak, then resurfaces
    const dim = document.createElement('div');
    Object.assign(dim.style, {
      position: 'fixed', inset: '0', zIndex: '99999',
      background: 'rgba(12, 8, 4, 0.72)',
      opacity: '0', pointerEvents: 'none',
      transition: 'opacity 0.15s ease',
    });
    document.body.appendChild(dim);
    // Double rAF ensures CSS transition fires after initial render
    requestAnimationFrame(() =>
      requestAnimationFrame(() => { dim.style.opacity = '1'; })
    );
    setTimeout(() => {
      const html = document.documentElement;
      const next = !html.classList.contains('dark');
      html.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      setDark(next);
      requestAnimationFrame(() => {
        dim.style.transition = 'opacity 0.22s ease';
        dim.style.opacity = '0';
        setTimeout(() => dim.remove(), 280);
      });
    }, 170);
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Shore — return to surface' : 'Abyss — enter the deep'}
      style={{
        background: 'none',
        border: '1px solid var(--border)',
        color: 'var(--text-subtle)',
        cursor: 'pointer',
        fontSize: '11px',
        padding: '4px 10px',
        borderRadius: '999px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-text), sans-serif',
        lineHeight: 1.4,
        transition: 'border-color 0.2s, color 0.2s',
      }}
    >
      {dark ? '\u25ce Shore' : '\u25c9 Abyss'}
    </button>
  );
}
