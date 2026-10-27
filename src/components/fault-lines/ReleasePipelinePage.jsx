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
  </CampaignShell>;
}
