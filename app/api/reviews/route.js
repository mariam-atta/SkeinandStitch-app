import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit')) || 6;

  const { data: allRatings, error: ratingsError } = await supabaseAdmin
    .from('reviews')
    .select('rating');

  if (ratingsError) {
    return NextResponse.json({ error: ratingsError.message }, { status: 500 });
  }

  const reviewCount = allRatings?.length ?? 0;
  const avgRating =
    reviewCount > 0
      ? allRatings.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0;

  const { data: topReviews, error: reviewsError } = await supabaseAdmin
    .from('reviews')
    .select('*, products(name, slug)')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (reviewsError) {
    return NextResponse.json({ error: reviewsError.message }, { status: 500 });
  }

  return NextResponse.json({
    reviews: topReviews ?? [],
    avgRating,
    reviewCount,
  });
}