'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const CATEGORIES = ['women', 'men', 'kids', 'bags'];

export default function ProductForm({ initialProduct = null }) {
  const router = useRouter();
  const isEditing = Boolean(initialProduct);

  const [formData, setFormData] = useState({
    slug: initialProduct?.slug ?? '',
    name: initialProduct?.name ?? '',
    price: initialProduct?.price ?? '',
    sale_price: initialProduct?.sale_price ?? '',
    category: initialProduct?.category ?? CATEGORIES[0],
    subcategory: initialProduct?.subcategory ?? '',
    colors: initialProduct?.colors?.join(', ') ?? '',
    sizes: initialProduct?.sizes?.join(', ') ?? '',
    stock: initialProduct?.stock ?? 0,
    description: initialProduct?.description ?? '',
    featured: initialProduct?.featured ?? false,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [saving, setSaving] = useState(false);

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function parseListField(value) {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);

    const payload = {
      slug: formData.slug,
      name: formData.name,
      price: Number(formData.price),
      sale_price: formData.sale_price ? Number(formData.sale_price) : null,
      category: formData.category,
      subcategory: formData.subcategory || null,
      colors: formData.colors ? parseListField(formData.colors) : null,
      sizes: formData.sizes ? parseListField(formData.sizes) : null,
      stock: Number(formData.stock),
      description: formData.description,
      featured: formData.featured,
    };

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    const response = await fetch(
      isEditing
      ? `/api/adminproducts/${initialProduct.id}`
      : '/api/products',
      {
        method: isEditing ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),}
      );
      
    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      console.error('Product save error:', result);
      setErrorMessage(
        result.code === '23505'
          ? 'That slug is already in use by another product.'
          : 'Something went wrong saving this product.'
      );
      return;
    }

    router.push('/admin/products');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {errorMessage && (
        <p className="rounded-md bg-clay-600/10 border border-clay-600/30 px-4 py-3 text-sm text-clay-600">
          {errorMessage}
        </p>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-2">
          Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-2">
          Slug (URL-friendly, unique — e.g. "oat-cable-cardigan")
        </label>
        <input
          type="text"
          required
          value={formData.slug}
          onChange={(e) => updateField('slug', e.target.value)}
          className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-2">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.price}
            onChange={(e) => updateField('price', e.target.value)}
            className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-2">
            Sale price (optional)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.sale_price}
            onChange={(e) => updateField('sale_price', e.target.value)}
            className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => updateField('category', e.target.value)}
            className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900 capitalize"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-2">
            Subcategory (optional)
          </label>
          <input
            type="text"
            placeholder="e.g. cardigans, beanies"
            value={formData.subcategory}
            onChange={(e) => updateField('subcategory', e.target.value)}
            className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-2">
          Colors (comma-separated, optional)
        </label>
        <input
          type="text"
          placeholder="Cream, Sage, Charcoal"
          value={formData.colors}
          onChange={(e) => updateField('colors', e.target.value)}
          className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-2">
          Sizes (comma-separated, optional)
        </label>
        <input
          type="text"
          placeholder="S, M, L, XL"
          value={formData.sizes}
          onChange={(e) => updateField('sizes', e.target.value)}
          className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-2">
          Stock
        </label>
        <input
          type="number"
          required
          value={formData.stock}
          onChange={(e) => updateField('stock', e.target.value)}
          className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink-900/60 mb-2">
          Description
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="w-full rounded-md border border-stone-200 bg-cream-0 px-3 py-2.5 text-sm text-ink-900"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.featured}
          onChange={(e) => updateField('featured', e.target.checked)}
          className="h-4 w-4"
        />
        <span className="text-sm text-ink-900">Show on homepage (featured)</span>
      </label>

      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-juniper-700 px-6 py-3 text-sm font-medium text-cream-0 hover:bg-juniper-800 transition-colors disabled:opacity-50"
      >
        {saving ? 'Saving...' : isEditing ? 'Save changes' : 'Add product'}
      </button>
    </form>
  );
}