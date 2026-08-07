import { headers } from 'next/headers';
import Container from '@/components/layout/Container';
import ProductGallery from '@/components/product/ProductGallery';
import ProductOptions from '@/components/product/ProductOptions';
import ReviewSection from '@/components/product/ReviewSection';

export default async function ProductPage({ params }) {
  const { slug } = await params;

  // Get current host
  const headerList = await headers();
  const host = headerList.get('host');
  const protocol =
    process.env.NODE_ENV === 'development' ? 'http' : 'http';

  const res = await fetch(
    `${protocol}://${host}/api/products/${slug}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    return (
      <Container className="pt-40 pb-24 text-center">
        <h1 className="mb-2 font-display text-2xl text-ink-900">
          Product not found
        </h1>

        <p className="text-sm text-ink-900/60">
          This item may have been removed or the link is incorrect.
        </p>
      </Container>
    );
  }

  const { product, reviews } = await res.json();

  return (
    <Container className="pt-24 lg:pt-40 pb-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ProductGallery images={product.images ?? []} />

        <div>
          <h1 className="mb-2 font-display text-4xl text-ink-900">
            {product.name}
          </h1>

          <p className="mb-8 text-sm leading-relaxed text-ink-900/60">
            {product.description}
          </p>

          <ProductOptions product={product} />
        </div>
      </div>

      <ReviewSection
        reviews={reviews}
        rating={product.rating}
        reviewCount={product.review_count}
        productId={product.id}
      />
    </Container>
  );
}