import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpiderWeb from './SpiderWeb';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);
  const barRef     = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg      = bgRef.current;
    if (!section || !bg) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop only: parallax + zoom
      mm.add('(min-width: 768px)', () => {
        // Cinematic zoom-in as section enters
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

        // Parallax drift as user scrolls past
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

      // Content reveal — pinned scroll, both desktop + mobile
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
        .from('.hero-tag',     { opacity: 0, y: -30, duration: 0.5 })
        .from('.hero-title',   { opacity: 0, y: 80,  duration: 0.8 }, '<0.1')
        .from('.hero-sub',     { opacity: 0, y: 40,  duration: 0.6 }, '<0.2')
        .from('.web-bar-wrap', { opacity: 0, y: 30,  duration: 0.5 }, '<0.2')
        .to('.fluid-bar-fill', { width: '94.7%',     duration: 1   }, '<0.1');
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section scanlines" id="hero">
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />

      {/* Parallax background image */}
      <div
        ref={bgRef}
        className="hero-parallax-bg"
        style={{
          backgroundImage: `url('/download.jpg')`,
          backgroundPosition: 'center top',
          backgroundPositionY: '0%',   /* lock face to top — never cropped */
        }}
      />

      {/* Dark cinematic overlay */}
      <div className="hero-overlay" />

      {/* Red radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(230,57,70,0.08) 0%, transparent 70%)',
        zIndex: 2,
      }} />

      {/* Animated web SVG */}
      <SpiderWeb
        scrollContainer={sectionRef.current}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-start text-left px-8 md:px-16 gap-6 max-w-5xl w-full" style={{ zIndex: 3 }}>
        <div className="hero-tag inline-flex items-center gap-3 px-4 py-1 border border-red-600/40 rounded-sm"
          style={{ boxShadow: '0 0 8px rgba(230,57,70,0.2)' }}>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs tracking-[0.3em] text-red-400 uppercase">System Active — Queens, NY · Earth 616</span>
        </div>

        <h1 className="hero-font hero-title glow-text"
          style={{ fontSize: 'clamp(4rem, 13vw, 10rem)', color: '#fff', lineHeight: 0.88 }}>
          I AM<br />
          <span style={{ color: 'var(--red)', WebkitTextStroke: '1px #e63946' }}>SPIDER-MAN</span>
        </h1>

        <p className="hero-sub text-gray-400 tracking-widest uppercase text-sm"
          style={{ letterSpacing: '0.35em' }}>
          Queens, New York&nbsp;·&nbsp;Earth 616
        </p>

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

      <div className="scroll-hint" style={{ zIndex: 3 }}>
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
