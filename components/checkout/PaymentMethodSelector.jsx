'use client';

export default function PaymentMethodSelector({ value, onChange }) {
  return (
    <div className="flex gap-3">
      {['card', 'cash'].map((method) => (
        <button
          key={method}
          type="button"
          onClick={() => onChange(method)}
          className={`flex-1 rounded-md border px-4 py-3 text-sm font-medium capitalize transition-colors ${
            value === method
              ? 'border-juniper-700 bg-juniper-700 text-cream-0'
              : 'border-stone-200 text-ink-900 hover:border-juniper-700'
          }`}
        >
          {method === 'card' ? 'Card' : 'Cash on delivery'}
        </button>
      ))}
    </div>
  );
}