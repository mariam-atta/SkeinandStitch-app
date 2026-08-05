import { headers } from 'next/headers';
import Container from '@/components/layout/Container';
import ProductFilters from '@/components/product/ProductFilters';
import ProductGrid from '@/components/product/ProductGrid';
import FilterDrawer from '@/components/product/FilterDrawer';

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  const categoryLabel =
    category.charAt(0).toUpperCase() + category.slice(1);

  const query = new URLSearchParams();

  query.set('category', category);

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

  const headerList = await headers();

  const protocol =
    headerList.get('x-forwarded-proto') ?? 'http';

  const host = headerList.get('host');

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
    <Container className="py-12">
      <p className="text-xs text-ink-900/50 mb-2">
        Shop / {categoryLabel}
      </p>

      <h1 className="font-display text-3xl text-ink-900 mb-10">
        {categoryLabel}
      </h1>

      <FilterDrawer />

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
        <aside className="hidden lg:block">
          <ProductFilters />
        </aside>

        <ProductGrid products={products} />
      </div>
    </Container>
  );
}