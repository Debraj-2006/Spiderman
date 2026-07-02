import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HangingSpider from './HangingSpider';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg      = bgRef.current;
    if (!section || !bg) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop only: parallax + zoom on the falling Miles pink-city image
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

      // Content reveal — pinned, all screen sizes
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl
        .from('.cta-spider',  { opacity: 0, y: -50, duration: 0.6 })
        .from('.cta-heading', { opacity: 0, y: 60,  duration: 0.7 }, '<0.2')
        .from('.cta-tagline', { opacity: 0, y: 30,  duration: 0.5 }, '<0.2')
        .from('.cta-button',  { opacity: 0, scale: 0.8, duration: 0.5 }, '<0.3')
        .from('.cta-footer',  { opacity: 0, y: 20,  duration: 0.4 }, '<0.2');
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section scanlines" id="cta">
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />

      {/* Parallax background: Miles falling between pink buildings.
          scaleY(-1) flips the image so Miles appears to fall INTO the page. */}
      <div
        ref={bgRef}
        className="cta-parallax-bg"
        style={{
          backgroundImage: `url('/random.jpg')`,
          backgroundPosition: 'center center',
          transform: 'scaleY(-1)',
          animation: 'ctaDrift 12s linear infinite',
        }}
      />

      {/* Lighter overlay so the pink palette shows through */}
      <div className="cta-overlay" />

      {/* Glow ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
        <div style={{
          width: 'min(600px, 90vw)', height: 'min(600px, 90vw)',
          borderRadius: '50%',
          border: '1px solid rgba(230,57,70,0.12)',
          boxShadow: '0 0 80px rgba(230,57,70,0.07) inset',
        }} />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center text-center px-6 gap-6" style={{ zIndex: 3 }}>
        <div className="cta-spider">
          <HangingSpider />
        </div>

        <h2 className="cta-heading hero-font"
          style={{
            fontSize: 'clamp(2rem, 7vw, 5.5rem)',
            color: '#fff',
            lineHeight: 1,
            maxWidth: '800px',
            textShadow: '0 4px 30px rgba(0,0,0,0.9)',
          }}>
          YOUR FRIENDLY
          <br />
          <span className="glow-text" style={{ color: 'var(--red)' }}>NEIGHBORHOOD</span>
          <br />
          SPIDER-MAN
        </h2>

        <p className="cta-tagline text-gray-400 text-xs tracking-[0.3em] uppercase">
          Queens · New York · Marvel Universe
        </p>

        <button className="cta-btn cta-button mt-4">
          Swing Into Action
        </button>

        <div className="cta-footer mt-12 flex flex-col items-center gap-2 opacity-40">
          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="text-red-600/50">✦</span>
            ))}
          </div>
          <p className="text-xs text-gray-500 tracking-widest">
            FAN PROJECT — NOT AFFILIATED WITH MARVEL OR SONY
          </p>
        </div>
      </div>
    </section>
  );
}
