import Link from 'next/link';

export default function ContactPage() {
  return (
    <main style={{ padding: '72px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '64px' }}>
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-display), serif', fontSize: '18px', letterSpacing: '0.28em', textTransform: 'uppercase' }}
          >
            Daniel C. Barletta
          </Link>
          <nav style={{ display: 'flex', gap: '24px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            <Link href="/">Home</Link>
            <Link href="/books">Books</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        <section style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7c6f62' }}>
            Contact
          </p>
          <h1 style={{ fontFamily: 'var(--font-display), serif', fontSize: '48px', margin: '16px 0 12px' }}>
            Let’s talk.
          </h1>
          <p style={{ fontSize: '18px', color: '#433a32', maxWidth: '700px' }}>
            For publishing, collaboration, or press inquiries, reach out below.
          </p>
        </section>

        <section style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid #d9cbb8', background: '#fbf8f2' }}>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#7c6f62' }}>
              Email
            </p>
            <p style={{ fontSize: '16px', margin: '10px 0', fontWeight: 600 }}>
              hello@dcbarletta.com
            </p>
            <p style={{ fontSize: '14px', color: '#5a5046' }}>
              I respond within a few days when possible.
            </p>
          </div>
          <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid #d9cbb8', background: '#fbf8f2' }}>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#7c6f62' }}>
              Press Kit
            </p>
            <p style={{ fontSize: '16px', margin: '10px 0', fontWeight: 600 }}>
              Available on request
            </p>
            <p style={{ fontSize: '14px', color: '#5a5046' }}>
              Bio, headshots, and series one-sheet.
            </p>
          </div>
        </section>

        <footer style={{ marginTop: '72px', borderTop: '1px solid #e2d7c6', paddingTop: '24px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#7c6f62' }}>
            © Daniel C. Barletta
          </p>
        </footer>
      </div>
    </main>
  );
}
