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
  title: 'Daniel C. Barletta',
  description: 'Author of World of Tethys. Speculative fiction grounded in ecology, systems, and survival.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body style={{ fontFamily: 'var(--font-text), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
