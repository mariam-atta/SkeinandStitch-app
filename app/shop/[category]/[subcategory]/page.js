import { headers } from 'next/headers';
import Container from '@/components/layout/Container';
import ProductFilters from '@/components/product/ProductFilters';
import ProductGrid from '@/components/product/ProductGrid';
import FilterDrawer from '@/components/product/FilterDrawer';

export default async function SubcategoryPage({ params, searchParams }) {
  const { category, subcategory } = await params;
  const resolvedSearchParams = await searchParams;

  const categoryLabel =
    category.charAt(0).toUpperCase() + category.slice(1);

  const subcategoryLabel =
    subcategory.charAt(0).toUpperCase() + subcategory.slice(1);

  const query = new URLSearchParams();

  query.set('category', category);
  query.set('subcategory', subcategory);

  if (resolvedSearchParams.color) {
    query.set('color', resolvedSearchParams.color);
  }

  if (resolvedSearchParams.size) {
    query.set('size', resolvedSearchParams.size);
  }

  if (resolvedSearchParams.minPrice) {
    query.set('minPrice', resolvedSearchParams.minPrice);
  }

  if (resolvedSearchParams.maxPrice) {
    query.set('maxPrice', resolvedSearchParams.maxPrice);
  }

  if (resolvedSearchParams.sort) {
    query.set('sort', resolvedSearchParams.sort);
  }

  // Get current host
  const headerList = await headers();
  const host = headerList.get('host');
  const protocol =
    process.env.NODE_ENV === 'development' ? 'http' : 'http';

  const res = await fetch(
    `${protocol}://${host}/api/products?${query.toString()}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const { products } = await res.json();

  return (
    <Container className="pt-40 pb-16">
      <p className="mb-2 text-xs text-ink-900/50">
        Shop / {categoryLabel} / {subcategoryLabel}
      </p>

      <h1 className="mb-10 font-display text-3xl text-ink-900">
        {subcategoryLabel}
      </h1>

      <FilterDrawer />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <ProductFilters />
        </aside>

        <ProductGrid products={products} />
      </div>
    </Container>
  );
}