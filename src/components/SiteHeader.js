'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DCBLogo from './DCBLogo';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Books', href: '/books' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}
      role="banner"
    >
      <div className="site-header__inner">
        {/* Logo + wordmark */}
        <Link href="/" className="site-header__brand" aria-label="D.C. Barletta — home">
          <DCBLogo size={36} />
          <span className="site-header__wordmark">D.C. Barletta</span>
        </Link>

        {/* Desktop nav */}
        <nav className="site-header__nav" aria-label="Primary navigation">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile hamburger */}
        <button
          className="site-header__burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="site-header__drawer" aria-label="Mobile navigation">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link nav-link--drawer"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ marginTop: '12px' }}>
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
