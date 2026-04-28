-- =====================================================
-- NOVARA — Supabase Database Schema
-- Run this entire file in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_sq text not null,
  name_en text not null,
  description_sq text,
  description_en text,
  display_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists categories_slug_idx on public.categories(slug);
create index if not exists categories_active_idx on public.categories(is_active);

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_sq text not null,
  name_en text not null,
  description_sq text,
  description_en text,
  category_id uuid references public.categories(id) on delete restrict,
  material text,
  weight text,
  size text,
  price_eur numeric(10, 2),
  price_lek numeric(12, 0),
  show_price boolean default false,
  in_stock boolean default true,
  is_featured boolean default false,
  is_new boolean default false,
  badge_sq text,
  badge_en text,
  images text[] default array[]::text[],
  display_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists products_slug_idx on public.products(slug);
create index if not exists products_category_idx on public.products(category_id);
create index if not exists products_active_idx on public.products(is_active);
create index if not exists products_featured_idx on public.products(is_featured);

-- =====================================================
-- BOOKINGS / INQUIRIES TABLE
-- =====================================================
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in (
    'showroom_visit',
    'engagement_consultation',
    'custom_order',
    'repair',
    'appraisal',
    'general'
  )),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  message text,
  preferred_date date,
  product_slug text,
  status text default 'new' check (status in (
    'new',
    'contacted',
    'scheduled',
    'completed',
    'cancelled'
  )),
  admin_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists bookings_status_idx on public.bookings(status);
create index if not exists bookings_created_idx on public.bookings(created_at desc);
create index if not exists bookings_type_idx on public.bookings(type);

-- =====================================================
-- AUTO-UPDATE updated_at TRIGGER
-- =====================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists categories_updated_at on public.categories;
create trigger categories_updated_at before update on public.categories
  for each row execute function public.set_updated_at();

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists bookings_updated_at on public.bookings;
create trigger bookings_updated_at before update on public.bookings
  for each row execute function public.set_updated_at();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.bookings enable row level security;

-- CATEGORIES: public can read active, only authenticated can write
drop policy if exists "Public can read active categories" on public.categories;
create policy "Public can read active categories"
  on public.categories for select
  using (is_active = true);

drop policy if exists "Authenticated can manage categories" on public.categories;
create policy "Authenticated can manage categories"
  on public.categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- PRODUCTS: public can read active, only authenticated can write
drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
  on public.products for select
  using (is_active = true);

drop policy if exists "Authenticated can manage products" on public.products;
create policy "Authenticated can manage products"
  on public.products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- BOOKINGS: public can insert (anyone can submit form), only authenticated can read/update
drop policy if exists "Public can submit bookings" on public.bookings;
create policy "Public can submit bookings"
  on public.bookings for insert
  with check (true);

drop policy if exists "Authenticated can read bookings" on public.bookings;
create policy "Authenticated can read bookings"
  on public.bookings for select
  using (auth.role() = 'authenticated');

drop policy if exists "Authenticated can update bookings" on public.bookings;
create policy "Authenticated can update bookings"
  on public.bookings for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated can delete bookings" on public.bookings;
create policy "Authenticated can delete bookings"
  on public.bookings for delete
  using (auth.role() = 'authenticated');

-- =====================================================
-- STORAGE BUCKET FOR PRODUCT IMAGES
-- =====================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  10485760,  -- 10MB max
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Storage RLS: anyone can read, only authenticated can upload/delete
drop policy if exists "Public can read product images" on storage.objects;
create policy "Public can read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "Authenticated can upload product images" on storage.objects;
create policy "Authenticated can upload product images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
  );

drop policy if exists "Authenticated can update product images" on storage.objects;
create policy "Authenticated can update product images"
  on storage.objects for update
  using (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
  );

drop policy if exists "Authenticated can delete product images" on storage.objects;
create policy "Authenticated can delete product images"
  on storage.objects for delete
  using (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
  );

-- =====================================================
-- SEED DATA — Categories
-- =====================================================
insert into public.categories (slug, name_sq, name_en, description_sq, description_en, display_order)
values
  ('unaza-fejese', 'Unaza Fejese', 'Engagement Rings',
   'Momentet që mbahen mend një jetë meritojnë diçka të përjetshme.',
   'Moments that last a lifetime deserve something eternal.', 1),
  ('gjerdane', 'Gjerdanë', 'Necklaces',
   'Nga delikate në statement — gjerdanë për çdo kostum dhe çdo histori.',
   'From delicate to statement — necklaces for every outfit and story.', 2),
  ('vathe', 'Vathë', 'Earrings',
   'Detaje që ndriçojnë fytyrën, krijuar me kujdesin më të madh.',
   'Details that brighten the face, crafted with the utmost care.', 3),
  ('byzylyke', 'Byzylykë', 'Bracelets',
   'Elegancë në kyçin e dorës — minimalist, klasik ose të ngjeshur me diamante.',
   'Elegance at the wrist — minimalist, classic, or diamond-set.', 4),
  ('ora', 'Ora', 'Watches',
   'Koha matet, por stili nuk ka skadencë.',
   'Time is measured, but style has no expiration.', 5),
  ('aksesore-burrash', 'Aksesorë Burrash', 'Men''s Accessories',
   'Zinxhirë, byzylykë, butona, kollare dhe gjithçka që përfundon një stil.',
   'Chains, bracelets, cufflinks, ties — everything that completes a style.', 6)
on conflict (slug) do nothing;

-- =====================================================
-- DONE!
-- =====================================================
-- Verify: select * from public.categories;
