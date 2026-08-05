'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import PriceRangeSlider from './PriceRangeSlider';

const COLORS = [
  { label: 'Cream', hex: '#F5EFE3' },
  { label: 'Sage', hex: '#8FA582' },
  { label: 'Clay', hex: '#B5583A' },
  { label: 'Plum', hex: '#5B3A5E' },
  { label: 'Charcoal', hex: '#33302A' },
];
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reads current filter state directly from the URL — this is the
  // single source of truth, not local component state.
  const activeColor = searchParams.get('color');
  const activeSize = searchParams.get('size');
  const activeSort = searchParams.get('sort') || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  function toggleParam(key, value) {
    const current = searchParams.get(key);
    updateParam(key, current === value ? null : value);
  }

  return (
    <div className="space-y-8">
      {/* Sort */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-2">
          Sort by
        </label>
        <select
          value={activeSort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2 text-sm text-ink-900"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-3">
          Color
        </p>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color.label}
              onClick={() => toggleParam('color', color.label)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                activeColor === color.label
                  ? 'border-juniper-700 bg-juniper-700 text-cream-0'
                  : 'border-stone-200 text-ink-900 hover:border-juniper-700'
              }`}
            >
              <span
                className="h-3 w-3 rounded-full border border-black/10"
                style={{ backgroundColor: color.hex }}
              />
              {color.label}
            </button>
          ))}
        </div>
      </div>
      {/* Size */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-3">
          Size
        </p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleParam('size', size)}
              className={`h-9 w-9 rounded-md border text-xs transition-colors ${
                activeSize === size
                  ? 'border-juniper-700 bg-juniper-700 text-cream-0'
                  : 'border-stone-200 text-ink-900 hover:border-juniper-700'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      {/* Price range */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-3">
          Price
        </p>
        <PriceRangeSlider
          initialMin={minPrice ? Number(minPrice) : undefined}
          initialMax={maxPrice ? Number(maxPrice) : undefined}
          onCommit={(min, max) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('minPrice', min);
            params.set('maxPrice', max);
            router.push(`${pathname}?${params.toString()}`);
          }}
        />
      </div>
    </div>
  );
}