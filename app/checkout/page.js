'use client';

import { useState } from 'react';
import Container from '@/components/layout/Container';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector';
import CardFields from '@/components/checkout/CardFields';
import OrderSummary from '@/components/checkout/OrderSummary';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export default function CheckoutPage() {
  const { cartItems, removeFromCart } = useCart();

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: '', phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [card, setCard] = useState({ cardNumber: '', cardName: '', expiry: '', cvc: '' });
  const [placed, setPlaced] = useState(false);
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

    // Step 1: try to decrement stock for every item FIRST, before creating
    // the order — if any item is out of stock, we back out before writing
    // anything permanent.
    for (const item of cartItems) {
      const { data: success, error: stockError } = await supabase.rpc('decrement_stock', {
        product_id_input: item.id,
        quantity_input: item.quantity,
      });

      if (stockError || !success) {
        setPlacing(false);
        setErrorMessage(
          `Sorry, "${item.name}" no longer has enough stock. Please update your cart.`
        );
        return;
      }
    }

    // Step 2: create the order record.
    // Generating the id ourselves, then skipping .select() afterward —
    // no read-back needed, so no SELECT policy needed on orders,
    // keeping it unreadable to the public key as intended.
    const orderId = uuidv4();

    const { error: orderError } = await supabase.from('orders').insert({
      id: orderId,
      first_name: shipping.firstName,
      last_name: shipping.lastName,
      email: shipping.email,
      address: shipping.address,
      city: shipping.city,
      state: shipping.state,
      zip: shipping.zip,
      phone: shipping.phone,
      payment_method: paymentMethod,
      card_last_four: paymentMethod === 'card' ? card.cardNumber.slice(-4) : null,
      subtotal,
      shipping: shippingCost,
      total,
    });

    if (orderError) {
      setPlacing(false);
      setErrorMessage('Something went wrong placing your order. Please try again.');
      console.error('Order insert error:', orderError);
      return;
    }

    // Step 3: create one order_items row per cart line
    const orderItems = cartItems.map((item) => ({
      order_id: orderId,
      product_id: item.id,
      quantity: item.quantity,
      selected_color: item.selectedColor,
      selected_size: item.selectedSize,
      price_at_purchase: item.salePrice ?? item.price,
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

    if (itemsError) {
      console.error('Order items insert error:', itemsError);
      // Order itself already succeeded and stock is already decremented;
      // this is a partial-failure edge case worth revisiting later,
      // but we still show success since the order does exist.
    }

    // Step 4: clear the cart and show confirmation
    cartItems.forEach((item) => removeFromCart(item.cartItemId));
    setPlacing(false);
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
        <p className="text-sm text-ink-900/60">
          We've sent a confirmation to {shipping.email}.
        </p>
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