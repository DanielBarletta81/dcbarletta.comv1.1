import InteractiveCard from '../../components/InteractiveCard';

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
    <main style={{ padding: '48px 24px 0' }}>
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>

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

          <InteractiveCard label="Signal density visualization">
            <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)', margin: '0 0 16px' }}>
              Signal density
            </h2>
            <svg viewBox="0 0 320 120" role="img" aria-label="Signal density timeline" style={{ width: '100%' }}>
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
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', marginBottom: 0 }}>
              Field signals accumulate in bursts, with periodic decay cycles.
            </p>
          </InteractiveCard>

          <InteractiveCard label="System topology">
            <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)', margin: '0 0 16px' }}>
              System topology
            </h2>
            <svg viewBox="0 0 320 160" role="img" aria-label="System topology" style={{ width: '100%' }}>
              <rect x="10" y="10" width="300" height="140" rx="16" style={{ fill: 'none', stroke: 'var(--border)' }} />
              {systems.map((node, idx) => (
                <g key={node.id}>
                  <circle cx={node.x * 3} cy={node.y * 2} r={8 + node.value * 10} style={{ fill: 'var(--text)', opacity: 0.1 }} />
                  <circle cx={node.x * 3} cy={node.y * 2} r="6" style={{ fill: 'var(--text)' }} />
                  <text x={node.x * 3 + 10} y={node.y * 2 + 4} fontSize="10" style={{ fill: 'var(--text)' }}>
                    {node.id}
                  </text>
                  {idx < systems.length - 1 && (
                    <line
                      x1={node.x * 3} y1={node.y * 2}
                      x2={systems[idx + 1].x * 3} y2={systems[idx + 1].y * 2}
                      style={{ stroke: 'var(--border)' }} strokeWidth="1.2"
                    />
                  )}
                </g>
              ))}
            </svg>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', marginBottom: 0 }}>
              Systems interact with different intensities rather than fixed hierarchies.
            </p>
          </InteractiveCard>

          <InteractiveCard label="Transformation pipeline">
            <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)', margin: '0 0 16px' }}>
              Transformation pipeline
            </h2>
            <div style={{ display: 'grid', gap: '12px' }}>
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
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', marginBottom: 0 }}>
              Raw inputs compress into stable behaviors that can be expressed in narrative.
            </p>
          </InteractiveCard>

        </section>

        <section style={{ marginBottom: '80px' }}>
          <InteractiveCard label="Skills in context">
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)', margin: '0 0 12px' }}>
              Skills in context
            </p>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', margin: 0 }}>
              System design, data pipelines, interactive visualization, and narrative integration.
              I translate research into tooling and world logic that stays legible.
            </p>
          </InteractiveCard>
        </section>

      </div>
    </main>
  );
}
