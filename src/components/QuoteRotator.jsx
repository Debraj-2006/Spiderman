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
  const bgRef      = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg      = bgRef.current;
    if (!section || !bg) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop only: parallax + zoom on the Miles/Gwen image
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(bg,
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          }
        );

        gsap.to(bg, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Quote reveal (pinned scroll) — all screen sizes
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
      tl.to('.qt0', { opacity: 1, y: 0,   duration: 0.6 }, '>0.1');
      tl.to('.qa0', { opacity: 1,          duration: 0.4 }, '<0.3');
      tl.to('.qt0', { opacity: 0, y: -20, duration: 0.4 }, '>0.5');
      tl.to('.qa0', { opacity: 0,          duration: 0.3 }, '<');
      tl.to('.qt1', { opacity: 1, y: 0,   duration: 0.6 }, '>0.1');
      tl.to('.qa1', { opacity: 1,          duration: 0.4 }, '<0.3');
      tl.to('.qt1', { opacity: 0, y: -20, duration: 0.4 }, '>0.5');
      tl.to('.qa1', { opacity: 0,          duration: 0.3 }, '<');
      tl.to('.qt2', { opacity: 1, y: 0,   duration: 0.6 }, '>0.1');
      tl.to('.qa2', { opacity: 1,          duration: 0.4 }, '<0.3');
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="quotes">
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />

      {/* Parallax background: Miles & Gwen moonlight rooftop */}
      <div
        ref={bgRef}
        className="quote-parallax-bg"
        style={{
          backgroundImage: `url('/miles-gwen.jpg')`,
          backgroundPosition: 'center center',
        }}
      />

      {/* Blue-tinted moonlight overlay */}
      <div className="quote-overlay" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-8 text-center">
        <p className="quote-header text-xs tracking-[0.35em] text-red-400 uppercase mb-16"
          style={{ textShadow: '0 0 8px rgba(230,57,70,0.5)' }}>
          // WORDS FROM THE SPIDER-VERSE
        </p>

        <div className="relative" style={{ minHeight: '220px' }}>
          {QUOTES.map((q, i) => (
            <div key={i} className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <blockquote
                className={`quote-text qt${i}`}
                style={{
                  fontSize: 'clamp(1.15rem, 3vw, 1.8rem)',
                  fontStyle: 'italic',
                  color: '#f0f0f0',
                  lineHeight: 1.7,
                  opacity: 0,
                  transform: 'translateY(30px)',
                  textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                  maxWidth: '700px',
                }}
              >
                {q.text}
              </blockquote>
              <cite
                className={`qa${i} not-italic`}
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.3em',
                  color: 'var(--red)',
                  textShadow: '0 0 12px #e63946',
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
            style={{ background: 'linear-gradient(90deg, transparent, rgba(230,57,70,0.6))' }} />
          <span className="text-red-500/60 text-xs">✦</span>
          <div className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, rgba(230,57,70,0.6), transparent)' }} />
        </div>
      </div>
    </section>
  );
}
