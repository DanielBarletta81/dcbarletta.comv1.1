'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const MEASUREMENT_ID = 'G-MTLQDPPYQV';

export default function AuthorAnalytics() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(['dcbarletta.com', 'www.dcbarletta.com'].includes(window.location.hostname));
  }, []);
  if (!enabled) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="author-ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${MEASUREMENT_ID}');
      `}</Script>
    </>
  );
}
