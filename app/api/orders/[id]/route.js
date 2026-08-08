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
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const { data: items, error: itemsError } = await supabaseAdmin
    .from('order_items')
    .select('*, products(name, slug)')
    .eq('order_id', id);

  if (itemsError) {
    console.error('Order items fetch error:', itemsError);
  }

  return NextResponse.json({ order, items: items ?? [] });
}