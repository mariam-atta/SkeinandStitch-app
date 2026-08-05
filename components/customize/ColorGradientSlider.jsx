'use client';

import { useRef, useCallback, useEffect, useState } from 'react';

// Named stops — same array drives the visual gradient, the color math,
// and the "closest match" name shown under the slider.
const STOPS = [
  { label: 'Rust', hex: '#8C4A2F' },
  { label: 'Sand', hex: '#E3D0B5' },
  { label: 'Forest Green', hex: '#3F5A45' },
  { label: 'Sage', hex: '#B9C9AE' },
  { label: 'Navy', hex: '#2A3A4A' },
  { label: 'Light Pink', hex: '#E8C4C4' },
  { label: 'Plum', hex: '#5B3A5E' },
  { label: 'Light Blue', hex: '#B8CDD9' },
  { label: 'Charcoal', hex: '#33302A' },
  { label: 'Rust', hex: '#8C4A2F' }, // loop back to start for a smooth wrap
];

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function rgbToHex(r, g, b) {
  const toHex = (n) => Math.round(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function colorAtPosition(t) {
  const scaled = t * (STOPS.length - 1);
  const i = Math.floor(scaled);
  const frac = scaled - i;
  const c1 = hexToRgb(STOPS[i].hex);
  const c2 = hexToRgb(STOPS[Math.min(i + 1, STOPS.length - 1)].hex);
  const r = c1.r + (c2.r - c1.r) * frac;
  const g = c1.g + (c2.g - c1.g) * frac;
  const b = c1.b + (c2.b - c1.b) * frac;
  const hex = rgbToHex(r, g, b);

  // Name the closer of the two surrounding stops — an approximation,
  // not an exact match, since the real color is interpolated.
  const nearestLabel = frac < 0.5 ? STOPS[i].label : STOPS[Math.min(i + 1, STOPS.length - 1)].label;

  return { hex, nearestLabel };
}

export default function ColorGradientSlider({ onChange }) {
  const [position, setPosition] = useState(0.15);
  const trackRef = useRef(null);
  const dragging = useRef(false);

  const { hex: currentHex, nearestLabel } = colorAtPosition(position);

  useEffect(() => {
    onChange(currentHex, nearestLabel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const updateFromPointer = useCallback((clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPosition(x / rect.width);
  }, []);

  function handleDown(e) {
    dragging.current = true;
    updateFromPointer(e.clientX ?? e.touches?.[0]?.clientX);
  }

  useEffect(() => {
    function move(e) {
      if (!dragging.current) return;
      updateFromPointer(e.clientX ?? e.touches?.[0]?.clientX);
    }
    function up() {
      dragging.current = false;
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  }, [updateFromPointer]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div
          ref={trackRef}
          onMouseDown={handleDown}
          onTouchStart={handleDown}
          className="relative h-3 flex-1 rounded-full cursor-pointer"
          style={{ background: `linear-gradient(to right, ${STOPS.map((s) => s.hex).join(', ')})` }}
        >
          <div
            className="absolute top-1/2 h-6 w-6 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${position * 100}%`, backgroundColor: currentHex }}
          />
        </div>
        <div
          className="h-10 w-10 rounded-full border border-stone-200 shrink-0"
          style={{ backgroundColor: currentHex }}
        />
      </div>
      <p className="text-xs text-ink-900/50 mt-2">
        Closest match: <span className="font-medium text-ink-900/70">{nearestLabel}</span>
      </p>
    </div>
  );
}