import Link from 'next/link';

export default function CartSummary({ subtotal }) {
  return (
    <div className="rounded-lg border border-stone-200 p-6">
      <h2 className="font-display text-xl text-ink-900 mb-6">Order summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-ink-900/60">Subtotal</span>
          <span className="text-ink-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ink-900/60">Shipping</span>
          <span className="text-ink-900/60">Calculated at checkout</span>
        </div>
      </div>

      <div className="flex justify-between text-base font-medium border-t border-stone-200 pt-4 mb-6">
        <span className="text-ink-900">Total</span>
        <span className="text-ink-900">${subtotal.toFixed(2)}</span>
      </div>

      <Link
        href="/checkout"
        className="block w-full text-center rounded-md bg-juniper-700 px-6 py-3 text-sm font-medium text-cream-0 hover:bg-juniper-800 transition-colors"
      >
        Proceed to checkout
      </Link>
    </div>
  );
}