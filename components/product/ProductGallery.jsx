'use client';

import { useState } from 'react';

export default function ProductGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryImages =
    images.length > 0 ? images : Array.from({ length: 4 });

  return (
    <div className="sticky top-28">
      {/* Main Image */}
      <div className="group relative aspect-[4/5] overflow-hidden rounded-[28px] border border-stone-200 bg-gradient-to-br from-[#F7F3EC] via-[#EEE7DB] to-[#DDD4C4] shadow-sm">

        {/* soft glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff90,transparent_55%)]" />

        {/* placeholder */}
        <div className="absolute inset-0 flex flex-col items-center justify-center transition duration-700 group-hover:scale-105">

          <div className="mb-8 h-28 w-28 rounded-full border border-white/70 bg-white/40 backdrop-blur-md" />

          <h2 className="font-display text-3xl text-ink-900/80">
            Skein &amp; Stitch
          </h2>

          <p className="mt-3 text-xs uppercase tracking-[0.4em] text-ink-900/45">
            Handmade Collection
          </p>
        </div>

        {/* Counter */}
        <div className="absolute bottom-5 right-5 rounded-full bg-white/90 px-4 py-2 text-xs font-medium shadow">
          {activeIndex + 1} / {galleryImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-5 grid grid-cols-4 gap-4">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`group aspect-square overflow-hidden rounded-2xl border transition-all duration-300 ${
              activeIndex === index
                ? 'border-juniper-700 ring-2 ring-juniper-700/20'
                : 'border-stone-200 hover:border-juniper-500'
            }`}
          >
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#F7F3EC] to-[#DDD4C4] transition duration-500 group-hover:scale-105">
              <span className="font-display text-lg text-ink-900/35">
                S&S
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}