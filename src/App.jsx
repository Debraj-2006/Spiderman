import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SuitShowcase from './components/SuitShowcase';
import Quotes from './components/Quotes';
import Final from './components/Final';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Smooth scroll via GSAP
    ScrollTrigger.normalizeScroll(true);
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <div className="scanlines" />
      <div className="film-grain" />
      <main>
        <SuitShowcase />
        <Quotes />
        <Final />
      </main>
    </>
  );
}
