'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ReviewForm({ productId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitting(true);
    setErrorMessage(null);

    const { error } = await supabase.from('reviews').insert({
      product_id: productId,
      user_name: name,
      rating,
      comment,
    });

    setSubmitting(false);

    if (error) {
      console.error(error);
      setErrorMessage(
        'Something went wrong submitting your review. Please try again.'
      );
      return;
    }

    setSubmitted(true);
    router.refresh();
  }

  if (submitted) {
    return (
      <div className="mt-16 rounded-3xl border border-juniper-200 bg-[#F5FAF7] p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-juniper-700 text-xl text-white">
          ✓
        </div>

        <h3 className="font-display text-2xl text-ink-900">
          Thank You!
        </h3>

        <p className="mt-2 text-sm text-ink-900/60">
          Your review has been submitted successfully.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-16 rounded-3xl border border-stone-200 bg-[#FCFAF6] p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="font-display text-3xl text-ink-900">
          Leave a Review
        </h2>

        <p className="mt-2 text-sm text-ink-900/60">
          We'd love to hear about your experience with this handmade piece.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Rating */}

      <div className="mb-6">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-ink-900/50">
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-juniper-700"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} Star{n > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Name */}

      <div className="mb-6">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-ink-900/50">
          Your Name
        </label>

        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Sarah Ahmed"
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-stone-400 focus:border-juniper-700"
        />
      </div>

      {/* Comment */}

      <div className="mb-8">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-ink-900/50">
          Review
        </label>

        <textarea
          rows={5}
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us what you loved about this piece..."
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-stone-400 focus:border-juniper-700"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-juniper-700 px-8 py-3 text-sm font-medium tracking-wide text-white transition-all hover:bg-juniper-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}