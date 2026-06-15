'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    const next = !html.classList.contains('dark');
    html.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setDark(next);
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
      {dark ? '◎ Shore' : '◉ Abyss'}
    </button>
  );
}
