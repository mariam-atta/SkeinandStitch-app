'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import Container from '@/components/layout/Container';

function StarRow({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon
          key={n}
          className={`h-4 w-4 ${
            n <= rating ? 'text-gold-400' : 'text-stone-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection({
  reviews = [],
  avgRating,
  reviewCount,
}) {
  if (reviewCount === 0) return null;

  return (
    <section
  className="relative border-t border-[#E7DDCE]"
  style={{ background: '#FBF8F3' }}
>
      <Container className="py-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-clay-600">
            Loved by our customers
          </p>

          <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl text-ink-900 px-2">
            Crafted with care,
            <br />
            cherished for years.
          </h2>

          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 rounded-full border border-stone-200 bg-white px-4 sm:px-7 py-2.5 sm:py-3">
             <StarRow rating={Math.round(avgRating)} />

            <span className="font-semibold text-ink-900">
              {avgRating.toFixed(1)}
            </span>

            <span className="text-ink-900/40">
              ({reviewCount} Reviews)
            </span>
          </div>
        </motion.div>

        {/* Reviews */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                duration: .6,
              }}
              className="group rounded-3xl border border-[#8FA582]/50 bg-[#C8D8C4] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl" >
              <StarRow rating={review.rating} />

              <p className="mt-6 text-base leading-8 text-ink-900/80 italic">
              "{review.comment}"</p>

              <div className="mt-10 border-t border-stone-100 pt-5">
                <p className="font-medium text-ink-900">
                  {review.user_name}
                </p>

                {review.products?.name && (
                  <p className="mt-1 text-sm text-ink-900/40">
                    Purchased {review.products.name}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}