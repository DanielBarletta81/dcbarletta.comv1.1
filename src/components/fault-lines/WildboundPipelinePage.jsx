import CampaignShell, { Arrow } from './CampaignShell';
import { EXPERIENCE_URLS, copy, localPath } from './content';
import data from '../../data/releases/wildbound.json';
import styles from './fault-lines.module.css';

export default function WildboundPipelinePage({ locale = 'en' }) {
  const c = copy[locale];
  const page = data[locale] || data.en;
  return <CampaignShell locale={locale} site="author" path="/releases/wildbound">
    <section className={`${styles.section} ${styles.pipelineHero}`}>
      <div className={styles.pipelineImage} style={{ backgroundImage: `linear-gradient(180deg, rgba(6, 10, 16, 0.12), rgba(6, 10, 16, 0.72)), url(/${page.image})` }}>
        <span className={styles.experienceStatus}>{page.subtitle}</span>
      </div>
      <div>
        <p className={styles.eyebrow}>{c.releaseLabel}</p>
        <h1 className={styles.sectionTitle}>{page.title}</h1>
        <p>{page.intro}</p>
        <div className={styles.pipelineActions}>
          <a className={styles.primaryButton} href={EXPERIENCE_URLS.wildbound} target="_blank" rel="noopener noreferrer">{page.playCta} <Arrow /></a>
          <a className={styles.quietButton} href={localPath(locale, '/releases/lost-crossing')}>{page.backCta} <Arrow /></a>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.pipelineTrack}`}>
      {page.milestones.map(({ phase, detail }, i) => <article key={phase} className={styles.revealCard}>
        <p className={styles.eyebrow}>0{i + 1} / {phase}</p>
        <p>{detail}</p>
      </article>)}
    </section>

    <section className={`${styles.section} ${styles.pipelineColumns}`}>
      <article className={`${styles.revealCard} ${styles.pipelineBlock}`}>
        <p className={styles.eyebrow}>{c.releasePatchLabel}</p>
        <ul>{page.patches.map(({ version, note }) => <li key={version}><strong>{version}</strong><span>{note}</span></li>)}</ul>
      </article>
      <article className={`${styles.revealCard} ${styles.pipelineBlock}`}>
        <p className={styles.eyebrow}>{c.releaseChecklistLabel}</p>
        <ul>{page.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
      </article>
    </section>

    <section className={`${styles.section} ${styles.pipelineTrack}`}>
      {page.nextModules.map(({ title, text }, i) => <article key={title} className={styles.revealCard}>
        <p className={styles.eyebrow}>0{i + 1} / {c.releaseNextLabel}</p>
        <h3>{title}</h3>
        <p>{text}</p>
      </article>)}
    </section>
  </CampaignShell>;
}
