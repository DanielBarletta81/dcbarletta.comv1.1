'use client';

import { useMemo, useState, useEffect } from 'react';
import CampaignShell, { Arrow } from './CampaignShell';
import { EXPERIENCE_URLS } from './content';
import styles from './fault-lines.module.css';

const STORAGE_KEY = 'tethys-discovery-pins-v2';
const FOG_KEY = 'tethys-discovery-fog-v1';
const KIND_KEY = 'tethys-discovery-kind-v1';
const LABEL_KEY = 'tethys-discovery-label-v1';

const UNLOCKS = [
  { count: 3, key: 'sky' },
  { count: 6, key: 'watcher' },
  { count: 10, key: 'siluria' },
  { count: 14, key: 'gargantua' },
];

const PIN_KINDS = [
  { id: 'discover', icon: '⭐' },
  { id: 'camp', icon: '🔥' },
  { id: 'warning', icon: '⚠️' },
  { id: 'creature', icon: '🦎' },
];

function copyFor(locale) {
  if (locale === 'id') {
    return {
      eyebrow: 'Peta penemuan',
      title: 'Ungkap dunia lewat rasa ingin tahu.',
      intro: 'Pasang pin untuk area yang sudah kamu jelajahi. Semakin banyak penemuan, semakin besar dunia yang terbuka.',
      discovered: 'Area terungkap',
      discoveredSuffix: 'pin',
      clear: 'Reset peta',
      undo: 'Batalkan pin terakhir',
      fogOn: 'Aktifkan kabut',
      fogOff: 'Matikan kabut',
      adventures: 'Masuk Adventures',
      wildbound: 'Masuk Wildbound',
      tip: 'Tip: zona gelap menandakan wilayah yang belum ditemukan.',
      pinLabel: 'Nama pin',
      pinLabelPlaceholder: 'Contoh: Sky City Gate',
      pinType: 'Tipe pin',
      shareLabel: 'Kode peta',
      copyCode: 'Salin kode',
      importCode: 'Muat kode',
      unlockTitle: 'Progress membuka wilayah',
      unlocks: {
        sky: 'Sky City routes',
        watcher: 'Watcher/Purgess corridor',
        siluria: 'Siluria wetlands',
        gargantua: 'Gargantua frontier'
      }
    };
  }
  return {
    eyebrow: 'Discovery map',
    title: 'Reveal the world through curiosity.',
    intro: 'Pin explored areas as you discover them. The more you find, the more of the world unlocks.',
    discovered: 'Revealed areas',
    discoveredSuffix: 'pins',
    clear: 'Reset map',
    undo: 'Undo last pin',
    fogOn: 'Enable fog',
    fogOff: 'Disable fog',
    adventures: 'Enter Adventures',
    wildbound: 'Enter Wildbound',
    tip: 'Tip: darker zones represent places not yet discovered.',
    pinLabel: 'Pin label',
    pinLabelPlaceholder: 'Example: Sky City Gate',
    pinType: 'Pin type',
    shareLabel: 'Map code',
    copyCode: 'Copy code',
    importCode: 'Load code',
    unlockTitle: 'Region unlock progress',
    unlocks: {
      sky: 'Sky City routes',
      watcher: 'Watcher/Purgess corridor',
      siluria: 'Siluria wetlands',
      gargantua: 'Gargantua frontier'
    }
  };
}

function encodePins(pins) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(pins))));
  } catch {
    return '';
  }
}

function decodePins(code) {
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return null;
  }
}

