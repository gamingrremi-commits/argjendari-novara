import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ProductForm } from '@/components/admin/ProductForm';

export default async function NewProductPage() {
  const supabase = createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('display_order');

  return (
    <div className="p-10">
      <div className="mb-10">
        <Link
          href="/admin/produkte"
          className="text-[10px] tracking-widest uppercase text-gold-dark hover:text-ink-black transition-colors no-underline"
        >
          ← Mbrapsht te produktet
        </Link>
        <h1 className="font-display text-5xl text-ink-black mt-3">Produkt i Ri</h1>
        <p className="font-serif italic text-base text-ink mt-2">
          Plotëso fushat dhe ngarko foto për produktin e ri.
        </p>
      </div>

      <ProductForm mode="create" categories={categories ?? []} />
    </div>
  );
}
