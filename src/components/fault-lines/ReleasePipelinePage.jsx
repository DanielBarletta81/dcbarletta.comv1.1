import CampaignShell, { Arrow } from './CampaignShell';
import { EXPERIENCE_URLS, copy } from './content';
import styles from './fault-lines.module.css';

export default function ReleasePipelinePage({ locale = 'en' }) {
  const c = copy[locale];
  return <CampaignShell locale={locale} site="author" path="/releases/lost-crossing">
    <section className={`${styles.section} ${styles.pipelineHero}`}>
      <div className={styles.pipelineImage} style={{ backgroundImage: 'linear-gradient(180deg, rgba(6, 10, 16, 0.12), rgba(6, 10, 16, 0.72)), url(/roblox-experiences/The Lost Crossing_ Tethys Adventures-1.png)' }}>
        <span className={styles.experienceStatus}>{c.releaseSubtitle}</span>
      </div>
      <div>
        <p className={styles.eyebrow}>{c.releaseLabel}</p>
        <h1 className={styles.sectionTitle}>{c.releaseTitle}</h1>
        <p>{c.releaseIntro}</p>
        <div className={styles.pipelineActions}>
          <a className={styles.primaryButton} href={EXPERIENCE_URLS.adventures} target="_blank" rel="noopener noreferrer">{c.releaseLaunch} <Arrow /></a>
          <a className={styles.quietButton} href={EXPERIENCE_URLS.wildbound} target="_blank" rel="noopener noreferrer">{c.releaseWildbound} <Arrow /></a>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.pipelineTrack}`}>
      {c.releaseMilestones.map(([phase, detail], i) => <article key={phase} className={styles.revealCard}>
        <p className={styles.eyebrow}>0{i + 1} / {phase}</p>
        <p>{detail}</p>
      </article>)}
    </section>

    <section className={`${styles.section} ${styles.pipelineColumns}`}>
      <article className={`${styles.revealCard} ${styles.pipelineBlock}`}>
        <p className={styles.eyebrow}>{c.releasePatchLabel}</p>
        <ul>{c.releasePatches.map(([version, note]) => <li key={version}><strong>{version}</strong><span>{note}</span></li>)}</ul>
      </article>
      <article className={`${styles.revealCard} ${styles.pipelineBlock}`}>
        <p className={styles.eyebrow}>{c.releaseChecklistLabel}</p>
        <ul>{c.releaseChecklist.map(([item]) => <li key={item}>{item}</li>)}</ul>
      </article>
    </section>

    <section className={`${styles.section} ${styles.pipelineTrack}`}>
      {c.releaseNextModules.map(([title, text], i) => <article key={title} className={styles.revealCard}>
        <p className={styles.eyebrow}>0{i + 1} / {c.releaseNextLabel}</p>
        <h3>{title}</h3>
        <p>{text}</p>
      </article>)}
    </section>
  </CampaignShell>;
}
