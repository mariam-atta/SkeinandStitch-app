import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  const body = await request.json();

  const {
    cartItems,
    shipping,
    paymentMethod,
    cardLastFour,
  } = body;

  if (!cartItems || cartItems.length === 0) {
    return NextResponse.json(
      { error: 'Cart is empty.' },
      { status: 400 }
    );
  }

  // Calculate prices on the server
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.salePrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);

  const shippingCost = subtotal >= 75 ? 0 : 6;
  const total = subtotal + shippingCost;

  // Decrease stock
  for (const item of cartItems) {
    const { data: success, error } = await supabaseAdmin.rpc(
      'decrement_stock',
      {
        product_id_input: item.id,
        quantity_input: item.quantity,
      }
    );

    if (error || !success) {
      return NextResponse.json(
        {
          error: `"${item.name}" no longer has enough stock. Please update your cart.`,
        },
        { status: 400 }
      );
    }
  }

  // Create order
  const orderId = uuidv4();

  const { error: orderError } = await supabaseAdmin
    .from('orders')
    .insert({
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
      card_last_four: cardLastFour,
      subtotal,
      shipping: shippingCost,
      total,
    });

  if (orderError) {
    console.error('Order insert error:', orderError);

    return NextResponse.json(
      { error: 'Something went wrong placing your order.' },
      { status: 500 }
    );
  }

  // Create order items
  const orderItems = cartItems.map((item) => ({
    order_id: orderId,
    product_id: item.id,
    quantity: item.quantity,
    selected_color: item.selectedColor,
    selected_size: item.selectedSize,
    price_at_purchase: item.salePrice ?? item.price,
  }));

  const { error: itemsError } = await supabaseAdmin
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Order items insert error:', itemsError);
  }

  return NextResponse.json({ orderId });
}