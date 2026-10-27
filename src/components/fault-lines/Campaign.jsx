import CampaignShell, { Arrow } from './CampaignShell';
import Volcano from './Volcano';
import { AUTHOR_URL, EXPERIENCE_URLS, WORLD_URL, copy, defaultImagery, localPath, officialSources } from './content';
import styles from './fault-lines.module.css';

export function BookSection({ locale = 'en', site = 'world', standalone = false }) {
  const c = copy[locale];
  return <section id="book" className={`${styles.section} ${styles.bookSection}`}>
    <div className={styles.bookArt} aria-label="Fault Lines — World of Tethys, Book II">
      <div className={styles.bookLine} /><span className={styles.eyebrow}>World of Tethys</span>
      <div className={styles.bookArtTitle}>FAULT<br />LINES</div>
      <span className={styles.bookNumeral}>II</span><span className={styles.bookAuthor}>D.C. BARLETTA</span>
      <span className={styles.bookArtCaption}>{locale === 'id' ? 'Identitas kampanye · bukan sampul buku' : 'Campaign identity · cover to be revealed'}</span>
    </div>
    <div className={styles.bookCopy}>
      <p className={styles.eyebrow}>{c.chapter}</p>
      {standalone ? <h1 className={styles.sectionTitle}>Fault Lines</h1> : <h2 className={styles.sectionTitle}>{c.bookHeading}</h2>}
      <p>{c.bookBody}</p><p className={styles.muted}>{c.releaseBody}</p>
      <div className={styles.release}><span className={styles.smallDot} />{c.soon}</div>
      <div className={styles.firstBook}><p className={styles.eyebrow}>{c.firstBook}</p><h3>{c.firstTitle}</h3><p>{c.firstBody}</p><a className={styles.textLink} href={`${WORLD_URL}/world-of-tethys-book-1`}>{c.read} <Arrow /></a></div>
      {site === 'author' && <a className={styles.textLink} href={`${WORLD_URL}${localPath(locale)}`}>{c.explore} <Arrow /></a>}
    </div>
  </section>;
}

export function FollowSection({ locale = 'en' }) {
  const c = copy[locale];
  return <section className={`${styles.section} ${styles.follow}`} id="follow">
    <div><p className={styles.eyebrow}>{c.followLabel}</p><h2 className={styles.sectionTitle}>{c.followTitle}</h2></div>
    <div><p>{c.followBody}</p><div className={styles.socials}>
      <a href="https://www.youtube.com/@WorldofTethys">YouTube <Arrow /></a>
      <a href="https://www.instagram.com/worldoftethys/">Instagram <Arrow /></a>
      <a href="https://www.tiktok.com/@worldoftethys_writer">TikTok <Arrow /></a>
    </div></div>
  </section>;
}

function RegionsSection({ locale }) {
  const c = copy[locale];
  return <section id="regions" className={styles.section}>
    <div className={styles.sectionHeading}>
      <div>
        <p className={styles.eyebrow}>{c.regionsLabel}</p>
        <h2 className={styles.sectionTitle}>{c.regionsTitle}</h2>
      </div>
      <p>{c.regionsIntro}</p>
    </div>
    <div className={styles.regionGrid}>
      {c.regions.map(([title, subtitle, body, image, action]) => <article key={title} className={`${styles.regionCard} ${styles.revealCard}`}>
        <div className={styles.regionImage} style={{ backgroundImage: `linear-gradient(180deg, rgba(9, 11, 15, 0.08), rgba(9, 11, 15, 0.88)), url(/${image})` }} role="img" aria-label={`${title} region`} />
        <div className={styles.regionCopy}>
          <p className={styles.eyebrow}>{subtitle}</p>
          <h3>{title}</h3>
          <p>{body}</p>
          <a href="#explore" className={styles.textLink}>{action} <Arrow /></a>
        </div>
      </article>)}
    </div>
  </section>;
}

function PlayPathsSection({ locale }) {
  const c = copy[locale];
  const links = [EXPERIENCE_URLS.wildbound, EXPERIENCE_URLS.adventures];
  return <section id="play-paths" className={styles.section}>
    <div className={styles.sectionHeading}>
      <div>
        <p className={styles.eyebrow}>{c.playLabel}</p>
        <h2 className={styles.sectionTitle}>{c.playTitle}</h2>
      </div>
      <p>{c.playIntro}</p>
    </div>
    <div className={styles.experienceGrid}>
      {c.experiences.map(([title, subtitle, body, action], index) => <article key={title} className={`${styles.experienceCard} ${styles.revealCard}`}>
        <p className={styles.eyebrow}>{subtitle}</p>
        <h3>{title}</h3>
        <p>{body}</p>
        <a href={links[index]} className={styles.primaryButton} target="_blank" rel="noopener noreferrer">{action} <Arrow /></a>
      </article>)}
    </div>
    <aside className={styles.bridgeNote}>
      <p className={styles.eyebrow}>{locale === 'id' ? 'Website + Roblox' : 'Website + Roblox'}</p>
      <h3>{c.bridgeHeading}</h3>
      <ul>{c.bridgeItems.map((item) => <li key={item}>{item}</li>)}</ul>
    </aside>
  </section>;
}

