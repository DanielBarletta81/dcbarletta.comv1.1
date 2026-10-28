'use client';

import { useMemo, useState, useEffect } from 'react';
import CampaignShell, { Arrow } from './CampaignShell';
import { EXPERIENCE_URLS, localPath } from './content';
import styles from './fault-lines.module.css';

const MAP_CONFIG = {
  adventures: {
    path: '/atlas',
    storagePrefix: 'tethys-discovery-adventures',
    mapImage: '/roblox-experiences/adventures-design-pack4.png',
    legendImage: '/roblox-experiences/adventures-pin-set-full.png',
    cinematicImage: '/roblox-experiences/adventures-icon2.png',
    pinKinds: [
      { id: 'location', icon: '📍', markerImage: '/roblox-experiences/adv-pin-location.png' },
      { id: 'warning', icon: '⚠️', markerImage: '/roblox-experiences/adv-pin-warning.png' },
      { id: 'discovery', icon: '⭐', markerImage: '/roblox-experiences/adv-pin-star.png' },
      { id: 'buddy', icon: '🐾', markerImage: '/roblox-experiences/adv-pin-paw.png' },
      { id: 'nature', icon: '🌿', markerImage: '/roblox-experiences/adv-pin-leaf.png' },
      { id: 'water', icon: '🐟', markerImage: '/roblox-experiences/adv-pin-fish.png' },
    ],
    unlocks: [
      { count: 3, key: 'sky' },
      { count: 6, key: 'watcher' },
      { count: 10, key: 'siluria' },
      { count: 14, key: 'gargantua' },
    ],
    gallery: [
      '/roblox-experiences/adventures-icon-typography.png',
      '/roblox-experiences/adventures-roblox-design-pack.png',
      '/roblox-experiences/adventures-design-pack4.png',
      '/roblox-experiences/Adventures_Thumbnail_A1.png',
      '/roblox-experiences/The Lost Crossing_ Tethys Adventures-1.png',
    ],
  },
  wildbound: {
    path: '/map/wildbound',
    storagePrefix: 'tethys-discovery-wildbound',
    mapImage: '/roblox-experiences/wildbound-regions.png',
    legendImage: '/roblox-experiences/wildbound-map-pins.png',
    cinematicImage: '/roblox-experiences/wildbound-canon-gui1.png',
    pinKinds: [
      { id: 'location', icon: '⌂', markerImage: '/roblox-experiences/wb-pin-location.png' },
      { id: 'camp', icon: '⚑', markerImage: '/roblox-experiences/wb-pin-camp.png' },
      { id: 'resource', icon: '◈', markerImage: '/roblox-experiences/wb-pin-resource.png' },
      { id: 'creature', icon: '◉', markerImage: '/roblox-experiences/wb-pin-creature.png' },
      { id: 'danger', icon: '▲', markerImage: '/roblox-experiences/wb-pin-danger.png' },
      { id: 'quest', icon: '!', markerImage: '/roblox-experiences/wb-pin-quest.png' },
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

const ADVENTURES_FOSSIL_SITES = [
  { id: 'sky-spire', name: 'Sky Spire Cliffs', clue: 'Wind-carved ledges above waterfall valleys.' },
  { id: 'weep-bed', name: 'The Weep Bedrock', clue: 'Layered stone with shallow fossil seams.' },
  { id: 'mushroom-ridge', name: 'Mushroom Ridge', clue: 'Soft clay pockets near glowcap groves.' },
  { id: 'rope-canyon', name: 'Rope-Bridge Canyon', clue: 'Ancient strata hidden near rope crossings.' },
];

const ADVENTURES_COLLECTIONS = [
  { id: 'fossils', name: 'Fossils', note: 'Track rare shells, bones, and trace prints.' },
  { id: 'plants', name: 'Plants', note: 'Catalog unique leaves and growth forms.' },
  { id: 'creatures', name: 'Creatures', note: 'Log companion sightings and biome wildlife.' },
];

const ADVENTURES_BADGES = [
  { id: 'first-find', name: 'First Find', need: 1 },
  { id: 'trail-scout', name: 'Trail Scout', need: 4 },
  { id: 'fossil-keeper', name: 'Fossil Keeper', need: 8 },
  { id: 'atlas-guide', name: 'Atlas Guide', need: 12 },
];

const ADVENTURES_LEARNING_CARDS = [
  { id: 'fossils', title: 'Fossil clue', text: 'Fossils are evidence of ancient life preserved in stone over long periods of time.' },
  { id: 'delta', title: 'Water world clue', text: 'Deltas form where rivers slow down and leave layers of sand and mud behind.' },
  { id: 'adapt', title: 'Survival clue', text: 'Different habitats encourage different traits, so creatures adapt to where they live.' },
];

const ADVENTURES_MEMORY_PROMPTS = [
  { id: 'kindness', text: 'I helped my buddy explorer today.' },
  { id: 'curiosity', text: 'I asked one new science question.' },
  { id: 'bravery', text: 'I explored a new route and kept going.' },
];

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
      tip: wildbound ? 'Tip: jalur gelap menandakan wilayah yang belum kamu petakan.' : 'Tip: gunakan pin warna-warni untuk membuka area baru di peta petualangan.',
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
      iconographyTitle: wildbound ? 'Paket ikonografi Wildbound' : 'Paket visual Adventures',
      strykerNote: 'Stryker adalah hibrida pterosaur: dua kaki belakang dengan sayap membran terbentang, tanpa lengan depan tambahan.',
      experienceMood: wildbound ? 'Mode survival remaja 13+' : 'Mode petualangan semua umur',
      ageGateNote: wildbound ? 'Jalur Wildbound ditujukan untuk pemain 13+ dengan sistem lebih berat.' : 'Jalur Adventures dibuat lebih lembut, playful, dan ramah keluarga.',
      fossilTitle: 'Lokasi fosil',
      collectionTitle: 'Koleksi penemuan',
      badgeTitle: 'Badge petualang',
      markDone: 'Tandai selesai',
      markUndo: 'Batalkan',
      missionTitle: 'Misi explorer',
      missionBody: 'Kumpulkan pin, temukan fosil, dan isi koleksi untuk membuka badge baru.',
      learningTitle: 'Belajar sambil bermain',
      memoryTitle: 'Kenangan petualangan',
      addMemory: 'Tambah ke kenangan',
      progressTitle: 'Progress hari ini',
      pinsDone: 'pin peta',
      fossilsDone: 'lokasi fosil',
      collectionsDone: 'koleksi',
      welcomeTitle: 'Selamat datang di Little Tethys Atlas',
      welcomeBody: 'Tempat ini dibuat untuk petualang muda: aman, menyenangkan, dan penuh penemuan.',
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
    tip: wildbound ? 'Tip: darker corridors represent unmapped threat zones.' : 'Tip: use colorful pins to reveal more of your adventure map.',
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
    iconographyTitle: wildbound ? 'Wildbound iconography pack' : 'Adventures style pack',
    strykerNote: 'Stryker is a pterosaur hybrid: two hind limbs and stretched membrane wings, with no extra front limbs.',
    experienceMood: wildbound ? 'Teen 13+ survival mode' : 'All-ages adventure mode',
    ageGateNote: wildbound ? 'Wildbound is a gated 13+ path with heavier survival pressure.' : 'Adventures is intentionally soft, playful, and family-friendly.',
    fossilTitle: 'Fossil sites',
    collectionTitle: 'Collection tracker',
    badgeTitle: 'Adventure badges',
    markDone: 'Mark complete',
    markUndo: 'Undo',
    missionTitle: 'Explorer mission board',
    missionBody: 'Place map pins, discover fossil sites, and complete collections to unlock new badges.',
    learningTitle: 'Learn while you play',
    memoryTitle: 'Adventure memories',
    addMemory: 'Add to memory board',
    progressTitle: 'Today\'s progress',
    pinsDone: 'map pins',
    fossilsDone: 'fossil sites',
    collectionsDone: 'collections',
    welcomeTitle: 'Welcome to Little Tethys Atlas',
    welcomeBody: 'This space is built for young explorers: safe, playful, and full of discovery.',
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
  const FOSSIL_KEY = `${config.storagePrefix}-fossils-v1`;
  const COLLECTION_KEY = `${config.storagePrefix}-collections-v1`;
  const MEMORY_KEY = `${config.storagePrefix}-memory-v1`;
  const [pins, setPins] = useState([]);
  const [fogEnabled, setFogEnabled] = useState(true);
  const [activeKind, setActiveKind] = useState(config.pinKinds[0].id);
  const [pinLabel, setPinLabel] = useState('');
  const [mapCodeInput, setMapCodeInput] = useState('');
  const [mapCode, setMapCode] = useState('');
  const [copyState, setCopyState] = useState('idle');
  const [doneFossils, setDoneFossils] = useState([]);
  const [doneCollections, setDoneCollections] = useState([]);
  const [memoryBoard, setMemoryBoard] = useState([]);

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
      const savedFossils = JSON.parse(localStorage.getItem(FOSSIL_KEY) || '[]');
      if (Array.isArray(savedFossils)) setDoneFossils(savedFossils);
      const savedCollections = JSON.parse(localStorage.getItem(COLLECTION_KEY) || '[]');
      if (Array.isArray(savedCollections)) setDoneCollections(savedCollections);
      const savedMemory = JSON.parse(localStorage.getItem(MEMORY_KEY) || '[]');
      if (Array.isArray(savedMemory)) setMemoryBoard(savedMemory);
    } catch {
      setPins([]);
    }
  }, [COLLECTION_KEY, FOG_KEY, FOSSIL_KEY, KIND_KEY, LABEL_KEY, MEMORY_KEY, STORAGE_KEY, config.pinKinds]);

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
  useEffect(() => {
    try { localStorage.setItem(FOSSIL_KEY, JSON.stringify(doneFossils)); } catch {}
  }, [FOSSIL_KEY, doneFossils]);
  useEffect(() => {
    try { localStorage.setItem(COLLECTION_KEY, JSON.stringify(doneCollections)); } catch {}
  }, [COLLECTION_KEY, doneCollections]);
  useEffect(() => {
    try { localStorage.setItem(MEMORY_KEY, JSON.stringify(memoryBoard)); } catch {}
  }, [MEMORY_KEY, memoryBoard]);

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

  function toggleItem(id, setItems) {
    setItems((prev) => (prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]));
  }

  function addMemory(entry) {
    setMemoryBoard((prev) => (prev.includes(entry) ? prev : [...prev, entry]));
  }

  const mapSectionClass = `${styles.section} ${styles.discoveryMapSection} ${experience === 'adventures' ? styles.discoveryMapSectionAdventures : styles.discoveryMapSectionWildbound}`;
  const progressSnapshot = {
    pins: pins.length,
    fossils: doneFossils.length,
    collections: doneCollections.length,
  };

  return <CampaignShell locale={locale} site="author" path={config.path}>
    <section className={`${styles.section} ${styles.discoveryIntro}`}>
      <p className={styles.eyebrow}>{t.eyebrow}</p>
      <h1 className={styles.sectionTitle}>{t.title}</h1>
      <p>{t.intro}</p>
      <p className={styles.muted}>{t.experienceMood} · {t.ageGateNote}</p>
      {experience === 'adventures' && <div className={styles.discoveryWelcome}>
        <h3>{t.welcomeTitle}</h3>
        <p>{t.welcomeBody}</p>
      </div>}
    </section>

    <section className={mapSectionClass}>
      <div className={styles.discoveryModeSwitch}>
        <a className={experience === 'adventures' ? styles.activeMode : ''} href={localPath(locale, '/atlas')}>{t.adventuresMap}</a>
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
          <rect width="100" height="100" fill={experience === 'wildbound' ? 'rgba(6,8,12,0.86)' : 'rgba(16,22,20,0.62)'} mask={`url(#${maskId})`} />
        </svg>}

        {pins.map((pin, i) => {
          const pinKind = config.pinKinds.find((kind) => kind.id === pin.kind) || config.pinKinds[0];
          return <span key={`${pin.x}-${pin.y}-${i}`} className={`${styles.discoveryPin} ${experience === 'wildbound' ? styles.discoveryPinWildbound : styles.discoveryPinAdventures}`} style={{ left: `${pin.x}%`, top: `${pin.y}%` }} title={pin.label}>
            {pinKind.markerImage
              ? <img src={pinKind.markerImage} alt={`${pin.kind} marker`} className={styles.discoveryPinImage} />
              : pinKind.icon}
          </span>;
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
      <div className={styles.discoveryAssetStack}>
        <p className={styles.eyebrow}>{t.iconographyTitle}</p>
        <div className={styles.discoveryAssetGrid}>
          {config.gallery.map((asset) => <img key={asset} src={asset} alt={`${experience} UI iconography board`} />)}
        </div>
      </div>
      <p className={styles.discoveryStryker}>{t.strykerNote}</p>
      <p className={styles.helpNote}>{t.tip}</p>

      <div className={styles.pipelineActions}>
        <a className={styles.primaryButton} href={experience === 'wildbound' ? EXPERIENCE_URLS.wildbound : EXPERIENCE_URLS.adventures} target="_blank" rel="noopener noreferrer">
          {experience === 'wildbound' ? t.wildbound : t.adventures} <Arrow />
        </a>
        <a className={styles.quietButton} href={experience === 'wildbound' ? EXPERIENCE_URLS.adventures : EXPERIENCE_URLS.wildbound} target="_blank" rel="noopener noreferrer">
          {experience === 'wildbound' ? t.adventures : t.wildbound} <Arrow />
        </a>
      </div>

      {experience === 'adventures' && <section className={styles.discoveryKidAtlas}>
        <div className={styles.discoveryKidColumns}>
          <article className={styles.discoveryKidCard}>
            <p className={styles.eyebrow}>{t.fossilTitle}</p>
            <ul>
              {ADVENTURES_FOSSIL_SITES.map((site) => {
                const done = doneFossils.includes(site.id);
                return <li key={site.id}>
                  <div>
                    <strong>{site.name}</strong>
                    <span>{site.clue}</span>
                  </div>
                  <button onClick={() => toggleItem(site.id, setDoneFossils)}>{done ? t.markUndo : t.markDone}</button>
                </li>;
              })}
            </ul>
          </article>

          <article className={styles.discoveryKidCard}>
            <p className={styles.eyebrow}>{t.collectionTitle}</p>
            <ul>
              {ADVENTURES_COLLECTIONS.map((item) => {
                const done = doneCollections.includes(item.id);
                return <li key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.note}</span>
                  </div>
                  <button onClick={() => toggleItem(item.id, setDoneCollections)}>{done ? t.markUndo : t.markDone}</button>
                </li>;
              })}
            </ul>
          </article>
        </div>

        <article className={styles.discoveryKidBadges}>
          <p className={styles.eyebrow}>{t.missionTitle}</p>
          <p>{t.missionBody}</p>
          <div className={styles.discoveryProgressRow}>
            <span>{t.progressTitle}</span>
            <strong>{progressSnapshot.pins} {t.pinsDone}</strong>
            <strong>{progressSnapshot.fossils} {t.fossilsDone}</strong>
            <strong>{progressSnapshot.collections} {t.collectionsDone}</strong>
          </div>
        </article>

        <article className={styles.discoveryKidBadges}>
          <p className={styles.eyebrow}>{t.badgeTitle}</p>
          <div>
            {ADVENTURES_BADGES.map((badge) => {
              const unlockedBadge = pins.length >= badge.need;
              return <span key={badge.id} className={unlockedBadge ? styles.badgeOpen : styles.badgeLocked}>
                {badge.name} · {badge.need}
              </span>;
            })}
          </div>
        </article>

        <article className={styles.discoveryKidBadges}>
          <p className={styles.eyebrow}>{t.learningTitle}</p>
          <div className={styles.discoveryLearningGrid}>
            {ADVENTURES_LEARNING_CARDS.map((card) => <div key={card.id} className={styles.discoveryLearningCard}>
              <strong>{card.title}</strong>
              <p>{card.text}</p>
            </div>)}
          </div>
        </article>

        <article className={styles.discoveryKidBadges}>
          <p className={styles.eyebrow}>{t.memoryTitle}</p>
          <div className={styles.discoveryMemoryActions}>
            {ADVENTURES_MEMORY_PROMPTS.map((prompt) => <button key={prompt.id} onClick={() => addMemory(prompt.text)}>{t.addMemory}</button>)}
          </div>
          <ul className={styles.discoveryMemoryBoard}>
            {memoryBoard.length ? memoryBoard.map((entry) => <li key={entry}>{entry}</li>) : <li>{locale === 'id' ? 'Belum ada kenangan. Tambahkan momen pertama!' : 'No memories yet. Add your first explorer moment!'}</li>}
          </ul>
        </article>
      </section>}
    </section>
  </CampaignShell>;
}
