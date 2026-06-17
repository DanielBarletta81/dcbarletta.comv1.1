import InteractiveCard from '../../components/InteractiveCard';

export const metadata = {
  title: 'World of Tethys: Sky City',
  description:
    'Sky City \u2014 Book One of the World of Tethys series by D.C. Barletta. Speculative fiction rooted in ecology, engineered cities, and ancient ocean systems. Released February 28, 2026.',
  keywords: [
    'World of Tethys', 'Sky City', 'Daniel Barletta',
    'speculative fiction', 'science fiction ecology', 'ecological fiction'
  ],
  alternates: { canonical: '/books' },
  openGraph: {
    title: 'World of Tethys: Sky City \u2014 D.C. Barletta',
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
  author: { '@type': 'Person', name: 'D.C. Barletta', url: 'https://dcbarletta.com' },
  bookSeries: { '@type': 'BookSeries', name: 'World of Tethys' },
  genre: ['Science Fiction', 'Speculative Fiction', 'Ecological Fiction'],
  description:
    'A city engineered to control water, light, and people. Beyond it, a living world still remembers how to breathe. Book One of the World of Tethys series.',
  datePublished: '2026-02-28',
  url: 'https://dcbarletta.com/books'
};

export default function BooksPage() {
  return (
    <main style={{ padding: '48px 24px 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

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
            <InteractiveCard label="Formats">
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)', margin: '0 0 10px' }}>
                Formats
              </p>
              <p style={{ fontSize: '16px', margin: '0 0 8px', fontWeight: 600, color: 'var(--text)' }}>
                Print \u00b7 Kindle \u00b7 Audio
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
                Released February 28, 2026. Preorders and updates will live here as they go live.
              </p>
            </InteractiveCard>

            <InteractiveCard label="The World" glowColor="var(--accent)">
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)', margin: '0 0 10px' }}>
                The World
              </p>
              <p style={{ fontSize: '16px', margin: '0 0 8px', fontWeight: 600, color: 'var(--text)' }}>
                Interactive Map + Field Notes
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 12px' }}>
                The world expands beyond the books. Explore systems, regions, and fragments.
              </p>
              <a href="https://worldoftethys.com" className="nav-link">
                Enter the world
              </a>
            </InteractiveCard>
          </section>
        </article>

      </div>
    </main>
  );
}
