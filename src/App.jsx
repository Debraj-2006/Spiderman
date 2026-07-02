import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Diagnostics from './components/Diagnostics';
import Quotes from './components/Quotes';
import SuitArchive from './components/SuitArchive';
import Final from './components/Final';
import ScrollProgressBar from './components/ScrollProgressBar';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Smooth scroll via GSAP
    ScrollTrigger.normalizeScroll(true);
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <main>
      <Navbar />
      <ScrollProgressBar />
      <Hero />
      <Diagnostics />
      <Quotes />
      <SuitArchive />
      <Final />
    </main>
  );
}

