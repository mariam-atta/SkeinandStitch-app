// Stands in for a missing product/hero photo. Instead of a flat gray box +
// "Image" text, this draws a simple yarn-coil motif in your existing brand
// colors — reads as an intentional design choice, not a leftover wireframe.
//
// Pure SVG, no image assets or network requests. Swap out for a real <img>
// or next/image once photography exists — ProductCard already does this
// automatically once a product has images[0].
export default function CraftPlaceholder({ tone = 'juniper', className = '', label }) {
  const TONES = {
    juniper: { a: '#3F5A45', b: '#B5583A' },
    clay: { a: '#B5583A', b: '#3F5A45' },
    ink: { a: '#24222B', b: '#B5583A' },
  };
  const { a, b } = TONES[tone] ?? TONES.juniper;

  return (
    <div className={`relative overflow-hidden bg-stone-200/50 ${className}`}>
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <g fill="none" strokeWidth="1.6" opacity="0.55">
          {Array.from({ length: 8 }).map((_, i) => {
            const rx = 36 + i * 21;
            const ry = rx * 0.88;
            return (
              <ellipse
                key={i}
                cx="200"
                cy="200"
                rx={rx}
                ry={ry}
                stroke={i % 2 === 0 ? a : b}
                transform={`rotate(${i * 13} 200 200)`}
              />
            );
          })}
        </g>
      </svg>
      {label && (
        <span className="absolute bottom-3 left-3 text-[11px] font-medium uppercase tracking-wide text-ink-900/40">
          {label}
        </span>
      )}
    </div>
  );
}