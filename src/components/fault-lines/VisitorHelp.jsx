'use client';

import { useState } from 'react';
import CampaignShell, { Arrow } from './CampaignShell';
import { officialSources } from './content';
import styles from './fault-lines.module.css';

const visitorCopy = {
  en: {
    label: 'Indonesia / Sunda Strait', title: 'Real places.\nReal help.', intro: 'Official information for residents and visitors around Anak Krakatau, the coasts of Banten, and Lampung Selatan.',
    status: 'Current alert status is not available on this site.', statusBody: 'Open the official services below for current warnings and instructions. The animated glow elsewhere on this site does not indicate volcanic activity or safety.',
    rescue: 'Search & rescue', call: 'Call 115', rescueBody: 'BASARNAS emergency search and rescue in Indonesia.', source: 'Official source',
    emergency: 'Local emergency service', call112: 'Call 112', emergencyBody: '112 operates in participating cities and regencies. Check local availability; coverage is not universal.', coverage: 'Check 112 coverage',
    volcano: 'Volcanic activity', volcanoBody: 'PVMBG / MAGMA Indonesia publishes volcano activity levels and recommendations. Find Anak Krakatau and follow the latest official guidance.', volcanoLink: 'Activity levels', reportLink: 'Activity reports',
    tsunami: 'Tsunami information', tsunamiBody: 'BMKG / InaTEWS provides official tsunami information. Follow warnings and evacuation directions from the authorities where you are.', tsunamiLink: 'Open BMKG / InaTEWS',
    region: 'Local disaster agencies', regionBody: 'Choose the coast you are visiting. This changes the agency link; it does not assess your risk or detect your location.', select: 'Choose a region', choose: 'Select your area', localLink: 'Open the local agency',
    both: 'Both coasts / unsure', agency: 'Disaster management agency',
    note: 'Use the official sources directly for changing conditions. If you need urgent help, contact emergency services or local officials; this author website does not receive emergency reports.',
    checked: 'Resource links checked 21 September 2026. This date is not a volcano or tsunami bulletin timestamp.',
  },
  id: {
    label: 'Indonesia / Selat Sunda', title: 'Tempat nyata.\nBantuan nyata.', intro: 'Informasi resmi bagi warga dan pengunjung di sekitar Anak Krakatau, pesisir Banten, dan Lampung Selatan.',
    status: 'Status peringatan terkini tidak tersedia di situs ini.', statusBody: 'Buka layanan resmi di bawah untuk peringatan dan arahan terbaru. Animasi cahaya di halaman lain situs ini tidak menunjukkan aktivitas gunung api atau kondisi aman.',
    rescue: 'Pencarian & pertolongan', call: 'Hubungi 115', rescueBody: 'Layanan darurat pencarian dan pertolongan BASARNAS di Indonesia.', source: 'Sumber resmi',
    emergency: 'Layanan darurat setempat', call112: 'Hubungi 112', emergencyBody: '112 beroperasi di kota dan kabupaten yang telah menerapkan layanan ini. Periksa ketersediaan setempat; cakupannya belum merata.', coverage: 'Periksa cakupan 112',
    volcano: 'Aktivitas gunung api', volcanoBody: 'PVMBG / MAGMA Indonesia menerbitkan tingkat aktivitas dan rekomendasi gunung api. Cari Anak Krakatau dan ikuti arahan resmi terbaru.', volcanoLink: 'Tingkat aktivitas', reportLink: 'Laporan aktivitas',
    tsunami: 'Informasi tsunami', tsunamiBody: 'BMKG / InaTEWS menyediakan informasi resmi tsunami. Ikuti peringatan dan arahan evakuasi dari pihak berwenang di tempat Anda berada.', tsunamiLink: 'Buka BMKG / InaTEWS',
    region: 'Badan penanggulangan bencana setempat', regionBody: 'Pilih kawasan pesisir yang Anda kunjungi. Pilihan ini hanya mengubah tautan instansi; bukan penilaian risiko atau deteksi lokasi Anda.', select: 'Pilih wilayah', choose: 'Pilih kawasan Anda', localLink: 'Buka situs instansi setempat',
    both: 'Kedua pesisir / belum yakin', agency: 'Badan penanggulangan bencana',
    note: 'Gunakan sumber resmi secara langsung untuk mengetahui perubahan kondisi. Jika membutuhkan bantuan segera, hubungi layanan darurat atau petugas setempat; situs penulis ini tidak menerima laporan darurat.',
    checked: 'Tautan sumber diperiksa pada 21 September 2026. Tanggal ini bukan waktu penerbitan buletin gunung api atau tsunami.',
  },
};

export default function VisitorHelp({ locale = 'en' }) {
  const c = visitorCopy[locale];
  const [region, setRegion] = useState('both');
  const regions = region === 'both' ? ['lampung', 'banten'] : [region];
  return <CampaignShell locale={locale} path="/sunda-strait">
    <section className={`${styles.section} ${styles.interiorHero}`}><p className={styles.eyebrow}>{c.label}</p><h1 className={styles.sectionTitle}>{c.title}</h1><p>{c.intro}</p></section>
    <div className={styles.helpContent}>
      <aside className={styles.statusNote}><strong>{c.status}</strong><p>{c.statusBody}</p></aside>
      <section className={styles.helpGrid} aria-label={locale === 'id' ? 'Bantuan darurat' : 'Emergency help'}>
        <article className={styles.helpCard}><p className={styles.eyebrow}>BASARNAS</p><h2>{c.rescue}</h2><p>{c.rescueBody}</p><a className={styles.callButton} href="tel:115">{c.call} <span aria-hidden="true">↗</span></a><a className={styles.textLink} href={officialSources.rescue}>{c.source} <Arrow /></a></article>
        <article className={styles.helpCard}><p className={styles.eyebrow}>112</p><h2>{c.emergency}</h2><p>{c.emergencyBody}</p><a className={styles.callButton} href="tel:112">{c.call112} <span aria-hidden="true">↗</span></a><a className={styles.textLink} href={officialSources.emergency}>{c.coverage} <Arrow /></a></article>
        <article className={styles.helpCard}><p className={styles.eyebrow}>PVMBG / MAGMA Indonesia</p><h2>{c.volcano}</h2><p>{c.volcanoBody}</p><a className={styles.textLink} href={officialSources.volcano}>{c.volcanoLink} <Arrow /></a><a className={styles.textLink} href={officialSources.reports}>{c.reportLink} <Arrow /></a></article>
        <article className={styles.helpCard}><p className={styles.eyebrow}>BMKG / InaTEWS</p><h2>{c.tsunami}</h2><p>{c.tsunamiBody}</p><a className={styles.textLink} href={officialSources.tsunami}>{c.tsunamiLink} <Arrow /></a></article>
      </section>
      <section className={styles.region}><h2>{c.region}</h2><p>{c.regionBody}</p><label htmlFor="region">{c.select}</label><select id="region" value={region} onChange={e => setRegion(e.target.value)}><option value="both">{c.both}</option><option value="lampung">Lampung Selatan</option><option value="banten">Banten</option></select><div className={styles.regionalLinks} aria-live="polite">{regions.map(area => <a href={officialSources[area]} key={area}>{area === 'lampung' ? 'BPBD Lampung Selatan' : 'BPBD Banten / SIBENDA'} <Arrow /></a>)}</div></section>
      <p className={styles.helpNote}>{c.note}</p><p className={styles.sourceDate}>{c.checked}</p>
    </div>
  </CampaignShell>;
}
