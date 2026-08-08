import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';

export default async function OrderDetailPage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/orders/${id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-display text-3xl text-ink-900">
          Order not found
        </h1>
        <p className="mt-3 text-sm text-ink-900/60">
          Check the link you followed, or contact us if you think this is a mistake.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-md bg-juniper-700 px-6 py-3 text-sm font-medium text-cream-0 hover:bg-juniper-800"
        >
          Continue shopping
        </Link>
      </Container>
    );
  }

  const { order, items } = await res.json();

  return (
    <Container className="py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-juniper-700 text-cream-0">
          ✓
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-clay-600">
          Thank you for your order
        </p>

        <h1 className="font-display text-4xl text-ink-900">
          Order confirmed
        </h1>

        <p className="mt-3 text-sm text-ink-900/60">
          {order.first_name} {order.last_name}'s order
        </p>

        <p className="mt-1 text-xs text-ink-900/40">
          Order #{order.id}
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_320px]">
        {/* Products */}
        <div className="rounded-lg border border-stone-200 bg-cream-0">
          <div className="border-b border-stone-200 p-6">
            <h2 className="font-display text-xl text-ink-900">
              Your items
            </h2>
          </div>

          <div className="divide-y divide-stone-200">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-6"
              >
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-stone-100">
                  {item.products?.image ? (
                    <Image
                      src={item.products.image}
                      alt={item.products.name ?? 'Product'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] text-ink-900/30">
                      Image
                    </div>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-ink-900">
                      {item.products?.name ?? 'Product'}
                    </h3>

                    <p className="mt-1 text-xs text-ink-900/50">
                      Qty {item.quantity}
                      {item.selected_color && ` · ${item.selected_color}`}
                      {item.selected_size && ` · ${item.selected_size}`}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-ink-900">
                    ${(item.price_at_purchase * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Order summary */}
          <div className="rounded-lg border border-stone-200 p-6">
            <h2 className="mb-5 font-display text-xl text-ink-900">
              Order summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-900/60">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-ink-900/60">Shipping</span>
                <span>
                  {order.shipping === 0
                    ? 'Free'
                    : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between border-t border-stone-200 pt-4 text-base font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-lg border border-stone-200 p-6">
            <h2 className="mb-4 font-display text-xl text-ink-900">
              Shipping to
            </h2>

            <div className="space-y-1 text-sm text-ink-900/70">
              <p className="font-medium text-ink-900">
                {order.first_name} {order.last_name}
              </p>
              <p>{order.address}</p>
              <p>
                {order.city}, {order.state} {order.zip}
              </p>
              <p>{order.phone}</p>
              <p>{order.email}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-lg border border-stone-200 p-6">
            <h2 className="mb-4 font-display text-xl text-ink-900">
              Payment
            </h2>

            <p className="text-sm text-ink-900/70">
            {order.payment_method === 'card'
            ? `Card •••• •••• •••• ${order.card_last_four}`
            : 'Cash on delivery'}</p>
          </div>

          <Link
            href="/shop"
            className="block w-full rounded-md bg-juniper-700 px-6 py-3 text-center text-sm font-medium text-cream-0 transition-colors hover:bg-juniper-800"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </Container>
  );
}