import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(request, { params }) {
  const { slug } = await params;

  const { data, error } = await supabaseAdmin
    .from('products')
    .select(`
      *,
      product_images (
        id,
        url,
        color,
        sort_order
      )
    `)
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  const sortedImages = (data.product_images || []).sort(
    (a, b) => a.sort_order - b.sort_order
  );

  return NextResponse.json({
    product: {
      ...data,
      images: sortedImages,
      salePrice: data.sale_price,
      effectivePrice: data.sale_price ?? data.price,
    },
  });
}