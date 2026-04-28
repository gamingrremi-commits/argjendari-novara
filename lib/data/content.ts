import { createStaticClient } from '@/lib/supabase/static';
import { unstable_cache } from 'next/cache';
import type { Locale } from '@/lib/types';

export interface SiteContentEntry {
  key: string;
  value_sq: string | null;
  value_en: string | null;
  description: string | null;
}

/**
 * Cached fetch of all site content.
 * Cached at the level of Next.js Data Cache, revalidated when admin updates a row.
 */
export const getAllSiteContent = unstable_cache(
  async (): Promise<SiteContentEntry[]> => {
    const supabase = createStaticClient();
    const { data } = await supabase
      .from('site_content')
      .select('key, value_sq, value_en, description');
    return (data ?? []) as SiteContentEntry[];
  },
  ['site-content'],
  { tags: ['site-content'], revalidate: 60 }
);

/**
 * Helper: build a Map of key → value for quick access in components
 */
export async function getSiteContentMap(locale: Locale = 'sq'): Promise<Map<string, string>> {
  const entries = await getAllSiteContent();
  const map = new Map<string, string>();
  for (const e of entries) {
    const v = locale === 'sq' ? e.value_sq : e.value_en;
    if (v != null) map.set(e.key, v);
  }
  return map;
}

/**
 * Helper to read with fallback default
 */
export function t(map: Map<string, string>, key: string, fallback = ''): string {
  return map.get(key) ?? fallback;
}

/**
 * Split a piped string ("foo|bar|baz") into array
 */
export function tList(map: Map<string, string>, key: string, fallback: string[] = []): string[] {
  const v = map.get(key);
  if (!v) return fallback;
  return v.split('|').map((s) => s.trim()).filter(Boolean);
}
