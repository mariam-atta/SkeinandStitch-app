'use client';

import Link from 'next/link';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import QuantityStepper from '@/components/product/QuantityStepper';
import Image from 'next/image';


export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.salePrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop — click to close */}
      <div
        className="absolute inset-0 bg-ink-900/40"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm bg-cream-0 h-full flex flex-col shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-stone-200">
          <h2 className="font-display text-xl text-ink-900">Your cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="text-ink-900/50 hover:text-ink-900"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <p className="text-sm text-ink-900/50 text-center py-12">
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => {
                const price = item.salePrice ?? item.price;
                return (
                  <div key={item.cartItemId} className="flex gap-3">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md">
                      {item.product_images?.[0]?.url ? (
                        <Image
                          src={item.product_images[0].url}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center text-[10px] text-ink-900/40">
                          Image</span>)}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-ink-900">{item.name}</p>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          aria-label="Remove item"
                          className="text-ink-900/40 hover:text-clay-600"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-ink-900/50 mb-2">
                        {item.selectedColor}
                        {item.selectedColor && item.selectedSize && ' · '}
                        {item.selectedSize}
                      </p>
                      <div className="flex items-center justify-between">
                        <QuantityStepper
                          quantity={item.quantity}
                          onChange={(qty) => updateQuantity(item.cartItemId, qty)}
                          max={item.stock}
                        />
                        <span className="text-sm text-ink-900">
                          ${(price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-5 border-t border-stone-200 space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-ink-900">Subtotal</span>
              <span className="text-ink-900">${subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center rounded-md border border-ink-900/20 px-4 py-2.5 text-sm font-medium text-ink-900 hover:border-ink-900/40"
            >
              View cart
            </Link>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center rounded-md bg-juniper-700 px-4 py-2.5 text-sm font-medium text-cream-0 hover:bg-juniper-800"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}