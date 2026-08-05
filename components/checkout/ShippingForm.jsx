'use client';

export default function ShippingForm({ formData, onChange }) {
  function update(field, value) {
    onChange({ ...formData, [field]: value });
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl text-ink-900 mb-2">Shipping details</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First name"
          required
          value={formData.firstName}
          onChange={(e) => update('firstName', e.target.value)}
          className="rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
        <input
          type="text"
          placeholder="Last name"
          required
          value={formData.lastName}
          onChange={(e) => update('lastName', e.target.value)}
          className="rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
      </div>

      <input
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={(e) => update('email', e.target.value)}
        className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
      />

      <input
        type="text"
        placeholder="Street address"
        required
        value={formData.address}
        onChange={(e) => update('address', e.target.value)}
        className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
      />

      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="City"
          required
          value={formData.city}
          onChange={(e) => update('city', e.target.value)}
          className="rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
        <input
          type="text"
          placeholder="State"
          required
          value={formData.state}
          onChange={(e) => update('state', e.target.value)}
          className="rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
        <input
          type="text"
          placeholder="ZIP code"
          required
          value={formData.zip}
          onChange={(e) => update('zip', e.target.value)}
          className="rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
      </div>

      <input
        type="tel"
        placeholder="Phone number"
        required
        value={formData.phone}
        onChange={(e) => update('phone', e.target.value)}
        className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
      />
    </div>
  );
}