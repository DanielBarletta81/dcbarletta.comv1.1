'use client';

import { useEffect, useState } from 'react';
import { AUTHOR_URL, WORLD_URL, copy, localPath } from './content';
import styles from './fault-lines.module.css';

export function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function CampaignShell({ children, locale = 'en', site = 'world', path = '' }) {
  const c = copy[locale];
  const author = site === 'author';
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    document.documentElement.lang = locale;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(preference.matches);
    sync();
    preference.addEventListener('change', sync);
    try { setPaused(localStorage.getItem('tethys-atmosphere-paused-v1') === 'true'); } catch { /* Storage is optional. */ }
    return () => { preference.removeEventListener('change', sync); document.documentElement.lang = 'en'; };
  }, [locale]);
  function toggleMotion() {
    const next = !paused;
    setPaused(next);
    try { localStorage.setItem('tethys-atmosphere-paused-v1', String(next)); } catch { /* Session-only control still works. */ }
  }
  const worldHome = `${WORLD_URL}${localPath(locale)}`;
  const safetyHref = `${author ? WORLD_URL : ''}${localPath(locale, '/sunda-strait')}`;
  return <div className={styles.site} data-fault-lines data-motion={paused || reduced ? 'paused' : 'running'} lang={locale}>
    <a className={styles.skip} href="#campaign-main">{c.skip}</a>
    <header className={styles.header}>
      <a href={localPath(locale)} className={styles.wordmark} aria-label={author ? 'D.C. Barletta' : 'World of Tethys'}>
        <svg viewBox="0 0 36 40" fill="none" aria-hidden="true"><path d="M18 1 34 10v20L18 39 2 30V10Z" stroke="currentColor" /><path d="m7 27 8-16 4 9 3-5 7 12M10 29h16" stroke="currentColor" /></svg>
        <span>{author ? 'D.C. Barletta' : 'World of Tethys'}<small>{author ? c.authorLabel : 'Fault Lines / II'}</small></span>
      </a>
      <nav className={styles.nav} aria-label={c.menu}>
        <a href={author ? localPath(locale, '/books') : `${localPath(locale)}#book`}>{c.book}</a>
        <a href={author ? worldHome : `${localPath(locale)}#regions`}>{c.world}</a>
        <a href={author ? localPath(locale, '/contact') : `${AUTHOR_URL}${localPath(locale)}`}>{author ? c.contact : c.author}</a>
      </nav>
      <div className={styles.languages} aria-label="Language / Bahasa">
        <a href={localPath('en', path)} lang="en" hrefLang="en" aria-current={locale === 'en' ? 'page' : undefined}>EN</a><span>/</span><a href={localPath('id', path)} lang="id" hrefLang="id" aria-label="Bahasa Indonesia" aria-current={locale === 'id' ? 'page' : undefined}>ID</a>
      </div>
    </header>
    <main id="campaign-main" tabIndex={-1}>{children}</main>
    <footer className={styles.footer}>
      <div><a href={localPath(locale)} className={styles.footerBrand}>{author ? 'D.C. Barletta' : 'World of Tethys'}</a><p>{c.footer}</p></div>
      <nav aria-label={locale === 'id' ? 'Navigasi bawah' : 'Footer navigation'}>
        <a href={author ? worldHome : `${AUTHOR_URL}${localPath(locale)}`}>{author ? c.world : c.author} <Arrow /></a>
        {author && <a href={localPath(locale, '/portfolio')}>{c.portfolio}</a>}
        <a href={`${WORLD_URL}/little-tethys`}>{c.family} <Arrow /></a>
        <a href={safetyHref}>{c.safetyShort} <Arrow /></a>
        <a href={`${WORLD_URL}/privacy`}>{locale === 'id' ? 'Privasi (Inggris)' : 'Privacy'}</a>
      </nav>
      <div className={styles.footerBottom}><span>© {new Date().getFullYear()} {c.copyright}</span><button onClick={toggleMotion} disabled={reduced} aria-pressed={paused || reduced}>{reduced ? c.still : paused ? c.resume : c.motion} <span aria-hidden="true">{paused || reduced ? '▷' : 'Ⅱ'}</span></button></div>
    </footer>
  </div>;
}
