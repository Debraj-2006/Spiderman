export default function HangingSpider() {
  return (
    <div className="flex flex-col items-center mb-4">
      {/* Web line from top */}
      <svg width="2" height="80" className="mb-0" aria-hidden="true">
        <line x1="1" y1="0" x2="1" y2="80" stroke="#e63946" strokeWidth="1.5"
          style={{ filter: 'drop-shadow(0 0 4px #e63946)' }} />
      </svg>

      {/* Spider body — pure CSS/SVG, no images */}
      <svg
        width="48"
        height="44"
        viewBox="0 0 48 44"
        className="spider-hang"
        aria-hidden="true"
        style={{ filter: 'drop-shadow(0 0 6px #e63946)' }}
      >
        {/* Legs left */}
        <line x1="14" y1="18" x2="0"  y2="10" stroke="#e63946" strokeWidth="1.5" />
        <line x1="14" y1="22" x2="0"  y2="22" stroke="#e63946" strokeWidth="1.5" />
        <line x1="14" y1="26" x2="2"  y2="34" stroke="#e63946" strokeWidth="1.5" />
        {/* Legs right */}
        <line x1="34" y1="18" x2="48" y2="10" stroke="#e63946" strokeWidth="1.5" />
        <line x1="34" y1="22" x2="48" y2="22" stroke="#e63946" strokeWidth="1.5" />
        <line x1="34" y1="26" x2="46" y2="34" stroke="#e63946" strokeWidth="1.5" />
        {/* Body */}
        <ellipse cx="24" cy="26" rx="10" ry="12" fill="#0d0d0d" stroke="#e63946" strokeWidth="1.5" />
        {/* Head */}
        <circle cx="24" cy="14" r="8" fill="#0d0d0d" stroke="#e63946" strokeWidth="1.5" />
        {/* Eyes */}
        <ellipse cx="21" cy="13" rx="2.5" ry="1.8" fill="#e63946" />
        <ellipse cx="27" cy="13" rx="2.5" ry="1.8" fill="#e63946" />
        {/* Web pattern on body */}
        <line x1="24" y1="14" x2="24" y2="38" stroke="#e63946" strokeWidth="0.6" opacity="0.4" />
        <ellipse cx="24" cy="23" rx="5" ry="3" fill="none" stroke="#e63946" strokeWidth="0.5" opacity="0.4" />
        <ellipse cx="24" cy="30" rx="7" ry="4" fill="none" stroke="#e63946" strokeWidth="0.5" opacity="0.4" />
      </svg>
    </div>
  );
}
