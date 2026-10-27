'use client';

import { useMemo, useState, useEffect } from 'react';
import CampaignShell, { Arrow } from './CampaignShell';
import { EXPERIENCE_URLS, localPath } from './content';
import styles from './fault-lines.module.css';

const MAP_CONFIG = {
  adventures: {
    path: '/map',
    storagePrefix: 'tethys-discovery-adventures',
    mapImage: '/A_FebImg-Tethys/wideearth-map.jpg',
    legendImage: '/roblox-experiences/Adventures_pin_set.PNG',
    cinematicImage: '/roblox-experiences/The Lost Crossing_ Tethys Adventures-1.png',
    pinKinds: [
      { id: 'discover', icon: '⭐' },
      { id: 'camp', icon: '🔥' },
      { id: 'warning', icon: '⚠️' },
      { id: 'creature', icon: '🦎' },
    ],
    unlocks: [
      { count: 3, key: 'sky' },
      { count: 6, key: 'watcher' },
      { count: 10, key: 'siluria' },
      { count: 14, key: 'gargantua' },
    ],
    gallery: [],
  },
  wildbound: {
    path: '/map/wildbound',
    storagePrefix: 'tethys-discovery-wildbound',
    mapImage: '/roblox-experiences/wildbound-regions.png',
    legendImage: '/roblox-experiences/wildbound-map-pins.png',
    cinematicImage: '/roblox-experiences/wildbound-canon-gui1.png',
    pinKinds: [
      { id: 'location', icon: '⌂' },
      { id: 'camp', icon: '⚑' },
      { id: 'resource', icon: '◈' },
      { id: 'creature', icon: '◉' },
      { id: 'danger', icon: '▲' },
      { id: 'quest', icon: '!' },
    ],
    unlocks: [
      { count: 4, key: 'weep' },
      { count: 8, key: 'stakes' },
      { count: 12, key: 'archyda' },
      { count: 16, key: 'watcherVolcano' },
    ],
    gallery: [
      '/roblox-experiences/wildbound-icons2.png',
      '/roblox-experiences/wildbound-status-icons.png',
      '/roblox-experiences/wildbound-creature-icons.png',
      '/roblox-experiences/wildbound-toasts.png',
      '/roblox-experiences/wildbound-ui-buttons.png',
      '/roblox-experiences/wildbound-ui-dividers.png',
    ],
  },
};

