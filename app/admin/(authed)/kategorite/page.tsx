import { createClient } from '@/lib/supabase/server';
import { CategoriesManager } from '@/components/admin/CategoriesManager';

export default async function AdminCategoriesPage() {
  const supabase = createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('display_order');

  return (
    <div className="p-10">
      <div className="mb-12">
        <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-2">
          Menaxhim
        </div>
        <h1 className="font-display text-5xl text-ink-black">Kategoritë</h1>
        <p className="font-serif italic text-base text-ink mt-2">
          {categories?.length ?? 0} kategori. Edito ose shto të reja.
        </p>
      </div>

      <CategoriesManager categories={categories ?? []} />
    </div>
  );
}
