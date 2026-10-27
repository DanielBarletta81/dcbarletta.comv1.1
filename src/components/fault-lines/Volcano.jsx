import { useId } from 'react';
import styles from './fault-lines.module.css';

// An imagined skyline, not a geographic profile or a measurement of Anak Krakatau.
export default function Volcano({ compact = false }) {
  const id = useId().replace(/:/g, '');
  const ridge = 'M-20 390 55 377 122 383 195 353 258 365 327 334 373 337 427 305 481 273 531 226 561 198 583 181 600 190 617 188 632 201 657 194 680 203 713 240 739 256 777 295 815 306 855 328 895 343 937 350 990 371 1040 358 1100 373 1150 363 1205 382 1265 366 1320 380 1460 384';
  return <div className={`${styles.landscape} ${compact ? styles.compactLandscape : ''}`} aria-hidden="true">
    <div className={styles.skyGlow} />
    <svg viewBox="0 0 1440 500" preserveAspectRatio="xMidYMax slice" className={styles.volcano}>
      <defs>
        <linearGradient id={`${id}-rock`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#181718" /><stop offset="1" stopColor="#080a0c" /></linearGradient>
        <linearGradient id={`${id}-rim`}><stop stopColor="#916654" stopOpacity="0" /><stop offset=".39" stopColor="#c69265" /><stop offset=".46" stopColor="#f3b789" /><stop offset=".64" stopColor="#6e4338" /><stop offset="1" stopColor="#916654" stopOpacity="0" /></linearGradient>
        <mask id={`${id}-silhouette`}><path d={`${ridge} L1460 510 H-20Z`} fill="white" /></mask>
        <radialGradient id={`${id}-lava`}><stop stopColor="#e89865" stopOpacity=".55" /><stop offset="1" stopColor="#bd5938" stopOpacity="0" /></radialGradient>
      </defs>
      <path d="M-20 430 97 382 154 400 216 372 306 397 382 362 470 407 555 371 667 410 790 357 830 380 889 347 961 377 1072 345 1152 396 1270 354 1460 404V510H-20Z" fill="#141518" opacity=".65" />
      <g mask={`url(#${id}-silhouette)`}>
        <rect width="1440" height="510" fill={`url(#${id}-rock)`} />
        <ellipse className={styles.innerGlow} cx="627" cy="193" rx="215" ry="235" fill={`url(#${id}-lava)`} />
        <g fill="none" stroke="#908076" strokeOpacity=".12" strokeWidth="1">
          <path d="M578 195 535 260 506 298 482 330 401 391M600 199 576 278 559 314 529 377 517 439M642 198 690 285 712 307 742 361 811 423M650 243 647 284 667 317 661 400M704 261 751 320 811 352 847 400" />
          <path d="M493 280 583 273 695 287M461 321 563 308 702 330 793 344M352 370 527 344 732 377 926 385" />
        </g>
      </g>
      <path className={styles.rim} d={ridge} fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.8" />
      <path d="M0 471 Q330 460 650 479 T1440 473" fill="none" stroke="#b2926e" strokeOpacity=".14" />
    </svg>
  </div>;
}
