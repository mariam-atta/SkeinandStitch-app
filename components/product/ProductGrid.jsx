import ProductCard from './ProductCard';

export default function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <p className="text-sm text-ink-900/50 py-12">
        No products match these filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}