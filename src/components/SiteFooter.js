'use client';
import Link from 'next/link';
import DCBLogo from './DCBLogo';
import { useState } from 'react';

/* ── Easter egg: Konami-like click sequence on the logo reveals a hidden quote */
const HIDDEN_LORE =
  '"Before the sea remembered its name, the Tethys already knew yours."';

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/worldoftethys',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/worldoftethys',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.883l4.258 5.63 5.853-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    )
  },
  {
    label: 'World of Tethys',
    href: 'https://worldoftethys.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  },
  {
    label: 'Goodreads',
    href: 'https://goodreads.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.43 23.995c-3.608-.208-6.274-2.048-6.274-5.956V5.84c0-3.913 2.726-5.84 6.334-5.84 3.608 0 6.273 1.927 6.273 5.84v12.2c0 .634-.063 1.226-.191 1.77l1.965.136v1.41l-4.017-.326c-.687.637-1.538 1.099-2.578 1.345l-1.512-2.18zm.06-2.427c2.486 0 4.504-1.827 4.504-4.08v-8.08c0-2.253-2.018-4.08-4.504-4.08s-4.504 1.827-4.504 4.08v8.08c0 2.253 2.018 4.08 4.504 4.08z" />
      </svg>
    )
  }
];

export default function SiteFooter() {
  const [logoClicks, setLogoClicks] = useState(0);
  const [eggVisible, setEggVisible] = useState(false);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 7) {
      setLogoClicks(0);
      setEggVisible(true);
      setTimeout(() => setEggVisible(false), 6000);
    }
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner">

        {/* Brand column */}
        <div className="site-footer__brand">
          <button
            onClick={handleLogoClick}
            aria-label="D.C. Barletta — click for a secret"
            className="site-footer__logo-btn"
          >
            <DCBLogo size={44} />
          </button>
          <p className="site-footer__wordmark">D.C. Barletta</p>
          <p className="site-footer__series">World of Tethys</p>
        </div>

        {/* Scholar quote */}
        <blockquote className="site-footer__quote">
          <p>
            "The Tethys Sea did not vanish — it submerged. All things that ruled
            the surface eventually learn to breathe below it."
          </p>
          <cite>— Field Notes, Cambrian Epoch, Provenance Unknown</cite>
        </blockquote>

        {/* Nav + social */}
        <div className="site-footer__links">
          <nav aria-label="Footer navigation">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/books" className="nav-link">Books</Link>
            <Link href="/portfolio" className="nav-link">Portfolio</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
            <a href="https://worldoftethys.com" className="nav-link" rel="noopener noreferrer" target="_blank">
              World of Tethys ↗
            </a>
          </nav>

          <div className="site-footer__social" role="list" aria-label="Social links">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="social-icon"
                aria-label={s.label}
                rel="noopener noreferrer"
                target="_blank"
                role="listitem"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <p>
          © 2026 D.C. Barletta &nbsp;·&nbsp; World of Tethys &nbsp;·&nbsp; All rights reserved
        </p>
      </div>

      {/* Easter egg reveal */}
      {eggVisible && (
        <div className="easter-egg" role="status" aria-live="polite">
          <span>{HIDDEN_LORE}</span>
        </div>
      )}
    </footer>
  );
}
