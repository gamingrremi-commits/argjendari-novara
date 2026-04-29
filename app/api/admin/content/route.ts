import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const CONTENT_KEY_PATTERN = /^[a-z0-9_.-]+$/i;

export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Nuk je i loguar si administrator' }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    key?: unknown;
    value_sq?: unknown;
    value_en?: unknown;
  } | null;

  const key = typeof body?.key === 'string' ? body.key.trim() : '';
  const value_sq = typeof body?.value_sq === 'string' ? body.value_sq : '';
  const value_en = typeof body?.value_en === 'string' ? body.value_en : '';

  if (!key || key.length > 140 || !CONTENT_KEY_PATTERN.test(key)) {
    return NextResponse.json({ error: 'Celesi i fushes nuk eshte i vlefshem' }, { status: 400 });
  }

  const { error } = await supabase
    .from('site_content')
    .upsert({ key, value_sq, value_en }, { onConflict: 'key' });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateTag('site-content');
  revalidatePath('/');
  revalidatePath('/en');
  revalidatePath('/atelier');
  revalidatePath('/en/atelier');
  revalidatePath('/sherbime');
  revalidatePath('/en/services');

  return NextResponse.json({ success: true });
}
