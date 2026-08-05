'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-[#222] text-white">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#ffffff,transparent_70%)]" />

      <div className="relative flex h-11 items-center justify-center px-12">

        <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-center">
          Complimentary Shipping on Orders Over $75 • Handmade to Order • Worldwide Delivery
        </p>

        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="absolute right-5 rounded-full p-1 transition hover:bg-white/10"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>

      </div>
    </div>
  );
}