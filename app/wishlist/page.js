'use client';

import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import Container from '@/components/layout/Container';
import WishlistProductCard from '@/components/wishlist/WishlistProductCard';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <Container className="py-24 flex flex-col items-center text-center">
        <HeartIcon className="h-12 w-12 text-ink-900/20 mb-4" />
        <h1 className="font-display text-2xl text-ink-900 mb-2">Your wishlist is empty</h1>
        <p className="text-sm text-ink-900/60 mb-8">
          Save pieces you love to find them here later.
        </p>
        <Link
          href="/shop/women"
          className="rounded-md bg-juniper-700 px-6 py-3 text-sm font-medium text-cream-0 hover:bg-juniper-800 transition-colors"
        >
          Browse the shop
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <h1 className="font-display text-3xl text-ink-900 mb-10">Your wishlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
        {wishlistItems.map((item) => (
          <WishlistProductCard key={item.id} product={item} onRemove={toggleWishlist} />
        ))}
      </div>
    </Container>
  );
}