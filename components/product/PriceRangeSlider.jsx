'use client';

import { useState, useEffect } from 'react';

const PRICE_MIN = 0;
const PRICE_MAX = 200;

export default function PriceRangeSlider({ initialMin, initialMax, onCommit }) {
  const [minVal, setMinVal] = useState(initialMin ?? PRICE_MIN);
  const [maxVal, setMaxVal] = useState(initialMax ?? PRICE_MAX);

  // Keep local state in sync if the URL changes from elsewhere (e.g. back button)
  useEffect(() => {
    setMinVal(initialMin ?? PRICE_MIN);
    setMaxVal(initialMax ?? PRICE_MAX);
  }, [initialMin, initialMax]);

  const minPercent = ((minVal - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPercent = ((maxVal - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  function handleMinChange(e) {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
  }

  function handleMaxChange(e) {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
  }

  // Only push to the URL once the user releases the thumb —
  // not on every pixel of drag, which would spam navigation.
  function commit() {
    onCommit(minVal, maxVal);
  }

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-ink-900 mb-4">
        <span>${minVal}</span>
        <span>${maxVal}</span>
      </div>

      <div className="relative h-1 mb-2">
        <div className="absolute inset-0 rounded-full bg-stone-200" />
        <div
          className="absolute h-1 rounded-full bg-juniper-700"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          value={minVal}
          onChange={handleMinChange}
          onMouseUp={commit}
          onTouchEnd={commit}
          className="absolute w-full top-0"
        />
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          value={maxVal}
          onChange={handleMaxChange}
          onMouseUp={commit}
          onTouchEnd={commit}
          className="absolute w-full top-0"
        />
      </div>
    </div>
  );
}