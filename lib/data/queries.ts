import { createClient } from '@/lib/supabase/server';
import { createStaticClient } from '@/lib/supabase/static';
import type { Product, Category } from '@/lib/types';

/**
 * Server-side data fetchers from Supabase.
 * Use these in server components / pages.
 *
 * They mirror the mock helpers from lib/data/mock.ts but pull from the real DB.
 * If a query fails or returns nothing, they return empty arrays / null safely.
 *
 * NOTE: getAllProductSlugs and getAllCategorySlugs use a STATIC client (no cookies)
 * because they're called from generateStaticParams() at build time.
 */

export async function getAllCategories(): Promise<Category[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order');

  if (error) {
    console.error('getAllCategories error:', error);
    return [];
  }
  return (data ?? []) as Category[];
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getAllProducts error:', error);
    return [];
  }
  return (data ?? []) as Product[];
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('display_order')
    .limit(limit);

  if (error) {
    console.error('getFeaturedProducts error:', error);
    return [];
  }
  return (data ?? []) as Product[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('getCategoryBySlug error:', error);
    return null;
  }
  return data as Category | null;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const supabase = createClient();
  const cat = await getCategoryBySlug(categorySlug);
  if (!cat) return [];

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('category_id', cat.id)
    .order('display_order');

  if (error) {
    console.error('getProductsByCategory error:', error);
    return [];
  }
  return (data ?? []) as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('getProductBySlug error:', error);
    return null;
  }
  return data as Product | null;
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string,
  limit = 4
): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('category_id', categoryId)
    .neq('id', productId)
    .limit(limit);

  if (error) {
    console.error('getRelatedProducts error:', error);
    return [];
  }
  return (data ?? []) as Product[];
}

/**
 * Get all product slugs — useful for generateStaticParams.
 * Uses static client (no cookies) since this runs at BUILD time.
 */
export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from('products')
    .select('slug')
    .eq('is_active', true);
  return data ?? [];
}

export async function getAllCategorySlugs(): Promise<{ slug: string }[]> {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from('categories')
    .select('slug')
    .eq('is_active', true);
  return data ?? [];
}

/**
 * Helper to get SVG key for a category slug — for placeholder rendering
 * Re-exported from helpers.ts (which is safe for client components too)
 */
export { getProductSvgKey } from './helpers';
