import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg      = bgRef.current;
    if (!section || !bg) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: parallax + zoom-in
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

      // Content reveal — pinned
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
        .to('.hero-eyebrow',    { opacity: 1, y: 0, duration: 0.4 })
        .to('.hero-i-am',       { opacity: 1, y: 0, duration: 0.5 }, '>0.1')
        .to('.hero-name',       { opacity: 1, y: 0, duration: 0.6 }, '>0.05')
        .to('.hero-sub',        { opacity: 1, y: 0, duration: 0.5 }, '>0.1')
        .to('.web-fluid-wrap',  { opacity: 1, duration: 0.4 }, '>0.1')
        .to('.web-fluid-fill',  { width: '94.7%', duration: 0.8, ease: 'none' }, '<0.1')
        .to('.hero-loader',     { opacity: 1, duration: 0.3 }, '>0.2')
        .to('.hero-loader-fill',{ width: '100%', duration: 1, ease: 'none' }, '>0.1');

      // Set initial states
      gsap.set(['.hero-eyebrow', '.hero-i-am', '.hero-name', '.hero-sub'], { y: 40 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="scene scanlines" id="hero">
      <div className="corner corner-tl" /><div className="corner corner-tr" />
      <div className="corner corner-bl" /><div className="corner corner-br" />

      {/* Micro-label */}
      <div className="seq-label">
        SEQ 001 / 042<br />
        // SUIT INITIALIZATION<br />
        // SCROLL ↓
      </div>

      {/* Parallax image */}
      <div ref={bgRef} className="parallax-bg"
        style={{ backgroundImage: `url('/download.jpg')`, backgroundPosition: 'center top' }} />
      <div className="overlay-hero" />

      {/* Main content */}
      <div className="hero-content">
        <p className="hero-eyebrow">
          Earth 616 // Queens, New York // Online
        </p>
        <div className="hero-i-am">I am</div>
        <div className="hero-name blink-cursor">Spider‑Man.</div>
        <p className="hero-sub">
          Web-shooters calibrated. Suit nominal.<br />
          Scroll to run diagnostics.
        </p>
      </div>

      {/* Web fluid meter — bottom right */}
      <div className="web-fluid-wrap">
        <div className="web-fluid-label">Web Fluid</div>
        <div className="web-fluid-pct">94.7%</div>
        <div className="web-fluid-track">
          <div className="web-fluid-fill" />
        </div>
      </div>

      {/* Loading bar — bottom */}
      <div className="loader-wrap hero-loader">
        <div className="loader-label">Loading Web-Fluid System · 0%</div>
        <div className="loader-track">
          <div className="loader-fill hero-loader-fill" />
        </div>
      </div>
    </section>
  );
}
