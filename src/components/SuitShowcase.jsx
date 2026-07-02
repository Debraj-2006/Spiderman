import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SUITS = [
  {
    id: '01',
    name: 'HOMEMADE SUIT',
    image: '/suit1.jpg',
    filter: 'brightness(0.28) saturate(0.2) contrast(1.4)',
    accent: '#cc2200',
    tint: 'rgba(120,0,0,0.12)',
    year: '2016',
    desc: 'Before Stark. Before the Avengers.\nJust a kid from Queens with a dream and\na homemade suit.',
    stats: [
      { label: 'WEB FLUID', value: 62, display: '62%' },
      { label: 'SUIT INTEGRITY', value: 41, display: '41%' },
      { label: 'STEALTH', value: 18, display: '18%' }
    ]
  },
  {
    id: '02',
    name: 'STARK SUIT',
    image: '/suit2.jpg',
    filter: 'brightness(0.32) saturate(0.45) contrast(1.25)',
    accent: '#e63946',
    tint: 'rgba(180,0,0,0.1)',
    year: '2016',
    desc: "Mr. Stark's gift. Karen online.\nWeb-shooters upgraded. Queens never\nlooked so small from up here.",
    stats: [
      { label: 'WEB FLUID', value: 85, display: '85%' },
      { label: 'AI ASSIST', value: 100, display: 'KAREN ONLINE' },
      { label: 'SUIT INTEGRITY', value: 79, display: '79%' }
    ]
  },
  {
    id: '03',
    name: 'IRON SPIDER',
    image: '/suit3.jpg',
    filter: 'brightness(0.3) saturate(0.6) contrast(1.3) sepia(0.25)',
    accent: '#c9a84c',
    tint: 'rgba(140,100,0,0.1)',
    year: '2018',
    desc: 'Nanotech. Four mechanical legs.\nBuilt for Titan. Built for the fight\nwe almost won.',
    stats: [
      { label: 'NANO-LEGS', value: 100, display: 'DEPLOYED' },
      { label: 'WEB FLUID', value: 94, display: '94%' },
      { label: 'SUIT INTEGRITY', value: 88, display: '88%' }
    ]
  },
  {
    id: '04',
    name: 'NO WAY HOME',
    image: '/suit4.jpg',
    filter: 'brightness(0.3) saturate(0.5) contrast(1.3)',
    accent: '#ff6b35',
    tint: 'rgba(180,60,0,0.1)',
    year: '2021',
    desc: "Three Spider-Men. One impossible\nnight. We didn't need to know each other\nto trust each other.",
    stats: [
      { label: 'MULTIVERSE STATUS', value: 100, display: 'OPEN' },
      { label: 'WEB FLUID', value: 97, display: '97%' },
      { label: 'SUIT INTEGRITY', value: 91, display: '91%' }
    ]
  },
  {
    id: '05',
    name: 'BLACK SUIT',
    image: '/suit5.jpg',
    filter: 'brightness(0.22) saturate(0.1) contrast(1.6)',
    accent: '#ffffff',
    tint: 'rgba(255,255,255,0.03)',
    year: '2023',
    desc: 'The symbiote changes you.\nMakes you stronger. Faster. Darker.\nBut at what cost?',
    stats: [
      { label: 'SYMBIOTE BOND', value: 87, display: '87%' },
      { label: 'SUIT INTEGRITY', value: 95, display: '95%' },
      { label: 'THREAT LEVEL', value: 100, display: 'CRITICAL' }
    ]
  },
  {
    id: '06',
    name: 'MILES MORALES',
    image: '/suit6.jpg',
    filter: 'brightness(0.3) saturate(0.4) contrast(1.25)',
    accent: '#c850c0',
    tint: 'rgba(150,0,180,0.1)',
    year: '2018',
    desc: "Anyone can wear the mask.\nBrooklyn's Spider-Man proved it.\nMiles Morales changed everything.",
    stats: [
      { label: 'VENOM STRIKE', value: 100, display: 'CHARGED' },
      { label: 'CAMOUFLAGE', value: 100, display: 'ACTIVE' },
      { label: 'WEB FLUID', value: 91, display: '91%' }
    ]
  },
  {
    id: '07',
    name: 'SPIDER-VERSE',
    image: '/suit7.jpg',
    filter: 'brightness(0.28) saturate(0.5) contrast(1.4) hue-rotate(200deg)',
    accent: '#ff2d78',
    tint: 'rgba(180,0,80,0.1)',
    year: '2018',
    desc: 'The multiverse is vast.\nThe responsibility never ends.\nEvery dimension needs a Spider-Man.',
    stats: [
      { label: 'MULTIVERSE SYNC', value: 100, display: 'LOCKED' },
      { label: 'WEB FLUID', value: 99, display: '99%' },
      { label: 'DIMENSIONS', value: 70, display: '7 ACTIVE' }
    ]
  }
];

