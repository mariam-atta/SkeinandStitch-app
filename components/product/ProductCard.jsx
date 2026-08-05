'use client';

import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import WishlistButton from '@/components/wishlist/WishlistButton';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductCard({ product }) {
  const {
    slug,
    name,
    price,
    salePrice,
    stock,
    rating,
    review_count,
  } = product;

  const { toggleWishlist, isInWishlist } = useWishlist();
  const saved = isInWishlist(product.id);

  const isOutOfStock = stock === 0;
  const displayPrice = salePrice ?? price;

  return (
    <article className="group cursor-pointer">
      <Link href={`/product/${slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300">

          {/* Luxury Placeholder */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff55,transparent_60%)]" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mb-6 h-20 w-20 rounded-full border border-white/60 bg-white/30 backdrop-blur-md transition-transform duration-700 group-hover:scale-110" />

            <h3 className="font-display text-2xl text-ink-900/80">
              Skein &amp; Stitch
            </h3>

            <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-ink-900/40">
              Handmade Collection
            </p>
          </div>

          {/* Wishlist */}
          <div className="absolute top-5 right-5">
            <WishlistButton
              isSaved={saved}
              onToggle={(e) => {
                e.preventDefault();
                toggleWishlist(product);
              }}
              className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-105"
            />
          </div>

          {/* Badges */}
          {isOutOfStock && (
            <span className="absolute left-5 top-5 rounded-full bg-ink-900 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white">
              Out of Stock
            </span>
          )}

          {!isOutOfStock && salePrice && (
            <span className="absolute left-5 top-5 rounded-full bg-clay-600 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white">
              Sale
            </span>
          )}
        </div>
      </Link>

      <Link
        href={`/product/${slug}`}
        className="mt-5 block"
      >
        <h3 className="font-display text-lg leading-snug tracking-[0.01em] text-ink-900 transition-colors duration-300 group-hover:text-juniper-700">
          {name}
        </h3>

        {rating > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((n) => (
                <StarIcon
                  key={n}
                  className={`h-4 w-4 ${
                    n <= Math.round(rating)
                      ? 'text-gold-400'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>

            {review_count > 0 && (
              <span className="text-xs text-ink-900/40">
                ({review_count})
              </span>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center gap-3">
          <span className="text-base font-medium text-ink-900">
            ${displayPrice.toFixed(2)}
          </span>

          {salePrice && (
            <span className="text-sm text-ink-900/40 line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}