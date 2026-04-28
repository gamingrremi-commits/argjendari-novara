/**
 * Database types — will be auto-generated from Supabase schema in Batch 5
 * For now, manual types matching the planned schema.
 */

export type Locale = 'sq' | 'en';

export interface Category {
  id: string;
  slug: string;
  name_sq: string;
  name_en: string;
  description_sq: string | null;
  description_en: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  slug: string;
  name_sq: string;
  name_en: string;
  description_sq: string | null;
  description_en: string | null;
  category_id: string;
  category?: Category;
  material: string | null;
  weight: string | null;
  size: string | null;
  price_eur: number | null;
  price_lek: number | null;
  show_price: boolean;
  in_stock: boolean;
  is_featured: boolean;
  is_new: boolean;
  badge_sq: string | null;
  badge_en: string | null;
  images: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  type: 'showroom_visit' | 'engagement_consultation' | 'custom_order' | 'repair' | 'appraisal' | 'general';
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string | null;
  preferred_date: string | null;
  product_slug: string | null;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}
