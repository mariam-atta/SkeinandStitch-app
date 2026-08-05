export default function OrderSummary({ items, subtotal, shipping = 6 }) {
  const total = subtotal + shipping;

  return (
    <div className="rounded-lg border border-stone-200 p-6">
      <h2 className="font-display text-xl text-ink-900 mb-6">Order summary</h2>

      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {items.map((item) => {
          const price = item.salePrice ?? item.price;
          return (
            <div key={item.cartItemId} className="flex justify-between text-sm">
              <div>
                <p className="text-ink-900">{item.name}</p>
                <p className="text-ink-900/50 text-xs">
                  Qty {item.quantity}
                  {item.selectedColor && ` · ${item.selectedColor}`}
                  {item.selectedSize && ` · ${item.selectedSize}`}
                </p>
              </div>
              <span className="text-ink-900">${(price * item.quantity).toFixed(2)}</span>
            </div>
          );
        })}
      </div>

      <div className="space-y-2 border-t border-stone-200 pt-4 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-ink-900/60">Subtotal</span>
          <span className="text-ink-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ink-900/60">Shipping</span>
          <span className="text-ink-900">${shipping.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between text-base font-medium border-t border-stone-200 pt-4">
        <span className="text-ink-900">Total</span>
        <span className="text-ink-900">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}