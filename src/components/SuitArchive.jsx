import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SUITS = [
  { name: 'Homemade Suit',       year: '2016', desc: 'DIY fabric. Queens basement. Made with love.', pct: 60 },
  { name: 'Stark Suit',          year: '2017', desc: 'Stark Tech. AI interface. Instant kill mode.', pct: 70 },
  { name: 'Iron Spider',         year: '2018', desc: 'Nanotechnology. Four waldoes. Infinity War.', pct: 80 },
  { name: 'Integrated Suit',     year: '2021', desc: 'Stark tech. Instant kill restored. No Way Home.', pct: 88 },
  { name: 'Upgraded Black Suit', year: '2021', desc: 'Enhanced stealth. Black & gold web detail.', pct: 97 },
];

export default function SuitArchive() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      const entries = gsap.utils.toArray('.suit-entry', section);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl.from('.archive-title', { opacity: 0, y: -40, duration: 0.5 });

      entries.forEach((el) => {
        tl.to(el, { opacity: 1, x: 0, duration: 0.5 }, '>-0.2');
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="suits">
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />

      {/* Vertical accent line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, #e6394622, transparent)', opacity: 0.4 }} />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-8">
        <div className="archive-title mb-14 text-center">
          <p className="text-xs tracking-[0.35em] text-red-500 uppercase mb-2">// SUIT ARCHIVE</p>
          <h2 className="hero-font glow-text"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff' }}>
            THE WARDROBE
          </h2>
        </div>

        <div className="flex flex-col gap-9">
          {SUITS.map((suit) => (
            <div key={suit.name} className="suit-entry">
              <div className="suit-year">[ {suit.year} ]</div>
              <div className="suit-name">{suit.name}</div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed tracking-wide">{suit.desc}</p>
              <div className="mt-3 fluid-bar-track" style={{ height: '2px' }}>
                <div className="fluid-bar-fill" style={{ width: `${suit.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
