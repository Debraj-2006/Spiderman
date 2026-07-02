import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: 'Reflexes',      value: '0.004', unit: 's',  sub: 'Neural Response Link' },
  { label: 'Web Tensile',   value: '120',   unit: 'kg', sub: 'Carbon-nanotube composite' },
  { label: 'Altitude',      value: '320',   unit: 'm',  sub: 'Glide assist + updraft' },
  { label: 'Suit Integrity',value: '97.1',  unit: '%',  sub: 'Nano-fiber self-repair' },
];

export default function Diagnostics() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl
        .to('.diag-header',   { opacity: 1, y: 0, duration: 0.4 })
        .to('.stat-item-0',   { opacity: 1, y: 0, duration: 0.5 }, '>0.1')
        .to('.stat-item-1',   { opacity: 1, y: 0, duration: 0.5 }, '>0.2')
        .to('.stat-item-2',   { opacity: 1, y: 0, duration: 0.5 }, '>0.2')
        .to('.stat-item-3',   { opacity: 1, y: 0, duration: 0.5 }, '>0.2')
        .to('.diag-loader',   { opacity: 1, duration: 0.3 }, '>0.3')
        .to('.diag-loader-fill', { width: '100%', duration: 0.8, ease: 'none' }, '>0.1');

      gsap.set(['.diag-header', '.stat-item-0', '.stat-item-1', '.stat-item-2', '.stat-item-3'], { y: 40 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="scene" id="diagnostics"
      style={{ background: 'var(--bg)' }}>
      <div className="corner corner-tl" /><div className="corner corner-tr" />
      <div className="corner corner-bl" /><div className="corner corner-br" />

      <div className="seq-label">
        SEQ 002 / 042<br />
        // SUIT SYSTEMS // K.A.R.E.N. EQUIVALENT<br />
        // SCROLL ↓
      </div>

      {/* Section header */}
      <div className="diag-header" style={{ opacity: 0, padding: '0 3rem', marginBottom: '3rem', maxWidth: 900 }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          // Suit Diagnostics
        </p>
        <p style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--text)', letterSpacing: '0.04em', lineHeight: 1 }}>
          System<br />Readings.
        </p>
      </div>

      {/* Stats grid */}
      <div className="diagnostics-grid">
        {STATS.map((s, i) => (
          <div key={i} className={`stat-item stat-item-${i}`}>
            <div className="stat-category">{s.label}</div>
            <div className="stat-value">
              {s.value}<span className="stat-unit">{s.unit}</span>
            </div>
            <div className="stat-sublabel">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Loading bar */}
      <div className="loader-wrap diag-loader">
        <div className="loader-label">Rendering Mark III · 0%</div>
        <div className="loader-track">
          <div className="loader-fill diag-loader-fill" />
        </div>
      </div>
    </section>
  );
}
