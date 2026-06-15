import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';

export const metadata = {
  title: 'Contact',
  description:
    'Contact Daniel C. Barletta \u2014 author of World of Tethys. For publishing, collaboration, and press inquiries.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Daniel C. Barletta',
    description: 'Publishing, collaboration, and press inquiries for speculative fiction author Daniel C. Barletta.',
    url: 'https://dcbarletta.com/contact'
  }
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Daniel C. Barletta',
  url: 'https://dcbarletta.com/contact',
  description: 'Contact page for author Daniel C. Barletta. Publishing, press, and collaboration inquiries.',
  author: {
    '@type': 'Person',
    name: 'Daniel C. Barletta',
    email: 'hello@dcbarletta.com',
    url: 'https://dcbarletta.com'
  }
};

export default function ContactPage() {
  return (
    <main style={{ padding: '72px 24px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
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
            <Link href="/contact">Contact</Link>
            <ThemeToggle />
          </nav>
        </header>

        <section aria-labelledby="contact-heading" style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>
            Contact
          </p>
          <h1
            id="contact-heading"
            style={{ fontFamily: 'var(--font-display), serif', fontSize: '48px', margin: '16px 0 12px', color: 'var(--text)' }}
          >
            Let's talk.
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '700px' }}>
            For publishing, collaboration, or press inquiries, reach out below.
          </p>
        </section>

        <section aria-label="Contact details" style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>
              Email
            </p>
            <address style={{ fontStyle: 'normal', fontSize: '16px', margin: '10px 0', fontWeight: 600, color: 'var(--text)' }}>
              <a href="mailto:hello@dcbarletta.com" style={{ color: 'var(--text)' }}>hello@dcbarletta.com</a>
            </address>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              I respond within a few days when possible.
            </p>
          </div>
          <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>
              Press Kit
            </p>
            <p style={{ fontSize: '16px', margin: '10px 0', fontWeight: 600, color: 'var(--text)' }}>
              Available on request
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              Bio, headshots, and series one-sheet.
            </p>
          </div>
        </section>

        <footer style={{ marginTop: '72px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--text-subtle)' }}>
            \u00a9 Daniel C. Barletta
          </p>
        </footer>

      </div>
    </main>
  );
}