export default function DiscoveryMapPage({ locale = 'en' }) {
  const t = copyFor(locale);
  const [pins, setPins] = useState([]);
  const [fogEnabled, setFogEnabled] = useState(true);
  const [activeKind, setActiveKind] = useState('discover');
  const [pinLabel, setPinLabel] = useState('');
  const [mapCodeInput, setMapCodeInput] = useState('');
  const [mapCode, setMapCode] = useState('');
  const [copyState, setCopyState] = useState('idle');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) setPins(saved);
      const fog = localStorage.getItem(FOG_KEY);
      if (fog) setFogEnabled(fog === 'true');
      const savedKind = localStorage.getItem(KIND_KEY);
      if (savedKind) setActiveKind(savedKind);
      const savedLabel = localStorage.getItem(LABEL_KEY);
      if (savedLabel) setPinLabel(savedLabel);
    } catch {
      setPins([]);
    }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(pins)); } catch {}
    setMapCode(encodePins(pins));
  }, [pins]);

  useEffect(() => {
    try { localStorage.setItem(FOG_KEY, String(fogEnabled)); } catch {}
  }, [fogEnabled]);

  useEffect(() => {
    try { localStorage.setItem(KIND_KEY, activeKind); } catch {}
  }, [activeKind]);

  useEffect(() => {
    try { localStorage.setItem(LABEL_KEY, pinLabel); } catch {}
  }, [pinLabel]);

  const maskId = useMemo(() => `fog-mask-${Math.random().toString(36).slice(2)}`, []);
  const unlocked = UNLOCKS.filter((u) => pins.length >= u.count);
  const radius = 6.2 + Math.min(unlocked.length, 4) * 0.8;

  function addPin(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPins((prev) => [...prev, {
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      label: pinLabel.trim() || `Discovery ${prev.length + 1}`,
      kind: activeKind,
    }]);
  }

  async function copyCode() {
    if (!mapCode) return;
    try {
      await navigator.clipboard.writeText(mapCode);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 1800);
    } catch {
      setCopyState('failed');
      setTimeout(() => setCopyState('idle'), 1800);
    }
  }

  function importCode() {
    const decoded = decodePins(mapCodeInput);
    if (decoded) {
      setPins(decoded);
      setMapCodeInput('');
    }
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

      <div className={styles.discoveryConfig}>
        <label>{t.pinLabel}<input value={pinLabel} onChange={(event) => setPinLabel(event.target.value)} placeholder={t.pinLabelPlaceholder} /></label>
        <label>{t.pinType}
          <select value={activeKind} onChange={(event) => setActiveKind(event.target.value)}>
            {PIN_KINDS.map((kind) => <option key={kind.id} value={kind.id}>{kind.icon} {kind.id}</option>)}
          </select>
        </label>
      </div>

      <div className={styles.discoveryMapFrame} onClick={addPin} role="button" tabIndex={0} aria-label="Interactive discovery map">
        <div className={styles.discoveryMapImage} />

        {fogEnabled && <svg className={styles.discoveryFog} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <mask id={maskId}>
              <rect width="100" height="100" fill="white" />
              {pins.map((pin, i) => <circle key={`${pin.x}-${pin.y}-${i}`} cx={pin.x} cy={pin.y} r={radius} fill="black" />)}
            </mask>
          </defs>
          <rect width="100" height="100" fill="rgba(6,8,12,0.86)" mask={`url(#${maskId})`} />
        </svg>}

        {pins.map((pin, i) => {
          const pinKind = PIN_KINDS.find((kind) => kind.id === pin.kind) || PIN_KINDS[0];
          return <span key={`${pin.x}-${pin.y}-${i}`} className={styles.discoveryPin} style={{ left: `${pin.x}%`, top: `${pin.y}%` }} title={pin.label}>{pinKind.icon}</span>;
        })}
      </div>

      <div className={styles.discoveryUnlocks}>
        <p className={styles.eyebrow}>{t.unlockTitle}</p>
        <ul>
          {UNLOCKS.map((unlock) => {
            const isOpen = pins.length >= unlock.count;
            return <li key={unlock.key} className={isOpen ? styles.unlockOpen : styles.unlockLocked}>
              <span>{isOpen ? '✓' : '•'}</span>
              <span>{t.unlocks[unlock.key]} ({unlock.count})</span>
            </li>;
          })}
        </ul>
      </div>

      <div className={styles.discoveryShare}>
        <label>{t.shareLabel}<textarea value={mapCode} readOnly /></label>
        <div>
          <button onClick={copyCode}>{copyState === 'copied' ? 'Copied' : t.copyCode}</button>
          <textarea value={mapCodeInput} onChange={(event) => setMapCodeInput(event.target.value)} placeholder="Paste code here" />
          <button onClick={importCode}>{t.importCode}</button>
        </div>
      </div>

      <img src="/roblox-experiences/Adventures_pin_set.PNG" alt="Adventures pin icon set reference" className={styles.discoveryLegend} />
      <p className={styles.helpNote}>{t.tip}</p>

      <div className={styles.pipelineActions}>
        <a className={styles.primaryButton} href={EXPERIENCE_URLS.adventures} target="_blank" rel="noopener noreferrer">{t.adventures} <Arrow /></a>
        <a className={styles.quietButton} href={EXPERIENCE_URLS.wildbound} target="_blank" rel="noopener noreferrer">{t.wildbound} <Arrow /></a>
      </div>
    </section>
  </CampaignShell>;
}