export default function SuitShowcase() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndex = useRef(0);
  const activeSuit = SUITS[activeIndex];

  useEffect(() => {
    // Inject dynamic CSS variable for accent color so styles can pick it up
    document.documentElement.style.setProperty('--accent', activeSuit.accent);

    const section = containerRef.current;
    if (!section) return;

    // Reset animations for the newly active suit
    const ctx = gsap.context(() => {
      // Background Image Crossfade & Parallax Zoom
      gsap.fromTo(`.bg-img-${activeIndex}`,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1.0, duration: 0.8, ease: "power2.out" }
      );
      
      // Text Content Sliding
      gsap.fromTo(".anim-text",
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
      );

      // Stat Bars Fill
      SUITS[activeIndex].stats.forEach((stat, i) => {
        gsap.fromTo(`.stat-fill-${i}`,
          { width: '0%' },
          { width: `${stat.value}%`, duration: 0.8, delay: 0.2 + (i * 0.1), ease: "power2.out" }
        );
      });
      
      // Watermark Fade
      gsap.fromTo(".watermark", 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 0.03, scale: 1, duration: 1, ease: "power2.out"}
      );
    }, section);

    // Fade out previous image
    if (prevIndex.current !== activeIndex) {
       gsap.to(`.bg-img-${prevIndex.current}`, { opacity: 0, duration: 0.5 });
    }
    prevIndex.current = activeIndex;

    return () => ctx.revert();
  }, [activeIndex]);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // The scroll trigger that handles the massive scroll region
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=600%', // 6 intervals (7 suits)
        pin: true,
        snap: {
          snapTo: 1 / (SUITS.length - 1),
          duration: { min: 0.4, max: 0.8 },
          ease: "power2.inOut"
        },
        onUpdate: (self) => {
          // Update the vertical progress bar based on total progress
          gsap.set('.vertical-progress', { height: `${self.progress * 100}%` });
          
          // Parallax effect on the currently active image
          gsap.set(`.bg-img-${activeIndex}`, {
            yPercent: -20 * self.progress
          });

          // Determine which suit is active based on scroll progress
          const index = Math.round(self.progress * (SUITS.length - 1));
          if (index !== activeIndex) {
             setActiveIndex(index);
          }
        }
      });
    }, section);
    
    return () => ctx.revert();
  }, [activeIndex]); // Rebind onUpdate when activeIndex changes to keep correct parallax target

  return (
    <>
      <div className="vertical-progress" style={{ backgroundColor: activeSuit.accent }} />
      
      <div className="dots-container">
        {SUITS.map((_, i) => (
          <div key={i} className={`dot ${i === activeIndex ? 'active' : ''}`} 
               style={i === activeIndex ? { backgroundColor: activeSuit.accent, boxShadow: `0 0 8px ${activeSuit.accent}` } : {}}/>
        ))}
      </div>

      <section ref={containerRef} className="suit-showcase-container" id="suit-showcase">
        {/* LEFT PANEL */}
        <div className="left-panel">
          {SUITS.map((suit, i) => (
            <div 
              key={suit.id}
              className={`left-panel-bg bg-img-${i}`}
              style={{
                backgroundImage: `url('${suit.image}')`,
                filter: suit.filter,
                opacity: i === 0 ? 1 : 0, // Initial state
                zIndex: i === activeIndex ? 1 : 0
              }}
            />
          ))}
          <div className="left-panel-vignette" />
          <div className="left-panel-fade" />
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel" style={{ backgroundColor: '#080808' }}>
          {/* Subtle colored tint on top of the black bg */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: activeSuit.tint, pointerEvents: 'none' }} />
          
          <div className="watermark anim-text">{activeSuit.id}</div>
          
          <div style={{ position: 'absolute', top: '3rem', left: '6rem' }}>
            <p className="font-mono text-[0.55rem] tracking-[0.2em] text-[#555555] uppercase anim-text">
              SUIT {activeSuit.id} / 07 // SPIDER-MAN // SYSTEM ONLINE
            </p>
          </div>
          
          <div className="suit-content">
            <h1 className="font-display text-[8rem] leading-[0.9] uppercase anim-text" style={{ color: activeSuit.accent }}>
              {activeSuit.name}
            </h1>
            
            <p className="font-mono text-sm text-[#555555] tracking-widest mt-2 mb-8 anim-text">
              DEPLOYED — {activeSuit.year}
            </p>
            
            <p className="font-mono text-[#888888] text-[1.1rem] leading-relaxed max-w-[500px] whitespace-pre-line mb-12 anim-text">
              {activeSuit.desc}
            </p>
            
            <div className="flex flex-col gap-6 max-w-[400px]">
              {activeSuit.stats.map((stat, i) => (
                <div key={i} className="anim-text">
                  <div className="flex justify-between font-mono text-[0.6rem] tracking-widest uppercase mb-1">
                    <span className="text-[#555555]">{stat.label}</span>
                    <span className="text-white">{stat.display}</span>
                  </div>
                  <div className="stat-bar-container">
                    <div className={`stat-bar-fill stat-fill-${i}`} style={{ backgroundColor: activeSuit.accent, boxShadow: `0 0 6px ${activeSuit.accent}` }} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 anim-text">
              <div className="w-full h-[1px] opacity-30 mb-3" style={{ backgroundColor: activeSuit.accent }} />
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[#555555]">
                SCROLL FOR NEXT SUIT ↓
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