function EarthSection({ locale, site }) {
  const c = copy[locale];
  return <section className={`${styles.section} ${styles.earth}`} id="earth">
    <div><p className={styles.eyebrow}>{c.earthLabel}</p><h2 className={styles.sectionTitle}>{c.earthTitle}</h2><p>{c.earthBody}</p><p className={styles.muted}>{c.earthSub}</p></div>
    <div className={styles.observatory} style={{ backgroundImage: `linear-gradient(180deg, rgba(12, 15, 19, 0.74), rgba(12, 15, 19, 0.92)), url(/${defaultImagery.waterSystemsImage})` }}>
      <p className={styles.eyebrow}>{c.volcanoPlace}</p><h3>{c.volcanoName}</h3>
      <div className={styles.miniVolcano}><Volcano compact /></div>
      <p>{c.volcanoNote}</p><a className={styles.textLink} href={officialSources.volcano}>{c.volcanoAction} <Arrow /></a>
    </div>
    <a className={styles.visitor} href={`${site === 'author' ? WORLD_URL : ''}${localPath(locale, '/sunda-strait')}`}>
      <span className={styles.visitorIcon} aria-hidden="true">+</span><span><strong>{c.visit}</strong><span>{c.visitBody}</span></span><Arrow />
    </a>
  </section>;
}

export default function Campaign({ locale = 'en', site = 'world' }) {
  const c = copy[locale];
  const author = site === 'author';
  return <CampaignShell locale={locale} site={site}>
    <section className={`${styles.hero} ${styles.cinematicHero} ${styles.heroWithImage} ${author ? styles.authorHero : ''}`} style={{ backgroundImage: `radial-gradient(ellipse at 50% 75%, rgba(31, 40, 54, 0.18) 0, rgba(31, 40, 54, 0.72) 48%, rgba(8, 11, 16, 0.96) 100%), url(/${defaultImagery.heroImage})` }} aria-labelledby="hero-title">
      <div className={styles.heroFrame} aria-hidden="true" />
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>{author ? c.authorLabel : c.edition}</p>
        <h1 id="hero-title" className={styles.heroTitle}>{author ? <><span>D.C.</span> BARLETTA</> : <>FAULT <span>LINES</span></>}</h1>
        <p className={styles.tagline}>{author ? c.authorTagline : c.tagline}</p>
        <div className={styles.heroActions}>
          <a className={styles.primaryButton} href={author ? localPath(locale, '/books') : '#book'}>{author ? c.authorEnter : c.enter}<Arrow /></a>
          <a className={styles.quietButton} href={author ? `${WORLD_URL}${localPath(locale)}` : '#explore'}>{c.explore} <span aria-hidden="true">{author ? '↗' : '↓'}</span></a>
        </div>
      </div>
      <Volcano />
      <div className={styles.heroBottom}><span>{author ? c.edition + ' / Fault Lines' : c.by}</span><span>{c.artNote}</span></div>
    </section>
    <div className={styles.editionStrip}><span>{author ? 'D.C. Barletta / World of Tethys' : 'D.C. Barletta'}</span><span>{c.volume}</span><a href={`${author ? WORLD_URL : ''}${localPath(locale, '/sunda-strait')}`}>{c.safety} <Arrow /></a></div>
    {author && <section id="author" className={`${styles.section} ${styles.authorNote}`}>
      <p className={styles.eyebrow}>{c.authorLabel}</p><div><h2 className={styles.sectionTitle}>{c.authorIntro}</h2><p>{c.authorBio}</p><a href={localPath(locale, '/portfolio')} className={styles.textLink}>{c.portfolio} <Arrow /></a></div>
    </section>}
    {!author && <PlayPathsSection locale={locale} />}
    <BookSection locale={locale} site={site} />
    {!author && <RegionsSection locale={locale} />}
    {!author && <section id="explore" className={styles.section}>
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{c.atlasLabel}</p><h2 className={styles.sectionTitle}>{c.atlasTitle}</h2></div><p>{c.atlasIntro}</p></div>
      <div className={styles.archiveGrid}>{c.archive.map(([title, text, href, number]) => <a key={href} href={href} className={`${styles.archiveCard} ${styles.revealCard}`}><span className={styles.eyebrow}>{number} / Tethys</span><h3>{title}</h3><p>{text}</p><span className={styles.cardEnd}>{c.archiveNote} <Arrow /></span></a>)}</div>
    </section>}
    <EarthSection locale={locale} site={site} />
    {!author && <section className={`${styles.section} ${styles.authorBrief}`}><p className={styles.eyebrow}>{c.authorLabel}</p><h2>D.C. Barletta</h2><p>{c.authorBio}</p><a className={styles.textLink} href={`${AUTHOR_URL}${localPath(locale)}`}>{c.authorLink} <Arrow /></a></section>}
    <FollowSection locale={locale} />
  </CampaignShell>;
}
