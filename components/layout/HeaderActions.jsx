'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HeartIcon,
  ShoppingBagIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function HeaderActions({
  scrolled,
  setMobileOpen,
}) {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const iconColor = scrolled ? 'text-ink-900' : 'text-white';

  return (
    <div className="flex items-center gap-2.5 sm:gap-5">
      <Link
      href="/admin/products"
      className={`hidden lg:block text-[12px] uppercase tracking-[0.18em] transition-colors duration-300 ${
  scrolled
    ? 'text-ink-900 hover:text-clay-600'
    : 'text-white/90 hover:text-white'
}`}> Admin</Link>

      {!isAdminRoute && (
        <>
          <motion.div whileHover={{ y: -2 }}>
            <Link
              href="/wishlist"
              className={`relative block ${iconColor}`}
            >
              <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5" />

              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-clay-600 text-[9px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </motion.div>

          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => setIsCartOpen(true)}
            className={`relative ${iconColor}`}
          >
            <ShoppingBagIcon className="h-4 w-4 sm:h-5 sm:w-5" />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink-900 text-[9px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </motion.button>
        </>
      )}

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setMobileOpen(true)}
        className={`lg:hidden ${iconColor}`}
      >
        <Bars3Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </motion.button>
    </div>
  );
}