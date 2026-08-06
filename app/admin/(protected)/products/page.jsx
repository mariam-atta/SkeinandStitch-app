import { supabase } from '@/lib/supabaseClient';
import AdminProducts from './AdminProducts';

export default async function AdminProductsPage() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
  }

  return <AdminProducts products={data ?? []} />;
}