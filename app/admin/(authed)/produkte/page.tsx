import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ProductsTable } from '@/components/admin/ProductsTable';

export default async function AdminProductsPage() {
  const supabase = createClient();

  const { data: products } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false });

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('display_order');

  return (
    <div className="p-10">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-2">
            Menaxhim
          </div>
          <h1 className="font-display text-5xl text-ink-black">Produkte</h1>
          <p className="font-serif italic text-base text-ink mt-2">
            {products?.length ?? 0} produkte në total
          </p>
        </div>
        <Link
          href="/admin/produkte/ri"
          className="inline-block px-9 py-[18px] bg-ink-black text-pearl text-[11px] tracking-widest uppercase font-medium no-underline transition-all hover:bg-gold-dark"
        >
          + Shto Produkt
        </Link>
      </div>

      <ProductsTable products={products ?? []} categories={categories ?? []} />
    </div>
  );
}
