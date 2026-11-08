'use client';

import { useEffect, useRef } from 'react';
import styles from './fault-lines.module.css';

export default function HeroBackdrop({ image }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    const onMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        node.style.transform = `translate3d(${(x * -14).toFixed(1)}px, ${(y * -9).toFixed(1)}px, 0)`;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={ref} className={styles.heroParallax} aria-hidden="true">
    <div className={styles.heroBackdrop} style={{ backgroundImage: `url(/${image})` }} />
  </div>;
}
