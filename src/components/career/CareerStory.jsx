'use client';

import { useRef, useState } from 'react';
import { chapters, projects } from './chapters';
import { EMAIL } from '../fault-lines/content';
import styles from './career.module.css';

function FieldDrawing({ kind }) {
  return <svg className={styles.drawing} viewBox="0 0 520 360" fill="none" aria-hidden="true">
    <path d="M30 30h30M30 30v30M490 30h-30M490 30v30M30 330h30M30 330v-30M490 330h-30M490 330v-30" stroke="currentColor" opacity=".4" />
    <g stroke="currentColor" strokeWidth="1.4">
      {['ocean', 'river'].includes(kind) && <>
        {[0,1,2,3,4,5].map(i => <path key={i} d={`M65 ${100+i*31} Q150 ${55+i*31} 250 ${110+i*31} T455 ${95+i*31}`} opacity={.15+i*.1} />)}
        <path d="M155 179q78-77 153 0-75 77-153 0Zm0 0-36-31v62l36-31Zm109-34q-24 32 0 68" /><circle cx="284" cy="170" r="3" fill="currentColor" />
        {kind === 'river' && <><path d="M80 265 120 255 160 272 200 260 240 280 280 260 320 278 360 255 400 265" strokeDasharray="3 5"/><path d="M350 61v71m-12-12 12 12 12-12" /></>}
      </>}
      {kind === 'scale' && <>{[0,1,2,3,4,5,6,7,8].map(i=><ellipse key={i} cx="260" cy={190+i*2} rx={18+i*16} ry={14+i*13} transform="rotate(-16 260 190)" opacity={1-i*.07} />)}{[0,1,2,3,4,5,6].map(i=><path key={i} d={`M260 190 ${95+i*52} 74`} opacity=".25"/>)}<path d="M334 250h85v38"/><circle cx="334" cy="250" r="4" fill="currentColor"/></>}
      {kind === 'system' && <><path d="M90 111h340M115 119v136m60-136v136m170-136v136m60-136v136M90 264h340M80 279h360M102 94 260 50l158 44"/>{[0,1,2].map(i=><g key={i}><rect x={215+i*9} y={149+i*9} width="72" height="90" fill="#e1e5d9"/><path d={`M${228+i*9} ${167+i*9}h44m-44 15h32m-32 15h40`}/></g>)}</>}
      {kind === 'frame' && <><path d="m102 235 158-92 159 92-159 92-158-92Zm0 0V125l158-92 159 92v110M260 143V33M102 125l158 92 159-92M260 217v110M181 79v110m158-110v110"/><path d="m75 135-20 12v110l20-12M439 251l21 12-158 92-21-12" strokeDasharray="3 4"/><path d="m142 244 118 68 117-68" opacity=".3"/></>}
      {kind === 'code' && <><rect x="75" y="67" width="370" height="230" rx="7"/><path d="M75 104h370"/><circle cx="96" cy="86" r="3"/><circle cx="110" cy="86" r="3"/><circle cx="124" cy="86" r="3"/><path d="m175 155-37 37 37 37m170-74 37 37-37 37m-66-91-36 108"/><path d="M210 275h100" opacity=".3"/></>}
      {kind === 'story' && <><path d="M260 113q-90-50-166-12v176q75-38 166 12 91-50 166-12V101q-76-38-166 12Zm0 0v176"/><path d="m120 171 28-35 23 28 28-45 35 54m54-11h105m-105 24h89m-89 24h105m-105 24h65"/><path d="M125 230q47-20 104 6"/><circle cx="194" cy="89" r="7"/></>}
      {kind === 'connections' && <>{[[120,100],[390,100],[120,270],[390,270],[260,55],[260,310]].map(([x,y],i)=><g key={i}><path d={`M260 180 ${x} ${y}`} opacity=".35"/><circle cx={x} cy={y} r="20"/><circle cx={x} cy={y} r="4" fill="currentColor"/></g>)}<circle cx="260" cy="180" r="52"/><circle cx="260" cy="180" r="40" strokeDasharray="2 6"/><path d="m243 180 12 12 24-26"/></>}
    </g>
    <path d="M45 310h90m-90-4v8m30-8v8m30-8v8m30-8v8" stroke="currentColor" opacity=".4"/>
  </svg>;
}

