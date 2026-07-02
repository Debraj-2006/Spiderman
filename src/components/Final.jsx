import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Final() {
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg      = bgRef.current;
    if (!section || !bg) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop parallax
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(bg, { scale: 1.15 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: true },
        });
        gsap.to(bg, {
          yPercent: -30, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
        });
      });

      // Content reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl
        .to('.final-line1', { opacity: 1, y: 0, duration: 0.5 })
        .to('.final-line2', { opacity: 1, y: 0, duration: 0.6 }, '>0.05')
        .to('.final-sub',   { opacity: 1, y: 0, duration: 0.5 }, '>0.2')
        .to('.final-btn',   { opacity: 1, duration: 0.4 },        '>0.2');

      gsap.set(['.final-line1', '.final-line2', '.final-sub'], { y: 60 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="scene scanlines" id="final">
      <div className="corner corner-tl" /><div className="corner corner-tr" />
      <div className="corner corner-bl" /><div className="corner corner-br" />

      <div className="seq-label">
        SEQ 005 / 042<br />
        // MULTIVERSE PROTOCOL // ACTIVE<br />
        // END
      </div>

      {/* Parallax bg — pink city, scaleY(-1) makes Miles fall into page */}
      <div ref={bgRef} className="parallax-bg drift-bg"
        style={{
          backgroundImage: `url('/random.jpg')`,
          backgroundPosition: 'center center',
          transform: 'scaleY(-1)',
        }} />
      <div className="overlay-cta" />

      {/* Content */}
      <div className="final-content">
        <div className="final-line1">And I…</div>
        <div className="final-line2 blink-cursor">Am Spider‑Man.</div>
        <p className="final-sub">
          The multiverse is vast.<br />
          The responsibility never ends.
        </p>
        <button className="final-btn">[ Open Suit Archive ]</button>
      </div>

      {/* Footer attribution */}
      <div style={{
        position: 'absolute', bottom: '1.5rem', left: '2rem',
        fontFamily: 'var(--mono)', fontSize: '0.5rem',
        letterSpacing: '0.18em', color: 'var(--dim)',
        textTransform: 'uppercase', zIndex: 10
      }}>
        © Fan Project — Not affiliated with Marvel or Sony
      </div>
    </section>
  );
}
