import Container from '@/components/layout/Container';
import ProductForm from '@/components/admin/ProductForm';
import { supabase } from '@/lib/supabaseClient';

export default async function EditProductPage({ params }) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    return (
      <Container className="py-10">
        <p className="text-sm text-ink-900/60">Product not found.</p>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <h1 className="font-display text-2xl text-ink-900 mb-8">Edit product</h1>
      <ProductForm initialProduct={product} />
    </Container>
  );
}