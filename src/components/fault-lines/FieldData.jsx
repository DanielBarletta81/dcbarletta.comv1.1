import { Arrow } from './CampaignShell';
import { EXPERIENCE_URLS, WORLD_URL, copy, localPath } from './content';
import styles from './fault-lines.module.css';

// Validated chart palette (dataviz six checks, dark surface #0f1217):
// copper #c97f33 / teal #2e9db6 — CVD ΔE 17.2, contrast ≥ 3:1.
const COPPER = '#c97f33';
const TEAL = '#2e9db6';
const SURFACE = '#0f1217';
const SPARK_DIM = '#565b63';

// Representative worldbook dataset — deterministic, not live telemetry.
const TREMOR = [
  1.2, 1.4, 1.1, 1.3, 1.6, 1.4, 1.7, 1.5, 1.8, 2.1, 1.9, 2.2,
  2.0, 2.4, 2.1, 2.6, 2.3, 2.8, 2.5, 2.2, 2.6, 2.9, 3.4, 3.1,
  3.8, 3.4, 4.2, 4.8, 5.6, 6.5, 7.4, 6.8, 5.9, 5.2, 4.4, 3.9,
  3.3, 2.9, 3.1, 2.7, 2.4, 2.5, 2.2, 2.0, 2.3, 1.9, 1.7, 1.8,
];
const TIDE = Array.from({ length: 25 }, (_, t) =>
  Math.round((1.9 + 1.5 * Math.sin((t / 12.4) * 2 * Math.PI - 1.1) + 0.3 * Math.sin((t / 6.2) * 2 * Math.PI)) * 100) / 100);
const TRANSECT = [
  ['Estuarine copepods', 342],
  ['Mangrove gastropods', 188],
  ['Juvenile mudskippers', 104],
  ['Fiddler crabs', 86],
  ['Wading birds', 41],
  ['Monitor lizards', 12],
];
const TILES = [
  { label: 'Seismic events logged', value: '1,284', delta: '+62 vs prior season', spark: [38, 41, 40, 44, 43, 47, 49, 48, 52, 55, 58, 62] },
  { label: 'Mean tidal range', value: '3.1 m', delta: 'spring tide +0.4 m', spark: [30, 33, 36, 34, 31, 29, 31, 34, 37, 36, 33, 34] },
  { label: 'Taxa recorded', value: '148', delta: '+9 this survey', spark: [112, 118, 121, 124, 127, 131, 133, 136, 139, 141, 144, 148] },
  { label: 'Pipeline uptime', value: '99.2%', delta: 'last 90 days', spark: [97.1, 98.4, 98.2, 98.9, 99.0, 98.7, 99.1, 99.3, 99.0, 99.2, 99.4, 99.2] },
];

function linePoints(values, { x0, x1, y0, y1, vMin, vMax, span }) {
  const steps = span ?? values.length - 1;
  return values.map((v, i) => [
    x0 + ((x1 - x0) * i) / steps,
    y1 - ((y1 - y0) * (v - vMin)) / (vMax - vMin),
  ]);
}
const toPolyline = (pts) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
const hourLabel = (h) => `${String(Math.floor(h)).padStart(2, '0')}:${h % 1 ? '30' : '00'}`;

