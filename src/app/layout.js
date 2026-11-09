import localFont from 'next/font/local';
import './globals.css';
const serif = localFont({ src: '../../public/fonts/spectral/spectral-400.ttf', variable: '--font-naturalist', display: 'swap' });
const sans = localFont({
  src: [
    { path: '../../public/fonts/space-grotesk/space-grotesk-400.ttf', weight: '400' },
    { path: '../../public/fonts/space-grotesk/space-grotesk-600.ttf', weight: '600' },
  ],
  variable: '--font-sky',
  display: 'swap',
});
export const metadata = {
  metadataBase: new URL('https://dcbarletta.com'),
  title: 'D.C. Barletta | Biologist. Software Engineer. Worldbuilder.',
  description: 'Official site of D.C. Barletta — books, software craft, 3D worldbuilding, and the World of Tethys.',
  openGraph: {
    title: 'D.C. Barletta',
    description: 'Biologist, full-stack engineer, author, and worldbuilder.',
    url: 'https://dcbarletta.com',
    type: 'profile',
  },
};

const authorSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Daniel C. Barletta',
  alternateName: 'D.C. Barletta',
  url: 'https://dcbarletta.com',
  jobTitle: ['Biologist', 'Full-Stack Software Engineer', 'Author'],
  description: 'Biologist trained in ecology and evolution, software engineer shipping product software, and author of the World of Tethys series.',
  sameAs: [
    'https://www.amazon.com/D.C.-Barletta/e/B0B87PWD8Y',
    'https://github.com/DanielBarletta81',
    'https://worldoftethys.com',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Strata Works',
    url: 'https://strata-builds.tech',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
