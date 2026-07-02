import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SpiderWeb({ scrollContainer, className = '' }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('path, line, polyline');
    if (!paths) return;

    paths.forEach((path) => {
      const len = path.getTotalLength ? path.getTotalLength() : 300;
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer || svgRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1.5,
      },
    });

    paths.forEach((path, i) => {
      const len = path.getTotalLength ? path.getTotalLength() : 300;
      tl.to(path, { strokeDashoffset: 0, duration: 1 }, i * 0.1);
    });

    return () => tl.kill();
  }, [scrollContainer]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ fill: 'none', stroke: '#e63946', strokeWidth: '1', opacity: 0.18 }}
      aria-hidden="true"
    >
      {/* Radial web lines from center */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x2 = 250 + 240 * Math.cos(angle);
        const y2 = 250 + 240 * Math.sin(angle);
        return <line key={`r${i}`} x1="250" y1="250" x2={x2} y2={y2} />;
      })}
      {/* Concentric hexagonal rings */}
      {[40, 80, 120, 160, 200, 240].map((r, ri) => {
        const pts = Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          return `${250 + r * Math.cos(angle)},${250 + r * Math.sin(angle)}`;
        }).join(' ');
        return <polyline key={`c${ri}`} points={pts + ` ${250 + r},${250}`} />;
      })}
    </svg>
  );
}