function Sparkline({ values }) {
  const pts = linePoints(values, { x0: 2, x1: 98, y0: 3, y1: 25, vMin: Math.min(...values), vMax: Math.max(...values) });
  const [lx, ly] = pts[pts.length - 1];
  return <svg className={styles.statSpark} viewBox="0 0 100 28" role="img" aria-label="12-period trend">
    <polyline points={toPolyline(pts.slice(0, -1))} fill="none" stroke={SPARK_DIM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points={toPolyline(pts.slice(-2))} fill="none" stroke={COPPER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={lx} cy={ly} r="3.5" fill={COPPER} stroke={SURFACE} strokeWidth="2" />
  </svg>;
}

function DataTable({ caption, head, rows }) {
  return <details className={styles.vizData}>
    <summary>View data — {caption}</summary>
    <table>
      <thead><tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
      <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </details>;
}

function TremorChart() {
  const frame = { x0: 40, x1: 516, y0: 16, y1: 216, vMin: 0, vMax: 8, span: 48 };
  const pts = linePoints(TREMOR, frame);
  const peak = TREMOR.indexOf(Math.max(...TREMOR));
  const [px, py] = pts[peak];
  return <figure className={styles.vizFigure}>
    <svg className={styles.vizSvg} viewBox="0 0 540 260" role="img" aria-label="Line chart of tremor amplitude over 24 hours, peaking at 7.4 micrometers per second at 15:00">
      {[0, 2, 4, 6, 8].map((v) => {
        const y = frame.y1 - ((frame.y1 - frame.y0) * v) / 8;
        return <g key={v}>
          <line className={styles.vizGrline} x1={frame.x0} x2={frame.x1} y1={y} y2={y} />
          <text x={frame.x0 - 10} y={y + 3} textAnchor="end">{v}</text>
        </g>;
      })}
      {[0, 6, 12, 18, 24].map((h) => {
        const x = frame.x0 + ((frame.x1 - frame.x0) * h) / 24;
        return <text key={h} x={x} y={frame.y1 + 22} textAnchor="middle">{hourLabel(h)}</text>;
      })}
      <line className={styles.vizAxis} x1={frame.x0} x2={frame.x1} y1={frame.y1} y2={frame.y1} />
      <polyline points={toPolyline(pts)} fill="none" stroke={COPPER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle className={styles.vizMarker} cx={px} cy={py} r="4.5" fill={COPPER} stroke={SURFACE} strokeWidth="2">
        <title>{`${hourLabel(peak / 2)} — ${TREMOR[peak]} μm/s`}</title>
      </circle>
      <text className={styles.vizDirectLabel} x={px + 12} y={py - 6}>7.4 μm/s · {hourLabel(peak / 2)}</text>
      <text x={frame.x0 - 30} y={frame.y0 - 8}>μm/s</text>
    </svg>
    <DataTable caption="tremor amplitude" head={['Time', 'Amplitude (μm/s)']}
      rows={TREMOR.map((v, i) => [hourLabel(i / 2), v.toFixed(1)])} />
  </figure>;
}

function TideChart() {
  const frame = { x0: 40, x1: 516, y0: 16, y1: 216, vMin: 0, vMax: 4 };
  const pts = linePoints(TIDE, frame);
  const high = TIDE.indexOf(Math.max(...TIDE));
  const [hx, hy] = pts[high];
  const area = `${frame.x0},${frame.y1} ${toPolyline(pts)} ${frame.x1},${frame.y1}`;
  return <figure className={styles.vizFigure}>
    <svg className={styles.vizSvg} viewBox="0 0 540 260" role="img" aria-label="Area chart of tidal elevation over 24 hours, high water 3.2 meters at 06:00">
      {[0, 1, 2, 3, 4].map((v) => {
        const y = frame.y1 - ((frame.y1 - frame.y0) * v) / 4;
        return <g key={v}>
          <line className={styles.vizGrline} x1={frame.x0} x2={frame.x1} y1={y} y2={y} />
          <text x={frame.x0 - 8} y={y + 3} textAnchor="end">{v}</text>
        </g>;
      })}
      {[0, 6, 12, 18, 24].map((h) => {
        const x = frame.x0 + ((frame.x1 - frame.x0) * h) / 24;
        return <text key={h} x={x} y={frame.y1 + 20} textAnchor="middle">{hourLabel(h)}</text>;
      })}
      <line className={styles.vizAxis} x1={frame.x0} x2={frame.x1} y1={frame.y1} y2={frame.y1} />
      <polygon points={area} fill={TEAL} opacity="0.1" />
      <polyline points={toPolyline(pts)} fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle className={styles.vizMarker} cx={hx} cy={hy} r="4.5" fill={TEAL} stroke={SURFACE} strokeWidth="2">
        <title>{`${hourLabel(high)} — ${TIDE[high].toFixed(1)} m high water`}</title>
      </circle>
      <text className={styles.vizDirectLabel} x={hx + 10} y={hy - 8}>{TIDE[high].toFixed(1)} m</text>
      <text x={frame.x0 - 28} y={frame.y0 - 2}>m</text>
    </svg>
    <DataTable caption="tidal elevation" head={['Hour', 'Elevation (m)']}
      rows={TIDE.map((v, t) => [hourLabel(t), v.toFixed(2)])} />
  </figure>;
}

function TransectChart() {
  const x0 = 170;
  const x1 = 470;
  const max = 350;
  const barH = 18;
  const rowH = 38;
  return <figure className={styles.vizFigure}>
    <svg className={styles.vizSvg} viewBox="0 0 540 260" role="img" aria-label="Bar chart of organism counts along the estuary transect, from 342 estuarine copepods down to 12 monitor lizards">
      {TRANSECT.map(([name, count], i) => {
        const y = 14 + i * rowH;
        const w = ((x1 - x0) * count) / max;
        // 4px rounded data-end, square at the baseline (left edge).
        const r = Math.min(4, w / 2);
        const d = `M${x0},${y} h${(w - r).toFixed(1)} a${r},${r} 0 0 1 ${r},${r} v${barH - 2 * r} a${r},${r} 0 0 1 ${-r},${r} h${-(w - r).toFixed(1)} Z`;
        return <g key={name}>
          <text x={x0 - 10} y={y + barH / 2 + 3.5} textAnchor="end">{name}</text>
          <path className={styles.vizBar} d={d} fill={COPPER}><title>{`${name} — ${count}`}</title></path>
          <text className={styles.vizDirectLabel} x={x0 + w + 8} y={y + barH / 2 + 3.5}>{count}</text>
        </g>;
      })}
      <line className={styles.vizAxis} x1={x0} x2={x0} y1={8} y2={14 + TRANSECT.length * rowH - rowH + barH + 6} />
    </svg>
    <DataTable caption="transect counts" head={['Taxon', 'Count']} rows={TRANSECT} />
  </figure>;
}

export function FieldDataSection({ locale = 'en' }) {
  const c = copy[locale];
  return <section id="field-data" className={styles.section}>
    <div className={styles.sectionHeading}>
      <div>
        <p className={styles.eyebrow}>{c.vizLabel}</p>
        <h2 className={styles.sectionTitle}>{c.vizTitle}</h2>
      </div>
      <p>{c.vizIntro}</p>
    </div>
    <div className={styles.statRow}>
      {TILES.map((tile) => <article key={tile.label} className={`${styles.statTile} ${styles.revealCard}`}>
        <span className={styles.statLabel}>{tile.label}</span>
        <span className={styles.statValue}>{tile.value}</span>
        <span className={styles.statDelta}>{tile.delta}</span>
        <Sparkline values={tile.spark} />
      </article>)}
    </div>
    <div className={styles.vizGrid}>
      <article className={`${styles.vizCard} ${styles.revealCard}`}>
        <p className={styles.eyebrow}>Seismic / RSAM</p>
        <h3>Tremor amplitude — Sentry station, Watcher basin</h3>
        <p>24-hour window around a degassing event. Single series in copper; the peak is direct-labeled.</p>
        <TremorChart />
      </article>
      <article className={`${styles.vizCard} ${styles.revealCard}`}>
        <p className={styles.eyebrow}>Hydrology / Tide gauge</p>
        <h3>Tidal elevation — Siluria estuary</h3>
        <p>Mixed semidiurnal cycle; high water direct-labeled.</p>
        <TideChart />
      </article>
      <article className={`${styles.vizCard} ${styles.revealCard}`}>
        <p className={styles.eyebrow}>Ecology / Field survey</p>
        <h3>Transect counts — estuary margin</h3>
        <p>Organisms per 100 m transect, single survey morning.</p>
        <TransectChart />
      </article>
    </div>
    <p className={styles.vizNote}>{c.vizNote}</p>
  </section>;
}

export function ProjectsSection({ locale = 'en' }) {
  const c = copy[locale];
  const hrefs = {
    atlas: localPath(locale, '/atlas'),
    world: `${WORLD_URL}${localPath(locale)}`,
    wildbound: EXPERIENCE_URLS.wildbound,
  };
  return <section id="systems" className={styles.section}>
    <div className={styles.sectionHeading}>
      <div>
        <p className={styles.eyebrow}>{c.projectsLabel}</p>
        <h2 className={styles.sectionTitle}>{c.projectsTitle}</h2>
      </div>
      <p>{c.projectsIntro}</p>
    </div>
    <div className={styles.projectGrid}>
      {c.projects.map(([title, role, body, stack, linkKey, linkText]) => <article key={title} className={`${styles.projectCard} ${styles.revealCard}`}>
        <p className={styles.eyebrow}>{role}</p>
        <h3>{title}</h3>
        <p>{body}</p>
        <div className={styles.projectStack}>{stack.map((item) => <span key={item}>{item}</span>)}</div>
        {linkKey && <a className={styles.textLink} href={hrefs[linkKey]}>{linkText} <Arrow /></a>}
      </article>)}
    </div>
  </section>;
}