export default function CareerStory() {
  const [active, setActive] = useState(0);
  const [all, setAll] = useState(false);
  const touch = useRef(null);
  const rail = useRef(null);
  function go(index) {
    const next = Math.max(0, Math.min(chapters.length - 1, index));
    setActive(next);
    const strip = rail.current;
    const item = strip?.children[next];
    if (strip && item) {
      const left = item.offsetLeft - strip.offsetLeft;
      if (left < strip.scrollLeft) strip.scrollLeft = left;
      else if (left + item.offsetWidth > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = left + item.offsetWidth - strip.clientWidth;
    }
  }
  function onKeys(event) {
    if (all || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('a')) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); go(active + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(active - 1); }
    if (event.key === 'Home') { event.preventDefault(); go(0); }
    if (event.key === 'End') { event.preventDefault(); go(chapters.length - 1); }
  }
  return <div className={styles.page}>
    <a className={styles.skip} href="#career-main">Skip to career story</a>
    <header className={styles.header}>
      <a className={styles.brand} href="/">D.C. BARLETTA<span>Science. Software. Stories.</span></a>
      <nav aria-label="Primary navigation"><a href="#journey" aria-current="page">My path</a><a href="#work">Selected work</a><a href="/books">Books</a><a className={styles.navContact} href={`mailto:${EMAIL}`}>Let’s talk <span aria-hidden="true">↗</span></a></nav>
    </header>
    <main id="career-main">
      <section className={styles.hero} aria-labelledby="career-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.dot} /> Daniel Barletta · Warwick, Rhode Island</p>
          <h1 id="career-title">Nothing I learned<br />went to <em>waste.</em></h1>
          <p className={styles.intro}>Field biologist. Researcher. Carpenter. Developer. Author.<br className={styles.desktopBreak} /> A winding path, and the connections I can finally see.</p>
          <a className={styles.primary} href="#journey">Follow the thread <span aria-hidden="true">↓</span></a>
          <a className={styles.secondary} href="#work">See what I’m building ↗</a>
        </div>
        <div className={styles.heroArt}>
          <div className={styles.artHeader}><span>FIELD NOTES / A WORKING LIFE</span><span>01—08</span></div>
          <FieldDrawing kind="scale" />
          <div className={styles.artCaption}><span>A fish scale records a life in layers.</span><span>So does a career.</span></div>
          <span className={styles.artFoot}>Illustration · not a research specimen</span>
        </div>
      </section>
      <div className={styles.connector}><span>Gather evidence</span><i aria-hidden="true">→</i><span>Find the pattern</span><i aria-hidden="true">→</i><span>Build understanding</span></div>
      <section id="journey" className={styles.journey} aria-labelledby="journey-title" onKeyDown={onKeys}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>01 / The long way here</p><h2 id="journey-title">Different chapters. The same curiosity.</h2></div><button className={styles.viewToggle} onClick={() => setAll(!all)} aria-pressed={all}>{all ? 'Slideshow view' : 'Read all chapters'} <span aria-hidden="true">{all ? '▣' : '☷'}</span></button></div>
        <p className={styles.timelineNote}>A career told in chapters. Some of these paths ran alongside one another.</p>
        <div className={styles.timeline} ref={rail} aria-label="Choose a career chapter">{chapters.map((chapter,index)=><button key={chapter.id} onClick={()=>{go(index);setAll(false);}} aria-current={!all && active === index ? 'step' : undefined} aria-controls={`chapter-${chapter.id}`}><span className={styles.timelineNumber}>{String(index+1).padStart(2,'0')}</span><strong>{chapter.short}</strong><small>{chapter.era}</small></button>)}</div>
        <div className={`${styles.deck} ${all ? styles.readAll : ''}`} role="region" aria-roledescription={all ? undefined : 'carousel'} aria-label="Career chapters" onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}} onTouchEnd={e=>{if(!touch.current||all)return;const dx=e.changedTouches[0].clientX-touch.current.x;const dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5)go(active+(dx<0?1:-1));touch.current=null;}}>
          {chapters.map((chapter,index)=><article key={chapter.id} id={`chapter-${chapter.id}`} hidden={!all&&active!==index} aria-labelledby={`title-${chapter.id}`} className={styles.chapter}>
            <div className={styles.chapterVisual}><div className={styles.chapterMeta}><span>CHAPTER {String(index+1).padStart(2,'0')}</span><span>{chapter.era}</span></div><FieldDrawing kind={chapter.art}/><div className={styles.artifact}><span>What stayed with me</span><strong>{chapter.artifact}</strong></div><small className={styles.illustrationNote}>Illustrative drawing</small></div>
            <div className={styles.chapterCopy}><p className={styles.eyebrow}>{chapter.place}</p><h3 id={`title-${chapter.id}`}>{chapter.title}</h3><p className={styles.scene}>{chapter.scene}</p><p className={styles.body}>{chapter.body}</p><ul className={styles.skills} aria-label="Skills carried forward">{chapter.skills.map(skill=><li key={skill}>{skill}</li>)}</ul><div className={styles.connection}><span>Still relevant today</span><p>{chapter.connection}</p></div></div>
          </article>)}
        </div>
        {!all&&<div className={styles.controls}><p aria-live="polite" aria-atomic="true"><strong>{String(active+1).padStart(2,'0')}</strong> / {String(chapters.length).padStart(2,'0')}<span> · {chapters[active].short}</span></p><div><button onClick={()=>go(active-1)} disabled={active===0} aria-label="Previous career chapter">← <span>Previous</span></button><button onClick={()=>go(active+1)} disabled={active===chapters.length-1} aria-label="Next career chapter"><span>Next chapter</span> →</button></div></div>}
      </section>
      <section className={styles.reflection} aria-label="Career reflection"><p className={styles.eyebrow}>The thread through it all</p><blockquote>“You never know which experience<br className={styles.desktopBreak}/> you’ll still be using twenty-five years later.”</blockquote><p>A river teaches you to notice change. A lab teaches you to question a result.<br className={styles.desktopBreak}/> A workshop teaches you to make it fit. Software gives those lessons another place to go.</p></section>
      <section id="work" className={styles.work} aria-labelledby="work-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>02 / Where the threads lead</p><h2 id="work-title">Experience, put to work.</h2></div><a className={styles.secondary} href="https://github.com/DanielBarletta81">More on GitHub ↗</a></div><div className={styles.projects}>{projects.map(project=><a key={project.title} href={project.href} className={styles.project}><div className={styles.projectTop}><span>{project.number}</span><span aria-hidden="true">↗</span></div><p className={styles.projectType}>{project.type}</p><h3>{project.title}</h3><p>{project.text}</p><span className={styles.projectLink}>{project.label} <span aria-hidden="true">→</span></span></a>)}</div><div className={styles.worldNote}><span>And yes, there is a whole fictional world, too.</span><a href="https://worldoftethys.com">Visit World of Tethys ↗</a></div></section>
      <section className={styles.contact} aria-labelledby="contact-title"><p className={styles.eyebrow}>03 / The next useful thing</p><h2 id="contact-title">Have something complex<br/>that needs to become clear?</h2><p>I’m interested in small website projects, scientific interfaces,<br className={styles.desktopBreak}/> educational experiences, and thoughtful collaborations.</p><a className={styles.primary} href={`mailto:${EMAIL}?subject=Let%E2%80%99s%20build%20something`}>Let’s build something <span aria-hidden="true">↗</span></a><a className={styles.email} href={`mailto:${EMAIL}`}>{EMAIL}</a></section>
    </main>
    <footer className={styles.footer}><a href="/">D.C. Barletta</a><p>Science. Software. Stories. Still learning.</p><a href="/contact">Contact ↗</a><span>© {new Date().getFullYear()}</span></footer>
  </div>;
}
