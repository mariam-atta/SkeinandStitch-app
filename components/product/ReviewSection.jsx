import { StarIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import ReviewForm from './ReviewForm';

export default function ReviewSection({
  reviews = [],
  rating,
  reviewCount,
  productId,
}) {
  return (
    <section className="mt-24 border-t border-stone-200 pt-20">
      {/* Header */}
      <div className="mb-14 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#5C7A52]">
          Customer Love
        </p>

        <h2 className="font-display text-4xl text-[#3F5137]">
          Customer Reviews
        </h2>

        {reviewCount > 0 && (
          <div className="mt-6 flex flex-col items-center">
            <div className="mb-2 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-6 w-6 ${
                    star <= Math.round(rating)
                      ? 'text-[#8FA582]'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>

            <p className="text-lg font-medium text-[#3F5137]">
              {rating.toFixed(1)} out of 5
            </p>

            <p className="mt-1 text-sm text-[#5C7A52]/70">
              Based on {reviewCount} verified review
              {reviewCount > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {/* Empty State */}
      {reviews.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#8FA582]/40 bg-[#F3F6EF] py-16 text-center">
          <h3 className="font-display text-2xl text-[#3F5137]">
            No reviews yet
          </h3>

          <p className="mt-3 text-sm text-[#5C7A52]">
            Be the first to share your experience.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-3xl border border-[#8FA582]/50 bg-[#DCE8D5] p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Stars */}
              <div className="mb-5 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-5 w-5 ${
                      star <= review.rating
                        ? 'text-[#8FA582]'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>

              {/* Name & Date */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#3F5137]">
                    {review.user_name}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-xs text-[#5C7A52]">
                    <CheckBadgeIcon className="h-4 w-4" />
                    <span>Verified Purchase</span>
                  </div>
                </div>

                <span className="text-xs text-[#5C7A52]/70">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>

              {/* Comment */}
              <p className="leading-8 text-[#3F5137]/80">
                "{review.comment}"
              </p>
            </article>
          ))}
        </div>
      )}

      {/* Review Form */}
      <div className="mt-20">
        <ReviewForm productId={productId} />
      </div>
    </section>
  );
}