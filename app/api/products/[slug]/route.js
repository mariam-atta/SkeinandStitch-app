import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(request, { params }) {
  const { slug } = await params;

  // Get product
  const { data: product, error } = await supabaseAdmin
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

  if (error || !product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  // Get reviews for this product
  const { data: reviews, error: reviewsError } = await supabaseAdmin
    .from('reviews')
    .select('*')
    .eq('product_id', product.id)
    .order('created_at', { ascending: false });

  if (reviewsError) {
    return NextResponse.json(
      { error: reviewsError.message },
      { status: 500 }
    );
  }

  const sortedImages = (product.product_images || []).sort(
    (a, b) => a.sort_order - b.sort_order
  );
console.log("API HIT");
console.log(reviews);
  return NextResponse.json({
    product: {
      ...product,
      images: sortedImages,
      salePrice: product.sale_price,
      effectivePrice: product.sale_price ?? product.price,
    },
    reviews,
  });
}