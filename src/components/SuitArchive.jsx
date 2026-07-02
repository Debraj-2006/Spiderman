import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SUITS = [
  { num: '01', name: 'Homemade Suit',  quote: '"Hey everyone."',               loc: 'Queens — 2016' },
  { num: '02', name: 'Stark Suit',     quote: '"Friendly neighborhood."',       loc: 'Berlin — 2016' },
  { num: '03', name: 'Iron Spider',    quote: '"I don\'t feel so good."',        loc: 'Titan — 2018' },
  { num: '04', name: 'Integrated Suit',quote: '"No more pulling punches."',     loc: 'New York — 2021' },
  { num: '05', name: 'Black Suit',     quote: '"You took everything from me."', loc: 'New York — 2021' },
];

export default function SuitArchive() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl.to('.archive-header', { opacity: 1, y: 0, duration: 0.4 });
      SUITS.forEach((_, i) => {
        tl.to(`.suit-row-${i}`, { opacity: 1, x: 0, duration: 0.5 }, '>0.15');
      });
      tl.to('.archive-loader',      { opacity: 1, duration: 0.3 }, '>0.3');
      tl.to('.archive-loader-fill', { width: '100%', duration: 0.8, ease: 'none' }, '>0.1');

      gsap.set('.archive-header', { y: 40 });
      SUITS.forEach((_, i) => {
        gsap.set(`.suit-row-${i}`, { x: -50 });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="scene" id="archive"
      style={{ background: 'var(--bg)' }}>
      <div className="corner corner-tl" /><div className="corner corner-tr" />
      <div className="corner corner-bl" /><div className="corner corner-br" />

      <div className="seq-label">
        SEQ 004 / 042<br />
        // SUIT ARCHIVE // WEB-SHOOTER LOG<br />
        // RESTORING
      </div>

      {/* Header */}
      <div className="archive-header"
        style={{ opacity: 0, padding: '0 3rem', marginBottom: '3rem', maxWidth: 900 }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          // Registered Configurations
        </p>
        <p style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--text)', letterSpacing: '0.04em', lineHeight: 1 }}>
          Suit<br />Archive.
        </p>
      </div>

      {/* Suit list */}
      <div className="archive-list">
        {SUITS.map((s, i) => (
          <div key={i} className={`suit-entry suit-row-${i}`} style={{ opacity: 0 }}>
            <div className="suit-num">{s.num} — {s.loc}</div>
            <div className="suit-name">{s.name}</div>
            <div className="suit-quote">{s.quote}</div>
          </div>
        ))}
      </div>

      {/* Loading bar */}
      <div className="loader-wrap archive-loader">
        <div className="loader-label">// Suit Archive · Restoring</div>
        <div className="loader-track">
          <div className="loader-fill archive-loader-fill" />
        </div>
      </div>
    </section>
  );
}
