import { headers } from 'next/headers';
import Hero from '@/components/home/Hero';
import CategoryTiles from '@/components/home/CategoryTiles';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CustomizeBanner from '@/components/home/CustomizeBanner';

export default async function HomePage() {
  const headerList = await headers();

  const host = headerList.get('host');
  
  const protocol =
  headerList.get('x-forwarded-proto') ?? 'http';

  const response = await fetch(
  `${protocol}://${host}/api/products?featured=true`,
  {
    cache: 'no-store',
  }
);

  if (!response.ok) {
    throw new Error('Failed to fetch featured products');
  }

  const { products } = await response.json();

  const testimonialsResponse = await fetch(
    `${protocol}://${host}/api/reviews?limit=6`,
    {
      cache: 'no-store',
    }
  );

  if (!testimonialsResponse.ok) {
    throw new Error('Failed to fetch testimonials');
  }

  const { reviews, avgRating, reviewCount } = await testimonialsResponse.json();


  return (
  <>
    <Hero />

    <FeaturedProducts products={products} />

    <CategoryTiles />

    <TestimonialsSection
      reviews={reviews}
      avgRating={avgRating}
      reviewCount={reviewCount}
    />

    <CustomizeBanner />
  </>
);
}