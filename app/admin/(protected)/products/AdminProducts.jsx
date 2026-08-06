'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Container from '@/components/layout/Container';
import DeleteProductButton from '@/components/admin/DeleteProductButton';
import { supabase } from '@/lib/supabaseClient';

export default function AdminProducts({ products }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace('/admin/login');
        return;
      }

      setLoading(false);
    }

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-juniper-700 border-t-transparent" />
          <p className="text-sm text-ink-900/60">
            Checking permissions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Container className="py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink-900">
          Products
        </h1>

        <Link
          href="/admin/products/new"
          className="rounded-full bg-juniper-700 px-6 py-3 text-sm font-medium text-cream-0 transition hover:bg-juniper-800"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-stone-100">
            <tr className="text-left uppercase tracking-wider text-xs text-ink-900/60">
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Stock</th>
              <th className="px-5 py-4">Featured</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-stone-200 transition hover:bg-stone-50"
              >
                <td className="px-5 py-4 font-medium text-ink-900">
                  {product.name}
                </td>

                <td className="px-5 py-4 text-ink-900/60 capitalize">
                  {product.category}
                  {product.subcategory && ` / ${product.subcategory}`}
                </td>

                <td className="px-5 py-4 text-ink-900/60">
                  ${product.price}
                </td>

                <td className="px-5 py-4 text-ink-900/60">
                  {product.stock === 0 ? 'Out of Stock' : product.stock}
                </td>

                <td className="px-5 py-4 text-ink-900/60">
                  {product.featured ? 'Yes' : '—'}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-4">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-juniper-700 hover:underline"
                    >
                      Edit
                    </Link>

                    <DeleteProductButton
                      productId={product.id}
                      productName={product.name}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-14 text-center text-ink-900/50"
                >
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
}