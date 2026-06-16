import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap'
});

const text = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-text',
  display: 'swap'
});

export const metadata = {
  title: {
    default: 'D.C. Barletta — Author',
    template: '%s | D.C. Barletta'
  },
  description:
    'D.C. Barletta is a speculative fiction author. Creator of World of Tethys — a science fiction series grounded in ecology, ancient ocean systems, and the science of survival.',
  keywords: [
    'Daniel Barletta',
    'speculative fiction author',
    'World of Tethys',
    'Sky City',
    'science fiction ecology',
    'ecological fiction',
    'ocean world building',
    'ancient Tethys Sea',
    'science fiction author'
  ],
  authors: [{ name: 'D.C. Barletta', url: 'https://dcbarletta.com' }],
  creator: 'D.C. Barletta',
  metadataBase: new URL('https://dcbarletta.com'),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dcbarletta.com',
    siteName: 'D.C. Barletta',
    title: 'D.C. Barletta — Author of World of Tethys',
    description:
      'Speculative fiction grounded in ecology, ancient ocean systems, and the science of survival. Author of the World of Tethys series.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'D.C. Barletta — Author of World of Tethys',
    description:
      'Speculative fiction grounded in ecology, ancient ocean systems, and the science of survival.'
  }
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f2ea' },
    { media: '(prefers-color-scheme: dark)', color: '#06080e' }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`
          }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-text), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
