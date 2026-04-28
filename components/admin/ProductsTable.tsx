'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import type { Product, Category } from '@/lib/types';

interface Props {
  products: (Product & { category?: Category })[];
  categories: Category[];
}

export function ProductsTable({ products, categories }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name_sq.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (filterCategory !== 'all' && p.category_id !== filterCategory) return false;
      if (filterStatus === 'active' && !p.is_active) return false;
      if (filterStatus === 'inactive' && p.is_active) return false;
      return true;
    });
  }, [products, search, filterCategory, filterStatus]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`A je i sigurt që do të fshish "${name}"? Kjo nuk mund të rikthehet.`)) {
      return;
    }

    setDeletingId(id);

    // Get product to delete its images
    const { data: product } = await supabase
      .from('products')
      .select('images')
      .eq('id', id)
      .single();

    // Delete images from storage if any
    if (product?.images && product.images.length > 0) {
      const paths = product.images
        .map((url: string) => {
          const match = url.match(/product-images\/(.+)$/);
          return match ? match[1] : null;
        })
        .filter(Boolean) as string[];

      if (paths.length > 0) {
        await supabase.storage.from('product-images').remove(paths);
      }
    }

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      toast.error('Gabim: ' + error.message);
      setDeletingId(null);
      return;
    }

    toast.success('Produkti u fshi');
    router.refresh();
  };

  const toggleActive = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from('products')
      .update({ is_active: !current })
      .eq('id', id);

    if (error) {
      toast.error('Gabim: ' + error.message);
      return;
    }

    toast.success(current ? 'Produkti u çaktivizua' : 'Produkti u aktivizua');
    router.refresh();
  };

  return (
    <div>
      {/* Filters */}
      <div className="bg-white border border-line p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] tracking-widest uppercase text-gold-dark mb-2 font-medium">
            Kërko
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Emri i produktit..."
            className="w-full py-2 px-0 border-0 border-b border-line bg-transparent font-serif text-base text-ink-black outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-widest uppercase text-gold-dark mb-2 font-medium">
            Kategori
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full py-2 px-0 border-0 border-b border-line bg-transparent font-serif text-base text-ink-black outline-none focus:border-gold transition-colors cursor-pointer"
          >
            <option value="all">Të gjitha kategoritë</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_sq}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] tracking-widest uppercase text-gold-dark mb-2 font-medium">
            Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="w-full py-2 px-0 border-0 border-b border-line bg-transparent font-serif text-base text-ink-black outline-none focus:border-gold transition-colors cursor-pointer"
          >
            <option value="all">Të gjitha</option>
            <option value="active">Aktive</option>
            <option value="inactive">Joaktive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-line p-16 text-center">
          <p className="font-serif italic text-xl text-ink mb-4">
            {products.length === 0
              ? 'Akoma nuk ka produkte.'
              : 'Asnjë produkt nuk u gjet me këto filtra.'}
          </p>
          {products.length === 0 && (
            <Link
              href="/admin/produkte/ri"
              className="inline-block mt-4 px-8 py-3 bg-ink-black text-pearl text-[11px] tracking-widest uppercase no-underline hover:bg-gold-dark transition-colors"
            >
              + Shto Produktin e Parë
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white border border-line">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 border-b border-line/50 last:border-0 hover:bg-pearl/40 transition-colors"
            >
              {/* Image */}
              <div className="w-16 h-16 shrink-0 bg-pearl-warm border border-line overflow-hidden relative">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name_sq}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-display text-gold-dark text-2xl">
                    ◇
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-display text-lg text-ink-black truncate">
                  {product.name_sq}
                </div>
                <div className="flex gap-3 mt-1 flex-wrap">
                  <span className="text-[10px] tracking-widest uppercase text-gold-dark">
                    {product.category?.name_sq ?? '—'}
                  </span>
                  {product.is_featured && (
                    <span className="text-[10px] tracking-widest uppercase text-gold-dark">
                      ★ Featured
                    </span>
                  )}
                  {product.is_new && (
                    <span className="text-[10px] tracking-widest uppercase text-gold-dark">
                      Risi
                    </span>
                  )}
                  {!product.in_stock && (
                    <span className="text-[10px] tracking-widest uppercase text-red-700">
                      I shitur
                    </span>
                  )}
                </div>
              </div>

              {/* Status toggle */}
              <button
                onClick={() => toggleActive(product.id, product.is_active)}
                className={`px-3 py-1 text-[9px] tracking-widest uppercase transition-colors ${
                  product.is_active
                    ? 'bg-ink-black text-pearl hover:bg-gold-dark'
                    : 'bg-white border border-line text-ink/40 hover:border-gold'
                }`}
              >
                {product.is_active ? 'Aktiv' : 'Joaktiv'}
              </button>

              {/* Actions */}
              <Link
                href={`/admin/produkte/${product.id}`}
                className="px-4 py-2 text-[10px] tracking-widest uppercase text-ink-black border border-line hover:border-gold hover:text-gold-dark transition-colors no-underline"
              >
                Edito
              </Link>
              <button
                onClick={() => handleDelete(product.id, product.name_sq)}
                disabled={deletingId === product.id}
                className="px-4 py-2 text-[10px] tracking-widest uppercase text-red-700 border border-red-700/30 hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50"
              >
                {deletingId === product.id ? 'Duke fshirë...' : 'Fshi'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
