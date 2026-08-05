'use client';

import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Container from '@/components/layout/Container';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.salePrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <Container className="py-24 flex flex-col items-center text-center">
        <ShoppingBagIcon className="h-12 w-12 text-ink-900/20 mb-4" />
        <h1 className="font-display text-2xl text-ink-900 mb-2">Your cart is empty</h1>
        <p className="text-sm text-ink-900/60 mb-8">
          Looks like you haven't added anything yet.
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
      <h1 className="font-display text-3xl text-ink-900 mb-10">Your cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
        <div>
          {cartItems.map((item) => (
            <CartItem
              key={item.cartItemId}
              item={item}
              onQuantityChange={(item, newQty) => updateQuantity(item.cartItemId, newQty)}
              onRemove={(item) => removeFromCart(item.cartItemId)}
            />
          ))}
        </div>
        <CartSummary subtotal={subtotal} />
      </div>
    </Container>
  );
}