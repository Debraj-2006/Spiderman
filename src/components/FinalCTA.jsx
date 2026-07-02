import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HangingSpider from './HangingSpider';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const ctx = gsap.context(() => {
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
        .from('.cta-spider', { opacity: 0, y: -50, duration: 0.6 })
        .from('.cta-heading', { opacity: 0, y: 60, duration: 0.7 }, '<0.2')
        .from('.cta-tagline',  { opacity: 0, y: 30, duration: 0.5 }, '<0.2')
        .from('.cta-button',  { opacity: 0, scale: 0.8, duration: 0.5 }, '<0.3')
        .from('.cta-footer',  { opacity: 0, y: 20, duration: 0.4 }, '<0.2');
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section scanlines" id="cta"
      style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #110808 0%, #0d0d0d 100%)' }}>
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />

      {/* Outer glow ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{
          width: 'min(600px, 90vw)', height: 'min(600px, 90vw)',
          borderRadius: '50%',
          border: '1px solid rgba(230,57,70,0.08)',
          boxShadow: '0 0 80px rgba(230,57,70,0.05) inset',
        }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6">
        {/* Hanging spider */}
        <div className="cta-spider">
          <HangingSpider />
        </div>

        {/* Main heading */}
        <h2 className="cta-heading hero-font"
          style={{ fontSize: 'clamp(2rem, 7vw, 5.5rem)', color: '#fff', lineHeight: 1, maxWidth: '800px' }}>
          YOUR FRIENDLY
          <br />
          <span className="glow-text" style={{ color: 'var(--red)' }}>NEIGHBORHOOD</span>
          <br />
          SPIDER-MAN
        </h2>

        {/* Tagline */}
        <p className="cta-tagline text-gray-500 text-xs tracking-[0.3em] uppercase">
          Queens · New York · Marvel Universe
        </p>

        {/* CTA Button */}
        <button className="cta-btn cta-button mt-4">
          Swing Into Action
        </button>

        {/* Footer */}
        <div className="cta-footer mt-12 flex flex-col items-center gap-2 opacity-30">
          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="text-red-600/40">✦</span>
            ))}
          </div>
          <p className="text-xs text-gray-600 tracking-widest">
            FAN PROJECT — NOT AFFILIATED WITH MARVEL OR SONY
          </p>
        </div>
      </div>
    </section>
  );
}
