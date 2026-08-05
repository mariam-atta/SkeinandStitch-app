import Container from '@/components/layout/Container';
import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <Container className="py-10">
      <h1 className="font-display text-2xl text-ink-900 mb-8">Add product</h1>
      <ProductForm />
    </Container>
  );
}