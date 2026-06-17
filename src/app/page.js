import Link from 'next/link';
import InteractiveCard from '../components/InteractiveCard';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://dcbarletta.com/#author',
      name: 'D.C. Barletta',
      url: 'https://dcbarletta.com',
      jobTitle: 'Author',
      description:
        'Speculative fiction author of the World of Tethys series. Science fiction grounded in ecology, ancient ocean systems, and the science of survival.',
      sameAs: ['https://worldoftethys.com']
    },
    {
      '@type': 'WebSite',
      '@id': 'https://dcbarletta.com/#website',
      url: 'https://dcbarletta.com',
      name: 'D.C. Barletta',
      description:
        'Official author site for D.C. Barletta \u2014 speculative fiction, ecology, and ancient world-building.',
      author: { '@id': 'https://dcbarletta.com/#author' }
    }
  ]
};

const heading = {
  fontFamily: 'var(--font-display), serif',
  fontSize: '28px',
  margin: '0 0 12px',
  color: 'var(--text)'
};

export default function Home() {
  return (
    <main style={{ padding: '48px 24px 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        <section aria-labelledby="hero-heading" style={{ marginBottom: '96px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>
            Author of World of Tethys
          </p>
          <h1
            id="hero-heading"
            style={{ fontFamily: 'var(--font-display), serif', fontSize: '54px', margin: '16px 0 20px', color: 'var(--text)' }}
          >
            Speculative fiction grounded in ecology, systems, and survival.
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '640px' }}>
            I write worlds where environments remember, cities control, and people learn the cost of order.
          </p>
          <div style={{ marginTop: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/books" className="btn btn--outline">
              Read the book
            </Link>
            <a href="https://worldoftethys.com" className="btn btn--filled">
              Enter the world
            </a>
          </div>
        </section>

        <section id="about" aria-labelledby="about-heading" style={{ marginBottom: '96px' }}>
          <h2 id="about-heading" style={heading}>About</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '720px' }}>
            I write speculative fiction where worlds behave like real systems: ancient ocean basins, living ecologies,
            contested food webs, and the slow memory of geography. World of Tethys is my primary series \u2014
            science fiction rooted in Earth systems science, named for the ancient Tethys Sea that once divided
            the continents.
          </p>
        </section>

        <section id="work" aria-labelledby="work-heading" style={{ marginBottom: '96px' }}>
          <h2 id="work-heading" style={heading}>The Work</h2>
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <InteractiveCard label="World of Tethys \u2014 Sky City" glowColor="var(--accent)">
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)', margin: '0 0 8px' }}>
                World of Tethys
              </p>
              <h3 style={{ fontSize: '16px', margin: '0 0 8px', fontWeight: 600, color: 'var(--text)' }}>
                Book One: Sky City
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 12px' }}>
                A living world of engineered cities, ancient creatures, and contested survival.
              </p>
              <a href="https://worldoftethys.com" className="nav-link">
                Enter the world
              </a>
            </InteractiveCard>

            <InteractiveCard label="Ongoing Series">
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)', margin: '0 0 8px' }}>
                Ongoing Series
              </p>
              <h3 style={{ fontSize: '16px', margin: '0 0 8px', fontWeight: 600, color: 'var(--text)' }}>
                Expanded world systems
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
                Field notes, systems, and experimental formats tied to the series.
              </p>
            </InteractiveCard>
          </div>
        </section>

        <section aria-labelledby="philosophy-heading" style={{ marginBottom: '96px' }}>
          <h2 id="philosophy-heading" style={heading}>Philosophy</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '720px', fontStyle: 'italic' }}>
            Good science fiction does not explain everything. It builds enough structure that the world explains itself.
          </p>
        </section>

      </div>
    </main>
  );
}
