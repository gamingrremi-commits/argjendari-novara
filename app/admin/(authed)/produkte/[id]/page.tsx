import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProductForm } from '@/components/admin/ProductForm';

interface PageProps {
  params: { id: string };
}

export default async function EditProductPage({ params }: PageProps) {
  const supabase = createClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from('products').select('*').eq('id', params.id).single(),
    supabase.from('categories').select('*').order('display_order'),
  ]);

  if (!product) return notFound();

  return (
    <div className="p-10">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <Link
            href="/admin/produkte"
            className="text-[10px] tracking-widest uppercase text-gold-dark hover:text-ink-black transition-colors no-underline"
          >
            ← Mbrapsht te produktet
          </Link>
          <h1 className="font-display text-5xl text-ink-black mt-3">Edito Produkt</h1>
          <p className="font-serif italic text-base text-ink mt-2">
            Ndrysho fushat dhe ruaj ndryshimet.
          </p>
        </div>

        <Link
          href={`/produkt/${product.slug}`}
          target="_blank"
          className="text-[10px] tracking-widest uppercase text-gold-dark hover:text-ink-black transition-colors no-underline border-b border-gold pb-1"
        >
          Shih në website ↗
        </Link>
      </div>

      <ProductForm mode="edit" product={product} categories={categories ?? []} />
    </div>
  );
}
