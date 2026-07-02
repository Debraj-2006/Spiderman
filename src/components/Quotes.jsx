import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    text: '"With great power comes great responsibility."',
    attr: 'Uncle Ben'
  },
  {
    text: '"Anyone can wear the mask."',
    attr: 'Miles Morales'
  },
  {
    text: '"I\'m Spider-Man. And I don\'t stop."',
    attr: 'Peter Parker'
  },
];

export default function Quotes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      // Quote 0
      tl.to('.qt0', { opacity: 1, y: 0, duration: 0.6 }, 0.2);
      tl.to('.qa0', { opacity: 1, duration: 0.4 }, '<0.3');
      // Out
      tl.to('.qt0', { opacity: 0, y: -30, duration: 0.4 }, '>0.8');
      tl.to('.qa0', { opacity: 0, duration: 0.3 }, '<');
      // Quote 1
      tl.to('.qt1', { opacity: 1, y: 0, duration: 0.6 }, '>0.2');
      tl.to('.qa1', { opacity: 1, duration: 0.4 }, '<0.3');
      // Out
      tl.to('.qt1', { opacity: 0, y: -30, duration: 0.4 }, '>0.8');
      tl.to('.qa1', { opacity: 0, duration: 0.3 }, '<');
      // Quote 2
      tl.to('.qt2', { opacity: 1, y: 0, duration: 0.6 }, '>0.2');
      tl.to('.qa2', { opacity: 1, duration: 0.4 }, '<0.3');
      // Out
      tl.to('.qt2', { opacity: 0, y: -30, duration: 0.4 }, '>0.8');
      tl.to('.qa2', { opacity: 0, duration: 0.3 }, '<');

      gsap.set(['.qt0', '.qt1', '.qt2'], { y: 50 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden bg-[#080808]" id="quotes">
      <div className="w-full max-w-[900px] px-8 relative h-[300px] flex items-center justify-center">
        {QUOTES.map((q, i) => (
          <div key={i} className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <blockquote className={`font-display text-[4rem] md:text-[6rem] leading-[1.05] italic text-white qt${i}`} style={{ opacity: 0 }}>
              {q.text}
            </blockquote>
            <p className={`font-mono text-[0.8rem] tracking-[0.2em] uppercase text-[#555555] mt-6 qa${i}`} style={{ opacity: 0 }}>
              — {q.attr}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
