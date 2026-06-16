import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';

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
        'Official author site for D.C. Barletta — speculative fiction, ecology, and ancient world-building.',
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
    <main style={{ padding: '72px 24px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '80px' }}>
          <div style={{ fontFamily: 'var(--font-display), serif', fontSize: '18px', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
            D.C. Barletta
          </div>
          <nav aria-label="Site navigation" style={{ display: 'flex', gap: '24px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', alignItems: 'center' }}>
            <Link href="/books">Books</Link>
            <Link href="/portfolio">Portfolio</Link>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <ThemeToggle />
          </nav>
        </header>

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
            <Link
              href="/books"
              style={{ padding: '12px 20px', borderRadius: '999px', border: '1px solid var(--accent-dim)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '12px', color: 'var(--text)' }}
            >
              Read the book
            </Link>
            <a
              href="https://worldoftethys.com"
              style={{ padding: '12px 20px', borderRadius: '999px', border: '1px solid var(--text)', background: 'var(--text)', color: 'var(--bg)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '12px' }}
            >
              Enter the world
            </a>
          </div>
        </section>

        <section id="about" aria-labelledby="about-heading" style={{ marginBottom: '96px' }}>
          <h2 id="about-heading" style={heading}>About</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '720px' }}>
            I write speculative fiction where worlds behave like real systems: ancient ocean basins, living ecologies,
            contested food webs, and the slow memory of geography. World of Tethys is my primary series —
            science fiction rooted in Earth systems science, named for the ancient Tethys Sea that once divided
            the continents.
          </p>
        </section>

        <section id="work" aria-labelledby="work-heading" style={{ marginBottom: '96px' }}>
          <h2 id="work-heading" style={heading}>The Work</h2>
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <article style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>
                World of Tethys
              </p>
              <h3 style={{ fontSize: '16px', margin: '8px 0', fontWeight: 600, color: 'var(--text)' }}>
                Book One: Sky City
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                A living world of engineered cities, ancient creatures, and contested survival.
              </p>
              <a href="https://worldoftethys.com" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>
                Enter the world
              </a>
            </article>
            <article style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>
                Ongoing Series
              </p>
              <h3 style={{ fontSize: '16px', margin: '8px 0', fontWeight: 600, color: 'var(--text)' }}>
                Expanded world systems
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Field notes, systems, and experimental formats tied to the series.
              </p>
            </article>
          </div>
        </section>

        <section aria-labelledby="philosophy-heading" style={{ marginBottom: '96px' }}>
          <h2 id="philosophy-heading" style={heading}>Philosophy</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '720px', fontStyle: 'italic' }}>
            Good science fiction does not explain everything. It builds enough structure that the world explains itself.
          </p>
        </section>

        <footer id="contact" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--text-subtle)' }}>
            Books · Writing · Contact
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-subtle)', marginTop: '12px' }}>
            © D.C. Barletta
          </p>
        </footer>

      </div>
    </main>
  );
}

