import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Final() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(bg, { scale: 1.1 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: true },
      });
      gsap.to(bg, {
        yPercent: -20, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      });

      // Pinned Content Reveal
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
        .to('.final-line1', { opacity: 1, y: 0, duration: 0.5 })
        .to('.final-line2', { opacity: 1, y: 0, duration: 0.6 }, '>0.05')
        .to('.final-sub',   { opacity: 1, y: 0, duration: 0.5 }, '>0.2')
        .to('.final-btn',   { opacity: 1, duration: 0.4 },        '>0.2');

      gsap.set(['.final-line1', '.final-line2', '.final-sub'], { y: 60 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-screen relative flex items-center justify-center overflow-hidden bg-[#080808]" id="final">
      {/* Background with heavy black and white filter */}
      <div 
        ref={bgRef} 
        className="absolute inset-[-20%] bg-cover bg-center z-0 will-change-transform"
        style={{
          backgroundImage: `url('/alone.jpg')`,
          filter: 'brightness(0.15) saturate(0) contrast(1.8)'
        }} 
      />

      {/* Content centered */}
      <div className="relative z-10 text-center px-6">
        <div className="font-display text-[6rem] md:text-[10rem] text-white leading-[0.9] tracking-[0.02em] final-line1" style={{ opacity: 0 }}>
          And I—
        </div>
        <div className="font-display text-[6rem] md:text-[10rem] text-white leading-[0.9] tracking-[0.02em] final-line2" style={{ opacity: 0 }}>
          Am Spider-Man.
        </div>
        
        <p className="font-mono text-[0.8rem] md:text-[1rem] tracking-[0.18em] text-[#888888] uppercase mt-8 final-sub" style={{ opacity: 0 }}>
          The city never sleeps. Neither do I.
        </p>
        
        <div className="mt-12 final-btn" style={{ opacity: 0 }}>
          <button className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-white border border-white px-8 py-4 bg-transparent transition-all duration-300 hover:bg-white hover:text-[#080808] hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]">
            [ Open Suit Archive ]
          </button>
        </div>
      </div>
    </section>
  );
}
