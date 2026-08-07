'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  if (!images.length) {
    return (
      <div className="sticky top-28">
        <div className="flex aspect-[4/5] items-center justify-center rounded-[28px] border border-stone-200 bg-[#F7F3EC]">
          <div className="text-center">
            <h2 className="font-display text-3xl text-ink-900">
              Skein & Stitch
            </h2>

            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-ink-900/40">
              No Image Available
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-28">

      {/* Main Image */}

      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-stone-200 bg-white">

        <Image
          src={images[activeIndex].url}
          alt="Product"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute bottom-5 right-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold shadow">
          {activeIndex + 1} / {images.length}
        </div>

      </div>

      {/* Thumbnails */}

      <div className="mt-5 grid grid-cols-4 gap-4">

        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-square overflow-hidden rounded-2xl border transition ${
              activeIndex === index
                ? 'border-juniper-700 ring-2 ring-juniper-700/20'
                : 'border-stone-200 hover:border-juniper-500'
            }`}
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}

      </div>

    </div>
  );
}