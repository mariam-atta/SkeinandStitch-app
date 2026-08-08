import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(request, { params }) {
  const { id } = await params;

  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (orderError || !order) {
    return NextResponse.json(
      { error: 'Order not found' },
      { status: 404 }
    );
  }

  const { data: items, error: itemsError } = await supabaseAdmin
    .from('order_items')
    .select(`
      *,
      products(
        name,
        slug,
        product_images(url, is_primary)
      )
    `)
    .eq('order_id', id);

  if (itemsError) {
    console.error('Order items fetch error:', itemsError);
  }

  const formattedItems = (items ?? []).map((item) => {
    const images = item.products?.product_images ?? [];
    const image =
      images.find((img) => img.is_primary)?.url ??
      images[0]?.url ??
      null;

    return {
      ...item,
      products: {
        ...item.products,
        image,
      },
    };
  });

  return NextResponse.json({
    order,
    items: formattedItems,
  });
}