function copyFor(locale, experience) {
  const wildbound = experience === 'wildbound';
  if (locale === 'id') {
    return {
      eyebrow: wildbound ? 'Peta Wildbound' : 'Peta penemuan',
      title: wildbound ? 'Rasakan zona liar Wildbound.' : 'Ungkap dunia lewat rasa ingin tahu.',
      intro: wildbound
        ? 'Gunakan pin taktis untuk menandai rute, ancaman, dan sumber daya. Semakin banyak marker, semakin luas intel peta.'
        : 'Pasang pin untuk area yang sudah kamu jelajahi. Semakin banyak penemuan, semakin besar dunia yang terbuka.',
      discovered: 'Area terungkap',
      discoveredSuffix: 'pin',
      clear: 'Reset peta',
      undo: 'Batalkan pin terakhir',
      fogOn: 'Aktifkan kabut',
      fogOff: 'Matikan kabut',
      adventuresMap: 'Buka peta Adventures',
      wildboundMap: 'Buka peta Wildbound',
      adventures: 'Masuk Adventures',
      wildbound: 'Masuk Wildbound',
      tip: 'Tip: zona gelap menandakan wilayah yang belum ditemukan.',
      pinLabel: 'Nama pin',
      pinLabelPlaceholder: 'Contoh: Sky City Gate',
      pinType: 'Tipe pin',
      shareLabel: 'Kode peta',
      copyCode: 'Salin kode',
      importCode: 'Muat kode',
      mapPreview: 'Pratinjau sinematik',
      unlockTitle: 'Progress membuka wilayah',
      unlocks: {
        sky: 'Sky City routes',
        watcher: 'Watcher/Purgess corridor',
        siluria: 'Siluria wetlands',
        gargantua: 'Gargantua frontier',
        weep: 'The Weep intel sweep',
        stakes: 'The Stakes route map',
        archyda: 'Archyda recon lanes',
        watcherVolcano: 'Watcher Volcano danger net',
      },
      iconographyTitle: 'Wildbound iconography pack',
    };
  }
  return {
    eyebrow: wildbound ? 'Wildbound tactical map' : 'Discovery map',
    title: wildbound ? 'Chart the wild, one marker at a time.' : 'Reveal the world through curiosity.',
    intro: wildbound
      ? 'Use tactical pins to mark routes, threats, and resources. As your markers grow, deeper Wildbound zones unlock.'
      : 'Pin explored areas as you discover them. The more you find, the more of the world unlocks.',
    discovered: 'Revealed areas',
    discoveredSuffix: 'pins',
    clear: 'Reset map',
    undo: 'Undo last pin',
    fogOn: 'Enable fog',
    fogOff: 'Disable fog',
    adventuresMap: 'Open Adventures map',
    wildboundMap: 'Open Wildbound map',
    adventures: 'Enter Adventures',
    wildbound: 'Enter Wildbound',
    tip: 'Tip: darker zones represent places not yet discovered.',
    pinLabel: 'Pin label',
    pinLabelPlaceholder: 'Example: Sky City Gate',
    pinType: 'Pin type',
    shareLabel: 'Map code',
    copyCode: 'Copy code',
    importCode: 'Load code',
    mapPreview: 'Cinematic preview',
    unlockTitle: 'Region unlock progress',
    unlocks: {
      sky: 'Sky City routes',
      watcher: 'Watcher/Purgess corridor',
      siluria: 'Siluria wetlands',
      gargantua: 'Gargantua frontier',
      weep: 'The Weep intel sweep',
      stakes: 'The Stakes route map',
      archyda: 'Archyda recon lanes',
      watcherVolcano: 'Watcher Volcano danger net',
    },
    iconographyTitle: 'Wildbound iconography pack',
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

export default function DiscoveryMapPage({ locale = 'en', experience = 'adventures' }) {
  const config = MAP_CONFIG[experience] || MAP_CONFIG.adventures;
  const t = copyFor(locale, experience);
  const STORAGE_KEY = `${config.storagePrefix}-pins-v1`;
  const FOG_KEY = `${config.storagePrefix}-fog-v1`;
  const KIND_KEY = `${config.storagePrefix}-kind-v1`;
  const LABEL_KEY = `${config.storagePrefix}-label-v1`;
  const [pins, setPins] = useState([]);
  const [fogEnabled, setFogEnabled] = useState(true);
  const [activeKind, setActiveKind] = useState(config.pinKinds[0].id);
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
      if (savedKind && config.pinKinds.some((kind) => kind.id === savedKind)) setActiveKind(savedKind);
      const savedLabel = localStorage.getItem(LABEL_KEY);
      if (savedLabel) setPinLabel(savedLabel);
    } catch {
      setPins([]);
    }
  }, [FOG_KEY, KIND_KEY, LABEL_KEY, STORAGE_KEY, config.pinKinds]);

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
  const unlocked = config.unlocks.filter((u) => pins.length >= u.count);
  const radius = experience === 'wildbound' ? 5.6 + Math.min(unlocked.length, 4) * 0.72 : 6.2 + Math.min(unlocked.length, 4) * 0.8;

  function addPin(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPins((prev) => [...prev, {
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      label: pinLabel.trim() || `${experience === 'wildbound' ? 'Marker' : 'Discovery'} ${prev.length + 1}`,
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

  return <CampaignShell locale={locale} site="author" path={config.path}>
    <section className={`${styles.section} ${styles.discoveryIntro}`}>
      <p className={styles.eyebrow}>{t.eyebrow}</p>
      <h1 className={styles.sectionTitle}>{t.title}</h1>
      <p>{t.intro}</p>
    </section>

    <section className={`${styles.section} ${styles.discoveryMapSection}`}>
      <div className={styles.discoveryModeSwitch}>
        <a className={experience === 'adventures' ? styles.activeMode : ''} href={localPath(locale, '/map')}>{t.adventuresMap}</a>
        <a className={experience === 'wildbound' ? styles.activeMode : ''} href={localPath(locale, '/map/wildbound')}>{t.wildboundMap}</a>
      </div>
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
            {config.pinKinds.map((kind) => <option key={kind.id} value={kind.id}>{kind.icon} {kind.id}</option>)}
          </select>
        </label>
      </div>

      <div className={`${styles.discoveryMapFrame} ${experience === 'wildbound' ? styles.discoveryMapFrameWildbound : ''}`} onClick={addPin} role="button" tabIndex={0} aria-label="Interactive discovery map">
        <div className={styles.discoveryMapImage} style={{ backgroundImage: `url(${config.mapImage})` }} />

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
          const pinKind = config.pinKinds.find((kind) => kind.id === pin.kind) || config.pinKinds[0];
          return <span key={`${pin.x}-${pin.y}-${i}`} className={`${styles.discoveryPin} ${experience === 'wildbound' ? styles.discoveryPinWildbound : ''}`} style={{ left: `${pin.x}%`, top: `${pin.y}%` }} title={pin.label}>{pinKind.icon}</span>;
        })}
      </div>

      <div className={styles.discoveryPreview}>
        <p className={styles.eyebrow}>{t.mapPreview}</p>
        <img src={config.cinematicImage} alt={`${experience} in-world preview`} />
      </div>

      <div className={styles.discoveryUnlocks}>
        <p className={styles.eyebrow}>{t.unlockTitle}</p>
        <ul>
          {config.unlocks.map((unlock) => {
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

      <img src={config.legendImage} alt={`${experience} pin icon set reference`} className={styles.discoveryLegend} />
      {experience === 'wildbound' && <div className={styles.discoveryAssetStack}>
        <p className={styles.eyebrow}>{t.iconographyTitle}</p>
        <div className={styles.discoveryAssetGrid}>
          {config.gallery.map((asset) => <img key={asset} src={asset} alt="Wildbound UI iconography board" />)}
        </div>
      </div>}
      <p className={styles.helpNote}>{t.tip}</p>

      <div className={styles.pipelineActions}>
        <a className={styles.primaryButton} href={experience === 'wildbound' ? EXPERIENCE_URLS.wildbound : EXPERIENCE_URLS.adventures} target="_blank" rel="noopener noreferrer">
          {experience === 'wildbound' ? t.wildbound : t.adventures} <Arrow />
        </a>
        <a className={styles.quietButton} href={experience === 'wildbound' ? EXPERIENCE_URLS.adventures : EXPERIENCE_URLS.wildbound} target="_blank" rel="noopener noreferrer">
          {experience === 'wildbound' ? t.adventures : t.wildbound} <Arrow />
        </a>
      </div>
    </section>
  </CampaignShell>;
}
