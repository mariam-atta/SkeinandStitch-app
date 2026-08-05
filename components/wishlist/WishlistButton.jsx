'use client';

import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

// Pure UI toggle — reusable anywhere (ProductCard, product detail page, here).
// `isSaved` and `onToggle` are controlled from outside; this component holds
// no wishlist state itself. Hook your WishlistContext add/remove into onToggle.
export default function WishlistButton({ isSaved, onToggle, className = '' }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`flex items-center justify-center transition-colors ${className}`}
    >
      {isSaved ? (
        <HeartSolid className="h-5 w-5 text-clay-600" />
      ) : (
        <HeartOutline className="h-5 w-5 text-ink-900 hover:text-clay-600" />
      )}
    </button>
  );
}