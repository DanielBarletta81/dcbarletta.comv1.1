import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';

export const metadata = {
  title: 'Portfolio',
  description:
    'Portfolio of D.C. Barletta \u2014 data visualization, systems design, and narrative transformation. Interactive models of world systems built alongside the World of Tethys series.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio \u2014 D.C. Barletta',
    description: 'Data visualization, systems design, and narrative transformation tools.',
    url: 'https://dcbarletta.com/portfolio'
  }
};

const chartData = [12, 18, 9, 22, 26, 17, 14, 28, 24, 19];
const maxValue = Math.max(...chartData);

const systems = [
  { id: 'Water', x: 18, y: 22, value: 0.72 },
  { id: 'Memory', x: 42, y: 14, value: 0.55 },
  { id: 'Pressure', x: 62, y: 28, value: 0.81 },
  { id: 'Exchange', x: 76, y: 56, value: 0.63 },
  { id: 'Decay', x: 30, y: 64, value: 0.48 }
];

const transformations = [
  { label: 'Input', value: 42 },
  { label: 'Signal', value: 36 },
  { label: 'Pattern', value: 27 },
  { label: 'Behavior', value: 19 }
];

export default function PortfolioPage() {
  return (
    <main style={{ padding: '72px 24px' }}>
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>

        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '64px' }}>
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-display), serif', fontSize: '18px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--text)' }}
          >
            D.C. Barletta
          </Link>
          <nav aria-label="Site navigation" style={{ display: 'flex', gap: '24px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', alignItems: 'center' }}>
            <Link href="/">Home</Link>
            <Link href="/books">Books</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/contact">Contact</Link>
            <ThemeToggle />
          </nav>
        </header>

        <section aria-labelledby="portfolio-heading" style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>
            Portfolio
          </p>
          <h1
            id="portfolio-heading"
            style={{ fontFamily: 'var(--font-display), serif', fontSize: '44px', margin: '16px 0 12px', color: 'var(--text)' }}
          >
            Data visualization + transformation
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '700px' }}>
            I model narrative systems as data. These samples show how inputs become readable
            signals, and how a world can express transformation over time.
          </p>
        </section>

        <section aria-label="Visualization samples" style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '64px' }}>

          <article style={{ padding: '24px', borderRadius: '18px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)', margin: 0 }}>
              Signal density
            </h2>
            <svg viewBox="0 0 320 120" role="img" aria-label="Signal density timeline" style={{ width: '100%', marginTop: '16px' }}>
              <polyline
                fill="none"
                style={{ stroke: 'var(--text)' }}
                strokeWidth="2"
                points={chartData
                  .map((value, index) => {
                    const x = 20 + index * 28;
                    const y = 100 - (value / maxValue) * 70;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
              {chartData.map((value, index) => {
                const x = 20 + index * 28;
                const y = 100 - (value / maxValue) * 70;
                return <circle key={value + index} cx={x} cy={y} r="3" style={{ fill: 'var(--accent)' }} />;
              })}
              <line x1="20" y1="100" x2="300" y2="100" style={{ stroke: 'var(--border)' }} strokeWidth="1" />
            </svg>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Field signals accumulate in bursts, with periodic decay cycles.
            </p>
          </article>

          <article style={{ padding: '24px', borderRadius: '18px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)', margin: 0 }}>
              System topology
            </h2>
            <svg viewBox="0 0 320 160" role="img" aria-label="System topology" style={{ width: '100%', marginTop: '16px' }}>
              <rect x="10" y="10" width="300" height="140" rx="16" style={{ fill: 'var(--bg-card)', stroke: 'var(--border)' }} />
              {systems.map((node, idx) => (
                <g key={node.id}>
                  <circle cx={node.x * 3} cy={node.y * 2} r={8 + node.value * 10} style={{ fill: 'var(--text)', opacity: 0.1 }} />
                  <circle cx={node.x * 3} cy={node.y * 2} r="6" style={{ fill: 'var(--text)' }} />
                  <text x={node.x * 3 + 10} y={node.y * 2 + 4} fontSize="10" style={{ fill: 'var(--text)' }}>
                    {node.id}
                  </text>
                  {idx < systems.length - 1 && (
                    <line
                      x1={node.x * 3}
                      y1={node.y * 2}
                      x2={systems[idx + 1].x * 3}
                      y2={systems[idx + 1].y * 2}
                      style={{ stroke: 'var(--border)' }}
                      strokeWidth="1.2"
                    />
                  )}
                </g>
              ))}
            </svg>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Systems interact with different intensities rather than fixed hierarchies.
            </p>
          </article>

          <article style={{ padding: '24px', borderRadius: '18px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)', margin: 0 }}>
              Transformation pipeline
            </h2>
            <div style={{ marginTop: '16px', display: 'grid', gap: '12px' }}>
              {transformations.map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ minWidth: '80px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>
                    {item.label}
                  </div>
                  <div style={{ flex: 1, background: 'var(--border)', height: '10px', borderRadius: '999px' }}>
                    <div
                      style={{
                        width: `${(item.value / transformations[0].value) * 100}%`,
                        height: '100%',
                        borderRadius: '999px',
                        background: 'var(--accent)'
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.value}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
              Raw inputs compress into stable behaviors that can be expressed in narrative.
            </p>
          </article>

        </section>

        <section style={{ padding: '24px', borderRadius: '18px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>
            Skills in context
          </p>
          <div style={{ display: 'grid', gap: '16px', marginTop: '12px' }}>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
              System design, data pipelines, interactive visualization, and narrative integration.
              I translate research into tooling and world logic that stays legible.
            </p>
          </div>
        </section>

        <footer style={{ marginTop: '72px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--text-subtle)' }}>
            \u00a9 D.C. Barletta
          </p>
        </footer>

      </div>
    </main>
  );
}
