'use client';

import { useState } from 'react';
import Container from '@/components/layout/Container';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector';
import CardFields from '@/components/checkout/CardFields';
import OrderSummary from '@/components/checkout/OrderSummary';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems, removeFromCart } = useCart();

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: '', phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [card, setCard] = useState({ cardNumber: '', cardName: '', expiry: '', cvc: '' });
  const [placed, setPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [placing, setPlacing] = useState(false);

  const shippingCost = 6;
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.salePrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);
  const total = subtotal + shippingCost;

  async function handlePlaceOrder(e) {
    e.preventDefault();
    setPlacing(true);
    setErrorMessage(null);

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartItems,
        shipping,
        paymentMethod,
        cardLastFour: paymentMethod === 'card' ? card.cardNumber.slice(-4) : null,
        subtotal,
        shippingCost,
        total,
      }),
    });

    const result = await response.json();
    setPlacing(false);

    if (!response.ok) {
      setErrorMessage(result.error || 'Something went wrong placing your order. Please try again.');
      return;
    }

    cartItems.forEach((item) => removeFromCart(item.cartItemId));
    setPlacedOrderId(result.orderId);
    setPlaced(true);
  }

  if (cartItems.length === 0 && !placed) {
    return (
      <Container className="py-24 text-center">
        <p className="text-sm text-ink-900/60">Your cart is empty.</p>
      </Container>
    );
  }

  if (placed) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-display text-3xl text-ink-900 mb-3">Order confirmed</h1>
        <p className="text-sm text-ink-900/60 mb-6">
          We've sent a confirmation to {shipping.email}.
        </p>
        <Link
          href={`/orders/${placedOrderId}`}
          className="text-sm font-medium text-juniper-700 hover:underline"
        >
          View your order →
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <h1 className="font-display text-3xl text-ink-900 mb-10">Checkout</h1>

      {errorMessage && (
        <p className="mb-6 rounded-md bg-clay-600/10 border border-clay-600/30 px-4 py-3 text-sm text-clay-600">
          {errorMessage}
        </p>
      )}

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12"
      >
        <div className="space-y-10">
          <ShippingForm formData={shipping} onChange={setShipping} />

          <div>
            <h2 className="font-display text-xl text-ink-900 mb-4">Payment method</h2>
            <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
            {paymentMethod === 'card' && (
              <div className="mt-4">
                <CardFields formData={card} onChange={setCard} />
              </div>
            )}
          </div>
        </div>

        <div>
          <OrderSummary items={cartItems} subtotal={subtotal} shipping={shippingCost} />
          <button
            type="submit"
            disabled={placing}
            className="w-full mt-4 rounded-md bg-juniper-700 px-6 py-3 text-sm font-medium text-cream-0 hover:bg-juniper-800 transition-colors disabled:opacity-50"
          >
            {placing ? 'Placing order...' : 'Place order'}
          </button>
        </div>
      </form>
    </Container>
  );
}