import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import StatsHUD from './components/StatsHUD';
import QuoteRotator from './components/QuoteRotator';
import SuitArchive from './components/SuitArchive';
import FinalCTA from './components/FinalCTA';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Smooth scroll via GSAP
    ScrollTrigger.normalizeScroll(true);
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <main>
      <Hero />
      <StatsHUD />
      <QuoteRotator />
      <SuitArchive />
      <FinalCTA />
    </main>
  );
}
