import Container from '@/components/layout/Container';

export default async function OrderDetailPage({ params }) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/orders/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-display text-2xl text-ink-900 mb-2">Order not found</h1>
        <p className="text-sm text-ink-900/60">
          Check the link you followed, or contact us if you think this is a mistake.
        </p>
      </Container>
    );
  }

  const { order, items } = await res.json();

  return (
    <Container className="py-16 max-w-2xl">
      <p className="text-xs text-ink-900/50 mb-2">Order</p>
      <h1 className="font-display text-3xl text-ink-900 mb-8">
        {order.first_name} {order.last_name}'s order
      </h1>

      <div className="rounded-lg border border-stone-200 p-6 mb-8">
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div>
                <p className="text-ink-900">{item.products?.name ?? 'Product'}</p>
                <p className="text-ink-900/50 text-xs">
                  Qty {item.quantity}
                  {item.selected_color && ` · ${item.selected_color}`}
                  {item.selected_size && ` · ${item.selected_size}`}
                </p>
              </div>
              <span className="text-ink-900">
                ${(item.price_at_purchase * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2 border-t border-stone-200 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-ink-900/60">Subtotal</span>
            <span className="text-ink-900">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ink-900/60">Shipping</span>
            <span className="text-ink-900">${order.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-medium border-t border-stone-200 pt-3 mt-1">
            <span className="text-ink-900">Total</span>
            <span className="text-ink-900">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-ink-900/70 space-y-1">
        <p className="font-medium text-ink-900 mb-2">Shipping to</p>
        <p>{order.address}</p>
        <p>{order.city}, {order.state} {order.zip}</p>
        <p>Payment: {order.payment_method === 'card' ? `•••• •••• •••• ${order.card_last_four}` : 'Cash on delivery'}</p>      </div>
    </Container>
  );
}