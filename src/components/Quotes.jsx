import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    text: '"With great power comes great responsibility."',
    attr: 'Uncle Ben',
    loc: 'Queens — 2002',
  },
  {
    text: '"Anyone can wear the mask."',
    attr: 'Miles Morales',
    loc: 'Brooklyn — 2018',
  },
  {
    text: '"I\'ve got to stop him. I\'m the only one who can."',
    attr: 'Peter Parker',
    loc: 'New York — 2021',
  },
];

export default function Quotes() {
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

      // Pinned quote cycling
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      // Quote 0
      tl.to('.qt0', { opacity: 1, y: 0, duration: 0.6 }, 0.2);
      tl.to('.qa0', { opacity: 1, duration: 0.4 }, '<0.3');
      // Out
      tl.to('.qt0', { opacity: 0, y: -30, duration: 0.4 }, '>0.8');
      tl.to('.qa0', { opacity: 0, duration: 0.3 }, '<');
      // Quote 1
      tl.to('.qt1', { opacity: 1, y: 0, duration: 0.6 }, '>0.2');
      tl.to('.qa1', { opacity: 1, duration: 0.4 }, '<0.3');
      // Out
      tl.to('.qt1', { opacity: 0, y: -30, duration: 0.4 }, '>0.8');
      tl.to('.qa1', { opacity: 0, duration: 0.3 }, '<');
      // Quote 2
      tl.to('.qt2', { opacity: 1, y: 0, duration: 0.6 }, '>0.2');
      tl.to('.qa2', { opacity: 1, duration: 0.4 }, '<0.3');
      // Loading bar
      tl.to('.quotes-loader',      { opacity: 1, duration: 0.3 }, '>0.8');
      tl.to('.quotes-loader-fill', { width: '100%', duration: 0.6, ease: 'none' }, '>0.1');

      gsap.set(['.qt0', '.qt1', '.qt2'], { y: 50 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="scene scanlines" id="quotes">
      <div className="corner corner-tl" /><div className="corner corner-tr" />
      <div className="corner corner-bl" /><div className="corner corner-br" />

      <div className="seq-label">
        SEQ 003 / 042<br />
        // SPIDER-VERSE LOG<br />
        // SCROLL ↓
      </div>

      {/* Parallax bg */}
      <div ref={bgRef} className="parallax-bg"
        style={{ backgroundImage: `url('/miles-gwen.jpg')`, backgroundPosition: 'center center' }} />
      <div className="overlay-quote" />

      {/* Stacked quotes — all absolute, only one visible at a time */}
      <div className="quote-content" style={{ position: 'relative', minHeight: '260px' }}>
        {QUOTES.map((q, i) => (
          <div key={i} className="quote-slot"
            style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
            <blockquote className={`quote-text-main qt${i}`}
              style={{ opacity: 0 }}>
              {q.text}
            </blockquote>
            <p className={`quote-attribution qa${i}`}
              style={{ opacity: 0 }}>
              {q.attr} // {q.loc}
            </p>
          </div>
        ))}
      </div>

      {/* Loading bar */}
      <div className="loader-wrap quotes-loader">
        <div className="loader-label">// Spider-Verse Log · Processing</div>
        <div className="loader-track">
          <div className="loader-fill quotes-loader-fill" />
        </div>
      </div>
    </section>
  );
}
