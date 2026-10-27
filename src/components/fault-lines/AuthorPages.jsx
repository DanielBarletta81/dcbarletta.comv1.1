import CampaignShell, { Arrow } from './CampaignShell';
import { BookSection, FollowSection } from './Campaign';
import { EMAIL, WORLD_URL, copy, localPath } from './content';
import styles from './fault-lines.module.css';

export default function AuthorPage({ locale = 'en', page = 'books' }) {
  const c = copy[locale];
  return <CampaignShell locale={locale} site="author" path={`/${page}`}>
    {page === 'books' ? <>
      <section className={`${styles.section} ${styles.interiorHero}`}>
        <p className={styles.eyebrow}>D.C. Barletta / {locale === 'id' ? 'Bibliografi' : 'Bibliography'}</p>
        <h1 className={styles.sectionTitle}>{locale === 'id' ? 'Fiksi, dunia, dan sistem.' : 'Fiction, worlds, and systems.'}</h1>
        <p>{locale === 'id' ? 'Mulai dari Sky City, lanjutkan ke Fault Lines, lalu telusuri side story yang membentuk World of Tethys.' : 'Start with Sky City, continue into Fault Lines, and follow the side stories shaping the World of Tethys.'}</p>
      </section>
      <section className={`${styles.section} ${styles.infoGrid}`}>
        <article className={styles.revealCard}>
          <p className={styles.eyebrow}>{locale === 'id' ? 'Buku I · Tersedia' : 'Book I · Available now'}</p>
          <h2>Sky City</h2>
          <p>{locale === 'id' ? 'Kota berlapis yang menguasai air, cahaya, dan informasi. Di bawahnya, ekologi purba masih hidup dan menunggu.' : 'A tiered city engineered to control water, light, and information. Beneath it, deep-time ecologies are still alive.'}</p>
          <a className={styles.textLink} href="https://www.amazon.com/World-Tethys-Book-Sky-City-ebook/dp/B0G572X42L">Amazon <Arrow /></a>
          <a className={styles.textLink} href="https://www.goodreads.com/book/show/229781589-world-of-tethys-book-1-sky-city">Goodreads <Arrow /></a>
        </article>
        <article className={styles.revealCard}>
          <p className={styles.eyebrow}>{locale === 'id' ? 'Buku II · Dalam persiapan' : 'Book II · In preparation'}</p>
          <h2>Fault Lines</h2>
          <p>{locale === 'id' ? 'Tekanan geologis membelah persekutuan lama. Fault Lines memperluas skala konflik ekologis, politik, dan kelangsungan hidup.' : 'Geologic stress fractures old alliances. Fault Lines expands the ecological, political, and survival scale of the series.'}</p>
          <p className={styles.muted}>{locale === 'id' ? 'Ingin kabar rilis? Kirim email dengan subjek: "Fault Lines update".' : 'Want release updates? Email with subject: "Fault Lines update".'}</p>
          <a className={styles.textLink} href={`mailto:${EMAIL}?subject=Fault Lines update`}>{locale === 'id' ? 'Dapatkan update rilis' : 'Get release updates'} <Arrow /></a>
        </article>
      </section>
      <section className={`${styles.section} ${styles.quote}`}>
        <blockquote>{locale === 'id' ? 'Dapatkan field guide Tethys + cuplikan awal Fault Lines langsung ke inbox Anda.' : 'Get the Tethys field guide + early Fault Lines chapters delivered to your inbox.'}</blockquote>
        <p>{locale === 'id' ? 'Hubungi langsung untuk daftar pembaca awal.' : 'Reach out directly to join the early reader list.'}</p>
        <a href={`mailto:${EMAIL}?subject=Tethys field guide`} className={styles.textLink}>{EMAIL} <Arrow /></a>
      </section>
      <section className={`${styles.section} ${styles.infoGrid}`}>
        <article className={styles.revealCard}>
          <p className={styles.eyebrow}>{locale === 'id' ? 'Kisah samping' : 'Side stories'}</p>
          <h2>{locale === 'id' ? 'Unraveling Ravel' : 'Unraveling Ravel'}</h2>
          <p>{locale === 'id' ? 'Sebuah sisi lain dari ketegangan sosial dan memori teknologi dalam semesta Tethys.' : 'A side-channel story exploring social stress and technical memory in the Tethys universe.'}</p>
        </article>
        <article className={styles.revealCard}>
          <p className={styles.eyebrow}>{locale === 'id' ? 'Kisah samping' : 'Side stories'}</p>
          <h2>{locale === 'id' ? 'What the Roots Remember' : 'What the Roots Remember'}</h2>
          <p>{locale === 'id' ? 'Cerita pendek tentang ekologi bawah tanah, jaringan akar, dan warisan biologis yang tersembunyi.' : 'A short work on sub-canopy ecology, root networks, and the biological inheritance hidden under the surface.'}</p>
        </article>
      </section>
      <BookSection locale={locale} site="author" standalone />
    </> : <>
      <section className={`${styles.section} ${styles.interiorHero}`}>
        <p className={styles.eyebrow}>D.C. Barletta / {page === 'contact' ? c.contact : c.craftLabel}</p>
        <h1 className={styles.sectionTitle}>{page === 'contact' ? c.contactHeading : c.craftHeading}</h1>
        <p>{page === 'contact' ? c.contactBody : c.craftBody}</p>
        {page === 'contact' && <a className={styles.emailLink} href={`mailto:${EMAIL}`}>{EMAIL} <Arrow /></a>}
      </section>
      <section className={`${styles.section} ${styles.infoGrid}`}>
        {(page === 'contact' ? [[c.pressTitle, c.pressBody], [c.screenTitle, c.screenBody]] : c.craftItems).map(([title, text], i) => <article key={title} className={styles.revealCard}><p className={styles.eyebrow}>0{i + 1}</p><h2>{title}</h2><p>{text}</p></article>)}
      </section>
      {page === 'portfolio' && <section className={`${styles.section} ${styles.quote}`}><blockquote>{c.philosophy}</blockquote><p>D.C. Barletta</p><a href={`${WORLD_URL}${localPath(locale)}`} className={styles.textLink}>{c.explore} <Arrow /></a></section>}
    </>}
    <FollowSection locale={locale} />
  </CampaignShell>;
}
