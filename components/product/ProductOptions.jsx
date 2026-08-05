'use client';

import { useState } from 'react';
import {
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import QuantityStepper from './QuantityStepper';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductOptions({ product }) {
  const { stock, price, salePrice } = product;

  const colors = product.colors ?? [];
  const sizes = product.sizes ?? [];

  const [selectedColor, setSelectedColor] = useState(colors[0] ?? null);
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const saved = isInWishlist(product.id);

  const isOutOfStock = stock === 0;
  const displayPrice = salePrice ?? price;

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedColor, selectedSize);
    }

    setIsCartOpen(true);
  }

  return (
    <div className="space-y-10">

      {/* Price */}
      <div>
        <div className="flex items-end gap-4">

          <span className="font-display text-4xl text-ink-900">
            ${displayPrice.toFixed(2)}
          </span>

          {salePrice && (
            <span className="mb-1 text-xl text-stone-400 line-through">
              ${price.toFixed(2)}
            </span>
          )}

        </div>

        <p className="mt-3 max-w-md text-sm leading-7 text-ink-900/65">
          Carefully handcrafted using premium yarns with timeless textures,
          designed to become a staple piece you'll wear season after season.
        </p>
      </div>

      {/* Color */}
      {colors.length > 0 && (
        <div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-900/50">
            Choose Color
          </p>

          <div className="flex flex-wrap gap-3">

            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`rounded-full px-6 py-3 text-sm transition-all duration-300 ${
                  selectedColor === color
                    ? 'bg-juniper-700 text-white shadow-md'
                    : 'border border-stone-300 bg-white hover:border-juniper-700 hover:bg-[#F8F5EF]'
                }`}
              >
                {color}
              </button>
            ))}

          </div>

        </div>
      )}

      {/* Size */}
      {sizes.length > 0 && (
        <div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-900/50">
            Choose Size
          </p>

          <div className="flex flex-wrap gap-3">

            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm transition-all duration-300 ${
                  selectedSize === size
                    ? 'bg-juniper-700 text-white shadow-md'
                    : 'border border-stone-300 bg-white hover:border-juniper-700'
                }`}
              >
                {size}
              </button>
            ))}

          </div>

        </div>
      )}

      {/* Quantity */}
      <div>

        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-900/50">
          Quantity
        </p>

        <QuantityStepper
          quantity={quantity}
          onChange={setQuantity}
          max={stock}
        />

      </div>

      {/* Buttons */}
      <div className="flex gap-4">

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 rounded-2xl px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-300 ${
            isOutOfStock
              ? 'cursor-not-allowed bg-stone-200 text-stone-400'
              : 'bg-[#1C4A40] text-white hover:-translate-y-0.5 hover:bg-[#173C35] hover:shadow-xl'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>

        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Wishlist"
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
            saved
              ? 'border-clay-600 bg-clay-50 text-clay-600'
              : 'border-stone-300 bg-white hover:border-juniper-700 hover:text-juniper-700'
          }`}
        >
          <HeartIcon
            className="h-6 w-6"
            fill={saved ? 'currentColor' : 'none'}
          />
        </button>

      </div>

      {/* Trust Section */}
      <div className="rounded-3xl border border-stone-200 bg-[#FBF8F2] p-6">

        <div className="space-y-5 text-sm text-ink-900/75">

          <div className="flex items-center gap-4">
            <SparklesIcon className="h-5 w-5 text-juniper-700" />
            <span>Handcrafted with premium quality yarn.</span>
          </div>

          <div className="flex items-center gap-4">
            <TruckIcon className="h-5 w-5 text-juniper-700" />
            <span>Ships within 3–5 business days.</span>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheckIcon className="h-5 w-5 text-juniper-700" />
            <span>Secure checkout and easy returns.</span>
          </div>

        </div>

      </div>

    </div>
  );
}