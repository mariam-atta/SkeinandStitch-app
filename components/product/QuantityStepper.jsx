'use client';

export default function QuantityStepper({ quantity, onChange, max }) {
  function decrement() {
    onChange(Math.max(1, quantity - 1));
  }

  function increment() {
    onChange(max ? Math.min(max, quantity + 1) : quantity + 1);
  }

  return (
    <div className="flex items-center border border-stone-200 rounded-md">
      <button
        onClick={decrement}
        className="h-10 w-10 flex items-center justify-center text-ink-900 hover:bg-stone-200/50"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-10 text-center text-sm text-ink-900">{quantity}</span>
      <button
        onClick={increment}
        className="h-10 w-10 flex items-center justify-center text-ink-900 hover:bg-stone-200/50"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}