'use client';

import { useState } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

const MAX_IMAGES = 4;

export default function ImageUploadField({ onChange }) {
  const [images, setImages] = useState([]); // [{ file, previewUrl }]

  function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    const remainingSlots = MAX_IMAGES - images.length;
    const filesToAdd = files.slice(0, remainingSlots);

    const newImages = filesToAdd.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    const updated = [...images, ...newImages];
    setImages(updated);
    onChange(updated.map((img) => img.file)); // passes raw File objects up — you handle the actual upload

    e.target.value = ''; // allow re-selecting the same file if removed and re-added
  }

  function handleRemove(index) {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onChange(updated.map((img) => img.file));
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {images.map((img, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={img.previewUrl}
              alt={`Reference upload ${index + 1}`}
              className="w-full h-full rounded-lg border border-stone-200 object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              aria-label="Remove image"
              className="absolute top-2 right-2 h-6 w-6 flex items-center justify-center rounded-full bg-ink-900/80 text-cream-0 hover:bg-ink-900"
            >
              <XMarkIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {images.length < MAX_IMAGES && (
          <label className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-stone-200 cursor-pointer hover:border-juniper-700 transition-colors">
            <PhotoIcon className="h-6 w-6 text-ink-900/30 mb-1" />
            <span className="text-xs text-ink-900/50 text-center px-2">
              Add image
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>
      <p className="text-xs text-ink-900/30 mt-2">
        Up to {MAX_IMAGES} images, optional.
      </p>
    </div>
  );
}