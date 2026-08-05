'use client';

import { useState } from 'react';
import SectionCard from './SectionCard';
import ProductSelector from './ProductSelector';
import ImageUploadField from './ImageUploadField';
import ColorGradientSlider from './ColorGradientSlider';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const YARN_SHADES = [
  { label: 'Cream', hex: '#F5EFE3' },
  { label: 'Sage', hex: '#B9C9AE' },
  { label: 'Light Pink', hex: '#E8C4C4' },
  { label: 'Light Blue', hex: '#B8CDD9' },
  { label: 'Lavender', hex: '#D3C5DE' },
  { label: 'Sand', hex: '#E3D0B5' },
  { label: 'Charcoal', hex: '#33302A' },
  { label: 'Navy', hex: '#2A3A4A' },
  { label: 'Plum', hex: '#5B3A5E' },
  { label: 'Rust', hex: '#8C4A2F' },
  { label: 'Forest Green', hex: '#3F5A45' },
  { label: 'Burgundy', hex: '#6B2E3A' },
];

export default function CustomizeForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    productType: 'Cardigan',
    colorNote: '',
    size: 'M',
    notes: '',
  });

  const [referenceImages, setReferenceImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function selectSwatch(shade) {
    updateField('colorNote', shade.label);
  }

  function handleSliderChange(hex, nearestLabel) {
    updateField('colorNote', `${nearestLabel} (${hex})`);
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      ...formData,
      referenceImages,
    });

    setSubmitted(true);
  }
  return (
  <form onSubmit={handleSubmit} className="space-y-10">

    <SectionCard
      number="01"
      title="Choose Your Piece"
      description="Select the handmade item you'd like us to create."
    >
      <ProductSelector
        selected={formData.productType}
        onChange={(value) => updateField('productType', value)}
      />
    </SectionCard>

    <SectionCard
      number="02"
      title="Choose Your Yarn"
      description="Select a yarn shade or fine tune the exact colour."
    >
      <div className="space-y-8">

        <div className="flex flex-wrap gap-3">
          {YARN_SHADES.map((shade) => (
            <button
              key={shade.label}
              type="button"
              onClick={() => selectSwatch(shade)}
              title={shade.label}
              className={`group relative h-14 w-14 rounded-full transition-all duration-300 ${
                formData.colorNote === shade.label
                  ? 'scale-110 ring-4 ring-juniper-700/20'
                  : 'hover:scale-105'
              }`}
              style={{ backgroundColor: shade.hex }}
            >
              <span
                className={`absolute inset-0 rounded-full border-2 ${
                  formData.colorNote === shade.label
                    ? 'border-juniper-700'
                    : 'border-white'
                }`}
              />
            </button>
          ))}
        </div>

        <ColorGradientSlider onChange={handleSliderChange} />

        <input
          type="text"
          value={formData.colorNote}
          onChange={(e) => updateField('colorNote', e.target.value)}
          placeholder="Type a colour name if you have something specific..."
          className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm outline-none transition-all duration-300 focus:border-juniper-700"
        />
      </div>
    </SectionCard>

    <SectionCard
      number="03"
      title="Reference Images"
      description="Upload inspiration photos, Pinterest screenshots or sketches."
    >
      <ImageUploadField onChange={setReferenceImages} />
    </SectionCard>

    <SectionCard
      number="04"
      title="Your Details"
      description="Tell us where we can reach you."
    >
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-ink-900/50">
            Name
          </label>

          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 outline-none transition-all duration-300 focus:border-juniper-700"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-ink-900/50">
            Email / Phone
          </label>

          <input
            type="text"
            required
            value={formData.contact}
            onChange={(e) => updateField('contact', e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 outline-none transition-all duration-300 focus:border-juniper-700"
          />
        </div>

      </div>

      <div className="mt-8">

        <label className="mb-4 block text-xs uppercase tracking-[0.25em] text-ink-900/50">
          Size
        </label>

        <div className="flex flex-wrap gap-3">

          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => updateField('size', size)}
              className={`rounded-full px-7 py-3 text-sm transition-all duration-300 ${
                formData.size === size
                  ? 'bg-juniper-700 text-white shadow-lg'
                  : 'border border-stone-200 bg-white hover:border-juniper-700'
              }`}
            >
              {size}
            </button>
          ))}

        </div>

      </div>
    </SectionCard>

    <SectionCard
      number="05"
      title="Final Touches"
      description="Anything else you'd like us to know?"
    >
      <textarea
        rows={6}
        value={formData.notes}
        onChange={(e) => updateField('notes', e.target.value)}
        placeholder="Describe your dream crochet piece..."
        className="w-full rounded-3xl border border-stone-200 bg-white px-6 py-5 outline-none transition-all duration-300 focus:border-juniper-700"
      />
    </SectionCard>

    <div className="flex justify-center pt-4">

      <button
        type="submit"
        className="rounded-full bg-juniper-700 px-10 py-4 font-medium text-white transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:bg-juniper-800 hover:shadow-2xl"
      >
        Start My Custom Order →
      </button>

    </div>

  </form>
);
}