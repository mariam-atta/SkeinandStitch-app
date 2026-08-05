'use client';

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
  } = item;

  const displayPrice = salePrice ?? price;
  const lineTotal = displayPrice * quantity;

  return (
    <div className="flex gap-4 py-6 border-b border-stone-200">
      {/* Placeholder image block — swap for real product image via next/image */}
      <Link href={`/product/${slug}`} className="shrink-0">
        <div className="h-24 w-20 rounded-md bg-stone-200/60 flex items-center justify-center">
          <span className="text-[10px] text-ink-900/40">Image</span>
        </div>
      </Link>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/product/${slug}`}>
              <p className="text-sm font-medium text-ink-900 hover:text-juniper-700 transition-colors">
                {name}
              </p>
            </Link>
            <p className="text-xs text-ink-900/50 mt-1">
              {selectedColor && `${selectedColor}`}
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
          <p className="text-sm font-medium text-ink-900">${lineTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}