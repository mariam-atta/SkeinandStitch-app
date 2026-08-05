import Link from 'next/link';
import Container from '@/components/layout/Container';
import DeleteProductButton from '@/components/admin/DeleteProductButton';
import { supabase } from '@/lib/supabaseClient';

export default async function AdminProductsPage() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products for admin:', error);
  }

  const products = data ?? [];

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl text-ink-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-juniper-700 px-5 py-2.5 text-sm font-medium text-cream-0 hover:bg-juniper-800 transition-colors"
        >
          Add product
        </Link>
      </div>

      <div className="border border-stone-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-200/40 text-left text-xs uppercase tracking-wide text-ink-900/60">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-stone-200">
                <td className="px-4 py-3 text-ink-900">{product.name}</td>
                <td className="px-4 py-3 text-ink-900/70 capitalize">
                  {product.category}
                  {product.subcategory && ` / ${product.subcategory}`}
                </td>
                <td className="px-4 py-3 text-ink-900/70">
                  ${product.price}
                  {product.sale_price && (
                    <span className="text-clay-600"> (${product.sale_price})</span>
                  )}
                </td>
                <td className="px-4 py-3 text-ink-900/70">
                  {product.stock === 0 ? (
                    <span className="text-clay-600">Out of stock</span>
                  ) : (
                    product.stock
                  )}
                </td>
                <td className="px-4 py-3 text-ink-900/70">
                  {product.featured ? 'Yes' : '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 justify-end">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-ink-900/60 hover:text-juniper-700 text-xs"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton productId={product.id} productName={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}