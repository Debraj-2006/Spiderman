import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: 'Reflexes',            value: 0.004, unit: 's',   display: '0.004' },
  { label: 'Web Tensile Strength', value: 120,   unit: 'kg',  display: '120'   },
  { label: 'Altitude Ceiling',     value: 320,   unit: 'm',   display: '320'   },
  { label: 'Suit Integrity',       value: 97.1,  unit: '%',   display: '97.1'  },
];

function CountUp({ target, duration = 1.5, decimals = 0, elRef }) {
  return null; // handled via GSAP in parent
}

export default function StatsHUD() {
  const sectionRef = useRef(null);
  const cardRefs   = useRef([]);
  const numRefs    = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const ctx = gsap.context(() => {
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

      // Section title
      tl.from('.stats-title', { opacity: 0, y: 50, duration: 0.5 });

      // Cards stagger in
      cardRefs.current.forEach((card, i) => {
        tl.to(card, { opacity: 1, y: 0, duration: 0.6 }, `>-0.3`);
      });

      // Count-up for each number
      numRefs.current.forEach((el, i) => {
        const stat = STATS[i];
        const decimals = stat.display.includes('.') ? stat.display.split('.')[1].length : 0;
        const obj = { val: 0 };
        tl.to(obj, {
          val: stat.value,
          duration: 0.8,
          onUpdate: () => {
            if (el) el.textContent = obj.val.toFixed(decimals);
          },
        }, `>-0.4`);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="stats">
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />

      {/* Section header */}
      <div className="absolute top-16 left-0 right-0 flex justify-center">
        <div className="stats-title text-center">
          <p className="text-xs tracking-[0.35em] text-red-500 uppercase mb-2">// SYSTEM DIAGNOSTICS</p>
          <h2 className="hero-font glow-text"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff' }}>
            SPIDER-SENSE HUD
          </h2>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            ref={(el) => (cardRefs.current[i] = el)}
            className="stat-card"
          >
            <div className="label">{stat.label}</div>
            <div className="value">
              <span ref={(el) => (numRefs.current[i] = el)}>0</span>
              <span className="unit">{stat.unit}</span>
            </div>
            {/* mini decorative bar */}
            <div className="mt-3 fluid-bar-track" style={{ height: '3px' }}>
              <div
                className="fluid-bar-fill"
                style={{
                  width: `${Math.min(100, (stat.value / (i === 0 ? 0.005 : i === 1 ? 130 : i === 2 ? 350 : 100)) * 100)}%`,
                  transition: 'width 2s 0.5s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
