import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

async function verifyAdmin(request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) return null;

  return data.user;
}

// ======================================================
// PUBLIC - GET PRODUCTS
// ======================================================
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const color = searchParams.get('color');
  const size = searchParams.get('size');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sort = searchParams.get('sort') || 'newest';
  const featured = searchParams.get('featured');

  let query = supabaseAdmin
    .from('products')
    .select('*, product_images(url, color, sort_order, is_primary)');

  if (category) {
    query = query.eq('category', category);
  }

  if (subcategory) {
    query = query.eq('subcategory', subcategory);
  }

  if (color) {
    query = query.contains('colors', [color]);
  }

  if (size) {
    query = query.contains('sizes', [size]);
  }

  if (featured === 'true') {
    query = query.eq('featured', true);
  }

  const { data, error } = await query;
  console.log('RAW SUPABASE DATA:', JSON.stringify(data?.[0], null, 2));

  if (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      },
      { status: 500 }
    );
  }

  let products = (data ?? []).map(product => {
    const images = product.product_images ?? [];

    // If a color filter is active, prefer that color's primary image.
    // Otherwise fall back to whichever image is marked primary,
    // then to the first image available.
    const relevantImages = color
  ? images.filter(
      img =>
        img.color?.trim().toLowerCase() === color.trim().toLowerCase()
    )
  : images;

    const primaryImage =
      relevantImages.find(img => img.is_primary) ??
      relevantImages[0] ??
      images.find(img => img.is_primary) ??
      images[0] ??
      null;

    return {
      ...product,
      salePrice: product.sale_price,
      effectivePrice: product.sale_price ?? product.price,
      image: primaryImage?.url ?? null,
    };
  });

  // Price filtering (effective price)
  if (minPrice) {
    products = products.filter(
      p => p.effectivePrice >= Number(minPrice)
    );
  }

  if (maxPrice) {
    products = products.filter(
      p => p.effectivePrice <= Number(maxPrice)
    );
  }

  // Sorting
  switch (sort) {
    case 'oldest':
      products.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      break;

    case 'price-asc':
      products.sort(
        (a, b) => a.effectivePrice - b.effectivePrice
      );
      break;

    case 'price-desc':
      products.sort(
        (a, b) => b.effectivePrice - a.effectivePrice
      );
      break;

    default:
      products.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
  }

  return NextResponse.json({ products });
}

// ======================================================
// ADMIN - CREATE PRODUCT
// ======================================================
export async function POST(request) {
  const user = await verifyAdmin(request);

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const payload = await request.json();

  const { data, error } = await supabaseAdmin
    .from('products')
    .insert(payload)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: 400 }
    );
  }

  return NextResponse.json({ product: data });
}