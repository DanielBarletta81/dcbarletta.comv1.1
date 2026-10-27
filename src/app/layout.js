import localFont from 'next/font/local';
import './globals.css';
const serif = localFont({ src: '../../public/fonts/spectral/spectral-400.ttf', variable: '--font-naturalist', display: 'swap' });
const sans = localFont({ src: '../../public/fonts/space-grotesk/space-grotesk-400.ttf', variable: '--font-sky', display: 'swap' });
export const metadata = {
  metadataBase: new URL('https://dcbarletta.com'),
  title: 'D.C. Barletta | Biologist. Software Engineer. Worldbuilder.',
  description: 'Official site of D.C. Barletta — books, software craft, 3D worldbuilding, and the World of Tethys.',
};
export default function RootLayout({ children }) {
  return <html lang="en" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>;
}
