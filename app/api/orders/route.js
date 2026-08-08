import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  const body = await request.json();
  const { cartItems, shipping, paymentMethod, cardLastFour, subtotal, shippingCost, total } = body;

  if (!cartItems || cartItems.length === 0) {
    return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
  }

  // Step 1: decrement stock for every item first — back out before
  // writing anything permanent if any item is out of stock.
  for (const item of cartItems) {
    const { data: success, error: stockError } = await supabaseAdmin.rpc('decrement_stock', {
      product_id_input: item.id,
      quantity_input: item.quantity,
    });

    if (stockError || !success) {
      return NextResponse.json(
        { error: `Sorry, "${item.name}" no longer has enough stock. Please update your cart.` },
        { status: 400 }
      );
    }
  }

  // Step 2: create the order
  const orderId = uuidv4();

  const { error: orderError } = await supabaseAdmin.from('orders').insert({
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
    return NextResponse.json({ error: 'Something went wrong placing your order.' }, { status: 500 });
  }

  // Step 3: order line items
  const orderItems = cartItems.map((item) => ({
    order_id: orderId,
    product_id: item.id,
    quantity: item.quantity,
    selected_color: item.selectedColor,
    selected_size: item.selectedSize,
    price_at_purchase: item.salePrice ?? item.price,
  }));

  const { error: itemsError } = await supabaseAdmin.from('order_items').insert(orderItems);

  if (itemsError) {
    console.error('Order items insert error:', itemsError);
    // Order + stock already committed; flagged as a known partial-failure edge case.
  }

  return NextResponse.json({ orderId });
}