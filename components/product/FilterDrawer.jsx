'use client';

import { useState } from 'react';
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ProductFilters from './ProductFilters';

export default function FilterDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-stone-200 px-4 py-2.5 text-sm font-medium text-ink-900"
      >
        <AdjustmentsHorizontalIcon className="h-4 w-4" />
        Filters
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-ink-900/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-xs sm:max-w-sm bg-cream-0 h-full overflow-y-auto p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg text-ink-900">Filters</h2>
              <button onClick={() => setOpen(false)} aria-label="Close filters">
                <XMarkIcon className="h-5 w-5 text-ink-900" />
              </button>
            </div>
            <ProductFilters />
          </div>
        </div>
      )}
    </div>
  );
}