import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpiderWeb from './SpiderWeb';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const barRef     = useRef(null);
  const tl         = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl.current
        .from('.hero-tag',     { opacity: 0, y: -30, duration: 0.5 })
        .from('.hero-title',   { opacity: 0, y: 80, duration: 0.8 }, '<0.1')
        .from('.hero-sub',     { opacity: 0, y: 40, duration: 0.6 }, '<0.2')
        .from('.web-bar-wrap', { opacity: 0, y: 30, duration: 0.5 }, '<0.2')
        .to('.fluid-bar-fill', { width: '94.7%', duration: 1 }, '<0.1');
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section scanlines" id="hero">
      {/* HUD corners */}
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />

      {/* Background animated web */}
      <SpiderWeb
        scrollContainer={sectionRef.current}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Hero background: Unsplash spider-web photo + dark cinematic overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)),
          url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />

      {/* Subtle red radial glow on top of photo */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(230,57,70,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6 max-w-4xl mx-auto">
        {/* HUD tag */}
        <div className="hero-tag inline-flex items-center gap-3 px-4 py-1 border border-red-600/40 rounded-sm"
          style={{ boxShadow: '0 0 8px rgba(230,57,70,0.2)' }}>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs tracking-[0.3em] text-red-400 uppercase">System Active — Queens, NY</span>
        </div>

        {/* Big title */}
        <h1 className="hero-font hero-title glow-text"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', color: '#fff', lineHeight: 0.9 }}>
          I AM<br />
          <span style={{ color: 'var(--red)', WebkitTextStroke: '1px #e63946' }}>SPIDER-MAN</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub text-gray-400 tracking-widest uppercase text-sm"
          style={{ letterSpacing: '0.35em' }}>
          Friendly Neighborhood &nbsp;·&nbsp; Queens, New York
        </p>

        {/* Web fluid bar */}
        <div className="web-bar-wrap w-full max-w-sm mt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs tracking-[0.2em] text-gray-500 uppercase">WEB FLUID</span>
            <span className="text-xs text-red-400" style={{ textShadow: '0 0 6px #e63946' }}>94.7%</span>
          </div>
          <div className="fluid-bar-track">
            <div ref={barRef} className="fluid-bar-fill" />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <span className="text-xs tracking-[0.2em] text-gray-600 uppercase">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="#e63946" strokeWidth="1" opacity="0.4" />
          <circle cx="8" cy="8" r="2" fill="#e63946">
            <animateTransform attributeName="transform" type="translate" values="0,0;0,8;0,0" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </section>
  );
}
