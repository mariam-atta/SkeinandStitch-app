import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  const formData = await request.formData();

  const name = formData.get('name');
  const contact = formData.get('contact');
  const productType = formData.get('productType');
  const colorNote = formData.get('colorNote');
  const size = formData.get('size');
  const notes = formData.get('notes');
  const images = formData.getAll('images'); // File objects

  const imageUrls = [];

  for (const file of images) {
    if (!(file instanceof File) || file.size === 0) continue;

    const fileExt = file.name.split('.').pop();
    const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('customize-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Image upload error:', uploadError);
      continue; // skip this image, don't fail the whole submission
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from('customize-images')
      .getPublicUrl(filePath);

    imageUrls.push(publicUrlData.publicUrl);
  }

  const { error } = await supabaseAdmin.from('customize_requests').insert({
    name,
    contact,
    product_type: productType,
    color_note: colorNote,
    size,
    notes,
    image_urls: imageUrls,
  });

  if (error) {
    console.error('Customize request insert error:', error);
    return NextResponse.json({ error: 'Something went wrong submitting your request.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}