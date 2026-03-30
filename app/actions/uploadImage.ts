'use server';

import { createClient } from '@supabase/supabase-js';

export async function uploadImage(file: File) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from('images')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);

    return { url: urlData.publicUrl };
  } catch (err) {
    console.error(err);
    return { url: null };
  }
}
