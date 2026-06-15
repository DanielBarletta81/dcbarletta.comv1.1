import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';

export const metadata = {
  title: 'World of Tethys: Sky City',
  description:
    'Sky City \u2014 Book One of the World of Tethys series by Daniel C. Barletta. Speculative fiction rooted in ecology, engineered cities, and ancient ocean systems. Released February 28, 2026.',
  keywords: [
    'World of Tethys', 'Sky City', 'Daniel Barletta',
    'speculative fiction', 'science fiction ecology', 'ecological fiction'
  ],
  alternates: { canonical: '/books' },
  openGraph: {
    title: 'World of Tethys: Sky City \u2014 Daniel C. Barletta',
    description:
      'A city engineered to control water, light, and people. Beyond it, a living world still remembers how to breathe. Book One of the World of Tethys series.',
    url: 'https://dcbarletta.com/books',
    type: 'book'
  }
};

const bookSchema = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'Sky City',
  alternativeHeadline: 'World of Tethys, Book One',
  author: { '@type': 'Person', name: 'Daniel C. Barletta', url: 'https://dcbarletta.com' },
  bookSeries: { '@type': 'BookSeries', name: 'World of Tethys' },
  genre: ['Science Fiction', 'Speculative Fiction', 'Ecological Fiction'],
  description:
    'A city engineered to control water, light, and people. Beyond it, a living world still remembers how to breathe. Book One of the World of Tethys series.',
  datePublished: '2026-02-28',
  url: 'https://dcbarletta.com/books'
};

export default function BooksPage() {
  return (
    <main style={{ padding: '72px 24px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '64px' }}>
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-display), serif', fontSize: '18px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--text)' }}
          >
            Daniel C. Barletta
          </Link>
          <nav aria-label="Site navigation" style={{ display: 'flex', gap: '24px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', alignItems: 'center' }}>
            <Link href="/">Home</Link>
            <Link href="/books">Books</Link>
            <a href="https://worldoftethys.com">World of Tethys</a>
            <ThemeToggle />
          </nav>
        </header>

        <article aria-labelledby="book-title">
          <section style={{ marginBottom: '64px' }}>
            <p style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>
              World of Tethys
            </p>
            <h1
              id="book-title"
              style={{ fontFamily: 'var(--font-display), serif', fontSize: '48px', margin: '16px 0 12px', color: 'var(--text)' }}
            >
              Book One: Sky City
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '700px' }}>
              A city engineered to control water, light, and people. Beyond it, a living world still remembers how to breathe.
              Sky City begins the World of Tethys series and opens the door to the broader systems behind the world.
            </p>
          </section>

          <section style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>
                Formats
              </p>
              <p style={{ fontSize: '16px', margin: '10px 0', fontWeight: 600, color: 'var(--text)' }}>
                Print \u00b7 Kindle \u00b7 Audio
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Released February 28, 2026. Preorders and updates will live here as they go live.
              </p>
            </div>
            <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>
                The World
              </p>
              <p style={{ fontSize: '16px', margin: '10px 0', fontWeight: 600, color: 'var(--text)' }}>
                Interactive Map + Field Notes
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                The world expands beyond the books. Explore systems, regions, and fragments.
              </p>
              <a href="https://worldoftethys.com" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>
                Enter the world
              </a>
            </div>
          </section>
        </article>

        <footer style={{ marginTop: '72px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--text-subtle)' }}>
            Updates posted here
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-subtle)', marginTop: '10px' }}>
            \u00a9 Daniel C. Barletta
          </p>
        </footer>

      </div>
    </main>
  );
}
