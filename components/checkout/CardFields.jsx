'use client';

// Formatting only (spacing digits as you type) — no validation logic,
// no storage, no transmission. Just makes the fields look/feel real.
function formatCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export default function CardFields({ formData, onChange }) {
  function update(field, value) {
    onChange({ ...formData, [field]: value });
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Card number"
        autoComplete="off"
        required
        value={formData.cardNumber}
        onChange={(e) => update('cardNumber', formatCardNumber(e.target.value))}
        className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
      />
      <input
        type="text"
        placeholder="Name on card"
        autoComplete="off"
        required
        value={formData.cardName}
        onChange={(e) => update('cardName', e.target.value)}
        className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="MM/YY"
          autoComplete="off"
          required
          value={formData.expiry}
          onChange={(e) => update('expiry', formatExpiry(e.target.value))}
          className="rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
        <input
          type="text"
          placeholder="CVC"
          autoComplete="off"
          required
          maxLength={4}
          value={formData.cvc}
          onChange={(e) => update('cvc', e.target.value.replace(/\D/g, ''))}
          className="rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
      </div>
      <p className="text-xs text-ink-900/40">
        This is a demo checkout — no real payment is processed.
      </p>
    </div>
  );
}