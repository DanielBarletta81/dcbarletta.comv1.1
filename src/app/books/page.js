import Link from 'next/link';

export default function BooksPage() {
  return (
    <main style={{ padding: '72px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '64px' }}>
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-display), serif', fontSize: '18px', letterSpacing: '0.28em', textTransform: 'uppercase' }}
          >
            D.C. Barletta
          </Link>
          <nav style={{ display: 'flex', gap: '24px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            <Link href="/">Home</Link>
            <Link href="/books">Books</Link>
            <a href="https://worldoftethys.com">World of Tethys</a>
          </nav>
        </header>

        <section style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7c6f62' }}>
            World of Tethys
          </p>
          <h1 style={{ fontFamily: 'var(--font-display), serif', fontSize: '48px', margin: '16px 0 12px' }}>
            Book One: Sky City
          </h1>
          <p style={{ fontSize: '18px', color: '#433a32', maxWidth: '700px' }}>
            A city engineered to control water, light, and people. Beyond it, a living world still remembers how to breathe.
            Sky City begins the World of Tethys series and opens the door to the broader systems behind the world.
          </p>
        </section>

        <section style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid #d9cbb8', background: '#fbf8f2' }}>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#7c6f62' }}>
              Formats
            </p>
            <p style={{ fontSize: '16px', margin: '10px 0', fontWeight: 600 }}>
              Print · Kindle · Audio
            </p>
            <p style={{ fontSize: '14px', color: '#5a5046' }}>
              Release February 28, 2026. Preorders and updates will live here as they go live.
            </p>
          </div>
          <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid #d9cbb8', background: '#fbf8f2' }}>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#7c6f62' }}>
              The World
            </p>
            <p style={{ fontSize: '16px', margin: '10px 0', fontWeight: 600 }}>
              Interactive Map + Field Notes
            </p>
            <p style={{ fontSize: '14px', color: '#5a5046' }}>
              The world expands beyond the books. Explore systems, regions, and fragments.
            </p>
            <a href="https://worldoftethys.com" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Enter the world
            </a>
          </div>
        </section>

        <footer style={{ marginTop: '72px', borderTop: '1px solid #e2d7c6', paddingTop: '24px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#7c6f62' }}>
            Updates posted here
          </p>
          <p style={{ fontSize: '12px', color: '#7c6f62', marginTop: '10px' }}>
            © Daniel C. Barletta
          </p>
        </footer>
      </div>
    </main>
  );
}
