import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  { text: '"With great power comes great responsibility."', author: '— Uncle Ben' },
  { text: '"Anyone can wear the mask."',                    author: '— Miles Morales' },
  { text: '"I\'ve got to stop him, and I\'m the only one who can."', author: '— Peter Parker' },
];

export default function QuoteRotator() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl.from('.quote-header', { opacity: 0, y: -30, duration: 0.4 });

      // Quote 0 in
      tl.to('.qt0', { opacity: 1, y: 0, duration: 0.6 }, '>0.1');
      tl.to('.qa0', { opacity: 1, duration: 0.4 }, '<0.3');
      // Quote 0 out, Quote 1 in
      tl.to('.qt0', { opacity: 0, y: -20, duration: 0.4 }, '>0.5');
      tl.to('.qa0', { opacity: 0, duration: 0.3 }, '<');
      tl.to('.qt1', { opacity: 1, y: 0, duration: 0.6 }, '>0.1');
      tl.to('.qa1', { opacity: 1, duration: 0.4 }, '<0.3');
      // Quote 1 out, Quote 2 in
      tl.to('.qt1', { opacity: 0, y: -20, duration: 0.4 }, '>0.5');
      tl.to('.qa1', { opacity: 0, duration: 0.3 }, '<');
      tl.to('.qt2', { opacity: 1, y: 0, duration: 0.6 }, '>0.1');
      tl.to('.qa2', { opacity: 1, duration: 0.4 }, '<0.3');
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="quotes">
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />

      {/* Faint web background */}
      <svg viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ fill: 'none', stroke: '#e63946', strokeWidth: '0.5', opacity: 0.055 }}
        aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          return <line key={i} x1="250" y1="250"
            x2={250 + 280 * Math.cos(angle)} y2={250 + 280 * Math.sin(angle)} />;
        })}
        {[50, 100, 150, 200, 250].map((r, ri) => {
          const pts = Array.from({ length: 8 }, (_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            return `${250 + r * Math.cos(a)},${250 + r * Math.sin(a)}`;
          }).join(' ');
          return <polyline key={ri} points={pts + ` ${250 + r},${250}`} />;
        })}
      </svg>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-8 text-center">
        <p className="quote-header text-xs tracking-[0.35em] text-red-500 uppercase mb-16">
          // WORDS FROM THE SPIDER-VERSE
        </p>

        {/* All 3 quotes stacked absolutely */}
        <div className="relative" style={{ minHeight: '180px' }}>
          {QUOTES.map((q, i) => (
            <div key={i} className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <blockquote
                className={`quote-text qt${i}`}
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                  fontStyle: 'italic',
                  color: '#ddd',
                  lineHeight: 1.8,
                  opacity: 0,
                  transform: 'translateY(30px)',
                }}
              >
                {q.text}
              </blockquote>
              <cite
                className={`qa${i} not-italic`}
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.25em',
                  color: 'var(--red)',
                  textShadow: '0 0 8px #e63946',
                  textTransform: 'uppercase',
                  opacity: 0,
                }}
              >
                {q.author}
              </cite>
            </div>
          ))}
        </div>

        <div className="mt-20 flex items-center gap-4">
          <div className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #e63946aa)' }} />
          <span className="text-red-600/60 text-xs">✦</span>
          <div className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, #e63946aa, transparent)' }} />
        </div>
      </div>
    </section>
  );
}
