'use client';

import { useMemo, useState, useEffect } from 'react';
import CampaignShell, { Arrow } from './CampaignShell';
import { EXPERIENCE_URLS } from './content';
import styles from './fault-lines.module.css';

const STORAGE_KEY = 'tethys-discovery-pins-v1';
const FOG_KEY = 'tethys-discovery-fog-v1';

function labels(locale) {
  if (locale === 'id') {
    return {
      eyebrow: 'Peta penemuan',
      title: 'Ungkap dunia lewat rasa ingin tahu.',
      intro: 'Klik di peta untuk menandai area yang sudah kamu jelajahi. Setiap pin membuka lebih banyak dunia — lalu masuk ke 3D untuk benar-benar merasakan wilayahnya.',
      discovered: 'Area terungkap',
      discoveredSuffix: 'pin',
      clear: 'Reset peta',
      undo: 'Batalkan pin terakhir',
      fogOn: 'Aktifkan kabut',
      fogOff: 'Matikan kabut',
      adventures: 'Masuk Adventures',
      wildbound: 'Masuk Wildbound',
      tip: 'Tip: area yang masih gelap menandakan wilayah yang belum ditemukan.',
    };
  }
  return {
    eyebrow: 'Discovery map',
    title: 'Reveal the world through curiosity.',
    intro: 'Click anywhere on the map to pin explored areas. Each discovery opens more of the world — then step into 3D to physically immerse in the region.',
    discovered: 'Revealed areas',
    discoveredSuffix: 'pins',
    clear: 'Reset map',
    undo: 'Undo last pin',
    fogOn: 'Enable fog',
    fogOff: 'Disable fog',
    adventures: 'Enter Adventures',
    wildbound: 'Enter Wildbound',
    tip: 'Tip: darker zones represent places not yet discovered.',
  };
}

export default function DiscoveryMapPage({ locale = 'en' }) {
  const t = labels(locale);
  const [pins, setPins] = useState([]);
  const [fogEnabled, setFogEnabled] = useState(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) setPins(saved);
      const fog = localStorage.getItem(FOG_KEY);
      if (fog) setFogEnabled(fog === 'true');
    } catch {
      setPins([]);
    }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(pins)); } catch {}
  }, [pins]);

  useEffect(() => {
    try { localStorage.setItem(FOG_KEY, String(fogEnabled)); } catch {}
  }, [fogEnabled]);

  const maskId = useMemo(() => `fog-mask-${Math.random().toString(36).slice(2)}`, []);

  function addPin(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPins((prev) => [...prev, { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) }]);
  }

  return <CampaignShell locale={locale} site="author" path="/map">
    <section className={`${styles.section} ${styles.discoveryIntro}`}>
      <p className={styles.eyebrow}>{t.eyebrow}</p>
      <h1 className={styles.sectionTitle}>{t.title}</h1>
      <p>{t.intro}</p>
    </section>

    <section className={`${styles.section} ${styles.discoveryMapSection}`}>
      <div className={styles.discoveryToolbar}>
        <span>{t.discovered}: <strong>{pins.length}</strong> {t.discoveredSuffix}</span>
        <div>
          <button onClick={() => setPins((prev) => prev.slice(0, -1))} disabled={!pins.length}>{t.undo}</button>
          <button onClick={() => setPins([])} disabled={!pins.length}>{t.clear}</button>
          <button onClick={() => setFogEnabled((v) => !v)}>{fogEnabled ? t.fogOff : t.fogOn}</button>
        </div>
      </div>

      <div className={styles.discoveryMapFrame} onClick={addPin} role="button" tabIndex={0} aria-label="Interactive discovery map">
        <div className={styles.discoveryMapImage} />

        {fogEnabled && <svg className={styles.discoveryFog} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <mask id={maskId}>
              <rect width="100" height="100" fill="white" />
              {pins.map((pin, i) => <circle key={`${pin.x}-${pin.y}-${i}`} cx={pin.x} cy={pin.y} r="7.2" fill="black" />)}
            </mask>
          </defs>
          <rect width="100" height="100" fill="rgba(6,8,12,0.86)" mask={`url(#${maskId})`} />
        </svg>}

        {pins.map((pin, i) => <span key={`${pin.x}-${pin.y}-${i}`} className={styles.discoveryPin} style={{ left: `${pin.x}%`, top: `${pin.y}%` }} />)}
      </div>

      <p className={styles.helpNote}>{t.tip}</p>

      <div className={styles.pipelineActions}>
        <a className={styles.primaryButton} href={EXPERIENCE_URLS.adventures} target="_blank" rel="noopener noreferrer">{t.adventures} <Arrow /></a>
        <a className={styles.quietButton} href={EXPERIENCE_URLS.wildbound} target="_blank" rel="noopener noreferrer">{t.wildbound} <Arrow /></a>
      </div>
    </section>
  </CampaignShell>;
}
