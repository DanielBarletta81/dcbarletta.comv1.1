import Link from 'next/link';

const sectionTitleStyle = {
  fontFamily: 'var(--font-display), serif',
  fontSize: '28px',
  margin: '0 0 12px'
};

export default function Home() {
  return (
    <main style={{ padding: '72px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '80px' }}>
          <div style={{ fontFamily: 'var(--font-display), serif', fontSize: '18px', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
            Daniel C. Barletta
          </div>
          <nav style={{ display: 'flex', gap: '24px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            <Link href="/books">Books</Link>
            <Link href="/portfolio">Portfolio</Link>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section style={{ marginBottom: '96px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7c6f62' }}>
            Author of World of Tethys
          </p>
          <h1 style={{ fontFamily: 'var(--font-display), serif', fontSize: '54px', margin: '16px 0 20px' }}>
            Speculative fiction grounded in ecology, systems, and survival.
          </h1>
          <p style={{ fontSize: '18px', color: '#433a32', maxWidth: '640px' }}>
            I write worlds where environments remember, cities control, and people learn the cost of order.
          </p>
          <div style={{ marginTop: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/books"
              style={{ padding: '12px 20px', borderRadius: '999px', border: '1px solid #bcae9b', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '12px' }}
            >
              Read the book
            </Link>
            <a
              href="https://worldoftethys.com"
              style={{ padding: '12px 20px', borderRadius: '999px', border: '1px solid #1e1b16', background: '#1e1b16', color: '#f6f2ea', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '12px' }}
            >
              Enter the world
            </a>
          </div>
        </section>

        <section id="about" style={{ marginBottom: '96px' }}>
          <h2 style={sectionTitleStyle}>About</h2>
          <p style={{ fontSize: '16px', color: '#3f3730', maxWidth: '720px' }}>
            I build worlds that behave like real systems: water, terrain, food webs, memory, and power.
            World of Tethys is my primary series.
          </p>
        </section>

        <section id="work" style={{ marginBottom: '96px' }}>
          <h2 style={sectionTitleStyle}>The Work</h2>
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid #d9cbb8', background: '#fbf8f2' }}>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#7c6f62' }}>
                World of Tethys
              </p>
              <p style={{ fontSize: '16px', margin: '8px 0', fontWeight: 600 }}>
                Book One: Sky City
              </p>
              <p style={{ fontSize: '14px', color: '#5a5046' }}>
                A living world of engineered cities, ancient creatures, and contested survival.
              </p>
              <a href="https://worldoftethys.com" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                Enter the world
              </a>
            </div>
            <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid #d9cbb8', background: '#fbf8f2' }}>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#7c6f62' }}>
                Ongoing Series
              </p>
              <p style={{ fontSize: '16px', margin: '8px 0', fontWeight: 600 }}>
                Expanded world systems
              </p>
              <p style={{ fontSize: '14px', color: '#5a5046' }}>
                Field notes, systems, and experimental formats tied to the series.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '96px' }}>
          <h2 style={sectionTitleStyle}>Philosophy</h2>
          <p style={{ fontSize: '16px', color: '#3f3730', maxWidth: '720px', fontStyle: 'italic' }}>
            Good science fiction does not explain everything. It builds enough structure that the world explains itself.
          </p>
        </section>

        <footer id="contact" style={{ borderTop: '1px solid #e2d7c6', paddingTop: '32px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#7c6f62' }}>
            Books · Writing · Contact
          </p>
          <p style={{ fontSize: '12px', color: '#7c6f62', marginTop: '12px' }}>
            © Daniel C. Barletta
          </p>
        </footer>
      </div>
    </main>
  );
}
