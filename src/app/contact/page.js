import InteractiveCard from '../../components/InteractiveCard';

export const metadata = {
  title: 'Contact',
  description:
    'Contact D.C. Barletta \u2014 author of World of Tethys. For publishing, collaboration, and press inquiries.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact D.C. Barletta',
    description: 'Publishing, collaboration, and press inquiries for speculative fiction author D.C. Barletta.',
    url: 'https://dcbarletta.com/contact'
  }
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact D.C. Barletta',
  url: 'https://dcbarletta.com/contact',
  description: 'Contact page for author D.C. Barletta. Publishing, press, and collaboration inquiries.',
  author: {
    '@type': 'Person',
    name: 'D.C. Barletta',
    email: 'hello@dcbarletta.com',
    url: 'https://dcbarletta.com'
  }
};

export default function ContactPage() {
  return (
    <main style={{ padding: '48px 24px 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

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
          <InteractiveCard label="Email contact">
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)', margin: '0 0 10px' }}>
              Email
            </p>
            <address style={{ fontStyle: 'normal', fontSize: '16px', margin: '0 0 8px', fontWeight: 600, color: 'var(--text)' }}>
              <a href="mailto:hello@dcbarletta.com" style={{ color: 'var(--text)' }}>hello@dcbarletta.com</a>
            </address>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
              I respond within a few days when possible.
            </p>
          </InteractiveCard>

          <InteractiveCard label="Press Kit">
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-subtle)', margin: '0 0 10px' }}>
              Press Kit
            </p>
            <p style={{ fontSize: '16px', margin: '0 0 8px', fontWeight: 600, color: 'var(--text)' }}>
              Available on request
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
              Bio, headshots, and series one-sheet.
            </p>
          </InteractiveCard>
        </section>

      </div>
    </main>
  );
}
