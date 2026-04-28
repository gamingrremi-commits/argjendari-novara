import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Build-time / static client without cookies.
 * Use this in generateStaticParams() and other places that run outside a request scope.
 *
 * Has anonymous-level permissions only (respects RLS public read policies).
 */
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
