'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';
import QuantityStepper from '@/components/product/QuantityStepper';

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const {
    slug,
    name,
    price,
    salePrice,
    selectedColor,
    selectedSize,
    quantity,
    stock,
    product_images,
  } = item;

  const displayPrice = salePrice ?? price;
  const lineTotal = displayPrice * quantity;

  // Find the image that matches the selected color
  const selectedImage =
    product_images?.find(
      (image) =>
        image.color?.trim().toLowerCase() ===
        selectedColor?.trim().toLowerCase()
    ) ??
    product_images?.find((image) => image.is_primary) ??
    product_images?.[0];

  const imageUrl = selectedImage?.url;

  return (
    <article className="flex gap-4 border-b border-stone-200 py-6">
      {/* Product image */}
      <Link
        href={`/product/${slug}`}
        className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md bg-stone-100"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[10px] text-ink-900/40">
              Image
            </span>
          </div>
        )}
      </Link>

      {/* Product information */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/product/${slug}`}>
              <p className="text-sm font-medium text-ink-900 hover:text-juniper-700 transition-colors">
                {name}
              </p>
            </Link>

            <p className="text-xs text-ink-900/50 mt-1">
              {selectedColor && selectedColor}
              {selectedColor && selectedSize && ' · '}
              {selectedSize && `Size ${selectedSize}`}
            </p>
          </div>

          <button
            onClick={() => onRemove(item)}
            aria-label="Remove item"
            className="text-ink-900/40 hover:text-clay-600 transition-colors"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <QuantityStepper
            quantity={quantity}
            onChange={(newQty) => onQuantityChange(item, newQty)}
            max={stock}
          />

          <p className="text-sm font-medium text-ink-900">
            ${lineTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </article>
  );
}